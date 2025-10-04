import { Laptop, Home, Shirt, Dumbbell, Heart, Plane, Grid3x3 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoriesBarProps {
  heading: string;
}

const CategoriesBar = ({ heading }: CategoriesBarProps) => {
  const categories = [
    { name: "All", icon: Grid3x3 },
    { name: "Tech", icon: Laptop },
    { name: "Home", icon: Home },
    { name: "Fashion", icon: Shirt },
    { name: "Sports", icon: Dumbbell },
    { name: "Health", icon: Heart },
    { name: "Travel", icon: Plane },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{heading}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <Card
                key={cat.name}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-none"
              >
                <button className="w-full p-6 flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-sm">{cat.name}</span>
                </button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesBar;
