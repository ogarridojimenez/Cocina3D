"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useWallStore } from "@/lib/store";
import { buildPBRMaterial } from "@/lib/materials";

export function FloorPlane() {
  const floorMaterialId = useWallStore((s) => s.floorMaterialId);
  const floorSize = 10;

  const material = useMemo(() => {
    if (floorMaterialId) {
      const pbr = buildPBRMaterial(floorMaterialId, "#d4cfc8");
      if (pbr) return pbr;
    }
    // Default floor: light gray
    return new THREE.MeshStandardMaterial({
      color: 0xd4cfc8,
      roughness: 0.8,
      metalness: 0,
    });
  }, [floorMaterialId]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
    >
      <planeGeometry args={[floorSize, floorSize]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
