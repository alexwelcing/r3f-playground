import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'
import { Group } from 'three';

type LampProps = {
  url: string;
} & JSX.IntrinsicElements['group'];

const Lamp = forwardRef<Group, LampProps>(({ url, ...props }, ref) => {
  const gltf: any = useGLTF(url)

  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  )
})

export { Lamp }
