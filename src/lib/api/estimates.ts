import { supabase } from "@/integrations/supabase/client";

export interface MetalEstimate {
  low: number;
  high: number;
  spotPrice: number;
  source: string;
  date: string;
}

export interface PawnEstimate {
  low: number;
  high: number;
  retailPrice: number;
  source: string;
  date: string;
}

export async function estimateMetalPrice(
  metal: string,
  karat: string,
  weightGrams?: number
): Promise<MetalEstimate> {
  const { data, error } = await supabase.functions.invoke("estimate-price", {
    body: { type: "metal", metal, karat, weightGrams },
  });

  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as MetalEstimate;
}

export async function estimatePawnValue(
  articleType: string,
  brand: string,
  model: string,
  condition: string
): Promise<PawnEstimate> {
  const { data, error } = await supabase.functions.invoke("estimate-price", {
    body: { type: "pawn", articleType, brand, model, condition },
  });

  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as PawnEstimate;
}
