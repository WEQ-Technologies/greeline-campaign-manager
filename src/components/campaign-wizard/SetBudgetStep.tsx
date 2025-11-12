import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface SetBudgetStepProps {
  data: {
    focusOn: string;
    targetCpa: string;
    targetRoas: string;
    budgetType: string;
    budgetAmount: string;
    startDate: string;
    endDate: string;
    noEndDate: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export function SetBudgetStep({ data, onChange }: SetBudgetStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bidding</CardTitle>
          <CardDescription>Configure your bidding strategy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>What do you want to focus on?</Label>
            <RadioGroup value={data.focusOn} onValueChange={(value) => onChange("focusOn", value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conversion" id="conversion" />
                <Label htmlFor="conversion" className="font-normal cursor-pointer">Conversion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="conversion-value" id="conversion-value" />
                <Label htmlFor="conversion-value" className="font-normal cursor-pointer">Conversion Value</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="target-cpa" id="target-cpa" />
                <Label htmlFor="target-cpa" className="font-normal cursor-pointer">Target CPA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="target-roas" id="target-roas" />
                <Label htmlFor="target-roas" className="font-normal cursor-pointer">Target ROAS</Label>
              </div>
            </RadioGroup>
          </div>

          {data.focusOn === "target-cpa" && (
            <div className="space-y-2">
              <Label htmlFor="targetCpa">Target CPA ($)</Label>
              <Input
                id="targetCpa"
                type="number"
                placeholder="0.00"
                value={data.targetCpa}
                onChange={(e) => onChange("targetCpa", e.target.value)}
              />
            </div>
          )}

          {data.focusOn === "target-roas" && (
            <div className="space-y-2">
              <Label htmlFor="targetRoas">Target ROAS (%)</Label>
              <Input
                id="targetRoas"
                type="number"
                placeholder="0"
                value={data.targetRoas}
                onChange={(e) => onChange("targetRoas", e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget</CardTitle>
          <CardDescription>Set your budget preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="budgetType">Budget Type</Label>
            <Select value={data.budgetType} onValueChange={(value) => onChange("budgetType", value)}>
              <SelectTrigger id="budgetType">
                <SelectValue placeholder="Select budget type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Average Daily Budget</SelectItem>
                <SelectItem value="total">Campaign Total Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budgetAmount">
              {data.budgetType === "daily" ? "Daily Budget ($)" : "Total Budget ($)"}
            </Label>
            <Input
              id="budgetAmount"
              type="number"
              placeholder="0.00"
              value={data.budgetAmount}
              onChange={(e) => onChange("budgetAmount", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Dates</CardTitle>
          <CardDescription>Schedule your campaign duration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={data.startDate}
              onChange={(e) => onChange("startDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={data.endDate}
              onChange={(e) => onChange("endDate", e.target.value)}
              disabled={data.noEndDate}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="noEndDate"
              checked={data.noEndDate}
              onCheckedChange={(checked) => onChange("noEndDate", checked)}
            />
            <Label htmlFor="noEndDate" className="font-normal cursor-pointer">
              No End Date
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
