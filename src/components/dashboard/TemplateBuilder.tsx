import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Copy, CheckCircle, Layout } from "lucide-react";
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
  };
}

const TemplateBuilder = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

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

  const updateField = (sectionId: string, field: string, value: string) => {
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

  const generateTemplateConfig = () => {
    const enabledSections = sections.filter((s) => s.enabled);
    const config = {
      siteName: "My Affiliate Site",
      template: "peak-inspire",
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
              <Layout className="h-5 w-5" />
              Site Components
            </CardTitle>
            <CardDescription>Select and configure sections for your site</CardDescription>
          </CardHeader>
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
                    className="text-base font-medium cursor-pointer"
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
              <li>Check the sections you want on your site</li>
              <li>Fill in text content and image URLs for each section</li>
              <li>Copy the generated template configuration</li>
              <li>Use this config to build your affiliate site pages</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplateBuilder;
