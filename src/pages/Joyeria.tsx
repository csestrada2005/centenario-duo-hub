import { useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, ArrowRight, Watch, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import heroHome from "@/assets/hero-home.jpg";
import { products, allCategories, allBrands, watchBrands, type Product } from "@/data/products";

const ITEMS_PER_PAGE = 24;

// ─────────────────────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────────────────────

const GoldLine = ({ className = "", vertical = false }: { className?: string; vertical?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, opacity: 0 }}
      animate={inView ? { scaleX: 1, scaleY: 1, opacity: 1 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ originX: vertical ? "50%" : "0%", originY: vertical ? "0%" : "50%" }}
      className={`bg-[hsl(var(--gold))] ${vertical ? "w-px" : "h-px"} ${className}`}
    />
  );
};

const GoldLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-medium uppercase tracking-[0.4em]" style={{ color: "hsl(var(--gold))" }}>
    {children}
  </span>
);

const Reveal = ({ children, className = "", delay = 0, from = "bottom" }: {
  children: React.ReactNode; className?: string; delay?: number; from?: "bottom" | "left" | "right" | "none";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial = { opacity: 0, y: from === "bottom" ? 40 : 0, x: from === "left" ? -50 : from === "right" ? 50 : 0 };
  return (
    <motion.div ref={ref} initial={initial} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
};

const CornerFrame = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }} className={`pointer-events-none absolute ${className}`} style={{ color: "hsl(var(--gold))" }}>
      <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ originX: 0 }} className="h-px w-8 bg-current" />
      <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ originY: 0 }} className="w-px h-8 bg-current" />
    </motion.div>
  );
};

const SectionDivider = ({ label }: { label: string }) => (
  <Reveal className="flex items-center gap-6 py-8">
    <GoldLine className="flex-1" />
    <GoldLabel>{label}</GoldLabel>
    <GoldLine className="flex-1" />
  </Reveal>
);

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────────────────────────
const EditorialCard = ({ product, delay = 0 }: { product: Product; delay?: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay} from="bottom">
      <Link to={`/joyeria/${product.id}`} className="group block" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <CornerFrame className="left-3 top-3" />
          <motion.img src={product.image} alt={product.name} loading="lazy"
            animate={{ scale: hovered ? 1.06 : 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover" />
          <motion.div initial={{ y: "100%" }} animate={hovered ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3"
            style={{ background: "hsl(var(--gold) / 0.92)" }}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/80">Ver detalle</span>
            <ArrowRight className="h-3 w-3 text-black/70" />
          </motion.div>
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-normal text-foreground transition-colors duration-300 group-hover:text-primary"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
            {product.name}
          </h3>
          {product.brand !== "Centenario" && <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{product.brand}</p>}
          {product.karat && <p className="mt-0.5 text-[11px] text-muted-foreground">{product.karat}</p>}
          <p className="mt-1 text-sm">
            {product.price != null ? `$${product.price.toLocaleString()} MXN` : "Consultar precio"}
          </p>
        </div>
      </Link>
    </Reveal>
  );
};

// ─────────────────────────────────────────────────────────────
// FILTER PANEL
// ─────────────────────────────────────────────────────────────
const FilterPanel = ({ category, setCategory, marca, setMarca, showRelojes, relojMarca, setRelojMarca }: {
  category: string; setCategory: (v: string) => void;
  marca: string; setMarca: (v: string) => void;
  showRelojes: boolean;
  relojMarca: string; setRelojMarca: (v: string) => void;
}) => (
  <div className="flex flex-col gap-4 md:flex-row md:items-end">
    {!showRelojes && (
      <>
        <div className="min-w-[160px]">
          <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em]">Categoría</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{allCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div className="min-w-[160px]">
          <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em]">Marca</label>
          <Select value={marca} onValueChange={setMarca}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{allBrands.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </>
    )}
    {showRelojes && (
      <div className="min-w-[160px]">
        <label className="mb-1 block text-xs font-medium uppercase tracking-[0.15em]">Marca de Reloj</label>
        <Select value={relojMarca} onValueChange={setRelojMarca}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{watchBrands.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
        </Select>
      </div>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
const Joyeria = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isRelojes = searchParams.get("tipo") === "relojes";

  const [category, setCategory] = useState("Todos");
  const [marca, setMarca] = useState("Todos");
  const [relojMarca, setRelojMarca] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const toggleRelojes = () => {
    if (isRelojes) {
      searchParams.delete("tipo");
    } else {
      searchParams.set("tipo", "relojes");
    }
    setSearchParams(searchParams);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filtered = products.filter((p) => {
    if (isRelojes) {
      return p.type === "reloj" && (relojMarca === "Todos" || p.brand === relojMarca);
    }
    return p.type === "joyeria" &&
      (category === "Todos" || p.category === category) &&
      (marca === "Todos" || p.brand === marca);
  });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>

      {/* ══ HERO ══ */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-16">
        <div className="absolute inset-0 z-0">
          <img src={heroHome} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/50 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <GoldLabel>{isRelojes ? "Relojes de Lujo" : "Colección 2026"}</GoldLabel>
            <h1 className="mt-3 text-4xl font-normal leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
              {isRelojes ? "Relojes" : "Catálogo"}
            </h1>
          </motion.div>
        </div>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0, background: "hsl(var(--gold))" }}
          className="absolute bottom-0 left-0 right-0 h-px" />
      </section>

      {/* ══ FILTER BAR ══ */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-16">
        <div className="flex items-center gap-4">
          {/* Relojes toggle button */}
          <Button
            variant={isRelojes ? "default" : "outline"}
            size="sm"
            onClick={toggleRelojes}
            className="gap-2 text-xs uppercase tracking-wider"
          >
            <Watch className="h-3.5 w-3.5" />
            Relojes
          </Button>

          {/* Desktop filters */}
          <div className="hidden gap-4 md:flex">
            <FilterPanel category={category} setCategory={setCategory} marca={marca} setMarca={setMarca}
              showRelojes={isRelojes} relojMarca={relojMarca} setRelojMarca={setRelojMarca} />
          </div>

          {/* Mobile filter sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground">
                  <SlidersHorizontal className="h-4 w-4" /> Filtrar
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-background">
                <h3 className="mb-6 text-sm" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>Filtros</h3>
                <FilterPanel category={category} setCategory={setCategory} marca={marca} setMarca={setMarca}
                  showRelojes={isRelojes} relojMarca={relojMarca} setRelojMarca={setRelojMarca} />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <Reveal from="right">
          <p className="text-xs text-muted-foreground">{filtered.length} piezas</p>
        </Reveal>
      </div>

      {/* ══ PRODUCT GRID ══ */}
      <div className="px-6 pb-24 md:px-16">
        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={`${isRelojes}-${category}-${marca}-${relojMarca}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8"
            >
              {visible.map((product, i) => (
                <EditorialCard key={product.id} product={product} delay={Math.min(i * 0.03, 0.3)} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 py-32 text-center">
              <GoldLine className="w-12" />
              <p className="text-sm text-muted-foreground">No se encontraron piezas con estos filtros.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
              className="gap-2 text-xs uppercase tracking-wider">
              Cargar más piezas ({filtered.length - visibleCount} restantes)
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Joyeria;
