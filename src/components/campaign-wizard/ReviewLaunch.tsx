import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ReviewLaunchProps {
  data: any;
}

const preFlightChecks = [
  { id: 1, label: "Google Analytics linked", status: "success" },
  { id: 2, label: "Billing configured", status: "success" },
  { id: 3, label: "Business Profile connected", status: "success" },
  { id: 4, label: "Policy compliance passed", status: "warning" },
];

export function ReviewLaunch({ data }: ReviewLaunchProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "error":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pre-Flight Validation</CardTitle>
          <CardDescription>Ensure everything is configured correctly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {preFlightChecks.map((check) => (
            <div key={check.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">{check.label}</span>
              {getStatusIcon(check.status)}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Summary</CardTitle>
          <CardDescription>Review your campaign before launching</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Campaign Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Name:</span> {data.settings.name || "N/A"}</p>
              <p><span className="text-muted-foreground">Type:</span> {data.settings.type || "N/A"}</p>
              <p><span className="text-muted-foreground">Objective:</span> {data.settings.objective || "N/A"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Budget & Bidding</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Budget:</span> ${data.budget.budget} ({data.budget.budgetType})</p>
              <p><span className="text-muted-foreground">Strategy:</span> {data.budget.biddingStrategy}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Targeting</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Locations:</span> {data.targeting.locations.length || 0} selected</p>
              <p><span className="text-muted-foreground">Languages:</span> {data.targeting.languages.join(", ") || "None"}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Ad Groups</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Total Groups:</span> {data.adGroups.adGroups.length}</p>
              <p><span className="text-muted-foreground">Total Keywords:</span> {
                data.adGroups.adGroups.reduce((sum: number, group: any) => sum + group.keywords.length, 0)
              }</p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-2">Extensions</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Sitelinks:</span> {data.extensions.sitelinks.length}</p>
              <p><span className="text-muted-foreground">Callouts:</span> {data.extensions.callouts.length}</p>
              <p><span className="text-muted-foreground">Locations:</span> {data.extensions.locations.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
