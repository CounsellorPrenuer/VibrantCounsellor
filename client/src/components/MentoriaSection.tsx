import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, School, Video, ExternalLink } from "lucide-react";

export function MentoriaSection() {
  const stats = [
    {
      icon: Users,
      value: "3,50,000+",
      label: "Students & Professionals Mentored",
    },
    {
      icon: Building2,
      value: "240+",
      label: "Corporate Partners",
    },
    {
      icon: School,
      value: "350+",
      label: "Schools & College Collaborations",
    },
    {
      icon: Video,
      value: "1000+",
      label: "Hours of Career Webinars",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-purple-pink opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text-purple-teal">Powered by</span>{" "}
            <span className="text-foreground">Mentoria's Career Discovery Platform</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every Counselors program comes with exclusive access to{" "}
              <span className="text-primary font-semibold">Mentoria</span> – India's most 
              trusted career discovery and mentorship platform.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Together, we empower students and professionals with continuous learning, 
              structured mentorship, and scientifically designed assessments.
            </p>
            <Card className="p-6 glass border-primary/30">
              <p className="text-sm text-muted-foreground italic">
                Counselors proudly partners with Mentoria to deliver trusted, research-backed, 
                and personalized career discovery experiences.
              </p>
            </Card>
            <Button
              variant="outline"
              className="glass border-white/30 group"
              onClick={() => window.open("https://mentoria.com", "_blank")}
              data-testid="button-explore-mentoria"
            >
              Explore Mentoria
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="p-6 glass hover-elevate active-elevate-2 text-center overflow-visible"
                data-testid={`card-mentoria-stat-${index}`}
              >
                <div className="inline-flex p-3 bg-gradient-purple-pink rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text-purple-teal mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
