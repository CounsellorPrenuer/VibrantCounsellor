import { Card } from "@/components/ui/card";
import { Phone, Search, Map, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Phone,
      number: "1",
      title: "Connect with Us",
      description: "Book your free call and share your goals, challenges, and aspirations.",
    },
    {
      icon: Search,
      number: "2",
      title: "Discover & Assess",
      description: "Take a guided assessment to understand your strengths, skills, and opportunities.",
    },
    {
      icon: Map,
      number: "3",
      title: "Plan Your Path",
      description: "Receive personalized counseling and a clear roadmap to success.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-foreground">Your Journey to</span>{" "}
            <span className="gradient-text-purple-teal">Clarity Starts Here</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card
                className="p-8 glass hover-elevate active-elevate-2 h-full overflow-visible"
                data-testid={`card-step-${index}`}
              >
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-purple-pink rounded-full glow-purple">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>

              {/* Arrow between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
