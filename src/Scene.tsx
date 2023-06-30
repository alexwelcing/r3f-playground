import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { useEffect, useState } from 'react';
import { Sphere } from './components/Sphere';
import { Text } from '@react-three/drei';
import axios from 'axios';
import { useGLTF } from '@react-three/drei';
import Cube from './components/Cube';

const API_KEY = 'shrill-field-6918';
const ENTRY_ID1 = '86b5c05c-95ac-4c77-a663-a6192ee937a8';
const ENTRY_ID2 = '2a15bdf2-9713-4361-8e5b-638a416c053d';

type EchoObjectType = {
  url: string;
} | null;

function Scene() {
  const [echoObject1, setEchoObject1] = useState<EchoObjectType>(null);
  const [echoObject2, setEchoObject2] = useState<EchoObjectType>(null);
  const [isLightOn, setIsLightOn] = useState(false);

  useEffect(() => {
    const fetchData = async (ENTRY_ID: string) => {
      const result = await axios.get(`https://api.echo3D.com/query?key=${API_KEY}&entry=${ENTRY_ID}`);
      const entry = result.data.db[ENTRY_ID];

      let srcFile = "https://api.echo3D.com/query?key=" + API_KEY + "&file=";
      let typeFile = entry.hologram.filename.toLowerCase().split('.').pop();

      switch (entry.hologram.type) {
        case 'VIDEO_HOLOGRAM':
        case 'IMAGE_HOLOGRAM':
          srcFile += entry.hologram.storageID;
          break;
        case 'MODEL_HOLOGRAM':
          if (entry.additionalData.glbHologramStorageID) {
            srcFile += entry.additionalData.glbHologramStorageID;
          } else {
            srcFile += entry.hologram.storageID;
          }
          break;
      }

      return { url: srcFile };
    };

    fetchData(ENTRY_ID1).then(data => setEchoObject1(data));
    fetchData(ENTRY_ID2).then(data => setEchoObject2(data));
  }, []);

  return (
    <>
      <Perf position='top-left' />
      <OrbitControls makeDefault />
      <directionalLight
        position={[-4, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />
      <Sphere position-x={0} position-y={2} />
      <Cube onClick={() => setIsLightOn(!isLightOn)} />
      <Text
        color='#171717'
        anchorX='center'
        anchorY='top'
        fontSize={.5}
        position-z={5}
        position-y={3}
      >
        Alex's echo3D playground
      </Text>

      {echoObject1 && <primitive object={useGLTF(echoObject1.url, true).scene} scale={[3.0, 3.0, 3.0]} dispose={null} />}
      {echoObject2 && <primitive object={useGLTF(echoObject2.url, true).scene} scale={[0.1, 0.1, 0.1]} position={[2, 3, 0]} dispose={null} />}
    </>
  );
}

export { Scene };
