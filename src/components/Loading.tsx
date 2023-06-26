// components/Loading.tsx

import { Html, useProgress } from '@react-three/drei';

function Loading() {
  const { progress } = useProgress();

  return (
    <Html center>
      <span>Loading: {Math.trunc(progress)} %</span>
    </Html>
  );
}

export default Loading;