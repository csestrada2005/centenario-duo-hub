import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const Checkout = () => {
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
          Checkout
        </motion.h1>
        <div className="grid gap-12 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 lg:col-span-2"
          >
            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">Datos de envío</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {["Nombre", "Apellido"].map((p, i) => (
                  <motion.div key={p} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                    <Input placeholder={p} className="bg-transparent focus:scale-[1.01]" />
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-2">
                  <Input placeholder="Dirección" className="bg-transparent focus:scale-[1.01]" />
                </motion.div>
                {["Ciudad", "Código postal", "Teléfono", "Email"].map((p, i) => (
                  <motion.div key={p} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + i * 0.05 }}>
                    <Input placeholder={p} className="bg-transparent focus:scale-[1.01]" />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-t border-border pt-8"
            >
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">Método de pago</h3>
              <p className="mb-4 text-xs text-muted-foreground">
                El pago se procesará de forma segura.
              </p>
              <div className="space-y-4">
                <Input placeholder="Número de tarjeta" className="bg-transparent focus:scale-[1.01]" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/AA" className="bg-transparent focus:scale-[1.01]" />
                  <Input placeholder="CVV" className="bg-transparent focus:scale-[1.01]" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:pt-0"
          >
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">Resumen</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Pieza Premium 1 x1</span><span>$3,700</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pieza Premium 3 x2</span><span>$12,200</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>$199</span></div>
              <div className="flex justify-between border-t border-border pt-3 font-medium"><span>Total</span><span>$16,099 MXN</span></div>
            </div>
            <Button className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90 active:scale-[0.97]" size="lg">
              Confirmar pedido
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
