import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  title: string;
  description?: string;
  price: string;
  image: string;
  category?: string;
  link?: string;
}

const TemuDeals = () => {
  const [products, setProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('platform', 'temu')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching products:', error);
      return;
    }

    // Group products by category
    const groupedProducts: Record<string, Product[]> = {};
    data?.forEach((product) => {
      const category = product.category || 'other';
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push({
        title: product.title,
        description: product.description || '',
        price: product.price,
        image: product.image_url,
        category: category,
        link: product.affiliate_link || undefined,
      });
    });

    setProducts(groupedProducts);
  };

  const allProducts = Object.values(products).flat();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-12 bg-accent text-white">
          <div className="container px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Temu Deals</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover incredible prices on quality products - shop smart, save more
            </p>
          </div>
        </section>

        <section className="py-20 bg-gradient-card">
          <div className="container px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-3xl mx-auto mb-12" style={{ gridTemplateColumns: `repeat(${Object.keys(products).length + 1}, minmax(0, 1fr))` }}>
                <TabsTrigger value="all">All Products</TabsTrigger>
                {Object.keys(products).map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {allProducts.length > 0 ? (
                    allProducts.map((product, index) => (
                      <ProductCard
                        key={index}
                        {...product}
                        buttonText="Shop on Temu"
                        buttonVariant="accent"
                        onButtonClick={() => product.link && window.open(product.link, '_blank')}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground col-span-full py-12">
                      No products available yet. Check back soon!
                    </p>
                  )}
                </div>
              </TabsContent>

              {Object.entries(products).map(([category, categoryProducts]) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product, index) => (
                      <ProductCard
                        key={index}
                        {...product}
                        buttonText="Shop on Temu"
                        buttonVariant="accent"
                        onButtonClick={() => product.link && window.open(product.link, '_blank')}
                      />
                    ))}
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

export default TemuDeals;
