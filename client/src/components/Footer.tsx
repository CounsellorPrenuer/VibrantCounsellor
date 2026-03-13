import { Link, useLocation } from "wouter";
import { Instagram, Facebook, Heart, MessageCircle, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import logoUrl from "@assets/Logo_MANPREET_KAUR_Counselors-removebg-preview_1759832141955.png";

interface GlobalSettings {
  whatsappNumber: string;
  contactPhone: string;
  contactEmail: string;
  contactLocation: string;
  facebookLink?: string;
  instagramLink?: string;
}

export function Footer() {
  const [location, setLocation] = useLocation();
  const { data: settings, isLoading } = useQuery<GlobalSettings>({
    queryKey: ["/api/settings"],
    queryFn: () => client.fetch(`*[_id == "global-settings"][0]`),
  });

  const whatsappLink = settings?.whatsappNumber 
    ? `https://wa.me/${settings.whatsappNumber.replace(/\+/g, "")}`
    : "https://wa.me/919815299446";

  const quickLinks = [
    { label: "Home", path: "/#hero" },
    { label: "About", path: "/about" },
    { label: "Services", path: "/#services" },
    { label: "Pricing", path: "/#pricing" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith("/#") && location === "/") {
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    setLocation(path);
  };

  if (isLoading) {
    return (
      <footer className="relative border-t border-border/50 glass py-12">
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary opacity-20" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative border-t border-border/50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src={logoUrl}
                alt="Counselors Logo"
                className="h-12 w-12 object-contain group-hover:rotate-6 transition-transform"
              />
              <span className="text-xl font-bold text-foreground">Counselors</span>
            </Link>
            <p className="text-muted-foreground italic text-sm">
              Guiding careers. Empowering minds. Building brighter futures.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center gap-3 text-sm font-medium text-foreground/80">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin size={18} className="text-primary" />
                </div>
                <span className="font-bold">{settings?.contactLocation || "Punjab, India"}</span>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-foreground hover:text-primary transition-colors">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone size={18} className="text-primary" />
                </div>
                <a href={`tel:${settings?.contactPhone?.replace(/\s+/g, "") || "+919815299446"}`}>
                  {settings?.contactPhone || "+91 98152 99446"}
                </a>
              </div>
              <div className="flex items-center gap-3 text-base font-bold text-foreground hover:text-primary transition-colors">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail size={18} className="text-primary" />
                </div>
                <a href={`mailto:${settings?.contactEmail || "counselor963@gmail.com"}`}>
                  {settings?.contactEmail || "counselor963@gmail.com"}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href={settings?.instagramLink || "https://www.instagram.com/counselor_edu?igsh=eXZhdzJjcjg1cGRq"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-lg hover-elevate active-elevate-2 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={settings?.facebookLink || "https://www.facebook.com/profile.php?id=61576958812119"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-lg hover-elevate active-elevate-2 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-lg hover-elevate active-elevate-2 transition-colors hover:text-primary"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Counselors by Manpreet Kaur. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            In collaboration with{" "}
            <a
              href="https://mentoria.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Mentoria
            </a>{" "}
            – India's Leading Career Discovery Platform.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Crafted with <Heart className="w-4 h-4 text-primary fill-current" /> to guide every learner toward clarity.
          </p>
        </div>
      </div>
    </footer>
  );
}
