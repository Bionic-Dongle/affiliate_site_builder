interface CategoriesBarProps {
  heading: string;
}

const CategoriesBar = ({ heading }: CategoriesBarProps) => {
  const categories = ["All", "Tech", "Home", "Fashion", "Sports", "Health", "Travel"];

  return (
    <section className="py-6 bg-muted/30 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-sm font-medium mb-3">{heading}</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full border bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesBar;
