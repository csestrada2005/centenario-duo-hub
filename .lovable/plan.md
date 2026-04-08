## Plan: Refactorizar products.ts con datos correctos del Excel y nuevas imágenes

### Resumen

Regenerar completamente `src/data/products.ts` usando los datos exactos del nuevo Excel, las imágenes en los nuevos folders `lote1`-`lote8`, precios "Precio Total"/"Precio 2", y soporte para imágenes de carrusel (sufijos .2, .3, .4).

### Cambios

**1. Reescribir `src/data/products.ts` (~390 líneas)**

Generar mediante script Python todos los productos del Excel con:

- **Precios**: Usar exclusivamente "Precio Total" o "Precio 2" (el segundo precio en cada tabla). Productos con `$-` o vacío → `price: null` ("Consultar precio")
- **Imágenes principales**: URL-encoded paths (espacios → `%20`, `&` → `%26`)
- **Imágenes carrusel** (`images[]`): Detectar automáticamente archivos `.2.jpg`, `.3.jpg`, `.4.jpg` en cada lote
- **Casos especiales**:
  - VC&A 10-14: No tienen imagen principal `.jpg`, usar `.3.jpg` como primary y usar .4.jpg (si esque existe) como secondary para el carrusel.
  - AN 45, AN 68, AN 72: Sin imagen → excluir del catálogo
  - DIJE 77: Sin imagen → excluir
  - CAR 2: Tiene `_CAR 2.2.jpg` como extra (con guión bajo)
  - CAD 5.5: Imagen extra sin producto en Excel → ignorar

**Productos totales esperados**: ~317 (36 cadenas + 31 pulsos + 8 esclavas + 69 anillos + 76 dijes + 15 arracadas + 20 VC&A + 24 Cartier + 23 Tiffany + 19 Bulgari + 3 Chrome Hearts + 35 relojes, menos ~4 sin imagen)

**Categorías**: Cadenas, Pulseras, Esclavas, Anillos, Dijes, Arracadas, Collares, Pulseras (para marcas de lujo se asigna categoría según tipo: "COLLAR" → Collares, "PULSERA" → Pulseras, "ARETES" → Arracadas, "ANILLO" → Anillos)

**Marcas**: Centenario, Van Cleef & Arpels, Cartier, Tiffany & Co., Bulgari, Chrome Hearts

**2. Actualizar `src/pages/ProductDetail.tsx**`

- Ya soporta `images[]` para carrusel — solo verificar que funciona con los nuevos datos
- Sin cambios adicionales necesarios

**3. Actualizar `allCategories`, `allBrands`, `watchBrands**`

Derivar dinámicamente de los datos reales para reflejar las categorías actualizadas.

### Enfoque técnico

1. Script Python que lee el contenido parseado del Excel y los archivos reales en `public/lote*/`
2. Genera el TypeScript completo con todos los productos, precios correctos, y arrays de imágenes carrusel
3. Verificación cruzada: cada producto tiene imagen existente, precios son "Precio 2"/"Precio Total"
4. Validar IDs únicos sin duplicados