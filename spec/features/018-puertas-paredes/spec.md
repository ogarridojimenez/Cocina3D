# 018 · Puertas en paredes

## Objetivo
Poder crear puertas en paredes con marco, apertura y lado configurable.

## Requisitos
1. CUANDO el usuario añade una puerta, EL SISTEMA DEBE crear hueco en pared + marco + hoja
2. CUANDO el usuario hace clic en la puerta, EL SISTEMA DEBE animar apertura (toggle)
3. CUANDO el usuario edita propiedades, EL SISTEMA DEBE permitir: lado apertura (izq/dcha), ancho, alto

## Archivos
- `src/components/3d/Door.tsx`
- `src/components/editor/DoorProperties.tsx`
- Modificar `Wall.tsx` para huecos
