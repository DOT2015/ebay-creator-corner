import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AmazonDeals = () => {
  const categories = {
    tech: [
      {
        title: "4K Webcam for Streaming",
        description: "Crystal clear video quality for professionals",
        price: "$129.99",
        image: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop",
        category: "Tech"
      },
      {
        title: "Mechanical Gaming Keyboard",
        description: "RGB backlit with responsive switches",
        price: "$89.99",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
        category: "Tech"
      },
      {
        title: "Wireless Mouse",
        description: "Ergonomic design for all-day comfort",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
        category: "Tech"
      },
    ],
    home: [
      {
        title: "Air Purifier",
        description: "HEPA filter for cleaner air",
        price: "$149.99",
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop",
        category: "Home"
      },
      {
        title: "Smart LED Bulbs 4-Pack",
        description: "Voice controlled lighting",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
        category: "Home"
      },
      {
        title: "Memory Foam Pillow",
        description: "Ultimate comfort for better sleep",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&h=500&fit=crop",
        category: "Home"
      },
    ],
    kitchen: [
      {
        title: "Air Fryer",
        description: "Healthy cooking made easy",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=500&h=500&fit=crop",
        category: "Kitchen"
      },
      {
        title: "Coffee Maker",
        description: "Programmable brewing system",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
        category: "Kitchen"
      },
      {
        title: "Knife Set",
        description: "Professional chef quality",
        price: "$59.99",
        image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=500&h=500&fit=crop",
        category: "Kitchen"
      },
    ],
    beauty: [
      {
        title: "Facial Cleansing Brush",
        description: "Deep cleaning sonic technology",
        price: "$49.99",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&h=500&fit=crop",
        category: "Beauty"
      },
      {
        title: "Hair Straightener",
        description: "Ceramic plates for smooth results",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop",
        category: "Beauty"
      },
      {
        title: "LED Makeup Mirror",
        description: "Adjustable lighting for perfect makeup",
        price: "$44.99",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&h=500&fit=crop",
        category: "Beauty"
      },
    ],
    fashion: [
      {
        title: "Sunglasses",
        description: "UV protection with style",
        price: "$24.99",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
        category: "Fashion"
      },
      {
        title: "Leather Wallet",
        description: "RFID blocking slim design",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
        category: "Fashion"
      },
      {
        title: "Crossbody Bag",
        description: "Versatile everyday essential",
        price: "$34.99",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=500&fit=crop",
        category: "Fashion"
      },
    ],
    car: [
      {
        title: "Dash Cam",
        description: "1080p HD recording",
        price: "$69.99",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=500&fit=crop",
        category: "Car Accessories"
      },
      {
        title: "Car Vacuum Cleaner",
        description: "Portable and powerful",
        price: "$39.99",
        image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=500&h=500&fit=crop",
        category: "Car Accessories"
      },
      {
        title: "Tire Pressure Gauge",
        description: "Digital accuracy",
        price: "$14.99",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&h=500&fit=crop",
        category: "Car Accessories"
      },
    ],
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

              {Object.entries(categories).map(([key, products]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <ProductCard
                        key={index}
                        {...product}
                        buttonText="Buy on Amazon"
                        buttonVariant="default"
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

export default AmazonDeals;
