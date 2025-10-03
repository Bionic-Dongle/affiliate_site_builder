import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Settings, Copy, Plus } from "lucide-react";

const SiteManager = () => {
  // Mock sites - will be replaced with actual site data
  const sites = [
    {
      id: 1,
      name: "Gaming Headsets Review",
      url: "gaming-headsets.lovable.app",
      template: "Blog",
      status: "Live",
      lastUpdated: "2 hours ago",
      niche: "Gaming"
    },
    {
      id: 2,
      name: "Best Camera Lenses 2025",
      url: "camera-lenses.lovable.app",
      template: "Landing Page",
      status: "Live",
      lastUpdated: "1 day ago",
      niche: "Photography"
    },
    {
      id: 3,
      name: "Fitness Tracker Directory",
      url: "fitness-trackers.lovable.app",
      template: "Directory",
      status: "Draft",
      lastUpdated: "3 days ago",
      niche: "Fitness"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Affiliate Sites</h2>
          <p className="text-sm text-muted-foreground">Manage all your sites in one place</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Site
        </Button>
      </div>

      <div className="grid gap-4">
        {sites.map((site) => (
          <Card key={site.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{site.url}</span>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Copy className="h-3 w-3" />
                    </button>
                  </CardDescription>
                </div>
                <Badge variant={site.status === "Live" ? "default" : "secondary"}>
                  {site.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Template:</span>
                    <span className="ml-2 font-medium">{site.template}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Niche:</span>
                    <span className="ml-2 font-medium">{site.niche}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Updated:</span>
                    <span className="ml-2 font-medium">{site.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button variant="outline" className="justify-start">
              <Copy className="mr-2 h-4 w-4" />
              Clone Existing Site
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Bulk Update SEO
            </Button>
            <Button variant="outline" className="justify-start">
              <ExternalLink className="mr-2 h-4 w-4" />
              Export All Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-accent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-medium mb-1">Template System</h4>
              <p className="text-sm text-muted-foreground">
                Each site uses shared components but maintains its own data files and theme. 
                Update your JSON files to add content, customize design tokens for different niches.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteManager;
