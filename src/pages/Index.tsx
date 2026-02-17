import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronDown, Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import CinematicIntro from "@/components/CinematicIntro";
import heroImage from "@/assets/hero-home.jpg";
import galleryJewelry from "@/assets/gallery-jewelry-1.jpg";
import galleryMetals from "@/assets/gallery-metals.jpg";
import galleryHands from "@/assets/gallery-hands.jpg";
import galleryStore from "@/assets/gallery-store.jpg";

/* ── Animated Counter ── */
const AnimatedCounter = ({ target, suffix = "", duration = 2500 }: { target: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

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

/* ── 3D Coin with mouse tracking ── */
const Coin3D = ({ to, title, subtitle, delay }: { to: string; title: string; subtitle: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const px = (e.clientX - cx) / (rect.width / 2);
    const py = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(px * 25);
    rotateX.set(-py * 25);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <Link to={to} className="group relative" style={{ perspective: "500px" }}>
      <motion.div
        ref={ref}
        initial={{ y: -160, opacity: 0, rotateX: 70 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          y: { delay, type: "spring", stiffness: 280, damping: 16, mass: 1.4 },
          opacity: { delay, duration: 0.4 },
        }}
        style={{ rotateX: smoothX, rotateY: smoothY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-56 w-56 cursor-pointer items-center justify-center rounded-full md:h-72 md:w-72"
      >
        {/* 3D depth layers */}
        {[16, 12, 8, 4].map((z, i) => (
          <div
            key={z}
            className="absolute inset-0 rounded-full"
            style={{
              transform: `translateZ(-${z}px)`,
              background: `linear-gradient(${170 + i * 10}deg, rgba(212,175,55,${0.2 + i * 0.08}) 0%, rgba(140,110,30,${0.3 + i * 0.06}) 100%)`,
              boxShadow: i === 0 ? "0 16px 40px rgba(0,0,0,0.6), 0 6px 16px rgba(212,175,55,0.2)" : "none",
            }}
          />
        ))}
        <div className="absolute inset-0 rounded-full shadow-[0_0_60px_16px_rgba(212,175,55,0.25),inset_0_0_50px_rgba(212,175,55,0.1)] transition-shadow duration-700 group-hover:shadow-[0_0_90px_24px_rgba(212,175,55,0.4),inset_0_0_60px_rgba(212,175,55,0.2)]" />
        <div className="absolute inset-0 rounded-full border-[4px] border-[hsl(46,56%,51%)]/55 transition-all duration-500 group-hover:border-[hsl(46,56%,51%)]/85" />
        <div className="absolute inset-[5px] rounded-full border-[2.5px] border-[hsl(46,56%,51%)]/30 transition-all duration-500 group-hover:border-[hsl(46,56%,51%)]/50" />
        <div
          className="absolute inset-[9px] rounded-full transition-all duration-700"
          style={{
            background: "radial-gradient(ellipse at 30% 25%, rgba(255,223,100,0.4) 0%, rgba(212,175,55,0.35) 25%, rgba(180,150,40,0.35) 50%, rgba(160,130,35,0.3) 75%, rgba(140,110,30,0.3) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        />
        <div
          className="absolute inset-[9px] rounded-full opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(ellipse at 25% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 30%, transparent 55%)" }}
        />
        <div
          className="absolute inset-[9px] rounded-full"
          style={{ background: "radial-gradient(ellipse at 75% 80%, rgba(0,0,0,0.2) 0%, transparent 50%)" }}
        />
        <div className="absolute inset-[18px] rounded-full border-[2.5px] border-[hsl(46,56%,51%)]/25 md:inset-[24px]" />
        <div className="absolute inset-[23px] rounded-full border-[1.5px] border-[hsl(46,56%,51%)]/15 md:inset-[29px]" />
        <div
          className="absolute inset-[28px] rounded-full md:inset-[34px]"
          style={{ boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.2)" }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-center" style={{ transform: "translateZ(6px)" }}>
          <h2
            className="text-3xl font-light uppercase tracking-[0.2em] text-white md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              textShadow: "0 2px 10px rgba(212,175,55,0.4), 0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </h2>
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em] text-white"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.7)" }}
          >
            {subtitle}
          </p>
        </div>
      </motion.div>
    </Link>
  );
};


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
            className="text-gold-gradient mx-auto text-7xl font-light md:text-[120px] lg:text-[150px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              letterSpacing: "0.08em",
              filter: "drop-shadow(0 0 35px rgba(212,175,55,0.5))",
              textShadow: "0 2px 12px rgba(212,175,55,0.4), 0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            Centenario
          </motion.h1>

          {/* Two doors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-28 flex flex-col items-center gap-12 md:flex-row md:justify-center md:gap-20"
          >
            <Coin3D to="/bazar" title="Bazar" subtitle="Casa de Empeño" delay={0.8} />
            <Coin3D to="/joyeria" title="Joyería" subtitle="Centenario" delay={1.1} />
          </motion.div>
        </motion.div>

        {/* Animated scroll arrow */}
        <motion.button
          onClick={scrollToContent}
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 cursor-pointer border-none bg-transparent"
          aria-label="Scroll hacia abajo"
        >
          <ChevronDown className="h-6 w-6 text-[hsl(46,56%,51%)]" style={{ opacity: 0.6 }} />
        </motion.button>
      </section>

      {/* ═══════════ STATS — Animated Counters ═══════════ */}
      <section id="stats-section" className="px-6 py-32">
        <div className="mx-auto grid max-w-4xl gap-16 md:grid-cols-3">
          {[
            { value: 100, suffix: "+", label: "Años de trayectoria" },
            { value: 5000, suffix: "+", label: "Piezas en catálogo" },
            { value: 10000, suffix: "+", label: "Clientes satisfechos" },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.15} className="text-center">
              <p
                className="text-gold-gradient text-5xl font-light md:text-6xl"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  filter: "drop-shadow(0 0 12px rgba(212,175,55,0.2))",
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/40">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══════════ GALLERY — M.Fisher Parallax Grid ═══════════ */}
      <section className="px-6 py-32">
        <ScrollReveal className="mb-20 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/30">Nuestra esencia</p>
          <h2
            className="text-gold-gradient mt-4 text-4xl font-light md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Galería
          </h2>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <GalleryImage src={galleryJewelry} alt="Colección de joyería premium" label="Joyería" offset={30} />
          <GalleryImage src={galleryMetals} alt="Metales preciosos" label="Metales" offset={20} />
          <GalleryImage src={galleryHands} alt="Elegancia en cada detalle" label="Detalle" offset={10} />
          <GalleryImage src={galleryStore} alt="Interior de sucursal" label="Sucursal" offset={0} />
        </div>
      </section>

      {/* ═══════════ FOOTER — Multi-column Premium ═══════════ */}
      <footer className="px-6 pb-12 pt-32">
        <div className="mx-auto max-w-5xl">
          {/* Divider */}
          <div className="mb-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid gap-12 text-sm md:grid-cols-5">
            {/* Brand */}
            <div className="md:col-span-2">
              <ScrollReveal>
                <h3
                  className="text-gold-gradient text-2xl font-light"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Centenario
                </h3>
                <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-white/35">
                  Más de un siglo de tradición en joyería fina y servicios financieros de confianza.
                </p>
              </ScrollReveal>
            </div>

            {/* Información */}
            <ScrollReveal delay={0.1}>
              <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Información</h4>
              <ul className="space-y-3">
                {[
                  { to: "/bazar", label: "Bazar" },
                  { to: "/joyeria", label: "Joyería" },
                  { to: "/bazar/simuladores", label: "Simuladores" },
                  { to: "/bazar/sucursales", label: "Sucursales" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group relative inline-block text-xs font-light text-white/40 transition-colors duration-300 hover:text-[hsl(46,56%,51%)]"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 h-px w-0 bg-[hsl(46,56%,51%)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Horarios */}
            <ScrollReveal delay={0.2}>
              <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Horarios</h4>
              <ul className="space-y-3 text-xs font-light text-white/40">
                <li className="flex items-start gap-2"><Clock className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(46,56%,51%)]/50" /> Lun – Vie: 9:00 – 19:00</li>
                <li className="flex items-start gap-2"><Clock className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(46,56%,51%)]/50" /> Sáb: 10:00 – 15:00</li>
                <li className="flex items-start gap-2"><Clock className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(46,56%,51%)]/50" /> Dom: Cerrado</li>
              </ul>
            </ScrollReveal>

            {/* Contacto */}
            <ScrollReveal delay={0.3}>
              <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">Contacto</h4>
              <ul className="space-y-3 text-xs font-light text-white/40">
                <li className="flex items-start gap-2"><Phone className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(46,56%,51%)]/50" /> (555) 123-4567</li>
                <li className="flex items-start gap-2"><Mail className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(46,56%,51%)]/50" /> contacto@centenario.mx</li>
                <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-3 w-3 shrink-0 text-[hsl(46,56%,51%)]/50" /> Cd. de México, MX</li>
              </ul>
              {/* Social */}
              <div className="mt-6 flex gap-4">
                <a href="#" className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-[hsl(46,56%,51%)]" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-white/30 transition-all duration-300 hover:scale-110 hover:text-[hsl(46,56%,51%)]" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center gap-2 text-center">
            <div className="h-px w-24 bg-white/8" />
            <p className="mt-4 text-[10px] font-light tracking-[0.15em] text-white/20">
              &copy; {new Date().getFullYear()} Centenario. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
