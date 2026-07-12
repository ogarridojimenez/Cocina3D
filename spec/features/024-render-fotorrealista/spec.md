# 024 · Render fotorrealista

## Objetivo
Transformar la calidad visual de Cocina3D con iluminación global, post-processing y sombras de calidad profesional.

## Stack
- `@react-three/postprocessing` — Bloom, SSAO, SMAA, tone mapping
- `@react-three/drei` — Environment (HDR), ContactShadows, SoftShadows
- Poly Haven HDRs para environment maps

## Requisitos funcionales (EARS)

1. CUANDO la escena se carga, EL SISTEMA DEBE cargar un environment map HDR para reflejos e iluminación global
2. CUANDO el entorno HDR está cargado, EL SISTEMA DEBE aplicarlo como reflexión en materiales PBR metalizados
3. CUANDO hay objetos en la escena, EL SISTEMA DEBE calcular SSAO (oclución ambiental) para dar profundidad
4. CUANDO hay objetos emisivos (horno, vitrocerámica, luces), EL SISTEMA DEBE aplicar bloom selectivo
5. CUANDO el usuario renderiza, EL SISTEMA DEBE usar tone mapping ACES para color cinematográfico
6. CUANDO hay sombras en la escena, EL SISTEMA DEBE usar PCSS (Percentage Closer Soft Shadows)
7. CUANDO el usuario selecciona modo "alta calidad", EL SISTEMA DEBE activar SMAA antialiasing
8. CUANDO hay objetos cerca del suelo, EL SISTEMA DEBE generar contact shadows suaves

## Non-goals
- No es render offline (sigue siendo en tiempo real)
- No es raytracing (WebGL no soporta DXR)
- No se sacrifica rendimiento por debajo de 30fps

## Criterios de aceptación
- [ ] Environment HDR cargado y visible en reflejos
- [ ] SSAO visible en esquinas entre objetos
- [ ] Bloom en electrodomésticos emisivos
- [ ] Sombras PCSS más suaves que las actuales
- [ ] Contact shadows bajo muebles
- [ ] Build exitoso sin errores
- [ ] Funciona a ≥30fps en GPU media
