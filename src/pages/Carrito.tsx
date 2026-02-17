import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const cartItems = [
  { id: "prod-1", name: "Pieza Premium 1", price: 3700, qty: 1 },
  { id: "prod-3", name: "Pieza Premium 3", price: 6100, qty: 2 },
];

const Carrito = () => {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 199;
  const total = subtotal + shipping;

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

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="py-20 text-center"
          >
            <p className="text-sm text-muted-foreground">Tu carrito está vacío.</p>
            <Link to="/joyeria/catalogo" className="mt-4 inline-block text-xs font-medium uppercase tracking-[0.15em] text-foreground underline">
              Ver catálogo
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-0 lg:col-span-2">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                  className={`flex items-center gap-6 py-6 ${index > 0 ? "border-t border-border" : ""}`}
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden bg-muted">
                    <div className="h-full w-full bg-muted transition-transform duration-500 hover:scale-105" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{item.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">${item.price.toLocaleString()} MXN</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm tabular-nums">{item.qty}</span>
                    <button className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <button className="text-muted-foreground hover:text-destructive hover:scale-110 active:scale-95">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
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
                <Button asChild className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90 active:scale-[0.97]" size="lg">
                  <Link to="/joyeria/checkout">Proceder al pago</Link>
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
