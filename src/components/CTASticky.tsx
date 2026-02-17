import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const CTASticky = () => {
  const location = useLocation();
  const show = ["/bazar", "/simuladores"].includes(location.pathname);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 p-3 backdrop-blur md:hidden">
      <div className="flex gap-2">
        <Button asChild variant="gold" className="group flex-1">
          <Link to="/bazar/simuladores">Cotizar</Link>
        </Button>
        <Button variant="goldOutline" asChild className="group flex-1">
          <a href="https://wa.me/5551234567" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4 group-hover:scale-110" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default CTASticky;
