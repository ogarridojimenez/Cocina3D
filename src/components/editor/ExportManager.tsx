"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { exportGLTF, screenshotCanvas, saveSceneFile, loadSceneFile } from "@/lib/export";
import { useWallStore } from "@/lib/store";

/**
 * Componente interno del Canvas que escucha flags de exportación/importación
 */
export function ExportManager() {
  const { scene, gl } = useThree();
  const walls = useWallStore((s) => s.walls);
  const objects = useWallStore((s) => s.objects);
  const clearScene = useWallStore((s) => s.clearScene);
  const loadFullState = useWallStore((s) => s.loadFullState);

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const detail = e.detail || {};
      switch (detail.type) {
        case "gltf":
          exportGLTF(scene, "cocina3d-diseno.glb");
          break;
        case "screenshot":
          screenshotCanvas(gl.domElement);
          break;
        case "save":
          saveSceneFile(walls, objects);
          break;
        case "load":
          loadSceneFile().then((data) => {
            if (data) loadFullState(data);
          });
          break;
        case "new":
          if (walls.length > 0 || objects.length > 0) {
            if (confirm("¿Estás seguro? Se perderá la escena actual.")) {
              clearScene();
            }
          }
          break;
      }
    };

    window.addEventListener("cocina3d-export" as any, handler as any);
    return () => window.removeEventListener("cocina3d-export" as any, handler as any);
  }, [scene, gl, walls, objects, clearScene, loadFullState]);

  return null;
}
