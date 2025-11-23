import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-hero rounded-3xl px-8 py-16 sm:px-16 sm:py-20 shadow-soft">
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of creators who are already monetizing their influence. 
              No credit card required. Get started in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg font-semibold group"
              >
                Create Your Storefront
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                Contact Sales
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
