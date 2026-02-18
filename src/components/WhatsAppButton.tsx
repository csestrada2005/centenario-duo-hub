import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5551234567"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contactar por WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 shadow-lg"
    style={{
      background: "hsl(220 25% 16%)",
      color: "white",
    }}
  >
    <span
      className="flex h-7 w-7 items-center justify-center rounded-full"
      style={{ background: "hsl(142 55% 42%)" }}
    >
      <MessageCircle className="h-4 w-4" fill="white" strokeWidth={0} />
    </span>
    <span className="text-xs font-semibold tracking-wide">WhatsApp</span>
  </motion.a>
);

export default WhatsAppButton;
