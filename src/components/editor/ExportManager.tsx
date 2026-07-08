"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { exportGLTF, saveSceneFile, loadSceneFile } from "@/lib/export";
import { useWallStore } from "@/lib/store";

/**
 * Componente interno del Canvas que escucha flags de exportación/importación
 */
export function ExportManager() {
  const { scene, gl, camera } = useThree();
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
        case "screenshot": {
          // Force render before capture
          gl.render(scene, camera);
          const dataUrl = gl.domElement.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = dataUrl;
          a.download = "cocina3d-captura.png";
          a.click();
          break;
        }
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
  }, [scene, gl, camera, walls, objects, clearScene, loadFullState]);

  return null;
}
