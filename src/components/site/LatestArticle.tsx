interface LatestArticleProps {
  heading?: string;
  description?: string;
}

const LatestArticle = ({ heading = "Latest Article", description = "Check out our most recent post" }: LatestArticleProps) => {
  // Mock latest article - in real implementation, this would come from blog posts
  const article = {
    id: 1,
    title: "Getting Started with Affiliate Marketing in 2025",
    excerpt: "Learn the essential strategies and best practices for building a successful affiliate marketing business this year. From choosing the right products to optimizing your content for conversions...",
    image: "",
    date: new Date().toLocaleDateString(),
    author: "Admin",
    category: "Marketing"
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{heading}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <article className="border rounded-lg overflow-hidden hover:shadow-xl transition-shadow bg-card">
            <div className="h-64 md:h-96 bg-muted">
              {article.image ? (
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Featured Image
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.author}</span>
                <span>•</span>
                <span className="text-primary font-medium">{article.category}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{article.title}</h3>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{article.excerpt}</p>
              <a 
                href="/article" 
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Read Full Article →
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default LatestArticle;
