"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { exportGLTF, screenshotCanvas } from "@/lib/export";
import { useWallStore } from "@/lib/store";

/**
 * Componente interno del Canvas que escucha flags de exportación
 */
export function ExportManager() {
  const { scene, gl } = useThree();
  const triggeredExport = useRef(false);

  const walls = useWallStore((s) => s.walls);
  const objects = useWallStore((s) => s.objects);

  // Watch for export trigger
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      if (e.detail?.type === "gltf") {
        // Clone the scene to avoid modifying the live one
        exportGLTF(scene, "cocina3d-diseno.glb");
      } else if (e.detail?.type === "screenshot") {
        screenshotCanvas(gl.domElement);
      }
    };

    window.addEventListener("cocina3d-export" as any, handler as any);
    return () => window.removeEventListener("cocina3d-export" as any, handler as any);
  }, [scene, gl]);

  return null;
}
