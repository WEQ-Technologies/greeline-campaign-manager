import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SummaryStepProps {
  data: any;
}

const recommendations = [
  { label: "Campaign name is clear and descriptive", status: "success" },
  { label: "Budget allocation is optimal", status: "success" },
  { label: "Consider adding more locations", status: "warning" },
  { label: "Keywords selected for targeting", status: "success" },
  { label: "Add more asset variations for better performance", status: "warning" },
];

function getStatusIcon(status: string) {
  switch (status) {
    case "success":
      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    case "error":
      return <XCircle className="w-4 h-4 text-red-600" />;
    default:
      return null;
  }
}

export function SummaryStep({ data }: SummaryStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-center gap-3">
              {getStatusIcon(rec.status)}
              <span className="text-sm">{rec.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Campaign Details */}
          <div>
            <h3 className="font-semibold mb-3">Campaign Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Campaign Name</p>
                <p className="font-medium">{data.campaignDetails.campaignName || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Campaign Type</p>
                <Badge variant="secondary">{data.campaignDetails.campaignType || "N/A"}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Objective</p>
                <p className="font-medium capitalize">{data.campaignDetails.objective || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="font-medium">{data.campaignDetails.client}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Budget & Bidding */}
          <div>
            <h3 className="font-semibold mb-3">Bidding Strategy</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Focus On</p>
                <p className="font-medium capitalize">{data.budget.focusOn}</p>
              </div>
              {data.budget.focusOn === "target-roas" && data.budget.targetRoas && (
                <div>
                  <p className="text-sm text-muted-foreground">Target ROAS</p>
                  <p className="font-medium">{data.budget.targetRoas}%</p>
                </div>
              )}
              {data.budget.focusOn === "target-cpa" && data.budget.targetCpa && (
                <div>
                  <p className="text-sm text-muted-foreground">Target CPA</p>
                  <p className="font-medium">${data.budget.targetCpa}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Budget Summary */}
          <div>
            <h3 className="font-semibold mb-3">Budget Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Budget Type</p>
                <p className="font-medium capitalize">{data.budget.budgetType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium text-lg">${data.budget.budgetAmount || "0.00"}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Campaign Dates */}
          <div>
            <h3 className="font-semibold mb-3">Campaign Dates</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">{data.budget.startDate || "Not set"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">
                  {data.budget.noEndDate ? "No end date" : data.budget.endDate || "Not set"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Campaign Settings */}
          <div>
            <h3 className="font-semibold mb-3">Campaign Settings</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Audience</p>
                <p className="font-medium">{data.campaignSettings.audience || "Not selected"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Locations</p>
                <p className="font-medium">
                  {data.campaignSettings.locations.length > 0
                    ? data.campaignSettings.locations.join(", ")
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Languages</p>
                <p className="font-medium">
                  {data.campaignSettings.languages.length > 0
                    ? data.campaignSettings.languages.join(", ")
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Ad Groups and Keywords */}
          <div>
            <h3 className="font-semibold mb-3">Ad Groups and Keywords</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Ad Group</p>
                <p className="font-medium">{data.adsKeywords.adGroup || "Not selected"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Keywords</p>
                <p className="font-medium">
                  {data.adsKeywords.keywords.length > 0
                    ? `${data.adsKeywords.keywords.length} keyword(s) selected`
                    : "No keywords selected"}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Asset Group */}
          <div>
            <h3 className="font-semibold mb-3">Asset Group</h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Group Name</p>
                <p className="font-medium">{data.assetGeneration.assetGroup || "Not selected"}</p>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                <Badge variant="outline">Text customization enabled</Badge>
                <Badge variant="outline">Final URL expansion enabled</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
