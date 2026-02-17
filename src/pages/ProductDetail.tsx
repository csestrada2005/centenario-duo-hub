import { useParams, Link } from "react-router-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [added, setAdded] = useState(false);
  const relatedRef = useRef<HTMLDivElement>(null);
  const relatedInView = useInView(relatedRef, { once: true, margin: "-60px" });

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-12 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Link to="/joyeria/catalogo" className="group mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1" /> Volver al catálogo
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group aspect-[3/4] overflow-hidden bg-muted">
              <div className="h-full w-full bg-muted transition-transform duration-700 group-hover:scale-105" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground"
            >
              Ref: {id}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-2 text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Pieza Premium
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-xl"
            >
              $4,900 MXN
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-sm leading-relaxed text-muted-foreground"
            >
              Pieza artesanal elaborada con los más altos estándares de calidad. Incluye certificado de autenticidad y garantía.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 space-y-1 text-sm text-muted-foreground"
            >
              <p><span className="text-foreground">Material:</span> Oro 14k</p>
              <p><span className="text-foreground">Peso:</span> 5.2g</p>
              <p><span className="text-foreground">Garantía:</span> 1 año</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                size="lg"
                onClick={handleAdd}
                className={`mt-8 w-full md:w-auto overflow-hidden ${
                  added
                    ? "bg-green-700 text-white hover:bg-green-700"
                    : "bg-foreground text-background hover:bg-foreground/90 active:scale-[0.97]"
                }`}
              >
                <motion.span
                  key={added ? "added" : "default"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center"
                >
                  {added ? (
                    <><Check className="mr-2 h-4 w-4" /> Agregado</>
                  ) : (
                    <><ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito</>
                  )}
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* You may also like */}
        <section ref={relatedRef} className="mt-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={relatedInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8 text-2xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            You may also like
          </motion.h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link to={`/joyeria/prod-${i}`} className="group block">
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <div className="h-full w-full bg-muted transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 text-sm transition-colors duration-300 group-hover:text-primary" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Pieza Premium {i}</p>
                  <p className="text-xs text-muted-foreground">${(2500 + i * 1200).toLocaleString()} MXN</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
