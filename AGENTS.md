# AGENTS.md — Cocina3D

*Guía operativa para agentes de codificación. Léela completa antes de tocar el proyecto.*

---

## 📋 Identidad del proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | Cocina3D |
| **Propósito** | Diseñador 3D de cocinas B2B a medida — web, tiempo real, paramétrico |
| **Stack** | Next.js 16 (App Router) + TypeScript 6 + Tailwind CSS v4 + React Three Fiber 9.6 + Drei + Zustand + zundo |
| **Target** | Empresa que diseña cocinas a medida según dimensiones reales |
| **Estado** | ✅ Feature 003 completada |
| **Último build** | ✅ Exitoso — 0 errores |
| **Progreso** | 3/12 features implementadas |

---

## 🗂️ Estructura del repositorio

```
E:\Mis proyectos\Cocina3D\
├── spec/                              ← FUENTE DE VERDAD — Spec-Driven Development
│   ├── constitution/
│   │   ├── mission.md                 ← Propósito y principios del proyecto
│   │   ├── tech-stack.md              ← Stack tecnológico y restricciones
│   │   └── roadmap.md                 ← Features priorizadas
│   └── features/
│       ├── 001-editor-3d-basico/      ← Feature completada
│       ├── 002-creacion-paredes/      ← Feature completada
│       └── 003-catalogo-objetos/      ← Feature completada
├── AGENTS.md                          ← Este archivo
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── editor/
│   │       └── page.tsx               ← Página principal del editor 3D
│   ├── data/
│   │   └── catalog.ts                 ← Catálogo de objetos (11 items, 4 categorías)
│   ├── components/
│   │   ├── 3d/                        ← Componentes Three.js
│   │   │   ├── Scene.tsx
│   │   │   ├── GridFloor.tsx
│   │   │   ├── Lighting.tsx
│   │   │   ├── CameraController.tsx
│   │   │   ├── Wall.tsx               ← Pared individual + TransformControls
│   │   │   └── FurnitureObject.tsx    ← Objeto individual + TransformControls + animación
│   │   ├── editor/                    ← Componentes del editor
│   │   │   ├── EditorLayout.tsx       ← Layout principal
│   │   │   ├── WallManager.tsx        ← Renderiza todas las paredes
│   │   │   ├── WallDrawMode.tsx       ← Modos de dibujo de paredes
│   │   │   ├── WallProperties.tsx     ← Panel propiedades (pared u objeto)
│   │   │   ├── ObjectProperties.tsx   ← Panel propiedades de objeto
│   │   │   ├── CatalogPanel.tsx       ← Catálogo lateral de objetos
│   │   │   ├── FurnitureManager.tsx   ← Renderiza todos los objetos
│   │   │   └── proceduralGeometry.ts  ← Geometría procedural por tipo de objeto
│   │   └── ui/
│   │       ├── WallMenu.tsx           ← Modal de creación de paredes
│   │       └── WebGLFallback.tsx      ← Fallback si WebGL no disponible
│   ├── lib/
│   │   ├── store.ts                   ← Zustand + zundo (paredes, objetos, gizmo)
│   │   └── persist.ts                 ← Persistencia localStorage
│   └── ...
└── public/
```

---

## 🧬 Stack técnico detallado

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16.2.10 | App Router con Turbopack |
| TypeScript | 6 | Tipado estricto |
| Tailwind CSS | v4 | Estilos utilitarios |
| @react-three/fiber | 9.6 | Render 3D en React |
| @react-three/drei | 9.x | OrbitControls, TransformControls |
| Three.js | 0.185 | Motor 3D subyacente |
| Zustand | 4.x | Estado global |
| zundo | última | Undo/Redo (temporal middleware) |
| react-error-boundary | — | Manejo de errores en Canvas |

**Scripts disponibles:**
```bash
npx next dev          # Dev server http://localhost:3000
npx next build        # Build producción + type check
```

---

## 🏛️ Spec-Driven Development (SDD)

**TODO** el desarrollo sigue SDD. Reglas:

1. **La spec es el artefacto primario.** El código deriva de la spec, no al revés.
2. **Un cambio empieza editando la spec** (`spec/features/NNN-nombre/spec.md`), nunca el código directamente.
3. **Ciclo completo por feature:** spec → clarify → plan → tasks → validate
4. **Cada feature tiene su carpeta** dentro de `spec/features/` con los 4 documentos.

### Documentos por feature

| Documento | Propósito |
|-----------|-----------|
| `spec.md` | Requisitos funcionales en formato EARS + no funcionales + criterios de aceptación |
| `plan.md` | Arquitectura, modelo de datos, contratos, decisiones técnicas |
| `tasks.md` | Tareas atómicas verificables con criterio de "hecho" |
| `validate.md` | Trazabilidad requisito→evidencia, checklist de verificación, veredicto |

### Formato EARS

```
CUANDO <evento/condición>, EL SISTEMA DEBE <respuesta>
```

---

## 📍 Estado actual (2026-07-07)

### ✅ Feature 001 — Editor 3D básico
Escena R3F funcional: grid, luces, cámara orbitable, fondo `#0f172a`.

### ✅ Feature 002 — Creación de Paredes
Dibujo arrastre + punto a punto, snapping 90°/extremos, intersecciones, selección, gizmo mover (X/Z), edición propiedades, undo/redo, cámara bloqueada durante draw/transform, UI profesional.

### ✅ Feature 003 — Catálogo de Objetos

| Función | Detalle |
|---------|---------|
| **Catálogo** | Panel lateral izquierdo con 4 categorías colapsables (Muebles 5, Electrodomésticos 3, Encimera 2, Accesorios 1) |
| **Objetos** | 11 tipos con geometría procedural (BoxGeometry compuestas + colores distintivos) |
| **Selección** | Click en objeto → selecciona, click en vacío → deselecciona. Exclusivo con paredes |
| **Gizmo mover** | TransformControls modo translate, flechas X/Z (plano horizontal, `showY=false`) |
| **Gizmo rotar** | TransformControls modo rotate, anillo Y (solo rotación en eje vertical, `showX=false`, `showZ=false`) |
| **Toggle modo** | Tecla **R** o botones en header (Mover/Rotar activo resaltado) |
| **Animación** | Doble clic en puerta/cajón → 300ms easing. Puerta rota ~80°, cajón desliza 0.3m |
| **Propiedades** | Panel derecho: posición (x,z), dimensiones, color picker, toggle animación, eliminar |
| **Eliminar** | Delete/Supr o botón rojo en propiedades |
| **Undo/Redo** | Ctrl+Z/Y para add/remove/move/rotate/toggle de objetos |
| **Persistencia** | localStorage guarda/restaura objetos automáticamente |
| **Preparado GLTF** | `buildGeometry()` intercambiable por cargador de modelos externos |

### 🔮 Siguiente pendiente

- **004 — Parametrización de objetos** — Dimensiones y materiales editables por objeto
- **005 — Colisiones y física** — Objetos no se atraviesan, snapping

---

## ⚙️ Arquitectura de componentes

### Layout completo

```
EditorLayout
├── Header (MenuBar)
│   ├── Logo + nombre
│   ├── Menús (Archivo, Editar, Ver, Ayuda)
│   ├── Indicador selección (pared/objeto)
│   ├── Gizmo mode toggle (Mover / Rotar) ← solo si hay selección
│   └── Undo/Redo (SVG)
├── Body (flex: catalog + toolbar + canvas + properties)
│   ├── CatalogPanel (w-60, panel izquierdo)
│   ├── Toolbar lateral (w-11)
│   │   ├── Botón Seleccionar (Escape)
│   │   └── Botón Añadir pared → WallMenu (modal)
│   ├── Canvas 3D (flex-1)
│   │   └── Scene
│   │       ├── CameraController (OrbitControls con bloqueo condicional)
│   │       ├── Lighting
│   │       ├── GridFloor
│   │       ├── WallManager
│   │       │   └── Wall[] (con TransformControls al seleccionar)
│   │       ├── FurnitureManager
│   │       │   └── FurnitureObject[] (con TransformControls + animación)
│   │       └── WallDrawMode
│   └── WallProperties (panel derecho, auto: pared u objeto)
└── WallMenu (modal overlay)
```

### Store (Zustand + zundo)

```ts
interface WallStore {
  // Paredes
  walls: Wall[];
  selectedWallId: string | null;
  drawMode: "none" | "point" | "drag";
  drawState: { start?: Point2D; current?: Point2D };
  isTransforming: boolean;

  // Objetos
  objects: FurnitureObject[];
  selectedObjectId: string | null;
  gizmoMode: "translate" | "rotate";

  // Acciones paredes
  addWall(start, end, height, thickness, color?): void;
  updateWall(id, partial): void;
  removeWall(id): void;
  selectWall(id | null): void;
  setIsTransforming(v): void;
  setDrawMode(mode): void;
  setDrawStart(p): void;
  setDrawCurrent(p?): void;
  clearDraw(): void;

  // Acciones objetos
  addObject(type, position, color?): void;
  updateObject(id, partial): void;
  removeObject(id): void;
  selectObject(id | null): void;
  toggleAnimation(id): void;
  setGizmoMode(mode): void;
}
```

### Modelo de datos

```ts
interface Point2D { x: number; z: number; }

interface Wall {
  id: string;          // "wall-1", "wall-2"...
  start: Point2D;
  end: Point2D;
  height: number;      // defecto 2.4
  thickness: number;   // defecto 0.1
  color: string;       // defecto "#e0e0e0"
}

interface FurnitureObject {
  id: string;           // "obj-1", "obj-2"...
  type: ObjectType;     // 'fridge' | 'oven' | 'cabinet' | ...
  position: { x: number; z: number };
  rotation: number;     // radianes, eje Y
  scale: number;        // uniforme, 1 = default
  animated: boolean;    // puerta/cajón abierto?
  color: string;
}
```

### Reglas de selección

- `selectWall(id)` → `selectedWallId = id`, `selectedObjectId = null`
- `selectObject(id)` → `selectedObjectId = id`, `selectedWallId = null`
- Click en vacío (`onPointerMissed`) → ambos a `null`
- Solo **uno** seleccionado a la vez

---

## 🐛 Bugs conocidos y patrones de error

| Problema | Síntoma | Fix | Archivo |
|----------|---------|-----|---------|
| OrbitControls vs TransformControls | Al mover gizmo, cámara rota | `enabled={!isTransforming}` | `CameraController.tsx` |
| OrbitControls vs WallDrawMode | Al dibujar, cámara se mueve | `enabled={!(drawMode !== "none" \|\| isTransforming)}` | `CameraController.tsx` |
| Delete handler se desmonta | Delete no funciona en modo normal | useEffect siempre activo | `WallDrawMode.tsx` |
| showY={false} en rotate mode | No se podía rotar Y | `showX/Z={false}` solo en rotate, `showY={true}` | `FurnitureObject.tsx` |

---

## 🔗 Enlaces útiles

| Recurso | Ruta |
|---------|------|
| Código | `E:\Mis proyectos\Cocina3D` |
| Spec SDD | `E:\Mis proyectos\Cocina3D\spec\` |
| Obsidian vault | `E:\ObsidianVault\Proyectos\Cocina3D\` |
| Editor | `http://localhost:3000/editor` |
| Perfil Hermes | `C:\Users\Dpto_Tec\AppData\Local\hermes\profiles\desarrollador\` |
| SOUL.md | `C:\Users\Dpto_Tec\AppData\Local\hermes\profiles\desarrollador\SOUL.md` (**NO MODIFICAR**) |

---

## ⚠️ Reglas para el agente

1. **Antes de implementar/cambiar código**, leer:
   - Este `AGENTS.md`
   - `spec/features/<feature-actual>/spec.md`
   - Obsidian vault (`E:\ObsidianVault\Proyectos\Cocina3D\`)
   - Roadmap (`spec/constitution/roadmap.md`)

2. **NO modificar** archivos de configuración del perfil Hermes (`SOUL.md`, skills, etc.) sin permiso explícito.

3. **Modo trabajo:** Respuestas compactas (token-saver activo). Priorizar acción sobre descripción.

4. **SDD primero:** Cualquier cambio funcional empieza actualizando la spec, no el código.

5. **Guardado:** localStorage (navegador). No hay backend.

6. **Selección exclusiva:** Pared y objeto no pueden estar seleccionados a la vez.

7. **Gizmo:** `gizmoMode` en store. Translate = X/Z arrows. Rotate = Y ring only.

---

*Documentado por Hermes Agent — 2026-07-07*
