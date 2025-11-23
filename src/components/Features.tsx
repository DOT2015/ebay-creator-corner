import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingUp, Users, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Setup",
      description: "Get started in minutes. No technical knowledge required—just sign up and start curating."
    },
    {
      icon: TrendingUp,
      title: "Track Earnings",
      description: "Real-time dashboard to monitor clicks, conversions, and commissions all in one place."
    },
    {
      icon: Users,
      title: "Perfect for Creators",
      description: "Built for TikTok, Instagram, YouTube, and blog creators. Share on any platform."
    },
    {
      icon: Shield,
      title: "Trusted Partner",
      description: "Powered by eBay's trusted marketplace with millions of products to choose from."
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Creators Love Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to monetize your influence and grow your income
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="text-center hover:shadow-soft transition-all duration-300 border-border/50"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
