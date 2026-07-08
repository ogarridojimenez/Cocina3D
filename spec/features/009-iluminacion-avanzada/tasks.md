# Tareas — 009 Iluminación Avanzada

| # | Tarea | Depende de | Criterio de aceptación | Paralelizable |
|---|-------|-----------|--------------------------|:-------------:|
| 1 | Reemplazar `ambientLight` por `hemisphereLight` con colores cielo/suelo en Lighting.tsx | — | La escena tiene luz ambiental direccional con tono azul cielo arriba y tierra abajo | ✅ |
| 2 | Configurar `PCFSoftShadowMap` en el renderer y shadow-mapSize 2048 | — | Sombras con bordes suaves, sin aliasing duro | ✅ |
| 3 | Ajustar `shadow-bias` de directionalLight para eliminar shadow acne | 2 | No hay bandas oscuras en paredes verticales | ✅ |
| 4 | Añadir `lightOn: boolean` opcional a `FurnitureObject` en la store | — | Objeto puede tener estado de luz (default false) | ✅ |
| 5 | Añadir `toggleLight(id)` al store de Zustand | 4 | Alterna lightOn del objeto por ID | ❌ |
| 6 | Añadir `shadowQuality` al store global (2048\|4096) | — | Tienda tiene setting de calidad de sombra | ✅ |
| 7 | Implementar PointLight interior en Horno (vinculado a animated) | 4, 5 | Al abrir puerta, luz cálida se enciende gradualmente | ❌ |
| 8 | Implementar PointLight interior en Nevera (vinculado a animated) | 4, 5 | Al abrir puerta, luz fría se enciende gradualmente | ❌ |
| 9 | Implementar PointLight interior en Microondas (vinculado a animated) | 4, 5 | Al abrir puerta, luz cálida tenue se enciende | ❌ |
| 10 | Implementar SpotLight en Campana extractora (vinculado a lightOn) | 4, 5 | Botón Luz en campana → SpotLight hacia abajo | ❌ |
| 11 | Implementar PointLight de estado en Lavavajillas (verde/rojo) | 4, 5 | Punto verde tenue en panel frontal lavavajillas | ❌ |
| 12 | Añadir sección "Iluminación" en ObjectProperties con controles | 7–11 | Slider intensidad luz, botón toggle para campana | ❌ |
| 13 | Interpolar pointLight.intensity con SmoothStep al mismo tiempo que puerta | 7 | La luz se enciende/apaga suavemente al mismo ritmo que la puerta | ❌ |
| 14 | Verificar persistencia de `lightOn` en loadState / saveState | 5 | lightOn se guarda y restaura correctamente | ❌ |
| 15 | Añadir selector de calidad de sombras en la UI (2048/4096) | 6 | Dropdown en panel de propiedades o menú | ❌ |

**Orden de implementación:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15

**Bloques paralelizables:**
- Tareas 1, 2, 3 (mejoras globales de iluminación) — se pueden hacer juntas
- Tareas 7, 8, 9, 10, 11 (luces por objeto) — independientes entre sí, dependen de 4 y 5
- Tarea 12 (UI) — depende de 7–11
