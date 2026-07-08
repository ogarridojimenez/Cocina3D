"use client";

import { useWallStore } from "@/lib/store";
import { FurnitureMesh } from "@/components/3d/FurnitureObject";

export function FurnitureManager() {
  const objects = useWallStore((s) => s.objects);

  return (
    <group>
      {objects.map((obj) => (
        <FurnitureMesh key={obj.id} object={obj} />
      ))}
    </group>
  );
}
