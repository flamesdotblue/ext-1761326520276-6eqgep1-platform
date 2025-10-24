import { Canvas } from "@react-three/fiber";

export default function SceneCanvas({ lighting, children }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ fov: 60, position: [4, 3, 6], near: 0.1, far: 5000 }}
      className="h-dvh w-dvw"
    >
      {children}
    </Canvas>
  );
}
