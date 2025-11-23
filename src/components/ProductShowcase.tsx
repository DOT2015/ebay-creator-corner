import ProductCard from "./ProductCard";

const ProductShowcase = () => {
  const products = [
    {
      title: "Wireless Noise-Cancelling Headphones",
      price: "$149.99",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      commission: "8%"
    },
    {
      title: "Smart Fitness Watch",
      price: "$299.99",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      commission: "10%"
    },
    {
      title: "Portable Bluetooth Speaker",
      price: "$79.99",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      commission: "7%"
    },
    {
      title: "Professional Camera Lens",
      price: "$549.99",
      image: "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde9?w=500&h=500&fit=crop",
      commission: "12%"
    },
    {
      title: "Designer Backpack",
      price: "$89.99",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      commission: "9%"
    },
    {
      title: "Minimalist Desk Lamp",
      price: "$45.99",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      commission: "6%"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Curated Products</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share products you love and earn commission on every sale. It's that simple.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
