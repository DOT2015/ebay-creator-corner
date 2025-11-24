import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { NavLink } from "./NavLink";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">SmartBuy Hub</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <NavLink 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground"
          >
            Home
          </NavLink>
          <NavLink 
            to="/amazon-deals" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground"
          >
            Amazon Deals
          </NavLink>
          <NavLink 
            to="/temu-deals" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground"
          >
            Temu Deals
          </NavLink>
          <NavLink 
            to="/compare" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground"
          >
            Compare
          </NavLink>
          <NavLink 
            to="/blog" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground"
          >
            Blog
          </NavLink>
          <NavLink 
            to="/contact" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground"
          >
            Contact
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
