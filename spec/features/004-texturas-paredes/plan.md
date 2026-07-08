# Plan técnico — 004 · Texturas en Paredes

## Arquitectura

```
EditorLayout
├── WallProperties (modificado)
│   ├── sección texturas (NUEVO)
│   │   └── TextureSelector (NUEVO) — grid de thumbnails
│   └── ... resto igual
└── Scene
    └── WallManager
        └── Wall[] (modificado)
            ├── MeshStandardMaterial ← ahora usa map + normalMap + roughnessMap
            └── UV repeat ← escalado según dimensiones
```

## Modelo de datos

### Añadir a Wall

```ts
interface Wall {
  // ... campos existentes
  textureId: string | null;  // null = color sólido
}
```

### Catálogo de texturas

```ts
interface TextureDefinition {
  id: string;
  name: string;
  thumbnail: string;    // preview pequeña
  maps: {
    albedo: string;     // ruta relativa a /textures/
    normal?: string;
    roughness?: string;
    ao?: string;        // ambient occlusion
  };
  scale: number;        // metros por repetición (ej: 0.5 = cada 0.5m)
}
```

## Contratos

### TextureSelector

```
Props:
  - textureId: string | null     // textura actual de la pared
  - onSelect: (id: string | null) => void   // null = color sólido

Render:
  - Grid 2×3 con thumbnails de texturas + "Color sólido"
  - Opción activa resaltada con borde azul
```

### Wall (modificación)

```
Material actual:
  color={wall.color}                // ← color base (seguirá siendo visible como fallback)
  
Material con textura:
  map={textureMap}                  // ← albedo
  normalMap={textureNormal}         // ← normal map (si existe)
  roughnessMap={textureRoughness}    // ← roughness (si existe)
  color={wall.color}                // ← tint over texture
  map-repeat={[width/scale, height/scale]}  // ← tileado automático
```

## Decisiones técnicas

| Decisión | Opción | Alternativa |
|----------|--------|-------------|
| **Carga de texturas** | `useTexture` de Drei | TextureLoader manual (más código) |
| **Escalado UV** | `texture.repeat.set()` en useMemo | Geometry transform (más complejo) |
| **Formato** | JPG albedo, PNG mapas | WebP (no todos los navegadores) |
| **Resolución** | 1K (1024px) | 2K (pesado en mobile) |
| **Selector** | Grid 2×3 inline en properties | Modal/overlay (más clicks) |

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| Texturas no cargan (404) | Fallback a color sólido + console.warn |
| Pérdida de rendimiento con muchas texturas | useTexture usa caché; 1K mantiene 30+fps |
| Texturas no tilean correctamente | Calcular repeat según dimensiones de pared |
