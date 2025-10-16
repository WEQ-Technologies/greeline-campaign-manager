import { DollarSign, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Monitor your campaigns and client performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Spend"
          value="$12,450"
          change={8.2}
          icon={<DollarSign className="w-6 h-6 text-white" />}
        />
        <MetricCard
          title="Total Clicks"
          value="24,580"
          change={12.5}
          icon={<MousePointerClick className="w-6 h-6 text-white" />}
        />
        <MetricCard
          title="Conversions"
          value="584"
          change={-3.1}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
        />
        <MetricCard
          title="Active Clients"
          value="18"
          change={5.0}
          icon={<Users className="w-6 h-6 text-white" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceChart />
        <RecentActivity />
      </div>
    </div>
  );
}
