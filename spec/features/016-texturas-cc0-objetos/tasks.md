# 016 · Texturas CC0 objetos — Tareas

| # | Tarea | Depende de | Criterio |
|---|-------|-----------|----------|
| 1 | Investigar texturas CC0 en Poly Haven para 10 materiales | — | Lista de URLs confirmadas |
| 2 | Descargar 10 texturas (albedo, normal, roughness cada una) | 1 | 30 archivos en `public/textures/materials/<id>/` |
| 3 | Crear `src/data/materialTextures.ts` | 2 | Catálogo con id→{albedo,normal,roughness,scale} |
| 4 | Modificar `buildPBRMaterial` para usar CC0 | 3 | Fallback a procedural si no hay CC0 |
| 5 | Build + test visual | 4 | Build pasa, materiales se ven reales |
| 6 | Commit + push | 5 | — |
| 7 | Actualizar roadmap | 6 | feature 016 añadida |