import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Top 10 Amazon Gadgets Under $50",
      excerpt: "Discover the best tech deals that won't break the bank. From smart home devices to portable chargers...",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop",
      date: "May 15, 2024",
      category: "Tech"
    },
    {
      title: "Best Temu Deals Under $20",
      excerpt: "Amazing finds that prove you don't need to spend a fortune for quality products...",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop",
      date: "May 12, 2024",
      category: "Shopping"
    },
    {
      title: "Kitchen Must-Haves: Amazon vs Temu",
      excerpt: "We compare essential kitchen tools from both platforms to help you make the best choice...",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=400&fit=crop",
      date: "May 10, 2024",
      category: "Kitchen"
    },
    {
      title: "Smart Home Setup on a Budget",
      excerpt: "Transform your home into a smart home without spending thousands...",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop",
      date: "May 8, 2024",
      category: "Home"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-12 bg-gradient-hero text-white">
          <div className="container px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Tips, guides, and reviews to help you shop smarter
            </p>
          </div>
        </section>

        <section className="py-20 bg-gradient-card">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-card transition-all duration-300">
                  <div className="aspect-video overflow-hidden bg-secondary/30">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button variant="outline">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
