import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-secondary/50">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Bazar</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/bazar" className="hover:text-foreground transition-colors">Servicios</Link></li>
            <li><Link to="/simuladores" className="hover:text-foreground transition-colors">Simuladores</Link></li>
            <li><Link to="/sucursales" className="hover:text-foreground transition-colors">Sucursales</Link></li>
          </ul>
        </div>
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
            <li>contacto@centenario.mx</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        <p>Bazar Centenario y Joyería Centenario son parte de la misma empresa.</p>
        <p className="mt-1">© {new Date().getFullYear()} Centenario. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
