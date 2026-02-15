import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Bazar", href: "/bazar" },
  { label: "Simuladores", href: "/simuladores" },
  { label: "Sucursales", href: "/sucursales" },
  { label: "Joyería", href: "/joyeria" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isJoyeria = location.pathname.startsWith("/joyeria");

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-foreground">
          Centenario
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2">
            <Link to="/simuladores">Cotizar</Link>
          </Button>
          {isJoyeria && (
            <Button variant="ghost" size="icon" asChild className="ml-1">
              <Link to="/joyeria/carrito">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </nav>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {isJoyeria && (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/joyeria/carrito">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="mt-2">
              <Link to="/simuladores" onClick={() => setMobileOpen(false)}>
                Cotizar
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
