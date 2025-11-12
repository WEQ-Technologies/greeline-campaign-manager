import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CampaignDetailsStepProps {
  data: {
    client: string;
    campaignName: string;
    objective: string;
    campaignType: string;
  };
  onChange: (field: string, value: string) => void;
}

export function CampaignDetailsStep({ data, onChange }: CampaignDetailsStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
          <CardDescription>Set up your campaign's basic information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={data.client}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Pre-filled from header context</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaignName">Campaign Name</Label>
            <Input
              id="campaignName"
              placeholder="Enter campaign name"
              value={data.campaignName}
              onChange={(e) => onChange("campaignName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Campaign Objective</Label>
            <Select value={data.objective} onValueChange={(value) => onChange("objective", value)}>
              <SelectTrigger id="objective">
                <SelectValue placeholder="Select campaign objective" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="leads">Leads</SelectItem>
                <SelectItem value="website-traffic">Website Traffic</SelectItem>
                <SelectItem value="local-store">Local store visits and promotions</SelectItem>
                <SelectItem value="no-guidance">Create a campaign without guidance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="campaignType">Campaign Type</Label>
            <Select value={data.campaignType} onValueChange={(value) => onChange("campaignType", value)}>
              <SelectTrigger id="campaignType">
                <SelectValue placeholder="Select campaign type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="search">Search</SelectItem>
                <SelectItem value="performance-max">Performance Max</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
