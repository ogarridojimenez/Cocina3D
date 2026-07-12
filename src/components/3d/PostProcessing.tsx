"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  N8AO,
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

      {/* N8AO — Oclusión ambiental (no necesita NormalPass) */}
      <N8AO
        halfRes={false}
        aoRadius={0.5}
        intensity={1.5}
        distanceFalloff={1}
        quality="high"
        aoSamples={16}
        denoiseSamples={8}
        denoiseRadius={12}
        screenSpaceRadius
        depthAwareUpsampling
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
