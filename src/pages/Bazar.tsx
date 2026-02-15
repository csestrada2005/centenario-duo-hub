import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Smartphone, Laptop, Wrench, Car, Tv, CircleDollarSign,
  Gem, Shield, MapPin, MessageCircle, Package,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Bazar = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary/30 py-20 text-center">
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold md:text-5xl">Bazar Centenario</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Empeña tus artículos o vende tu oro, plata y diamantes. Sin complicaciones.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link to="/simuladores">Cotizar ahora</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/sucursales">Ver sucursales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="container py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center text-2xl font-bold md:text-3xl">
          Cómo funciona
        </motion.h2>
        <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-3">
          {[
            { icon: Package, title: "Trae tu artículo", desc: "Lleva tu artículo o metal precioso a cualquier sucursal." },
            { icon: CircleDollarSign, title: "Valuación gratuita", desc: "Nuestros expertos lo evalúan sin costo ni compromiso." },
            { icon: ArrowRight, title: "Recibe tu dinero", desc: "Obtén tu dinero en el momento, de forma segura." },
          ].map((step, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="bg-secondary/30">
        <div className="container py-20">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center text-2xl font-bold md:text-3xl">
            Nuestros servicios
          </motion.h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Empeño de artículos</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Electrónicos, herramienta, autos, electrodomésticos, oro y plata. Valuación justa e inmediata.
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/simuladores">Simular empeño <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">Compra de oro, plata y diamantes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Compramos tus metales preciosos al mejor precio del mercado.
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/simuladores?tab=metales">Simular cotización <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simula fácil */}
      <section className="container py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center text-2xl font-bold md:text-3xl">
          Simula fácil
        </motion.h2>
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 md:grid-cols-6">
          {[
            { icon: Smartphone, label: "Celular" },
            { icon: Laptop, label: "Laptop" },
            { icon: Wrench, label: "Herramienta" },
            { icon: Tv, label: "Electro" },
            { icon: Car, label: "Auto" },
            { icon: Gem, label: "Metales" },
          ].map((cat) => (
            <motion.div key={cat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <Link
                to={cat.label === "Metales" ? "/simuladores?tab=metales" : "/simuladores"}
                className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-colors hover:bg-muted"
              >
                <cat.icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Confianza */}
      <section className="bg-secondary/30">
        <div className="container py-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto max-w-2xl">
            <Shield className="mx-auto h-10 w-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold md:text-3xl">Tu tranquilidad es nuestra prioridad</h2>
            <p className="mt-3 text-muted-foreground">
              Más de 25 años brindando un servicio profesional, seguro y sin juicios. Tu confianza es lo más importante.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-20">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-10 text-center text-2xl font-bold md:text-3xl">
          Preguntas frecuentes
        </motion.h2>
        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible>
            {[
              { q: "¿Qué requisitos necesito para empeñar?", a: "Solo necesitas una identificación oficial vigente y el artículo a empeñar." },
              { q: "¿Cuánto tiempo tengo para pagar mi empeño?", a: "El plazo estándar es de 30 días, con posibilidad de refrendar." },
              { q: "¿Qué artículos aceptan?", a: "Electrónicos, herramientas, autos, electrodomésticos, oro, plata y diamantes." },
              { q: "¿Cómo calculan el valor de mi artículo?", a: "Nuestros valuadores certificados evalúan marca, estado y mercado actual." },
              { q: "¿Cobran por la valuación?", a: "No, la valuación es completamente gratuita y sin compromiso." },
              { q: "¿Puedo vender mi oro directamente?", a: "Sí, compramos oro, plata y diamantes al mejor precio del mercado." },
            ].map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-secondary/30">
        <div className="container flex flex-col items-center gap-4 py-16 text-center sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link to="/sucursales"><MapPin className="mr-2 h-4 w-4" /> Visita tu sucursal más cercana</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Escríbenos por WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Bazar;
