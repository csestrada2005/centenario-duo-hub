import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import BazarLayout from "./components/BazarLayout";
import JoyeriaLayout from "./components/JoyeriaLayout";
import Bazar from "./pages/Bazar";
import Simuladores from "./pages/Simuladores";
import Sucursales from "./pages/Sucursales";
import JoyeriaHome from "./pages/JoyeriaHome";
import Joyeria from "./pages/Joyeria";
import ProductDetail from "./pages/ProductDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import Relojes from "./pages/Relojes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  // Use top-level path segment as key so sub-route changes use layout's AnimatedOutlet
  const topKey = "/" + (location.pathname.split("/")[1] || "");

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={topKey}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />

        {/* Bazar routes */}
        <Route element={<PageTransition><BazarLayout /></PageTransition>}>
          <Route path="/bazar" element={<Bazar />} />
          <Route path="/bazar/simuladores" element={<Simuladores />} />
          <Route path="/bazar/sucursales" element={<Sucursales />} />
        </Route>

        {/* Joyería routes */}
        <Route element={<PageTransition><JoyeriaLayout /></PageTransition>}>
          <Route path="/joyeria" element={<JoyeriaHome />} />
          <Route path="/joyeria/catalogo" element={<Joyeria />} />
          <Route path="/joyeria/:id" element={<ProductDetail />} />
          <Route path="/joyeria/carrito" element={<Carrito />} />
          <Route path="/joyeria/checkout" element={<Checkout />} />
          <Route path="/joyeria/relojes" element={<Joyeria />} />
        </Route>

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <AnimatedRoutes />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
