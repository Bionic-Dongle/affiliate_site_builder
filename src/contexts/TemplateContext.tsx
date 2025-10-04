import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CTADefinition {
  id: string;
  name: string;
  text: string;
  affiliateUrl: string;
  affiliateId: string;
  trackingParams: string;
}

export interface CTAPlacement {
  id: string;
  ctaId: string;
  position: number;
  sectionId?: string;
}

export interface BlogCTAPlacement {
  id: string;
  ctaId: string;
  position: 'after-intro' | 'mid-content' | 'before-conclusion' | 'end-of-post';
}

export interface SectionConfig {
  type: string;
  config: Record<string, any>;
  order?: number;
}

export interface NavbarConfig {
  enabled: boolean;
  siteName: string;
  logoType: "text" | "image";
  logoImage: string;
  navItems: Array<{ id: string; label: string; path: string }>;
  showSearch: boolean;
}

export interface TemplateConfig {
  navbar?: NavbarConfig;
  sections: SectionConfig[];
  ctaLibrary: CTADefinition[];
  homeCtaPlacements: CTAPlacement[];
  blogCtaPlacements: BlogCTAPlacement[];
  landingCtaPlacements: CTAPlacement[];
  typography?: {
    headingFont: string;
    bodyFont: string;
  };
  seo?: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
  };
}

interface TemplateContextType {
  config: TemplateConfig;
  updateConfig: (newConfig: Partial<TemplateConfig>) => void;
}

const defaultConfig: TemplateConfig = {
  navbar: {
    enabled: true,
    siteName: "My Site",
    logoType: "text",
    logoImage: "",
    navItems: [
      { id: "nav-1", label: "Home", path: "/" },
      { id: "nav-2", label: "Reviews", path: "/reviews" },
      { id: "nav-3", label: "Contact", path: "/contact" },
    ],
    showSearch: true,
  },
  sections: [],
  ctaLibrary: [],
  homeCtaPlacements: [],
  blogCtaPlacements: [],
  landingCtaPlacements: [],
};

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<TemplateConfig>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("templateConfig");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved config:", e);
      }
    }
    return defaultConfig;
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem("templateConfig", JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<TemplateConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  return (
    <TemplateContext.Provider value={{ config, updateConfig }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within TemplateProvider");
  }
  return context;
};
