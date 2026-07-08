# Plan Técnico — 007 Animaciones

## Arquitectura
La animación se maneja dentro del componente `FurnitureObject.tsx` usando `useFrame` de R3F. No hay un sistema de animación externo — se usa interpolación manual con delta-time.

```
FurnitureObject.tsx
├── useFrame() → interpola valor animado (0→1)
│   ├── speed = delta * coefficient
│   ├── SmoothStep easing
│   └── object.animated ? target=1 : target=0
└── Grupo 3D aplica rotación/traslación basada en valor interpolado
    ├── doorGroup → rotación Y (puertas)
    ├── drawerGroup → traslación Z (cajones)
    └── lidGroup → rotación X (tapas/hornos)
```

## Modelo de datos
```typescript
interface FurnitureObject {
  // ...campos existentes
  animated: boolean;  // true = abierto, false = cerrado
}
```

El estado `animated` se almacena en el store de Zustand y se persiste en localStorage junto al resto del objeto.

## Contratos / interfaces
```typescript
// Store actions
toggleAnimation(id: string): void  // Alterna animated en objeto por ID

// Valores de interpolación por tipo de animación
const ANIMATION_CONFIG = {
  cabinet:  { type: "door",  angle: PI/2, axis: "y" },   // 90°
  drawer:   { type: "slide", distance: 0.4, axis: "z" }, // 40cm
  oven:     { type: "lid",   angle: -PI/3, axis: "x" },  // 60°
  microwave:{ type: "door",  angle: PI/2, axis: "y" },
  dishwasher:{type: "door",  angle: PI/3, axis: "y" },   // 60°
  hood:     { type: "none",  angle: 0, axis: "none" },
}
```

## Decisiones y alternativas descartadas
| Decisión | Alternativa | Razón |
|----------|------------|-------|
| Interpolación manual con useFrame | Librería de animación (GSAP, Framer Motion) | Sin dependencias extra, control total del delta |
| SmoothStep cúbico | Linear, ease-in-out | Curva más natural que lineal, sin overshoot |
| Configurable por objeto | Velocidad global | Cada objeto puede tener su propio ritmo |

## Riesgos y mitigaciones
| Riesgo | Mitigación |
|--------|-----------|
| Acumulación de delta en pausas largas | Limitar delta a max 0.1s por frame |
| Animaciones lentas en dispositivos débiles | La interpolación usa delta-time, se adapta a cualquier FPS |
