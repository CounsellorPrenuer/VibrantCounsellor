import { Award, Globe, Heart, Users, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

export function WhyChooseSection() {
  const reasons = [
    {
      icon: Award,
      title: "23+ Years of Experience",
      description: "In Education & Counseling",
    },
    {
      icon: Globe,
      title: "Globally Certified",
      description: "IAAP, APCDA, GCDA, ICEF US Course Graduate",
    },
    {
      icon: Heart,
      title: "NGO Founder",
      description: "Supporting underprivileged students",
    },
    {
      icon: Users,
      title: "Trusted by Many",
      description: "Schools, Colleges & Professionals",
    },
    {
      icon: Lightbulb,
      title: "Personalized Guidance",
      description: "Empathetic, Practical, and Tailored",
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-foreground">Because Every Career Deserves</span>{" "}
            <span className="gradient-text-purple-pink">the Right Direction</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="p-6 glass hover-elevate active-elevate-2 text-center overflow-visible"
              data-testid={`card-reason-${index}`}
            >
              <div className="inline-flex p-4 bg-gradient-purple-teal rounded-lg mb-4">
                <reason.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{reason.title}</h3>
              <p className="text-sm text-muted-foreground">{reason.description}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 sm:p-12 glass text-center overflow-visible">
            <blockquote className="text-2xl sm:text-3xl font-bold gradient-text-purple-pink italic">
              "I don't just guide careers — I nurture confidence and clarity."
            </blockquote>
            <cite className="block mt-4 text-muted-foreground">— Manpreet Kaur</cite>
          </Card>
        </div>
      </div>
    </section>
  );
}
