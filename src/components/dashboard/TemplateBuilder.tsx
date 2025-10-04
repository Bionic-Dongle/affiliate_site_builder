import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Layout, Link as LinkIcon, Plus, Trash2, Menu, ChevronDown, Type, Search, TrendingUp, FileText, ExternalLink, Save, FolderOpen, FilePlus, Code } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

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
  
  // Project state
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [currentProjectName, setCurrentProjectName] = useState("Untitled Project");
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [savedProjects, setSavedProjects] = useState<any[]>([]);
  
  const [sitePagesOpen, setSitePagesOpen] = useState(false);
  const [typographyOpen, setTypographyOpen] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
  const [advertisingOpen, setAdvertisingOpen] = useState(false);
  const [customScriptsOpen, setCustomScriptsOpen] = useState(false);
  const [siteComponentsOpen, setSiteComponentsOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  
  const [headingFont, setHeadingFont] = useState("Inter");
  const [bodyFont, setBodyFont] = useState("Inter");
  
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoImage, setSeoImage] = useState("");
  const [posthogKey, setPosthogKey] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [searchConsoleCode, setSearchConsoleCode] = useState("");
  
  const [headScripts, setHeadScripts] = useState("");
  const [bodyScripts, setBodyScripts] = useState("");
  
  const [landingPageMode, setLandingPageMode] = useState(false);
  const [enabledPages, setEnabledPages] = useState({
    home: true, // always enabled
    blog: true,
    about: false,
    contact: false,
    privacy: false,
    terms: false,
    affiliateDisclaimer: false,
  });
  const [pageSettings, setPageSettings] = useState({
    blog: { slug: "/blog", title: "Blog", showInNav: true },
    about: { slug: "/about", title: "About", showInNav: true },
    contact: { slug: "/contact", title: "Contact", showInNav: true },
    privacy: { slug: "/privacy", title: "Privacy Policy", showInNav: false },
    terms: { slug: "/terms", title: "Terms of Service", showInNav: false },
    affiliateDisclaimer: { slug: "/affiliate-disclaimer", title: "Affiliate Disclaimer", showInNav: false },
  });
  
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
      pages: {
        landingPageMode: landingPageMode,
        enabled: enabledPages,
        settings: pageSettings,
      },
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
      customScripts: {
        head: headScripts,
        body: bodyScripts,
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

  // Load saved projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error loading projects:', error);
      return;
    }
    
    setSavedProjects(data || []);
  };

  const handleNewProject = () => {
    setCurrentProjectId(null);
    setCurrentProjectName("Untitled Project");
    // Reset all fields to defaults
    setSections(sections.map(s => ({ ...s, enabled: false })));
    setHeadingFont("Inter");
    setBodyFont("Inter");
    setSeoTitle("");
    setSeoDescription("");
    setSeoImage("");
    setPosthogKey("");
    setGoogleAnalyticsId("");
    setSearchConsoleCode("");
    setAdNetworkScript("");
    setHeadScripts("");
    setBodyScripts("");
    setNavItems([
      { id: "nav-1", label: "Home", path: "/" },
      { id: "nav-2", label: "Reviews", path: "/reviews" },
      { id: "nav-3", label: "Contact", path: "/contact" },
    ]);
    setCtaButtons([{
      id: "cta-1",
      text: "Shop Now",
      affiliateUrl: "",
      affiliateId: "",
      trackingParams: "",
    }]);
    
    toast({
      title: "New project created",
      description: "Start building your template",
    });
  };

  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    const config = JSON.parse(generateTemplateConfig());
    
    if (currentProjectId) {
      // Update existing
      const { error } = await supabase
        .from('projects')
        .update({ 
          name: projectName,
          config: config,
        })
        .eq('id', currentProjectId);
      
      if (error) {
        toast({
          title: "Error saving project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    } else {
      // Create new
      const { data, error } = await supabase
        .from('projects')
        .insert({ 
          name: projectName,
          config: config,
        })
        .select()
        .single();
      
      if (error) {
        toast({
          title: "Error saving project",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      setCurrentProjectId(data.id);
    }
    
    setCurrentProjectName(projectName);
    setSaveDialogOpen(false);
    loadProjects();
    
    toast({
      title: "Project saved!",
      description: `${projectName} has been saved`,
    });
  };

  const handleLoadProject = async (projectId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    
    if (error || !data) {
      toast({
        title: "Error loading project",
        description: error?.message || "Project not found",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentProjectId(data.id);
    setCurrentProjectName(data.name);
    
    // Load config (cast to any to handle JSONB)
    const config = data.config as any;
    if (config?.typography) {
      setHeadingFont(config.typography.headingFont || "Inter");
      setBodyFont(config.typography.bodyFont || "Inter");
    }
    if (config?.seo) {
      setSeoTitle(config.seo.defaultTitle || "");
      setSeoDescription(config.seo.defaultDescription || "");
      setSeoImage(config.seo.ogImage || "");
      setPosthogKey(config.seo.posthogKey || "");
      setGoogleAnalyticsId(config.seo.googleAnalyticsId || "");
      setSearchConsoleCode(config.seo.searchConsoleVerification || "");
    }
    if (config?.advertising) {
      setAdNetworkScript(config.advertising.adNetworkScript || "");
      setAdPlacements(config.advertising.placements || adPlacements);
    }
    if (config?.customScripts) {
      setHeadScripts(config.customScripts.head || "");
      setBodyScripts(config.customScripts.body || "");
    }
    if (config?.navbar) {
      setNavbarEnabled(config.navbar.enabled);
      setNavItems(config.navbar.items || navItems);
    }
    if (config?.ctaButtons) {
      setCtaButtons(config.ctaButtons);
    }
    if (config?.sections) {
      const loadedSections = sections.map(section => {
        const configSection = config.sections.find((s: any) => s.type === section.id);
        if (configSection) {
          return { ...section, enabled: true, fields: configSection.config };
        }
        return section;
      });
      setSections(loadedSections);
    }
    
    setLoadDialogOpen(false);
    toast({
      title: "Project loaded!",
      description: `Loaded ${data.name}`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Save Project</DialogTitle>
            <DialogDescription>
              Enter a name for your project
            </DialogDescription>
          </DialogHeader>
          <Input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Load Dialog */}
      <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
        <DialogContent className="bg-card max-w-2xl">
          <DialogHeader>
            <DialogTitle>Load Project</DialogTitle>
            <DialogDescription>
              Select a project to load
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {savedProjects.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No saved projects</p>
            ) : (
              savedProjects.map((project) => (
                <Card key={project.id} className="cursor-pointer hover:bg-accent" onClick={() => handleLoadProject(project.id)}>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{project.name}</CardTitle>
                        <CardDescription>
                          {new Date(project.updated_at).toLocaleDateString()} • {project.status}
                        </CardDescription>
                      </div>
                      <FolderOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
          {/* File Menu Bar */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Menu className="h-4 w-4 mr-2" />
                        File
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card z-50">
                      <DropdownMenuItem onClick={handleNewProject}>
                        <FilePlus className="h-4 w-4 mr-2" />
                        New Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {
                        setProjectName(currentProjectName);
                        setSaveDialogOpen(true);
                      }}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLoadDialogOpen(true)}>
                        <FolderOpen className="h-4 w-4 mr-2" />
                        Load Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <span className="text-sm text-muted-foreground">
                    Currently editing: <span className="font-medium text-foreground">{currentProjectName}</span>
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Site Pages
                </CardTitle>
                <CardDescription>Define which pages your site will have</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/home', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Preview Site
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSitePagesOpen(!sitePagesOpen)}
                >
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform duration-200 ${sitePagesOpen ? 'rotate-180' : ''}`}
                  />
                </Button>
              </div>
            </div>
          </CardHeader>
          {sitePagesOpen && (
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg bg-accent">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Landing Page Mode</Label>
                <p className="text-xs text-muted-foreground">Minimal homepage without nav/footer</p>
              </div>
              <Switch
                checked={landingPageMode}
                onCheckedChange={setLandingPageMode}
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Pages</Label>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded bg-muted/50">
                  <Checkbox checked disabled />
                  <Label className="flex-1 opacity-50">Home (Required)</Label>
                </div>

                {Object.entries(enabledPages).filter(([key]) => key !== 'home').map(([key, enabled]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded hover:bg-muted/50">
                      <Checkbox
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          setEnabledPages(prev => ({ ...prev, [key]: !!checked }))
                        }
                      />
                      <Label className="flex-1 capitalize cursor-pointer">
                        {pageSettings[key as keyof typeof pageSettings]?.title || key}
                      </Label>
                    </div>
                    
                    {enabled && key !== 'home' && (
                      <div className="ml-7 grid grid-cols-3 gap-2 p-3 border rounded-lg bg-card">
                        <div className="space-y-1">
                          <Label className="text-xs">Slug</Label>
                          <Input
                            value={pageSettings[key as keyof typeof pageSettings]?.slug || ""}
                            onChange={(e) =>
                              setPageSettings(prev => ({
                                ...prev,
                                [key]: { ...prev[key as keyof typeof prev], slug: e.target.value }
                              }))
                            }
                            placeholder="/page"
                            className="h-8 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Title</Label>
                          <Input
                            value={pageSettings[key as keyof typeof pageSettings]?.title || ""}
                            onChange={(e) =>
                              setPageSettings(prev => ({
                                ...prev,
                                [key]: { ...prev[key as keyof typeof prev], title: e.target.value }
                              }))
                            }
                            placeholder="Page Title"
                            className="h-8 text-xs"
                          />
                        </div>
                        <div className="space-y-1 flex flex-col justify-end">
                          <div className="flex items-center gap-2 h-8">
                            <Checkbox
                              checked={pageSettings[key as keyof typeof pageSettings]?.showInNav}
                              onCheckedChange={(checked) =>
                                setPageSettings(prev => ({
                                  ...prev,
                                  [key]: { ...prev[key as keyof typeof prev], showInNav: !!checked }
                                }))
                              }
                            />
                            <Label className="text-xs cursor-pointer">Show in Nav</Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Typography & Fonts
                </CardTitle>
                <CardDescription>Select fonts for your affiliate site</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTypographyOpen(!typographyOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${typographyOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {typographyOpen && (
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
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  SEO Settings
                </CardTitle>
                <CardDescription>Search engine optimization and analytics</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSeoOpen(!seoOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${seoOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {seoOpen && (
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
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Advertising & Ad Zones
                </CardTitle>
                <CardDescription>Configure ad network and placements</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAdvertisingOpen(!advertisingOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${advertisingOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {advertisingOpen && (
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
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Custom Scripts
                </CardTitle>
                <CardDescription>Add tracking & custom scripts to all pages</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCustomScriptsOpen(!customScriptsOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${customScriptsOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {customScriptsOpen && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Head Scripts</Label>
              <p className="text-xs text-muted-foreground">
                Loads early (analytics, tracking, meta tags) - goes in &lt;head&gt;
              </p>
              <Textarea
                placeholder={`<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>`}
                rows={8}
                value={headScripts}
                onChange={(e) => setHeadScripts(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label>Body Scripts</Label>
              <p className="text-xs text-muted-foreground">
                Loads at end of page (chatbots, widgets) - goes before &lt;/body&gt;
              </p>
              <Textarea
                placeholder={`<!-- Example: Chat widget -->
<script>
  (function(){
    // Your chat widget code here
  })();
</script>`}
                rows={6}
                value={bodyScripts}
                onChange={(e) => setBodyScripts(e.target.value)}
                className="font-mono text-xs"
              />
            </div>

            <div className="p-3 bg-accent rounded-lg">
              <p className="text-xs font-medium mb-1">Examples:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Google Analytics / Tag Manager (Head)</li>
                <li>Facebook Pixel (Head)</li>
                <li>PostHog, Mixpanel (Head)</li>
                <li>Intercom, Crisp Chat (Body)</li>
                <li>Custom fonts from Google/Adobe (Head)</li>
              </ul>
            </div>
          </CardContent>
          )}
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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  Navigation Bar
                </CardTitle>
                <CardDescription>Configure your site's navigation menu</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${navbarOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {navbarOpen && (
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
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5" />
                  Affiliate CTAs & Buttons
                </CardTitle>
                <CardDescription>Manage your affiliate links and call-to-actions</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCtaOpen(!ctaOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${ctaOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {ctaOpen && (
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
          )}
        </Card>
      </div>
    </div>
  );
};

export default TemplateBuilder;
