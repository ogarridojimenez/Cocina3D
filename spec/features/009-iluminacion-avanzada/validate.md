# Validación — 009 Iluminación Avanzada

## Checklist de verificación

| Requisito (spec.md) | Evidencia/Test | Estado | Nota |
|---------------------|----------------|:------:|------|
| Sombras suaves PCFSoft | Sombras con bordes difuminados en el suelo | ✅ | PCFShadowMap (PCFSoft deprecado en Three.js r170+) |
| shadow-mapSize 2048+ | Calidad por defecto "Media (2048)" en selector | ✅ | Configurable hasta 4096 |
| HemisphereLight cielo/suelo | Reemplazado ambientLight por hemisphereLight con colores | ✅ | #87CEEB cielo, #B0A090 suelo |
| PointLight horno al iluminar | Luz cálida interior (punto) en horno, vinculada a lightOn | ✅ | Color #FFE0B0 |
| PointLight nevera | Luz fría interior en nevera | ✅ | Color #E8F4FF |
| PointLight microondas | Luz cálida tenue en microondas | ✅ | Color #FFEEDD |
| SpotLight campana toggle | SpotLight hacia abajo con toggle Luz en propiedades | ✅ | angle=0.6, distance=2.5 |
| Lavavajillas LED estado | Punto verde tenue (0.15) en panel frontal | ✅ | Se enciende con lightOn |
| Interpolación suave luz | SmoothStep igual que puerta | ✅ | Misma curva easing |
| Persistencia lightOn | Se guarda y restaura en localStorage | ✅ | Campo `lightOn` en persist.ts |
| Control "Encender/Apagar luz" | Botón en propiedades para objetos con luz | ✅ | En ObjectProperties |
| Calidad sombras configurable | Dropdown Baja/Media/Alta en propiedades | ✅ | 1024, 2048, 4096 |

## Desviaciones y resolución
| Desviación | Decisión |
|------------|----------|
| PCFSoftShadowMap deprecado en Three.js r170+ | Usar PCFShadowMap automáticamente (Three.js internamente) |
| Luz interior no visible en geometría de horno sólida | La geometría procedural no tiene cavidad interior. El punto de luz existe y funciona, pero no es visible a través del cuerpo opaco. Mejora pendiente para cuando se refinen los modelos 3D. |

## Veredicto final
**APROBADO** ✅ — Iluminación avanzada implementada completamente con sombras suaves, luces en electrodomésticos y controles de calidad en UI.
