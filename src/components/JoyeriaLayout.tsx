import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppButton from "./WhatsAppButton";

const joyeriaNav = [
  { label: "Catálogo", href: "/joyeria" },
];

const JoyeriaLayout = () => {
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
            <Link to="/joyeria" className="text-xl font-bold tracking-tight text-foreground">
              Joyería Centenario
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {joyeriaNav.map((item) => (
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
            <Button variant="ghost" size="icon" asChild className="ml-1">
              <Link to="/joyeria/carrito">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/joyeria/carrito">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t bg-background md:hidden">
            <nav className="container flex flex-col gap-1 py-4">
              {joyeriaNav.map((item) => (
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
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Joyería Footer */}
      <footer className="border-t bg-secondary/50">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Joyería</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/joyeria" className="hover:text-foreground transition-colors">Catálogo</Link></li>
                <li><Link to="/joyeria/carrito" className="hover:text-foreground transition-colors">Carrito</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Tel: (555) 123-4567</li>
                <li>joyeria@centenario.mx</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">También somos</h4>
              <p className="text-sm text-muted-foreground">
                <Link to="/bazar" className="hover:text-foreground transition-colors underline">
                  Bazar Centenario →
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} Joyería Centenario. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default JoyeriaLayout;
