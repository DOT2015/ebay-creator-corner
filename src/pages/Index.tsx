import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  link: string;
  platform: string;
}

const Index = () => {
  const [trendingAmazon, setTrendingAmazon] = useState<Product[]>([]);
  const [trendingTemu, setTrendingTemu] = useState<Product[]>([]);
  const [topPicks, setTopPicks] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const cleanPrice = (price: string) => {
    // Remove HTML tags and clean up price
    return price.replace(/<[^>]*>/g, '').trim();
  };

  const fetchProducts = async () => {
    // Fetch Amazon products
    const { data: amazonProducts } = await supabase
      .from('products')
      .select('*')
      .eq('platform', 'amazon')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(3);

    if (amazonProducts) {
      setTrendingAmazon(amazonProducts.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        price: cleanPrice(p.price),
        image: p.image_url,
        category: p.category,
        link: p.affiliate_link || '#',
        platform: p.platform,
      })));
    }

    // Fetch Temu products
    const { data: temuProducts } = await supabase
      .from('products')
      .select('*')
      .eq('platform', 'temu')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(3);

    if (temuProducts) {
      setTrendingTemu(temuProducts.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        price: cleanPrice(p.price),
        image: p.image_url,
        category: p.category,
        link: p.affiliate_link || '#',
        platform: p.platform,
      })));
    }

    // Fetch featured products for Daily Top Picks
    const { data: featuredProducts } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(3);

    if (featuredProducts) {
      setTopPicks(featuredProducts.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        price: cleanPrice(p.price),
        image: p.image_url,
        category: p.category,
        link: p.affiliate_link || '#',
        platform: p.platform,
      })));
    }
  };

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
              {trendingAmazon.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  platform={product.platform}
                  affiliateLink={product.link}
                  buttonText="Buy on Amazon"
                  buttonVariant="default"
                  onButtonClick={() => window.open(product.link, '_blank')}
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
              {trendingTemu.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  platform={product.platform}
                  affiliateLink={product.link}
                  buttonText="Shop on Temu"
                  buttonVariant="accent"
                  onButtonClick={() => window.open(product.link, '_blank')}
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
              {topPicks.map((product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  platform={product.platform}
                  affiliateLink={product.link}
                  buttonText="View Deal"
                  buttonVariant="secondary"
                  onButtonClick={() => window.open(product.link, '_blank')}
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
