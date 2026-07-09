# Especificación — 010 Materiales PBR

## Objetivo
Reemplazar colores sólidos en muebles y electrodomésticos por materiales PBR (Physically Based Rendering) con mapas de albedo, normal, roughness y metalness, más un selector de material por objeto.

## Actores
- Diseñador de cocinas (usuario)

## Historias de usuario
- Como diseñador, quiero que los muebles tengan texturas de madera realista (vetas, porosidad) para que el render se vea profesional
- Como diseñador, quiero que los electrodomésticos tengan aspecto de acero cepillado/cromado para realismo
- Como diseñador, quiero poder cambiar el material de cada objeto (roble, nogal, mármol, granito, acero) para personalizar el diseño
- Como diseñador, quiero que los materiales persistan al guardar/cargar la escena

## Requisitos funcionales (EARS)
1. CUANDO el usuario selecciona un objeto con material PBR, EL SISTEMA DEBE mostrar el selector de material en el panel de propiedades
2. CUANDO el usuario cambia el material de un objeto, EL SISTEMA DEBE actualizar la geometría con las texturas correspondientes
3. CUANDO el objeto tiene material tipo "madera", EL SISTEMA DEBE aplicar mapa normal de vetas + roughness map
4. CUANDO el objeto tiene material tipo "acero", EL SISTEMA DEBE aplicar metalness alto + roughness bajo + mapa normal de cepillado
5. CUANDO el objeto tiene material tipo "mármol/granito", EL SISTEMA DEBE aplicar mapa normal de textura pétrea
6. CUANDO el objeto es encimera o isla, EL SISTEMA DEBE usar texturas de mármol/granito por defecto
7. CUANDO la escena se guarda, EL SISTEMA DEBE persistir el materialId de cada objeto
8. CUANDO la escena se carga, EL SISTEMA DEBE restaurar el material de cada objeto

## Requisitos no funcionales
- Materiales cargados desde /public/textures/materials/ (texturas JPG/PNG pre-bakeadas en repo)
- Fallback a color sólido si falla carga de textura (siempre visible)
- Texturas procedurales para evitar dependencias externas (generadas en código con canvas)

## Non-goals
- NO se implementa editor de materiales (no custom roughness/metalness sliders por objeto)
- NO se implementan mapas de oclusión/desplazamiento
- NO se implementa intercambio de texturas desde URL externa

## Criterios de aceptación
- [ ] Al menos 5 materiales: Roble, Nogal, Mármol, Granito, Acero
- [ ] Cada material tiene albedo + normal map + roughness + metalness
- [ ] Selector de material en propiedades aparece para todo objeto
- [ ] Al cambiar material, el objeto se actualiza visualmente en < 1s
- [ ] Material persiste al guardar/recargar
- [ ] Build sin errores TypeScript