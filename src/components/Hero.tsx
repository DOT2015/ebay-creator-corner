import { Button } from "@/components/ui/button";
import { Package, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-hero py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">Your Trusted Deals & Product Picks</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            BuSmarter Hub
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover the best deals from Amazon and Temu. Curated products, honest reviews, and exclusive offers - all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/amazon-deals">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg bg-white text-foreground hover:bg-white/90 shadow-lg"
              >
                <div className="mr-3 p-2 bg-muted rounded-lg">
                  <Package className="h-5 w-5" />
                </div>
                Browse Amazon Deals
              </Button>
            </Link>
            <Link to="/temu-deals">
              <Button 
                size="lg" 
                className="text-lg bg-accent hover:bg-accent/90 text-white shadow-lg"
              >
                Explore Temu Offers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
