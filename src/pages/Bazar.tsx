import { Link } from "react-router-dom";
import { useRef } from "react";
import heroBazar from "@/assets/hero-bazar.jpg";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight, Laptop, Wrench, Car, Tv,
  Gem, ShieldCheck, MapPin, MessageCircle, Clock, CheckCircle2,
  PhoneCall, Banknote, Star,
} from "lucide-react";

/* ── Scroll reveal ── */
const Reveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Bazar = () => {
  return (
    <div className="bg-background text-foreground">

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBazar} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220_60%_8%/0.92)] via-[hsl(220_60%_8%/0.75)] to-[hsl(220_60%_8%/0.3)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Trust badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[hsl(155_44%_33%)]" />
              +8 años de confianza · 100% seguro · Valuación gratis
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
              Bazar Centenario,<br />
              <span className="text-[hsl(155_44%_33%)]">Te saca del Apuro.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg font-normal leading-relaxed text-white/70">
              Te ofrecemos soluciones financieras rápidas y efectivas. Al empeñar o vender tu artículo o pieza de joyería, tendrás tu dinero en efectivo en menos de 30 minutos.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-primary px-8 text-base font-bold text-primary-foreground hover:bg-primary/90">
                <Link to="/bazar/simuladores">
                  <Banknote className="mr-2 h-5 w-5" /> Cotizar mi prenda
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20">
                <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
                  <PhoneCall className="mr-2 h-5 w-5" /> Hablar con un asesor
                </a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 pb-4">
              {[
                { val: "30 min", label: "y sales con efectivo" },
                { val: "Gratis", label: "valuación sin compromiso" },
                { val: "100%", label: "confidencial y seguro" },
              ].map((s) => (
                <div key={s.val}>
                  <p className="text-xl font-bold text-white sm:text-2xl">{s.val}</p>
                  <p className="text-[10px] text-white/55 sm:text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ URGENCIA banner ═══ */}
      <div className="bg-primary py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-6 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div className="flex items-start gap-3 text-primary-foreground">
            <Clock className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-xs font-semibold leading-relaxed sm:text-sm">¿Necesitas dinero urgente? Estamos abiertos Lun–Vie 9:00–18:00 | Sáb 9:00–15:00. <span className="font-normal opacity-80">Ven hoy y sal con efectivo.</span></p>
          </div>
          <Button asChild size="sm" className="w-full shrink-0 bg-white text-primary font-bold hover:bg-white/90 sm:w-auto">
            <Link to="/bazar/sucursales">Ver sucursal más cercana →</Link>
          </Button>
        </div>
      </div>

      {/* ═══ CÓMO FUNCIONA ═══ */}
      <section className="bg-background px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">Así de fácil funciona</h2>
            <p className="mt-3 text-muted-foreground">Sin papeleos complicados. Sin esperas largas.</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                icon: MapPin,
                title: "Llega a la sucursal",
                desc: "Trae tu artículo o metal precioso a cualquier sucursal. Solo necesitas una identificación oficial.",
              },
              {
                step: "2",
                icon: CheckCircle2,
                title: "Te valuamos gratis",
                desc: "En minutos te decimos exactamente cuánto te damos. Sin costo, sin compromiso.",
              },
              {
                step: "3",
                icon: Banknote,
                title: "Sales con tu dinero",
                desc: "Aceptas y recibes el efectivo al instante. Tu artículo queda seguro con nosotros.",
              },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground"
                  >
                    {s.step}
                  </div>
                  <s.icon className="mb-3 h-6 w-6 text-primary" strokeWidth={1.5} />
                  <h3 className="text-base font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUÉ ACEPTAMOS ═══ */}
      <section className="bg-secondary px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">¿Qué puedes empeñar?</h2>
            <p className="mt-3 text-muted-foreground">Aceptamos todo tipo de artículos de valor</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              { icon: Laptop, label: "Laptops" },
              { icon: Wrench, label: "Herramienta" },
              { icon: Tv, label: "Electrónicos" },
              { icon: Car, label: "Autos" },
              { icon: Gem, label: "Oro y plata" },
            ].map((cat, i) => (
              <Reveal key={cat.label} delay={i * 0.06}>
                <Link
                  to={cat.label === "Oro y plata" ? "/bazar/simuladores?tab=metales" : "/bazar/simuladores"}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-6 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <cat.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  <span className="text-xs font-semibold text-foreground">{cat.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-8 text-center">
            <Button asChild size="lg" className="bg-primary px-10 font-bold text-primary-foreground hover:bg-primary/90">
              <Link to="/bazar/simuladores">
                Cotiza tu artículo ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ═══ POR QUÉ NOSOTROS ═══ */}
      <section className="bg-background px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <Reveal>
              <h2 className="text-3xl font-extrabold md:text-4xl">
                Somos el bazar de confianza en tu ciudad.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Llevamos 8 años ayudando a personas y familias a salir de emergencias económicas. En Bazar Centenario entendemos tu situación financiera, por eso no juzgamos y respetamos a cada cliente. Tu situación es privada y la valuación es completamente gratuita.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Valuación gratuita y sin compromiso",
                  "Dinero en efectivo al instante",
                  "Tu artículo 100% seguro y asegurado",
                  "Sin preguntas incómodas, sin burocracia",
                  "Precios justos basados en el mercado actual",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-8 bg-primary px-8 font-bold text-primary-foreground hover:bg-primary/90">
                <Link to="/bazar/sucursales">
                  <MapPin className="mr-2 h-4 w-4" /> Encuentra tu sucursal
                </Link>
              </Button>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "8+", label: "años de experiencia", sub: "Desde 2017" },
                  { val: "50K+", label: "clientes atendidos", sub: "En toda la ciudad" },
                  { val: "30 min", label: "y sales con dinero", sub: "Proceso rápido" },
                  { val: "4.8★", label: "calificación promedio", sub: "Miles de reseñas" },
                ].map((stat) => (
                  <div key={stat.val} className="rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                    <p className="text-2xl font-extrabold text-primary">{stat.val}</p>
                    <p className="mt-1 text-xs font-semibold">{stat.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ PLAZOS E INTERESES ═══ */}
      <section className="bg-secondary px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">Plazos e intereses</h2>
            <p className="mt-3 text-muted-foreground">Información clara y sin letras chicas</p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Gem className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <h3 className="text-base font-bold">Joyería</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Plazo de 2 meses</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">Primer mes (por semana):</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex justify-between"><span>Semana 1</span><span className="font-semibold text-foreground">3%</span></li>
                  <li className="flex justify-between"><span>Semana 2</span><span className="font-semibold text-foreground">6%</span></li>
                  <li className="flex justify-between"><span>Semana 3</span><span className="font-semibold text-foreground">9%</span></li>
                  <li className="flex justify-between"><span>Semana 4 (mes completo)</span><span className="font-semibold text-foreground">12% mensual</span></li>
                </ul>
                <div className="mt-4 border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground">Si se extiende al segundo mes: <span className="font-semibold text-foreground">24% acumulado</span></p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Tv className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <h3 className="text-base font-bold">Artículos</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Plazo de 1 mes</p>
                <div className="py-6 text-center">
                  <p className="text-3xl font-extrabold text-primary">12%</p>
                  <p className="mt-1 text-xs text-muted-foreground">mensual</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIOS ═══ */}
      <section className="bg-background px-6 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">Lo que dicen nuestros clientes</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { name: "María G.", text: "Necesitaba dinero urgente para el médico. En 20 minutos salí con el efectivo. Excelente trato.", stars: 5 },
              { name: "Jorge L.", text: "Muy profesionales. Me explicaron todo bien, sin letras chicas. Regresé 3 veces ya.", stars: 5 },
              { name: "Rosa M.", text: "Me dieron buen precio por mi laptop. El proceso fue rápido y me trataron con respeto.", stars: 5 },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                  <p className="mt-3 text-xs font-bold">{t.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="bg-secondary px-6 py-20 md:px-10">
        <div className="mx-auto max-w-2xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold md:text-4xl">Preguntas frecuentes</h2>
          </Reveal>
          {[
            { q: "¿Qué necesito para empeñar?", a: "Solo una identificación oficial vigente (INE, pasaporte) y el artículo que quieres empeñar. Sin más trámites." },
            { q: "¿Cuánto tiempo tarda el proceso?", a: "Generalmente 20 a 30 minutos desde que llegas hasta que sales con tu dinero en efectivo." },
            { q: "¿Cuánto tiempo tengo para pagar?", a: "El plazo es de 30 días. Si necesitas más tiempo, puedes pagar solo los intereses y extender el plazo." },
            { q: "¿Es confidencial?", a: "Sí, 100%. Nadie se entera de tu operación. Tratamos cada caso con total discreción y respeto." },
            { q: "¿Cobran por la valuación?", a: "No. La valuación es completamente gratis y sin ningún compromiso de tu parte." },
            { q: "¿Puedo vender mi oro directamente?", a: "Sí, compramos oro, plata y diamantes al mejor precio del mercado. Sin citas ni esperas." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <Accordion type="single" collapsible>
                <AccordionItem value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-sm font-semibold hover:text-primary text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="bg-primary px-6 py-20 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-foreground md:text-4xl">
            ¿Qué esperas? Sal del apuro hoy.
          </h2>
          <p className="mt-4 text-primary-foreground/75 text-base">
            Te esperamos en tu sucursal más cercana. En menos de 30 minutos tendrás la solución.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-white px-10 text-base font-bold text-primary hover:bg-white/90">
              <Link to="/bazar/simuladores">
                <Banknote className="mr-2 h-5 w-5" /> Cotizar mi prenda
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 px-10 text-base font-semibold text-white hover:bg-white/20">
              <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Escribir por WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Bazar;
