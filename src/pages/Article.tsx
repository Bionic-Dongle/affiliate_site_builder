import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Sidebar from "@/components/site/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Mail, ArrowRight } from "lucide-react";

const Article = () => {
  // Mock article data
  const article = {
    title: "10 Essential Tips for Choosing the Perfect Running Shoes",
    category: "Fitness",
    author: "Sarah Johnson",
    date: "March 15, 2025",
    readTime: "8 min read",
    image: "",
    content: `
      <p>Finding the right running shoes can make the difference between an enjoyable run and a painful experience. With so many options available, it's easy to feel overwhelmed. This comprehensive guide will help you navigate the world of running shoes and find the perfect pair for your needs.</p>

      <h2>1. Understand Your Foot Type</h2>
      <p>Before you start shopping, it's crucial to understand your foot type. Are you a neutral runner, or do you overpronate or underpronate? Visit a specialty running store for a gait analysis, or perform the "wet test" at home: wet your feet, step on a piece of paper, and examine your footprint.</p>

      <div class="affiliate-callout">
        <h3>🏃‍♀️ Top Pick: Nike Air Zoom Pegasus 40</h3>
        <p>Perfect for neutral runners seeking a versatile daily trainer. Responsive cushioning meets durability.</p>
        <a href="#" class="affiliate-link">Check Current Price →</a>
      </div>

      <h2>2. Consider Your Running Surface</h2>
      <p>Where you run matters. Road running requires different shoes than trail running. Road shoes prioritize cushioning and flexibility, while trail shoes offer more aggressive tread patterns and protective features.</p>

      <h2>3. Don't Skip the Fit Test</h2>
      <p>Always try shoes on in the afternoon when your feet are slightly swollen from daily activity. Wear your running socks, and make sure there's about a thumb's width of space between your longest toe and the end of the shoe.</p>

      <h2>4. Prioritize Comfort Over Brand</h2>
      <p>While brand loyalty is common, the most important factor is how the shoe feels on your foot. What works for your running buddy might not work for you. Trust your comfort level above all else.</p>

      <div class="affiliate-callout">
        <h3>💰 Budget Option: ASICS Gel-Contend 7</h3>
        <p>Excellent value for beginner runners. Reliable cushioning without breaking the bank.</p>
        <a href="#" class="affiliate-link">See Deal →</a>
      </div>

      <h2>5. Replace Your Shoes Regularly</h2>
      <p>Running shoes typically last 300-500 miles. Track your mileage and watch for signs of wear: compressed midsoles, worn outsoles, or decreased cushioning. Your body will thank you for staying on top of replacements.</p>

      <h2>6. Break Them In Gradually</h2>
      <p>Even the perfect shoe needs a break-in period. Start with shorter runs and gradually increase distance. This allows your feet to adjust and helps prevent blisters.</p>

      <h2>7. Consider Your Running Goals</h2>
      <p>Training for a marathon? Look for shoes with extra cushioning. Working on speed? Lighter, more responsive shoes might be better. Match your shoes to your training objectives.</p>

      <h2>8. Don't Forget About Socks</h2>
      <p>Your socks are just as important as your shoes. Invest in moisture-wicking running socks to prevent blisters and keep your feet comfortable.</p>

      <div class="affiliate-callout">
        <h3>⭐ Premium Choice: Hoka Clifton 9</h3>
        <p>Maximum cushioning for long-distance comfort. Surprisingly lightweight for its level of protection.</p>
        <a href="#" class="affiliate-link">View on Amazon →</a>
      </div>

      <h2>9. Shop at the Right Time</h2>
      <p>Look for sales during major shopping holidays, or wait for new model releases when previous versions go on sale. You can save 30-50% without sacrificing quality.</p>

      <h2>10. Listen to Your Body</h2>
      <p>If you experience persistent pain or discomfort, it might be time to reassess your shoe choice. Don't ignore warning signs – the wrong shoes can lead to injuries.</p>

      <h2>Final Thoughts</h2>
      <p>Choosing the right running shoes is a personal journey. What works perfectly for one runner might not suit another. Take your time, do your research, and don't be afraid to try different options. Your perfect pair is out there!</p>
    `
  };

  const relatedPosts = [
    { title: "Best Running Apps to Track Your Progress", category: "Fitness", image: "" },
    { title: "Strength Training for Runners: Complete Guide", category: "Fitness", image: "" },
    { title: "Nutrition Tips for Distance Runners", category: "Fitness", image: "" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        siteName="Peak Reviews"
        navItems={[
          { label: "Home", path: "/" },
          { label: "Blog", path: "/blog" },
          { label: "Reviews", path: "/reviews" },
        ]}
        showSearch={true}
      />

      <article className="flex-1">
        {/* Article Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">{article.category}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">
            {/* Featured Image - Full Width Across Both Columns */}
            <div className="lg:col-span-2 -mt-20 mb-8">
              <div className="aspect-video bg-muted rounded-lg shadow-lg"></div>
            </div>
            {/* Main Content */}
            <div className="max-w-3xl">
              {/* Social Share Buttons */}
              <div className="flex items-center gap-2 mb-8 pb-6 border-b">
                <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>

              {/* Article Body */}
              <div className="prose prose-lg max-w-none">
                <p className="lead text-xl text-muted-foreground mb-8">
                  Finding the right running shoes can make the difference between an enjoyable run and a painful experience. With so many options available, it's easy to feel overwhelmed. This comprehensive guide will help you navigate the world of running shoes and find the perfect pair for your needs.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">1. Understand Your Foot Type</h2>
                <p className="mb-6">
                  Before you start shopping, it's crucial to understand your foot type. Are you a neutral runner, or do you overpronate or underpronate? Visit a specialty running store for a gait analysis, or perform the "wet test" at home: wet your feet, step on a piece of paper, and examine your footprint.
                </p>

                {/* Affiliate Product Callout */}
                <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
                  <h3 className="text-xl font-bold mb-2">🏃‍♀️ Top Pick: Nike Air Zoom Pegasus 40</h3>
                  <p className="text-muted-foreground mb-4">
                    Perfect for neutral runners seeking a versatile daily trainer. Responsive cushioning meets durability.
                  </p>
                  <Button className="w-full sm:w-auto">
                    Check Current Price <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">2. Consider Your Running Surface</h2>
                <p className="mb-6">
                  Where you run matters. Road running requires different shoes than trail running. Road shoes prioritize cushioning and flexibility, while trail shoes offer more aggressive tread patterns and protective features.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">3. Don't Skip the Fit Test</h2>
                <p className="mb-6">
                  Always try shoes on in the afternoon when your feet are slightly swollen from daily activity. Wear your running socks, and make sure there's about a thumb's width of space between your longest toe and the end of the shoe.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">4. Prioritize Comfort Over Brand</h2>
                <p className="mb-6">
                  While brand loyalty is common, the most important factor is how the shoe feels on your foot. What works for your running buddy might not work for you. Trust your comfort level above all else.
                </p>

                {/* Budget Option Callout */}
                <div className="my-8 p-6 bg-accent/5 border-l-4 border-accent rounded-r-lg">
                  <h3 className="text-xl font-bold mb-2">💰 Budget Option: ASICS Gel-Contend 7</h3>
                  <p className="text-muted-foreground mb-4">
                    Excellent value for beginner runners. Reliable cushioning without breaking the bank.
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto">
                    See Deal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">5. Replace Your Shoes Regularly</h2>
                <p className="mb-6">
                  Running shoes typically last 300-500 miles. Track your mileage and watch for signs of wear: compressed midsoles, worn outsoles, or decreased cushioning. Your body will thank you for staying on top of replacements.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">Final Thoughts</h2>
                <p className="mb-6">
                  Choosing the right running shoes is a personal journey. What works perfectly for one runner might not suit another. Take your time, do your research, and don't be afraid to try different options. Your perfect pair is out there!
                </p>
              </div>

              <Separator className="my-8" />

              {/* Author Bio */}
              <div className="flex gap-4 p-6 bg-muted/50 rounded-lg">
                <div className="h-16 w-16 rounded-full bg-muted flex-shrink-0"></div>
                <div>
                  <h3 className="font-bold mb-1">{article.author}</h3>
                  <p className="text-sm text-muted-foreground">
                    Sarah is a certified running coach and product reviewer with over 10 years of experience helping runners find their perfect gear. She's completed 15 marathons and counting.
                  </p>
                </div>
              </div>

              {/* Related Posts */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((post, index) => (
                    <a key={index} href="#" className="group">
                      <div className="aspect-video bg-muted rounded-lg mb-3 group-hover:opacity-80 transition-opacity"></div>
                      <Badge variant="secondary" className="mb-2 text-xs">{post.category}</Badge>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Table of Contents */}
              <div className="border rounded-lg p-6 bg-card sticky top-20">
                <h3 className="text-lg font-bold mb-4">Table of Contents</h3>
                <nav className="space-y-2 text-sm">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    1. Understand Your Foot Type
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    2. Consider Your Running Surface
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    3. Don't Skip the Fit Test
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    4. Prioritize Comfort Over Brand
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    5. Replace Your Shoes Regularly
                  </a>
                </nav>
              </div>

              {/* Newsletter */}
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get weekly reviews and deals delivered to your inbox
                </p>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-3 py-2 border rounded-md mb-3"
                />
                <Button className="w-full">Subscribe</Button>
              </div>

              {/* Popular Posts */}
              <Sidebar 
                heading="Popular Posts" 
                description="Most read this week"
              />
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default Article;
