

## Objetivo

Refactorizar completamente `src/data/products.ts`, `/joyeria/catalogo` y las páginas de producto usando las nuevas imágenes renombradas por referencia (CAD 1.jpg, AN 1.jpg, RE 1.jpg, etc.) y filtrando solo los productos con celdas grises del Excel (más todos los Relojes).

## Análisis de cambios clave

**Imágenes renombradas**: Ya no usan IMG_XXXX.jpg, ahora usan el nombre de referencia del Excel:
- lote1: `CAD 1.jpg` ... `CAD 36.jpg` + `ES 1.jpg` ... `ES 8.jpg` + `PUL 1.jpg` ... `PUL 31.jpg`
- lote2: `AN 1.jpg` ... `AN 50.jpg` (algunos con sufijo .2)
- lote3: `DIJE 1.jpg` ... `DIJE 76.jpg`
- lote4: `ARR 1.jpg` ... `ARR 15.jpg` + `VC&A 1.jpg` ... `VC&A 20.jpg`
- lote5: `CAR 1.jpg` ... `CAR 24.jpg`
- lote6: `TIF 1.jpg` ... `TIF 16.jpg` + `IMG_3078.jpg`, `IMG_3081.jpg`, `IMG_3083.jpg`
- lote7: `BUL 1.jpg` ... `BUL 20.jpg` + `CH H 1.jpg` ... `CH H 3.jpg` + `TIF 17.jpg` ... `TIF 23.jpg`
- lote8: `RE 1.jpg` ... `RE 35.jpg`

**Reorganización de lotes** (diferente al Excel original):
- Esclavas y Pulsos ahora en lote1 (no lote6)
- Van Cleef ahora en lote4 (no lote5)
- Tiffany dividido: lote6 (T&CO 1-16) y lote7 (T&CO 17-21+)
- Bulgari y Chrome Hearts en lote7 (no lote6)

**Filtro de celdas grises**: Solo incluir productos cuyas celdas estén coloreadas en gris en el Excel. Durante implementación se parseará el Excel con openpyxl para detectar el fill color de cada fila y determinar cuáles incluir.

## Plan de implementación

### 1. Parsear Excel con openpyxl (script temporal)

Ejecutar un script Python que:
- Abra el Excel y recorra cada hoja de productos
- Detecte filas con celdas de fondo gris
- Genere la lista de productos a incluir con sus datos
- Mapee cada referencia a su archivo de imagen real en el lote correcto
- Excluya productos sin celda gris (excepto Relojes, que se incluyen todos)
- Genere el código TypeScript del array de productos

### 2. Reescribir `src/data/products.ts`

- Misma interfaz `Product` existente
- Actualizar todas las rutas de imagen: `/lote_1/IMG_2667.jpg` a `/lote1/CAD 1.jpg` (con espacio URL-encoded si necesario)
- Solo incluir productos con celdas grises + todos los relojes
- Mapear las referencias del Excel a los archivos reales en cada lote
- Exportar listas dinámicas de categorías y marcas

### 3. Actualizar `src/pages/Joyeria.tsx`

- Importar productos actualizados
- Filtros de categoría y marca se derivan automáticamente de los datos
- Mantener botón "Relojes" y diseño editorial existente
- Las rutas de imagen ahora usan los nuevos paths

### 4. Actualizar `src/pages/ProductDetail.tsx`

- Los IDs de producto se mantienen consistentes con el nuevo dataset
- Mostrar imágenes adicionales (.2, .3 variants) si existen
- Mostrar todos los campos disponibles por tipo de producto

### 5. Sin cambios en rutas ni layouts

Las rutas en `App.tsx` y `JoyeriaLayout.tsx` permanecen igual.

## Notas técnicas

- Las imágenes con espacios en el nombre (e.g. `CAD 1.jpg`) necesitan URL encoding en las rutas: `/lote1/CAD%201.jpg` o usar `encodeURIComponent`
- Imágenes con `&` en el nombre (VC&A) también necesitan encoding especial
- Los archivos `.2.jpg`, `.3.jpg` son fotos adicionales del mismo producto (se pueden usar como galería o ignorar por ahora)
- Productos con precio `#NUM!` o vacío se muestran como "Consultar precio"

