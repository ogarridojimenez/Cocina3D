# Plan técnico — 011 Catálogo Meseta + TV

## Arquitectura

```
CatalogPanel (UI) → addObject(type:"counter"/"tv")
  → store.ts (FurnitureObject con lWidth, hasSink, height)
  → FurnitureObject.tsx (useMemo pasa opts)
  → proceduralGeometry.ts (case "counter" y "tv")
ObjectProperties.tsx (UI condicional solo para "counter")
```

### Tipos
- **counter:** Mueble bajo con encimera, puertas abatibles, opción forma L con extensión Z, opción fregadero integrado con grifo
- **tv:** Panel plano negro montado en pared con bisel y soporte

### Dimensiones default
| Objeto | Ancho | Alto | Fondo | mountType | posY |
|--------|-------|------|-------|-----------|------|
| counter | 1.4 | 0.85 | 0.6 | "floor" | 0 |
| tv | 1.2 | 0.7 | 0.05 | "wall" | 1.5 |

## Contratos
- `BuildOptions { materialId?, lWidth?, hasSink? }` — nuevo tipo en proceduralGeometry.ts
- `setCounterProps(id, { lWidth?, hasSink? })` — action en store
- `FurnitureObject.lWidth: number` (0 = lineal)
- `FurnitureObject.hasSink: boolean` (default false)

## Decisiones
- L-shape: extensión perpendicular que sobresale en +Z desde el extremo derecho
- Fregadero integrado: no es objeto separado, es toggle booleano sobre la meseta
- TV usa `mountType: "wall"` con altura por defecto 1.5m