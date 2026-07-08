# 005 · Parametrización de Objetos

**Estado:** propuesta

## Qué hace
El usuario podrá modificar las dimensiones (ancho, alto, fondo) de cualquier objeto del catálogo desde el panel de propiedades, además del color ya existente.

## Requisitos funcionales (EARS)

- CUANDO el usuario selecciona un objeto, EL SISTEMA DEBE mostrar campos editables para ancho, alto y fondo en el panel de propiedades
- CUANDO el usuario cambia un valor de dimensión, EL SISTEMA DEBE actualizar la geometría 3D del objeto en tiempo real
- CUANDO el usuario añade un objeto nuevo, EL SISTEMA DEBE inicializar sus dimensiones con los valores por defecto del catálogo
- CUANDO el usuario cambia dimensiones, EL SISTEMA DEBE registrar la acción en el historial de undo/redo
- CUANDO el usuario aplica una escala con el gizmo, EL SISTEMA DEBE recalcular las dimensiones base multiplicadas por la escala actual
- MIENTRAS el objeto no tiene dimensiones personalizadas, EL SISTEMA DEBE mostrar las del catálogo como valores iniciales

## Requisitos no funcionales
- Los inputs de dimensión deben tener step de 0.05m (5cm) y rango 0.1m–5m
- La geometría debe regenerarse al cambiar dimensiones sin recrear el objeto completo si es posible

## Criterios de aceptación
- [ ] Panel de propiedades muestra inputs editables para ancho/alto/fondo
- [ ] Al cambiar una dimensión, el objeto 3D se actualiza al instante
- [ ] Undo/redo funciona con cambios de dimensión
- [ ] Al añadir objeto nuevo, dimensiones = valores del catálogo
