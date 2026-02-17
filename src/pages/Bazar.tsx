import { Link } from "react-router-dom";
import heroBazar from "@/assets/hero-bazar.jpg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Smartphone, Laptop, Wrench, Car, Tv, CircleDollarSign,
  Gem, Shield, MapPin, MessageCircle, Package, ChevronDown,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const Bazar = () => {
  return (
    <div>
      {/* Hero fullwidth with parallax */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
          className="parallax-bg absolute inset-0 z-0"
          style={{ backgroundImage: `url(${heroBazar})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/60 to-[hsl(var(--background))]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-white/50">
              Casa de empeño y compra de metales preciosos
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-gold-gradient text-5xl font-light leading-[1.1] md:text-7xl lg:text-8xl">
              Bazar Centenario
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-white/60 md:text-base">
              Empeña tus artículos o vende tu oro, plata y diamantes. Sin complicaciones, con total transparencia.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-xs uppercase tracking-[0.15em]">
                <Link to="/bazar/simuladores">Cotizar ahora</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 px-8 text-xs uppercase tracking-[0.15em]">
                <Link to="/bazar/sucursales">Ver sucursales</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-white/30" />
        </motion.div>
      </section>

      {/* Cómo funciona */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-4xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
            Cómo funciona
          </motion.h2>
          <div className="grid gap-16 md:grid-cols-3">
            {[
              { icon: Package, title: "Trae tu artículo", desc: "Lleva tu artículo o metal precioso a cualquier sucursal." },
              { icon: CircleDollarSign, title: "Valuación gratuita", desc: "Nuestros expertos lo evalúan sin costo ni compromiso." },
              { icon: ArrowRight, title: "Recibe tu dinero", desc: "Obtén tu dinero en el momento, de forma segura." },
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <step.icon className="mx-auto h-8 w-8 text-primary" strokeWidth={1} />
                <h3 className="mt-6 text-lg font-light uppercase tracking-[0.1em]">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-4xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
            Nuestros servicios
          </motion.h2>
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="group">
              <h3 className="text-xl font-light uppercase tracking-wide">Empeño de artículos</h3>
              <div className="mt-2 h-px w-12 bg-primary transition-all duration-500 group-hover:w-full" />
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                Electrónicos, herramienta, autos, electrodomésticos, oro y plata. Valuación justa e inmediata.
              </p>
              <Link
                to="/bazar/simuladores"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/80"
              >
                Simular empeño <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="group">
              <h3 className="text-xl font-light uppercase tracking-wide">Compra de metales preciosos</h3>
              <div className="mt-2 h-px w-12 bg-primary transition-all duration-500 group-hover:w-full" />
              <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                Compramos tus metales preciosos al mejor precio del mercado.
              </p>
              <Link
                to="/bazar/simuladores?tab=metales"
                className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/80"
              >
                Simular cotización <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simula fácil — icon grid */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
            Simula fácil
          </motion.h2>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
            {[
              { icon: Smartphone, label: "Celular" },
              { icon: Laptop, label: "Laptop" },
              { icon: Wrench, label: "Herramienta" },
              { icon: Tv, label: "Electro" },
              { icon: Car, label: "Auto" },
              { icon: Gem, label: "Metales" },
            ].map((cat) => (
              <motion.div key={cat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link
                  to={cat.label === "Metales" ? "/bazar/simuladores?tab=metales" : "/bazar/simuladores"}
                  className="group flex flex-col items-center gap-3 py-6 text-center transition-colors"
                >
                  <cat.icon className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-primary" strokeWidth={1} />
                  <span className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-foreground">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Confianza */}
      <section className="px-6 py-28 md:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto h-10 w-10 text-primary" strokeWidth={1} />
          <h2 className="mt-8 text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">Tu tranquilidad es nuestra prioridad</h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
            Más de 25 años brindando un servicio profesional, seguro y sin juicios. Tu confianza es lo más importante.
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-2xl">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
            Preguntas frecuentes
          </motion.h2>
          <Accordion type="single" collapsible>
            {[
              { q: "¿Qué requisitos necesito para empeñar?", a: "Solo necesitas una identificación oficial vigente y el artículo a empeñar." },
              { q: "¿Cuánto tiempo tengo para pagar mi empeño?", a: "El plazo estándar es de 30 días, con posibilidad de refrendar." },
              { q: "¿Qué artículos aceptan?", a: "Electrónicos, herramientas, autos, electrodomésticos, oro, plata y diamantes." },
              { q: "¿Cómo calculan el valor de mi artículo?", a: "Nuestros valuadores certificados evalúan marca, estado y mercado actual." },
              { q: "¿Cobran por la valuación?", a: "No, la valuación es completamente gratuita y sin compromiso." },
              { q: "¿Puedo vender mi oro directamente?", a: "Sí, compramos oro, plata y diamantes al mejor precio del mercado." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                <AccordionTrigger className="text-sm font-light tracking-wide hover:text-primary">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm font-light text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-xs uppercase tracking-[0.15em]">
            <Link to="/bazar/sucursales"><MapPin className="mr-2 h-4 w-4" /> Visita tu sucursal</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-muted px-8 text-xs uppercase tracking-[0.15em]">
            <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Bazar;
