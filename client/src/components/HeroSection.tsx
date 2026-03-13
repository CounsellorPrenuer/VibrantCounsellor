import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Award, GraduationCap, Users, Heart, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { useLocation } from "wouter";

interface GlobalSettings {
  whatsappNumber: string;
  heroTitle: string;
  heroSubtitle: string;
}

interface Credential {
  title: string;
  description: string;
  icon: string;
}

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
}

export function HeroSection({ mousePosition }: HeroSectionProps) {
  const [, setLocation] = useLocation();
  const { data: settings, isLoading: settingsLoading } = useQuery<GlobalSettings>({
    queryKey: ["/api/settings"],
    queryFn: () => client.fetch(`*[_id == "global-settings"][0]`),
  });

  const { data: credentials, isLoading: credentialsLoading } = useQuery<Credential[]>({
    queryKey: ["/api/credentials"],
    queryFn: () => client.fetch(`*[_type == "credential"] | order(order asc)`),
  });

  const isLoading = settingsLoading || credentialsLoading;

  const glowStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(167, 91, 219, 0.15), transparent 40%)`,
  };

  const whatsappLink = settings?.whatsappNumber 
    ? `https://wa.me/${settings.whatsappNumber.replace(/\+/g, "")}`
    : "https://wa.me/919815299446";

  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-animated animate-gradient opacity-20" />
      
      {/* Mouse Follow Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={glowStyle}
      />

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-purple-teal rounded-full opacity-20 blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-purple-pink rounded-full opacity-20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-chart-2 rounded-full opacity-10 blur-2xl animate-float" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {isLoading ? (
              <div className="flex justify-center lg:justify-start">
                <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
              </div>
            ) : (
              <>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-in fade-in slide-in-from-left-8 duration-700">
                  <span className="gradient-text-purple-teal">
                    {settings?.heroTitle?.split("with")[0] || "Empowering Futures"}
                  </span>
                  <br />
                  <span className="text-foreground">
                    with {settings?.heroTitle?.split("with")[1] || "Clarity, Confidence, and Compassion"}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-left-12 duration-1000">
                  {settings?.heroSubtitle || "Personalized career guidance and educational counseling by Manpreet Kaur, helping students and professionals discover direction and purpose."}
                </p>
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-purple-pink text-white text-lg px-8 py-6 glow-purple-hover"
                onClick={() => setLocation("/contact")}
                data-testid="button-hero-consultation"
              >
                <Calendar className="mr-2" size={20} />
                Book a Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 glass backdrop-blur-md border-white/30"
                onClick={() => window.open(whatsappLink, "_blank")}
                data-testid="button-hero-whatsapp"
              >
                <MessageCircle className="mr-2" size={20} />
                Chat on WhatsApp
              </Button>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Building brighter futures through informed choices, expert mentorship, 
              and decades of experience in career counseling.
            </p>
          </div>

          {/* Right Content - Credentials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!credentials || credentials.length === 0 ? (
              // Fallback to static if no credentials in Sanity
              <>
                <Card className="p-6 bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors">
                      <Award className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-lg mb-2 text-primary">Certified Professional</h3>
                      <p className="text-sm font-medium text-slate-500 italic">IAAP, APCDA, GCDA Certified Career Counselor</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors">
                      <GraduationCap className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-lg mb-2 text-primary">ICEF Graduate</h3>
                      <p className="text-sm font-medium text-slate-500 italic">US Course Graduate (USCG 598)</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors">
                      <Users className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-lg mb-2 text-primary">Experienced Educator</h3>
                      <p className="text-sm font-medium text-slate-500 italic">Teaching & Training from GNDU</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6 bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors">
                      <Heart className="w-8 h-8 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-black text-lg mb-2 text-primary">NGO Founder</h3>
                      <p className="text-sm font-medium text-slate-500 italic">Supporting underprivileged girls' education</p>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              credentials.map((cred, idx) => {
                const IconComponent = {
                  Award, GraduationCap, Users, Heart
                }[cred.icon] || Award;

                return (
                  <Card key={idx} className="p-6 bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl group">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary transition-colors">
                        <IconComponent className="w-8 h-8 text-primary group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-serif font-black text-lg mb-2 text-primary">{cred.title}</h3>
                        <p className="text-sm font-medium text-slate-500 italic">{cred.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
