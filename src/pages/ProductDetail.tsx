import { useParams, Link } from "react-router-dom";
import { useRef, useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import useEmblaCarousel from "embla-carousel-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const relatedRef = useRef<HTMLDivElement>(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
        <p className="text-lg text-muted-foreground">Producto no encontrado</p>
        <Link to="/joyeria/catalogo" className="text-sm underline">Volver al catálogo</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand) && p.type === product.type)
    .slice(0, 4);

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price || 0 });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isWatch = product.type === "reloj";
  const backLink = isWatch ? "/joyeria/catalogo?tipo=relojes" : "/joyeria/catalogo";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link to={backLink} className="group mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" />
          {isWatch ? "Volver a relojes" : "Volver al catálogo"}
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            {product.images && product.images.length > 0 ? (
              <div className="relative group">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    <div className="flex-[0_0_100%] min-w-0">
                      <div className="aspect-[3/4] overflow-hidden bg-muted">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      </div>
                    </div>
                    {product.images.map((img, index) => (
                      <div key={index} className="flex-[0_0_100%] min-w-0">
                        <div className="aspect-[3/4] overflow-hidden bg-muted">
                          <img src={img} alt={`${product.name} - Imagen ${index + 2}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Navigation */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background"
                  onClick={scrollPrev}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-background"
                  onClick={scrollNext}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <button
                    className={`h-1.5 rounded-full transition-all ${selectedIndex === 0 ? "w-4 bg-primary" : "w-1.5 bg-primary/40"}`}
                    onClick={() => emblaApi && emblaApi.scrollTo(0)}
                    aria-label="Ir a imagen 1"
                  />
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${selectedIndex === index + 1 ? "w-4 bg-primary" : "w-1.5 bg-primary/40"}`}
                      onClick={() => emblaApi && emblaApi.scrollTo(index + 1)}
                      aria-label={`Ir a imagen ${index + 2}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="group aspect-[3/4] overflow-hidden bg-muted">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col justify-center">
            
            {product.brand !== "Centenario" && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: "hsl(var(--gold))" }}>
                {product.brand}
              </motion.p>
            )}

            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }} className="mt-2 text-3xl md:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
              {product.name}
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-xl">
              {product.price != null ? `$${product.price.toLocaleString()} MXN` : "Consultar precio"}
            </motion.p>



            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }} className="mt-6 space-y-1 text-sm text-muted-foreground">
              {product.karat && <p><span className="text-foreground">Quilataje:</span> {product.karat}</p>}
              {product.size && <p><span className="text-foreground">{isWatch ? "Modelo:" : product.category === "Anillos" ? "Talla:" : product.category === "Cadenas" ? "Largo:" : "Tamaño:"}</span> {product.size}</p>}
              {product.category && <p><span className="text-foreground">Categoría:</span> {product.category}</p>}
              
              {/* Watch-specific details */}
              {isWatch && product.modelo && <p><span className="text-foreground">Modelo:</span> {product.modelo}</p>}
              {isWatch && product.correa && <p><span className="text-foreground">Correa:</span> {product.correa}</p>}
              {isWatch && product.dial && <p><span className="text-foreground">Dial:</span> {product.dial}</p>}
              {isWatch && product.material && <p><span className="text-foreground">Material:</span> {product.material}</p>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
              <Button size="lg" onClick={handleAdd} variant={added ? "default" : "editorial"}
                className={`mt-8 w-full md:w-auto overflow-hidden group ${added ? "bg-green-700 text-white hover:bg-green-700" : ""}`}>
                <motion.span key={added ? "added" : "default"} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.25 }} className="inline-flex items-center">
                  {added ? <><Check className="mr-2 h-4 w-4" /> Agregado</> : <><ShoppingCart className="mr-2 h-4 w-4 group-hover:-rotate-12 transition-transform" /> Agregar al carrito</>}
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section ref={relatedRef} className="mt-24">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={relatedInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }} className="mb-8 text-2xl"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
              También te puede gustar
            </motion.h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 25 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}>
                  <Link to={`/joyeria/${item.id}`} className="group block">
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img src={item.image} alt={item.name} loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 text-sm transition-colors duration-300 group-hover:text-primary"
                      style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}>
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.price != null ? `$${item.price.toLocaleString()} MXN` : "Consultar precio"}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetail;
