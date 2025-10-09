import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentGenerator from "@/components/dashboard/ContentGenerator";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import SiteManager from "@/components/dashboard/SiteManager";
import TemplateBuilder from "@/components/dashboard/TemplateBuilder";
import ResourceManager from "@/components/dashboard/ResourceManager";
import { LayoutDashboard, FileJson, BarChart3, Globe, Layout, Moon, Sun, LogOut, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { theme, setTheme } = useTheme();
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  // Auth disabled for development
  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate("/auth");
  //   }
  // }, [user, loading, navigate]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-background">
  //       <p className="text-muted-foreground">Loading...</p>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Affiliate Site Builder</h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Generate content, monitor performance, manage sites
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              {/* Auth disabled for development */}
              {/* <Button variant="outline" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button> */}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="generator" className="gap-2">
              <FileJson className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="template" className="gap-2">
              <Layout className="h-4 w-4" />
              Template
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <BookmarkPlus className="h-4 w-4" />
              Resources
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

          <TabsContent value="resources" className="mt-6">
            <ResourceManager />
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
