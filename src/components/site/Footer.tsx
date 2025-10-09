import { useTemplate } from "@/contexts/TemplateContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { config } = useTemplate();

  return (
    <footer className="w-full py-12 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted source for honest product reviews and recommendations.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {config.navbar?.navItems?.map((item) => (
                <li key={item.id}>
                  <Link to={item.path} className="text-muted-foreground hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link to="/affiliate-disclaimer" className="text-muted-foreground hover:text-primary">Affiliate Disclaimer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
