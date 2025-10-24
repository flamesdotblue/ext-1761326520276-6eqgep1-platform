import { useState, useMemo } from "react";
import SceneCanvas from "./components/SceneCanvas";
import Experience from "./components/Experience";
import LightingControls from "./components/LightingControls";
import Model from "./components/Model";

export default function App() {
  const [timeOfDay, setTimeOfDay] = useState(0.6); // 0..1
  const [sunRotation, setSunRotation] = useState(0.25); // 0..1 representing azimuth
  const [modelUrl, setModelUrl] = useState(null);

  const lighting = useMemo(() => ({ timeOfDay, sunRotation }), [timeOfDay, sunRotation]);

  return (
    <div className="relative h-dvh w-dvw bg-black text-white overflow-hidden">
      <SceneCanvas lighting={lighting}>
        <Experience lighting={lighting}>
          <Model url={modelUrl} />
        </Experience>
      </SceneCanvas>

      <div className="pointer-events-none absolute inset-0 flex items-start justify-between p-4">
        <div className="pointer-events-auto rounded-lg bg-black/40 backdrop-blur border border-white/10 px-4 py-2">
          <h1 className="text-sm font-medium tracking-wide">Image-to-World Viewer</h1>
          <p className="text-xs text-white/70">Orbit to explore. Use controls below to adjust sun.</p>
        </div>

        <div className="pointer-events-auto">
          <LightingControls
            timeOfDay={timeOfDay}
            onTimeChange={setTimeOfDay}
            sunRotation={sunRotation}
            onRotationChange={setSunRotation}
            onPickModel={(fileOrUrl) => {
              if (!fileOrUrl) return;
              if (typeof fileOrUrl === "string") {
                setModelUrl(fileOrUrl);
              } else if (fileOrUrl instanceof File) {
                const url = URL.createObjectURL(fileOrUrl);
                setModelUrl(url);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
