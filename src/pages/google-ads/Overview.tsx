import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MousePointerClick, Target, Megaphone } from "lucide-react";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";

const metrics = [
  {
    title: "Total Spend",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
    trend: "up" as const,
  },
  {
    title: "Total Clicks",
    value: "12,234",
    change: "+15.3% from last month",
    icon: MousePointerClick,
    trend: "up" as const,
  },
  {
    title: "Conversions",
    value: "573",
    change: "+12.5% from last month",
    icon: Target,
    trend: "up" as const,
  },
  {
    title: "Active Campaigns",
    value: "24",
    change: "+3 new campaigns",
    icon: Megaphone,
    trend: "up" as const,
  },
];

export default function Overview() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview for Tech Startup Inc under Account 1</h1>
        <p className="text-muted-foreground mt-1">Performance metrics and insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <PerformanceChart />
        </CardContent>
      </Card>
    </div>
  );
}
