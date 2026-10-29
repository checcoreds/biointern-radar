import * as THREE from 'three'
import {
  boundedView,
  createDemandLoop,
  isDrag,
  radarFields,
  type FieldId,
  type RadarController,
  type RadarOptions,
} from './radarModel'

/** Imperative renderer: no React rerenders during animation, no assets or helpers. */
export function createRadarScene({
  stage,
  host,
  onReady,
  onFailure,
  onViewChange,
}: RadarOptions): RadarController {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.domElement.setAttribute('aria-hidden', 'true')
  renderer.domElement.dataset.renderer = 'research-radar'
  Object.keys(host.dataset).forEach((key) => {
    delete host.dataset[key]
  })
  host.appendChild(renderer.domElement)
  host.dataset.createdAt = String(Date.now())
  const scene = new THREE.Scene()
  const root = new THREE.Group()
  scene.add(root)
  const camera = new THREE.OrthographicCamera(-4, 4, 3.2, -3.2, 0.1, 40)
  camera.position.set(3.8, 6.8, 9)
  camera.lookAt(0, 0.5, 0)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x426450, 1.8))
  const light = new THREE.DirectionalLight(0xffffff, 2.4)
  light.position.set(-3, 8, 5)
  scene.add(light)
  const fill = new THREE.DirectionalLight(0xb5ecd2, 1.1)
  fill.position.set(4, 2, -4)
  scene.add(fill)
  let disposed = false
  let paused = false
  let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  let active = false
  let width = 1,
    height = 1
  let last = 0,
    lastRender = -100,
    frames = 0
  let sweepAngle = -0.7
  let yaw = 0,
    tilt = 0,
    hoverYaw = 0,
    hoverTilt = 0
  let dragStart: {
    x: number
    y: number
    yaw: number
    tilt: number
    id: number
  } | null = null
  let dragged = false,
    suppressClickUntil = 0
  let currentHighlight: FieldId | null = null
  const small = stage.clientWidth < 400
  const segments = small ? 64 : 96
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
  const materials: THREE.Material[] = []
  const material = (color: string, polish = 0.12) => {
    const value = new THREE.MeshPhongMaterial({
      color,
      shininess: 12 + polish * 75,
      specular: '#679e7b',
    })
    materials.push(value)
    return value
  }
  const mesh = (
    geometry: THREE.BufferGeometry,
    surface: THREE.Material,
    parent: THREE.Object3D = root,
  ) => {
    const value = new THREE.Mesh(geometry, surface)
    parent.add(value)
    return value
  }
  const ring = (
    radius: number,
    y: number,
    surface: THREE.Material,
    thickness = 0.012,
  ) => {
    const value = mesh(
      new THREE.TorusGeometry(radius, thickness, 6, segments),
      surface,
    )
    value.rotation.x = -Math.PI / 2
    value.position.y = y
    return value
  }
  const segmentInstances = (
    pairs: [THREE.Vector3, THREE.Vector3][],
    radius: number,
    surface: THREE.Material,
  ) => {
    const instances = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(1, 1, 1, 6),
      surface,
      pairs.length,
    )
    const transform = new THREE.Object3D()
    pairs.forEach(([a, b], index) => {
      transform.position.copy(a).add(b).multiplyScalar(0.5)
      transform.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        b.clone().sub(a).normalize(),
      )
      transform.scale.set(radius, a.distanceTo(b), radius)
      transform.updateMatrix()
      instances.setMatrixAt(index, transform.matrix)
    })
    root.add(instances)
  }
  const disposeResources = () => {
    const geometries = new Set<THREE.BufferGeometry>()
    const surfaces = new Set<THREE.Material>(materials)
    scene.traverse((value) => {
      if (value instanceof THREE.Mesh || value instanceof THREE.Line) {
        if (value instanceof THREE.InstancedMesh) value.dispose()
        geometries.add(value.geometry)
        const values = Array.isArray(value.material)
          ? value.material
          : [value.material]
        values.forEach((value) => surfaces.add(value))
      }
    })
    geometries.forEach((value) => value.dispose())
    surfaces.forEach((value) => value.dispose())
    const context = renderer.getContext()
    renderer.dispose()
    if (!context.isContextLost() && context.getExtension('WEBGL_lose_context'))
      renderer.forceContextLoss()
    renderer.domElement.remove()
  }
  try {
    // A shallow instrument base, pale face and fine raised rings.
    const base = mesh(
      new THREE.CylinderGeometry(2.48, 2.48, 0.18, segments),
      material('#79a58f', 0.25),
    )
    base.position.y = -0.14
    const face = mesh(
      new THREE.CylinderGeometry(2.46, 2.46, 0.035, segments),
      material('#d8eade', 0.06),
    )
    face.position.y = -0.025
    ring(2.48, -0.03, material('#356d52'), 0.02)
    ring(2.48, -0.21, material('#a4cbb5'), 0.018)
    const ringSurfaces = [0.78, 1.35, 1.96, 2.34].map((radius, index) => {
      const surface = material('#6c9b80', 0.3)
      ring(radius, 0.035 + index * 0.047, surface)
      return surface
    })
    // Sparse instrument ticks; no maps, counts or live-detection signals.
    const tickSurface = material('#8eae9b')
    const ticks: [THREE.Vector3, THREE.Vector3][] = []
    for (let index = 0; index < 24; index++) {
      const angle = (index / 24) * Math.PI * 2
      const inner = index % 3 ? 2.28 : 2.18
      ticks.push([
        new THREE.Vector3(
          Math.sin(angle) * inner,
          0.02,
          Math.cos(angle) * inner,
        ),
        new THREE.Vector3(Math.sin(angle) * 2.38, 0.02, Math.cos(angle) * 2.38),
      ])
    }
    segmentInstances(ticks, 0.007, tickSurface)
    const centre = mesh(
      new THREE.CylinderGeometry(0.48, 0.52, 0.08, 48),
      material('#edf8ef'),
    )
    centre.position.y = 0.05
    ring(0.5, 0.09, material('#7fb99b'), 0.016)

    // Two continuous tube strands with nine delicate base-pair rungs.
    const strandA = material('#20553e', 0.28)
    const strandB = material('#57b18a', 0.3)
    const helixPoint = (t: number, offset = 0) =>
      new THREE.Vector3(
        Math.sin(t * Math.PI * 3.6 + offset) * 0.25,
        0.16 + t * 1.9,
        Math.cos(t * Math.PI * 3.6 + offset) * 0.25,
      )
    for (const [offset, surface] of [
      [0, strandA],
      [Math.PI, strandB],
    ] as const) {
      const points = Array.from({ length: 65 }, (_, index) =>
        helixPoint(index / 64, offset),
      )
      mesh(
        new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(points),
          small ? 64 : 96,
          0.038,
          7,
          false,
        ),
        surface,
      )
    }
    const rungSurface = material('#9dcbb1')
    segmentInstances(
      Array.from({ length: 11 }, (_, index) => [
        helixPoint(index / 10),
        helixPoint(index / 10, Math.PI),
      ]),
      0.018,
      rungSurface,
    )

    // Vertex alpha feathers the scanning sector towards its trailing edge.
    const sweep = new THREE.Group()
    root.add(sweep)
    const vertices: number[] = [],
      colors: number[] = []
    for (let index = 0; index < 24; index++) {
      const a = (index / 24) * 0.85,
        b = ((index + 1) / 24) * 0.85
      vertices.push(
        0,
        0.19,
        0,
        Math.sin(a) * 2.33,
        0.19,
        Math.cos(a) * 2.33,
        Math.sin(b) * 2.33,
        0.19,
        Math.cos(b) * 2.33,
      )
      for (const alpha of [
        0.08,
        (index / 24) * 0.32,
        ((index + 1) / 24) * 0.32,
      ])
        colors.push(0.24, 0.68, 0.46, alpha)
    }
    const sweepGeometry = new THREE.BufferGeometry()
    sweepGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3),
    )
    sweepGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 4),
    )
    const sweepMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    mesh(sweepGeometry, sweepMaterial, sweep)
    sweep.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0.195, 0),
          new THREE.Vector3(
            Math.sin(0.85) * 2.33,
            0.195,
            Math.cos(0.85) * 2.33,
          ),
        ]),
        new THREE.LineBasicMaterial({
          color: '#56a27a',
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        }),
      ),
    )

    const markers = radarFields.map((field, index) => {
      const point = new THREE.Vector3(...field.position)
      const surface = material('#34845d', 0.25)
      const marker = new THREE.Group()
      marker.position.copy(point)
      root.add(marker)
      const stem = mesh(
        new THREE.CylinderGeometry(0.026, 0.04, 0.26, 8),
        material('#8fbba1'),
        marker,
      )
      stem.position.y = -0.1
      mesh(new THREE.SphereGeometry(0.09, 12, 8), surface, marker)
      const halo = mesh(
        new THREE.TorusGeometry(0.15, 0.018, 6, 32),
        surface,
        marker,
      )
      halo.rotation.x = -Math.PI / 2
      const angle = Math.atan2(point.x, point.z)
      const connection = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(
            Math.sin(angle) * 0.55,
            0.23,
            Math.cos(angle) * 0.55,
          ),
          new THREE.Vector3(
            Math.sin(angle) * 1.15,
            0.25,
            Math.cos(angle) * 1.15,
          ),
          point,
        ]),
        new THREE.LineBasicMaterial({
          color: '#7baa8e',
          transparent: true,
          opacity: 0.55,
        }),
      )
      root.add(connection)
      const label = stage.querySelector<HTMLElement>(
        `[data-field="${field.id}"]`,
      )!
      const path = stage.querySelector<SVGPathElement>(
        `[data-connection="${field.id}"]`,
      )!
      return {
        ...field,
        marker,
        surface,
        connection,
        ring: ringSurfaces[index + 1],
        label,
        path,
        anchor: { x: 0, y: 0 },
      }
    })
    const projected = new THREE.Vector3()
    let ready = false
    let lastStats = -1000
    const draw = (time: number) => {
      const interval = 1000 / 30
      const elapsed = time - lastRender
      if (elapsed < interval) return true
      const dt = Math.min((time - last) / 1000 || 0, 0.05)
      last = time
      lastRender = time - (elapsed % interval)
      const targetYaw = reduced ? 0 : yaw + hoverYaw
      const targetTilt = reduced ? 0 : tilt + hoverTilt
      const damp = reduced ? 1 : 1 - Math.exp(-dt * 9)
      root.rotation.y += (targetYaw - root.rotation.y) * damp
      root.rotation.x += (targetTilt - root.rotation.x) * damp
      if (!paused && !reduced) sweepAngle += dt * 0.18
      sweep.rotation.y = sweepAngle
      const start = performance.now()
      renderer.render(scene, camera)
      for (const field of markers) {
        field.marker.getWorldPosition(projected).project(camera)
        const x = (projected.x * 0.5 + 0.5) * width
        const y = (-projected.y * 0.5 + 0.5) * height
        field.path.setAttribute(
          'd',
          `M${x.toFixed(1)},${y.toFixed(1)} L${field.anchor.x},${field.anchor.y}`,
        )
      }
      frames++
      if (time - lastStats >= 1000 || paused || reduced) {
        // Small DOM diagnostics allow local profiling without globals or telemetry.
        host.dataset.frames = String(frames)
        host.dataset.sampleTime = String(Date.now())
        host.dataset.drawCalls = String(renderer.info.render.calls)
        host.dataset.triangles = String(renderer.info.render.triangles)
        host.dataset.renderMs = (performance.now() - start).toFixed(2)
        host.dataset.pixelRatio = String(renderer.getPixelRatio())
        host.dataset.yaw = root.rotation.y.toFixed(4)
        host.dataset.tilt = root.rotation.x.toFixed(4)
        lastStats = time
      }
      if (!ready) {
        ready = true
        onReady()
      }
      return (
        (!paused && !reduced) ||
        Math.abs(targetYaw - root.rotation.y) +
          Math.abs(targetTilt - root.rotation.x) >
          0.0005
      )
    }
    const loop = createDemandLoop((time) => {
      try {
        return draw(time)
      } catch {
        onFailure()
        return false
      }
    })
    const resize = () => {
      width = stage.clientWidth
      height = stage.clientHeight
      if (!width || !height) return
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, width < 400 ? 1.25 : 1.5),
      )
      renderer.setSize(width, height)
      const aspect = width / height
      const viewHeight = Math.max(5.9, 6.15 / aspect)
      camera.left = (-viewHeight * aspect) / 2
      camera.right = -camera.left
      camera.top = viewHeight / 2
      camera.bottom = -camera.top
      camera.updateProjectionMatrix()
      const bounds = stage.getBoundingClientRect()
      markers.forEach((field) => {
        const label = field.label.getBoundingClientRect()
        field.anchor = {
          x: +(label.left - bounds.left + label.width / 2).toFixed(1),
          y: +(label.top - bounds.top + label.height / 2).toFixed(1),
        }
      })
      loop.invalidate()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    const resetHover = () => {
      hoverYaw = 0
      hoverTilt = 0
      loop.invalidate()
    }
    const down = (event: PointerEvent) => {
      if (
        reduced ||
        !finePointer.matches ||
        event.pointerType !== 'mouse' ||
        event.button !== 0 ||
        (event.target as Element).closest('button')
      )
        return
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        yaw,
        tilt,
        id: event.pointerId,
      }
      dragged = false
    }
    const move = (event: PointerEvent) => {
      if (reduced || !finePointer.matches || event.pointerType !== 'mouse')
        return
      const bounds = stage.getBoundingClientRect()
      if (dragStart) {
        const dx = event.clientX - dragStart.x,
          dy = event.clientY - dragStart.y
        if (isDrag(dx, dy)) dragged = true
        if (dragged) {
          if (!stage.hasPointerCapture(event.pointerId))
            stage.setPointerCapture(event.pointerId)
          const view = boundedView(
            dragStart.yaw + dx * 0.0025,
            dragStart.tilt + dy * 0.0008,
          )
          yaw = view.yaw
          tilt = view.tilt
          hoverYaw = 0
          hoverTilt = 0
          stage.dataset.dragging = 'true'
          onViewChange(Math.abs(yaw) + Math.abs(tilt) > 0.001)
          event.preventDefault()
        }
      } else {
        hoverYaw = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.1
        hoverTilt = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.055
      }
      loop.invalidate()
    }
    const up = (event: PointerEvent) => {
      if (dragged) suppressClickUntil = performance.now() + 400
      if (stage.hasPointerCapture(event.pointerId))
        stage.releasePointerCapture(event.pointerId)
      dragStart = null
      dragged = false
      stage.dataset.dragging = 'false'
      resetHover()
    }
    const click = (event: MouseEvent) => {
      if (performance.now() < suppressClickUntil && event.detail !== 0) {
        event.preventDefault()
        event.stopPropagation()
      }
    }
    const preventNativeDrag = (event: DragEvent) => event.preventDefault()
    const lost = (event: Event) => {
      event.preventDefault()
      onFailure()
    }
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', up)
    stage.addEventListener('pointerleave', resetHover)
    stage.addEventListener('click', click, true)
    stage.addEventListener('dragstart', preventNativeDrag)
    renderer.domElement.addEventListener('webglcontextlost', lost)
    resize()
    const controller: RadarController = {
      setActive(value) {
        active = value
        host.dataset.renderState = active
          ? paused || reduced
            ? 'on-demand'
            : 'animating'
          : 'suspended'
        last = 0
        loop.setActive(active)
      },
      setMotion(pause, reduce) {
        paused = pause
        reduced = reduce
        if (reduced) {
          yaw = 0
          tilt = 0
          hoverYaw = 0
          hoverTilt = 0
          onViewChange(false)
        }
        host.dataset.renderState = active
          ? paused || reduced
            ? 'on-demand'
            : 'animating'
          : 'suspended'
        loop.invalidate()
      },
      highlight(id) {
        if (currentHighlight === id) return
        currentHighlight = id
        markers.forEach((field) => {
          const selected = field.id === id
          field.surface.color.set(selected ? '#0b6c44' : '#34845d')
          field.marker.scale.setScalar(selected ? 1.18 : 1)
          field.connection.material.color.set(selected ? '#0b6c44' : '#7baa8e')
          field.connection.material.opacity = selected ? 1 : 0.55
          field.ring.color.set(selected ? '#258858' : '#6c9b80')
        })
        loop.invalidate()
      },
      reset() {
        yaw = 0
        tilt = 0
        resetHover()
        onViewChange(false)
      },
      dispose() {
        if (disposed) return
        disposed = true
        loop.dispose()
        resizeObserver.disconnect()
        stage.removeEventListener('pointerdown', down)
        stage.removeEventListener('pointermove', move)
        stage.removeEventListener('pointerup', up)
        stage.removeEventListener('pointercancel', up)
        stage.removeEventListener('pointerleave', resetHover)
        stage.removeEventListener('click', click, true)
        stage.removeEventListener('dragstart', preventNativeDrag)
        renderer.domElement.removeEventListener('webglcontextlost', lost)
        if (dragStart && stage.hasPointerCapture(dragStart.id))
          stage.releasePointerCapture(dragStart.id)
        disposeResources()
      },
    }
    // One deterministic preparation frame, even offscreen. No ongoing loop
    // starts until the visibility controller activates it.
    const warmupStart = performance.now()
    try {
      draw(performance.now())
      host.dataset.warmupMs = (performance.now() - warmupStart).toFixed(1)
    } catch (error) {
      controller.dispose()
      throw error
    }
    return controller
  } catch (error) {
    if (!disposed) disposeResources()
    throw error
  }
}
