# 001 · Editor 3D Básico — Plan

> Cómo se implementa el editor 3D base con React Three Fiber.

## Enfoque

Construir una escena 3D mínima pero sólida usando React Three Fiber + Drei (helpers). Se prioriza que el setup sea limpio, componentizado y preparado para recibir las siguientes features (paredes, objetos, físicas) sin reescrituras.

## Arquitectura

```
┌─────────────────────────────────────────────────────┐
│                    EditorLayout                      │
│  ┌──────────┬────────────────────┬────────────────┐  │
│  │ Sidebar  │      Canvas 3D     │  Properties    │  │
│  │ (futura) │                    │  Panel (futuro) │  │
│  │          │  ┌──────────────┐  │                │  │
│  │          │  │    Scene     │  │                │  │
│  │          │  │ ─ GridFloor  │  │                │  │
│  │          │  │ ─ Lighting   │  │                │  │
│  │          │  │ ─ CameraCtrl │  │                │  │
│  │          │  └──────────────┘  │                │  │
│  └──────────┴────────────────────┴────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Árbol de componentes

```
<EditorLayout>                    ← Layout grid: sidebar | canvas | properties
  <ErrorBoundary fallback={WebGLFallback}>
    <Canvas camera={{ fov:50, near:0.1, far:100, position:[8,6,8] }}>
      <Scene>                     ← Grupo lógico que agrupa elementos 3D
        <GridFloor />             ← Malla de suelo con Grid de Drei
        <Lighting />              ← Ambiente + direccional con sombras
        <CameraController />      ← OrbitControls con límites
      </Scene>
    </Canvas>
  </ErrorBoundary>
</EditorLayout>
```

### Árbol de archivos

```
src/
├── app/
│   ├── layout.tsx              ← Root layout (html, body, fonts)
│   ├── page.tsx                ← Ruta / → monta <EditorPage />
│   └── editor/
│       └── page.tsx            ← Ruta /editor → monta <EditorLayout />
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx           ← Grupo lógico, agrupa Grid+Lighting+Camera
│   │   ├── CameraController.tsx ← OrbitControls con límites
│   │   ├── GridFloor.tsx       ← Grid de suelo (Drei)
│   │   └── Lighting.tsx        ← Luces ambiente + direccional
│   ├── editor/
│   │   └── EditorLayout.tsx    ← Layout grid (sidebar | canvas | properties)
│   └── ui/
│       └── WebGLFallback.tsx   ← Mensaje si no hay WebGL
├── lib/
│   └── store.ts                ← Zustand store (escena, cámara, selección)
└── styles/
    └── globals.css             ← Reset, variables CSS, dark background
```

## Modelo de datos

```typescript
// lib/store.ts — Estado global de la escena (Zustand)
interface SceneState {
  // Cámara (para persistir posición si se quiere)
  cameraPosition: [number, number, number]
  cameraTarget: [number, number, number]

  // Escena
  gridVisible: boolean
  gridSize: number  // 20
  gridDivisions: number  // 20

  // Rendimiento
  fps: number

  // Acciones
  setCameraPosition: (pos: [number, number, number]) => void
  setCameraTarget: (target: [number, number, number]) => void
  toggleGrid: () => void
}
```

## Contratos / Interfaces

```typescript
// Props de componentes 3D
interface GridFloorProps {
  size?: number        // default: 20
  divisions?: number   // default: 20
  color?: string       // default: #ccc
}

interface LightingProps {
  ambientIntensity?: number     // default: 0.5
  directionalIntensity?: number // default: 1.0
  shadowMapSize?: number       // default: 1024
}

interface CameraControllerProps {
  minDistance?: number  // default: 0.5
  maxDistance?: number  // default: 50
  minPolarAngle?: number // default: 0 (no bajo el suelo)
  maxPolarAngle?: number // default: Math.PI / 2.05 (justo sobre horizonte)
}
```

## Implementación

| # | Paso | Archivos afectados | Descripción |
|---|------|-------------------|-------------|
| 1 | Inicializar proyecto Next.js + dependencias | — | `npx create-next-app@latest --typescript --tailwind --app` + instalar R3F, Drei, Three, Zustand |
| 2 | CSS global + layout base | `globals.css`, `layout.tsx` | Reset CSS, fondo oscuro, fuente, body full-height |
| 3 | Zustand store | `lib/store.ts` | Estado global de escena con tipos |
| 4 | Componentes 3D | `GridFloor.tsx`, `Lighting.tsx`, `CameraController.tsx` | Cada uno exporta un componente React Three Fiber |
| 5 | Scene (contenedor) | `Scene.tsx` | Agrupa Grid + Lighting + Camera |
| 6 | EditorLayout | `EditorLayout.tsx` | Grid CSS sidebar/canvas/properties. Por ahora sidebar y properties son placeholders |
| 7 | Página editor | `editor/page.tsx` | Monta EditorLayout. Ruta /editor |
| 8 | WebGL Fallback | `WebGLFallback.tsx` | Error boundary que detecta falta de WebGL |
| 9 | Página principal | `page.tsx` | Landing simple con botón "Ir al editor" |
| 10 | Verificación | Tests manuales + DevTools | FPS, redimensionado, límites de cámara |

## Decisiones técnicas

| Decisión | Opción elegida | Alternativas descartadas | Razón |
|----------|---------------|-------------------------|-------|
| **Helpers 3D** | @react-three/drei (Grid, OrbitControls) | Crear grid propio | Drei es el estándar, optimizado, mantenido por pmndrs |
| **Estado global** | Zustand | Redux, Jotai, Context | Ligero, typescript-friendly, sin boilerplate |
| **Layout** | CSS Grid nativo | Flexbox, CSS-in-JS | Tailwind + Grid es suficiente, sin runtime extra |
| **Canvas sizing** | CSS 100% + resize observer | useThree size manual | Drei + R3F manejan resize automáticamente |
| **Sombras** | Shadow map 1024px | Sin sombras, shadow map 2048px | 1024 es suficiente para escena vacía, rendimiento |

## Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|:-----------:|:-------:|------------|
| WebGL no disponible en navegadores antiguos | Baja | Alto | ErrorBoundary con mensaje claro + enlace a navegadores modernos |
| FPS bajos en GPUs integradas | Media | Medio | Pruebas en Intel UHD desde el día 1. Cámara con límites de render |
| Compatibilidad R3F + Next.js App Router | Baja | Medio | R3F requiere `'use client'`. Documentado, solución conocida |
| Crecimiento del bundle con Three.js | Media | Medio | Importaciones dinámicas, tree-shaking, analizar con `next/bundle-analyzer` |
