import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Checkout = () => {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-2xl font-bold">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold">Datos de envío</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Nombre" />
                <Input placeholder="Apellido" />
                <Input placeholder="Dirección" className="md:col-span-2" />
                <Input placeholder="Ciudad" />
                <Input placeholder="Código postal" />
                <Input placeholder="Teléfono" />
                <Input placeholder="Email" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="font-semibold">Método de pago</h3>
              <p className="text-sm text-muted-foreground">
                El pago se procesará de forma segura a través de nuestra pasarela de pago.
              </p>
              <Input placeholder="Número de tarjeta" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/AA" />
                <Input placeholder="CVV" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardContent className="space-y-3 p-6">
            <h3 className="font-semibold">Resumen del pedido</h3>
            <div className="flex justify-between text-sm"><span>Pieza Premium 1 x1</span><span>$3,700</span></div>
            <div className="flex justify-between text-sm"><span>Pieza Premium 3 x2</span><span>$12,200</span></div>
            <div className="flex justify-between text-sm"><span>Envío</span><span>$199</span></div>
            <div className="flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>$16,099 MXN</span></div>
            <Button className="mt-4 w-full" size="lg">Confirmar pedido</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
