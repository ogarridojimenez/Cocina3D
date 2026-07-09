# Tareas — 011 Catálogo Meseta + TV

| # | Tarea | Depende de | Criterio de aceptación | Paralelizable |
|---|-------|-----------|------------------------|--------------|
| 1 | Definir 2 nuevos tipos (counter, tv) en ObjectType y CatalogItem | — | catalog.ts tiene counter y tv con defaults 1.4×0.85×0.6 y 1.2×0.05×0.01 | Sí |
| 2 | Añadir categorías `Mesetas` y `Pared` a Category | 1 | TypeScript compila, aparecen en catálogo | Sí |
| 3 | Añadir campos `lWidth`, `hasSink` a FurnitureObject + store actions | 1 | store.ts tiene setCounterProps, defaults a 0/false | No |
| 4 | Persistir `lWidth`, `hasSink` en localStorage | 3 | Recarga conserva forma L y fregadero | No |
| 5 | Construir geometría `"counter"` en proceduralGeometry.ts | 2, 3 | Base cabinets + doors + slab + L extension + sink | No |
| 6 | Construir geometría `"tv"` en proceduralGeometry.ts | 2 | TV con marco negro, pantalla emisiva, soporte pared | No |
| 7 | Pasar L options desde FurnitureObject → buildGeometry | 5 | useMemo depende de lWidth y hasSink | No |
| 8 | UI: Sección CONFIG. MESETA en ObjectProperties | 5 | Input Ancho L, checkbox Fregadero integrado | No |
| 9 | UI: Iconos categoría Mesetas/Pared en CatalogPanel | 2 | 🔲 y 📺 visibles con sus items | Sí |
| 10 | Build + test navegador | 8, 9 | 0 errores, meseta se ve con L, TV negro plano | No |
| 11 | Commit + spec docs + Obsidian vault | 10 | Git commit, validate.md, Obsidian updates | No |