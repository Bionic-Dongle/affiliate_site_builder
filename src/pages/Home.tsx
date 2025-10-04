import { useEffect, useState } from "react";
import Hero from "@/components/site/Hero";
import BlogGrid from "@/components/site/BlogGrid";
import CategoryGrid from "@/components/site/CategoryGrid";
import Sidebar from "@/components/site/Sidebar";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import CategoriesBar from "@/components/site/CategoriesBar";
import { CTARenderer, CTAPlacement, CTADefinition } from "@/components/site/CTAButton";

// This would come from template config in real implementation
const mockConfig = {
  navbar: {
    enabled: true,
    siteName: "My Site",
    logoType: "text" as const,
    logoImage: "",
    navItems: [
      { label: "Home", path: "/" },
      { label: "Reviews", path: "/reviews" },
      { label: "Contact", path: "/contact" },
    ],
    showSearch: true,
  },
  sections: [
    { type: "hero", config: { heading: "Welcome to Our Site", subheading: "Find the best products and reviews", buttonText: "Explore", buttonLink: "#", showCTA: true } },
    { type: "categories-bar", config: { heading: "Browse Categories" } },
    { type: "blog-grid", config: { heading: "Latest Articles", description: "Fresh insights and expert reviews" } },
    { type: "categories", config: { heading: "Shop by Category", description: "Find what you need", images: ["", "", "", "", "", ""] } },
    { type: "newsletter", config: { heading: "Stay Updated", description: "Get the latest reviews and deals", buttonText: "Subscribe" } },
  ],
  ctaLibrary: [] as CTADefinition[],
  homeCtaPlacements: [] as CTAPlacement[],
};

interface HomeConfig {
  navbar: typeof mockConfig.navbar;
  sections: typeof mockConfig.sections;
  ctaLibrary: CTADefinition[];
  homeCtaPlacements: CTAPlacement[];
}

const Home = () => {
  const [config, setConfig] = useState<HomeConfig>(mockConfig);

  // In real implementation, read from template builder config
  useEffect(() => {
    // TODO: Load from template config JSON
  }, []);

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case "hero":
        return <Hero key={section.type} {...section.config} />;
      case "blog-grid":
        return <BlogGrid key={section.type} {...section.config} />;
      case "categories":
        return <CategoryGrid key={section.type} {...section.config} />;
      case "sidebar":
        return <Sidebar key={section.type} {...section.config} />;
      case "newsletter":
        return <Newsletter key={section.type} {...section.config} />;
      case "categories-bar":
        return <CategoriesBar key={section.type} {...section.config} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      {config.navbar?.enabled && (
        <Navbar
          siteName={config.navbar.siteName}
          logoType={config.navbar.logoType}
          logoImage={config.navbar.logoImage}
          navItems={config.navbar.navItems}
          showSearch={config.navbar.showSearch}
        />
      )}
      
      {/* CTAs at position 0 - before all sections */}
      <CTARenderer 
        placements={config.homeCtaPlacements} 
        ctaLibrary={config.ctaLibrary} 
        position={0}
        className="container mx-auto px-4 py-8"
      />
      
      {config.sections.map((section, index) => (
        <div key={index}>
          {renderSection(section, index)}
          {/* CTAs after this section */}
          <CTARenderer 
            placements={config.homeCtaPlacements} 
            ctaLibrary={config.ctaLibrary} 
            position={index + 1}
            className="container mx-auto px-4 py-8"
          />
        </div>
      ))}
      
      <Footer />
    </div>
  );
};

export default Home;
