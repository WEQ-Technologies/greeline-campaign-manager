import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "lucide-react";

interface BudgetBiddingProps {
  data: {
    focusOn: string;
    targetCpa?: string;
    targetRoas?: string;
    budgetType: string;
    averageDailyBudget?: string;
    totalBudget?: string;
    startDate: string;
    endDate: string;
    promotionMode: boolean;
    promotionStartDate?: string;
    promotionEndDate?: string;
  };
  onChange: (field: string, value: any) => void;
}

export function BudgetBidding({ data, onChange }: BudgetBiddingProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bidding Settings</CardTitle>
          <CardDescription>Choose your bidding focus and strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>What do you want to focus on?</Label>
            <RadioGroup value={data.focusOn} onValueChange={(value) => onChange("focusOn", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conversions" id="conversions" />
                <Label htmlFor="conversions" className="font-normal cursor-pointer">Conversions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conversion-value" id="conversion-value" />
                <Label htmlFor="conversion-value" className="font-normal cursor-pointer">Conversion Value</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="customer-acquisition" id="customer-acquisition" />
                <Label htmlFor="customer-acquisition" className="font-normal cursor-pointer">Customer Acquisition</Label>
              </div>
            </RadioGroup>
          </div>

          {data.focusOn === "conversions" && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="target-cpa">Target CPA (Optional)</Label>
              <Input
                id="target-cpa"
                type="number"
                step="0.01"
                placeholder="25.00"
                value={data.targetCpa || ""}
                onChange={(e) => onChange("targetCpa", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Cost per action you want to achieve</p>
            </div>
          )}

          {data.focusOn === "conversion-value" && (
            <div className="space-y-2 pl-6">
              <Label htmlFor="target-roas">Target ROAS (Optional)</Label>
              <Input
                id="target-roas"
                type="number"
                step="0.01"
                placeholder="4.00"
                value={data.targetRoas || ""}
                onChange={(e) => onChange("targetRoas", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Return on ad spend target (e.g., 4.00 = 400%)</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
          <CardDescription>Set your campaign budget</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Budget Type</Label>
            <RadioGroup value={data.budgetType} onValueChange={(value) => onChange("budgetType", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="daily" id="daily" />
                <Label htmlFor="daily" className="font-normal cursor-pointer">Average Daily Budget</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="total" id="total" />
                <Label htmlFor="total" className="font-normal cursor-pointer">Campaign Total Budget</Label>
              </div>
            </RadioGroup>
          </div>

          {data.budgetType === "daily" ? (
            <div className="space-y-2">
              <Label htmlFor="daily-budget">Average Daily Budget ($)</Label>
              <Input
                id="daily-budget"
                type="number"
                placeholder="100.00"
                value={data.averageDailyBudget || ""}
                onChange={(e) => onChange("averageDailyBudget", e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="total-budget">Campaign Total Budget ($)</Label>
              <Input
                id="total-budget"
                type="number"
                placeholder="1000.00"
                value={data.totalBudget || ""}
                onChange={(e) => onChange("totalBudget", e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Dates</CardTitle>
          <CardDescription>Set start and end dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <div className="relative">
              <Input
                id="start-date"
                type="date"
                value={data.startDate}
                onChange={(e) => onChange("startDate", e.target.value)}
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="end-date">End Date (Optional)</Label>
            <div className="relative">
              <Input
                id="end-date"
                type="date"
                value={data.endDate}
                onChange={(e) => onChange("endDate", e.target.value)}
              />
              <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            <p className="text-xs text-muted-foreground">Leave empty for no end date</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Mode</CardTitle>
          <CardDescription>Ramp up spending during promotion dates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="promotion-mode">Enable Promotion Mode</Label>
            <Switch
              id="promotion-mode"
              checked={data.promotionMode}
              onCheckedChange={(checked) => onChange("promotionMode", checked)}
            />
          </div>

          {data.promotionMode && (
            <div className="space-y-4 pl-4 border-l-2">
              <div className="space-y-2">
                <Label htmlFor="promo-start">Promotion Start Date</Label>
                <Input
                  id="promo-start"
                  type="date"
                  value={data.promotionStartDate || ""}
                  onChange={(e) => onChange("promotionStartDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="promo-end">Promotion End Date</Label>
                <Input
                  id="promo-end"
                  type="date"
                  value={data.promotionEndDate || ""}
                  onChange={(e) => onChange("promotionEndDate", e.target.value)}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
