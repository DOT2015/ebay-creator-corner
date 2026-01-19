import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  id?: string;
  title: string;
  description?: string;
  price: string;
  image: string;
  category?: string;
  platform?: string;
  affiliateLink?: string;
  buttonText: string;
  buttonVariant?: "default" | "secondary" | "accent";
  onButtonClick?: () => void;
}

const trackClick = async (productId: string | undefined, productTitle: string, platform: string, affiliateLink: string | undefined) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        productId,
        productTitle,
        platform,
        affiliateLink,
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to track click');
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }
};

const ProductCard = ({ 
  id,
  title, 
  description, 
  price, 
  image, 
  category,
  platform = 'other',
  affiliateLink,
  buttonText,
  buttonVariant = "default",
  onButtonClick 
}: ProductCardProps) => {
  
  const handleClick = async () => {
    // Track the click in the background
    trackClick(id, title, platform, affiliateLink);
    
    // Call the original handler
    if (onButtonClick) {
      onButtonClick();
    }
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
        <a 
          href={affiliateLink || '#'}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={handleClick}
          className={`inline-flex items-center justify-center w-full gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-9 px-3 ${
            buttonVariant === 'accent' 
              ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
              : buttonVariant === 'secondary'
              ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          {buttonText}
        </a>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
