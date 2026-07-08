"use client";

import { OrbitControls } from "@react-three/drei";
import { useWallStore } from "@/lib/store";

export function CameraController({
  minDistance = 0.5,
  maxDistance = 50,
}: {
  minDistance?: number;
  maxDistance?: number;
}) {
  const isTransforming = useWallStore((s) => s.isTransforming);
  const drawMode = useWallStore((s) => s.drawMode);

  // Bloquear cámara mientras se interactúa con gizmo o se dibuja
  const disabled = isTransforming || drawMode !== "none";

  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.1}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={0}
      maxPolarAngle={Math.PI / 2.05}
      enabled={!disabled}
    />
  );
}
