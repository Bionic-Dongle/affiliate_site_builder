import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, MousePointerClick, DollarSign, ExternalLink } from "lucide-react";

const AnalyticsDashboard = () => {
  // Mock data - will be replaced with real PostHog data
  const stats = [
    {
      title: "Total Visitors",
      value: "12,458",
      change: "+12.5%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Affiliate Clicks",
      value: "1,234",
      change: "+8.2%",
      icon: MousePointerClick,
      trend: "up"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "-0.4%",
      icon: TrendingUp,
      trend: "down"
    },
    {
      title: "Est. Revenue",
      value: "$2,847",
      change: "+15.3%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  const topSites = [
    { name: "Gaming Headsets Review", visitors: 4521, revenue: "$1,234" },
    { name: "Best Camera Lenses 2025", visitors: 3102, revenue: "$892" },
    { name: "Fitness Tracker Directory", visitors: 2845, revenue: "$521" },
    { name: "Coffee Maker Comparison", visitors: 1990, revenue: "$200" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <p className="text-sm text-muted-foreground">Last 30 days across all sites</p>
        </div>
        <a 
          href="https://posthog.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          Open PostHog <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Sites</CardTitle>
            <CardDescription>Ranked by visitor traffic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSites.map((site, index) => (
                <div key={site.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{site.name}</p>
                      <p className="text-xs text-muted-foreground">{site.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">{site.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>PostHog Integration</CardTitle>
            <CardDescription>Real-time analytics tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-medium mb-2">Tracked Events</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Page views</li>
                <li>✓ Affiliate link clicks</li>
                <li>✓ Form submissions</li>
                <li>✓ Scroll depth</li>
                <li>✓ Time on page</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-muted p-4">
              <p className="text-sm">
                <strong>Setup Status:</strong> Ready to integrate
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PostHog snippet will be added to all template sites automatically
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics to Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Traffic Sources</h4>
              <p className="text-xs text-muted-foreground">Which channels drive most visitors</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Click-Through Rate</h4>
              <p className="text-xs text-muted-foreground">% of visitors clicking affiliate links</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Revenue Per Visitor</h4>
              <p className="text-xs text-muted-foreground">Average value per site visitor</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
