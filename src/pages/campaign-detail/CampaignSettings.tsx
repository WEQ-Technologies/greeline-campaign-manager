import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from "lucide-react";

export default function CampaignSettings() {
  const navigate = useNavigate();
  const { id: campaignId } = useParams();

  const campaignData = {
    name: "Brand Awareness Q1",
    type: "Search",
    objective: "Sales",
    status: "Active",
    budget: {
      type: "Daily",
      amount: "$50.00",
      totalSpent: "$1,245.00",
    },
    targeting: {
      locations: ["United States", "Canada"],
      languages: ["English"],
      devices: ["Computers", "Mobile Devices"],
    },
    dates: {
      startDate: "2025-01-15",
      endDate: "2025-03-31",
    },
    bidding: {
      strategy: "Maximize Conversions",
      targetCpa: "$25.00",
    },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Settings</h1>
          <p className="text-muted-foreground mt-1">View and manage campaign configuration</p>
        </div>
        <Button onClick={() => navigate(`/campaigns/${campaignId}/edit`)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Campaign
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Campaign Name</p>
            <p className="font-medium text-lg">{campaignData.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Campaign Type</p>
            <Badge variant="secondary">{campaignData.type}</Badge>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Objective</p>
            <p className="font-medium">{campaignData.objective}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge>{campaignData.status}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget & Bidding</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Budget Type</p>
            <p className="font-medium">{campaignData.budget.type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Budget Amount</p>
            <p className="font-medium text-lg">{campaignData.budget.amount}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="font-medium text-lg">{campaignData.budget.totalSpent}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Bidding Strategy</p>
            <p className="font-medium">{campaignData.bidding.strategy}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Target CPA</p>
            <p className="font-medium">{campaignData.bidding.targetCpa}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Targeting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Locations</p>
            <div className="flex flex-wrap gap-2">
              {campaignData.targeting.locations.map((location) => (
                <Badge key={location} variant="outline">
                  {location}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {campaignData.targeting.languages.map((language) => (
                <Badge key={language} variant="outline">
                  {language}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Devices</p>
            <div className="flex flex-wrap gap-2">
              {campaignData.targeting.devices.map((device) => (
                <Badge key={device} variant="outline">
                  {device}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Schedule</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="font-medium">{campaignData.dates.startDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="font-medium">{campaignData.dates.endDate}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
