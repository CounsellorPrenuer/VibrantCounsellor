import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import profileUrl from "@assets/Image_MANPREET KAUR_Counselors_1759832141953.jpeg";

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" ref={ref as any} className="relative py-24 lg:py-32">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text-purple-pink">
              Guiding Dreams.
            </span>{" "}
            <span className="text-foreground">Building Futures.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over <span className="text-primary font-semibold">23 years of experience</span> in 
              the education and counseling industry, Manpreet Kaur has mentored thousands of students, 
              parents, and professionals toward fulfilling career paths.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              She is a Certified Career Counselor (IAAP, APCDA, GCDA), ICEF US Course Graduate (USCG 598), 
              and an educator qualified in Teaching and Training from GNDU.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond her professional practice, she is the Founder of an NGO that supports career guidance 
              and education for underprivileged girls — blending compassion with professionalism in every session.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-4 glass rounded-r-lg">
              <p className="text-xl italic text-foreground font-medium">
                "When guided with empathy and clarity, every student can achieve success 
                that aligns with their true potential."
              </p>
              <cite className="text-sm text-muted-foreground mt-2 block">— Manpreet Kaur</cite>
            </blockquote>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Animated Gradient Border */}
              <div className="absolute -inset-4 bg-gradient-purple-pink rounded-xl opacity-75 blur-xl animate-pulse" />
              <div className="relative">
                <img
                  src={profileUrl}
                  alt="Manpreet Kaur"
                  className="w-64 h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[30rem] rounded-xl object-cover shadow-2xl ring-4 ring-white/20"
                  data-testid="img-profile"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
