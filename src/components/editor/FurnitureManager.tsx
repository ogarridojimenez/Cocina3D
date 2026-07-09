"use client";

import { useWallStore } from "@/lib/store";
import { FurnitureMesh } from "@/components/3d/FurnitureObject";
import { Window } from "@/components/3d/Window";

export function FurnitureManager() {
  const objects = useWallStore((s) => s.objects);

  return (
    <group>
      {objects.map((obj) =>
        obj.type === "window" ? (
          <Window key={obj.id} object={obj} />
        ) : (
          <FurnitureMesh key={obj.id} object={obj} />
        )
      )}
    </group>
  );
}
