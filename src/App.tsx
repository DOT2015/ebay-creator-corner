import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import AmazonDeals from "./pages/AmazonDeals";
import TemuDeals from "./pages/TemuDeals";
import Compare from "./pages/Compare";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/products/ProductList";
import ProductForm from "./pages/admin/products/ProductForm";
import LinkManager from "./pages/admin/links/LinkManager";
import BlogList from "./pages/admin/blog/BlogList";
import BlogForm from "./pages/admin/blog/BlogForm";
import ComparisonManager from "./pages/admin/comparisons/ComparisonManager";
import ComparisonForm from "./pages/admin/comparisons/ComparisonForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/amazon-deals" element={<AmazonDeals />} />
            <Route path="/temu-deals" element={<TemuDeals />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/new" element={<ProductForm />} />
            <Route path="/admin/products/:id" element={<ProductForm />} />
            <Route path="/admin/links" element={<LinkManager />} />
            <Route path="/admin/blog" element={<BlogList />} />
            <Route path="/admin/blog/new" element={<BlogForm />} />
            <Route path="/admin/blog/:id" element={<BlogForm />} />
            <Route path="/admin/comparisons" element={<ComparisonManager />} />
            <Route path="/admin/comparisons/new" element={<ComparisonForm />} />
            <Route path="/admin/comparisons/:id" element={<ComparisonForm />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
