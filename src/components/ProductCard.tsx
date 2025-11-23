import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  commission: string;
}

const ProductCard = ({ title, price, image, commission }: ProductCardProps) => {
  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 overflow-hidden border-border/50">
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            {commission} commission
          </span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm" className="flex-1">
            <ExternalLink className="w-4 h-4 mr-2" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
