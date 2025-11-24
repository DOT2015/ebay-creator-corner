import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

const TemuDeals = () => {
  const products = [
    {
      title: "Wireless Earbuds",
      description: "Bluetooth 5.0 with charging case",
      price: "$19.99",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Phone Stand",
      description: "Adjustable and foldable",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Kitchen Storage Containers",
      description: "BPA-free 10-piece set",
      price: "$16.99",
      image: "https://images.unsplash.com/photo-1584269600519-112e9ba11f0c?w=500&h=500&fit=crop",
      category: "Kitchen"
    },
    {
      title: "Makeup Brush Set",
      description: "12 professional brushes",
      price: "$12.99",
      image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop",
      category: "Beauty"
    },
    {
      title: "Wall Shelves",
      description: "Floating shelves 3-pack",
      price: "$22.99",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop",
      category: "Home"
    },
    {
      title: "Yoga Mat",
      description: "Non-slip exercise mat",
      price: "$14.99",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
      category: "Fitness"
    },
    {
      title: "Travel Toiletry Bag",
      description: "Waterproof organizer",
      price: "$9.99",
      image: "https://images.unsplash.com/photo-1585916420730-d7f95e942d63?w=500&h=500&fit=crop",
      category: "Travel"
    },
    {
      title: "LED Desk Lamp",
      description: "USB rechargeable with touch control",
      price: "$18.99",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      category: "Home"
    },
    {
      title: "Reusable Water Bottle",
      description: "32oz stainless steel",
      price: "$11.99",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop",
      category: "Lifestyle"
    },
    {
      title: "Screen Protector 3-Pack",
      description: "Tempered glass for smartphones",
      price: "$7.99",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Laptop Sleeve",
      description: "Protective case 13-15 inch",
      price: "$13.99",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop",
      category: "Tech"
    },
    {
      title: "Measuring Spoons Set",
      description: "Stainless steel 6-piece",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop",
      category: "Kitchen"
    },
  ];

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
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
      </main>
      <Footer />
    </div>
  );
};

export default TemuDeals;
