import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Pieza Premium ${i + 1}`,
  price: 2500 + i * 1200,
  category: ["Anillos", "Collares", "Pulseras", "Aretes"][i % 4],
  material: ["Oro 14k", "Plata 925", "Oro 18k"][i % 3],
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
  <div className="space-y-4">
    <div>
      <label className="mb-1 block text-sm font-medium">Categoría</label>
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="mb-1 block text-sm font-medium">Material</label>
      <Select value={material} onValueChange={setMaterial}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {materials.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  </div>
);

const Joyeria = () => {
  const [category, setCategory] = useState("Todos");
  const [material, setMaterial] = useState("Todos");

  const filtered = mockProducts.filter(
    (p) =>
      (category === "Todos" || p.category === category) &&
      (material === "Todos" || p.material === material)
  );

  return (
    <div>
      <section className="bg-secondary/30 py-12 text-center">
        <div className="container">
          <h1 className="text-3xl font-bold md:text-4xl">Joyería Centenario</h1>
          <p className="mt-2 text-muted-foreground">Piezas con garantía y diseño premium</p>
        </div>
      </section>

      <div className="container py-8">
        <div className="flex gap-8">
          {/* Desktop filters */}
          <aside className="hidden w-56 shrink-0 md:block">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">Filtros</h3>
            <FilterPanel category={category} setCategory={setCategory} material={material} setMaterial={setMaterial} />
          </aside>

          <div className="flex-1">
            {/* Mobile filter button */}
            <div className="mb-4 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtrar
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                  <h3 className="mb-4 text-lg font-semibold">Filtros</h3>
                  <FilterPanel category={category} setCategory={setCategory} material={material} setMaterial={setMaterial} />
                </SheetContent>
              </Sheet>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {filtered.map((product) => (
                <motion.div key={product.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Card className="overflow-hidden transition-shadow hover:shadow-md">
                    <div className="aspect-square bg-muted" />
                    <CardContent className="p-4">
                      <h3 className="text-sm font-semibold">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.material}</p>
                      <p className="mt-1 font-semibold">${product.price.toLocaleString()} MXN</p>
                      <Button asChild variant="outline" size="sm" className="mt-3 w-full">
                        <Link to={`/joyeria/${product.id}`}>Ver detalle</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-12 text-center text-muted-foreground">No se encontraron productos con estos filtros.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Joyeria;
