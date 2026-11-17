/**
 * The overview's far plane: a field of cells drawn as points of light by one
 * small WebGL program. Each point sits at a depth, and points away from the
 * focal plane grow into soft discs, so scrolling can rack focus through the
 * field like the fine-focus knob of a microscope. Decoration only: no text,
 * no library, no textures or network requests.
 */
import type { Rgb } from '../radar/helixScene'

export interface FieldColours {
  membrane: Rgb
  nucleus: Rgb
  vesicle: Rgb
  /** Light theme: crisp dots. Dark theme: additive glow. */
  light: boolean
}

export interface FieldFrame {
  /** Seconds of ambient drift; frozen under reduced motion. */
  time: number
  /** Depth of the focal plane, 0 (near) to 1 (far). */
  focus: number
  /** Camera travel into the field, 0 to 1. */
  dolly: number
  /** Pointer offset, -1 to 1 on each axis. */
  pointerX: number
  pointerY: number
}

export interface CellField {
  resize(width: number, height: number, pixelRatio: number): void
  setColours(colours: FieldColours): void
  draw(frame: FieldFrame): void
  dispose(): void
}

const FLOATS_PER_POINT = 6
const TAU = Math.PI * 2

/** Every point is (x, y, depth, kind, seed, size); kinds 0 membrane, 1 nucleus, 2 vesicle. */
export function buildCellPoints(cellCount = 34): Float32Array {
  const points: number[] = []
  // A fixed seed keeps the field identical on every visit.
  let state = 11
  const random = () => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
  for (let cell = 0; cell < cellCount; cell++) {
    const cx = (random() * 2 - 1) * 1.7
    const cy = (random() * 2 - 1) * 1.05
    const depth = random()
    const radius = 0.07 + random() * 0.09
    const squash = 0.75 + random() * 0.35
    const ring = Math.round(22 + radius * 160)
    for (let index = 0; index < ring; index++) {
      const angle = (index / ring) * TAU + random() * 0.04
      const wobble = 1 + Math.sin(angle * 3 + cell) * 0.06
      points.push(
        cx + Math.cos(angle) * radius * wobble,
        cy + Math.sin(angle) * radius * squash * wobble,
        depth,
        0,
        random(),
        1,
      )
    }
    const nucleusX = cx + (random() - 0.5) * radius * 0.5
    const nucleusY = cy + (random() - 0.5) * radius * 0.4
    for (let index = 0; index < 9; index++) {
      const angle = random() * TAU
      const distance = Math.sqrt(random()) * radius * 0.32
      points.push(
        nucleusX + Math.cos(angle) * distance,
        nucleusY + Math.sin(angle) * distance * squash,
        depth,
        1,
        random(),
        1.6,
      )
    }
    for (let index = 0; index < 5; index++) {
      const angle = random() * TAU
      const distance = Math.sqrt(random()) * radius * 0.8
      points.push(
        cx + Math.cos(angle) * distance,
        cy + Math.sin(angle) * distance * squash,
        depth,
        2,
        random(),
        0.8,
      )
    }
  }
  return new Float32Array(points)
}

const vertexShader = `
precision highp float;
attribute vec3 a_point;
attribute vec3 a_meta;
uniform float u_time;
uniform float u_focus;
uniform float u_dolly;
uniform vec2 u_pointer;
uniform vec2 u_aspect;
uniform float u_pixel;
uniform float u_light;
uniform vec3 u_membrane;
uniform vec3 u_nucleus;
uniform vec3 u_vesicle;
varying vec4 v_colour;
varying float v_soft;
varying float v_light;

void main() {
  float kind = a_meta.x;
  float seed = a_meta.y;
  float depth = a_point.z;
  // Nearer cells drift and follow the pointer more, which reads as depth.
  float near = 1.0 - depth;
  vec2 drift = vec2(
    sin(u_time * 0.09 + seed * 6.2831 + depth * 4.0),
    cos(u_time * 0.07 + depth * 9.0)
  ) * 0.012;
  vec2 p = a_point.xy + drift + u_pointer * (0.015 + near * 0.05);
  float scale = (1.0 + u_dolly * (0.15 + near * 0.55)) / (0.75 + depth * 0.55);
  p.y += u_dolly * (0.05 + near * 0.35);
  gl_Position = vec4(p * scale * u_aspect, 0.0, 1.0);

  float blur = clamp(abs(depth - u_focus) * 3.2, 0.0, 1.0);
  vec3 colour = kind < 0.5 ? u_membrane : (kind < 1.5 ? u_nucleus : u_vesicle);
  float alpha = (kind < 0.5 ? 0.55 : (kind < 1.5 ? 0.7 : 0.4))
    * mix(1.0, 0.18, blur) * mix(0.55, 1.0, near);
  float size = (1.6 + a_meta.z * 1.4 + seed * 0.6) * scale;
  gl_PointSize = max(1.0, size * u_pixel * (1.0 + blur * 4.5) * mix(1.5, 1.0, u_light));
  v_colour = vec4(colour, alpha);
  v_soft = blur;
  v_light = u_light;
}
`

const fragmentShader = `
precision mediump float;
varying vec4 v_colour;
varying float v_soft;
varying float v_light;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float crisp = smoothstep(1.0, 0.55, d);
  float glow = (1.0 - d) * (1.0 - d) * 1.3;
  float disc = smoothstep(1.0, 0.2, d) * 0.9;
  float shape = mix(mix(glow, crisp, v_light), disc, v_soft);
  float a = min(1.0, v_colour.a * shape);
  gl_FragColor = vec4(v_colour.rgb * a, a * mix(0.35, 1.0, v_light));
}
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

/** Returns null without WebGL; the hero is complete without this plane. */
export function createCellField(canvas: HTMLCanvasElement): CellField | null {
  let context: WebGLRenderingContext | null = null
  try {
    context = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: 'low-power',
    })
  } catch {
    return null
  }
  if (!context) return null
  const gl = context
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program)
    return null
  }

  const points = buildCellPoints()
  const buffer = gl.createBuffer()
  const stride = FLOATS_PER_POINT * Float32Array.BYTES_PER_ELEMENT
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
  const point = gl.getAttribLocation(program, 'a_point')
  const meta = gl.getAttribLocation(program, 'a_meta')
  gl.enableVertexAttribArray(point)
  gl.vertexAttribPointer(point, 3, gl.FLOAT, false, stride, 0)
  gl.enableVertexAttribArray(meta)
  gl.vertexAttribPointer(meta, 3, gl.FLOAT, false, stride, 12)
  gl.useProgram(program)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const u = {
    time: uniform('u_time'),
    focus: uniform('u_focus'),
    dolly: uniform('u_dolly'),
    pointer: uniform('u_pointer'),
    aspect: uniform('u_aspect'),
    pixel: uniform('u_pixel'),
    light: uniform('u_light'),
    membrane: uniform('u_membrane'),
    nucleus: uniform('u_nucleus'),
    vesicle: uniform('u_vesicle'),
  }
  let width = 0
  let height = 0

  return {
    resize(nextWidth, nextHeight, pixelRatio) {
      width = nextWidth
      height = nextHeight
      canvas.width = Math.max(1, Math.round(width * pixelRatio))
      canvas.height = Math.max(1, Math.round(height * pixelRatio))
      gl.viewport(0, 0, canvas.width, canvas.height)
      // Cover the viewport with square pixels: the field spans about ±1.6 by
      // ±1, and whichever side would fall short sets the scale.
      const aspect = width / Math.max(1, height)
      const scale = Math.max(1 / 1.6, 1 / aspect)
      gl.uniform2f(u.aspect, scale, scale * aspect)
      gl.uniform1f(
        u.pixel,
        pixelRatio *
          Math.min(1.4, Math.max(0.8, Math.min(width, height) / 560)),
      )
    },
    setColours(colours) {
      gl.uniform3fv(u.membrane, colours.membrane)
      gl.uniform3fv(u.nucleus, colours.nucleus)
      gl.uniform3fv(u.vesicle, colours.vesicle)
      gl.uniform1f(u.light, colours.light ? 1 : 0)
    },
    draw(frame) {
      if (width < 2 || height < 2) return
      gl.uniform1f(u.time, frame.time)
      gl.uniform1f(u.focus, frame.focus)
      gl.uniform1f(u.dolly, frame.dolly)
      gl.uniform2f(u.pointer, frame.pointerX, -frame.pointerY)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.POINTS, 0, points.length / FLOATS_PER_POINT)
    },
    dispose() {
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
