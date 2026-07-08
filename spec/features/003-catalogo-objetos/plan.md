# Plan técnico — 003 · Catálogo de Objetos

## Arquitectura

```
EditorLayout
├── CatalogPanel (← NUEVO — panel lateral izquierdo)
├── Scene
│   ├── WallManager
│   │   └── Wall[]
│   ├── FurnitureManager (← NUEVO — renderiza todos los objetos)
│   │   └── FurnitureObject[] (← NUEVO — geometría procedural + animaciones)
│   └── WallDrawMode
└── PropertiesPanel (← MODIFICADO — unificado: pared u objeto)
    ├── WallProperties
    └── ObjectProperties (← NUEVO)
```

## Modelo de datos

### Store — nuevas acciones y estado

```ts
// Añadir a WallStore
objects: FurnitureObject[];
selectedObjectId: string | null;

addObject(obj: Omit<FurnitureObject, 'id'>): void;
updateObject(id: string, partial: Partial<FurnitureObject>): void;
removeObject(id: string): void;
selectObject(id: string | null): void;
toggleAnimation(id: string): void;

// Modificar selectWall: setear selectedObjectId = null
// Modificar handleClickMissed (click en vacío): deseleccionar ambos
```

### FurnitureObject

```ts
interface FurnitureObject {
  id: string;           // "obj-1", "obj-2"...
  type: ObjectType;     // 'fridge' | 'oven' | 'cabinet' | ...
  position: { x: number; z: number };   // en metros, plano XZ
  rotation: number;     // radianes, eje Y
  scale: number;        // uniforme, 1 = tamaño por defecto
  animated: boolean;    // true = puerta/cajón abierto
  color: string;        // hex, permite personalización
}
```

### Catálogo — catálogo de objetos

```ts
interface CatalogItem {
  id: ObjectType;
  name: string;            // "Nevera", "Armario base"...
  category: 'Muebles' | 'Electrodomésticos' | 'Encimera' | 'Accesorios';
  icon: string;            // emoji para mostrar en catálogo
  defaultWidth: number;    // metros
  defaultHeight: number;
  defaultDepth: number;
  defaultColor: string;
  hasAnimation: boolean;   // true si tiene puerta/cajón animable
  animationType?: 'door' | 'drawer';
}
```

## Contratos / interfaces

### CatalogPanel

```
Props:
  - catalog: CatalogItem[]        (definiciones estáticas)
  - onSelectItem: (type: ObjectType) => void

Comportamiento:
  - Muestra 4 categorías colapsables con iconos SVG
  - Cada ítem muestra emoji + nombre
  - Al hacer clic → onSelectItem → store.addObject() + selectObject()
  - El objeto aparece en el centro de la escena (x:0, z:2)
```

### FurnitureObject (componente 3D)

```
Props:
  - object: FurnitureObject

Render:
  - Grupo Three.js con geometría procedural según type
  - Si hasAnimation, escucha doble clic → toggleAnimation
  - Si animated=true, interpola rotación/posición de partes móviles
  - onClick → selectObject(id) + deselect wall
```

### ObjectProperties

```
Props: ninguna (lee el store)
  - Muestra posición (x, z), rotación, dimensiones del objeto
  - Color picker
  - Botón toggle animation (si aplica)
  - Botón eliminar (rojo)
  - Sección de reemplazo: "Próximamente: modelo GLTF real"
```

## Decisiones técnicas

| Decisión | Opción elegida | Alternativa descartada |
|----------|---------------|----------------------|
| **Animación** | useFrame + lerp (suave, 300ms) | React Spring (dependencia extra) |
| **Selección** | selectedWallId y selectedObjectId mutuamente excluyentes | Modo de selección (más clicks) |
| **Geometría** | cajas compuestas (BoxGeometry + grupo) para cada tipo | Un solo BoxGeometry (muy simple) |
| **Catálogo** | Panel lateral izquierdo (grid-cols-[240px_1fr_auto]) | Overlay/modal (menos accesible) |
| **Gizmo modo** | Store `gizmoMode: "translate" | "rotate"`, toggle con R | Botones + tecla R para alternar |
| **Rotación** | Solo anillo Y visible en rotate mode, ocultos X y Z | Permitir todas las rotaciones (tumbaría objetos) |
| **Traslación** | Solo flechas X y Z en translate mode, oculta Y | Permitir volar objetos (no deseado en planta) |

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|-----------|
| Conflicto entre selección pared/objeto | Store garantiza exclusión mutua |
| Rendimiento con muchos objetos | Limitar a 100, geometrías compartidas (instancing futuro) |
| Animaciones bruscas | Interpolación suave con easing |

## Flujo de animación

```
Doble clic en objeto con animationType='door'
  → store.toggleAnimation(id)
  → FurnitureObject detecta animated=true
  → useFrame interpola:
        door.rotation.y = lerp(0, PI/2, t)  // 300ms ease-in-out
```

## Dependencias externas

- Ninguna nueva — todo con Three.js + R3F + Drei
