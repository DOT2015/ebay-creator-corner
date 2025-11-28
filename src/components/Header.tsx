import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLink } from "./NavLink";
import logo from "@/assets/buysmarter-logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img src={logo} alt="BuySmarter Hub" className="w-8 h-8" />
          <span className="text-xl font-bold">BuySmarter Hub</span>
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLink 
                  to="/" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  activeClassName="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/amazon-deals" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  activeClassName="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Amazon Deals
                </NavLink>
                <NavLink 
                  to="/temu-deals" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  activeClassName="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Temu Deals
                </NavLink>
                <NavLink 
                  to="/compare" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  activeClassName="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Compare
                </NavLink>
                <NavLink 
                  to="/blog" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  activeClassName="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Blog
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  activeClassName="text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
