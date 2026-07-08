# 005 · Parametrización de Objetos — Tareas

| # | Tarea | Depende de | Criterio de aceptación |
|---|-------|-----------|------------------------|
| 1 | Añadir width/height/depth a `FurnitureObject` en store y a `addObject` | — | Objetos nuevos se crean con dimensiones del catálogo |
| 2 | Modificar `buildGeometry` para aceptar dimensiones personalizadas | 1 | buildGeometry(type, color, w, h, d) usa los valores pasados |
| 3 | Actualizar `FurnitureObject.tsx` para pasar dimensiones reales a buildGeometry | 2 | El `useMemo` depende de object.width/height/depth |
| 4 | Actualizar clickable volume en `FurnitureObject.tsx` con dimensiones reales | 1 | La caja de colisión usa object.width/height/depth |
| 5 | Añadir inputs editables de dimensión en `ObjectProperties.tsx` | 1 | Panel muestra ancho/alto/fondo editables |
