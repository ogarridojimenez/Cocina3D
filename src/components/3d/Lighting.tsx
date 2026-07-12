"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export function Lighting() {
  const { gl } = useThree();

  useEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  return (
    <>
      {/* Environment HDR — Reflejos realistas + iluminación global */}
      <Environment
        files="/textures/hdr/studio_small_09_2k.hdr"
        resolution={1024}
        background={false}
      />

      {/* Hemisphere light — Luz ambiental suave */}
      <hemisphereLight
        args={["#87CEEB", "#B0A090", 0.4]}
      />

      {/* Direccional principal — Sombra nítida */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />

      {/* Luz de relleno cálida desde atrás */}
      <directionalLight position={[-5, 4, -8]} intensity={0.3} color="#FFD8A0" />

      {/* Luz de acento desde la derecha */}
      <directionalLight position={[6, 3, 2]} intensity={0.2} color="#C8E0FF" />

      {/* Contact Shadows — Sombras suaves bajo objetos */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.6}
        scale={20}
        blur={2.5}
        far={4}
        resolution={1024}
      />
    </>
  );
}
