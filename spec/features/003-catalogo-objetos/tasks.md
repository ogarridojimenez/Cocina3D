# Tareas — 003 · Catálogo de Objetos

| # | Tarea | Depende de | Criterio de aceptación | Estado |
|---|-------|-----------|--------------------------|:-----:|
| 1 | Definir catálogo de objetos en `src/data/catalog.ts` | — | 11 objetos en 4 categorías con dimensiones, color, geometría, tipo animación | ✅ |
| 2 | Extender store: `objects[]`, `selectedObjectId`, acciones CRUD + `toggleAnimation` + `gizmoMode` + `setGizmoMode` | 1 | Store compila con nuevos tipos, `selectObject` deselecciona `selectedWallId` | ✅ |
| 3 | Componente `CatalogPanel` — panel lateral con categorías colapsables y click para crear | 1 | Muestra 4 categorías, click en objeto → llama `addObject` + `selectObject` | ✅ |
| 4 | Componente `FurnitureObject` — geometría procedural + selección + gizmo mover/rotar | 2, 5 | Cada tipo de objeto se renderiza con forma distintiva, onClick selecciona, gizmo funciona con modo translate y rotate (R) | ✅ |
| 5 | Definir geometrías procedurales por tipo de objeto en `proceduralGeometry.ts` | 1 | Nevera, horno, armario, silla, etc. tienen formas reconocibles (caja compuesta + color) | ✅ |
| 6 | Componente `FurnitureManager` — renderiza todos los `FurnitureObject` en escena | 4 | Todos los objetos del store aparecen en escena | ✅ |
| 7 | Componente `ObjectProperties` — panel derecho para objeto seleccionado | 2 | Muestra posición, rotación, dimensiones, color, toggle animación, eliminar | ✅ |
| 8 | Actualizar `EditorLayout` — integrar CatalogPanel + FurnitureManager + gizmo toggle | 3, 7 | Layout integra catálogo, escena y propiedades | ✅ |
| 9 | Animaciones — puertas rotan 90°, cajones se deslizan 0.3m | 5 | Doble clic en objeto animable → apertura suave 300ms. Segundo clic → cierre | ✅ |
| 10 | Undo/Redo — acciones de objeto deshacibles via zundo | 2 | Ctrl+Z deshace add/remove/move/toggle animation de objeto | ✅ |
| 11 | Persistencia localStorage — objetos se guardan y restauran | 2 | Tras recargar página, objetos en escena se mantienen | ✅ |
| 12 | Gizmo modo rotar — `gizmoMode` en store, toggle con R o botones header | 2, 4 | Tecla R alterna entre mover (X/Z) y rotar (Y), botón activo resaltado | ✅ |
| 13 | Build + fix errores | todas | `npx next build` exitoso, 0 errores | ✅ |
