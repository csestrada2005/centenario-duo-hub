import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Gem, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticText from "@/components/MagneticText";
import { products } from "@/data/products";
import heroImg from "@/assets/joyeria-hero.jpg";
import galleryJewelry from "@/assets/gallery-jewelry-1.jpg";
import galleryHands from "@/assets/gallery-hands.jpg";

/* ── Directional scroll reveal ── */
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

/* ── Parallax floating layer ── */
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

/* ── Parallax image with independent speed ── */
const ParallaxImage = ({
  src,
  alt,
  className = "",
  speed = 0.15,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, -speed * 200]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="h-[120%] w-full object-cover will-change-transform"
      />
    </div>
  );
};

const featuredIds = ["cad-1", "an-1", "vcanda-1", "pul-1", "dije-1"];
const featuredProducts = featuredIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean);

const JoyeriaHome = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.45], [0, -80]);

  return (
    <div className="overflow-x-hidden">
      {/* ═══════ HERO — Split editorial with parallax ═══════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background image — full on mobile, right half on desktop */}
        <div className="absolute inset-0 md:left-1/2 overflow-hidden">
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 will-change-transform">
            <img
              src={heroImg}
              alt="Cadenas de oro"
              className="h-[140%] w-full object-cover"
              loading="eager"
            />
          </motion.div>
          {/* Dark overlay for text readability on mobile */}
          <div className="absolute inset-0 bg-black/50 md:bg-transparent" />
        </div>

        {/* Desktop: left half solid bg */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 bg-background md:block" />

        {/* Text */}
        <div className="relative z-10 grid min-h-screen md:grid-cols-2">
          <div className="flex flex-col items-center justify-end text-center px-8 pt-28 pb-16 md:items-start md:text-left md:justify-center md:px-16 md:pb-0 md:pt-0">
            <motion.div style={{ opacity: heroTextOpacity, y: heroTextY }}>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-white/70 md:text-muted-foreground"
              >
                Colección 2026
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <MagneticText
                  as="h1"
                  intensity={0.12}
                  className="text-4xl font-normal leading-[1.05] text-white md:text-foreground sm:text-5xl md:text-7xl lg:text-[90px]"
                >
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Eterno, Especial,<br />Tuyo.
                  </span>
                </MagneticText>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 max-w-sm text-sm font-light leading-relaxed text-white/70 md:text-muted-foreground"
              >
                Piezas especiales que trascienden generaciones sin perder el brillo del ahora.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Button asChild variant="editorial" size="lg" className="group mt-10">
                  <Link to="/joyeria/catalogo">
                    <Gem className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    Ver Colección
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURED COLLECTION — staggered with directions ═══════ */}
      <section className="px-8 py-32 md:px-16">
        <Reveal direction="left">
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Descubrir
          </p>
          <MagneticText
            as="h2"
            intensity={0.18}
            className="mt-3 text-4xl font-normal md:text-5xl"
          >
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Piezas destacadas</span>
          </MagneticText>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {featuredProducts.map((p, i) => (
            <Reveal key={p!.id} delay={i * 0.1} direction={i % 2 === 0 ? "up" : "right"}>
              <Link to={`/joyeria/${p!.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <FloatLayer speed={0.08 + i * 0.02} className="h-full">
                    <img
                      src={p!.image}
                      alt={p!.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.classList.add('bg-muted', 'flex', 'items-center', 'justify-center'); }}
                    />
                  </FloatLayer>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">Ver detalle</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{p!.name}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{p!.karat || p!.category}</p>
                  <p className="mt-1 text-sm">{p!.price ? `$${p!.price.toLocaleString()} MXN` : "Precio a consultar"}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={0.2}>
          <Button asChild variant="editorialOutline" size="lg" className="group">
            <Link to="/joyeria/catalogo">
              <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Ver todo el catálogo
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* ═══════ COLLECTIONS — Two blocks with parallax images ═══════ */}
      <section className="grid md:grid-cols-2">
        {[
          { title: "Anillos", desc: "Diseños que marcan momentos eternos", img: "/lote2/AN-1.jpg", link: "/joyeria/catalogo?categoria=Anillos", dir: "left" as const },
          { title: "Collares", desc: "Elegancia que enmarca cada gesto", img: "/lote4/VCA-1.jpg", link: "/joyeria/catalogo?categoria=Collares", dir: "right" as const },
        ].map((col, i) => (
          <Reveal key={col.title} delay={i * 0.15} direction={col.dir}>
            <Link to={col.link} className="group relative block aspect-square overflow-hidden md:aspect-auto md:h-[80vh]">
              <ParallaxImage src={col.img} alt={col.title} className="absolute inset-0" speed={0.12} />
              <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                <FloatLayer speed={0.08}>
                  <h3
                    className="text-3xl font-normal md:text-4xl"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {col.title}
                  </h3>
                  <p className="mt-2 text-xs font-light text-white/70">{col.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/60 transition-colors duration-300 group-hover:text-white">
                    Explorar <ArrowRight className="h-3 w-3" />
                  </span>
                </FloatLayer>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* ═══════ STORY / ATELIER — image parallax + text from right ═══════ */}
      <section className="px-8 py-32 md:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <Reveal direction="left">
            <ParallaxImage
              src={galleryHands}
              alt="Artesano trabajando joyería en el atelier"
              className="aspect-[4/5] w-full"
              speed={0.18}
            />
          </Reveal>
          <Reveal delay={0.15} direction="right">
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
              Nuestra historia
            </p>
            <MagneticText
              as="h2"
              intensity={0.15}
              className="mt-3 text-3xl font-normal md:text-4xl"
            >
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>El Atelier Centenario</span>
            </MagneticText>
            <p className="mt-6 text-sm font-light leading-[1.8] text-muted-foreground">
              Somos un taller contemporáneo y artesano, en donde no solo encontrarás piezas de las marcas más sofisticadas del mercado, también trabajamos con los materiales más nobles: Oro, Plata, Diamantes, para crear una pieza a tu medida que trascienda generaciones. Nuestro compromiso, simple: calidad sin excepción, un diseño a tu medida, servicio de confianza.
            </p>
            <Button asChild variant="editorialOutline" className="group mt-8">
              <Link to="/joyeria/catalogo">
                Descubrir más
                <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ═══════ NEWSLETTER ═══════ */}
      <section className="px-8 py-28 md:px-16">
        <Reveal className="mx-auto max-w-lg text-center">
          <FloatLayer speed={0.1}>
            <MagneticText
              as="h2"
              intensity={0.15}
              className="text-3xl font-normal md:text-4xl"
            >
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Mantente al día</span>
            </MagneticText>
          </FloatLayer>
          <p className="mt-4 text-sm font-light text-muted-foreground">
            Recibe novedades sobre nuevas colecciones y eventos exclusivos.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-0"
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="h-12 flex-1 border-b border-border bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            <Button
              type="submit"
              variant="editorial"
              className="group h-12 px-6"
            >
              Suscribir
              <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </form>
        </Reveal>
      </section>
    </div>
  );
};

export default JoyeriaHome;
