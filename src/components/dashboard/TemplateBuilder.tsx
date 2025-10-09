import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Layout, Link as LinkIcon, Plus, Trash2, Menu, ChevronDown, Type, Search, TrendingUp, FileText, ExternalLink, Save, FolderOpen, FilePlus, Code, ArrowUp, ArrowDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useTemplate } from "@/contexts/TemplateContext";

interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  fields: {
    heading?: string;
    subheading?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
    overlayOpacity?: number;
    showCTA?: boolean;
    images?: string[];
    categories?: Array<{ name: string; iconName: string }>;
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
  name: string; // Internal reference name
  text: string;
  affiliateUrl: string;
  affiliateId: string;
  trackingParams: string;
}

interface CTAPlacement {
  id: string;
  ctaId: string; // Reference to CTA Library button
  position: number; // For home page, position among sections
  sectionId?: string; // Optional: tie to specific section
}

interface BlogCTAPlacement {
  id: string;
  ctaId: string;
  position: 'after-intro' | 'mid-content' | 'before-conclusion' | 'end-of-post';
}

interface NavItem {
  id: string;
  label: string;
  path: string;
}

const TemplateBuilder = () => {
  const { toast } = useToast();
  const { updateConfig } = useTemplate();
  
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
  const [ctaLibraryOpen, setCtaLibraryOpen] = useState(false);
  const [homeCtaPlacementsOpen, setHomeCtaPlacementsOpen] = useState(false);
  const [blogCtaPlacementsOpen, setBlogCtaPlacementsOpen] = useState(false);
  const [landingCtaPlacementsOpen, setLandingCtaPlacementsOpen] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);
  
  // Section-specific open states
  const [sectionOpenStates, setSectionOpenStates] = useState<Record<string, boolean>>({});
  
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
    about: { slug: "/about", title: "About", showInNav: true, content: "" },
    contact: { slug: "/contact", title: "Contact", showInNav: true, content: "", email: "", phone: "", address: "" },
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
  const [navbarShowSearch, setNavbarShowSearch] = useState(true);
  const [navbarLogoType, setNavbarLogoType] = useState<"text" | "image">("text");
  const [navbarLogoText, setNavbarLogoText] = useState("My Site");
  const [navbarLogoImage, setNavbarLogoImage] = useState("");
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: "nav-1", label: "Home", path: "/" },
    { id: "nav-2", label: "Reviews", path: "/reviews" },
    { id: "nav-3", label: "Contact", path: "/contact" },
  ]);
  
  // CTA Library - reusable affiliate buttons
  const [ctaLibrary, setCtaLibrary] = useState<CTAButton[]>([
    {
      id: "cta-1",
      name: "Primary CTA",
      text: "Shop Now",
      affiliateUrl: "",
      affiliateId: "",
      trackingParams: "",
    },
  ]);

  // CTA Placements for different page types
  const [homeCtaPlacements, setHomeCtaPlacements] = useState<CTAPlacement[]>([]);
  const [blogCtaPlacements, setBlogCtaPlacements] = useState<BlogCTAPlacement[]>([]);
  const [landingCtaPlacements, setLandingCtaPlacements] = useState<CTAPlacement[]>([]);

  const [sections, setSections] = useState<SectionConfig[]>([
    {
      id: "hero",
      name: "Hero Section",
      enabled: false,
      order: 1,
      fields: {
        heading: "Welcome to Our Site",
        subheading: "Find the best products and reviews",
        buttonText: "Explore",
        buttonLink: "#",
        backgroundImage: "",
        showCTA: true,
      },
    },
    {
      id: "trust-badges",
      name: "Trust Badges/Social Proof",
      enabled: false,
      order: 2,
      fields: {
        heading: "Trusted by Thousands",
        images: ["", "", "", ""],
      },
    },
    {
      id: "featured-products",
      name: "Featured Products/Deals",
      enabled: false,
      order: 3,
      fields: {
        heading: "Top Picks This Week",
        description: "Our hand-picked selection of the best deals",
      },
    },
    {
      id: "categories-bar",
      name: "Categories/Tags Bar",
      enabled: false,
      order: 4,
      fields: {
        heading: "Browse Categories",
        categories: [
          { name: "All", iconName: "Grid3x3" },
          { name: "Tech", iconName: "Laptop" },
          { name: "Home", iconName: "Home" },
          { name: "Fashion", iconName: "Shirt" },
          { name: "Sports", iconName: "Dumbbell" },
          { name: "Health", iconName: "Heart" },
          { name: "Travel", iconName: "Plane" },
        ],
      },
    },
    {
      id: "latest-article",
      name: "Latest Article/Featured Post",
      enabled: false,
      order: 5,
      fields: {
        heading: "Latest Article",
        description: "Check out our most recent post",
      },
    },
    {
      id: "blog-grid",
      name: "Blog Posts Grid",
      enabled: false,
      order: 6,
      fields: {},
    },
    {
      id: "categories",
      name: "Category Grid",
      enabled: false,
      order: 7,
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
      order: 7,
      fields: {
        heading: "Latest Peak Reviews",
        description: "Fresh insights on the newest products",
        images: ["", "", ""],
      },
    },
    {
      id: "comparison-table",
      name: "Product Comparison Table",
      enabled: false,
      order: 8,
      fields: {
        heading: "Compare Top Products",
        description: "See how the best options stack up",
      },
    },
    {
      id: "testimonials",
      name: "Testimonials",
      enabled: false,
      order: 9,
      fields: {
        heading: "What Our Readers Say",
      },
    },
    {
      id: "faq",
      name: "FAQ Section",
      enabled: false,
      order: 10,
      fields: {
        heading: "Frequently Asked Questions",
        description: "Everything you need to know",
      },
    },
    {
      id: "newsletter",
      name: "Newsletter Signup",
      enabled: false,
      order: 11,
      fields: {
        heading: "Peak Picks Weekly",
        description: "Get our best product recommendations and exclusive deals",
        buttonText: "Get Peak Picks",
        backgroundImage: "",
      },
    },
    {
      id: "sidebar",
      name: "Sidebar",
      enabled: false,
      order: 12,
      fields: {},
    },
    {
      id: "footer",
      name: "Footer",
      enabled: false,
      order: 13,
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

  const moveSectionUp = (sectionId: string) => {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(s => s.id === sectionId);
      if (index <= 0) return prev;
      
      const newSections = [...sorted];
      [newSections[index - 1].order, newSections[index].order] = [newSections[index].order, newSections[index - 1].order];
      return newSections;
    });
  };

  const moveSectionDown = (sectionId: string) => {
    setSections((prev) => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(s => s.id === sectionId);
      if (index >= sorted.length - 1) return prev;
      
      const newSections = [...sorted];
      [newSections[index].order, newSections[index + 1].order] = [newSections[index + 1].order, newSections[index].order];
      return newSections;
    });
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

  const addCTAToLibrary = () => {
    setCtaLibrary((prev) => [
      ...prev,
      {
        id: `cta-${prev.length + 1}`,
        name: `CTA ${prev.length + 1}`,
        text: "Shop Now",
        affiliateUrl: "",
        affiliateId: "",
        trackingParams: "",
      },
    ]);
  };

  const removeCTAFromLibrary = (id: string) => {
    setCtaLibrary((prev) => prev.filter((btn) => btn.id !== id));
    // Also remove any placements using this CTA
    setHomeCtaPlacements((prev) => prev.filter((p) => p.ctaId !== id));
    setBlogCtaPlacements((prev) => prev.filter((p) => p.ctaId !== id));
    setLandingCtaPlacements((prev) => prev.filter((p) => p.ctaId !== id));
  };

  const updateCTAInLibrary = (id: string, field: keyof CTAButton, value: string) => {
    setCtaLibrary((prev) =>
      prev.map((btn) => (btn.id === id ? { ...btn, [field]: value } : btn))
    );
  };

  // Home Page CTA Placements
  const addHomeCtaPlacement = () => {
    if (ctaLibrary.length === 0) {
      toast({
        title: "No CTAs in library",
        description: "Add a CTA to the library first",
        variant: "destructive",
      });
      return;
    }
    setHomeCtaPlacements((prev) => [
      ...prev,
      {
        id: `home-cta-${prev.length + 1}`,
        ctaId: ctaLibrary[0].id,
        position: prev.length + 1,
      },
    ]);
  };

  const removeHomeCtaPlacement = (id: string) => {
    setHomeCtaPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  const updateHomeCtaPlacement = (id: string, field: keyof CTAPlacement, value: any) => {
    setHomeCtaPlacements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const moveHomeCtaPlacementUp = (id: string) => {
    setHomeCtaPlacements((prev) => {
      const index = prev.findIndex(p => p.id === id);
      if (index <= 0) return prev;
      
      const newPlacements = [...prev];
      [newPlacements[index - 1], newPlacements[index]] = [newPlacements[index], newPlacements[index - 1]];
      return newPlacements;
    });
  };

  const moveHomeCtaPlacementDown = (id: string) => {
    setHomeCtaPlacements((prev) => {
      const index = prev.findIndex(p => p.id === id);
      if (index >= prev.length - 1) return prev;
      
      const newPlacements = [...prev];
      [newPlacements[index], newPlacements[index + 1]] = [newPlacements[index + 1], newPlacements[index]];
      return newPlacements;
    });
  };

  // Blog CTA Placements
  const addBlogCtaPlacement = () => {
    if (ctaLibrary.length === 0) {
      toast({
        title: "No CTAs in library",
        description: "Add a CTA to the library first",
        variant: "destructive",
      });
      return;
    }
    setBlogCtaPlacements((prev) => [
      ...prev,
      {
        id: `blog-cta-${prev.length + 1}`,
        ctaId: ctaLibrary[0].id,
        position: 'after-intro',
      },
    ]);
  };

  const removeBlogCtaPlacement = (id: string) => {
    setBlogCtaPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  const updateBlogCtaPlacement = (id: string, field: keyof BlogCTAPlacement, value: any) => {
    setBlogCtaPlacements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  // Landing Page CTA Placements
  const addLandingCtaPlacement = () => {
    if (ctaLibrary.length === 0) {
      toast({
        title: "No CTAs in library",
        description: "Add a CTA to the library first",
        variant: "destructive",
      });
      return;
    }
    setLandingCtaPlacements((prev) => [
      ...prev,
      {
        id: `landing-cta-${prev.length + 1}`,
        ctaId: ctaLibrary[0].id,
        position: prev.length + 1,
      },
    ]);
  };

  const removeLandingCtaPlacement = (id: string) => {
    setLandingCtaPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  const updateLandingCtaPlacement = (id: string, field: keyof CTAPlacement, value: any) => {
    setLandingCtaPlacements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const moveLandingCtaPlacementUp = (id: string) => {
    setLandingCtaPlacements((prev) => {
      const index = prev.findIndex(p => p.id === id);
      if (index <= 0) return prev;
      
      const newPlacements = [...prev];
      [newPlacements[index - 1], newPlacements[index]] = [newPlacements[index], newPlacements[index - 1]];
      return newPlacements;
    });
  };

  const moveLandingCtaPlacementDown = (id: string) => {
    setLandingCtaPlacements((prev) => {
      const index = prev.findIndex(p => p.id === id);
      if (index >= prev.length - 1) return prev;
      
      const newPlacements = [...prev];
      [newPlacements[index], newPlacements[index + 1]] = [newPlacements[index + 1], newPlacements[index]];
      return newPlacements;
    });
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
      navbar: navbarEnabled ? { 
        enabled: true, 
        items: navItems,
        showSearch: navbarShowSearch,
        logoType: navbarLogoType,
        logoText: navbarLogoText,
        logoImage: navbarLogoImage,
      } : { enabled: false },
      cta: {
        library: ctaLibrary,
        placements: {
          home: homeCtaPlacements,
          blog: blogCtaPlacements,
          landing: landingCtaPlacements,
        },
      },
      sections: enabledSections.map((section) => ({
        type: section.id,
        config: section.fields,
      })),
      generatedAt: new Date().toISOString(),
    };
    return JSON.stringify(config, null, 2);
  };

  // Sync navbar items with page settings
  useEffect(() => {
    const updatedNavItems: NavItem[] = [
      { id: "nav-home", label: "Home", path: "/" }
    ];
    
    Object.entries(pageSettings).forEach(([key, settings]) => {
      if (enabledPages[key as keyof typeof enabledPages] && settings.showInNav) {
        updatedNavItems.push({
          id: `nav-${key}`,
          label: settings.title,
          path: settings.slug
        });
      }
    });
    
    setNavItems(updatedNavItems);
  }, [pageSettings, enabledPages]);

  // Sync to context whenever state changes
  useEffect(() => {
    const enabledSections = sections.filter((s) => s.enabled);
    updateConfig({
      navbar: navbarEnabled ? {
        enabled: true,
        siteName: navbarLogoText,
        logoType: navbarLogoType,
        logoImage: navbarLogoImage,
        navItems: navItems,
        showSearch: navbarShowSearch,
      } : {
        enabled: false,
        siteName: "",
        logoType: "text",
        logoImage: "",
        navItems: [],
        showSearch: false,
      },
      sections: enabledSections.map((section) => ({
        type: section.id,
        config: section.fields,
        order: section.order,
      })),
      ctaLibrary: ctaLibrary,
      homeCtaPlacements: homeCtaPlacements,
      blogCtaPlacements: blogCtaPlacements,
      landingCtaPlacements: landingCtaPlacements,
      typography: {
        headingFont: headingFont,
        bodyFont: bodyFont,
      },
      seo: {
        defaultTitle: seoTitle,
        defaultDescription: seoDescription,
        ogImage: seoImage,
      },
    });
  }, [sections, navbarEnabled, navItems, navbarShowSearch, navbarLogoType, navbarLogoText, navbarLogoImage, ctaLibrary, homeCtaPlacements, blogCtaPlacements, landingCtaPlacements, headingFont, bodyFont, seoTitle, seoDescription, seoImage, updateConfig]);

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
    setCtaLibrary([{
      id: "cta-1",
      name: "Primary CTA",
      text: "Shop Now",
      affiliateUrl: "",
      affiliateId: "",
      trackingParams: "",
    }]);
    setHomeCtaPlacements([]);
    setBlogCtaPlacements([]);
    setLandingCtaPlacements([]);
    
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
          user_id: null, // Development mode - no auth required
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
      setNavbarShowSearch(config.navbar.showSearch !== false);
      setNavbarLogoType(config.navbar.logoType || "text");
      setNavbarLogoText(config.navbar.logoText || "My Site");
      setNavbarLogoImage(config.navbar.logoImage || "");
    }
    if (config?.cta) {
      setCtaLibrary(config.cta.library || ctaLibrary);
      setHomeCtaPlacements(config.cta.placements?.home || []);
      setBlogCtaPlacements(config.cta.placements?.blog || []);
      setLandingCtaPlacements(config.cta.placements?.landing || []);
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
                      <div className="ml-7 space-y-3 p-3 border rounded-lg bg-card">
                        <div className="grid grid-cols-3 gap-2">
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

                        {/* About Page Content */}
                        {key === 'about' && (
                          <div className="space-y-2 pt-3 border-t">
                            <Label className="text-sm">About Content</Label>
                            <Textarea
                              value={pageSettings.about.content || ""}
                              onChange={(e) =>
                                setPageSettings(prev => ({
                                  ...prev,
                                  about: { ...prev.about, content: e.target.value }
                                }))
                              }
                              placeholder="Write your About page content here..."
                              rows={6}
                              className="text-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                              Describe your site, mission, and team
                            </p>
                          </div>
                        )}

                        {/* Contact Page Content */}
                        {key === 'contact' && (
                          <div className="space-y-3 pt-3 border-t">
                            <Label className="text-sm">Contact Information</Label>
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <Label className="text-xs">Email</Label>
                                <Input
                                  value={pageSettings.contact.email || ""}
                                  onChange={(e) =>
                                    setPageSettings(prev => ({
                                      ...prev,
                                      contact: { ...prev.contact, email: e.target.value }
                                    }))
                                  }
                                  placeholder="contact@yoursite.com"
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Phone (Optional)</Label>
                                <Input
                                  value={pageSettings.contact.phone || ""}
                                  onChange={(e) =>
                                    setPageSettings(prev => ({
                                      ...prev,
                                      contact: { ...prev.contact, phone: e.target.value }
                                    }))
                                  }
                                  placeholder="+1 (555) 123-4567"
                                  className="h-8 text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Address (Optional)</Label>
                                <Textarea
                                  value={pageSettings.contact.address || ""}
                                  onChange={(e) =>
                                    setPageSettings(prev => ({
                                      ...prev,
                                      contact: { ...prev.contact, address: e.target.value }
                                    }))
                                  }
                                  placeholder="123 Main St, City, State 12345"
                                  rows={2}
                                  className="text-xs"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">Additional Content</Label>
                                <Textarea
                                  value={pageSettings.contact.content || ""}
                                  onChange={(e) =>
                                    setPageSettings(prev => ({
                                      ...prev,
                                      contact: { ...prev.contact, content: e.target.value }
                                    }))
                                  }
                                  placeholder="Contact form instructions, business hours, etc."
                                  rows={3}
                                  className="text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        )}
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
            {[...sections].sort((a, b) => a.order - b.order).map((section, index, sortedSections) => (
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
                  {section.enabled && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSectionUp(section.id)}
                        disabled={index === 0}
                        className="h-7 w-7 p-0"
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveSectionDown(section.id)}
                        disabled={index === sortedSections.length - 1}
                        className="h-7 w-7 p-0"
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      {Object.keys(section.fields).length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSectionOpenStates(prev => ({ ...prev, [section.id]: !prev[section.id] }))}
                          className="h-7 w-7 p-0"
                        >
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${sectionOpenStates[section.id] ? 'rotate-180' : ''}`}
                          />
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {section.enabled && sectionOpenStates[section.id] && Object.keys(section.fields).length > 0 && (
                  <div className="ml-7 space-y-3 pt-2">
                    {section.id === "hero" ? (
                      <>
                        <div className="space-y-1.5">
                          <Label className="text-sm">H1 Heading</Label>
                          <Input
                            placeholder="Welcome to Our Site"
                            value={section.fields.heading}
                            onChange={(e) =>
                              updateField(section.id, "heading", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm">Tagline</Label>
                          <Input
                            placeholder="Find the best products and reviews"
                            value={section.fields.subheading}
                            onChange={(e) =>
                              updateField(section.id, "subheading", e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                          <Checkbox
                            id={`${section.id}-show-cta`}
                            checked={section.fields.showCTA !== false}
                            onCheckedChange={(checked) =>
                              updateField(section.id, "showCTA", !!checked)
                            }
                          />
                          <Label htmlFor={`${section.id}-show-cta`} className="text-sm font-medium cursor-pointer">
                            Show Call-to-Action Button
                          </Label>
                        </div>
                        {section.fields.showCTA !== false && (
                          <div className="grid grid-cols-2 gap-3 pl-7">
                            <div className="space-y-1.5">
                              <Label className="text-sm">Button Text</Label>
                              <Input
                                placeholder="Explore"
                                value={section.fields.buttonText}
                                onChange={(e) =>
                                  updateField(section.id, "buttonText", e.target.value)
                                }
                              />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-sm">Button Link</Label>
                              <Input
                                placeholder="#"
                                value={section.fields.buttonLink}
                                onChange={(e) =>
                                  updateField(section.id, "buttonLink", e.target.value)
                                }
                              />
                            </div>
                          </div>
                        )}
                        <div className="space-y-1.5">
                          <Label className="text-sm">Background Image URL (Optional)</Label>
                          <Input
                            placeholder="https://..."
                            value={section.fields.backgroundImage}
                            onChange={(e) =>
                              updateField(section.id, "backgroundImage", e.target.value)
                            }
                          />
                        </div>
                        {section.fields.backgroundImage && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Text Overlay Opacity</Label>
                              <span className="text-sm text-muted-foreground">{Math.round((section.fields.overlayOpacity ?? 0.5) * 100)}%</span>
                            </div>
                            <Slider
                              value={[(section.fields.overlayOpacity ?? 0.5) * 100]}
                              onValueChange={(value) =>
                                updateField(section.id, "overlayOpacity", value[0] / 100)
                              }
                              min={0}
                              max={100}
                              step={5}
                              className="w-full"
                            />
                            <p className="text-xs text-muted-foreground">
                              Adjust the darkness of the text background overlay
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
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

                        {section.fields.categories && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm">Categories ({section.fields.categories.length} items)</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newCategories = [...(section.fields.categories || []), { name: "New Category", iconName: "Tag" }];
                                  updateField(section.id, "categories", newCategories);
                                }}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add
                              </Button>
                            </div>
                            {section.fields.categories.map((cat, idx) => (
                              <div key={idx} className="flex gap-2 items-start">
                                <div className="flex-1 grid grid-cols-2 gap-2">
                                  <div className="space-y-1">
                                    <Label className="text-xs">Name</Label>
                                    <Input
                                      placeholder="Category name"
                                      value={cat.name}
                                      onChange={(e) => {
                                        const newCategories = [...section.fields.categories!];
                                        newCategories[idx] = { ...newCategories[idx], name: e.target.value };
                                        updateField(section.id, "categories", newCategories);
                                      }}
                                      className="h-8 text-xs"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <Label className="text-xs">Icon (Lucide name)</Label>
                                    <Input
                                      placeholder="Laptop"
                                      value={cat.iconName}
                                      onChange={(e) => {
                                        const newCategories = [...section.fields.categories!];
                                        newCategories[idx] = { ...newCategories[idx], iconName: e.target.value };
                                        updateField(section.id, "categories", newCategories);
                                      }}
                                      className="h-8 text-xs"
                                    />
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newCategories = section.fields.categories!.filter((_, i) => i !== idx);
                                    updateField(section.id, "categories", newCategories);
                                  }}
                                  className="h-8 w-8 p-0 mt-5"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <p className="text-xs text-muted-foreground">
                              Use Lucide icon names like: Laptop, Home, Shirt, Heart, Plane, etc.
                            </p>
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
                      </>
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
                <div className="space-y-3 pb-4 border-b">
                  <Label className="text-sm font-medium">Logo Configuration</Label>
                  <RadioGroup value={navbarLogoType} onValueChange={(value: "text" | "image") => setNavbarLogoType(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="logo-text" />
                      <Label htmlFor="logo-text" className="cursor-pointer">Text Logo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="logo-image" />
                      <Label htmlFor="logo-image" className="cursor-pointer">Image Logo</Label>
                    </div>
                  </RadioGroup>
                  
                  {navbarLogoType === "text" ? (
                    <div className="space-y-1.5">
                      <Label className="text-sm">Logo Text</Label>
                      <Input
                        placeholder="My Site"
                        value={navbarLogoText}
                        onChange={(e) => setNavbarLogoText(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <Label className="text-sm">Logo Image URL</Label>
                      <Input
                        placeholder="https://example.com/logo.png"
                        value={navbarLogoImage}
                        onChange={(e) => setNavbarLogoImage(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Recommended: 40-50px height, transparent PNG
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pb-3 border-b">
                  <Checkbox
                    id="navbar-show-search"
                    checked={navbarShowSearch}
                    onCheckedChange={(checked) => setNavbarShowSearch(!!checked)}
                  />
                  <Label htmlFor="navbar-show-search" className="text-sm font-medium cursor-pointer">
                    Show Search Bar
                  </Label>
                </div>

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
                  CTA Library
                </CardTitle>
                <CardDescription>Define reusable affiliate buttons</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCtaLibraryOpen(!ctaLibraryOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${ctaLibraryOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {ctaLibraryOpen && (
          <CardContent className="space-y-4">
            {ctaLibrary.map((button, index) => (
              <div key={button.id} className="space-y-3 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">CTA {index + 1}</Label>
                  {ctaLibrary.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCTAFromLibrary(button.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs">Internal Name</Label>
                  <Input
                    placeholder="Primary CTA, Secondary CTA, etc."
                    value={button.name}
                    onChange={(e) => updateCTAInLibrary(button.id, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Button Text</Label>
                  <Input
                    placeholder="Shop Now, Buy Here, etc."
                    value={button.text}
                    onChange={(e) => updateCTAInLibrary(button.id, "text", e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Affiliate URL</Label>
                  <Input
                    placeholder="https://example.com/product"
                    value={button.affiliateUrl}
                    onChange={(e) => updateCTAInLibrary(button.id, "affiliateUrl", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Affiliate ID</Label>
                    <Input
                      placeholder="your-affiliate-id"
                      value={button.affiliateId}
                      onChange={(e) => updateCTAInLibrary(button.id, "affiliateId", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Tracking Params</Label>
                    <Input
                      placeholder="utm_source=..."
                      value={button.trackingParams || ""}
                      onChange={(e) => updateCTAInLibrary(button.id, "trackingParams", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <Button onClick={addCTAToLibrary} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add to Library
            </Button>
          </CardContent>
          )}
        </Card>

        {/* Home Page CTA Placements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Home Page CTAs
                </CardTitle>
                <CardDescription>Position CTAs on your home page</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHomeCtaPlacementsOpen(!homeCtaPlacementsOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${homeCtaPlacementsOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {homeCtaPlacementsOpen && (
          <CardContent className="space-y-4">
            {homeCtaPlacements.map((placement, index) => (
              <div key={placement.id} className="space-y-3 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Placement {index + 1}</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveHomeCtaPlacementUp(placement.id)}
                      disabled={index === 0}
                      className="h-7 w-7 p-0"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveHomeCtaPlacementDown(placement.id)}
                      disabled={index === homeCtaPlacements.length - 1}
                      className="h-7 w-7 p-0"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeHomeCtaPlacement(placement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs">Select CTA</Label>
                  <Select 
                    value={placement.ctaId} 
                    onValueChange={(value) => updateHomeCtaPlacement(placement.id, "ctaId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      {ctaLibrary.map(cta => (
                        <SelectItem key={cta.id} value={cta.id}>
                          {cta.name} - "{cta.text}"
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            
            <Button onClick={addHomeCtaPlacement} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Home Page CTA
            </Button>
          </CardContent>
          )}
        </Card>

        {/* Blog CTA Placements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Blog Post CTAs
                </CardTitle>
                <CardDescription>Position CTAs within blog posts</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBlogCtaPlacementsOpen(!blogCtaPlacementsOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${blogCtaPlacementsOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {blogCtaPlacementsOpen && (
          <CardContent className="space-y-4">
            {blogCtaPlacements.map((placement, index) => (
              <div key={placement.id} className="space-y-3 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Placement {index + 1}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBlogCtaPlacement(placement.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs">Select CTA</Label>
                  <Select 
                    value={placement.ctaId} 
                    onValueChange={(value) => updateBlogCtaPlacement(placement.id, "ctaId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      {ctaLibrary.map(cta => (
                        <SelectItem key={cta.id} value={cta.id}>
                          {cta.name} - "{cta.text}"
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Position in Post</Label>
                  <Select 
                    value={placement.position} 
                    onValueChange={(value) => updateBlogCtaPlacement(placement.id, "position", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      <SelectItem value="after-intro">After Introduction</SelectItem>
                      <SelectItem value="mid-content">Mid Content</SelectItem>
                      <SelectItem value="before-conclusion">Before Conclusion</SelectItem>
                      <SelectItem value="end-of-post">End of Post</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            
            <Button onClick={addBlogCtaPlacement} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Blog CTA
            </Button>
          </CardContent>
          )}
        </Card>

        {/* Landing Page CTA Placements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Landing Page CTAs
                </CardTitle>
                <CardDescription>Position CTAs on landing pages</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLandingCtaPlacementsOpen(!landingCtaPlacementsOpen)}
              >
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-200 ${landingCtaPlacementsOpen ? 'rotate-180' : ''}`}
                />
              </Button>
            </div>
          </CardHeader>
          {landingCtaPlacementsOpen && (
          <CardContent className="space-y-4">
            {landingCtaPlacements.map((placement, index) => (
              <div key={placement.id} className="space-y-3 p-4 border rounded-lg bg-card">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Placement {index + 1}</Label>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveLandingCtaPlacementUp(placement.id)}
                      disabled={index === 0}
                      className="h-7 w-7 p-0"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveLandingCtaPlacementDown(placement.id)}
                      disabled={index === landingCtaPlacements.length - 1}
                      className="h-7 w-7 p-0"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLandingCtaPlacement(placement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs">Select CTA</Label>
                  <Select 
                    value={placement.ctaId} 
                    onValueChange={(value) => updateLandingCtaPlacement(placement.id, "ctaId", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card z-50">
                      {ctaLibrary.map(cta => (
                        <SelectItem key={cta.id} value={cta.id}>
                          {cta.name} - "{cta.text}"
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
            
            <Button onClick={addLandingCtaPlacement} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Landing Page CTA
            </Button>
          </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TemplateBuilder;
