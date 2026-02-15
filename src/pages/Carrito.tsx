import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";

const cartItems = [
  { id: "prod-1", name: "Pieza Premium 1", price: 3700, qty: 1 },
  { id: "prod-3", name: "Pieza Premium 3", price: 6100, qty: 2 },
];

const Carrito = () => {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 199;
  const total = subtotal + shipping;

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold">Carrito de compras</h1>

      {cartItems.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Tu carrito está vacío.</p>
          <Button asChild className="mt-4"><Link to="/joyeria">Ver catálogo</Link></Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-20 w-20 shrink-0 rounded bg-muted" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toLocaleString()} MXN</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-3 w-3" /></Button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-3 w-3" /></Button>
                  </div>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit">
            <CardContent className="space-y-3 p-6">
              <h3 className="font-semibold">Resumen</h3>
              <div className="flex justify-between text-sm">
                <span>Subtotal</span><span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span><span>${shipping}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-semibold">
                <span>Total</span><span>${total.toLocaleString()} MXN</span>
              </div>
              <Button asChild className="mt-4 w-full" size="lg">
                <Link to="/joyeria/checkout">Proceder al pago</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Carrito;
