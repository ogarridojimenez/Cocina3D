"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  SSAO,
  SMAA,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

export function PostProcessing() {
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMappingExposure = 1.2;
  }, [gl]);

  return (
    <EffectComposer multisampling={4}>
      {/* SMAA — Antialiasing de calidad */}
      <SMAA />

      {/* SSAO — Oclusión ambiental para profundidad */}
      <SSAO
        intensity={20}
        radius={0.15}
        bias={0.5}
      />

      {/* Bloom — Solo objetos emisivos (intensidad baja) */}
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.1}
        mipmapBlur
      />

      {/* Tone mapping ACES — Color cinematográfico */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
