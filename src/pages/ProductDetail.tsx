import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link to="/joyeria" className="mb-8 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Volver al catálogo
        </Link>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="aspect-[3/4] bg-muted" />
          </motion.div>

          {/* Info */}
          <motion.div initial="hidden" animate="visible" variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.15 } } }} className="flex flex-col justify-center">
            <p className="text-xs text-muted-foreground">Ref: {id}</p>
            <h1 className="mt-2 text-3xl md:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Pieza Premium</h1>
            <p className="mt-4 text-xl">$4,900 MXN</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Pieza artesanal elaborada con los más altos estándares de calidad. Incluye certificado de autenticidad y garantía.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p><span className="text-foreground">Material:</span> Oro 14k</p>
              <p><span className="text-foreground">Peso:</span> 5.2g</p>
              <p><span className="text-foreground">Garantía:</span> 1 año</p>
            </div>
            <Button size="lg" className="mt-8 w-full bg-foreground text-background hover:bg-foreground/90 md:w-auto">
              <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
            </Button>
          </motion.div>
        </div>

        {/* You may also like */}
        <section className="mt-24">
          <h2 className="mb-8 text-2xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>You may also like</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} to={`/joyeria/prod-${i}`} className="group">
                <div className="aspect-[3/4] bg-muted transition-opacity group-hover:opacity-90" />
                <p className="mt-3 text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Pieza Premium {i}</p>
                <p className="text-xs text-muted-foreground">${(2500 + i * 1200).toLocaleString()} MXN</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
