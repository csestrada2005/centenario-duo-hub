

## Plan: Agregar botón "Añadir al carrito" + WhatsApp con detalle de productos

### Resumen

Agregar un botón "Añadir al carrito" en cada página de producto, además del botón "Comprar" existente. El carrito acumula productos y al hacer clic en "Comprar" en la página del carrito, envía un mensaje de WhatsApp con los detalles completos de todos los productos (nombre, quilataje, talla/largo, categoría).

### Cambios

**1. Actualizar `CartContext` — agregar campos de detalle al `CartItem`**

Extender la interfaz `CartItem` para incluir `karat`, `size`, `category` y `brand` (opcionales), de modo que el mensaje de WhatsApp pueda listar los detalles de cada producto.

**2. Actualizar `ProductDetail.tsx` — agregar botón "Añadir al carrito"**

- Importar `useCart` y agregar un botón secundario "Añadir al carrito" junto al botón "Comprar" existente
- El botón "Comprar" sigue abriendo WhatsApp directo para ese producto (comportamiento actual)
- El botón "Añadir al carrito" usa `addItem` del contexto, pasando nombre, precio, karat, size, category
- Feedback visual al agregar (check icon momentáneo)

**3. Actualizar `Carrito.tsx` — mensaje de WhatsApp con detalles completos**

Modificar `handleComprar` para que el mensaje incluya los detalles de cada producto:
```
Hola, estoy interesado en:
• Cadena Cartier 10K — 10K, 60cm, Cadenas (x1)
• Dije Cruz 14K — 14K, Dijes (x1)
• Rolex Submariner — Relojes (x1)
```

**4. Sin cambios en layout ni navegación** — el carrito ya existe en la nav y el header con su ícono animado.

