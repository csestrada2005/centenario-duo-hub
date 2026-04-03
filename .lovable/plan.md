

## Objetivo

Reemplazar el catálogo de joyería (datos mock) con los productos reales del Excel, incluyendo imágenes de los lotes, filtros actualizados, un botón especial para relojes, y páginas de detalle por producto.

## Análisis del Excel

**284 productos con foto** distribuidos en:

| Categoría | Cantidad con foto | Lote | Marca |
|---|---|---|---|
| Cadenas Oro | 38 | Lote1 | Centenario (genérico) |
| Pulsos Oro | 3 | Lote6 | Centenario |
| Esclavas Oro | 8 | Lote6 | Centenario |
| Anillos Oro | 50 | Lote2 | Centenario |
| Dijes Oro | 49 | Lote3 | Centenario |
| Arracadas Oro | 15 | Lote4 | Centenario |
| Van Cleef & Arpels | 20 | Lote5 | Van Cleef & Arpels |
| Cartier (joyería) | 24 | Lote5 | Cartier |
| Tiffany & Co. | 23 (algunos sin precio) | Lote7 | Tiffany & Co. |
| Bulgari | 20 (algunos sin precio) | Lote6 | Bulgari |
| Chrome Hearts | 3 (sin precio) | Lote6 | Chrome Hearts |
| Relojes | 31 | Lote8 | Rolex, Hublot, AP, Cartier, Patek Philippe, Jacob & Co |

**Reglas de exclusión:**
- Productos marcados `[SIN FOTO]` se excluyen
- Productos sin precio visible (columna vacía o `#NUM!`) se incluyen sin precio mostrado (mostrar "Consultar precio")

## Categorías derivadas del Excel

- **Cadenas** (38 productos)
- **Anillos** (50 productos)  
- **Dijes** (49 productos)
- **Arracadas/Aretes** (15 genéricos + aretes de marcas)
- **Pulseras/Esclavas** (3 pulsos + 8 esclavas + pulseras de marcas)
- **Collares** (collares de marcas)

## Marcas derivadas del Excel

- Centenario (oro genérico: cadenas, anillos, dijes, arracadas, pulsos, esclavas)
- Van Cleef & Arpels
- Cartier
- Tiffany & Co.
- Bulgari
- Chrome Hearts

## Cambios a implementar

### 1. Archivo de datos: `src/data/products.ts` (nuevo)

Un archivo central con todos los ~284 productos con foto, cada uno con:
- `id` (basado en clave/referencia)
- `name` (descripción limpia)
- `details` (detalles adicionales)
- `category` ("Cadenas", "Anillos", "Dijes", "Arracadas", "Pulseras", "Collares")
- `brand` ("Centenario", "Van Cleef & Arpels", "Cartier", etc.)
- `karat` (quilataje cuando aplique)
- `size` (talla/largo/tamaño)
- `price` (número o null si no hay precio)
- `priceTotal` (precio con IVA cuando exista)
- `image` (ruta: `/lote_X/IMG_XXXX.jpg`)
- `type` ("joyeria" | "reloj")
- Para relojes: `modelo`, `correa`, `dial`, `material`

### 2. Archivo de datos relojes: incluido en el mismo `products.ts`

Los 31 relojes del Lote8 con sus campos específicos (marca, modelo, correa, dial, material).

### 3. Refactorizar `src/pages/Joyeria.tsx`

- Importar productos de `src/data/products.ts`
- **Filtros de categoría**: derivados de los datos reales ("Todos", "Cadenas", "Anillos", "Dijes", "Arracadas", "Pulseras", "Collares")
- **Filtros de marca**: derivados de datos reales ("Todos", "Centenario", "Van Cleef & Arpels", "Cartier", "Tiffany & Co.", "Bulgari", "Chrome Hearts")
- **Remover el filtro de "Relojes"** del panel de filtros
- **Agregar botón "Relojes"** visible en el filter bar. Al hacer click, filtra solo productos de tipo "reloj"
- Mantener el diseño editorial existente (GoldLine, CornerFrame, ParallaxImg, etc.)
- Las imágenes ahora apuntan a `/lote_X/IMG_XXXX.jpg`
- Productos sin precio muestran "Consultar precio"
- Paginación o "cargar más" dado que hay ~250+ productos de joyería

### 4. Refactorizar `src/pages/ProductDetail.tsx`

- Buscar el producto por `id` en los datos importados
- Mostrar imagen real del producto
- Mostrar todos los detalles disponibles (quilataje, talla, largo, etc.)
- Para relojes: mostrar specs específicos (modelo, correa, dial, material)
- Los "productos relacionados" se sacan de la misma categoría/marca
- Si no se encuentra el producto, mostrar 404

### 5. Actualizar rutas en `src/App.tsx`

- Mantener `/joyeria/relojes` como ruta que renderiza el catálogo filtrado por relojes (o redirigir a `/joyeria/catalogo` con filtro de relojes activo)
- Asegurar que `/joyeria/:id` funcione con los nuevos IDs de producto

### 6. Actualizar `src/components/JoyeriaLayout.tsx`

- Nav item "Relojes" puede apuntar a `/joyeria/catalogo?tipo=relojes` o mantener la ruta actual

## Estructura de datos (ejemplo)

```typescript
export interface Product {
  id: string;
  name: string;
  details?: string;
  category: string;
  brand: string;
  karat?: string;
  size?: string;
  price: number | null;
  priceTotal?: number | null;
  image: string;
  type: "joyeria" | "reloj";
  // Reloj-specific
  modelo?: string;
  correa?: string;
  dial?: string;
  material?: string;
}
```

## Notas importantes

- Los ~97 productos sin foto se excluyen completamente
- Algunos productos Bulgari/Tiffany tienen `#NUM!` como precio -- se muestran como "Consultar precio"
- Chrome Hearts no tiene precios -- "Consultar precio" para los 3
- La ruta de imágenes es relativa a `/public/` (ej: `/lote_1/IMG_2667.jpg`)
- Se mantiene todo el diseño editorial existente (parallax, gold lines, corner frames)

