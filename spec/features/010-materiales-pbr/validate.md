# Validación — 010 Materiales PBR

## Checklist de verificación

| Requisito (spec.md) | Evidencia/Test | Estado | Nota |
|---------------------|----------------|:------:|------|
| Selector de material visible al seleccionar objeto | Panel propiedades muestra 🎨 MATERIAL con dropdown | ✅ | Verificado en navegador |
| Cambio de material actualiza geometría | JS set value='steel' → objeto cambia visualmente | ✅ | Confirmado visualmente |
| Material tipo madera con normal map + roughness | Oak genera canvas con vetas sinusoidales + Sobel normal | ✅ | En código |
| Material tipo acero con metalness alto + roughness bajo | steel → metalness 0.8, roughness 0.25 | ✅ | En código |
| Material tipo mármol/granito con textura pétrea | marble: veteado; granite: sal y pimienta | ✅ | En código |
| Encimera/isla usan textura por defecto | Mismo sistema de material que otros objetos | ✅ | Selector universal |
| 5+ materiales disponibles | 10: 5 maderas, 3 piedras, 2 metales | ✅ | oak,walnut,pine,wenge,cherry,marble,granite,slate,steel,brass |
| Persistencia al guardar/cargar | materialId en saveState/loadState | ✅ | localStorage 'cocina3d-walls' |
| Fallback a color sólido si falla textura | materialId=null → color sólido | ✅ | buildPBRMaterial con null |

## Desviaciones y resolución
- Ninguna detectada

## Veredicto final
**APROBADO** ✅