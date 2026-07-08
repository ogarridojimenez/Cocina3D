"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export function Lighting() {
  const { gl } = useThree();

  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  return (
    <>
      {/* Hemisphere light: cielo azul + suelo cálido */}
      <hemisphereLight
        args={["#87CEEB", "#B0A090", 0.6]}
      />

      {/* Direccional principal con sombras suaves */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />

      {/* Luz de relleno desde atrás */}
      <directionalLight position={[-5, 5, -10]} intensity={0.3} />
    </>
  );
}
