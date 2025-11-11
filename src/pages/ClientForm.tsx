import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const availableAccounts = [
  { id: "123-456-7890", name: "Tech Startup Google Ads" },
  { id: "234-567-8901", name: "Nations Auto Facebook" },
  { id: "345-678-9012", name: "VW Heavy Up Ads" },
];

export default function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    clientName: "",
    businessName: "",
    destinationType: "website",
    website: "",
    phoneNo: "",
    preferredCampaignName: "",
    preferredDealershipName: "",
    linkedAccounts: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEditing ? "Client updated successfully!" : "Client created successfully!");
    navigate("/clients");
  };

  const toggleAccount = (accountId: string) => {
    setFormData((prev) => ({
      ...prev,
      linkedAccounts: prev.linkedAccounts.includes(accountId)
        ? prev.linkedAccounts.filter((id) => id !== accountId)
        : [...prev.linkedAccounts, accountId],
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/clients")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? "Edit Client" : "Add New Client"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Update client information" : "Create a new client account"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessName">What's your business name</Label>
              <Input
                id="businessName"
                placeholder="Enter business name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>Where should people go after clicking your ad</Label>
              <RadioGroup
                value={formData.destinationType}
                onValueChange={(value) =>
                  setFormData({ ...formData, destinationType: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="website" id="website" />
                  <Label htmlFor="website" className="font-normal cursor-pointer">
                    Website
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="phone" />
                  <Label htmlFor="phone" className="font-normal cursor-pointer">
                    Phone number
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.destinationType === "website" ? (
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="phoneNo">Phone Number</Label>
                <Input
                  id="phoneNo"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phoneNo}
                  onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="preferredCampaignName">Preferred Campaign Name</Label>
              <Input
                id="preferredCampaignName"
                placeholder="Enter preferred campaign name"
                value={formData.preferredCampaignName}
                onChange={(e) => setFormData({ ...formData, preferredCampaignName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredDealershipName">Preferred Dealership Name</Label>
              <Textarea
                id="preferredDealershipName"
                placeholder="Enter preferred dealership name"
                value={formData.preferredDealershipName}
                onChange={(e) => setFormData({ ...formData, preferredDealershipName: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link Google Ad Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {availableAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.linkedAccounts.includes(account.id)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => toggleAccount(account.id)}
                >
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{account.id}</p>
                  </div>
                  {formData.linkedAccounts.includes(account.id) && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/clients")}
          >
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-hover">
            {isEditing ? "Update Client" : "Save Client"}
          </Button>
        </div>
      </form>
    </div>
  );
}
