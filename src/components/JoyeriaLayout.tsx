import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { Menu, X, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import GoldSparkles from "./GoldSparkles";
import CustomCursor from "./CustomCursor";
import { useIsMobile } from "@/hooks/use-mobile";
import CinematicIntro from "./CinematicIntro";
import { useCart } from "@/contexts/CartContext";
import logoJoyeria from "@/assets/logo-joyeria.png";

const joyeriaNav = [
  { label: "Inicio", href: "/joyeria" },
  { label: "Catálogo", href: "/joyeria/catalogo" },
  { label: "Relojes", href: "/joyeria/catalogo?tipo=relojes" },
  { label: "Carrito", href: "/joyeria/carrito" },
];

/* ── Gold sparkle burst around cart icon ── */
const CartSparkle = ({ active }: { active: boolean }) => {
  if (!active) return null;
  const particles = Array.from({ length: 8 });
  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 22;
        const ty = Math.sin(rad) * 22;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1, x: tx, y: ty }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "hsl(var(--gold))", boxShadow: "0 0 4px hsl(var(--gold))" }}
          />
        );
      })}
    </div>
  );
};

const JoyeriaLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introShown, setIntroShown] = useState(true);
  const [sparkleKey, setSparkleKey] = useState(0);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { items, addPulse } = useCart();
  const isFirstRender = useRef(true);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  // Trigger sparkle animation when addPulse changes (skip initial render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (addPulse > 0) {
      setSparkleKey((k) => k + 1);
    }
  }, [addPulse]);

  return (
    <div className="joyeria-theme flex min-h-screen flex-col bg-background text-foreground">
      {introShown && <CinematicIntro variant="joyeria" onComplete={() => setIntroShown(false)} />}
      <GoldSparkles maxSparkles={14} />
      {!isMobile && <CustomCursor />}
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-6 md:px-10">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-foreground/60 transition-colors hover:text-foreground"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo center */}
          <Link to="/joyeria" className="absolute left-1/2 -translate-x-1/2">
            <img src={logoJoyeria} alt="Joyería Centenario" className="h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
          </Link>

          {/* Cart right — with sparkle animation */}
          <Link to="/joyeria/carrito" className="relative text-foreground/60 transition-colors hover:text-foreground">
            <motion.div
              key={sparkleKey}
              animate={sparkleKey > 0 ? { scale: [1, 1.35, 1], rotate: [0, -15, 15, 0] } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Gem className="h-5 w-5" strokeWidth={1.5} />
            </motion.div>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                style={{ background: "hsl(var(--gold))", color: "hsl(var(--gold-foreground))" }}
              >
                {totalItems}
              </motion.span>
            )}
            <CartSparkle active={sparkleKey > 0} key={`sparkle-${sparkleKey}`} />
          </Link>
        </div>
        <div className="mx-6 h-px bg-border md:mx-10" />
      </header>

      {/* Slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 z-[70] flex h-full w-72 flex-col bg-background p-8"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="mb-12 self-end text-foreground/40 transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-1 flex-col gap-1">
                {joyeriaNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 text-xl transition-colors hover:text-foreground ${
                      (item.href.includes("?") ? location.pathname + location.search === item.href : location.pathname === item.href) ? "text-foreground" : "text-muted-foreground"
                    }`}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block transition-colors hover:text-foreground"
                >
                  Volver al inicio
                </Link>
                <Link
                  to="/bazar"
                  onClick={() => setMenuOpen(false)}
                  className="block transition-colors hover:text-foreground"
                >
                  Bazar Centenario
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 pt-14">
        <AnimatedOutlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="grid gap-10 text-sm md:grid-cols-4">
            <div>
              <img src={logoJoyeria} alt="Joyería Centenario" className="mb-4 h-12 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/joyeria/catalogo" className="transition-colors hover:text-foreground">Catálogo</Link></li>
                <li><Link to="/joyeria/relojes" className="transition-colors hover:text-foreground">Relojes</Link></li>
                <li><Link to="/joyeria/carrito" className="transition-colors hover:text-foreground">Carrito</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Contacto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>871 688 4466</li>
                <li>joyeria@centenario.mx</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Dirección</h4>
              <p className="text-muted-foreground">Juan Antonio de la Fuente #139 Sur<br />Col. Centro, Torreón, Coah.</p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Explorar</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/bazar" className="transition-colors hover:text-foreground">Bazar Centenario</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pb-16 pt-6 text-center text-xs text-muted-foreground md:pb-0">
            <p>© {new Date().getFullYear()} Joyería Centenario</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default JoyeriaLayout;
