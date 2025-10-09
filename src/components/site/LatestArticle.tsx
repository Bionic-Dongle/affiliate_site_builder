interface LatestArticleProps {
  heading?: string;
  description?: string;
}

const LatestArticle = ({ heading = "Latest Articles", description = "Check out our most recent posts" }: LatestArticleProps) => {
  // Mock articles - in real implementation, this would come from blog posts
  const articles = [
    {
      id: 1,
      title: "Getting Started with Affiliate Marketing in 2025",
      excerpt: "Learn the essential strategies and best practices for building a successful affiliate marketing business this year.",
      image: "",
      link: "/article"
    },
    {
      id: 2,
      title: "Top 10 Products to Promote This Season",
      excerpt: "Discover the trending products that are converting well and perfect for affiliate marketers right now.",
      image: "",
      link: "/article"
    },
    {
      id: 3,
      title: "SEO Tips for Affiliate Websites",
      excerpt: "Boost your organic traffic with these proven SEO strategies specifically designed for affiliate sites.",
      image: "",
      link: "/article"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">{heading}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="space-y-6">
            {articles.map((article, index) => (
              <div 
                key={article.id} 
                className={`flex flex-col md:flex-row bg-card rounded-2xl overflow-hidden border hover:shadow-lg transition-shadow ${
                  index === 0 ? 'md:min-h-[280px]' : ''
                }`}
              >
                <div className={`w-full md:w-1/3 bg-muted ${index === 0 ? 'h-64 md:h-auto' : 'h-48'}`}>
                  {article.image ? (
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Article Image
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold mb-2 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                  </div>
                  <a 
                    href={article.link} 
                    className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a 
              href="/blog" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span>To read more articles, visit our blog</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestArticle;
