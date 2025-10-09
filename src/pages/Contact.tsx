import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { useTemplate } from "@/contexts/TemplateContext";
import TypographyStyles from "@/components/TypographyStyles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Send, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { config } = useTemplate();
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "", address: "", content: "" });

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
        if (projectConfig?.pages?.settings?.contact) {
          setContactInfo(projectConfig.pages.settings.contact);
        }
      }
    };
    loadProject();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              {contactInfo.content || "Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {contactInfo.email && (
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                  </div>
                </div>
              </div>
            )}

            {contactInfo.phone && (
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>
            )}

            {contactInfo.address && (
              <div className="border rounded-lg p-6 bg-card md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Address</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            )}

            {!contactInfo.email && !contactInfo.phone && !contactInfo.address && (
              <>
                <div className="border rounded-lg p-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">Email Us</h3>
                      <p className="text-sm text-muted-foreground">Our team is here to help</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Send us an email and we'll get back to you within 24-48 hours.
                  </p>
                </div>

                <div className="border rounded-lg p-6 bg-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold">Quick Response</h3>
                      <p className="text-sm text-muted-foreground">We're usually fast</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Most inquiries are answered within one business day.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="border rounded-lg p-8 bg-card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="What's this about?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more about your inquiry..." 
                  rows={6}
                  required 
                />
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
