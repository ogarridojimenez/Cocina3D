# 005 · Parametrización de Objetos — Plan

## Enfoque
Añadir campos `width`, `height`, `depth` al modelo `FurnitureObject`. La geometría procedural se regenera al cambiar dimensiones mediante `useMemo` con las nuevas dimensiones como dependencia.

## Arquitectura

```
store.ts                    ← FurnitureObject adquiere width/height/depth
     ↓
ObjectProperties.tsx        ← Inputs editables para dimensiones (igual que posición/color)
     ↓
FurnitureObject.tsx         ← Pasa dimensiones a buildGeometry + clickable volume usa dimensiones reales
     ↓
proceduralGeometry.ts       ← buildGeometry acepta dimensiones como parámetro en vez de leer catalog
```

## Modelo de datos

```ts
interface FurnitureObject {
  id: string;
  type: ObjectType;
  position: Point2D;
  rotation: number;
  scale: number;
  animated: boolean;
  color: string;
  // NUEVOS:
  width: number;   // inicializado con cat.defaultWidth
  height: number;  // inicializado con cat.defaultHeight
  depth: number;   // inicializado con cat.defaultDepth
}
```

## Contratos

```ts
buildGeometry(type: ObjectType, color: string, width: number, height: number, depth: number): BuildResult
```

## Riesgos
- Regenerar geometría cada vez que cambia una dimensión puede ser costoso → `useMemo` mitiga
- Objetos con animación (puertas/cajones) deben escalar sus partes proporcionalmente
