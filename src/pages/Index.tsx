import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Gem } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Index = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="" className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center"
      >
        {/* Brand */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          Centenario
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-3 text-sm font-medium uppercase tracking-[0.3em] text-white/60"
        >
          Dos mundos, una marca
        </motion.p>

        {/* Two doors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 grid gap-6 md:grid-cols-2"
        >
          {/* Bazar */}
          <Link
            to="/bazar"
            className="group relative flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-amber-400/50 group-hover:bg-amber-400/10">
              <Store className="h-7 w-7 text-white/80 transition-colors group-hover:text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">Bazar Centenario</h2>
              <p className="mt-2 text-sm text-white/60">
                Casa de empeño y compra de oro, plata y diamantes
              </p>
            </div>
            <span className="mt-2 text-sm font-medium uppercase tracking-widest text-white/40 transition-colors group-hover:text-amber-400">
              Entrar →
            </span>
          </Link>

          {/* Joyería */}
          <Link
            to="/joyeria"
            className="group relative flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-14 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/10"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-amber-400/50 group-hover:bg-amber-400/10">
              <Gem className="h-7 w-7 text-white/80 transition-colors group-hover:text-amber-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white md:text-3xl">Joyería Centenario</h2>
              <p className="mt-2 text-sm text-white/60">
                Piezas únicas con garantía y diseño premium
              </p>
            </div>
            <span className="mt-2 text-sm font-medium uppercase tracking-widest text-white/40 transition-colors group-hover:text-amber-400">
              Entrar →
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
