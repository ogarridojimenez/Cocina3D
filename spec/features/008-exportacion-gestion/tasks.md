# Tareas — 008 Exportación y Gestión de Escenas

| # | Tarea | Depende de | Criterio de aceptación | Paralelizable |
|---|-------|-----------|--------------------------|:-------------:|
| 1 | Crear `export.ts` con función `exportGLTF(scene, filename)` | — | Descarga un archivo .glb binario con la geometría de la escena | ✅ |
| 2 | Crear `export.ts` con función `screenshotCanvas(canvas)` | — | Descarga .png (inicialmente podía salir negro) | ✅ |
| 3 | Crear `export.ts` con función `saveSceneFile(walls, objects)` | — | Descarga .json con formato `{walls, objects}` | ✅ |
| 4 | Crear `export.ts` con función `loadSceneFile()` → Promise | — | Abre file picker, lee .json, devuelve datos parseados | ✅ |
| 5 | Crear `ExportManager.tsx` dentro del Canvas | 1-4 | Escucha CustomEvent y ejecuta acción correspondiente | ❌ |
| 6 | Añadir `clearScene` y `loadFullState` al store de Zustand | — | `clearScene` limpia walls+objects+selected, `loadFullState` restaura datos | ❌ |
| 7 | Añadir botones Nuevo / Guardar / Abrir / Export GLTF / Captura en el header | 5, 6 | Botones visibles en la barra superior, funcionales al hacer clic | ❌ |
| 8 | Fix: `preserveDrawingBuffer: true` en Canvas.gl | — | Captura ya no da imagen negra (fix parcial) | ✅ |
| 9 | Fix: forzar `gl.render(scene, camera)` antes de capturar | 5 | Captura siempre muestra la escena actual, no negra | ✅ |
| 10 | Fix: `clearScene` también borra localStorage | 6 | Tras "Nuevo" + refresh, no aparecen datos viejos | ❌ |

**Orden de implementación:** 1 → 2 → 3 → 4 → 6 → 5 → 7 → 8 → 9 → 10
