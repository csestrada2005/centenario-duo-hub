import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Copy, Check } from "lucide-react";
import { useState } from "react";
import heroSucursales from "@/assets/hero-sucursales.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const branches = [
  { name: "Centro", address: "Juan Antonio de la Fuente #139 Sur, Col. Centro, Torreón, Coah.", phone: "871 688 4466", hours: "Lun–Vie 9:00–18:00 | Sáb 9:00–15:00", maps: "https://www.google.com/maps/search/Juan+Antonio+de+la+Fuente+139+Sur+Torreon+Coah" },
  { name: "Hotel Francia", address: "Av. Pdte Carranza Pte #1626, Col. Centro, Torreón, Coah.", phone: "871 724 4614", hours: "Lun–Vie 9:00–18:00 | Sáb 9:00–15:00", maps: "https://www.google.com/maps/search/Av+Pdte+Carranza+Pte+1626+Torreon+Coah" },
  { name: "Valladolid", address: "Blvd. Libertad #740, Fracc. Valle de Nazas, Torreón, Coah.", phone: "871 670 3634", hours: "Lun–Vie 9:00–18:00 | Sáb 9:00–15:00", maps: "https://www.google.com/maps/search/Blvd+Libertad+740+Valle+de+Nazas+Torreon+Coah" },
  { name: "Monterreal", address: "Blvd. Libertad #632, Col. Monterreal, Torreón, Coah.", phone: "871 670 0394", hours: "Lun–Vie 9:00–18:00 | Sáb 9:00–15:00", maps: "https://www.google.com/maps/search/Blvd+Libertad+632+Monterreal+Torreon+Coah" },
  { name: "Centro Gómez", address: "Calle Ocampo #178 Sur Local 3, Col. Centro, Gómez Palacio, Dgo.", phone: "871 780 1206", hours: "Lun–Vie 9:00–18:00 | Sáb 9:00–15:00", maps: "https://www.google.com/maps/search/Calle+Ocampo+178+Sur+Gomez+Palacio+Dgo" },
];

const CopyPhoneButton = ({ phone }: { phone: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copiado" : "Copiar número"}
    </button>
  );
};

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
            <motion.h1 variants={fadeUp} className="text-3xl font-bold text-white sm:text-4xl md:text-6xl lg:text-7xl">
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
                  <h3 className="text-lg font-bold uppercase tracking-wide">{b.name}</h3>
                  <div className="mt-2 h-px w-8 bg-primary transition-all duration-500 group-hover:w-full" />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      <span>{b.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 text-primary" strokeWidth={1.5} />
                      <span>{b.phone}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <a
                      href={b.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium uppercase tracking-[0.1em] text-primary transition-colors hover:text-primary/80"
                    >
                      Cómo llegar
                    </a>
                    <CopyPhoneButton phone={b.phone} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map — embedded Google Maps showing Torreón area */}
      <section className="px-6 pb-20 md:px-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-lg">
          <iframe
            title="Mapa de sucursales Centenario en Torreón"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57636.04577842063!2d-103.45!3d25.54!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x868fdae1a40e3b9b%3A0x6a2e5e850e3e1b00!2sTorre%C3%B3n%2C%20Coah.%2C%20Mexico!5e0!3m2!1ses!2smx!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Sucursales;
