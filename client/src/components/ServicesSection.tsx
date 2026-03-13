import { Target, Users, School, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Service {
  icon: LucideIcon;
  title: string;
  items: string[];
  color: string;
}

export function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const services: Service[] = [
    {
      icon: Target,
      title: "Career Guidance",
      color: "from-purple-500 to-pink-500",
      items: [
        "Stream & Subject Selection",
        "Career Assessment & Profiling",
        "One-on-One Counseling",
        "Study Abroad Guidance",
        "Psychometric Testing",
      ],
    },
    {
      icon: Users,
      title: "Workshops & Seminars",
      color: "from-teal-500 to-cyan-500",
      items: [
        "Career Awareness Programs for Schools & Colleges",
        "Personality Development & Confidence Building",
        "Motivational Sessions for Students & Parents",
        "Faculty Development & Corporate Training Sessions",
      ],
    },
    {
      icon: School,
      title: "Admission Guidance",
      color: "from-pink-500 to-purple-500",
      items: [
        "Course & University Shortlisting",
        "Profile Evaluation & SOP Review",
        "Scholarship & Visa Assistance",
        "Application Strategy for India & Abroad",
      ],
    },
  ];

  return (
    <section id="services" ref={ref as any} className="relative py-24 lg:py-32 bg-muted/30">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text-purple-teal">
              Comprehensive Career
            </span>{" "}
            <span className="text-foreground">& Educational Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Helping students, parents, schools, and professionals make confident, 
            well-informed educational and career choices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-8 glass hover-elevate active-elevate-2 group overflow-visible"
              data-testid={`card-service-${index}`}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 glow-purple`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:gradient-text-purple-pink transition-all">
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
