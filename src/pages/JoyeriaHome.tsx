import { Link } from "react-router-dom";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/joyeria-hero.jpg";
import feat1 from "@/assets/joyeria-featured-1.jpg";
import feat2 from "@/assets/joyeria-featured-2.jpg";
import galleryJewelry from "@/assets/gallery-jewelry-1.jpg";
import galleryHands from "@/assets/gallery-hands.jpg";
import galleryStore from "@/assets/gallery-store.jpg";

/* ── Scroll reveal wrapper ── */
const Reveal = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const mockFeatured = [
  { id: "prod-1", name: "Anillo Eternity", material: "Oro 18k", price: 12500, img: feat1 },
  { id: "prod-2", name: "Brazalete Lune", material: "Plata 925", price: 4800, img: feat2 },
  { id: "prod-3", name: "Collar Prestige", material: "Oro 14k", price: 18900, img: galleryJewelry },
  { id: "prod-4", name: "Pendientes Aura", material: "Oro 18k", price: 7200, img: galleryHands },
  { id: "prod-5", name: "Anillo Solstice", material: "Plata 925", price: 3400, img: galleryStore },
];

const JoyeriaHome = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div>
      {/* ═══════ HERO — Split editorial ═══════ */}
      <section ref={heroRef} className="relative grid min-h-screen md:grid-cols-2">
        {/* Left — Typography */}
        <div className="flex flex-col justify-end px-8 pb-20 pt-32 md:justify-center md:px-16 md:pb-0 md:pt-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
              Colección 2026
            </p>
            <h1
              className="text-5xl font-normal leading-[1.05] text-foreground md:text-7xl lg:text-[90px]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              The Art<br />
              of Gold
            </h1>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">
              Piezas artesanales que capturan la esencia del lujo contemporáneo. Cada creación es única, cada detalle importa.
            </p>
            <Link
              to="/joyeria/catalogo"
              className="group mt-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              Shop Collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right — Image with parallax */}
        <div className="relative overflow-hidden">
          <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
            <img
              src={heroImg}
              alt="Anillo de oro sobre mármol"
              className="h-[120%] w-full object-cover"
              loading="eager"
            />
          </motion.div>
          {/* Soft edge blending on mobile */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent md:hidden" />
        </div>
      </section>

      {/* ═══════ FEATURED COLLECTION — Editorial grid ═══════ */}
      <section className="px-8 py-32 md:px-16">
        <Reveal>
          <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
            Discover
          </p>
          <h2
            className="mt-3 text-4xl font-normal md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Piezas destacadas
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {mockFeatured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Link to={`/joyeria/${p.id}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">Ver detalle</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-sm" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{p.name}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{p.material}</p>
                  <p className="mt-1 text-sm">${p.price.toLocaleString()} MXN</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 text-center">
          <Link
            to="/joyeria/catalogo"
            className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
          >
            Ver todo el catálogo
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* ═══════ COLLECTIONS — Two big blocks ═══════ */}
      <section className="grid md:grid-cols-2">
        {[
          { title: "Anillos", desc: "Diseños que marcan momentos eternos", img: feat1, link: "/joyeria/catalogo" },
          { title: "Collares", desc: "Elegancia que enmarca cada gesto", img: feat2, link: "/joyeria/catalogo" },
        ].map((col, i) => (
          <Reveal key={col.title} delay={i * 0.1}>
            <Link to={col.link} className="group relative block aspect-square overflow-hidden md:aspect-auto md:h-[80vh]">
              <img
                src={col.img}
                alt={col.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
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
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* ═══════ STORY / ATELIER ═══════ */}
      <section className="px-8 py-32 md:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <Reveal>
            <img
              src={galleryStore}
              alt="Interior del atelier"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground">
              Nuestra historia
            </p>
            <h2
              className="mt-3 text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              El Atelier Centenario
            </h2>
            <p className="mt-6 text-sm font-light leading-[1.8] text-muted-foreground">
              Desde hace más de un siglo, cada pieza que sale de nuestro taller lleva consigo la dedicación de artesanos expertos. Trabajamos con los materiales más nobles — oro, plata, diamantes — para crear joyas que trascienden generaciones.
            </p>
            <p className="mt-4 text-sm font-light leading-[1.8] text-muted-foreground">
              Nuestro compromiso es simple: calidad sin concesiones, diseño atemporal y un servicio que honra la confianza de cada cliente.
            </p>
            <Link
              to="/joyeria/catalogo"
              className="group mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary"
            >
              Descubrir más
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════ NEWSLETTER ═══════ */}
      <section className="px-8 py-28 md:px-16">
        <Reveal className="mx-auto max-w-lg text-center">
          <h2
            className="text-3xl font-normal md:text-4xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Mantente al día
          </h2>
          <p className="mt-4 text-sm font-light text-muted-foreground">
            Recibe novedades sobre nuevas colecciones y eventos exclusivos.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex items-center gap-0"
          >
            <input
              type="email"
              placeholder="tu@email.com"
              className="h-12 flex-1 border-b border-border bg-transparent px-0 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 px-6 text-xs font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:text-primary"
            >
              Suscribir
            </button>
          </form>
        </Reveal>
      </section>
    </div>
  );
};

export default JoyeriaHome;
