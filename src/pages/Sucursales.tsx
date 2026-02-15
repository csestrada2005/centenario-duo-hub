import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import heroSucursales from "@/assets/hero-sucursales.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img src={heroSucursales} alt="Sucursales Centenario" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p variants={fadeUp} className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-white/70">
              Estamos cerca de ti
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
              Nuestras sucursales
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-4 text-lg font-light text-white/80">
              Visítanos en cualquiera de nuestras ubicaciones
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((b, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold">{b.name}</h3>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{b.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href={b.maps} target="_blank" rel="noopener noreferrer">
                        <MapPin className="mr-1 h-4 w-4" /> Cómo llegar
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Map placeholder */}
      <section className="container pb-12">
        <div className="flex h-64 items-center justify-center rounded-lg border bg-muted">
          <p className="text-sm text-muted-foreground">Mapa de sucursales (Google Maps se integrará aquí)</p>
        </div>
      </section>
    </div>
  );
};

export default Sucursales;
