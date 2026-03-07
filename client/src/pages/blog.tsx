import { Navbar } from "@/components/Navbar";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
