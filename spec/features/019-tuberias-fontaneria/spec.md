# 019 · Tuberías y fontanería

## Objetivo
Añadir elementos de fontanería visibles: tuberías bajo fregadero, columna de fontanería.

## Requisitos
1. CUANDO el usuario selecciona "Columna fontanería", EL SISTEMA DEBE colocar un tubo vertical que conecta suelo-techo
2. CUANDO el usuario añade fregadero, EL SISTEMA DEBE mostrar tuberías visibles bajo encimera (opcional toggle)
3. Los objetos de fontanería deben tener material metálico (acero/latón CC0)

## Archivos
- Modificar `catalog.ts` — 3 objetos: columna fontanería, tubería horizontal, sifón decorativo
- Modificar `proceduralGeometry.ts` — geometrías cilíndricas para tuberías
