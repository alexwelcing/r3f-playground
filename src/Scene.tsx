import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useEffect, useState } from 'react'
import { Plane } from './components/Plane'
import { Sphere } from './components/Sphere'
import { Text } from '@react-three/drei'
import axios from 'axios';

const API_KEY = 'shrill-field-6918';
const ENTRY_ID = '86b5c05c-95ac-4c77-a663-a6192ee937a8';

type EchoObjectType = {
  url: string;
} | null;

function Scene() {
  const [echoObject, setEchoObject] = useState<EchoObjectType>(null);
  const gltf = useGLTF(echoObject?.url || '', true);

  useEffect(() => {
    const fetchData = async () => {
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
          switch (typeFile) {
            case 'glb':
              srcFile += entry.hologram.storageID;
              break;
            case 'gltf':
            case 'obj':
            case 'fbx':
              srcFile += entry.additionalData.glbHologramStorageID;
              break;
          }
          break;
      }

      setEchoObject({ url: srcFile });
    };

    fetchData();
  }, []);

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
      <Perf position='top-left' />
      <OrbitControls makeDefault />
      <directionalLight
        position={[-4, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024 * 2, 1024 * 2]}
      />
      <ambientLight intensity={0.2} />
      <Plane position-y={-0.2} />
      <Sphere position-x={0} position-y={1.7} />
      <Text
        color='#171717'
        anchorX='center'
        anchorY='middle'
        fontSize={1}
        position-z={-5}
      >
        r3f-playground
      </Text>
      {echoObject && <primitive object={gltf.scene} dispose={null} />}
    </>
  );
}

export { Scene };
