
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { client, urlFor } from "@/lib/sanity";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Loader2, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface BlogPost {
  title: string;
  publishedAt: string;
  content: string;
  mainImage?: any;
}

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/post/${slug}`],
    queryFn: () => client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug }),
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 gap-2 text-muted-foreground hover:text-primary">
              <ArrowLeft size={18} /> Back to Blog
            </Button>
          </Link>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          ) : error || !post ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-4">Post not found</h2>
              <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
            </div>
          ) : (
            <article className="prose prose-lg max-w-none">
              <header className="mb-12">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar size={16} />
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-tight text-slate-900 dark:text-white">
                  {post.title}
                </h1>
                {post.mainImage && (
                  <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
                     <img 
                      src={urlFor(post.mainImage).url()} 
                      alt={post.title}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}
              </header>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {post.content}
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
