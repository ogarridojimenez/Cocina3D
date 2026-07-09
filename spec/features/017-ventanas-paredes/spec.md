# 017 · Ventanas en paredes

## Objetivo
Poder crear ventanas integradas en las paredes con marco y cristal.

## Requisitos
1. CUANDO el usuario selecciona "Añadir ventana", EL SISTEMA DEBE crear un hueco en la pared seleccionada y renderizar marco + cristal
2. CUANDO el usuario edita una ventana, EL SISTEMA DEBE permitir cambiar: ancho, alto, altura desde suelo, posición horizontal en la pared
3. CUANDO se renderiza la escena 3D, LA VENTANA DEBE verse como parte de la pared (mismo color/acabado alrededor del marco)

## Archivos
- `src/components/3d/Window.tsx` — Componente ventana 3D
- `src/components/editor/WindowProperties.tsx` — Panel propiedades
- `src/lib/store.ts` — Añadir ventanas a la pared
