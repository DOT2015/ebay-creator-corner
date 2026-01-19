import { ExternalLink } from "lucide-react";

interface TemuBannerProps {
  affiliateLink: string;
  variant?: "hero" | "inline" | "sidebar";
  className?: string;
}

const trackBannerClick = async (affiliateLink: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/track-click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        productId: null,
        productTitle: 'Temu Promotional Banner',
        platform: 'temu',
        affiliateLink,
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to track banner click');
    }
  } catch (error) {
    console.error('Error tracking banner click:', error);
  }
};

const TemuBanner = ({ 
  affiliateLink, 
  variant = "inline",
  className = ""
}: TemuBannerProps) => {
  
  const handleClick = () => {
    trackBannerClick(affiliateLink);
  };

  if (variant === "hero") {
    return (
      <a 
        href={affiliateLink}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onClick={handleClick}
        className={`block relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 p-8 md:p-12 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] ${className}`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              🔥 Exclusive Temu Deals
            </h3>
            <p className="text-white/90 text-lg">
              Shop millions of products at unbeatable prices. New user discounts available!
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-orange-50 transition-colors">
            <span>Shop Now</span>
            <ExternalLink className="w-5 h-5" />
          </div>
        </div>
      </a>
    );
  }

  if (variant === "sidebar") {
    return (
      <a 
        href={affiliateLink}
        target="_blank"
        rel="nofollow noopener noreferrer"
        onClick={handleClick}
        className={`block rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${className}`}
      >
        <div className="text-center">
          <span className="text-3xl mb-3 block">🛒</span>
          <h4 className="font-bold text-lg mb-2">Temu Deals</h4>
          <p className="text-white/80 text-sm mb-4">
            Discover amazing prices on trending products
          </p>
          <span className="inline-flex items-center gap-1 bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm">
            Shop Now <ExternalLink className="w-4 h-4" />
          </span>
        </div>
      </a>
    );
  }

  // Default inline variant
  return (
    <a 
      href={affiliateLink}
      target="_blank"
      rel="nofollow noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 p-4 md:p-6 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔥</span>
        <div>
          <h4 className="font-bold text-base md:text-lg">Shop Temu Deals</h4>
          <p className="text-white/80 text-sm hidden sm:block">Millions of products at low prices</p>
        </div>
      </div>
      <span className="flex items-center gap-1 bg-white text-orange-600 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap">
        Shop <ExternalLink className="w-4 h-4" />
      </span>
    </a>
  );
};

export default TemuBanner;
