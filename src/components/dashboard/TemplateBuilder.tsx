import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Copy, CheckCircle, Layout, Link as LinkIcon, Plus, Trash2, Menu, ChevronDown, Type, Search, TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  fields: {
    heading?: string;
    subheading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
    images?: string[];
    adScript?: string;
    adUnits?: {
      headerBanner?: string;
      sidebarTop?: string;
      inContent?: string;
      footer?: string;
    };
  };
}

interface CTAButton {
  id: string;
  text: string;
  affiliateUrl: string;
  affiliateId: string;
  trackingParams?: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const TemplateBuilder = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [siteComponentsOpen, setSiteComponentsOpen] = useState(true);
  
  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");
  
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoImage, setSeoImage] = useState("");
  const [posthogKey, setPosthogKey] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [searchConsoleCode, setSearchConsoleCode] = useState("");
  
  const [adNetworkScript, setAdNetworkScript] = useState("");
  const [adPlacements, setAdPlacements] = useState({
    hero: { enabled: false, position: "bottom" },
    blogGrid: { enabled: false, position: "middle" },
    sidebar: { enabled: false, position: "top" },
    footer: { enabled: false, position: "top" },
    inContent: { enabled: false, position: "middle" },
  });
  
  const [navbarEnabled, setNavbarEnabled] = useState(true);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "nav-1", label: "Home", path: "/" },
    { id: "nav-2", label: "Reviews", path: "/reviews" },
    { id: "nav-3", label: "Contact", path: "/contact" },
  ]);
  
  const [ctaButtons, setCtaButtons] = useState<CTAButton[]>([
    {
      id: "cta-1",
      text: "Shop Now",
      affiliateUrl: "",
      affiliateId: "",
      trackingParams: "",
    },
  ]);

  const [sections, setSections] = useState<SectionConfig[]>([
    {
      id: "hero",
      name: "Hero Section",
      enabled: false,
      fields: {
        heading: "Elevate Your Choices",
        subheading: "Honest product reviews and buying guides",
        buttonText: "Explore Reviews",
        buttonLink: "/reviews",
        backgroundImage: "",
      },
    },
    {
      id: "blog-grid",
      name: "Blog Posts Grid",
      enabled: false,
      fields: {
        heading: "Latest Articles",
        description: "Fresh insights and expert reviews",
      },
    },
    {
      id: "categories-bar",
      name: "Categories/Tags Bar",
      enabled: false,
      fields: {
        heading: "Browse Categories",
      },
    },
    {
      id: "search-bar",
      name: "Search Bar",
      enabled: false,
      fields: {
        heading: "Search",
      },
    },
    {
      id: "sidebar",
      name: "Sidebar",
      enabled: false,
      fields: {
        heading: "Popular Posts",
        description: "Trending content and categories",
      },
    },
    {
      id: "categories",
      name: "Category Grid",
      enabled: false,
      fields: {
        heading: "Find Your Peak",
        description: "Explore our carefully curated categories",
        images: ["", "", "", "", "", ""],
      },
    },
    {
      id: "reviews",
      name: "Product Reviews Section",
      enabled: false,
      fields: {
        heading: "Latest Peak Reviews",
        description: "Fresh insights on the newest products",
        images: ["", "", ""],
      },
    },
    {
      id: "newsletter",
      name: "Newsletter Signup",
      enabled: false,
      fields: {
        heading: "Peak Picks Weekly",
        description: "Get our best product recommendations and exclusive deals",
        buttonText: "Get Peak Picks",
        backgroundImage: "",
      },
    },
    {
      id: "footer",
      name: "Footer",
      enabled: false,
      fields: {},
    },
  ]);

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  const updateField = (sectionId: string, field: string, value: any) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, fields: { ...section.fields, [field]: value } }
          : section
      )
    );
  };

  const updateImageArray = (sectionId: string, index: number, value: string) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id === sectionId && section.fields.images) {
          const newImages = [...section.fields.images];
          newImages[index] = value;
          return { ...section, fields: { ...section.fields, images: newImages } };
        }
        return section;
      })
    );
  };

  const addNavItem = () => {
    setNavItems((prev) => [
      ...prev,
      {
        id: `nav-${prev.length + 1}`,
        label: "New Page",
        path: "/page",
      },
    ]);
  };

  const removeNavItem = (id: string) => {
    setNavItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateNavItem = (id: string, field: keyof NavItem, value: string) => {
    setNavItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addCTAButton = () => {
    setCtaButtons((prev) => [
      ...prev,
      {
        id: `cta-${prev.length + 1}`,
        text: "Shop Now",
        affiliateUrl: "",
        affiliateId: "",
        trackingParams: "",
      },
    ]);
  };

  const removeCTAButton = (id: string) => {
    setCtaButtons((prev) => prev.filter((btn) => btn.id !== id));
  };

  const updateCTAButton = (id: string, field: keyof CTAButton, value: string) => {
    setCtaButtons((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, [field]: value } : btn))
    );
  };

  const generateTemplateConfig = () => {
    const enabledSections = sections.filter((s) => s.enabled);
    const config = {
      siteName: "My Affiliate Site",
      template: "peak-inspire",
      typography: {
        headingFont: headingFont,
        bodyFont: bodyFont,
      },
      seo: {
        defaultTitle: seoTitle,
        defaultDescription: seoDescription,
        ogImage: seoImage,
        posthogKey: posthogKey,
        googleAnalyticsId: googleAnalyticsId,
        searchConsoleVerification: searchConsoleCode,
      },
      advertising: {
        adNetworkScript: adNetworkScript,
        placements: adPlacements,
      },
      navbar: navbarEnabled ? { enabled: true, items: navItems } : { enabled: false },
      ctaButtons: ctaButtons,
      sections: enabledSections.map((section) => ({
        type: section.id,
        config: section.fields,
      })),
      generatedAt: new Date().toISOString(),
    };
    return JSON.stringify(config, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTemplateConfig());
    setCopied(true);
    toast({
      title: "Template config copied!",
      description: "Save this configuration to build your site",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Typography & Fonts
            </CardTitle>
            <CardDescription>Select fonts for your affiliate site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Heading Font</Label>
              <Select value={headingFont} onValueChange={setHeadingFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="Inter">Inter (Modern, Clean)</SelectItem>
                  <SelectItem value="Poppins">Poppins (Bold, Friendly)</SelectItem>
                  <SelectItem value="Montserrat">Montserrat (Professional)</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display (Elegant, Serif)</SelectItem>
                  <SelectItem value="Roboto">Roboto (Classic Sans)</SelectItem>
                  <SelectItem value="Lato">Lato (Warm, Approachable)</SelectItem>
                  <SelectItem value="Open Sans">Open Sans (Neutral)</SelectItem>
                  <SelectItem value="Raleway">Raleway (Sophisticated)</SelectItem>
                  <SelectItem value="Merriweather">Merriweather (Traditional Serif)</SelectItem>
                  <SelectItem value="DM Sans">DM Sans (Geometric)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Body Font</Label>
              <Select value={bodyFont} onValueChange={setBodyFont}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card z-50">
                  <SelectItem value="Inter">Inter (Modern, Clean)</SelectItem>
                  <SelectItem value="Poppins">Poppins (Bold, Friendly)</SelectItem>
                  <SelectItem value="Montserrat">Montserrat (Professional)</SelectItem>
                  <SelectItem value="Playfair Display">Playfair Display (Elegant, Serif)</SelectItem>
                  <SelectItem value="Roboto">Roboto (Classic Sans)</SelectItem>
                  <SelectItem value="Lato">Lato (Warm, Approachable)</SelectItem>
                  <SelectItem value="Open Sans">Open Sans (Neutral)</SelectItem>
                  <SelectItem value="Raleway">Raleway (Sophisticated)</SelectItem>
                  <SelectItem value="Merriweather">Merriweather (Traditional Serif)</SelectItem>
                  <SelectItem value="DM Sans">DM Sans (Geometric)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground">
              <p className="font-medium mb-1">Font Preview:</p>
              <p>Headings: <span className="font-semibold">{headingFont}</span></p>
              <p>Body text: <span>{bodyFont}</span></p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SEO Settings
            </CardTitle>
            <CardDescription>Search engine optimization and analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Site Title</Label>
              <Input
                placeholder="Best Product Reviews & Buying Guides"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Default Meta Description</Label>
              <Textarea
                placeholder="Expert reviews and honest recommendations..."
                rows={2}
                maxLength={160}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{seoDescription.length}/160 characters</p>
            </div>

            <div className="space-y-2">
              <Label>Social Sharing Image (OG Image)</Label>
              <Input
                placeholder="https://example.com/og-image.jpg"
                value={seoImage}
                onChange={(e) => setSeoImage(e.target.value)}
              />
            </div>

            <div className="border-t pt-4 space-y-3">
              <Label className="text-sm font-medium">Analytics & Tracking</Label>
              
              <div className="space-y-2">
                <Label className="text-xs">PostHog Project Key</Label>
                <Input
                  placeholder="phc_..."
                  value={posthogKey}
                  onChange={(e) => setPosthogKey(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Google Analytics ID (Optional)</Label>
                <Input
                  placeholder="G-XXXXXXXXXX"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Search Console Verification</Label>
                <Input
                  placeholder="google-site-verification code"
                  value={searchConsoleCode}
                  onChange={(e) => setSearchConsoleCode(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Advertising & Ad Zones
            </CardTitle>
            <CardDescription>Configure ad network and placements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Ad Network Script</Label>
              <Textarea
                placeholder="Paste your ad network script (AdSense, Mediavine, Ezoic, etc.)"
                rows={3}
                value={adNetworkScript}
                onChange={(e) => setAdNetworkScript(e.target.value)}
              />
            </div>

            <div className="border-t pt-4 space-y-4">
              <Label className="text-sm font-medium">Ad Placements</Label>
              
              {Object.entries(adPlacements).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={value.enabled}
                      onCheckedChange={(checked) => 
                        setAdPlacements(prev => ({
                          ...prev,
                          [key]: { ...prev[key as keyof typeof prev], enabled: !!checked }
                        }))
                      }
                    />
                    <Label className="capitalize cursor-pointer">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                  
                  {value.enabled && (
                    <Select 
                      value={value.position}
                      onValueChange={(val) => 
                        setAdPlacements(prev => ({
                          ...prev,
                          [key]: { ...prev[key as keyof typeof prev], position: val }
                        }))
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card z-50">
                        <SelectItem value="top">Top</SelectItem>
                        <SelectItem value="middle">Middle</SelectItem>
                        <SelectItem value="bottom">Bottom</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Site Components
                </CardTitle>
                <CardDescription>Select and configure sections for your site</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSiteComponentsOpen(!siteComponentsOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${siteComponentsOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {siteComponentsOpen && (
          <CardContent className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="space-y-3 pb-4 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={section.id}
                    checked={section.enabled}
                    onCheckedChange={() => toggleSection(section.id)}
                  />
                  <Label
                    htmlFor={section.id}
                    className="text-base font-medium cursor-pointer flex-1"
                  >
                    {section.name}
                  </Label>
                </div>

                {section.enabled && (
                  <div className="ml-7 space-y-3 pt-2">
                    {section.fields.heading !== undefined && (
                      <div className="space-y-1.5">
                        <Label className="text-sm">Heading</Label>
                        <Input
                          placeholder="Section heading"
                          value={section.fields.heading}
                          onChange={(e) =>
                            updateField(section.id, "heading", e.target.value)
                          }
                        />
                      </div>
                    )}

                    {section.fields.subheading !== undefined && (
                      <div className="space-y-1.5">
                        <Label className="text-sm">Subheading</Label>
                        <Input
                          placeholder="Subheading text"
                          value={section.fields.subheading}
                          onChange={(e) =>
                            updateField(section.id, "subheading", e.target.value)
                          }
                        />
                      </div>
                    )}

                    {section.fields.description !== undefined && (
                      <div className="space-y-1.5">
                        <Label className="text-sm">Description</Label>
                        <Textarea
                          placeholder="Section description"
                          rows={2}
                          value={section.fields.description}
                          onChange={(e) =>
                            updateField(section.id, "description", e.target.value)
                          }
                        />
                      </div>
                    )}

                    {section.fields.buttonText !== undefined && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-sm">Button Text</Label>
                          <Input
                            placeholder="Click here"
                            value={section.fields.buttonText}
                            onChange={(e) =>
                              updateField(section.id, "buttonText", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm">Button Link</Label>
                          <Input
                            placeholder="/page"
                            value={section.fields.buttonLink}
                            onChange={(e) =>
                              updateField(section.id, "buttonLink", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    )}

                    {section.fields.backgroundImage !== undefined && (
                      <div className="space-y-1.5">
                        <Label className="text-sm">Background Image URL</Label>
                        <Input
                          placeholder="https://..."
                          value={section.fields.backgroundImage}
                          onChange={(e) =>
                            updateField(section.id, "backgroundImage", e.target.value)
                          }
                        />
                      </div>
                    )}

                    {section.fields.images && (
                      <div className="space-y-2">
                        <Label className="text-sm">
                          Image URLs ({section.fields.images.length} items)
                        </Label>
                        {section.fields.images.map((img, idx) => (
                          <Input
                            key={idx}
                            placeholder={`Image ${idx + 1} URL`}
                            value={img}
                            onChange={(e) =>
                              updateImageArray(section.id, idx, e.target.value)
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Menu className="h-5 w-5" />
              Navigation Bar
            </CardTitle>
            <CardDescription>Configure your site's navigation menu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b">
              <Checkbox
                id="navbar-enabled"
                checked={navbarEnabled}
                onCheckedChange={(checked) => setNavbarEnabled(!!checked)}
              />
              <Label htmlFor="navbar-enabled" className="text-base font-medium cursor-pointer">
                Enable Navigation Bar
              </Label>
            </div>

            {navbarEnabled && (
              <>
                {navItems.map((item, index) => (
                  <div key={item.id} className="space-y-2 p-3 border rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium">Nav Item {index + 1}</Label>
                      {navItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNavItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Label</Label>
                        <Input
                          placeholder="Home, About, etc."
                          value={item.label}
                          onChange={(e) => updateNavItem(item.id, "label", e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Path</Label>
                        <Input
                          placeholder="/home, /about"
                          value={item.path}
                          onChange={(e) => updateNavItem(item.id, "path", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addNavItem} variant="outline" size="sm" className="w-full">
                  <Plus className="mr-2 h-3 w-3" />
                  Add Navigation Item
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Affiliate CTAs & Buttons
            </CardTitle>
            <CardDescription>Manage your affiliate links and call-to-actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ctaButtons.map((button, index) => (
              <div key={button.id} className="space-y-3 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">CTA Button {index + 1}</Label>
                  {ctaButtons.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCTAButton(button.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    placeholder="Shop Now, Buy Here, etc."
                    value={button.text}
                    onChange={(e) => updateCTAButton(button.id, "text", e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Affiliate URL</Label>
                  <Input
                    placeholder="https://example.com/product"
                    value={button.affiliateUrl}
                    onChange={(e) => updateCTAButton(button.id, "affiliateUrl", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Affiliate ID</Label>
                    <Input
                      placeholder="your-affiliate-id"
                      value={button.affiliateId}
                      onChange={(e) => updateCTAButton(button.id, "affiliateId", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Tracking Params</Label>
                    <Input
                      placeholder="utm_source=..."
                      value={button.trackingParams || ""}
                      onChange={(e) => updateCTAButton(button.id, "trackingParams", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button onClick={addCTAButton} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add CTA Button
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Template Configuration</CardTitle>
            <CardDescription>Preview of your site template config</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-[500px]">
              <code>{generateTemplateConfig()}</code>
            </pre>

            <Button onClick={handleCopy} className="w-full mt-4" size="lg">
              {copied ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Template Config
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-accent">
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">How to Use</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Configure your site components and enable what you need</li>
              <li>Set up navigation menu items</li>
              <li>Add affiliate CTAs with tracking parameters</li>
              <li>Copy the generated template configuration</li>
              <li>Use this config to build your affiliate site</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateBuilder;
