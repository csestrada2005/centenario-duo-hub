import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface MetalRequest {
  type: "metal";
  metal: string; // Oro | Plata | Diamantes
  karat: string;
  weightGrams?: number;
}

interface PawnRequest {
  type: "pawn";
  articleType: string;
  brand: string;
  model?: string;
  condition: string;
}

type EstimateRequest = MetalRequest | PawnRequest;

async function queryPerplexity(prompt: string): Promise<string> {
  const apiKey = Deno.env.get("PERPLEXITY_API_KEY");
  if (!apiKey) throw new Error("PERPLEXITY_API_KEY is not configured");

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente de valuación. Responde SOLO con un JSON válido, sin markdown ni texto adicional. Si no encuentras un precio exacto, da tu mejor estimación basada en la información disponible.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "price_estimate",
          schema: {
            type: "object",
            properties: {
              price: {
                type: "number",
                description: "Precio en pesos mexicanos MXN",
              },
              source: {
                type: "string",
                description: "Fuente o referencia del precio",
              },
            },
            required: ["price", "source"],
          },
        },
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Perplexity API error [${res.status}]: ${errBody}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

function buildMetalPrompt(req: MetalRequest): string {
  if (req.metal === "Diamantes") {
    return `Precio actual de compra/venta de un diamante de ${req.karat} en pesos mexicanos MXN en el mercado mexicano. Responde con el precio promedio de venta al público.`;
  }
  return `Precio spot actual del ${req.metal} quilataje ${req.karat} por gramo en pesos mexicanos MXN. Busca el precio más reciente disponible hoy. Responde con el precio por gramo.`;
}

function buildPawnPrompt(req: PawnRequest): string {
  const modelStr = req.model ? ` modelo ${req.model}` : "";
  return `Precio de venta nuevo en tiendas de México de un ${req.articleType} marca ${req.brand}${modelStr} en pesos mexicanos MXN. Busca el precio promedio actual de venta al público en tiendas mexicanas como Amazon México, Mercado Libre, Liverpool, etc. Responde con el precio promedio.`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: EstimateRequest = await req.json();

    let prompt: string;
    let result: { low: number; high: number; spotPrice?: number; retailPrice?: number; source: string; date: string };

    if (body.type === "metal") {
      prompt = buildMetalPrompt(body);
      const raw = await queryPerplexity(prompt);
      const parsed = JSON.parse(raw);
      const spotPrice = parsed.price;

      if (body.metal === "Diamantes") {
        result = {
          low: Math.round(spotPrice * 0.78),
          high: Math.round(spotPrice * 0.88),
          spotPrice,
          source: parsed.source,
          date: new Date().toLocaleDateString("es-MX"),
        };
      } else {
        const w = body.weightGrams || 1;
        result = {
          low: Math.round(spotPrice * w * 0.78),
          high: Math.round(spotPrice * w * 0.88),
          spotPrice,
          source: parsed.source,
          date: new Date().toLocaleDateString("es-MX"),
        };
      }
    } else {
      prompt = buildPawnPrompt(body);
      const raw = await queryPerplexity(prompt);
      const parsed = JSON.parse(raw);
      const retailPrice = parsed.price;
      // Pawn value: ~70% of retail, with ±10% range
      const base = retailPrice * 0.7;
      result = {
        low: Math.round(base * 0.9),
        high: Math.round(base * 1.1),
        retailPrice,
        source: parsed.source,
        date: new Date().toLocaleDateString("es-MX"),
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("estimate-price error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
