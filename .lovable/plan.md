

## Plan: Correcciones de consistencia responsiva y rutas rotas

### Problemas encontrados

1. **Rutas rotas en Header y Footer**: El componente `Header.tsx` tiene links a `/simuladores` y `/sucursales`, pero esas rutas no existen — están bajo `/bazar/simuladores` y `/bazar/sucursales`. Lo mismo pasa en `Footer.tsx`. Esto causa 404 al navegar.

2. **Texto cortado en carrito vacío**: En móvil, el botón "AGREGA PRODUCTOS PARA CONTINUAR" se trunca horizontalmente en la página del carrito.

3. **Header.tsx ya no se usa**: El `Header.tsx` no es usado por ningún layout activo (BazarLayout y JoyeriaLayout tienen sus propios headers). Solo `Layout.tsx` lo usa, pero `Layout.tsx` no está en las rutas. Se puede limpiar o ignorar.

### Cambios a realizar

**1. Corregir links en `src/components/Footer.tsx`**
- Cambiar `/simuladores` → `/bazar/simuladores`
- Cambiar `/sucursales` → `/bazar/sucursales`

**2. Corregir links en `src/components/Header.tsx`**
- Cambiar `href: "/simuladores"` → `href: "/bazar/simuladores"`
- Cambiar `href: "/sucursales"` → `href: "/bazar/sucursales"`
- Cambiar los 2 botones de "Cotizar" que apuntan a `/simuladores` → `/bazar/simuladores`

**3. Arreglar texto truncado en `src/pages/Carrito.tsx`**
- Reducir el texto del botón vacío o hacerlo responsive (e.g. `text-xs sm:text-sm`) para que no se corte en pantallas de 390px.

### Archivos a modificar
- `src/components/Footer.tsx` — 2 links
- `src/components/Header.tsx` — 4 links
- `src/pages/Carrito.tsx` — texto del botón de carrito vacío

