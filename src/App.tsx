import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Bazar from "./pages/Bazar";
import Simuladores from "./pages/Simuladores";
import Sucursales from "./pages/Sucursales";
import Joyeria from "./pages/Joyeria";
import ProductDetail from "./pages/ProductDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/bazar" element={<Bazar />} />
            <Route path="/simuladores" element={<Simuladores />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/joyeria" element={<Joyeria />} />
            <Route path="/joyeria/:id" element={<ProductDetail />} />
            <Route path="/joyeria/carrito" element={<Carrito />} />
            <Route path="/joyeria/checkout" element={<Checkout />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
