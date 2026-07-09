# Validación — 011 Catálogo Meseta + TV

## Resumen de cambios

### 1. Meseta en L con ambos lados ajustables (lWidthX, lWidthZ)
- **Spec original**: Meseta configurable con extensión en L por ambos lados, desde la esquina
- **Implementado**: 
  - `lWidthX` (eje +X) y `lWidthZ` (eje +Z) independientes
  - La Z se origina desde la esquina formada por la extensión X (`W/2 + lX - D/2`)
  - UI con dos inputs "Ancho L (eje X)" y "Ancho L (eje Z)"
  - Persistencia en localStorage vía persist.ts
- **Estado**: ✅ APROBADO — verificada visualmente la L desde esquina

### 2. Puerta con pivote en bisagra (fix animación)
- **Spec**: La puerta de la meseta pivota sobre su bisagra (borde +X del módulo)
- **Implementado**:
  - Pivot group en `cx + cabWidth * 0.475` (borde derecho del armario)
  - Puerta offset `(-cabWidth * 0.475, 0, -halfDepth)` relativo al pivot
  - Animación `rotation.y = eased * PI * 0.45`
- **Estado**: ✅ APROBADO — puerta no se sale del dibujo

### 3. Piso seleccionable con materiales
- **Spec**: Plano de suelo con material PBR seleccionable
- **Implementado**:
  - `FloorPlane.tsx` — plano 10×10m en y=0, `buildPBRMaterial`
  - 5 materiales: baldosa, parquet, pizarra, terrazo, hormigón
  - Selector en WallProperties (sidebar derecho, "PISO")
  - `floorMaterialId` en store, persistencia
- **Estado**: ✅ APROBADO — piso baldosa visible en escena

### 4. TV montable en pared
- **Spec**: TV de pared, montado a altura configurable
- **Implementado**:
  - Catalog entry con `mountType: "wall"`, `mountHeight: 1.5`
  - `addObject` posiciona TV en `posY = mountHeight`, spawn en `{x:0, z:0}`
  - Geometría plana negra (1.2×0.7×0.05)
  - Propiedades editables completas
- **Estado**: ✅ APROBADO — TV visible a Y=1.5

## Cambios realizados

| Archivo | Cambio |
|---------|--------|
| `src/lib/store.ts` | Añadidos `lWidthX`, `lWidthZ` a FurnitureObject; `setCounterProps` mapea ambos; TV spawn con `mountHeight` |
| `src/lib/persist.ts` | Persistencia de `lWidthX`, `lWidthZ` |
| `src/components/editor/proceduralGeometry.ts` | Z wing posicionada desde esquina de L (`zWingX = lX>0 ? W/2 + lX - D/2 : W/2 - D/2`) |
| `src/components/editor/ObjectProperties.tsx` | Dos inputs "Ancho L (eje X)" y "Ancho L (eje Z)" |
| `src/components/3d/FloorPlane.tsx` | **NUEVO** — componente plano de suelo PBR |
| `src/components/3d/Scene.tsx` | Import y render de `<FloorPlane />` |
| `src/data/materials.ts` | Categoría `"suelo"` con 5 materiales |
| `src/components/editor/WallProperties.tsx` | Selector de piso en estado vacío |
| `.spec/features/011-catalogo-meseta-tv/` | Docs actualizados |

## Veredicto final

✅ **APROBADO** — Todos los requisitos de la feature cumplidos y verificados visualmente.
