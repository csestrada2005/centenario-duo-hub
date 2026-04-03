import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const relatedRef = useRef<HTMLDivElement>(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });
  const { addItem } = useCart();

  const product = products.find((p) => p.id === id);

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
            <div className="group aspect-[3/4] overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
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

            {product.priceTotal != null && product.price != null && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                className="text-sm text-muted-foreground">
                Precio con IVA: ${product.priceTotal.toLocaleString()} MXN
              </motion.p>
            )}

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
