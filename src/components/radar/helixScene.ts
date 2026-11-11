/**
 * The homepage's 3D layer: a DNA helix rising from a radar disc, drawn as
 * points by one small WebGL program. No library, textures or network requests.
 *
 * It is decoration only. The field link and the controls stay ordinary HTML in
 * SweepRadar, whose flat CSS radar remains the fallback wherever WebGL is
 * missing or the context is lost.
 */

export type Rgb = [number, number, number]

export interface SceneColours {
  radar: Rgb
  strong: Rgb
  dim: Rgb
  /** Helix colour at its base and at its top. */
  from: Rgb
  to: Rgb
  /** Light theme: crisp dots. Dark theme: additive glow. */
  light: boolean
}

export interface SceneFrame {
  /** Seconds of animation time; frozen while the radar is paused. */
  time: number
  /** Progress of the current sweep, 0–1. Wraps when the field changes. */
  sweep: number
  /** Camera angles in radians. */
  yaw: number
  pitch: number
}

export interface HelixScene {
  resize(width: number, height: number, pixelRatio: number): void
  setColours(colours: SceneColours): void
  draw(frame: SceneFrame): void
  dispose(): void
}

/**
 * Where the disc sits inside the stage, in CSS pixels. The field name is
 * overlaid along the bottom edge, so the scene keeps clear of it.
 */
export function sceneLayout(width: number, height: number) {
  const readout = height < 400 ? 46 : 62
  const unit = Math.max(
    1,
    Math.min((height - readout - 10) / 1.95, width / 2.3),
  )
  return { unit, centreY: height - readout - 2 - unit * 0.52 }
}

const FLOATS_PER_POINT = 5
const TAU = Math.PI * 2

const Kind = { Disc: 0, Sweep: 1, Helix: 2, Blip: 3, Dust: 4 } as const

/** Every point is (a, b, c, kind, seed); the shader gives a, b, c meaning. */
function buildPoints(): Float32Array {
  const points: number[] = []
  // A fixed seed keeps the picture identical on every visit.
  let state = 7
  const random = () => {
    state = (state * 16807) % 2147483647
    return state / 2147483647
  }
  const add = (a: number, b: number, c: number, kind: number) =>
    points.push(a, b, c, kind, random())

  // Radar rings (c = 1) and the scattered specks the sweep lights up (c = 0).
  for (const [radius, count] of [
    [1, 150],
    [0.72, 110],
    [0.43, 70],
  ])
    for (let index = 0; index < count; index++)
      add(radius, (index / count) * TAU, 1, Kind.Disc)
  for (let index = 0; index < 520; index++)
    add(Math.sqrt(random()) * 0.98, random() * TAU, 0, Kind.Disc)

  // The sweep's leading edge.
  for (let index = 0; index < 48; index++)
    add(0.06 + (index / 47) * 0.94, 0, 0, Kind.Sweep)

  // Two backbones (b = ±1) joined by base-pair rungs (c = 1).
  for (let index = 0; index < 120; index++) {
    add(index / 119, 1, 0, Kind.Helix)
    add(index / 119, -1, 0, Kind.Helix)
  }
  for (let rung = 0; rung < 24; rung++)
    for (let step = 0; step < 7; step++)
      add((rung + 0.5) / 24, -0.75 + step * 0.25, 1, Kind.Helix)

  // Contacts on the disc. The first sits where each sweep begins, so it
  // flashes exactly when the field name changes.
  const blips = [
    [0.72, 0],
    [0.9, 1.9],
    [0.45, 3.4],
    [0.62, 4.6],
    [0.86, 5.6],
  ]
  blips.forEach(([radius, angle], index) =>
    add(radius, angle, index === 0 ? 1 : 0, Kind.Blip),
  )

  // Motes drifting up around the helix.
  for (let index = 0; index < 140; index++)
    add(0.15 + random() * 1.1, random() * TAU, random(), Kind.Dust)

  return new Float32Array(points)
}

const vertexShader = `
precision highp float;
attribute vec3 a_point;
attribute vec2 a_meta;
uniform float u_time;
uniform float u_sweep;
uniform float u_yaw;
uniform float u_pitch;
uniform float u_pixel;
uniform float u_light;
uniform vec2 u_view;
uniform vec2 u_centre;
uniform vec3 u_radar;
uniform vec3 u_strong;
uniform vec3 u_dim;
uniform vec3 u_from;
uniform vec3 u_to;
varying vec4 v_colour;
varying float v_light;

const float TAU = 6.2831853;

void main() {
  float kind = a_meta.x;
  float seed = a_meta.y;
  float sweep = u_sweep * TAU;
  vec3 p;
  vec3 colour;
  float alpha;
  float size;

  if (kind < 0.5) {
    float angle = a_point.y;
    float ring = a_point.z;
    p = vec3(a_point.x * cos(angle), 0.0, a_point.x * sin(angle));
    float trail = exp(-mod(sweep - angle, TAU) * 1.9);
    colour = mix(u_radar, u_strong, trail * 0.6);
    alpha = mix(0.1, 0.5, ring) + trail * mix(0.9, 0.5, ring);
    size = mix(1.5, 2.0, ring) + trail * 1.7 + seed * 0.7;
  } else if (kind < 1.5) {
    p = vec3(a_point.x * cos(sweep), 0.0, a_point.x * sin(sweep));
    colour = u_strong;
    alpha = 0.9;
    size = 2.6;
  } else if (kind < 2.5) {
    float t = a_point.x;
    float rung = a_point.z;
    float angle = t * 11.0 + u_time * 0.6;
    float radius = 0.27 * a_point.y;
    p = vec3(
      radius * cos(angle),
      0.14 + t * 1.2 + sin(u_time * 0.8) * 0.015,
      radius * sin(angle)
    );
    // Each new sweep sends a pulse of light up the helix.
    float pulse = smoothstep(0.16, 0.0, abs(t - (u_sweep * 2.2 - 0.1)));
    colour = mix(u_from, u_to, t);
    alpha = (mix(0.95, 0.5, rung) + pulse * 0.3) * smoothstep(0.0, 0.1, t);
    size = mix(4.4, 2.3, rung) + pulse * 2.2;
  } else if (kind < 3.5) {
    float angle = a_point.y;
    p = vec3(a_point.x * cos(angle), 0.0, a_point.x * sin(angle));
    float flash = exp(-mod(sweep - angle, TAU) * 2.4);
    colour = mix(u_radar, u_strong, flash);
    alpha = 0.55 + flash * 0.45;
    size = 4.5 + a_point.z * 2.0 + flash * 9.0;
  } else {
    float rise = fract(a_point.z + u_time * (0.02 + seed * 0.03));
    float angle = a_point.y + u_time * 0.05 * (seed - 0.5);
    p = vec3(a_point.x * cos(angle), rise * 1.5, a_point.x * sin(angle));
    colour = u_dim;
    alpha = sin(rise * 3.14159) * (0.4 + 0.3 * sin(u_time * 1.3 + seed * 40.0));
    size = 1.6 + seed * 1.8;
  }

  float cy = cos(u_yaw);
  float sy = sin(u_yaw);
  p = vec3(p.x * cy + p.z * sy, p.y, p.z * cy - p.x * sy);
  // The camera looks down on the disc. The helix is projected upright, facing
  // the viewer like a hologram, so both strands read clearly.
  float helix = step(1.5, kind) * step(kind, 2.5);
  float cp = cos(u_pitch);
  float sp = sin(u_pitch);
  p = mix(vec3(p.x, p.y * cp - p.z * sp, p.y * sp + p.z * cp), p, helix);

  float depth = 5.0 / (5.0 - p.z);
  float near = mix(
    smoothstep(-1.2, 1.0, p.z),
    smoothstep(-0.3, 0.3, p.z),
    helix
  );
  gl_Position = vec4(u_centre + p.xy * depth * u_view, 0.0, 1.0);
  gl_PointSize = max(
    1.0,
    size * depth * u_pixel * mix(1.7, 1.0, u_light) * mix(1.0, 0.75 + 0.25 * near, helix)
  );
  v_colour = vec4(colour, clamp(alpha, 0.0, 1.0) * mix(0.45, 1.0, near));
  v_light = u_light;
}
`

const fragmentShader = `
precision mediump float;
varying vec4 v_colour;
varying float v_light;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  if (d > 1.0) discard;
  float glow = (1.0 - d) * (1.0 - d) * 1.3;
  float crisp = smoothstep(1.0, 0.55, d);
  float a = min(1.0, v_colour.a * mix(glow, crisp, v_light));
  // Premultiplied output. A low alpha in the dark theme adds light instead of
  // covering what is behind it.
  gl_FragColor = vec4(v_colour.rgb * a, a * mix(0.3, 1.0, v_light));
}
`

function compile(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader
  gl.deleteShader(shader)
  return null
}

function link(gl: WebGLRenderingContext): WebGLProgram | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader)
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader)
  const program = gl.createProgram()
  if (!vertex || !fragment || !program) return null
  gl.attachShader(program, vertex)
  gl.attachShader(program, fragment)
  gl.linkProgram(program)
  gl.deleteShader(vertex)
  gl.deleteShader(fragment)
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program
  gl.deleteProgram(program)
  return null
}

/** Returns null when WebGL is unavailable, so the caller keeps the CSS radar. */
export function createHelixScene(canvas: HTMLCanvasElement): HelixScene | null {
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
  const program = link(gl)
  if (!program) return null

  const points = buildPoints()
  const buffer = gl.createBuffer()
  const stride = FLOATS_PER_POINT * Float32Array.BYTES_PER_ELEMENT
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW)
  const point = gl.getAttribLocation(program, 'a_point')
  const meta = gl.getAttribLocation(program, 'a_meta')
  gl.enableVertexAttribArray(point)
  gl.vertexAttribPointer(point, 3, gl.FLOAT, false, stride, 0)
  gl.enableVertexAttribArray(meta)
  gl.vertexAttribPointer(meta, 2, gl.FLOAT, false, stride, 12)

  gl.useProgram(program)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)
  const uniform = (name: string) => gl.getUniformLocation(program, name)
  const uniforms = {
    time: uniform('u_time'),
    sweep: uniform('u_sweep'),
    yaw: uniform('u_yaw'),
    pitch: uniform('u_pitch'),
    pixel: uniform('u_pixel'),
    light: uniform('u_light'),
    view: uniform('u_view'),
    centre: uniform('u_centre'),
    radar: uniform('u_radar'),
    strong: uniform('u_strong'),
    dim: uniform('u_dim'),
    from: uniform('u_from'),
    to: uniform('u_to'),
  }
  let width = 0
  let height = 0
  let ratio = 1

  return {
    resize(nextWidth, nextHeight, pixelRatio) {
      width = nextWidth
      height = nextHeight
      ratio = pixelRatio
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      gl.viewport(0, 0, canvas.width, canvas.height)
    },
    setColours(colours) {
      gl.uniform3fv(uniforms.radar, colours.radar)
      gl.uniform3fv(uniforms.strong, colours.strong)
      gl.uniform3fv(uniforms.dim, colours.dim)
      gl.uniform3fv(uniforms.from, colours.from)
      gl.uniform3fv(uniforms.to, colours.to)
      gl.uniform1f(uniforms.light, colours.light ? 1 : 0)
    },
    draw(frame) {
      if (width < 2 || height < 2) return
      const { unit, centreY } = sceneLayout(width, height)
      gl.uniform2f(uniforms.view, (2 * unit) / width, (2 * unit) / height)
      gl.uniform2f(uniforms.centre, 0, 1 - (2 * centreY) / height)
      gl.uniform1f(
        uniforms.pixel,
        ratio * Math.min(1.35, Math.max(0.75, unit / 150)),
      )
      gl.uniform1f(uniforms.time, frame.time)
      gl.uniform1f(uniforms.sweep, frame.sweep)
      gl.uniform1f(uniforms.yaw, frame.yaw)
      gl.uniform1f(uniforms.pitch, frame.pitch)
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
