import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import feat1 from "@/assets/joyeria-featured-1.jpg";
import feat2 from "@/assets/joyeria-featured-2.jpg";
import galleryJewelry from "@/assets/gallery-jewelry-1.jpg";
import galleryHands from "@/assets/gallery-hands.jpg";
import galleryStore from "@/assets/gallery-store.jpg";

const productImages = [feat1, feat2, galleryJewelry, galleryHands, galleryStore, feat1, feat2, galleryJewelry, galleryHands, galleryStore, feat1, feat2];

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Pieza Premium ${i + 1}`,
  price: 2500 + i * 1200,
  category: ["Anillos", "Collares", "Pulseras", "Aretes"][i % 4],
  material: ["Oro 14k", "Plata 925", "Oro 18k"][i % 3],
  img: productImages[i],
}));

const categories = ["Todos", "Anillos", "Collares", "Pulseras", "Aretes"];
const materials = ["Todos", "Oro 14k", "Oro 18k", "Plata 925"];

const FilterPanel = ({
  category,
  setCategory,
  material,
  setMaterial,
}: {
  category: string;
  setCategory: (v: string) => void;
  material: string;
  setMaterial: (v: string) => void;
}) => (
  <div className="space-y-6">
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Categoría</label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em]">Material</label>
      <Select value={material} onValueChange={setMaterial}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {materials.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  </div>
);

/* Product card with scroll reveal */
const ProductCard = ({ product, index }: { product: typeof mockProducts[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/joyeria/${product.id}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 p-4">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-white">Ver detalle</span>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-sm transition-colors duration-300 group-hover:text-primary" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{product.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.material}</p>
          <p className="mt-1 text-sm">${product.price.toLocaleString()} MXN</p>
        </div>
      </Link>
    </motion.div>
  );
};

const Joyeria = () => {
  const [category, setCategory] = useState("Todos");
  const [material, setMaterial] = useState("Todos");

  const filtered = mockProducts.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      (material === "Todos" || p.material === material)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero editorial */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden pb-20">
        <div className="absolute inset-0 z-0">
          <img src={heroHome} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/60 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-5xl font-normal leading-[1.05] md:text-7xl lg:text-8xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Discover<br />our collection
            </h1>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Piezas únicas elaboradas con los más altos estándares de calidad. Cada joya cuenta una historia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog */}
      <div className="px-6 py-16 md:px-10">
        <div className="mx-auto flex max-w-7xl gap-12">
          {/* Desktop filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden w-48 shrink-0 md:block"
          >
            <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em]">Filtros</h3>
            <FilterPanel category={category} setCategory={setCategory} material={material} setMaterial={setMaterial} />
          </motion.aside>

          <div className="flex-1">
            {/* Mobile filter */}
            <div className="mb-6 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground active:scale-95">
                    <SlidersHorizontal className="h-4 w-4" /> Filtrar
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-background">
                  <h3 className="mb-6 text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Filtros</h3>
                  <FilterPanel category={category} setCategory={setCategory} material={material} setMaterial={setMaterial} />
                </SheetContent>
              </Sheet>
            </div>

            {/* Product grid */}
            <motion.div
              layout
              className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center text-sm text-muted-foreground"
              >
                No se encontraron productos con estos filtros.
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Joyeria;
