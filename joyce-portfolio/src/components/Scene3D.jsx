import { useRef, useMemo, useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

const MINT = new THREE.Color('#4FF3C8')
const IRIS = new THREE.Color('#6E5BFF')
const ROSE = new THREE.Color('#FF5F9E')
const SOLAR = new THREE.Color('#FFBE4D')

const CHIP = 1.75 // half-width of the IC package
const PAD_R = 6.4 // where traces start

/* ------------------------------------------------------------------ *
 * Traces — routed the way a real board is: a straight run along the
 * dominant axis, then a 45° chamfer into the pad. Right angles alone
 * look like a maze; chamfers are what make it read as a PCB.
 *
 * Each route carries cumulative arc length as an attribute, so a pulse
 * travels the whole path rather than restarting at every corner.
 * ------------------------------------------------------------------ */
function useRoutes(count) {
  return useMemo(() => {
    const verts = []
    const progress = []
    const seeds = []
    const pads = []

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.22
      const radius = PAD_R * (0.72 + Math.random() * 0.5)

      const start = new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      )
      const end = new THREE.Vector3(
        Math.cos(angle) * CHIP * 1.05,
        0,
        Math.sin(angle) * CHIP * 1.05
      )

      const dx = end.x - start.x
      const dz = end.z - start.z
      const adx = Math.abs(dx)
      const adz = Math.abs(dz)
      const run = Math.min(adx, adz) // length consumed by the 45° leg

      // Travel the dominant axis first, then cut diagonally into the pad.
      const corner =
        adx >= adz
          ? new THREE.Vector3(start.x + Math.sign(dx) * (adx - run), 0, start.z)
          : new THREE.Vector3(start.x, 0, start.z + Math.sign(dz) * (adz - run))

      const pts = [start, corner, end]

      const lengths = []
      let total = 0
      for (let k = 0; k < pts.length - 1; k++) {
        const L = pts[k].distanceTo(pts[k + 1])
        lengths.push(L)
        total += L
      }
      if (total < 0.001) continue

      const seed = Math.random()
      let acc = 0

      for (let k = 0; k < pts.length - 1; k++) {
        const p0 = acc / total
        acc += lengths[k]
        const p1 = acc / total

        verts.push(pts[k].x, pts[k].y, pts[k].z, pts[k + 1].x, pts[k + 1].y, pts[k + 1].z)
        progress.push(p0, p1)
        seeds.push(seed, seed)
      }

      pads.push(start)
    }

    return {
      positions: new Float32Array(verts),
      progress: new Float32Array(progress),
      seeds: new Float32Array(seeds),
      vertexCount: progress.length,
      pads,
    }
  }, [count])
}

const TRACE_VERT = /* glsl */ `
  attribute float aProgress;
  attribute float aSeed;
  varying float vProgress;
  varying float vSeed;

  void main() {
    vProgress = aProgress;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const TRACE_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCopper;
  uniform vec3 uCurrent;
  varying float vProgress;
  varying float vSeed;

  void main() {
    // Pulses run inward, toward the chip.
    float head = fract(uTime * 0.22 + vSeed);
    float d = abs((1.0 - vProgress) - head);
    d = min(d, 1.0 - d);
    float glow = smoothstep(0.13, 0.0, d);

    vec3 col = mix(uCopper, uCurrent, glow);
    gl_FragColor = vec4(col, 0.16 + glow * 0.75);
  }
`

function Traces() {
  const mat = useRef()
  const { positions, progress, seeds, vertexCount, pads } = useRoutes(30)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCopper: { value: new THREE.Color('#3A2E5E') },
      uCurrent: { value: MINT },
    }),
    []
  )

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta
  })

  return (
    <group>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={vertexCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aProgress"
            count={vertexCount}
            array={progress}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aSeed"
            count={vertexCount}
            array={seeds}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={mat}
          vertexShader={TRACE_VERT}
          fragmentShader={TRACE_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>

      {/* Solder pads where each route terminates */}
      {pads.map((p, i) => (
        <mesh key={i} position={p} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.055, 0.1, 16]} />
          <meshBasicMaterial color={SOLAR} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ *
 * The IC — package, pin rows on all four edges, and the orientation
 * dot every real chip carries in one corner.
 * ------------------------------------------------------------------ */
function Pins() {
  const ref = useRef()

  const slots = useMemo(() => {
    const out = []
    const perSide = 9
    const span = CHIP * 1.5

    for (let side = 0; side < 4; side++) {
      for (let i = 0; i < perSide; i++) {
        const t = (i / (perSide - 1) - 0.5) * span
        const offset = CHIP * 0.92

        // Sides 0/2 run along X, sides 1/3 along Z.
        const pos =
          side === 0
            ? new THREE.Vector3(t, 0, offset)
            : side === 1
              ? new THREE.Vector3(offset, 0, t)
              : side === 2
                ? new THREE.Vector3(t, 0, -offset)
                : new THREE.Vector3(-offset, 0, t)

        out.push({ pos, rot: side % 2 === 0 ? 0 : Math.PI / 2 })
      }
    }
    return out
  }, [])

  useLayoutEffect(() => {
    const dummy = new THREE.Object3D()
    slots.forEach((s, i) => {
      dummy.position.copy(s.pos)
      dummy.rotation.set(0, s.rot, 0)
      dummy.updateMatrix()
      ref.current.setMatrixAt(i, dummy.matrix)
    })
    ref.current.instanceMatrix.needsUpdate = true
  }, [slots])

  return (
    <instancedMesh ref={ref} args={[null, null, slots.length]} castShadow={false}>
      <boxGeometry args={[0.07, 0.05, 0.34]} />
      <meshStandardMaterial
        color={SOLAR}
        metalness={0.9}
        roughness={0.28}
        emissive={SOLAR}
        emissiveIntensity={0.22}
        toneMapped={false}
      />
    </instancedMesh>
  )
}

function Chip() {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    // Barely moves — the board should feel seated, not floating in space.
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.045
  })

  return (
    <group ref={group}>
      <Pins />

      {/* Package */}
      <mesh position={[0, 0.11, 0]}>
        <boxGeometry args={[CHIP * 1.9, 0.22, CHIP * 1.9]} />
        <meshStandardMaterial color="#0B0A1C" metalness={0.45} roughness={0.55} />
      </mesh>

      {/* Etched lid, lit from within */}
      <mesh position={[0, 0.225, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CHIP * 1.52, CHIP * 1.52]} />
        <meshBasicMaterial color="#171338" toneMapped={false} />
      </mesh>

      {/* Die */}
      <mesh position={[0, 0.232, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[CHIP * 0.72, CHIP * 0.72]} />
        <meshBasicMaterial color={IRIS} transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Pin-1 marker */}
      <mesh position={[-CHIP * 0.62, 0.233, -CHIP * 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 20]} />
        <meshBasicMaterial color={MINT} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* Status LEDs, each blinking on its own clock. */
const LED_SPOTS = [
  { pos: [2.9, 0.06, 2.9], color: MINT, rate: 1.7 },
  { pos: [-3.3, 0.06, 2.4], color: SOLAR, rate: 1.1 },
  { pos: [3.4, 0.06, -2.6], color: ROSE, rate: 2.3 },
  { pos: [-2.7, 0.06, -3.2], color: MINT, rate: 0.8 },
]

function Leds() {
  const refs = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    refs.current.forEach((m, i) => {
      if (!m) return
      const spot = LED_SPOTS[i]
      // Sharp on/off rather than a sine, so it reads as a status light.
      const on = Math.pow((Math.sin(t * spot.rate) + 1) / 2, 6)
      m.material.opacity = 0.18 + on * 0.82
    })
  })

  return (
    <>
      {LED_SPOTS.map((spot, i) => (
        <mesh
          key={i}
          position={spot.pos}
          ref={(el) => {
            refs.current[i] = el
          }}
        >
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshBasicMaterial color={spot.color} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ *
 * Software layer — a wireframe volume suspended over the die, tied to
 * it by a column of light. Hardware below, what runs on it above.
 * ------------------------------------------------------------------ */
function Runtime() {
  const shell = useRef()
  const inner = useRef()

  useFrame((state, delta) => {
    const bob = Math.sin(state.clock.elapsedTime * 0.7) * 0.12
    if (shell.current) {
      shell.current.rotation.y += delta * 0.25
      shell.current.rotation.x -= delta * 0.12
      shell.current.position.y = 2.6 + bob
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4
      inner.current.position.y = 2.6 + bob
    }
  })

  return (
    <group>
      <mesh ref={shell} position={[0, 2.6, 0]}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color={MINT} wireframe transparent opacity={0.4} toneMapped={false} />
      </mesh>

      <mesh ref={inner} position={[0, 2.6, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color={IRIS} transparent opacity={0.55} toneMapped={false} />
      </mesh>

      {/* Column joining die to runtime */}
      <mesh position={[0, 1.42, 0]}>
        <cylinderGeometry args={[0.055, 0.28, 2.3, 20, 1, true]} />
        <meshBasicMaterial
          color={IRIS}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

/* Faint motes, purely to keep the empty space from reading as flat. */
const MOTE_VERT = /* glsl */ `
  uniform float uTime;
  attribute float aScale;
  attribute float aPhase;
  varying float vFade;

  void main() {
    vec3 p = position;
    p.y += sin(uTime * 0.4 + aPhase) * 0.5;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = aScale * (260.0 / max(-mv.z, 0.1));
    gl_Position = projectionMatrix * mv;
    vFade = smoothstep(26.0, 6.0, -mv.z);
  }
`

const MOTE_FRAG = /* glsl */ `
  uniform vec3 uColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    gl_FragColor = vec4(uColor, smoothstep(0.5, 0.05, d) * vFade * 0.3);
  }
`

function Motes({ count = 700 }) {
  const mat = useRef()

  const { positions, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26
      positions[i * 3 + 1] = Math.random() * 9 - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * 26
      scales[i] = 1.2 + Math.random() * 2.4
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, scales, phases }
  }, [count])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color('#9B93D8') } }),
    []
  )

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aPhase" count={count} array={phases} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        vertexShader={MOTE_VERT}
        fragmentShader={MOTE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* Board leans toward the pointer; scroll lifts the camera over it. */
function Rig({ children, reduced, progress }) {
  const group = useRef()

  useFrame((state, delta) => {
    const damp = 1 - Math.pow(0.0015, delta)

    if (group.current && !reduced) {
      group.current.rotation.y += (state.pointer.x * 0.26 - group.current.rotation.y) * damp
      group.current.rotation.z += (-state.pointer.y * 0.1 - group.current.rotation.z) * damp
    }

    const p = progress.current
    state.camera.position.y += (5.1 + p * 3.2 - state.camera.position.y) * damp
    state.camera.position.z += (7.9 - p * 2.6 - state.camera.position.z) * damp
    state.camera.lookAt(0, 0.5, 0)
  })

  return <group ref={group}>{children}</group>
}

export default function Scene3D({ reduced = false, progress, paused = false }) {
  // ChromaticAberrationEffect reads .x / .y off this, so it must be a real Vector2.
  const aberration = useMemo(() => new THREE.Vector2(0.0003, 0.0004), [])
  const fallback = useRef(0)
  const energy = progress ?? fallback

  return (
    <Canvas
      camera={{ position: [0, 5.1, 7.9], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
      frameloop={reduced || paused ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 9, 4]} intensity={1.4} />
      <pointLight position={[0, 2.4, 0]} intensity={26} color={MINT} distance={12} />
      <pointLight position={[-6, 3, -5]} intensity={20} color={IRIS} distance={18} />

      <Rig reduced={reduced} progress={energy}>
        <Traces />
        <Chip />
        <Leds />
        <Runtime />
        <Motes />
      </Rig>

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.28}
          mipmapBlur
          radius={0.7}
        />
        <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={aberration} />
        <Vignette eskil={false} offset={0.2} darkness={0.95} />
      </EffectComposer>
    </Canvas>
  )
}
