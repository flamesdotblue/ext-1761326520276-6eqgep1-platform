import { Suspense, useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

function SunLight({ timeOfDay = 0.5, sunRotation = 0 }) {
  const dirLight = useRef();
  const target = useMemo(() => new THREE.Object3D(), []);

  const params = useMemo(() => {
    const t = THREE.MathUtils.clamp(timeOfDay, 0, 1);
    const elevation = THREE.MathUtils.lerp(5, 80, t); // degrees
    const azimuthDeg = THREE.MathUtils.lerp(0, 360, sunRotation % 1);

    const warm = new THREE.Color(0xffb26b);
    const cool = new THREE.Color(0xffffff);
    const color = warm.clone().lerp(cool, t);

    const intensity = THREE.MathUtils.lerp(0.7, 2.0, t);
    const ambientIntensity = THREE.MathUtils.lerp(0.15, 0.35, t);
    const ambientColor = new THREE.Color(0xffffff).lerp(new THREE.Color(0xfff1e0), 1 - t * 0.4);

    return { elevation, azimuthDeg, color, intensity, ambientIntensity, ambientColor };
  }, [timeOfDay, sunRotation]);

  useEffect(() => {
    if (!dirLight.current) return;
    const r = 60;
    const phi = THREE.MathUtils.degToRad(90 - params.elevation);
    const theta = THREE.MathUtils.degToRad(params.azimuthDeg);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);

    dirLight.current.position.set(x, y, z);
    dirLight.current.color.copy(params.color);
    dirLight.current.intensity = params.intensity;
  }, [params]);

  return (
    <>
      <ambientLight color={params.ambientColor} intensity={params.ambientIntensity} />
      <directionalLight
        ref={dirLight}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
      >
        <primitive object={target} />
      </directionalLight>
    </>
  );
}

function Ground() {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.0001, 0]}> 
      <planeGeometry args={[200, 200]} />
      <shadowMaterial opacity={0.25} />
    </mesh>
  );
}

export default function Experience({ lighting, children }) {
  return (
    <>
      <color attach="background" args={[0x0b0b0b]} />
      <fog attach="fog" args={[0x0b0b0b, 40, 200]} />
      <Suspense fallback={null}>{children}</Suspense>
      <Ground />
      <SunLight timeOfDay={lighting.timeOfDay} sunRotation={lighting.sunRotation} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} target={[0, 1, 0]} />
    </>
  );
}
