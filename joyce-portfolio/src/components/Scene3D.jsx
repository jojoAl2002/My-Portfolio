import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Generates a set of nodes loosely arranged like a network graph,
// with edges connecting nearby nodes — a nod to full-stack architecture
// and the AI interaction-checking model on Joyce's CV.
function useNetwork(count, radius) {
  return useMemo(() => {
    const nodes = []
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = radius * (0.75 + Math.random() * 0.25)
      nodes.push(
        new THREE.Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        )
      )
    }
    const edges = []
    for (let i = 0; i < nodes.length; i++) {
      let closest = []
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue
        closest.push([j, nodes[i].distanceTo(nodes[j])])
      }
      closest.sort((a, b) => a[1] - b[1])
      closest.slice(0, 2).forEach(([j]) => {
        if (i < j) edges.push([nodes[i], nodes[j]])
      })
    }
    return { nodes, edges }
  }, [count, radius])
}

function NetworkGraph() {
  const group = useRef()
  const { nodes, edges } = useNetwork(46, 3.4)

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      arr[i * 6] = a.x
      arr[i * 6 + 1] = a.y
      arr[i * 6 + 2] = a.z
      arr[i * 6 + 3] = b.x
      arr[i * 6 + 4] = b.y
      arr[i * 6 + 5] = b.z
    })
    return arr
  }, [edges])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.06
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#2C3B63" transparent opacity={0.55} />
      </lineSegments>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i % 5 === 0 ? 0.055 : 0.03, 12, 12]} />
          <meshBasicMaterial color={i % 5 === 0 ? '#4FE0D8' : '#8E7CFF'} />
        </mesh>
      ))}
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <NetworkGraph />
    </Canvas>
  )
}
