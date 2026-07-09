# 022 · Modo Planta 2D

## Objetivo
Vista cenital 2D con layout de paredes, objetos, mediciones y grid.

## Requisitos
1. CUANDO el usuario activa "Modo Planta", EL SISTEMA DEBE mostrar vista 2D desde arriba
2. CUANDO está en modo planta, EL SISTEMA DEBE mostrar: paredes como líneas, objetos como iconos 2D, cotas (medidas)
3. CUANDO el usuario hace hover sobre un objeto en planta, EL SISTEMA DEBE resaltar el objeto 3D correspondiente
4. CUANDO el usuario arrastra un objeto en planta, EL SISTEMA DEBE mover la posición 3D correspondiente

## Archivos
- `src/components/editor/PlantView.tsx` — Vista 2D con canvas HTML o R3F orthographic
- `src/components/editor/PlantToolbar.tsx` — Toolbar específica planta
- Modificar `EditorLayout.tsx` — botón toggle Modo Planta
