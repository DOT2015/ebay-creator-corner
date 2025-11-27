import { ShoppingCart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <span className="text-lg font-bold">BuySmarter Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for the best deals from Amazon and Temu.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="/amazon-deals" className="hover:text-foreground transition-colors">Amazon Deals</a></li>
              <li><a href="/temu-deals" className="hover:text-foreground transition-colors">Temu Deals</a></li>
              <li><a href="/compare" className="hover:text-foreground transition-colors">Compare</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Affiliate Disclosure:</strong> As an Amazon Associate, I earn from qualifying purchases. This site also contains affiliate links to Temu and other partners. When you purchase through these links, we may earn a commission at no additional cost to you.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BuySmarter Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
