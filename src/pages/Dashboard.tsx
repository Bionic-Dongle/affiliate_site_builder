import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGenerator from "@/components/dashboard/ContentGenerator";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import SiteManager from "@/components/dashboard/SiteManager";
import TemplateBuilder from "@/components/dashboard/TemplateBuilder";
import { LayoutDashboard, FileJson, BarChart3, Globe, Layout } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Affiliate Site Builder</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Generate content, monitor performance, manage sites
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="generator" className="gap-2">
              <FileJson className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="template" className="gap-2">
              <Layout className="h-4 w-4" />
              Template
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="sites" className="gap-2">
              <Globe className="h-4 w-4" />
              Sites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="mt-6">
            <ContentGenerator />
          </TabsContent>

          <TabsContent value="template" className="mt-6">
            <TemplateBuilder />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="sites" className="mt-6">
            <SiteManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
