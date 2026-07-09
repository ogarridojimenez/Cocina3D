# Plan Técnico — 010 Materiales PBR

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  src/data/materials.ts          ← Definiciones de materiales  │
│  export materialCatalog = [                              │
│    { id:"oak", name:"Roble", ... }                      │
│    { id:"walnut", name:"Nogal", ... }                   │
│    { id:"marble", name:"Mármol", ... }                  │
│    { id:"granite", name:"Granito", ... }                │
│    { id:"steel", name:"Acero", ... }                    │
│  ]                                                      │
│  function generateMaterialTextures(id) → {              │
│    albedo, normal, roughness, metalness                 │
│  }  ← Canvas procedural — sin dependencias              │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  src/lib/materials.ts                               │
│  - buildPBRMaterial(materialId, baseColor) → Material   │
│  - Combina texturas procedurales con color tint         │
│  - Cache de texturas (Map<string, CanvasTexture>)       │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  proceduralGeometry.ts                               │
│  - buildGeometry() recibe materialId (opcional)         │
│  - Usa buildPBRMaterial() en vez de color sólido        │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  store.ts / persist.ts                               │
│  - FurnitureObject.materialId: string | null           │
│  - Se guarda/restaura en localStorage                  │
└─────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  ObjectProperties.tsx                                │
│  - Selector de material (dropdown con preview de color) │
└─────────────────────────────────────────────────────────┘
```

## Modelo de datos

```typescript
// Añadir a FurnitureObject
interface FurnitureObject {
  // ... existing fields
  materialId: string | null; // null = color sólido legacy
}

interface MaterialDef {
  id: string;
  name: string;
  category: "madera" | "piedra" | "metal";
  baseColor: string;       // Color tint por defecto
  generate: () => {        // Canvas procedural
    albedo: string;        // data URL o canvas
    normal: string;
    roughness: number; // 0-1 base
    metalness: number; // 0-1 base
  };
}
```

## Materiales procedurales (Canvas)

1. **Roble** — Veta de madera sinuosa (líneas Bezier + ruido Perlin-like), color marrón claro
2. **Nogal** — Veta más oscura y apretada, marrón oscuro
3. **Mármol** — Veteado suave con líneas finas oscuras, blanco/gris
4. **Granito** — Puntos de sal y pimienta (ruido aleatorio), gris moteado
5. **Acero** — Rayado lineal uniforme (cepillo), gris plateado, metalness alto

Normal maps se generan con derivadas parciales del albedo (Sobel-like).

## Decisiones y alternativas descartadas

| Decisión | Alternativa | Razón |
|----------|-------------|-------|
| Canvas procedural | Poly Haven texturas | Sin dependencias externas, sin descargas, generación determinista |
| materialId opcional (null) | Material obligatorio | Backward compatibility con escenas existentes |
| Cache global de texturas | Regenerar cada frame | Rendimiento — las texturas se generan una vez |

## Riesgos y mitigaciones
- **Riesgo:** Texturas procedurales se ven artificiales. **Mitigación:** Usar ruido con múltiples octavas y variación de color sutil.
- **Riesgo:** Rendimiento con texturas Canvas. **Mitigación:** Cache mediante Map<materialId, CanvasTexture>.
- **Riesgo:** Objetos pequeños quedan borrosos/tileados. **Mitigación:** UV mapping proporcional al tamaño del objeto (como en paredes).