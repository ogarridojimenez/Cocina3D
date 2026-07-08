"use client";

import { Grid } from "@react-three/drei";

export function GridFloor({
  size = 20,
  divisions = 20,
  color = "#cccccc",
}: {
  size?: number;
  divisions?: number;
  color?: string;
}) {
  return (
    <Grid
      args={[size, divisions]}
      position={[0, -0.01, 0]}
      cellColor={color}
      cellSize={1}
      sectionSize={5}
      sectionColor={"#888888"}
      fadeDistance={30}
      fadeStrength={1}
      followCamera={false}
    />
  );
}
