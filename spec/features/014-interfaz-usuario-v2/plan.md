# 014 · Interfaz Usuario V2 — Plan

## Enfoque

Refactor de layout en `EditorLayout.tsx` y componentes asociados. No se cambia la lógica de negocio ni el store. Solo se mueven/reorganizan componentes existentes + se añaden 3 componentes nuevos (StatusBar, TabPanel, HierarchicalOutliner).

## Componentes a modificar

| Componente | Cambio |
|-----------|--------|
| `CatalogPanel.tsx` | De lista a grid visual con thumbnails. Catálogo con search |
| `ObjectOutliner.tsx` | Árbol jerárquico con visibilidad (ojo) y bloqueo (candado). Data: walls + objects del store |
| `ObjectProperties.tsx` | Dividir en tabs: Dimensiones, Acabados, Iluminación |
| `EditorLayout.tsx` | Layout grid CSS, encajar nuevos componentes |

## Componentes nuevos

| Componente | Función |
|-----------|---------|
| `Toolbar.tsx` | Botones de herramienta: Seleccionar, Añadir pared, Mover, Rotar (iconos SVG + tooltip atajos) |
| `StatusBar.tsx` | Barra inferior: nombre objeto, coordenadas, zoom, undo/redo |
| `TabPanel.tsx` | Wrapper genérico de tabs para propiedades |

## Modelo de datos

Sin cambios. Store existente (`store.ts`) ya tiene `walls`, `objects`, `selectedWallId`, `selectedObjectId`, `gizmoMode`, etc.

## Implementación

1. Crear `src/components/editor/StatusBar.tsx` — barra inferior
2. Crear `src/components/editor/TabPanel.tsx` — tabs genéricos
3. Refactor `CatalogPanel.tsx` — grid con miniaturas de 64×64 (canvas generado por cada tipo de objeto)
4. Refactor `ObjectOutliner.tsx` — árbol jerárquico con visibilidad/bloqueo
5. Dividir `ObjectProperties.tsx` en tabs con reutilización de secciones existentes
6. Reorganizar `EditorLayout.tsx` — layout grid, integrar todos los paneles
7. Añadir `<Toolbar />` en toolbar vertical existente con iconos mejores + tooltips
8. Build + verificar persistencia

## Decisiones técnicas

- **Grid catálogo:** Canvas de 64×64 generado con render simple de cada geometría. Sin dependencias externas
- **Tabs:** Componente ligero con estado local `activeTab`, sin librería externa
- **Outliner jerárquico:** Flat list agrupada por tipo (primero paredes, luego objetos), con iconos SVG de ojo/candado
- **Toolbar:** SVG inline, tooltips nativos con `title` attribute

## Riesgos

- El grid de catálogo puede ser lento si hay 50+ objetos. Mitigación: lazy render con `useMemo`
- El refactor de layout puede romper persistencia. Mitigación: `loadState` en useEffect NO se toca