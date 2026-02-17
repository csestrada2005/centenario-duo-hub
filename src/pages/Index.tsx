import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-home.jpg";

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="" className="h-full w-full object-cover opacity-30" loading="eager" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
      >
        {/* Brand */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-white/40"
        >
          Bienvenido
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gold-gradient text-5xl font-light tracking-[0.15em] md:text-7xl lg:text-8xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Centenario
        </motion.h1>

        {/* Two doors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-20 grid gap-px md:grid-cols-2"
        >
          {/* Bazar */}
          <Link
            to="/bazar"
            className="group flex flex-col items-center justify-center gap-4 border border-white/10 px-10 py-16 transition-all duration-500 hover:bg-white/5"
          >
            <h2 className="text-xl font-light uppercase tracking-[0.2em] text-white md:text-2xl">
              Bazar
            </h2>
            <p className="text-xs text-white/40">
              Casa de empeño y compra de metales preciosos
            </p>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-white/30 transition-colors duration-500 group-hover:text-[hsl(46,56%,51%)]">
              Entrar
            </span>
          </Link>

          {/* Joyería */}
          <Link
            to="/joyeria"
            className="group flex flex-col items-center justify-center gap-4 border border-white/10 px-10 py-16 transition-all duration-500 hover:bg-white/5"
          >
            <h2 className="text-xl font-light uppercase tracking-[0.2em] text-white md:text-2xl">
              Joyería
            </h2>
            <p className="text-xs text-white/40">
              Piezas únicas con garantía y diseño premium
            </p>
            <span className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-white/30 transition-colors duration-500 group-hover:text-[hsl(46,56%,51%)]">
              Entrar
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
