import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewLaunchProps {
  data: any;
}

const preFlightChecks = [
  { label: "Client selected", status: "success" },
  { label: "Campaign settings configured", status: "success" },
  { label: "Budget and bidding set", status: "success" },
  { label: "Target locations specified", status: "warning" },
  { label: "Ad groups created", status: "success" },
  { label: "Extensions added", status: "warning" },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-warning" />;
    case "error":
      return <XCircle className="w-5 h-5 text-destructive" />;
    default:
      return null;
  }
}

export function ReviewLaunch({ data }: ReviewLaunchProps) {

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Issues & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {preFlightChecks.map((check, index) => (
            <div key={index} className="flex items-center gap-3">
              {getStatusIcon(check.status)}
              <span className="text-sm">{check.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Campaign Name</p>
              <p className="font-medium">{data.settings.name || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <Badge variant="secondary">{data.settings.type || "N/A"}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Objective</p>
              <p className="font-medium capitalize">{data.settings.objective || "Not specified"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget</p>
              <p className="font-medium text-lg">
                ${data.budget.averageDailyBudget || data.budget.totalBudget || "0.00"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertDescription className="ml-2">
          Campaign ready to launch! Review settings and click Launch Campaign.
        </AlertDescription>
      </Alert>
    </div>
  );
}
