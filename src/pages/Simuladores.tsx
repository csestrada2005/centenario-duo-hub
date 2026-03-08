import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Smartphone, Laptop, Wrench, Car, Tv, HelpCircle,
  ArrowLeft, ArrowRight, MapPin, MessageCircle, Gem, CircleDot, Loader2,
} from "lucide-react";
import { estimateMetalPrice, estimatePawnValue, type MetalEstimate, type PawnEstimate } from "@/lib/api/estimates";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ---------- Empeño Simulator ---------- */
const articleTypes = [
  { icon: Smartphone, label: "Celular" },
  { icon: Laptop, label: "Laptop" },
  { icon: Wrench, label: "Herramienta" },
  { icon: Tv, label: "Electrodoméstico" },
  { icon: Car, label: "Auto" },
  { icon: HelpCircle, label: "Otro" },
];

const brands: Record<string, string[]> = {
  Celular: ["Apple", "Samsung", "Xiaomi", "Motorola", "Otro"],
  Laptop: ["Apple", "Dell", "HP", "Lenovo", "Otro"],
  Herramienta: ["DeWalt", "Makita", "Bosch", "Otro"],
  Electrodoméstico: ["LG", "Samsung", "Whirlpool", "Otro"],
  Auto: ["Toyota", "Nissan", "Honda", "Volkswagen", "Otro"],
  Otro: ["Otro"],
};

// Fallback estimates when API fails
function fallbackPawnEstimate(value: number) {
  const low = Math.round(value * 0.3);
  const high = Math.round(value * 0.6);
  return { low, high };
}

const EmpenyoSim = () => {
  const [step, setStep] = useState(1);
  const [articleType, setArticleType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<PawnEstimate | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const handleEstimate = async () => {
    setLoading(true);
    setStep(3);
    setUsedFallback(false);
    try {
      const result = await estimatePawnValue(articleType, brand, model, condition);
      setEstimate(result);
    } catch (err) {
      console.error("Pawn estimate failed, using fallback:", err);
      setUsedFallback(true);
      // No fallback without user value — show error state
      setEstimate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Progress value={(step / 4) * 100} className="mb-10 h-[2px]" />

      {step === 1 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h3 className="mb-8 text-center text-lg font-light uppercase tracking-[0.1em]">¿Qué tipo de artículo deseas empeñar?</h3>
          <div className="mx-auto grid max-w-md grid-cols-2 gap-4 sm:grid-cols-3">
            {articleTypes.map((t) => (
              <button
                key={t.label}
                onClick={() => { setArticleType(t.label); setStep(2); }}
                className={`group flex flex-col items-center gap-3 py-6 transition-colors hover:text-primary ${articleType === t.label ? "text-primary" : "text-muted-foreground"}`}
              >
                <t.icon className="h-7 w-7" strokeWidth={1} />
                <span className="text-xs font-medium uppercase tracking-[0.1em]">{t.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-md space-y-5">
          <h3 className="mb-6 text-center text-lg font-light uppercase tracking-[0.1em]">Datos del artículo</h3>
          <Select onValueChange={setBrand}>
            <SelectTrigger><SelectValue placeholder="Marca" /></SelectTrigger>
            <SelectContent>
              {(brands[articleType] || brands.Otro).map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Modelo (opcional)" value={model} onChange={(e) => setModel(e.target.value)} />
          <Select onValueChange={setCondition}>
            <SelectTrigger><SelectValue placeholder="Estado" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="excelente">Excelente</SelectItem>
              <SelectItem value="bueno">Bueno</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-3 pt-4">
            <Button variant="goldOutline" onClick={() => setStep(1)} className="group">
              <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1" /> Atrás
            </Button>
            <Button variant="gold" className="group flex-1" disabled={!brand || !condition} onClick={handleEstimate}>
              Cotizar con IA <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-md text-center">
          <h3 className="mb-8 text-lg font-light uppercase tracking-[0.1em]">Estimación de empeño</h3>

          {loading ? (
            <div className="py-10 space-y-4">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Buscando precio de mercado…</p>
              <div className="mx-auto max-w-xs space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </div>
          ) : estimate ? (
            <>
              <div className="py-10">
                <p className="text-gold-gradient text-4xl font-light md:text-5xl">
                  ${estimate.low.toLocaleString()} — ${estimate.high.toLocaleString()}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">MXN</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Precio de referencia: ${estimate.retailPrice.toLocaleString()} MXN (nuevo)
                </p>
                {estimate.source && (
                  <p className="mt-1 text-[10px] text-muted-foreground/60">Fuente: {estimate.source}</p>
                )}
              </div>
              <p className="text-xs font-light text-muted-foreground">
                Esta cifra es solo una estimación basada en IA. La valuación final se realiza en sucursal.
              </p>
            </>
          ) : (
            <div className="py-10">
              <p className="text-sm text-muted-foreground">
                No pudimos obtener una estimación en este momento. Visita tu sucursal para una valuación presencial.
              </p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Button variant="goldOutline" onClick={() => setStep(2)} className="group">
              <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1" /> Atrás
            </Button>
            <Button variant="gold" className="group flex-1" disabled={loading || !estimate} onClick={() => setStep(4)}>
              Siguiente <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-md text-center">
          <h3 className="mb-6 text-lg font-light uppercase tracking-[0.1em]">¿Listo para continuar?</h3>
          <p className="text-sm font-light text-muted-foreground">Visita tu sucursal más cercana para la valuación final.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="gold" className="group">
              <Link to="/bazar/sucursales"><MapPin className="mr-2 h-4 w-4 group-hover:scale-110" /> Sucursales</Link>
            </Button>
            <Button variant="goldOutline" asChild className="group">
              <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110" /> WhatsApp
              </a>
            </Button>
          </div>
          <button
            className="mt-6 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-primary"
            onClick={() => { setStep(1); setArticleType(""); setBrand(""); setModel(""); setCondition(""); setEstimate(null); }}
          >
            Simular otro artículo
          </button>
        </motion.div>
      )}
    </div>
  );
};

/* ---------- Metales Simulator ---------- */
const metalTypes = [
  { icon: CircleDot, label: "Oro", color: "text-primary" },
  { icon: CircleDot, label: "Plata", color: "text-muted-foreground" },
  { icon: Gem, label: "Diamantes", color: "text-foreground" },
];

const karatOptions: Record<string, string[]> = {
  Oro: ["8k (33%)", "9k (38%)", "10k (42%)", "12k (50%)", "14k (58%)", "18k (75%)", "21.6k (90%)", "22k (92%)", "24k (99.9%)"],
  Plata: ["925", "950", "999"],
  Diamantes: ["0.25ct", "0.5ct", "1ct", "2ct+"],
};

// Fallback spot prices (Feb 2026) used when API fails
const fallbackSpotPricePerGram: Record<string, Record<string, number>> = {
  Oro: {
    "8k (33%)": 912.98, "9k (38%)": 1051.31, "10k (42%)": 1161.97,
    "12k (50%)": 1383.30, "14k (58%)": 1604.63, "18k (75%)": 2074.95,
    "21.6k (90%)": 2489.95, "22k (92%)": 2545.28, "24k (99.9%)": 2766.61,
  },
  Plata: { "925": 12.5, "950": 13.2, "999": 14.0 },
  Diamantes: { "0.25ct": 4500, "0.5ct": 10000, "1ct": 25000, "2ct+": 60000 },
};

const BUY_RATIO_LOW = 0.78;
const BUY_RATIO_HIGH = 0.88;

const MetalesSim = () => {
  const [step, setStep] = useState(1);
  const [metalType, setMetalType] = useState("");
  const [weight, setWeight] = useState("");
  const [karat, setKarat] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<MetalEstimate | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);

  const isDiamond = metalType === "Diamantes";

  const handleEstimate = async () => {
    setLoading(true);
    setStep(3);
    setUsedFallback(false);
    try {
      const result = await estimateMetalPrice(metalType, karat, isDiamond ? undefined : Number(weight));
      setEstimate(result);
    } catch (err) {
      console.error("Metal estimate failed, using fallback:", err);
      setUsedFallback(true);
      // Use fallback data
      const spotBase = fallbackSpotPricePerGram[metalType]?.[karat] || 0;
      const w = Number(weight) || 1;
      const low = isDiamond ? Math.round(spotBase * BUY_RATIO_LOW) : Math.round(spotBase * w * BUY_RATIO_LOW);
      const high = isDiamond ? Math.round(spotBase * BUY_RATIO_HIGH) : Math.round(spotBase * w * BUY_RATIO_HIGH);
      setEstimate({
        low,
        high,
        spotPrice: spotBase,
        source: "Datos de referencia (Feb 2026)",
        date: "Feb 2026",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Progress value={(step / 4) * 100} className="mb-10 h-[2px]" />

      {step === 1 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <h3 className="mb-8 text-center text-lg font-light uppercase tracking-[0.1em]">¿Qué tipo de metal deseas cotizar?</h3>
          <div className="mx-auto grid max-w-sm grid-cols-3 gap-4">
            {metalTypes.map((m) => (
              <button
                key={m.label}
                onClick={() => { setMetalType(m.label); setStep(2); }}
                className={`group flex flex-col items-center gap-3 py-6 transition-colors hover:text-primary ${metalType === m.label ? "text-primary" : "text-muted-foreground"}`}
              >
                <m.icon className="h-7 w-7" strokeWidth={1} />
                <span className="text-xs font-medium uppercase tracking-[0.1em]">{m.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-md space-y-5">
          <h3 className="mb-6 text-center text-lg font-light uppercase tracking-[0.1em]">Detalles</h3>
          {!isDiamond && (
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-[0.1em]">Peso en gramos</label>
              <Input type="number" placeholder="Ej: 15" value={weight} onChange={(e) => setWeight(e.target.value)} />
              <p className="mt-1 text-xs font-light text-muted-foreground">Referencia: un anillo pesa ~3-8g, una cadena ~15-40g</p>
            </div>
          )}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-[0.1em]">{isDiamond ? "Tamaño aproximado" : "Quilataje"}</label>
            <Select onValueChange={setKarat}>
              <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
              <SelectContent>
                {(karatOptions[metalType] || []).map((k) => (
                  <SelectItem key={k} value={k}>{k}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="goldOutline" onClick={() => setStep(1)} className="group">
              <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1" /> Atrás
            </Button>
            <Button variant="gold" className="group flex-1" disabled={!karat || (!isDiamond && !weight)} onClick={handleEstimate}>
              Cotizar con IA <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-md text-center">
          <h3 className="mb-8 text-lg font-light uppercase tracking-[0.1em]">Estimación de cotización</h3>

          {loading ? (
            <div className="py-10 space-y-4">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Consultando precio de mercado…</p>
              <div className="mx-auto max-w-xs space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            </div>
          ) : estimate ? (
            <>
              {/* Spot price badge */}
              {metalType === "Oro" && karat && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-muted-foreground">
                  <span className={`h-1.5 w-1.5 rounded-full inline-block ${usedFallback ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`} />
                  {usedFallback ? "Precio referencia" : "Precio en vivo"}: {karat} ${estimate.spotPrice?.toLocaleString("es-MX", { maximumFractionDigits: 2 })} MXN/g — {estimate.date}
                </div>
              )}
              <div className="py-8">
                <p className="text-gold-gradient text-4xl font-light md:text-5xl">
                  ${estimate.low.toLocaleString()} — ${estimate.high.toLocaleString()}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">MXN</p>
                {!isDiamond && Number(weight) > 0 && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Basado en {weight}g × {karat} al {Math.round(BUY_RATIO_LOW * 100)}–{Math.round(BUY_RATIO_HIGH * 100)}% del precio spot
                  </p>
                )}
                {estimate.source && (
                  <p className="mt-1 text-[10px] text-muted-foreground/60">Fuente: {estimate.source}</p>
                )}
              </div>
              <p className="text-xs font-light text-muted-foreground">
                Esta cifra es solo una estimación{!usedFallback ? " basada en IA" : ""}. La valuación final se realiza en sucursal.
              </p>
            </>
          ) : null}

          <div className="mt-8 flex gap-3">
            <Button variant="goldOutline" onClick={() => setStep(2)} className="group">
              <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1" /> Atrás
            </Button>
            <Button variant="gold" className="group flex-1" disabled={loading} onClick={() => setStep(4)}>
              Siguiente <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-md text-center">
          <h3 className="mb-6 text-lg font-light uppercase tracking-[0.1em]">¿Listo para continuar?</h3>
          <p className="text-sm font-light text-muted-foreground">Visítanos para una valuación profesional.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="gold" className="group">
              <Link to="/bazar/sucursales"><MapPin className="mr-2 h-4 w-4 group-hover:scale-110" /> Sucursales</Link>
            </Button>
            <Button variant="goldOutline" asChild className="group">
              <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110" /> WhatsApp
              </a>
            </Button>
          </div>
          <button
            className="mt-6 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-primary"
            onClick={() => { setStep(1); setMetalType(""); setWeight(""); setKarat(""); setEstimate(null); }}
          >
            Simular otra cotización
          </button>
        </motion.div>
      )}
    </div>
  );
};

/* ---------- Page ---------- */
const Simuladores = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") === "metales" ? "metales" : "empeno";

  return (
    <div className="px-6 py-20 md:px-10">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-light uppercase tracking-[0.1em] md:text-5xl">Simuladores</h1>
        <p className="mt-4 text-sm font-light text-muted-foreground">Obtén una estimación en menos de 2 minutos</p>
      </motion.div>

      <div className="mx-auto mt-14 max-w-2xl">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="empeno">Empeño</TabsTrigger>
            <TabsTrigger value="metales">Oro / Plata / Diamantes</TabsTrigger>
          </TabsList>
          <TabsContent value="empeno" className="mt-10">
            <EmpenyoSim />
          </TabsContent>
          <TabsContent value="metales" className="mt-10">
            <MetalesSim />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Simuladores;
