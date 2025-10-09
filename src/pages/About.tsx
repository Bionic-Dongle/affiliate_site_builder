import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useTemplate } from "@/contexts/TemplateContext";
import TypographyStyles from "@/components/TypographyStyles";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { config } = useTemplate();
  const [aboutContent, setAboutContent] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      const { data } = await supabase
        .from('projects')
        .select('config')
        .eq('user_id', null)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (data?.config) {
        const projectConfig = data.config as any;
        if (projectConfig?.pages?.settings?.about?.content) {
          setAboutContent(projectConfig.pages.settings.about.content);
        }
      }
    };
    loadProject();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TypographyStyles />
      {config.navbar?.enabled && (
        <Navbar
          siteName={config.navbar.siteName}
          logoType={config.navbar.logoType}
          logoImage={config.navbar.logoImage}
          navItems={config.navbar.navItems}
          showSearch={config.navbar.showSearch}
        />
      )}

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            {aboutContent ? (
              <div className="whitespace-pre-wrap">{aboutContent}</div>
            ) : (
              <>
                <section>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                  <p>
                    We're dedicated to helping you make informed purchasing decisions. Our team of expert reviewers 
                    tests and evaluates products across various categories to provide honest, unbiased recommendations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
                  <p>
                    We provide in-depth product reviews, detailed comparisons, and comprehensive buying guides. 
                    Our content is created by experienced professionals who thoroughly test each product before 
                    making recommendations.
                  </p>
                  <p className="mt-4">
                    Every review includes hands-on testing, extensive research, and real-world usage to ensure 
                    our recommendations are accurate and helpful.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Honesty:</strong> We provide genuine opinions based on thorough testing</li>
                    <li><strong>Independence:</strong> Our reviews are unbiased and editorial integrity comes first</li>
                    <li><strong>Expertise:</strong> Our team has years of experience in their respective fields</li>
                    <li><strong>Transparency:</strong> We clearly disclose affiliate relationships and potential conflicts</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Meet the Team</h2>
                  <p>
                    Our diverse team includes product testers, industry experts, and passionate enthusiasts 
                    who bring unique perspectives to every review. We're committed to providing you with 
                    the information you need to make confident purchasing decisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
                  <p>
                    Have questions or suggestions? We'd love to hear from you. Reach out to our team and 
                    we'll get back to you as soon as possible.
                  </p>
                </section>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
