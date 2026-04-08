

## Plan: Actualizar JoyeriaHome con productos reales y foto del atelier

### Resumen

Reemplazar los datos mock de "Piezas destacadas" y las secciones "Anillos"/"Collares" con productos reales del catálogo, y cambiar la imagen del Atelier por una más relevante (la actual `galleryStore` es de la tienda con vitrinas, pero se puede usar una de las fotos de joyería/taller que sea más acorde).

### Cambios

**1. Actualizar `src/pages/JoyeriaHome.tsx`**

- **Piezas destacadas**: Eliminar `mockFeatured`. Importar `products` de `@/data/products` y seleccionar 5 productos reales variados (uno de cada categoría: Cadenas, Anillos, Collares, Pulseras, Dijes) con buenos precios para mostrar diversidad. Los links apuntarán a `/joyeria/{product.id}` que ya funciona.

- **Sección Anillos/Collares**: Cambiar los links genéricos a `/joyeria/catalogo` por links con filtro de categoría (`/joyeria/catalogo?categoria=Anillos`). Usar la imagen real de un anillo (e.g. `/lote2/AN%201.jpg`) y un collar (e.g. `/lote4/VCA%201.jpg`) en lugar de las imágenes placeholder `feat1`/`feat2`.

- **Sección Atelier**: Reemplazar `galleryStore` por una imagen más representativa del concepto artesano. Usaremos `galleryHands` (manos trabajando joyería) que conecta mejor con el texto sobre "taller contemporáneo y artesano" y "materiales nobles".

- **Limpieza de imports**: Remover imports de `feat1`, `feat2` si ya no se usan como assets importados, y usar paths directos de `/lote*/` para las imágenes de productos.

**2. Actualizar `src/pages/Joyeria.tsx` (menor)**

- Leer query param `categoria` al inicializar el filtro de categoría para que los links desde JoyeriaHome funcionen (si no lo hace ya).

### Productos destacados propuestos

Se seleccionarán 5 productos con buena representación visual y de precio variado:
1. Una cadena Cartier 10K (`cad-1`)
2. Un anillo de oro (`an-1`)  
3. Un collar Van Cleef & Arpels (`vcanda-1`)
4. Un pulso Barbado (`pul-1`)
5. Un dije Cruz 10K (`dije-1`)

