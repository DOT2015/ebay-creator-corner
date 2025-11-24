import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  title: string;
  description?: string;
  price: string;
  image: string;
  category?: string;
  buttonText: string;
  buttonVariant?: "default" | "secondary" | "accent";
  onButtonClick?: () => void;
}

const ProductCard = ({ 
  title, 
  description, 
  price, 
  image, 
  category,
  buttonText,
  buttonVariant = "default",
  onButtonClick 
}: ProductCardProps) => {
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
        {category && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium mb-2 inline-block">
            {category}
          </span>
        )}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">{price}</span>
        </div>
        <Button 
          size="sm" 
          className={`w-full ${buttonVariant === 'accent' ? 'bg-accent hover:bg-accent/90' : ''}`}
          variant={buttonVariant === 'accent' ? 'default' : buttonVariant}
          onClick={onButtonClick}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
