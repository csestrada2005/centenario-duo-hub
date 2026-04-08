import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

const WA_NUMBER = "5212213497090";

const Carrito = () => {
  const { items, removeItem, updateQty } = useCart();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = items.length > 0 ? 199 : 0;
  const total = subtotal + shipping;

  const handleComprar = () => {
    if (items.length === 0) return;
    const lines = items.map((i) => {
      const details = [i.name];
      if (i.karat) details.push(i.karat);
      if (i.size) details.push(i.size);
      if (i.category) details.push(i.category);
      return `• ${details.join(" — ")} (x${i.qty})`;
    });
    const msg = `Hola, estoy interesado en:\n\n${lines.join("\n")}\n\n¿Me pueden dar más información?`;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-6 py-12 md:px-10"
    >
      <div className="mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 text-3xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Carrito
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-20 text-center"
          >
            <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
            <Button variant="editorial" className="mt-6" size="lg" disabled>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agrega productos para continuar
            </Button>
            <br />
            <Link
              to="/joyeria/catalogo"
              className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.15em] text-foreground underline"
            >
              Ver catálogo
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-0 lg:col-span-2">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                    className={`flex items-center gap-4 py-6 sm:gap-6 ${index > 0 ? "border-t border-border" : ""}`}
                  >
                    <div className="h-24 w-20 shrink-0 overflow-hidden bg-muted">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.price > 0 ? `$${item.price.toLocaleString()} MXN` : "Precio a consultar"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40 active:scale-95"
                        aria-label="Reducir cantidad"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40 active:scale-95"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-destructive active:scale-95"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:pt-6"
            >
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Envío</span>
                  <span>${shipping}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-sm font-medium">
                  <span>Total</span>
                  <span>${total.toLocaleString()} MXN</span>
                </div>
                <Button
                  variant="editorial"
                  className="group mt-6 w-full"
                  size="lg"
                  onClick={handleComprar}
                >
                  Comprar
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Carrito;
