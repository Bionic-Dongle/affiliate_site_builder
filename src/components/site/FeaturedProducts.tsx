import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";

interface FeaturedProductsProps {
  heading?: string;
  description?: string;
}

const FeaturedProducts = ({ 
  heading = "Top Picks This Week",
  description = "Our hand-picked selection of the best deals"
}: FeaturedProductsProps) => {
  const dummyProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$149.99",
      rating: 4.8,
      image: "/placeholder.svg",
      deal: "20% OFF"
    },
    {
      id: 2,
      name: "Smart Fitness Tracker",
      price: "$79.99",
      rating: 4.6,
      image: "/placeholder.svg",
      deal: "Best Seller"
    },
    {
      id: 3,
      name: "Portable Bluetooth Speaker",
      price: "$59.99",
      rating: 4.7,
      image: "/placeholder.svg",
      deal: "Editor's Choice"
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">{heading}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {dummyProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {product.deal}
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="ml-1 text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">• Verified Reviews</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{product.price}</span>
                  <Button>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Deal
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
