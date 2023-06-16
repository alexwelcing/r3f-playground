import { OrbitControls, Text } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { Group } from 'three'
import { Echo3D } from 'echo3d'

function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  const { animate } = useControls('Cube', {
    animate: true,
  })

  const cubeGroupRef = useRef<Group>(null!)

  return (
    <>
      <Canvas camera={{ position: [5, 5, 10], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Echo3D
          projectId="shrill-field-6918"
          entryId="2a15bdf2-9713-4361-8e5b-638a416c053d"
          securityKey="2a15bdf2-9713-4361-8e5b-638a416c053d"
        />
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
      {performance && <Perf />}
    </>
  )
}

export { Scene }
