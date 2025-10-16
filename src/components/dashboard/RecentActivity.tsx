import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    action: "Campaign launched",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    action: "Budget increased",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    time: "5 hours ago",
    status: "info",
  },
  {
    id: 3,
    action: "Campaign paused",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    time: "1 day ago",
    status: "warning",
  },
  {
    id: 4,
    action: "New client added",
    client: "Volkswagen",
    campaign: "-",
    time: "2 days ago",
    status: "success",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <Badge variant="outline" className="text-xs">
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.client} • {activity.campaign}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
