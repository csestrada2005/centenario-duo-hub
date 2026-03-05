import { useState } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroHome from "@/assets/hero-home.jpg";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const marcasReloj = ["Todos", "Rolex", "Audemars Piguet", "Patek Philippe", "Hublot", "Cartier", "Omega"];
const materialesCaja = ["Todos", "Acero", "Oro amarillo", "Oro rosado", "Platino", "Titanio"];

const mockRelojes = [
  {
    id: "reloj-1",
    nombre: "Rolex Submariner Date",
    marca: "Rolex",
    referencia: "126610LN",
    precio: 285000,
    descripcion: "El icónico reloj de buceo con bisel giratorio unidireccional y cristal de zafiro.",
    img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=750&fit=crop",
    specs: {
      marca: "Rolex", modelo: "Submariner Date", referencia: "126610LN",
      materialCaja: "Acero Oystersteel", materialCorrea: "Acero Oystersteel",
      diametro: "41 mm", movimiento: "Automático Cal. 3235",
      resistenciaAgua: "300 m", garantia: "5 años",
    },
  },
  {
    id: "reloj-2",
    nombre: "Audemars Piguet Royal Oak",
    marca: "Audemars Piguet",
    referencia: "15500ST.OO.1220ST.01",
    precio: 520000,
    descripcion: "Diseño octagonal emblemático con bisel de tornillos visibles y acabado satinado.",
    img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=750&fit=crop",
    specs: {
      marca: "Audemars Piguet", modelo: "Royal Oak", referencia: "15500ST.OO.1220ST.01",
      materialCaja: "Acero", materialCorrea: "Acero",
      diametro: "41 mm", movimiento: "Automático Cal. 4302",
      resistenciaAgua: "50 m", garantia: "5 años",
    },
  },
  {
    id: "reloj-3",
    nombre: "Patek Philippe Nautilus",
    marca: "Patek Philippe",
    referencia: "5711/1A-010",
    precio: 980000,
    descripcion: "El legendario reloj deportivo de lujo con esfera azul degradada y caja de acero.",
    img: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&h=750&fit=crop",
    specs: {
      marca: "Patek Philippe", modelo: "Nautilus", referencia: "5711/1A-010",
      materialCaja: "Acero", materialCorrea: "Acero",
      diametro: "40 mm", movimiento: "Automático Cal. 26‑330 S C",
      resistenciaAgua: "120 m", garantia: "2 años",
    },
  },
  {
    id: "reloj-4",
    nombre: "Hublot Big Bang Unico",
    marca: "Hublot",
    referencia: "421.OX.1180.RX",
    precio: 450000,
    descripcion: "Fusión de materiales innovadores con un cronógrafo flyback de manufactura propia.",
    img: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&h=750&fit=crop",
    specs: {
      marca: "Hublot", modelo: "Big Bang Unico", referencia: "421.OX.1180.RX",
      materialCaja: "Oro rosado", materialCorrea: "Caucho",
      diametro: "44 mm", movimiento: "Automático UNICO HUB1280",
      resistenciaAgua: "100 m", garantia: "5 años",
    },
  },
  {
    id: "reloj-5",
    nombre: "Cartier Santos de Cartier",
    marca: "Cartier",
    referencia: "WSSA0018",
    precio: 195000,
    descripcion: "El primer reloj de pulsera de la historia, reinventado con sistema QuickSwitch.",
    img: "https://images.unsplash.com/photo-1639037687665-4e0cab0f2780?w=600&h=750&fit=crop",
    specs: {
      marca: "Cartier", modelo: "Santos de Cartier", referencia: "WSSA0018",
      materialCaja: "Acero", materialCorrea: "Acero",
      diametro: "39.8 mm", movimiento: "Automático Cal. 1847 MC",
      resistenciaAgua: "100 m", garantia: "8 años",
    },
  },
  {
    id: "reloj-6",
    nombre: "Omega Speedmaster Moonwatch",
    marca: "Omega",
    referencia: "310.30.42.50.01.002",
    precio: 165000,
    descripcion: "El reloj que llegó a la luna. Cronógrafo manual con calibre Co-Axial Master Chronometer.",
    img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=750&fit=crop",
    specs: {
      marca: "Omega", modelo: "Speedmaster Moonwatch", referencia: "310.30.42.50.01.002",
      materialCaja: "Acero", materialCorrea: "Acero",
      diametro: "42 mm", movimiento: "Manual Cal. 3861",
      resistenciaAgua: "50 m", garantia: "5 años",
    },
  },
];

const specLabels: { key: keyof typeof mockRelojes[0]["specs"]; label: string }[] = [
  { key: "marca", label: "Marca" },
  { key: "modelo", label: "Modelo" },
  { key: "referencia", label: "Referencia" },
  { key: "materialCaja", label: "Material caja" },
  { key: "materialCorrea", label: "Material correa" },
  { key: "diametro", label: "Diámetro" },
  { key: "movimiento", label: "Movimiento" },
  { key: "resistenciaAgua", label: "Resistencia al agua" },
  { key: "garantia", label: "Garantía" },
];

// ─────────────────────────────────────────────────────────────
// FILTER PANEL
// ─────────────────────────────────────────────────────────────
const FilterPanel = ({
  marca, setMarca, materialCaja, setMaterialCaja,
}: {
  marca: string; setMarca: (v: string) => void;
  materialCaja: string; setMaterialCaja: (v: string) => void;
}) => (
  <div className="space-y-6">
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Marca</label>
      <Select value={marca} onValueChange={setMarca}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{marcasReloj.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
      </Select>
    </div>
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Material caja</label>
      <Select value={materialCaja} onValueChange={setMaterialCaja}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{materialesCaja.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// WATCH CARD
// ─────────────────────────────────────────────────────────────
const WatchCard = ({ reloj }: { reloj: typeof mockRelojes[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const whatsappMsg = encodeURIComponent(`Hola, me interesa el reloj ${reloj.nombre} (Ref. ${reloj.referencia}). ¿Me pueden dar más información?`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={reloj.img}
          alt={reloj.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">{reloj.marca}</p>
        <h3
          className="text-lg font-normal text-foreground"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {reloj.nombre}
        </h3>
        <p className="text-[11px] text-muted-foreground">Ref. {reloj.referencia}</p>
        <p className="text-sm font-medium">${reloj.precio.toLocaleString()} MXN</p>
        <p className="text-xs leading-relaxed text-muted-foreground">{reloj.descripcion}</p>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-col gap-2">
        <Button asChild variant="editorial" size="sm" className="w-full">
          <a
            href={`https://wa.me/5212213497090?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar información
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </a>
        </Button>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {expanded ? "Ocultar especificaciones" : "Ver especificaciones"}
        </button>
      </div>

      {/* Specs table */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px] uppercase tracking-[0.1em]">Característica</TableHead>
                <TableHead className="text-[10px] uppercase tracking-[0.1em]">Detalle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specLabels.map(({ key, label }) => (
                <TableRow key={key}>
                  <TableCell className="py-2 text-xs font-medium">{label}</TableCell>
                  <TableCell className="py-2 text-xs text-muted-foreground">{reloj.specs[key] || "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
const Relojes = () => {
  const [marca, setMarca] = useState("Todos");
  const [materialCaja, setMaterialCaja] = useState("Todos");

  const filtered = mockRelojes.filter(
    (r) =>
      (marca === "Todos" || r.marca === marca) &&
      (materialCaja === "Todos" || r.specs.materialCaja.toLowerCase().includes(materialCaja.toLowerCase()))
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* ══ HERO ══ */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img src={heroHome} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/50 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-[10px] font-medium uppercase tracking-[0.4em]"
              style={{ color: "hsl(var(--gold))" }}
            >
              Colección exclusiva
            </span>
            <h1
              className="mt-3 text-4xl font-normal leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Relojes de Lujo
            </h1>
            <p className="mt-4 max-w-md text-sm font-light text-muted-foreground">
              Piezas que definen el tiempo.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0, background: "hsl(var(--gold))" }}
          className="absolute bottom-0 left-0 right-0 h-px"
        />
      </section>

      {/* ══ FILTER BAR ══ */}
      <div className="flex items-center justify-between px-6 py-5 md:px-16">
        <div className="hidden gap-8 md:flex">
          <FilterPanel marca={marca} setMarca={setMarca} materialCaja={materialCaja} setMaterialCaja={setMaterialCaja} />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
                <SlidersHorizontal className="h-4 w-4" /> Filtrar
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-background">
              <h3 className="mb-6 text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Filtros</h3>
              <FilterPanel marca={marca} setMarca={setMarca} materialCaja={materialCaja} setMaterialCaja={setMaterialCaja} />
            </SheetContent>
          </Sheet>
        </div>
        <p className="text-xs text-muted-foreground">{filtered.length} relojes</p>
      </div>

      {/* ══ GRID ══ */}
      <div className="px-6 pb-24 md:px-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <WatchCard key={r.id} reloj={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-32 text-center">
            <p className="text-sm text-muted-foreground">No se encontraron relojes con estos filtros.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Relojes;
