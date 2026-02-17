import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
import GoldSparkles from "./GoldSparkles";
import CustomCursor from "./CustomCursor";
import CinematicIntro from "./CinematicIntro";

const bazarNav = [
  { label: "Inicio", href: "/bazar" },
  { label: "Simuladores", href: "/bazar/simuladores" },
  { label: "Sucursales", href: "/bazar/sucursales" },
];

const BazarLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [introShown, setIntroShown] = useState(true);
  const location = useLocation();

  return (
    <div className="bazar-theme flex min-h-screen flex-col bg-background text-foreground">
      {introShown && <CinematicIntro variant="bazar" onComplete={() => setIntroShown(false)} />}
      <GoldSparkles maxSparkles={14} />
      <CustomCursor />
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          {/* Hamburger left */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
            <span className="hidden text-xs font-medium uppercase tracking-[0.2em] md:inline">Menú</span>
          </button>

          {/* Logo center */}
          <Link to="/bazar" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-gold-gradient text-lg font-light uppercase tracking-[0.3em]">
              Centenario
            </span>
          </Link>

          {/* CTA right */}
          <div className="flex items-center gap-3">
            <Link
              to="/bazar/simuladores"
              className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/70 transition-colors hover:text-primary"
            >
              Cotizar
            </Link>
          </div>
        </div>
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
              className="fixed inset-0 z-[60] bg-black/70"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 z-[70] flex h-full w-72 flex-col bg-background p-8 md:w-80"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="mb-12 self-end text-foreground/50 transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-1 flex-col gap-1">
                {bazarNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 text-2xl font-light tracking-wide transition-colors hover:text-primary ${
                      location.pathname === item.href ? "text-primary" : "text-foreground/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="space-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block uppercase tracking-[0.15em] transition-colors hover:text-foreground"
                >
                  ← Volver al inicio
                </Link>
                <Link
                  to="/joyeria"
                  onClick={() => setMenuOpen(false)}
                  className="block uppercase tracking-[0.15em] transition-colors hover:text-foreground"
                >
                  Joyería Centenario →
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="flex-1 pt-16">
        <AnimatedOutlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <span className="text-gold-gradient text-sm font-light uppercase tracking-[0.25em]">
                Centenario
              </span>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Casa de empeño y compra de metales preciosos con más de 25 años de experiencia.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground">Servicios</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/bazar" className="transition-colors hover:text-primary">Empeño y compra</Link></li>
                <li><Link to="/bazar/simuladores" className="transition-colors hover:text-primary">Simuladores</Link></li>
                <li><Link to="/bazar/sucursales" className="transition-colors hover:text-primary">Sucursales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground">Contacto</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Phone className="h-3 w-3" /> (555) 123-4567</li>
                <li>bazar@centenario.mx</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground">Horarios</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>Lun — Sáb: 9:00 — 18:00</li>
                <li>Dom: Cerrado</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Bazar Centenario. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      {/* CTA sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/bazar/simuladores">Cotizar</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 border-border text-foreground">
            <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BazarLayout;
