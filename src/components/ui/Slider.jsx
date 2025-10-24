import * as React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

export const Slider = React.forwardRef(({ className = "", value, onValueChange, min = 0, max = 100, step = 1 }, ref) => {
  return (
    <RadixSlider.Root
      ref={ref}
      className={`relative flex h-5 w-full touch-none select-none items-center ${className}`}
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={onValueChange}
    >
      <RadixSlider.Track className="relative h-1.5 w-full grow rounded-full bg-white/10">
        <RadixSlider.Range className="absolute h-full rounded-full bg-gradient-to-r from-amber-400 to-blue-400" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block h-4 w-4 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] ring-1 ring-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" />
    </RadixSlider.Root>
  );
});

Slider.displayName = "Slider";
