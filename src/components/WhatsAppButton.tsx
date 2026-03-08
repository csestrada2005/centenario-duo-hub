import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const location = useLocation();
  const isJoyeria = location.pathname.startsWith("/joyeria");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past ~90vh (hero section)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };

    handleScroll(); // check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg = isJoyeria ? "hsl(40 30% 12%)" : "hsl(214 40% 14%)";
  const iconBg = isJoyeria ? "hsl(43 74% 49%)" : "hsl(214 80% 40%)";
  const border = isJoyeria
    ? "1px solid hsl(43 74% 49% / 0.35)"
    : "1px solid hsl(214 80% 60% / 0.25)";

  return (
    <a
      href="https://wa.me/5212213497090"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-4 py-2.5 shadow-lg"
      style={{
        background: bg,
        border,
        color: "white",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: iconBg }}
      >
        <MessageCircle className="h-4 w-4" fill="white" strokeWidth={0} />
      </span>
      <span
        className="text-xs font-semibold tracking-wide"
        style={isJoyeria ? { fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.08em" } : {}}
      >
        WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
