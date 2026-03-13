import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import logoUrl from "@assets/Logo_MANPREET_KAUR_Counselors-removebg-preview_1759832141955.png";

interface GlobalSettings {
  whatsappNumber: string;
  contactPhone: string;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const { data: settings } = useQuery<GlobalSettings>({
    queryKey: ["/api/settings"],
    queryFn: () => client.fetch(`*[_id == "global-settings"][0]`),
  });

  const whatsappLink = settings?.whatsappNumber 
    ? `https://wa.me/${settings.whatsappNumber.replace(/\+/g, "")}`
    : "https://wa.me/919815299446";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Pricing", path: "/pricing" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "glass-strong shadow-lg h-16"
            : "bg-transparent h-20"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={logoUrl}
                alt="Counselors Logo"
                className="h-12 w-12 object-contain group-hover:rotate-6 transition-transform"
                data-testid="img-logo"
              />
              <span className="text-xl font-bold text-foreground">
                Counselors
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative transition-colors group ${
                    location === link.path ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  data-testid={`link-${link.path}`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    location === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="glass border-white/30 gap-2 hover:bg-primary/10"
                onClick={() => window.open(whatsappLink, "_blank")}
                data-testid="button-whatsapp-nav"
              >
                <MessageCircle size={16} className="text-primary" />
                <span>Chat</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground hover-elevate rounded-md"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-0 right-0 glass-strong p-6 mx-4 rounded-lg animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left transition-colors py-2 text-lg font-medium ${
                    location === link.path ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                  data-testid={`link-mobile-${link.path}`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => window.open(whatsappLink, "_blank")}
                className="bg-gradient-purple-pink text-white w-full gap-2 mt-4"
                data-testid="button-mobile-whatsapp"
              >
                <MessageCircle size={18} />
                WhatsApp Chat
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
