import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Cube } from './components/Cube'
import { Plane } from './components/Plane'
import { Sphere } from './components/Sphere'
import { Text } from '@react-three/drei'
import { Group } from 'three'


function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  const { animate } = useControls('Cube', {
    animate: true,
  })

  function Cube() {
    const meshRef = useRef()
    useFrame((state) => {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    })
    return (
      <mesh ref={meshRef}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    )
  }

  function MovingText() {
    const textRef = useRef()
    useFrame((state) => (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2))
    return (
      <Text ref={textRef} fontSize={1} color="#555" position={[0, 0, 3]}>
        hello
      </Text>
    )
  }

  const cubeGroupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (animate) {
      cubeGroupRef.current!.children[0].rotation.y += delta / 3
      cubeGroupRef.current!.children[1].rotation.y -= delta / 3
    }
  })

  return (
    <>
    <Canvas camera={{ position: [5, 5, 10], fov: 25 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <Cube />
      <MovingText />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
    </>
  )
}

export { Scene }
