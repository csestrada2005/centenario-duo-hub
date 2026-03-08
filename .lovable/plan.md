

# Bazar Centenario + Joyería Centenario — Plan de Implementación

## Sitemap Final

```
/                        → Home (selector de rutas)
/bazar                   → Ruta Bazar (servicios, confianza, FAQ)
/simuladores             → Simuladores (Empeño + Oro/Plata/Diamantes)
/sucursales              → Sucursales (listado, mapa, horarios)
/joyeria                 → Tienda Joyería (catálogo con filtros)
/joyeria/:id             → Ficha de producto
/joyeria/carrito         → Carrito de compras
/joyeria/checkout        → Checkout
```

---

## Componentes Globales

- **Header**: Logo "Centenario" a la izquierda. Navegación principal: Bazar | Simuladores | Sucursales | Joyería. Botón "Cotizar" destacado. Icono carrito (solo visible en ruta Joyería). Menú hamburguesa en mobile.
- **Footer**: Columnas: Bazar (enlaces), Joyería (enlaces), Contacto (teléfono, email, redes). Aviso legal, política de privacidad. Texto: "Bazar Centenario y Joyería Centenario son parte de la misma empresa."
- **Botón flotante WhatsApp**: Esquina inferior derecha, siempre visible.
- **CTA sticky mobile**: Barra inferior fija en páginas Bazar/Simuladores con "Cotizar" + "WhatsApp".

---

## 1. Home — Estructura por secciones

1. **Hero principal**: Frase: "Casa de empeño y compra de oro, plata y diamantes" + "Tienda premium de joyería". Dos botones grandes: "Entrar a Bazar" / "Entrar a Joyería". CTA destacado: "Cotizar ahora". Chips de acceso rápido: Sucursales · WhatsApp · Catálogo.

2. **Dos mundos, una marca**: Dos cards lado a lado. Card Bazar: icono, texto breve "Empeña o vende tus artículos y metales preciosos", botón "Conocer Bazar". Card Joyería: icono, texto breve "Encuentra piezas únicas con garantía", botón "Ver catálogo".

3. **Simulador destacado**: Banner con texto "Obtén una estimación en menos de 2 minutos" + botón "Simular ahora".

4. **Confianza / Cifras**: Tres indicadores: años de experiencia, sucursales, clientes atendidos.

5. **Sucursales preview**: Mapa simplificado o listado de 3 sucursales principales con botón "Ver todas".

---

## 2. Página Bazar — Estructura

1. **Hero Bazar**: Título "Bazar Centenario". Subtítulo: "Empeña tus artículos o vende tu oro, plata y diamantes. Sin complicaciones." CTA: "Cotizar ahora" + "Ver sucursales".

2. **Cómo funciona**: 3 pasos visuales (iconos + texto corto): Trae tu artículo → Valuación gratuita → Recibe tu dinero.

3. **Servicios en cards**:
   - Card "Empeño de artículos": electrónicos, herramienta, autos, electrodomésticos, oro/plata. CTA: "Simular empeño".
   - Card "Compra de oro, plata y diamantes": descripción breve. CTA: "Simular cotización".

4. **Sección Simula fácil**: Iconos de categorías (celular, laptop, auto, anillo, etc.) que llevan directo al simulador correspondiente.

5. **Nosotros / Confianza**: Texto breve sobre profesionalismo, seguridad, sin juicios. "Tu tranquilidad es nuestra prioridad."

6. **Preguntas rápidas (FAQ)**: Acordeón con 6-8 preguntas típicas (requisitos, plazos, tasas, qué artículos aceptan).

7. **CTA final**: "Visítanos en sucursal" + "Escríbenos por WhatsApp".

---

## 3. Simuladores — Estructura

Página con tabs: **Empeño** | **Oro / Plata / Diamantes**

### Simulador de Empeño (4 steps)

- **Step 1 — Tipo de artículo**: Grid de cards con iconos: Celular, Laptop, Herramienta, Electrodoméstico, Auto, Otro.
- **Step 2 — Datos básicos**: Formulario: marca (select), modelo (input opcional), estado (excelente/bueno/regular), valor aproximado de compra (input numérico).
- **Step 3 — Resultado estimado**: Card con rango estimado ("$X,XXX — $X,XXX"). Disclaimer: "Esta cifra es solo una estimación. La valuación final se realiza en sucursal."
- **Step 4 — Siguiente paso**: CTA: "Visita tu sucursal más cercana" + botón WhatsApp + botón Sucursales.

### Simulador de Metales Preciosos (4 steps)

- **Step 1 — Tipo de metal**: Cards: Oro / Plata / Diamantes.
- **Step 2 — Detalles**: Peso en gramos (input + guía visual con ejemplos), quilataje (select con opciones comunes: 10k, 14k, 18k, 24k para oro; 925 para plata).
- **Step 3 — Resultado estimado**: Card con rango. Disclaimer igual.
- **Step 4 — Siguiente paso**: CTA WhatsApp + Sucursal.

Barra de progreso visible en ambos simuladores. Botón "Atrás" en cada step.

---

## 4. Sucursales — Estructura

1. **Título**: "Nuestras sucursales"
2. **Listado de sucursales**: Cards con: nombre, dirección, horarios, teléfono, botón "Cómo llegar" (abre Google Maps), botón "WhatsApp".
3. **Mapa embebido**: Google Maps con pins de todas las sucursales.
4. **Filtro por ciudad/zona** (si aplica).

---

## 5. Ruta Joyería — Estructura

### Catálogo (`/joyeria`)
- Header de sección con texto: "Joyería Centenario — Piezas con garantía y diseño premium."
- **Filtros**: Desktop: sidebar izquierdo (categoría, material, precio, disponibilidad). Mobile: botón "Filtrar" que abre drawer.
- **Grid de productos**: Cards con imagen, nombre, precio, botón "Ver detalle".
- Paginación o scroll infinito.

### Ficha de producto (`/joyeria/:id`)
- Galería de fotos (carousel).
- Nombre, precio, descripción, medidas, material, garantía.
- Selector de variantes si aplica (talla, color).
- Botón "Agregar al carrito".
- Sección "También te puede interesar".

### Carrito (`/joyeria/carrito`)
- Lista de productos con cantidad, precio unitario, subtotal.
- Botón eliminar / actualizar cantidad.
- Resumen: subtotal, envío, total.
- Botón "Proceder al pago".

### Checkout (`/joyeria/checkout`)
- Formulario: datos de envío, método de pago (integrado con Shopify Checkout).
- Resumen del pedido.
- Botón "Confirmar pedido".

**Integración Shopify**: Se habilitará Shopify como backend para gestionar productos, inventario, pedidos y pagos. La web se construye en Lovable y se conecta a Shopify vía API. Esto requiere activar la integración de Shopify en el proyecto.

---

## Diseño y UI

- **Paleta**: Fondo blanco (#FFFFFF), gris claro (#F5F5F5) para secciones alternas, negro (#1A1A1A) para texto, acento metálico/azul tenue (#6B7B8D) para botones y detalles.
- **Tipografía**: Sans-serif moderna (Inter o similar). Headings en bold/semibold.
- **Espaciado**: Generoso, secciones bien separadas, cards con padding amplio.
- **Animaciones**: Fade-in al hacer scroll, hover suave en cards y botones. Sin exceso.
- **Mobile-first**: Todo responsive. Navegación hamburguesa. Filtros en drawer. CTAs sticky en la parte inferior.

---

## Copys Placeholder (títulos y CTAs)

| Ubicación | Copy |
|---|---|
| Hero Home título | "Casa de empeño y compra de oro, plata y diamantes" |
| Hero Home subtítulo | "Tienda premium de joyería" |
| Botón Bazar | "Entrar a Bazar" |
| Botón Joyería | "Entrar a Joyería" |
| CTA principal | "Cotizar ahora" |
| Chip sucursales | "Sucursales" |
| Chip WhatsApp | "WhatsApp" |
| Chip catálogo | "Catálogo" |
| Card Bazar | "Empeña o vende tus artículos y metales preciosos" |
| Card Joyería | "Encuentra piezas únicas con garantía" |
| Simulador banner | "Obtén una estimación en menos de 2 minutos" |
| Bazar hero | "Empeña tus artículos o vende tu oro, plata y diamantes. Sin complicaciones." |
| Paso 1 Bazar | "Trae tu artículo" |
| Paso 2 Bazar | "Valuación gratuita" |
| Paso 3 Bazar | "Recibe tu dinero" |
| Confianza | "Tu tranquilidad es nuestra prioridad" |
| Disclaimer simulador | "Esta cifra es solo una estimación. La valuación final se realiza en sucursal." |
| Joyería header | "Piezas con garantía y diseño premium" |
| CTA sucursal | "Visita tu sucursal más cercana" |
| CTA WhatsApp | "Escríbenos por WhatsApp" |

