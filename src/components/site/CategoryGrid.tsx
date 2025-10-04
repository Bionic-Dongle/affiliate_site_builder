interface CategoryGridProps {
  heading: string;
  description: string;
  images: string[];
}

const CategoryGrid = ({ heading, description, images }: CategoryGridProps) => {
  const categories = [
    { name: "Electronics", image: images[0] },
    { name: "Home & Garden", image: images[1] },
    { name: "Fashion", image: images[2] },
    { name: "Sports", image: images[3] },
    { name: "Books", image: images[4] },
    { name: "Health", image: images[5] },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{heading}</h2>
        <p className="text-muted-foreground mb-8">{description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <a 
              key={idx}
              href="#"
              className="aspect-square rounded-lg border bg-card hover:shadow-lg transition-shadow flex items-center justify-center"
              style={cat.image ? { backgroundImage: `url(${cat.image})`, backgroundSize: 'cover' } : {}}
            >
              <span className="font-semibold text-center px-2">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
