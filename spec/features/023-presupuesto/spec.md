# 023 · Generación de presupuesto

## Objetivo
Generar presupuesto automático desde los objetos colocados en la cocina.

## Requisitos
1. CUANDO el usuario abre el panel Presupuesto, EL SISTEMA DEBE calcular precio total sumando precios de todos los objetos
2. CUANDO hay objetos seleccionados, EL SISTEMA DEBE mostrar subtotal parcial
3. CUANDO el usuario pulsa "Exportar PDF", EL SISTEMA DEBE generar PDF con: lista objetos, precios unitarios, total, nombre proyecto

## Archivos
- `src/data/prices.ts` — Precios por tipo de objeto
- `src/components/editor/BudgetPanel.tsx` — Panel presupuesto
- Modificar `EditorLayout.tsx` — botón Presupuesto
