# 016 · Texturas CC0 reales para objetos

**Estado:** propuesta

## Objetivo

Sustituir las texturas procedurales (canvas) de los materiales de objetos por texturas PBR reales de Poly Haven. Los 10 materiales podrán tener albedo, normal, roughness reales.

## Materiales a migrar

| materialId | Nombre | Textura CC0 Poly Haven |
|-----------|--------|------------------------|
| `oak` | Roble | `oak_floor` |
| `walnut` | Nogal | `basketweave_parquet` o similar madera oscura |
| `pine` | Pino | `wood_floor` |
| `wenge` | Wengué | `wood_floor_dark` |
| `cherry` | Cerezo | `cherry_wood` |
| `marble` | Mármol Blanco | `marble_tiles` |
| `granite` | Granito Gris | `granite_kitchen` |
| `slate` | Pizarra Negra | `slate_tiles` |
| `steel` | Acero Cepillado | `steel_grid` |
| `brass` | Latón | `brass` |

## Cambios necesarios

1. Descargar 10 texturas CC0 en `public/textures/materials/<id>/albedo.jpg, normal.jpg, roughness.jpg`
2. Crear catálogo de materiales reales `src/data/materialTextures.ts`
3. Modificar `buildPBRMaterial` en `lib/materials.ts` para que cargue las CC0 en vez de procedural

## Requisitos (EARS)

- CUANDO un objeto tenga materialId="oak", EL SISTEMA DEBE aplicar la textura CC0 de roble con su normal y roughness
- CUANDO se cambie un material, EL SISTEMA DEBE mostrar la textura CC0 real inmediatamente
- CUANDO no se encuentre la textura CC0, EL SISTEMA DEBE volver al material procedural como fallback

## Criterios de aceptación

- 10 materiales con texturas PBR reales
- Build pasa
- No hay regresión en objetos sin material (color sólido)
- Caché de texturas funciona (no recarga en cada render)