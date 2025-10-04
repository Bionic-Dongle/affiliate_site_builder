import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SearchBar from "@/components/site/SearchBar";
import Sidebar from "@/components/site/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Blog = () => {
  // Mock blog posts
  const posts = [
    {
      id: 1,
      title: "10 Essential Tips for Choosing the Perfect Running Shoes",
      excerpt: "Discover the key factors to consider when selecting running shoes that match your style, terrain, and fitness goals. From arch support to cushioning...",
      image: "",
      category: "Fitness",
      author: "Sarah Johnson",
      date: "March 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Smart Home Devices That Actually Save You Money",
      excerpt: "Not all smart home gadgets are worth the investment. We break down which devices provide real savings on your energy bills and which ones are just hype...",
      image: "",
      category: "Tech",
      author: "Mike Chen",
      date: "March 12, 2025",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "The Ultimate Guide to Kitchen Knives: Chef's Recommendations",
      excerpt: "Professional chefs share their insights on building the perfect knife collection. Learn about blade types, materials, and maintenance tips...",
      image: "",
      category: "Home & Kitchen",
      author: "Emily Rodriguez",
      date: "March 10, 2025",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Wireless Earbuds Under $100: Our Top 5 Picks for 2025",
      excerpt: "You don't need to break the bank for quality audio. These budget-friendly earbuds deliver impressive sound, comfort, and battery life...",
      image: "",
      category: "Audio",
      author: "David Park",
      date: "March 8, 2025",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "How to Build a Capsule Wardrobe: Minimalist Fashion Guide",
      excerpt: "Simplify your closet and elevate your style with our complete guide to creating a versatile, timeless capsule wardrobe that works for any season...",
      image: "",
      category: "Fashion",
      author: "Lisa Thompson",
      date: "March 5, 2025",
      readTime: "8 min read"
    },
    {
      id: 6,
      title: "Best Camping Gear for Beginners: Everything You Need",
      excerpt: "Planning your first camping trip? We've compiled a comprehensive list of essential gear that won't overwhelm your budget or your backpack...",
      image: "",
      category: "Outdoor",
      author: "Tom Wilson",
      date: "March 3, 2025",
      readTime: "6 min read"
    },
    {
      id: 7,
      title: "Coffee Makers Compared: Drip vs. Espresso vs. French Press",
      excerpt: "Each brewing method has its advantages. We compare the top coffee makers in each category to help you find your perfect morning cup...",
      image: "",
      category: "Home & Kitchen",
      author: "Sarah Johnson",
      date: "March 1, 2025",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "Gaming Chairs vs. Office Chairs: Which Is Better for Your Back?",
      excerpt: "Long hours at your desk require proper support. We examine ergonomics, comfort, and value to determine which chair type wins...",
      image: "",
      category: "Gaming",
      author: "Mike Chen",
      date: "February 28, 2025",
      readTime: "7 min read"
    },
    {
      id: 9,
      title: "Skincare Products That Dermatologists Actually Recommend",
      excerpt: "Cut through the marketing hype with expert advice on which skincare products deliver real results for different skin types and concerns...",
      image: "",
      category: "Beauty",
      author: "Dr. Jennifer Lee",
      date: "February 25, 2025",
      readTime: "6 min read"
    }
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

      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest Articles</h1>
          <p className="text-xl text-muted-foreground mb-6">Expert reviews, buying guides, and product comparisons</p>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
            <Input 
              placeholder="Search articles..." 
              className="flex-1"
            />
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="home">Home & Kitchen</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
              </SelectContent>
            </Select>
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Blog Posts Grid */}
            <div className="space-y-6">
              {posts.map((post) => (
                <article 
                  key={post.id} 
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
                >
                  <div className="md:flex">
                    <div className="md:w-64 h-48 md:h-auto bg-muted flex-shrink-0"></div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                        <a href="#">{post.title}</a>
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">By {post.author}</span>
                        <a 
                          href="#" 
                          className="text-primary hover:underline flex items-center gap-1 font-medium"
                        >
                          Read More <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 pt-8">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                  Next
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Sidebar 
                heading="Popular Posts" 
                description="Most read this week"
              />
              
              {/* Newsletter */}
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-bold mb-2">Newsletter</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get weekly reviews and deals delivered to your inbox
                </p>
                <Input placeholder="Your email" className="mb-3" />
                <Button className="w-full">Subscribe</Button>
              </div>

              {/* Categories */}
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="text-lg font-bold mb-4">Categories</h3>
                <div className="space-y-2">
                  {["Tech", "Fitness", "Home & Kitchen", "Outdoor", "Fashion", "Gaming", "Beauty"].map((cat) => (
                    <a 
                      key={cat}
                      href="#" 
                      className="block text-sm hover:text-primary transition-colors py-1"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
