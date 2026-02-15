import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MessageCircle, ShoppingBag, ArrowRight, Shield, Building2, Users, Gem, Store } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center bg-secondary/30 px-4 text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Casa de empeño y compra de oro, plata y diamantes
          </h1>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            Tienda premium de joyería
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/bazar">Entrar a Bazar</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/joyeria">Entrar a Joyería</Link>
            </Button>
          </div>

          <div className="mt-6">
            <Button asChild variant="secondary" size="lg">
              <Link to="/simuladores">Cotizar ahora</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/sucursales"><MapPin className="mr-1 h-4 w-4" /> Sucursales</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/joyeria"><ShoppingBag className="mr-1 h-4 w-4" /> Catálogo</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Dos mundos, una marca */}
      <section className="container py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-10 text-center text-2xl font-bold md:text-3xl"
        >
          Dos mundos, una marca
        </motion.h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <Store className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Bazar Centenario</h3>
                <p className="text-sm text-muted-foreground">
                  Empeña o vende tus artículos y metales preciosos
                </p>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/bazar">Conocer Bazar <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                <Gem className="h-10 w-10 text-primary" />
                <h3 className="text-lg font-semibold">Joyería Centenario</h3>
                <p className="text-sm text-muted-foreground">
                  Encuentra piezas únicas con garantía
                </p>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/joyeria">Ver catálogo <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Simulador destacado */}
      <section className="bg-secondary/30">
        <div className="container py-16 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl font-bold md:text-3xl">Obtén una estimación en menos de 2 minutos</h2>
            <p className="mt-2 text-muted-foreground">Simula el valor de tu empeño o tus metales preciosos</p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/simuladores">Simular ahora</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Confianza / Cifras */}
      <section className="container py-20">
        <div className="mx-auto grid max-w-3xl gap-8 text-center md:grid-cols-3">
          {[
            { icon: Shield, value: "+25", label: "Años de experiencia" },
            { icon: Building2, value: "8", label: "Sucursales" },
            { icon: Users, value: "+50,000", label: "Clientes atendidos" },
          ].map((stat) => (
            <motion.div key={stat.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <stat.icon className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sucursales preview */}
      <section className="bg-secondary/30">
        <div className="container py-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Nuestras sucursales</h2>
            <p className="mt-2 text-muted-foreground">Visítanos en cualquiera de nuestras ubicaciones</p>
          </motion.div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-3">
            {["Centro", "Zona Norte", "Plaza Sur"].map((name) => (
              <motion.div key={name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Av. Ejemplo #123, Col. Centro</p>
                    <p className="text-sm text-muted-foreground">Lun-Sáb 9:00 - 18:00</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline">
              <Link to="/sucursales">Ver todas <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
