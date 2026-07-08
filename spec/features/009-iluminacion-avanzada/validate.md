# Validación — 009 Iluminación Avanzada

## Checklist de verificación

| Requisito (spec.md) | Evidencia/Test | Estado | Nota |
|---------------------|----------------|:------:|------|
| Sombras suaves PCFSoft | Sombras con bordes difuminados en el suelo | ✅ | PCFShadowMap (PCFSoft deprecado en Three.js r170+) |
| shadow-mapSize 2048+ | Calidad por defecto "Media (2048)" en selector | ✅ | Configurable hasta 4096 |
| HemisphereLight cielo/suelo | Reemplazado ambientLight por hemisphereLight con colores | ✅ | #87CEEB cielo, #B0A090 suelo |
| PointLight horno al iluminar | Luz cálida interior en horno, vinculada a lightOn | ✅ | Color #FFE0B0 |
| PointLight nevera | Luz fría interior en nevera | ✅ | Color #E8F4FF |
| PointLight microondas | Luz cálida tenue en microondas | ✅ | Color #FFEEDD |
| SpotLight campana toggle | SpotLight hacia abajo con toggle Luz en propiedades | ✅ | angle=0.6, distance=2.5 |
| Lavavajillas LED estado | Punto verde tenue (0.15) en panel frontal | ✅ | Se enciende con lightOn |
| Control "Encender/Apagar luz" | Botón en propiedades para objetos con luz | ✅ | En ObjectProperties |
| Calidad sombras configurable | Dropdown Baja/Media/Alta en propiedades | ✅ | 1024, 2048, 4096 |

## Bugs corregidos post-implementación
| Bug | Causa | Fix |
|-----|-------|-----|
| Carga doble de objetos/paredes | React Strict Mode ejecuta `loadState` 2 veces en dev | Guard en `loadState`: skip si `walls.length > 0` |
| Luces de electrodomésticos no funcionaban | `useFrame` se ejecuta antes de que R3F asigne el ref al `pointLight` | Cambiado a `useEffect` directo que corre post-render |

## Veredicto final
**APROBADO** ✅ — Iluminación avanzada implementada con sombras suaves, luces en electrodomésticos y controles de calidad en UI. Todos los bugs corregidos.
