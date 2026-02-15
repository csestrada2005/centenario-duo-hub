import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="container py-8">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/joyeria"><ArrowLeft className="mr-1 h-4 w-4" /> Volver al catálogo</Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-lg bg-muted" />
        <div>
          <h1 className="text-2xl font-bold">Pieza Premium</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ref: {id}</p>
          <p className="mt-4 text-2xl font-bold">$4,900 MXN</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Pieza artesanal elaborada con los más altos estándares de calidad. Incluye certificado de autenticidad y garantía.
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p><span className="font-medium">Material:</span> Oro 14k</p>
            <p><span className="font-medium">Peso:</span> 5.2g</p>
            <p><span className="font-medium">Garantía:</span> 1 año</p>
          </div>
          <Button size="lg" className="mt-6 w-full md:w-auto">
            <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
          </Button>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold">También te puede interesar</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Link key={i} to={`/joyeria/prod-${i}`} className="group">
              <div className="aspect-square rounded-lg bg-muted transition-shadow group-hover:shadow-md" />
              <p className="mt-2 text-sm font-medium">Pieza Premium {i}</p>
              <p className="text-sm text-muted-foreground">${(2500 + i * 1200).toLocaleString()} MXN</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
