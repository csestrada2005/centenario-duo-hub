import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import feat1 from "@/assets/joyeria-featured-1.jpg";
import feat2 from "@/assets/joyeria-featured-2.jpg";
import galleryJewelry from "@/assets/gallery-jewelry-1.jpg";
import galleryHands from "@/assets/gallery-hands.jpg";
import galleryStore from "@/assets/gallery-store.jpg";
import heroHome from "@/assets/hero-home.jpg";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const productImages = [feat1, feat2, galleryJewelry, galleryHands, galleryStore, feat1, feat2, galleryJewelry, galleryHands, galleryStore, feat1, feat2];

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: [`Anillo Eternity`, `Collar Lune`, `Brazalete Aurora`, `Aretes Soleil`, `Anillo Prestige`, `Collar Aura`, `Pendiente Dusk`, `Brazalete Lumière`, `Anillo Celeste`, `Collar Dore`, `Aretes Éclat`, `Anillo Nuage`][i],
  price: 2500 + i * 1200,
  category: ["Anillos", "Collares", "Pulseras", "Aretes"][i % 4],
  material: ["Oro 14k", "Plata 925", "Oro 18k"][i % 3],
  img: productImages[i],
}));

const categories = ["Todos", "Anillos", "Collares", "Pulseras", "Aretes", "Dijes"];
const marcas = ["Todos", "Tiffany & Co.", "Cartier", "Van Cleef & Arpels", "Messika", "Bulgari"];
const relojesMarcas = ["Todos", "Rolex", "Audemars Piguet", "Patek Philippe", "Hublot", "Cartier", "Omega"];

// ─────────────────────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────────────────────

/** Thin gold line that draws itself in view */
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

/** Gold shimmer text label */
const GoldLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    className="text-[10px] font-medium uppercase tracking-[0.4em]"
    style={{ color: "hsl(var(--gold))" }}
  >
    {children}
  </span>
);

/** Scroll reveal wrapper */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "none";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const initial = {
    opacity: 0,
    y: from === "bottom" ? 40 : 0,
    x: from === "left" ? -50 : from === "right" ? 50 : 0,
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Parallax image */
const ParallaxImg = ({ src, alt, className = "", speed = 0.15 }: { src: string; alt: string; className?: string; speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 160, -speed * 160]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="h-[115%] w-full object-cover will-change-transform"
      />
    </div>
  );
};

/** Decorative corner frame */
const CornerFrame = ({ className = "" }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={`pointer-events-none absolute ${className}`}
      style={{ color: "hsl(var(--gold))" }}
    >
      {/* top-left corner */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ originX: 0 }}
        className="h-px w-8 bg-current"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ originY: 0 }}
        className="w-px h-8 bg-current"
      />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD — editorial style
// ─────────────────────────────────────────────────────────────
const EditorialCard = ({
  product,
  size = "md",
  align = "left",
  delay = 0,
}: {
  product: typeof mockProducts[0];
  size?: "sm" | "md" | "lg";
  align?: "left" | "right";
  delay?: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const aspectMap = { sm: "aspect-[3/4]", md: "aspect-[4/5]", lg: "aspect-[2/3]" };

  return (
    <Reveal delay={delay} from={align === "left" ? "left" : "right"}>
      <Link
        to={`/joyeria/${product.id}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image frame */}
        <div className={`relative ${aspectMap[size]} overflow-hidden bg-muted`}>
          {/* Corner frames */}
          <CornerFrame className="left-3 top-3" />
          <div className="pointer-events-none absolute right-3 top-3" style={{ color: "hsl(var(--gold))" }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5 }}
              style={{ originX: 1 }}
              className="h-px w-8 bg-current"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={hovered ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              style={{ originY: 0, marginLeft: "auto" }}
              className="w-px h-8 bg-current"
            />
          </div>
          {/* Bottom-right corner */}
          <div className="pointer-events-none absolute bottom-3 right-3" style={{ color: "hsl(var(--gold))" }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ originX: 1 }}
              className="h-px w-8 bg-current"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={hovered ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ originY: 1, marginLeft: "auto" }}
              className="w-px h-8 bg-current"
            />
          </div>

          <motion.img
            src={product.img}
            alt={product.name}
            loading="lazy"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
          />

          {/* Gold overlay bar */}
          <motion.div
            initial={{ y: "100%" }}
            animate={hovered ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3"
            style={{ background: "hsl(var(--gold) / 0.92)" }}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/80">Ver detalle</span>
            <ArrowRight className="h-3 w-3 text-black/70" />
          </motion.div>
        </div>

        {/* Info */}
        <div className={`mt-3 ${align === "right" ? "text-right" : ""}`}>
          <h3
            className="text-sm font-normal text-foreground transition-colors duration-300 group-hover:text-primary"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {product.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{product.material}</p>
          <p className="mt-1 text-sm">${product.price.toLocaleString()} MXN</p>
        </div>
      </Link>
    </Reveal>
  );
};

// ─────────────────────────────────────────────────────────────
// FILTER PANEL
// ─────────────────────────────────────────────────────────────
const FilterPanel = ({ category, setCategory, marca, setMarca, relojMarca, setRelojMarca }: {
  category: string; setCategory: (v: string) => void;
  marca: string; setMarca: (v: string) => void;
  relojMarca: string; setRelojMarca: (v: string) => void;
}) => (
  <div className="space-y-6">
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Categoría</label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
      </Select>
    </div>
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Marcas</label>
      <Select value={marca} onValueChange={setMarca}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{marcas.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
      </Select>
    </div>
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Relojes</label>
      <Select value={relojMarca} onValueChange={setRelojMarca}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>{relojesMarcas.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// EDITORIAL SECTION DIVIDER
// ─────────────────────────────────────────────────────────────
const SectionDivider = ({ label }: { label: string }) => (
  <Reveal className="flex items-center gap-6 py-8">
    <GoldLine className="flex-1" />
    <GoldLabel>{label}</GoldLabel>
    <GoldLine className="flex-1" />
  </Reveal>
);

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
const Joyeria = () => {
  const [category, setCategory] = useState("Todos");
  const [marca, setMarca] = useState("Todos");
  const [relojMarca, setRelojMarca] = useState("Todos");

  const filtered = mockProducts.filter(
    (p) => (category === "Todos" || p.category === category)
  );

  // Segment products for editorial layout
  const row1 = filtered.slice(0, 3);
  const featured = filtered[3] ?? null;
  const row2 = filtered.slice(4, 7);
  const editorialPair = filtered.slice(7, 9);
  const finalRow = filtered.slice(9, 12);

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
            <GoldLabel>Colección 2026</GoldLabel>
            <h1
              className="mt-3 text-5xl font-normal leading-[1.05] md:text-7xl lg:text-8xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Catálogo
            </h1>
          </motion.div>
        </div>

        {/* gold accent line bottom */}
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
          <FilterPanel category={category} setCategory={setCategory} marca={marca} setMarca={setMarca} relojMarca={relojMarca} setRelojMarca={setRelojMarca} />
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
              <FilterPanel category={category} setCategory={setCategory} marca={marca} setMarca={setMarca} relojMarca={relojMarca} setRelojMarca={setRelojMarca} />
            </SheetContent>
          </Sheet>
        </div>
        <Reveal from="right">
          <p className="text-xs text-muted-foreground">{filtered.length} piezas</p>
        </Reveal>
      </div>

      <div className="px-6 md:px-16">

        {/* ══════════════════════════════════════════
            ROW 1 — asymmetric trio: small | tall | small
        ══════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          {row1.length > 0 && (
            <motion.div key="row1" className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-10">
              {/* col 1 — offset down */}
              <div className="mt-0 md:mt-16">
                {row1[0] && <EditorialCard product={row1[0]} size="sm" align="left" delay={0} />}
              </div>
              {/* col 2 — tall, center */}
              <div className="-mt-0 md:-mt-4">
                {row1[1] && <EditorialCard product={row1[1]} size="lg" align="left" delay={0.1} />}
              </div>
              {/* col 3 — offset down more */}
              <div className="mt-0 md:mt-24 hidden md:block">
                {row1[2] && <EditorialCard product={row1[2]} size="sm" align="right" delay={0.2} />}
              </div>
              {/* mobile: show as grid item */}
              <div className="md:hidden">
                {row1[2] && <EditorialCard product={row1[2]} size="sm" align="right" delay={0.2} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════
            EDITORIAL BREAK — full width image + gold text
        ══════════════════════════════════════════ */}
        {featured && (
          <>
            <SectionDivider label="Pieza destacada" />
            <Reveal className="relative mx-auto max-w-3xl">
              <Link to={`/joyeria/${featured.id}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ParallaxImg src={featured.img} alt={featured.name} speed={0.12} />
                  {/* gold top border animated */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 0, background: "hsl(var(--gold))" }}
                    className="absolute left-0 right-0 top-0 h-px z-10"
                  />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originX: 1, background: "hsl(var(--gold))" }}
                    className="absolute bottom-0 left-0 right-0 h-px z-10"
                  />
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-xs font-medium uppercase tracking-[0.25em] text-white">Ver detalle</span>
                    <ArrowRight className="mt-2 h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-normal" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{featured.name}</h3>
                    <p className="text-xs text-muted-foreground">{featured.material}</p>
                  </div>
                  <p className="text-sm">${featured.price.toLocaleString()} MXN</p>
                </div>
              </Link>
            </Reveal>
          </>
        )}

        {/* ══════════════════════════════════════════
            ROW 2 — 3-col with vertical gold line dividers
        ══════════════════════════════════════════ */}
        {row2.length > 0 && (
          <>
            <SectionDivider label="Colección" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-0">
              {row2.map((p, i) => (
                <div key={p.id} className={`${i < row2.length - 1 ? "md:pr-10" : ""} ${i > 0 ? "md:pl-10 md:border-l md:border-border" : ""}`}>
                  <EditorialCard product={p} size="md" align={i % 2 === 0 ? "left" : "right"} delay={i * 0.12} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            EDITORIAL PAIR — full bleed side by side with gold frame
        ══════════════════════════════════════════ */}
        {editorialPair.length > 0 && (
          <>
            <SectionDivider label="Lo más exclusivo" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {editorialPair.map((p, i) => (
                <Reveal key={p.id} from={i === 0 ? "left" : "right"} delay={i * 0.15}>
                  <Link to={`/joyeria/${p.id}`} className="group relative block">
                    {/* large gold frame on hover */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-2 z-10 pointer-events-none"
                        style={{ border: "1px solid hsl(var(--gold) / 0.7)" }}
                      />
                      <motion.img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                        <GoldLabel>Ver detalle</GoldLabel>
                        <h3
                          className="mt-2 text-2xl font-normal text-white"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {p.name}
                        </h3>
                        <p className="mt-1 text-sm text-white/70">${p.price.toLocaleString()} MXN</p>
                      </div>
                    </div>
                    {/* below text */}
                    <div className="mt-3">
                      <h3 className="text-sm font-normal" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{p.name}</h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{p.material}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════
            FINAL ROW — staggered small cards
        ══════════════════════════════════════════ */}
        {finalRow.length > 0 && (
          <>
            <SectionDivider label="Más piezas" />
            <div className="grid grid-cols-2 gap-4 pb-24 md:grid-cols-3 md:gap-8">
              {finalRow.map((p, i) => (
                <div key={p.id} style={{ marginTop: i === 1 ? "3rem" : 0 }}>
                  <EditorialCard product={p} size="sm" align={i % 2 === 0 ? "left" : "right"} delay={i * 0.1} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-32 text-center"
          >
            <GoldLine className="w-12" />
            <p className="text-sm text-muted-foreground">No se encontraron piezas con estos filtros.</p>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

export default Joyeria;
