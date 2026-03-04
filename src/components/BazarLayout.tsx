import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppButton from "./WhatsAppButton";
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

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          {/* Hamburger left */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 text-foreground/70 transition-colors hover:text-foreground"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
            <span className="hidden text-xs font-semibold uppercase tracking-wider md:inline">Menú</span>
          </button>

          {/* Logo center */}
          <Link to="/bazar" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none">
            <span className="text-base font-extrabold tracking-tight text-foreground">
              Bazar Centenario
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary">Casa de empeño</span>
          </Link>

          {/* CTA right */}
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden bg-primary text-xs font-bold text-primary-foreground hover:bg-primary/90 md:flex">
              <Link to="/bazar/simuladores">Cotizar ahora</Link>
            </Button>
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
              className="fixed inset-0 z-[60] bg-black/50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-0 top-0 z-[70] flex h-full w-72 flex-col bg-card p-8 shadow-xl md:w-80"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-sm font-extrabold">Bazar Centenario</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                {bazarNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-lg px-3 py-3 text-sm font-semibold transition-colors hover:bg-primary/8 hover:text-primary ${
                      location.pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70"
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
                  className="block font-medium transition-colors hover:text-foreground"
                >
                  ← Volver al inicio
                </Link>
                <Link
                  to="/joyeria"
                  onClick={() => setMenuOpen(false)}
                  className="block font-medium transition-colors hover:text-foreground"
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
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <span className="text-sm font-extrabold">Bazar Centenario</span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Casa de empeño y compra de metales preciosos con más de 8 años de experiencia en el mercado. Rápido, seguro, confiable.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">Sucursales</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-1.5"><Phone className="h-3 w-3 mt-0.5 shrink-0" /><span><strong>Centro:</strong> Juan Antonio de la Fuente #139 Sur, Col. Centro, Torreón, Coah. — 871 688 4466</span></li>
                <li className="flex items-start gap-1.5"><Phone className="h-3 w-3 mt-0.5 shrink-0" /><span><strong>Hotel Francia:</strong> Av. Pdte Carranza Pte #1626, Col. Centro, Torreón, Coah. — 871 724 4614</span></li>
                <li className="flex items-start gap-1.5"><Phone className="h-3 w-3 mt-0.5 shrink-0" /><span><strong>Valladolid:</strong> Blvd. Libertad #740, Fracc. Valle de Nazas, Torreón, Coah. — 871 670 3634</span></li>
                <li className="flex items-start gap-1.5"><Phone className="h-3 w-3 mt-0.5 shrink-0" /><span><strong>Monterreal:</strong> Blvd. Libertad #632, Col. Monterreal, Torreón, Coah. — 871 670 0394</span></li>
                <li className="flex items-start gap-1.5"><Phone className="h-3 w-3 mt-0.5 shrink-0" /><span><strong>Centro Gómez:</strong> Calle Ocampo #178 Sur Local 3, Col. Centro, Gómez Palacio, Dgo. — 871 780 1206</span></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">Servicios</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link to="/bazar" className="transition-colors hover:text-primary">Empeño y compra</Link></li>
                <li><Link to="/bazar/simuladores" className="transition-colors hover:text-primary">Simuladores</Link></li>
                <li><Link to="/bazar/sucursales" className="transition-colors hover:text-primary">Sucursales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">Horarios</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>Lunes – Viernes: 9:00 – 18:00</li>
                <li>Sábados: 9:00 – 15:00</li>
                <li>Domingo: Cerrado</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Bazar Centenario. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      {/* CTA sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="flex gap-2">
          <Button asChild className="flex-1 bg-primary font-bold text-primary-foreground hover:bg-primary/90">
            <Link to="/bazar/simuladores">Cotizar ahora</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 border-border">
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
