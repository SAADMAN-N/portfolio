import { GlowEffect } from "@/components/ui/glow-effect";

export function GlowEffectCardBackground() {
  return (
    <div className="relative h-44 w-64">
      <GlowEffect
        colors={["#0894FF", "#C959DD", "#FF2E54", "#FF9004"]}
        mode="static"
        blur="medium"
      />
      <div className="relative h-44 w-64 rounded-lg bg-black p-2 text-white dark:bg-white dark:text-black">
        <svg
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 70 70"
          aria-label="MP Logo"
          width="70"
          height="70"
          className="absolute bottom-4 right-4 h-8 w-8"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="3"
            d="M51.883 26.495c-7.277-4.124-18.08-7.004-26.519-7.425-2.357-.118-4.407-.244-6.364 1.06M59.642 51c-10.47-7.25-26.594-13.426-39.514-15.664-3.61-.625-6.744-1.202-9.991.263"
          ></path>
        </svg>
      </div>
    </div>
  );
}

// Additional demo components showcasing different modes
export function GlowEffectShowcase() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Rotate Mode */}
      <div className="relative h-44 w-64">
        <GlowEffect
          colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
          mode="rotate"
          blur="medium"
          duration={6}
        />
        <div className="relative h-44 w-64 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2">Rotate</h3>
          <p className="text-sm opacity-80">Conic gradient rotation</p>
        </div>
      </div>

      {/* Pulse Mode */}
      <div className="relative h-44 w-64">
        <GlowEffect
          colors={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"]}
          mode="pulse"
          blur="strong"
          duration={3}
        />
        <div className="relative h-44 w-64 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2">Pulse</h3>
          <p className="text-sm opacity-80">Radial pulse effect</p>
        </div>
      </div>

      {/* Breathe Mode */}
      <div className="relative h-44 w-64">
        <GlowEffect
          colors={["#C959DD", "#FF2E54", "#FF9004", "#0894FF"]}
          mode="breathe"
          blur="soft"
          duration={4}
        />
        <div className="relative h-44 w-64 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2">Breathe</h3>
          <p className="text-sm opacity-80">Gentle breathing effect</p>
        </div>
      </div>

      {/* Color Shift Mode */}
      <div className="relative h-44 w-64">
        <GlowEffect
          colors={["#E91E63", "#9C27B0", "#673AB7", "#3F51B5"]}
          mode="colorShift"
          blur="medium"
          duration={5}
        />
        <div className="relative h-44 w-64 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-2">Color Shift</h3>
          <p className="text-sm opacity-80">Smooth color transitions</p>
        </div>
      </div>
    </div>
  );
}
