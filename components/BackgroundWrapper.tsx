"use client";
import LightRays from "./animations/LightRays";

export default function BackgroundWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 bg-white" />
      <div className="fixed inset-0 z-10 pointer-events-none" style={{ opacity: 0.25 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          pulsating={false}
          fadeDistance={1}
          saturation={1.0}
          followMouse
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
