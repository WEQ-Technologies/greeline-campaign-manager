import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BudgetBiddingProps {
  data: {
    budgetType: string;
    budget: string;
    biddingStrategy: string;
    maxCpc: string;
  };
  onChange: (field: string, value: string) => void;
}

export function BudgetBidding({ data, onChange }: BudgetBiddingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget & Bidding</CardTitle>
        <CardDescription>Set your campaign budget and bidding strategy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Budget Type</Label>
          <RadioGroup value={data.budgetType} onValueChange={(value) => onChange("budgetType", value)}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="daily" id="daily" />
              <Label htmlFor="daily" className="font-normal cursor-pointer">Daily Budget</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly" className="font-normal cursor-pointer">Monthly Budget</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget Amount ($)</Label>
          <Input
            id="budget"
            type="number"
            placeholder="1000"
            value={data.budget}
            onChange={(e) => onChange("budget", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            {data.budgetType === "daily" ? "Amount to spend per day" : "Total monthly budget"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bidding-strategy">Bidding Strategy</Label>
          <Select value={data.biddingStrategy} onValueChange={(value) => onChange("biddingStrategy", value)}>
            <SelectTrigger id="bidding-strategy">
              <SelectValue placeholder="Select bidding strategy" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="manual-cpc">Manual CPC</SelectItem>
              <SelectItem value="maximize-clicks">Maximize Clicks</SelectItem>
              <SelectItem value="target-cpa">Target CPA</SelectItem>
              <SelectItem value="maximize-conversions">Maximize Conversions</SelectItem>
              <SelectItem value="target-roas">Target ROAS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data.biddingStrategy === "manual-cpc" && (
          <div className="space-y-2">
            <Label htmlFor="max-cpc">Maximum CPC ($)</Label>
            <Input
              id="max-cpc"
              type="number"
              step="0.01"
              placeholder="2.50"
              value={data.maxCpc}
              onChange={(e) => onChange("maxCpc", e.target.value)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
