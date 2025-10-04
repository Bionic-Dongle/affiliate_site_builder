import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContentGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [contentType, setContentType] = useState("blog");

  // Blog post state
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImageAlt, setBlogImageAlt] = useState("");
  const [blogMetaDesc, setBlogMetaDesc] = useState("");

  // Product state
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productLink, setProductLink] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productRating, setProductRating] = useState("");

  const generateBlogJSON = () => {
    const json = {
      id: Date.now().toString(),
      title: blogTitle,
      content: blogContent,
      author: blogAuthor,
      image: blogImage,
      imageAlt: blogImageAlt,
      metaDescription: blogMetaDesc,
      publishedAt: new Date().toISOString(),
      slug: blogTitle.toLowerCase().replace(/\s+/g, '-')
    };
    return JSON.stringify(json, null, 2);
  };

  const generateProductJSON = () => {
    const json = {
      id: Date.now().toString(),
      name: productName,
      description: productDesc,
      price: productPrice,
      affiliateLink: productLink,
      image: productImage,
      rating: parseFloat(productRating) || 0,
      createdAt: new Date().toISOString()
    };
    return JSON.stringify(json, null, 2);
  };

  const handleCopy = () => {
    const jsonOutput = contentType === "blog" ? generateBlogJSON() : generateProductJSON();
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Paste this into your data file",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Content Input</CardTitle>
          <CardDescription>Fill in the details for your content</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={contentType} onValueChange={setContentType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blog">Blog Post</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="directory">Directory</TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="blog-title">Title</Label>
                <Input
                  id="blog-title"
                  placeholder="Best Affiliate Products for 2025"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-image">Main Image URL</Label>
                <Input
                  id="blog-image"
                  placeholder="https://example.com/blog-hero-image.jpg"
                  value={blogImage}
                  onChange={(e) => setBlogImage(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-image-alt">Image Alt Text (SEO)</Label>
                <Input
                  id="blog-image-alt"
                  placeholder="Descriptive text for image (improves SEO & accessibility)"
                  value={blogImageAlt}
                  onChange={(e) => setBlogImageAlt(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-content">Content</Label>
                <Textarea
                  id="blog-content"
                  placeholder="Write your blog post content..."
                  rows={6}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-author">Author</Label>
                <Input
                  id="blog-author"
                  placeholder="John Doe"
                  value={blogAuthor}
                  onChange={(e) => setBlogAuthor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-meta">Meta Description (SEO)</Label>
                <Textarea
                  id="blog-meta"
                  placeholder="SEO-optimized description (160 chars max)"
                  rows={2}
                  maxLength={160}
                  value={blogMetaDesc}
                  onChange={(e) => setBlogMetaDesc(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="product" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input
                  id="product-name"
                  placeholder="Premium Wireless Headphones"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-desc">Description</Label>
                <Textarea
                  id="product-desc"
                  placeholder="Product features and benefits..."
                  rows={4}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price</Label>
                  <Input
                    id="product-price"
                    placeholder="$99.99"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-rating">Rating</Label>
                  <Input
                    id="product-rating"
                    type="number"
                    step="0.1"
                    max="5"
                    placeholder="4.5"
                    value={productRating}
                    onChange={(e) => setProductRating(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-link">Affiliate Link</Label>
                <Input
                  id="product-link"
                  placeholder="https://affiliate-link.com/..."
                  value={productLink}
                  onChange={(e) => setProductLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-image">Image URL</Label>
                <Input
                  id="product-image"
                  placeholder="https://..."
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
              </div>
            </TabsContent>

            <TabsContent value="directory" className="space-y-4 mt-4">
              <p className="text-sm text-muted-foreground">
                Directory listings coming soon - similar structure to products with categories
              </p>
            </TabsContent>
          </Tabs>

          <Button onClick={handleCopy} className="w-full mt-6" size="lg">
            {copied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Generate & Copy JSON
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>JSON Output Preview</CardTitle>
          <CardDescription>This is what you'll paste into your data files</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-[600px]">
            <code>
              {contentType === "blog" ? generateBlogJSON() : generateProductJSON()}
            </code>
          </pre>
          <div className="mt-4 p-3 bg-accent rounded-lg">
            <p className="text-sm font-medium mb-1">Next Steps:</p>
            <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Click "Generate & Copy JSON" above</li>
              <li>Open <code className="bg-background px-1 rounded">/src/data/{contentType}s.json</code></li>
              <li>Add the JSON to your array</li>
              <li>Site rebuilds automatically</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentGenerator;
