import Hero from "@/components/site/Hero";
import BlogGrid from "@/components/site/BlogGrid";
import CategoryGrid from "@/components/site/CategoryGrid";
import Sidebar from "@/components/site/Sidebar";
import Newsletter from "@/components/site/Newsletter";
import Footer from "@/components/site/Footer";
import Navbar from "@/components/site/Navbar";
import CategoriesBar from "@/components/site/CategoriesBar";
import { CTARenderer } from "@/components/site/CTAButton";
import { useTemplate } from "@/contexts/TemplateContext";

const Home = () => {
  const { config } = useTemplate();

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
      case "footer":
        return <Footer key={section.type} {...section.config} />;
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
      
      {config.sections
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map((section, index) => (
          <div key={section.type + index}>
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
    </div>
  );
};

export default Home;
