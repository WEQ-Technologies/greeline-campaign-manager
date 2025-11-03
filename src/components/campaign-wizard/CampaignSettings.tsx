import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface CampaignSettingsProps {
  data: {
    name: string;
    type: string;
    objective: string;
    reachGoals?: string[];
    businessWebsiteUrl?: string;
    phoneNumber?: string;
    countryCode?: string;
    salesConversionGoals?: string[];
    leadsConversionGoals?: string[];
    finalUrl?: string;
  };
  onChange: (field: string, value: any) => void;
}

const reachGoalOptions = {
  sales: ["Website visits", "Store visits", "Phone calls", "Lead form submissions"],
  leads: ["Website visits", "Phone calls"],
  traffic: ["Website visits"],
};

const salesConversionOptions = [
  "Purchase",
  "Purchase subscription",
  "Add to cart",
  "Begin checkout",
];

const leadsConversionOptions = [
  "Form submissions from your ads",
  "Form submissions from your website",
  "Phone calls from your ads",
  "Sign-ups",
  "Book appointments",
  "Request a quote",
  "Get directions",
  "Outbound clicks",
  "Contact",
];

export function CampaignSettings({ data, onChange }: CampaignSettingsProps) {
  const isSearchCampaign = data.type === "google-search";
  const isPMaxCampaign = data.type === "performance-max";
  const showReachGoals = isSearchCampaign && (data.objective === "leads" || data.objective === "conversions" || data.objective === "traffic");
  const showSalesConversions = isSearchCampaign && data.objective === "conversions";
  const showLeadsConversions = isSearchCampaign && data.objective === "leads";
  const needsWebsiteUrl = data.reachGoals?.includes("Website visits") || data.objective === "traffic";
  const needsPhoneNumber = data.reachGoals?.includes("Phone calls");

  const toggleReachGoal = (goal: string) => {
    const current = data.reachGoals || [];
    const updated = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    onChange("reachGoals", updated);
  };

  const toggleConversionGoal = (goal: string, type: "sales" | "leads") => {
    const field = type === "sales" ? "salesConversionGoals" : "leadsConversionGoals";
    const current = data[field] || [];
    const updated = current.includes(goal)
      ? current.filter((g) => g !== goal)
      : [...current, goal];
    onChange(field, updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Settings</CardTitle>
        <CardDescription>Configure basic campaign details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="campaign-name">Campaign Name</Label>
          <Input
            id="campaign-name"
            placeholder="e.g., Summer Sale 2025"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="campaign-type">Campaign Type</Label>
          <Select value={data.type} onValueChange={(value) => onChange("type", value)}>
            <SelectTrigger id="campaign-type">
              <SelectValue placeholder="Select campaign type" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="google-search">Search</SelectItem>
              <SelectItem value="performance-max">Performance Max (PMax)</SelectItem>
              <SelectItem value="facebook">Facebook Ads</SelectItem>
              <SelectItem value="instagram">Instagram Ads</SelectItem>
              <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">Campaign Objective</Label>
          <Select value={data.objective} onValueChange={(value) => onChange("objective", value)}>
            <SelectTrigger id="objective">
              <SelectValue placeholder="Select objective" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="leads">Leads</SelectItem>
              <SelectItem value="traffic">Website Traffic</SelectItem>
              <SelectItem value="conversions">Sales</SelectItem>
              <SelectItem value="awareness">Brand Awareness</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showReachGoals && (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
            <Label className="text-base font-semibold">🎯 Choose how you'd like to reach your goals</Label>
            <div className="space-y-2">
              {(data.objective === "conversions"
                ? reachGoalOptions.sales
                : data.objective === "leads"
                ? reachGoalOptions.leads
                : reachGoalOptions.traffic
              ).map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={data.reachGoals?.includes(goal)}
                    onCheckedChange={() => toggleReachGoal(goal)}
                  />
                  <label htmlFor={goal} className="text-sm cursor-pointer">
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {needsWebsiteUrl && (
          <div className="space-y-2">
            <Label htmlFor="website-url">Business Website URL</Label>
            <Input
              id="website-url"
              type="url"
              placeholder="https://example.com"
              value={data.businessWebsiteUrl || ""}
              onChange={(e) => onChange("businessWebsiteUrl", e.target.value)}
            />
          </div>
        )}

        {needsPhoneNumber && (
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <div className="flex gap-2">
              <Select
                value={data.countryCode || "+1"}
                onValueChange={(value) => onChange("countryCode", value)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="+1">🇺🇸 +1</SelectItem>
                  <SelectItem value="+44">🇬🇧 +44</SelectItem>
                  <SelectItem value="+91">🇮🇳 +91</SelectItem>
                  <SelectItem value="+86">🇨🇳 +86</SelectItem>
                  <SelectItem value="+49">🇩🇪 +49</SelectItem>
                </SelectContent>
              </Select>
              <Input
                id="phone-number"
                type="tel"
                placeholder="Enter phone number"
                value={data.phoneNumber || ""}
                onChange={(e) => onChange("phoneNumber", e.target.value)}
              />
            </div>
          </div>
        )}

        {showSalesConversions && (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
            <Label className="text-base font-semibold">🛍️ Choose Your Sales Conversion Goals</Label>
            <div className="space-y-2">
              {salesConversionOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sales-${goal}`}
                    checked={data.salesConversionGoals?.includes(goal)}
                    onCheckedChange={() => toggleConversionGoal(goal, "sales")}
                  />
                  <label htmlFor={`sales-${goal}`} className="text-sm cursor-pointer">
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {showLeadsConversions && (
          <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
            <Label className="text-base font-semibold">✉️ Choose Your Leads Conversion Goals</Label>
            <div className="space-y-2">
              {leadsConversionOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={`leads-${goal}`}
                    checked={data.leadsConversionGoals?.includes(goal)}
                    onCheckedChange={() => toggleConversionGoal(goal, "leads")}
                  />
                  <label htmlFor={`leads-${goal}`} className="text-sm cursor-pointer">
                    {goal}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {isPMaxCampaign && (
          <div className="space-y-2">
            <Label htmlFor="final-url">Final URL</Label>
            <p className="text-sm text-muted-foreground">Where should people go after clicking your ads?</p>
            <Input
              id="final-url"
              type="url"
              placeholder="https://example.com/landing-page"
              value={data.finalUrl || ""}
              onChange={(e) => onChange("finalUrl", e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
