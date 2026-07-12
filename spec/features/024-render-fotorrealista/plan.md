# Plan — 024 Render Fotorrealista

## Arquitectura
- **Lighting.tsx** → se reescribe con Environment HDR + ContactShadows + SoftShadows
- **PostProcessing.tsx** → nuevo componente con EffectComposer (Bloom + SSAO + SMAA)
- **Scene.tsx** → añade PostProcessing en la cadena

## Dependencias
- `@react-three/postprocessing` (instalar)
- HDR environment de Poly Haven (descargar a public/textures/hdr/)

## Secuencia
1. Instalar @react-three/postprocessing
2. Descargar HDR (dikhololo_night_2k.hdr o similar interior)
3. Crear PostProcessing.tsx (Bloom + SSAO + ToneMapping + SMAA)
4. Reescribir Lighting.tsx (Environment + ContactShadows + PCSS)
5. Actualizar Scene.tsx
6. Build + validar
