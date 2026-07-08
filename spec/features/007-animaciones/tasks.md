# Tareas — 007 Animaciones

| # | Tarea | Depende de | Criterio de aceptación | Paralelizable |
|---|-------|-----------|--------------------------|:-------------:|
| 1 | Añadir `animated: boolean` a `FurnitureObject` y a la store (valor por defecto `false`) | — | Objeto se crea con `animated=false` | ✅ |
| 2 | Añadir `toggleAnimation` a la store de Zustand | 1 | Alterna el valor `animated` de un objeto por su ID | ✅ |
| 3 | Implementar interpolación por `useFrame` con SmoothStep y delta-time | 1 | La animación transiciona suavemente en ~300ms con delta corregido | ❌ |
| 4 | Aplicar rotación/traslación a los grupos 3D (doorGroup, drawerGroup, lidGroup) según valor interpolado | 3 | Puertas rotan en Y, cajones se deslizan en Z | ❌ |
| 5 | Vincular toggle con clic derecho en el objeto | 2, 3 | Clic derecho → alterna animated + animación se ejecuta | ❌ |
| 6 | Añadir control de animación en panel de propiedades | 2 | Checkbox "Animado" en ObjectProperties → toggleAnimation | ✅ |
| 7 | Limitar delta máximo a 0.1s en useFrame | 3 | Tras pausa larga, la animación no salta instantáneamente | ✅ |
| 8 | Verificar persistencia: al guardar/recargar, `animated` se restaura correctamente | 2 | Crear objeto, animar, recargar → estado animado se mantiene | ❌ |

**Orden de implementación:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8
