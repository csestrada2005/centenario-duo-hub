import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "./WhatsAppButton";

const bazarNav = [
  { label: "Inicio", href: "/bazar" },
  { label: "Simuladores", href: "/bazar/simuladores" },
  { label: "Sucursales", href: "/bazar/sucursales" },
];

const BazarLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              ← Centenario
            </Link>
            <span className="text-border">|</span>
            <Link to="/bazar" className="text-xl font-bold tracking-tight text-foreground">
              Bazar Centenario
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {bazarNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="ml-2">
              <Link to="/bazar/simuladores">Cotizar</Link>
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileOpen && (
          <div className="border-t bg-background md:hidden">
            <nav className="container flex flex-col gap-1 py-4">
              {bazarNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                    location.pathname === item.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-2">
                <Link to="/bazar/simuladores" onClick={() => setMobileOpen(false)}>Cotizar</Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Bazar Footer */}
      <footer className="border-t bg-secondary/50">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/bazar" className="hover:text-foreground transition-colors">Empeño y compra</Link></li>
                <li><Link to="/bazar/simuladores" className="hover:text-foreground transition-colors">Simuladores</Link></li>
                <li><Link to="/bazar/sucursales" className="hover:text-foreground transition-colors">Sucursales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Tel: (555) 123-4567</li>
                <li>bazar@centenario.mx</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">También somos</h4>
              <p className="text-sm text-muted-foreground">
                <Link to="/joyeria" className="hover:text-foreground transition-colors underline">
                  Joyería Centenario →
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Bazar Centenario. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

      {/* CTA sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link to="/bazar/simuladores">Cotizar</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
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
