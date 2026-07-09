# Propuesta: Nuevos materiales para suelo (Suelo/Losas)

## Estado actual (5 materiales)

| ID | Nombre | Color | Patrón |
|----|--------|-------|--------|
| floor-tile | Baldosa blanca | #E8E4DC | Sólido |
| floor-parquet | Parquet roble | #C4956A | Sólido |
| floor-slate | Pizarra gris | #4A4A4A | Sólido |
| floor-terrazzo | Terrazo claro | #D4CFC5 | Sólido |
| floor-concrete | Hormigón pulido | #A8A8A8 | Sólido |

Todos usan `default` en `generateAlbedo` → color sólido, sin textura procedural.

## Propuesta: 6 nuevos materiales

### 1. Baldosa cerámica con junta (`floor-ceramic`)
- **Color base:** #E8E0D8
- **Roughness:** 0.6 | **Metalness:** 0
- **Patrón:** Rejilla de baldosas 4×4 con línea de junta gris (#B0A8A0)
- **Look:** Clásico, cocina mediterránea/moderna

### 2. Gres porcelánico gris (`floor-porcelain`)
- **Color base:** #7A7A7A
- **Roughness:** 0.4 | **Metalness:** 0.02
- **Patrón:** Grano fino con variación sutil (como granito pero más fino)
- **Look:** Industrial moderno, alta resistencia

### 3. Barro cocido / Terracota (`floor-terracotta`)
- **Color base:** #C4774A
- **Roughness:** 0.85 | **Metalness:** 0
- **Patrón:** Variación de color pixel a pixel + vetas arcillosas
- **Look:** Rústico mediterráneo, mucho carácter

### 4. Travertino beige (`floor-travertine`)
- **Color base:** #D4C8B8
- **Roughness:** 0.75 | **Metalness:** 0
- **Patrón:** Poros pequeños aleatorios + bandas sedimentarias suaves
- **Look:** Piedra natural elegante

### 5. Baldosa hexagonal (`floor-hexagon`)
- **Color base:** #C8C0B8
- **Roughness:** 0.55 | **Metalness:** 0
- **Patrón:** Panal hexagonal 8×8 con junta visible
- **Look:** Moderno, geométrico, tendencia

### 6. Espina de pez / Herringbone (`floor-herringbone`)
- **Color base:** #B8956A (roble medio)
- **Roughness:** 0.7 | **Metalness:** 0
- **Patrón:** Lamas inclinadas 45° en zigzag
- **Look:** Clásico elegante, mucho más vistoso que parquet recto

## Implementación técnica

### Por qué ahora es sólido
Los IDs `floor-*` caen en el `default` de `generateAlbedo()` en `src/lib/materials.ts` → color sólido.

### Lo que cambia
Para CADA nuevo material hay que:
1. Añadir `case "floor-ceramic":` (etc.) en `generateAlbedo()` con su patrón procedural en Canvas 2D
2. Añadir entrada en `MATERIALS[]` (datos)
3. Añadir al `<select>` en `ObjectProperties.tsx`

### Dificultad estimada por material
| Material | Dificultad | Líneas de código |
|----------|:----------:|:-----------------:|
| Cerámica (grid) | Baja | ~15 |
| Gres porcelánico | Baja | ~10 |
| Terracota | Baja | ~10 |
| Travertino | Media | ~20 |
| Hexagonal | Media | ~25 |
| Herringbone | Alta | ~35 |

## Alternativa: texturas CC0 reales

Si prefieres texturas reales en lugar de procedurales, podemos descargar desde Poly Haven:
- `ceramic_tiles_01`, `floor_tiles_02`, `terracotta_tiles_01`
- Requiere: descargar albedo/normal/roughness JPG 1K → `public/textures/` → sistema de texturas (más trabajo inicial pero resultado fotorrealista)

## Recomendación

**Mixta:** 3 procedurales (cerámica, terracota, gres) + si te parecen bien, luego añadimos texturas CC0 para las más complejas (hexagonal, herringbone, travertino) donde el procedural se nota más artificial.
