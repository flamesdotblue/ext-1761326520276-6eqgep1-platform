import * as Slider from "@radix-ui/react-slider";
import { useRef } from "react";
import { Settings, Upload } from "lucide-react";

export default function LightingControls({ timeOfDay, onTimeChange, sunRotation, onRotationChange, onPickModel }) {
  const fileInputRef = useRef(null);

  return (
    <div className="flex flex-col gap-3 items-stretch">
      <div className="rounded-xl bg-black/50 backdrop-blur border border-white/10 p-3 w-[min(92vw,780px)]">
        <div className="flex items-center gap-2 mb-2 text-xs tracking-wide uppercase text-white/70">
          <Settings size={14} /> Lighting
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Time of Day</span>
              <span>{Math.round(timeOfDay * 100)}%</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none h-6"
              value={[timeOfDay]}
              onValueChange={([v]) => onTimeChange?.(v)}
              max={1}
              step={0.01}
            >
              <Slider.Track className="bg-white/15 relative grow rounded-full h-1.5">
                <Slider.Range className="absolute h-full bg-white/80 rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block size-4 rounded-full bg-white shadow-md hover:scale-105 transition-transform" aria-label="Time of Day" />
            </Slider.Root>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Sun Rotation</span>
              <span>{Math.round(sunRotation * 360)}°</span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none h-6"
              value={[sunRotation]}
              onValueChange={([v]) => onRotationChange?.(v)}
              max={1}
              step={0.001}
            >
              <Slider.Track className="bg-white/15 relative grow rounded-full h-1.5">
                <Slider.Range className="absolute h-full bg-white/80 rounded-full" />
              </Slider.Track>
              <Slider.Thumb className="block size-4 rounded-full bg-white shadow-md hover:scale-105 transition-transform" aria-label="Sun Rotation" />
            </Slider.Root>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="rounded-xl bg-black/50 backdrop-blur border border-white/10 p-3 w-[min(92vw,780px)] flex items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            <Upload size={16} /> Load GLB
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.gltf,model/gltf-binary"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onPickModel?.(file);
              e.currentTarget.value = "";
            }}
          />
          <div className="text-xs text-white/70">Drop-in a GLB file to replace the model. Large files may take time to load.</div>
        </div>
      </div>
    </div>
  );
}
