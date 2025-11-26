import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  featured_image_url: string | null;
  published_at: string | null;
  author_id: string;
  profiles?: {
    full_name: string | null;
    email: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        content,
        featured_image_url,
        published_at,
        author_id,
        profiles:author_id (
          full_name,
          email
        )
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!error && data) {
      setPost(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 container px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">Loading post...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 container px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article className="py-12 bg-gradient-card">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Link to="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            {post.featured_image_url && (
              <div className="aspect-video overflow-hidden rounded-lg mb-8 bg-secondary/30">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>{post.published_at ? format(new Date(post.published_at), 'MMMM dd, yyyy') : 'Recently'}</span>
              {post.profiles && (
                <>
                  <span className="mx-2">•</span>
                  <span>By {post.profiles.full_name || post.profiles.email}</span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-8">{post.title}</h1>

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
