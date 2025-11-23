import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Link, Eye, TrendingUp } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$2,847",
      label: "Total Earnings",
      change: "+12%"
    },
    {
      icon: Link,
      value: "156",
      label: "Shared Links",
      change: "+8%"
    },
    {
      icon: Eye,
      value: "12.4K",
      label: "Total Views",
      change: "+24%"
    },
    {
      icon: TrendingUp,
      value: "4.2%",
      label: "Conversion Rate",
      change: "+1.2%"
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Your Performance Dashboard</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your success with real-time analytics
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-border/50 hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
