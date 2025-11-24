import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Compare = () => {
  const comparisons = [
    {
      amazon: {
        title: "Premium Wireless Earbuds",
        price: "$79.99",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
        features: ["Active Noise Cancellation", "24hr Battery", "Premium Sound Quality"]
      },
      temu: {
        title: "Budget Wireless Earbuds",
        price: "$19.99",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
        features: ["Good Sound Quality", "12hr Battery", "Compact Design"]
      }
    },
    {
      amazon: {
        title: "Smart Watch Pro",
        price: "$299.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        features: ["GPS Tracking", "Heart Rate Monitor", "Water Resistant"]
      },
      temu: {
        title: "Fitness Tracker",
        price: "$29.99",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
        features: ["Step Counter", "Basic Heart Rate", "Water Resistant"]
      }
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-12 bg-gradient-hero text-white">
          <div className="container px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4">Amazon vs Temu Deals</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Compare similar products and find the best value for your budget
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {comparisons.map((comparison, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Amazon Product */}
                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                          Amazon
                        </span>
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30 mb-4">
                        <img
                          src={comparison.amazon.image}
                          alt={comparison.amazon.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{comparison.amazon.title}</h3>
                      <p className="text-3xl font-bold text-primary mb-4">{comparison.amazon.price}</p>
                      <ul className="space-y-2 mb-6">
                        {comparison.amazon.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buy on Amazon
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Temu Product */}
                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                          Temu
                        </span>
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30 mb-4">
                        <img
                          src={comparison.temu.image}
                          alt={comparison.temu.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{comparison.temu.title}</h3>
                      <p className="text-3xl font-bold text-accent mb-4">{comparison.temu.price}</p>
                      <ul className="space-y-2 mb-6">
                        {comparison.temu.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full bg-accent hover:bg-accent/90">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Shop on Temu
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
