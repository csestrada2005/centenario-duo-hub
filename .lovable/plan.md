

## Objetivo

Reemplazar los precios hardcodeados en ambos simuladores con datos en tiempo real:
- **Metales (Oro/Plata/Diamantes)**: Obtener precio spot actual
- **Empeño**: Buscar precio de venta online del artículo y calcular el 70% como valor de compra

## Enfoque recomendado: Perplexity AI (búsqueda con IA)

Perplexity es la mejor opción porque resuelve ambos casos con una sola integración:
- Busca precios actuales de metales preciosos en MXN
- Busca el precio de venta de cualquier artículo (celular, laptop, etc.) en tiendas mexicanas
- Devuelve respuestas estructuradas con fuentes

Alternativa para metales: una API dedicada como GoldAPI o Metals.dev (más precisa para spot prices, pero no resuelve el caso de empeño).

**Perplexity cubre ambos simuladores** con una sola conexión y edge function.

## Requisitos previos

1. **Habilitar Lovable Cloud** (necesario para edge functions)
2. **Conectar Perplexity** como conector (proporciona `PERPLEXITY_API_KEY` automáticamente)

## Arquitectura

```text
[Usuario llena formulario] 
       ↓
[Frontend envía datos del artículo/metal]
       ↓
[Edge Function "estimate-price"]
       ↓
[Perplexity API - búsqueda inteligente]
       ↓
[Respuesta estructurada con precio estimado]
       ↓
[Frontend muestra rango al usuario]
```

## Cambios a implementar

### 1. Edge Function: `supabase/functions/estimate-price/index.ts`

Recibe dos tipos de peticiones:

**Tipo "metal"**: Envía a Perplexity un prompt como:
> "Precio spot actual del oro {quilataje} por gramo en pesos mexicanos MXN. Solo responde con el número."

Calcula rango: `precio × gramos × 0.78` a `precio × gramos × 0.88`

**Tipo "empeño"**: Envía a Perplexity:
> "Precio de venta nuevo en México de {tipo} {marca} {modelo} en pesos mexicanos. Solo responde con el precio promedio."

Calcula: `precio × 0.70` como valor de compra (con rango ±10%)

Usa structured output (JSON schema) de Perplexity para obtener el número limpiamente.

### 2. Frontend: `src/pages/Simuladores.tsx`

- **EmpenyoSim**: En el paso 3, en vez de calcular localmente con `estimateRange()`, llama a la edge function con los datos del artículo. Muestra un skeleton/spinner mientras carga.
- **MetalesSim**: En el paso 3, llama a la edge function para obtener el precio spot actual. Muestra la fecha real de consulta.
- Ambos mantienen los precios hardcodeados como **fallback** si la API falla.
- Eliminar el campo "Valor aproximado de compra" del empeño (ya no es necesario, la IA lo busca).

### 3. API helper: `src/lib/api/estimates.ts`

Función utilitaria para llamar a la edge function desde el frontend:
```
estimateMetalPrice(metal, karat, weightGrams) → { low, high, spotPrice, source }
estimatePawnValue(type, brand, model, condition) → { low, high, retailPrice, source }
```

### 4. Supabase client: `src/integrations/supabase/client.ts`

Configurar el cliente de Supabase para poder usar `supabase.functions.invoke()`.

## Experiencia del usuario

- El usuario llena el formulario igual que antes
- Al dar "Continuar" en el paso 2, ve un loading de 2-3 segundos
- Recibe un estimado basado en datos reales con la fuente citada
- Si la API falla, ve el estimado con datos de respaldo (los precios actuales hardcodeados)

## Consideraciones

- **Rate limits**: Perplexity tiene límites por minuto. El uso esperado (simulaciones esporádicas) no debería ser problema.
- **Costo**: Cada consulta usa créditos de Perplexity. El modelo `sonar` es el más económico y suficiente para esto.
- **Latencia**: ~2-4 segundos por consulta. Aceptable con un buen loading state.

