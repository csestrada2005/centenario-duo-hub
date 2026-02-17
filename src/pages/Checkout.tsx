import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Checkout = () => {
  return (
    <div className="px-6 py-12 md:px-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-10 text-3xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Checkout</h1>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">Datos de envío</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="Nombre" className="bg-transparent" />
                <Input placeholder="Apellido" className="bg-transparent" />
                <Input placeholder="Dirección" className="bg-transparent md:col-span-2" />
                <Input placeholder="Ciudad" className="bg-transparent" />
                <Input placeholder="Código postal" className="bg-transparent" />
                <Input placeholder="Teléfono" className="bg-transparent" />
                <Input placeholder="Email" className="bg-transparent" />
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">Método de pago</h3>
              <p className="mb-4 text-xs text-muted-foreground">
                El pago se procesará de forma segura.
              </p>
              <div className="space-y-4">
                <Input placeholder="Número de tarjeta" className="bg-transparent" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/AA" className="bg-transparent" />
                  <Input placeholder="CVV" className="bg-transparent" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pt-0">
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.15em]">Resumen</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Pieza Premium 1 x1</span><span>$3,700</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pieza Premium 3 x2</span><span>$12,200</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Envío</span><span>$199</span></div>
              <div className="flex justify-between border-t border-border pt-3 font-medium"><span>Total</span><span>$16,099 MXN</span></div>
            </div>
            <Button className="mt-6 w-full bg-foreground text-background hover:bg-foreground/90" size="lg">Confirmar pedido</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
