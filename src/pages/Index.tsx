import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import CinematicIntro from "@/components/CinematicIntro";
import { products } from "@/data/products";
import heroImage from "@/assets/hero-home.jpg";
import logoBazar from "@/assets/logo-bazar.png";
import logoJoyeria from "@/assets/logo-joyeria.png";

/* ── Gallery image with individual parallax ── */
const GalleryImage = ({ src, alt, label, offset }: { src: string; alt: string; label: string; offset: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative overflow-hidden"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.classList.add('bg-muted', 'flex', 'items-center', 'justify-center'); }}
      />
      <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/30" />
      <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-white">{label}</span>
      </div>
    </motion.div>
  );
};

/* ── Scroll-triggered section wrapper ── */
const ScrollReveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Logo Door with hover animation ── */
const LogoDoor = ({ to, logo, delay }: { to: string; logo: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const [landed, setLanded] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!landed) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(px * 15);
    rotateX.set(-py * 15);
  }, [rotateX, rotateY, landed]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <Link to={to} className="group relative flex flex-col items-center" style={{ perspective: "600px" }}>
      <motion.div
        ref={ref}
        initial={{ y: -400, opacity: 0, rotateY: 360, scale: 0.6 }}
        animate={{ y: 0, opacity: 1, rotateY: 0, scale: 1 }}
        transition={{
          y: { delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          opacity: { delay, duration: 0.3 },
          rotateY: { delay, duration: 1.2, ease: [0.22, 1, 0.36, 1] },
          scale: { delay: delay + 0.8, duration: 0.4, type: "spring", stiffness: 400, damping: 12 },
        }}
        onAnimationComplete={() => setLanded(true)}
        style={{ rotateX: landed ? smoothX : undefined, rotateY: landed ? smoothY : undefined, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-64 w-64 cursor-pointer items-center justify-center md:h-[360px] md:w-[360px]"
      >
        <img
          src={logo}
          alt=""
          className="h-full w-full object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-transform duration-500 group-hover:scale-110"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </motion.div>

      {/* Landing shadow */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        animate={{ opacity: 0.3, scaleX: 1 }}
        transition={{ delay: delay + 0.6, duration: 0.5, ease: "easeOut" }}
        className="mx-auto mt-2 h-4 w-32 rounded-full md:w-48"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)" }}
      />
    </Link>
  );
};
/* ── Mobile Logo Carousel ── */
const doors = [
  { to: "/bazar", logo: logoBazar, label: "Bazar Centenario" },
  { to: "/joyeria", logo: logoJoyeria, label: "Joyería Centenario" },
];

const MobileLogoCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((p) => (p + 1) % doors.length);
  const prev = () => setCurrent((p) => (p - 1 + doors.length) % doors.length);

  return (
    <div className="flex flex-col items-center md:hidden">
      <div className="flex w-full items-center justify-center gap-4">
        <button
          onClick={prev}
          className="rounded-full border border-white/15 p-2 text-white/50 transition-colors hover:border-[hsl(46,56%,51%)]/40 hover:text-[hsl(46,56%,51%)]"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="w-64 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: -current * 256 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {doors.map((door) => (
              <Link key={door.to} to={door.to} className="flex h-64 w-64 shrink-0 items-center justify-center">
                <img
                  src={door.logo}
                  alt={door.label}
                  className="h-64 w-64 object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] brightness-0 invert"
                />
              </Link>
            ))}
          </motion.div>
        </div>

        <button
          onClick={next}
          className="rounded-full border border-white/15 p-2 text-white/50 transition-colors hover:border-[hsl(46,56%,51%)]/40 hover:text-[hsl(46,56%,51%)]"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-4 flex gap-2">
        {doors.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-[hsl(46,56%,51%)]" : "w-1.5 bg-white/20"
            }`}
            aria-label={`Ir a ${doors[i].label}`}
          />
        ))}
      </div>
    </div>
  );
};

const galleryIds = ["cad-1", "an-1", "vcanda-1", "re-1"];
const galleryProducts = galleryIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p): p is NonNullable<typeof p> => Boolean(p));


const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToContent = useCallback(() => {
    document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="bg-[hsl(0,0%,4%)] text-[hsl(0,0%,96%)]">
      {!introDone && <CinematicIntro onComplete={() => setIntroDone(true)} />}

      {/* ═══════════ HERO — Parallax + Sequential Fade-in ═══════════ */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 will-change-transform">
          <img src={heroImage} alt="" className="h-[120%] w-full object-cover opacity-40" loading="eager" />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-[hsl(0,0%,4%)]" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center">
          {/* "Bienvenido" */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 text-[11px] font-medium uppercase tracking-[0.5em] text-white/60"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
          >
            Bienvenido
          </motion.p>

          {/* "Centenario" with gold glow */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gold-gradient mx-auto text-5xl font-light md:text-[120px] lg:text-[150px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0.08em",
              filter: "drop-shadow(0 0 35px rgba(212,175,55,0.5))",
              textShadow: "0 2px 12px rgba(212,175,55,0.4), 0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            Centenario
          </motion.h1>

          {/* Logo Carousel (mobile) / Two doors (desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 md:mt-28"
          >
            {/* Desktop: side by side */}
            <div className="hidden md:flex md:items-center md:justify-center md:gap-20">
              <LogoDoor to="/bazar" logo={logoBazar} delay={0.8} />
              <LogoDoor to="/joyeria" logo={logoJoyeria} delay={1.1} />
            </div>

            {/* Mobile: single-slot carousel with arrows */}
            <MobileLogoCarousel />
          </motion.div>
        </motion.div>

        {/* Animated scroll arrow */}
        <motion.button
          onClick={scrollToContent}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 cursor-pointer border-none bg-transparent hidden md:block"
          aria-label="Scroll hacia abajo"
        >
          <ChevronDown className="h-6 w-6 text-[hsl(46,56%,51%)]" style={{ opacity: 0.6 }} />
        </motion.button>
      </section>

      {/* ═══════════ COTIZACIÓN CTA ═══════════ */}
      <section id="stats-section" className="px-6 py-16 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/30">Servicios</p>
          <h2
            className="text-gold-gradient mt-4 text-3xl font-light md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Cotiza tus piezas
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-white/40">
            ¿Quieres saber cuánto vale tu oro, plata o reloj? Usa nuestros simuladores para obtener una cotización estimada al instante.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="group h-12 rounded-none border border-[hsl(46,56%,51%)]/40 bg-[hsl(46,56%,51%)]/10 px-8 text-[hsl(46,56%,51%)] hover:bg-[hsl(46,56%,51%)]/20">
              <Link to="/bazar/simuladores">
                <Calculator className="mr-2 h-4 w-4" />
                Simular cotización
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ GALERÍA — Piezas de Joyería ═══════════ */}
      <section className="px-6 py-16 md:py-32">
        <ScrollReveal className="mb-10 md:mb-20 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/30">Nuestra esencia</p>
          <h2
            className="text-gold-gradient mt-4 text-4xl font-light md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Galería
          </h2>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {galleryProducts.map((p, i) => (
            <Link key={p.id} to={`/joyeria/${p.id}`} className="group">
              <GalleryImage src={p.image} alt={p.name} label={p.name} offset={30 - i * 10} />
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════ BAZAR CENTENARIO ═══════════ */}
      <section className="px-6 py-16 md:py-28">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/30">Explora también</p>
          <h2
            className="text-gold-gradient mt-4 text-3xl font-light md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Bazar Centenario
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-white/40">
            Empeño, compra-venta de artículos de valor y servicios financieros de confianza. Más de un siglo respaldándonos.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="group h-12 rounded-none border border-white/15 bg-white/5 px-8 text-white/70 hover:bg-white/10 hover:text-white">
              <Link to="/bazar">
                Ir al Bazar
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>


    </div>
  );
};

export default Index;
