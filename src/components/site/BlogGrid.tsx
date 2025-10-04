interface BlogGridProps {
  heading: string;
  description: string;
}

const BlogGrid = ({ heading, description }: BlogGridProps) => {
  // Mock blog posts - in real implementation, this would come from content generator JSON
  const posts = [
    { id: 1, title: "Getting Started with Affiliate Marketing", excerpt: "Learn the basics of building successful affiliate sites...", image: "" },
    { id: 2, title: "SEO Best Practices for 2025", excerpt: "Optimize your content for search engines with these proven strategies...", image: "" },
    { id: 3, title: "Choosing the Right Products", excerpt: "How to select affiliate products that convert...", image: "" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{heading}</h2>
        <p className="text-muted-foreground mb-8">{description}</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article key={post.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-muted"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <a href="#" className="text-primary hover:underline">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
