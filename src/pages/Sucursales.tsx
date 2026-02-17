import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import heroSucursales from "@/assets/hero-sucursales.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const branches = [
  { name: "Sucursal Centro", address: "Av. Juárez #100, Col. Centro", phone: "(555) 100-0001", hours: "Lun-Sáb 9:00 - 18:00", maps: "https://maps.google.com" },
  { name: "Sucursal Zona Norte", address: "Blvd. Norte #250, Col. Industrial", phone: "(555) 100-0002", hours: "Lun-Sáb 9:00 - 19:00", maps: "https://maps.google.com" },
  { name: "Sucursal Plaza Sur", address: "Av. Sur #45, Plaza Centenario", phone: "(555) 100-0003", hours: "Lun-Dom 10:00 - 20:00", maps: "https://maps.google.com" },
  { name: "Sucursal Poniente", address: "Calle Reforma #78, Col. Poniente", phone: "(555) 100-0004", hours: "Lun-Sáb 9:00 - 18:00", maps: "https://maps.google.com" },
  { name: "Sucursal Oriente", address: "Av. Oriente #320, Col. Las Flores", phone: "(555) 100-0005", hours: "Lun-Sáb 9:00 - 18:00", maps: "https://maps.google.com" },
];

const Sucursales = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <div
          className="parallax-bg absolute inset-0 z-0"
          style={{ backgroundImage: `url(${heroSucursales})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-[hsl(var(--background))]" />
        <div className="relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-white/50">
              Estamos cerca de ti
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-gold-gradient text-4xl font-light md:text-6xl lg:text-7xl">
              Nuestras sucursales
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-sm font-light text-white/60">
              Visítanos en cualquiera de nuestras ubicaciones
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Branches */}
      <section className="px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {branches.map((b, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="group py-6">
                  <h3 className="text-lg font-light uppercase tracking-wide">{b.name}</h3>
                  <div className="mt-2 h-px w-8 bg-primary transition-all duration-500 group-hover:w-full" />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-sm font-light text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1} />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" strokeWidth={1} />
                      <span>{b.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-light text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary" strokeWidth={1} />
                      <span>{b.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <a
                      href={b.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium uppercase tracking-[0.1em] text-primary transition-colors hover:text-primary/80"
                    >
                      Cómo llegar
                    </a>
                    <a
                      href="https://wa.me/5551234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex h-64 items-center justify-center bg-muted">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Mapa de sucursales</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sucursales;
