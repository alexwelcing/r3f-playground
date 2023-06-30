import React from 'react';
import { Mesh } from 'three';

interface CubeProps {
  onClick: () => void;
}

const Cube: React.FC<CubeProps> = ({ onClick }) => {
  const cubeRef = React.useRef<Mesh>();

  return (
    <mesh ref={cubeRef} onClick={onClick} position={[0, 1, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#DAA520"} />
    </mesh>
  );
};

export default Cube;
