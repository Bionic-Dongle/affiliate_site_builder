import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LayoutDashboard, Zap, TrendingUp, Rocket } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-2xl px-4">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary">
          <Zap className="h-4 w-4" />
          <span className="text-sm font-medium">Affiliate Site Builder</span>
        </div>
        
        <h1 className="mb-4 text-4xl md:text-5xl font-bold">
          Launch Affiliate Sites in Minutes
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Generate content, track performance, and test multiple niches with templated sites
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Open Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Rocket className="mr-2 h-5 w-5" />
            View Templates
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-left">
          <div className="p-6 rounded-lg border bg-card">
            <LayoutDashboard className="h-8 w-8 mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Content Generator</h3>
            <p className="text-sm text-muted-foreground">
              Fill forms, generate JSON, paste into data files
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <TrendingUp className="h-8 w-8 mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Monitor performance with PostHog integration
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <Rocket className="h-8 w-8 mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Site Manager</h3>
            <p className="text-sm text-muted-foreground">
              Manage multiple affiliate sites from one place
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
