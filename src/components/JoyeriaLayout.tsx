import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { Menu, X, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import GoldSparkles from "./GoldSparkles";
import CustomCursor from "./CustomCursor";
import { useIsMobile } from "@/hooks/use-mobile";
import CinematicIntro from "./CinematicIntro";

const joyeriaNav = [
  { label: "Inicio", href: "/joyeria" },
  { label: "Catálogo", href: "/joyeria/catalogo" },
  { label: "Relojes", href: "/joyeria/relojes" },
  { label: "Carrito", href: "/joyeria/carrito" },
];

const JoyeriaLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introShown, setIntroShown] = useState(true);
  const location = useLocation();

  return (
    <div className="joyeria-theme flex min-h-screen flex-col bg-background text-foreground">
      {introShown && <CinematicIntro variant="joyeria" onComplete={() => setIntroShown(false)} />}
      <GoldSparkles maxSparkles={14} />
      <CustomCursor />
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
          <Link to="/joyeria" className="absolute left-1/2 -translate-x-1/2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            <span className="text-lg tracking-[0.1em] text-foreground">Centenario</span>
          </Link>

          {/* Cart right */}
          <Link to="/joyeria/carrito" className="text-foreground/60 transition-colors hover:text-foreground">
            <Gem className="h-5 w-5" strokeWidth={1.5} />
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
                      location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
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
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Información</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/joyeria/catalogo" className="transition-colors hover:text-foreground">Catálogo</Link></li>
                <li><Link to="/joyeria/carrito" className="transition-colors hover:text-foreground">Carrito</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Contacto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>(555) 123-4567</li>
                <li>joyeria@centenario.mx</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Dirección</h4>
              <p className="text-muted-foreground">Av. Principal #100<br />Col. Centro, Ciudad</p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-foreground">Explorar</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/bazar" className="transition-colors hover:text-foreground">Bazar Centenario</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Joyería Centenario</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default JoyeriaLayout;
