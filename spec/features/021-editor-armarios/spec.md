# 021 · Editor de armarios configurables

## Objetivo
Armarios con altura/anchura editable, número de baldas, tipo de puertas (batiente/deslizante/abierta).

## Requisitos
1. CUANDO el usuario coloca un armario, EL SISTEMA DEBE permitir configurar: altura, anchura, fondo, nº baldas, nº puertas
2. CUANDO cambia nº baldas, EL SISTEMA DEBE redistribuir las baldas internas visualmente
3. CUANDO cambia tipo puerta, EL SISTEMA DEBE cambiar la geometría de las puertas
4. Los armarios abiertos muestran el interior con baldas

## Archivos
- Modificar `proceduralGeometry.ts` — armario paramétrico
- Crear `src/components/editor/ArmarioProperties.tsx`
- Modificar `catalog.ts` — tipos de armario configurable
