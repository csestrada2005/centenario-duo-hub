import { Link } from "react-router-dom";
import { useRef } from "react";
import heroBazar from "@/assets/hero-bazar.jpg";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Smartphone, Laptop, Wrench, Car, Tv, CircleDollarSign,
  Gem, Shield, MapPin, MessageCircle, Package, ChevronDown, Sparkles,
} from "lucide-react";
import GoldCursorGlow from "@/components/GoldCursorGlow";
import GoldSparkles from "@/components/GoldSparkles";
import MagneticText from "@/components/MagneticText";

/* ── Scroll-triggered reveal ── */
const Reveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial = {
    opacity: 0,
    x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
    y: direction === "up" ? 40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Parallax floating element ── */
const FloatLayer = ({
  children,
  className = "",
  speed = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Bazar = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroContentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);

  return (
    <div>
      {/* ═══ Hero fullwidth with real parallax ═══ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
          <img src={heroBazar} alt="" className="h-[130%] w-full object-cover opacity-50" loading="eager" />
        </motion.div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-[hsl(var(--background))]" />
        <GoldCursorGlow size={400} opacity={0.15} />
        <GoldSparkles maxSparkles={10} />

        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="mb-6 text-xs font-medium uppercase tracking-[0.35em] text-white/50">
              Casa de empeño y compra de metales preciosos
            </motion.p>
            <motion.div variants={fadeUp}>
              <MagneticText
                intensity={0.15}
                className="text-5xl font-light leading-[1.1] md:text-7xl lg:text-8xl"
              >
                <h1
                  className="text-gold-gradient"
                  style={{ filter: "drop-shadow(0 0 30px rgba(212,175,55,0.3))" }}
                >
                  Bazar Centenario
                </h1>
              </MagneticText>
            </motion.div>
            <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-white/60 md:text-base">
              Empeña tus artículos o vende tu oro, plata y diamantes. Sin complicaciones, con total transparencia.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="gold" className="group px-8">
                <Link to="/bazar/simuladores">
                  <CircleDollarSign className="mr-2 h-4 w-4 group-hover:rotate-12" /> Cotizar ahora
                </Link>
              </Button>
              <Button asChild size="lg" variant="goldOutline" className="group px-8">
                <Link to="/bazar/sucursales">
                  <MapPin className="mr-2 h-4 w-4 group-hover:scale-110" /> Ver sucursales
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-[hsl(46,56%,51%)]/50" />
        </motion.div>
      </section>

      {/* ═══ Cómo funciona — cards slide in from sides ═══ */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-16 text-center">
            <MagneticText as="h2" intensity={0.2} className="text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
              Cómo funciona
            </MagneticText>
          </Reveal>
          <div className="grid gap-16 md:grid-cols-3">
            {[
              { icon: Package, title: "Trae tu artículo", desc: "Lleva tu artículo o metal precioso a cualquier sucursal.", dir: "left" as const },
              { icon: CircleDollarSign, title: "Valuación gratuita", desc: "Nuestros expertos lo evalúan sin costo ni compromiso.", dir: "up" as const },
              { icon: ArrowRight, title: "Recibe tu dinero", desc: "Obtén tu dinero en el momento, de forma segura.", dir: "right" as const },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.12} direction={step.dir} className="text-center">
                <FloatLayer speed={0.15}>
                  <step.icon className="mx-auto h-8 w-8 text-primary" strokeWidth={1} />
                </FloatLayer>
                <h3 className="mt-6 text-lg font-light uppercase tracking-[0.1em]">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Servicios — slide in from left/right ═══ */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-16 text-center">
            <MagneticText as="h2" intensity={0.2} className="text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
              Nuestros servicios
            </MagneticText>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-2">
            <Reveal direction="left" className="group">
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
            </Reveal>
            <Reveal direction="right" delay={0.1} className="group">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ Simula fácil — icons with staggered entrance + float ═══ */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-16 text-center">
            <MagneticText as="h2" intensity={0.2} className="text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
              Simula fácil
            </MagneticText>
          </Reveal>
          <div className="grid grid-cols-3 gap-6 md:grid-cols-6">
            {[
              { icon: Smartphone, label: "Celular" },
              { icon: Laptop, label: "Laptop" },
              { icon: Wrench, label: "Herramienta" },
              { icon: Tv, label: "Electro" },
              { icon: Car, label: "Auto" },
              { icon: Gem, label: "Metales" },
            ].map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.08}>
                <Link
                  to={cat.label === "Metales" ? "/bazar/simuladores?tab=metales" : "/bazar/simuladores"}
                  className="group flex flex-col items-center gap-3 py-6 text-center transition-colors"
                >
                  <FloatLayer speed={0.1 + i * 0.03}>
                    <cat.icon className="h-7 w-7 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:scale-110" strokeWidth={1} />
                  </FloatLayer>
                  <span className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors group-hover:text-foreground">{cat.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Confianza — shield floats at different speed ═══ */}
      <section className="px-6 py-28 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <FloatLayer speed={0.25}>
            <Shield className="mx-auto h-10 w-10 text-primary" strokeWidth={1} />
          </FloatLayer>
          <MagneticText as="h2" intensity={0.15} className="mt-8 text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">Tu tranquilidad es nuestra prioridad</MagneticText>
          <p className="mt-6 text-sm font-light leading-relaxed text-muted-foreground">
            Más de 25 años brindando un servicio profesional, seguro y sin juicios. Tu confianza es lo más importante.
          </p>
        </Reveal>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="px-6 py-28 md:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-16 text-center">
            <MagneticText as="h2" intensity={0.2} className="text-3xl font-light uppercase tracking-[0.1em] md:text-4xl">
              Preguntas frecuentes
            </MagneticText>
          </Reveal>
          {[
            { q: "¿Qué requisitos necesito para empeñar?", a: "Solo necesitas una identificación oficial vigente y el artículo a empeñar." },
            { q: "¿Cuánto tiempo tengo para pagar mi empeño?", a: "El plazo estándar es de 30 días, con posibilidad de refrendar." },
            { q: "¿Qué artículos aceptan?", a: "Electrónicos, herramientas, autos, electrodomésticos, oro, plata y diamantes." },
            { q: "¿Cómo calculan el valor de mi artículo?", a: "Nuestros valuadores certificados evalúan marca, estado y mercado actual." },
            { q: "¿Cobran por la valuación?", a: "No, la valuación es completamente gratuita y sin compromiso." },
            { q: "¿Puedo vender mi oro directamente?", a: "Sí, compramos oro, plata y diamantes al mejor precio del mercado." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.06} direction={i % 2 === 0 ? "left" : "right"}>
              <Accordion type="single" collapsible>
                <AccordionItem value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm font-light tracking-wide hover:text-primary">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm font-light text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ CTA final ═══ */}
      <section className="px-6 py-28 md:px-10">
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Button asChild size="lg" variant="gold" className="group px-8">
            <Link to="/bazar/sucursales">
              <MapPin className="mr-2 h-4 w-4 group-hover:bounce" /> Visita tu sucursal
            </Link>
          </Button>
          <Button asChild variant="goldOutline" size="lg" className="group px-8">
            <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110" /> WhatsApp
            </a>
          </Button>
        </Reveal>
      </section>
    </div>
  );
};

export default Bazar;
