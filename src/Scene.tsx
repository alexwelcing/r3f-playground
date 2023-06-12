import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
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

  const cubeRef = useRef<Mesh<BoxGeometry, MeshBasicMaterial>>(null)

  const cubeGroupRef = useRef<Group>(null)

  useFrame((_, delta) => {
    if (animate) {
      cubeGroupRef.current!.children[0].rotation.y += delta / 3
      cubeGroupRef.current!.children[1].rotation.y -= delta / 3
    }
  })

  return (
    <>
      {performance && <Perf position='top-left' />}

      <OrbitControls makeDefault />

      <directionalLight
        position={[-4, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />

      <group ref={cubeGroupRef}>
      <Cube position={[0, 0, 0]} />
      <Cube position={[0, 1.5, 0]} />
    </group>
      <Sphere />
      <Plane />
      <Text
        position={[0, 2, 0]} // Position to be set according to where the cube and sphere are located
        fontSize={1}
        color={'rgb(128,238,211)'} // Change to your preferred color
      >
        Alex's playground
      </Text>
    </>
  )
}

export { Scene }
