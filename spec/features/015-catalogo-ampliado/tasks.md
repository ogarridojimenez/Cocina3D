# 015 · Catálogo Ampliado — Tareas

| # | Tarea | Depende de | Criterio |
|---|-------|-----------|----------|
| 1 | `catalog.ts`: añadir 15 objetos + reorganizar categorías + añadir `Iluminación` | — | Catálogo tiene 34 objetos en 9 categorías |
| 2 | `geometries.ts`: añadir geometrías para los 15 objetos | 1 | Todos los objetos nuevos se renderizan sin error |
| 3 | Build + verificar | 2 | Build pasa, servidor carga sin errores |
| 4 | Commit + push | 3 | Código en main |

## Paralelizable

- 1 y 2 son secuenciales (geometrías dependen de tener los objetos declarados)