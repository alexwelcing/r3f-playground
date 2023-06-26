import { PivotControls } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { BufferGeometry, Group, Mesh, MeshStandardMaterial } from 'three'
import { useThree, useFrame } from '@react-three/fiber'

function Sphere() {
  const sphereRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null)
  const pivotRef = useRef<Group>(null)

  const { position, color, gizmo } = useControls('Sphere', {
    position: [0, 2, 0],
    color: 'rgb(242,171,30)',
    gizmo: false,
  })

  const { size } = useThree()
  const aspect = size.width / size.height

  useFrame(({ camera }) => {
    camera.updateProjectionMatrix()
  })

  const growOnPointerDown = () => {
    sphereRef.current!.scale.x += 0.1
    sphereRef.current!.scale.y += 0.1
    sphereRef.current!.scale.z += 0.1
  }

  return (
    <PivotControls anchor={[0, 0, 0]} depthTest={false} visible={gizmo} ref={pivotRef}>
      <mesh position={position} ref={sphereRef} castShadow onPointerDown={growOnPointerDown}>
        <sphereGeometry args={[1, 30, 30]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </PivotControls>
  )
}

export { Sphere }
