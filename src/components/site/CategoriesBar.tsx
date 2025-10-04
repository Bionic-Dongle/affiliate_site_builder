import { Card } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface Category {
  name: string;
  iconName: string;
}

interface CategoriesBarProps {
  heading?: string;
  categories?: Category[];
}

const CategoriesBar = ({ 
  heading = "Browse Categories",
  categories = [
    { name: "All", iconName: "Grid3x3" },
    { name: "Tech", iconName: "Laptop" },
    { name: "Home", iconName: "Home" },
    { name: "Fashion", iconName: "Shirt" },
    { name: "Sports", iconName: "Dumbbell" },
    { name: "Health", iconName: "Heart" },
    { name: "Travel", iconName: "Plane" },
  ]
}: CategoriesBarProps) => {
  return (
    <section className="py-12 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">{heading}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = (Icons as any)[cat.iconName] || Icons.Tag;
            return (
              <Card
                key={idx}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 shadow-none"
              >
                <button className="w-full p-6 flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="w-6 h-6" />
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
