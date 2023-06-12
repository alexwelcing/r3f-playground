import { MeshProps } from '@react-three/fiber'
import { forwardRef } from 'react'
import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

type CubeType = Mesh<BoxGeometry, MeshBasicMaterial>
type CubeProps = MeshProps & { }

const Cube = forwardRef<CubeType, CubeProps>(({ position }, ref) => (
  <mesh ref={ref} position={position} castShadow>
    <boxGeometry args={[1.5, 1.5, 1.5]} />
    <meshStandardMaterial color={'rgb(255,78,80)'} />
  </mesh>
))

export { Cube }