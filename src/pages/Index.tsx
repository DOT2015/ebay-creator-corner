import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Index = () => {
  const trendingAmazon = [
    {
      title: "Wireless Noise-Cancelling Headphones",
      description: "Premium sound quality with active noise cancellation",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Smart Fitness Watch",
      description: "Track your health and fitness goals",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Stainless Steel Cookware Set",
      description: "Professional-grade kitchen essentials",
      price: "$199.99",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop",
      category: "Kitchen"
    },
  ];

  const trendingTemu = [
    {
      title: "LED Strip Lights",
      description: "Color-changing ambiance lighting",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
      category: "Home"
    },
    {
      title: "Portable Bluetooth Speaker",
      description: "Compact and powerful sound",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Minimalist Desk Organizer",
      description: "Keep your workspace tidy",
      price: "$15.99",
      image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&h=500&fit=crop",
      category: "Home"
    },
  ];

  const topPicks = [
    {
      title: "Professional Camera Lens",
      description: "Capture stunning photos",
      price: "$549.99",
      image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde9?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Designer Backpack",
      description: "Stylish and functional",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "Fashion"
    },
    {
      title: "Car Phone Mount",
      description: "Secure hands-free driving",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=500&fit=crop",
      category: "Car Accessories"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Trending Amazon Products */}
        <section className="py-20 bg-gradient-card">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Trending Amazon Products</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Handpicked deals from Amazon's best sellers
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingAmazon.map((product, index) => (
                <ProductCard 
                  key={index} 
                  {...product} 
                  buttonText="Buy on Amazon"
                  buttonVariant="default"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Temu Deals */}
        <section className="py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Trending Temu Deals</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Unbeatable prices on quality products
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingTemu.map((product, index) => (
                <ProductCard 
                  key={index} 
                  {...product} 
                  buttonText="Shop on Temu"
                  buttonVariant="accent"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Daily Top Picks */}
        <section className="py-20 bg-gradient-card">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Daily Top Picks</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our editors' favorite finds today
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPicks.map((product, index) => (
                <ProductCard 
                  key={index} 
                  {...product} 
                  buttonText="View Deal"
                  buttonVariant="secondary"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
