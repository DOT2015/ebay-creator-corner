import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
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

const AmazonDeals = () => {
  const [products, setProducts] = useState<Record<string, Product[]>>({
    tech: [],
    home: [],
    kitchen: [],
    beauty: [],
    fashion: [],
    car: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const cleanPrice = (price: string) => {
    return price.replace(/<[^>]*>/g, '').trim();
  };

  const fetchProducts = async () => {
    const { data: amazonProducts } = await supabase
      .from('products')
      .select('*')
      .eq('platform', 'amazon')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (amazonProducts) {
      const categorizedProducts: Record<string, Product[]> = {
        tech: [],
        home: [],
        kitchen: [],
        beauty: [],
        fashion: [],
        car: [],
      };

      amazonProducts.forEach(p => {
        const product: Product = {
          id: p.id,
          title: p.title,
          description: p.description || '',
          price: cleanPrice(p.price),
          image: p.image_url,
          category: p.category === 'car_accessories' ? 'Car Accessories' : 
                    p.category.charAt(0).toUpperCase() + p.category.slice(1),
          link: p.affiliate_link || '#',
          platform: 'amazon',
        };

        const categoryKey = p.category === 'car_accessories' ? 'car' : p.category;
        if (categorizedProducts[categoryKey]) {
          categorizedProducts[categoryKey].push(product);
        }
      });

      setProducts(categorizedProducts);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-12 bg-gradient-hero text-white">
          <div className="container px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Amazon Deals</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Browse our curated collection of the best Amazon products across all categories
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="tech" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-12">
                <TabsTrigger value="tech">Tech</TabsTrigger>
                <TabsTrigger value="home">Home</TabsTrigger>
                <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                <TabsTrigger value="beauty">Beauty</TabsTrigger>
                <TabsTrigger value="fashion">Fashion</TabsTrigger>
                <TabsTrigger value="car">Car Accessories</TabsTrigger>
              </TabsList>

              {Object.entries(products).map(([key, categoryProducts]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryProducts.length > 0 ? (
                      categoryProducts.map((product) => (
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
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-full text-center py-8">
                        No products available in this category yet.
                      </p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AmazonDeals;
