import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SIMPLEX_3D } from '../shaders/noise'

/**
 * Closing frame: a wireframe landscape driven by the same noise field as the
 * hero core, so the page opens and closes on one material. The mesh never
 * moves — the noise is sampled with a scrolling offset, which means the
 * terrain flows toward the camera with no seam to hide.
 */
const VERT = /* glsl */ `
  uniform float uTime;
  varying float vHeight;
  varying vec2 vUv;

  ${SIMPLEX_3D}

  void main() {
    vec3 p = position;

    // Sample with a moving offset: the landscape flows, the geometry sits still.
    float base   = snoise(vec3(p.x * 0.085, p.y * 0.085 + uTime * 0.16, 0.0));
    float detail = snoise(vec3(p.x * 0.26, p.y * 0.26 + uTime * 0.3, 1.7)) * 0.38;

    float h = base + detail;
    p.z += h * 2.1;

    vHeight = h;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uLow;
  uniform vec3 uMid;
  uniform vec3 uHigh;

  varying float vHeight;
  varying vec2 vUv;

  void main() {
    float t = clamp(vHeight * 0.55 + 0.5, 0.0, 1.0);

    vec3 col = mix(uLow, uMid, smoothstep(0.0, 0.6, t));
    col = mix(col, uHigh, smoothstep(0.62, 1.0, t));

    // Fade the rim so the plane dissolves instead of ending at an edge.
    float edge = smoothstep(0.52, 0.08, distance(vUv, vec2(0.5)));

    gl_FragColor = vec4(col, edge * 0.62);
  }
`

function Terrain() {
  const mat = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLow: { value: new THREE.Color('#2A2160') },
      uMid: { value: new THREE.Color('#6E5BFF') },
      uHigh: { value: new THREE.Color('#4FF3C8') },
    }),
    []
  )

  useFrame((_, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value += delta
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
      <planeGeometry args={[60, 60, 110, 110]} />
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function TerrainScene({ paused = false }) {
  return (
    <Canvas
      camera={{ position: [0, 3.6, 10], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      frameloop={paused ? 'demand' : 'always'}
      onCreated={({ camera }) => camera.lookAt(0, 0, -8)}
    >
      <Terrain />
    </Canvas>
  )
}
