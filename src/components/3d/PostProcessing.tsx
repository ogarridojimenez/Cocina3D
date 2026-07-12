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

      {/* N8AO — Oclusión ambiental (config photorealistic de Context7) */}
      <N8AO
        quality="high"
        aoRadius={6}
        intensity={1.2}
        distanceFalloff={0.8}
        aoSamples={32}
        denoiseSamples={8}
        denoiseRadius={12}
        depthAwareUpsampling
      />

      {/* Bloom — Solo objetos emisivos */}
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Tone mapping ACES — Color cinematográfico */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
