import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { client } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Loader2, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
}

export function BlogSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
    queryFn: () => client.fetch(`*[_type == "post"] | order(publishedAt desc)`),
  });

  return (
    <section id="blog" ref={ref as any} className="relative py-24 lg:py-32 bg-muted/30">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text-purple-teal">Latest Insights</span>{" "}
            <span className="text-foreground">& Resources</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay updated with our latest articles on career guidance, mentorship, and educational trends.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            Failed to load blog posts.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <Card
                key={post._id}
                className="group flex flex-col glass hover-elevate transition-all overflow-hidden border-border/50"
              >
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar size={14} />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 flex-1">
                    {post.excerpt}
                  </p>
                    <Link href={`/blog/${post.slug.current}`}>
                      <Button variant="ghost" className="w-fit p-0 hover:bg-transparent text-primary gap-2 group-hover:gap-3 transition-all">
                        Read More <ArrowRight size={18} />
                      </Button>
                    </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
