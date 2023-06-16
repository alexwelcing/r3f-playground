import { OrbitControls, Text } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import { Group } from 'three'
import { Echo3D } from 'echo3d'
import { useThree, useFrame } from '@react-three/fiber'


function Scene() {
  const { performance } = useControls('Monitoring', {
    performance: false,
  })

  const { animate } = useControls('Cube', {
    animate: true,
  })

  function AdaptedEcho3D(props) {
      // This component gets the native three.js scene object
  const { scene } = useThree()

  // On every frame we can potentially update the object
  useFrame(({ clock }) => {
    // Update the object using the clock elapsed time or other factors
  })

  useEffect(() => {
    // The component mounts

    // We instantiate the Echo3D object with the native scene
    const echo3DInstance = new Echo3D({ scene, ...props })

    // We add the object to the scene
    scene.add(echo3DInstance)

    return () => {
      // The component unmounts

      // Don't forget to clean up after yourself
      scene.remove(echo3DInstance)
      echo3DInstance.dispose()
    }
  }, [scene, props]) // Make sure to respect the dependencies

  return null
}

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
