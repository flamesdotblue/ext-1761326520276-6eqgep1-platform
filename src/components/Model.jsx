import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

function FallbackModel() {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 1, 0]}> 
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color="#b9d3ff" metalness={0.05} roughness={0.4} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.6, 0]} rotation={[0, Math.PI / 6, 0]}> 
        <torusKnotGeometry args={[0.4, 0.15, 128, 24]} />
        <meshStandardMaterial color="#ffd6a5" metalness={0.1} roughness={0.35} />
      </mesh>
    </group>
  );
}

export default function Model({ url }) {
  if (!url) return <FallbackModel />;
  return <GLBModel url={url} />;
}

function GLBModel({ url }) {
  const gltf = useGLTF(url, true, undefined);

  useEffect(() => {
    gltf.scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}

useGLTF.preload = (src) => {};
