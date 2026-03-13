import { Navbar } from "@/components/Navbar";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { MentoriaSection } from "@/components/MentoriaSection";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <WhyChooseSection />
        <MentoriaSection />
      </main>
      <Footer />
    </div>
  );
}
