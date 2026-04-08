

## Plan: Actualizar FAQ de plazos de pago y asegurar imágenes

### Cambios

**1. Actualizar respuesta de "¿Cuánto tiempo tengo para pagar?" en `src/pages/Bazar.tsx`**

Reemplazar la respuesta genérica de "30 días" con la política real detallada:

- **Joyería**: Plazo de 2 meses. El primer mes se divide en semanas: semana 1 pagas 3%, semana 2 el 6%, semana 3 el 9%, semana 4 el 12%. Si te extiendes al segundo mes, pagarías el 24%.
- **Artículos**: Plazo de 1 mes con 12% de interés mensual.

La respuesta se formateará de forma clara y legible dentro del acordeón.

**2. Agregar manejo de imágenes rotas en `src/pages/JoyeriaHome.tsx` y `src/pages/Index.tsx`**

Añadir un `onError` handler en las etiquetas `<img>` de productos para que si una imagen falla, muestre un fondo gris con un ícono en lugar de la imagen rota. Esto previene los broken image icons que se ven en los screenshots.

### Archivos a modificar
- `src/pages/Bazar.tsx` — línea 333, actualizar la respuesta del FAQ
- `src/pages/JoyeriaHome.tsx` — agregar `onError` fallback en imágenes de productos
- `src/pages/Index.tsx` — agregar `onError` fallback en imágenes de galería

