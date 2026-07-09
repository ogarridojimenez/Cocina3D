# 016 · Texturas CC0 objetos — Plan

## Archivos

| Archivo | Cambio |
|---------|--------|
| `public/textures/materials/<id>/` | 10 directorios, 30 archivos (albedo, normal, roughness) |
| `src/data/materialTextures.ts` | **NUEVO** — catálogo de texturas CC0 por materialId |
| `src/lib/materials.ts` | Modificar `buildPBRMaterial` para usar CC0 primero |

## Flujo

1. Buscar texturas CC0 en Poly Haven para cada material
2. Descargar a `public/textures/materials/<id>/`
3. Crear `materialTextures.ts` (mismo patrón que `textures.ts` y `floorTextures.ts`)
4. En `buildPBRMaterial`: si existe textura CC0 → cargarla; si no → procedural (fallback)
5. Build + commit

## Riesgos

- Poly Haven no tiene textura exacta para algún material → usar la más cercana
- Tamaño de descarga: ~5MB por 10 texturas (albedo 2K, normal/roughness JPG)
- Caché de Three.js TextureLoader evita recargas