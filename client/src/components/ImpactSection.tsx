import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/sanity";
import { Loader2 } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
  order: number;
}

export function ImpactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { data: stats, isLoading, error } = useQuery<StatItem[]>({
    queryKey: ["/api/stats"],
    queryFn: () => client.fetch(`*[_type == "stat"] | order(order asc)`),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedNumber = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const targetNum = parseInt(target) || 0;

    useEffect(() => {
      if (!isVisible || isNaN(targetNum)) return;

      const duration = 2000;
      const steps = 60;
      const increment = targetNum / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setCount(targetNum);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [isVisible, targetNum]);

    return (
      <span>
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section id="impact" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-purple-teal opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text-purple-pink">Impact</span>{" "}
            <span className="text-foreground">in Numbers</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Two decades of meaningful guidance, proven results, and lifelong mentorship.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            Failed to load impact statistics.
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats?.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 glass rounded-lg hover-elevate active-elevate-2"
                data-testid={`stat-${index}`}
              >
                <div className="text-5xl sm:text-6xl font-bold mb-4">
                  <span className="gradient-text-purple-teal">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
