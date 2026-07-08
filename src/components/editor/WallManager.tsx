"use client";

import { useWallStore } from "@/lib/store";
import { Wall } from "@/components/3d/Wall";

export function WallManager() {
  const walls = useWallStore((s) => s.walls);

  return (
    <group>
      {walls.map((w) => (
        <Wall key={w.id} wall={w} />
      ))}
    </group>
  );
}
