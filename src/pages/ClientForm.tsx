import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    clientName: "",
    preferredCampaignName: "",
    preferredDealershipName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEditing ? "Client updated successfully!" : "Client created successfully!");
    navigate("/clients");
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
            <CardTitle>Link Ad Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button"
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => toast.success("Google Ads connection initiated")}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="font-medium">Google Ads</span>
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => toast.success("Meta Ads connection initiated")}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                </svg>
                <span className="font-medium">Meta Ads</span>
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => toast.success("LinkedIn Ads connection initiated")}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span className="font-medium">LinkedIn Ads</span>
              </Button>
              
              <Button 
                type="button"
                variant="outline" 
                className="h-24 flex flex-col gap-2"
                onClick={() => toast.success("TikTok Ads connection initiated")}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0zm5.5 11.6c-.8 0-1.5-.2-2.1-.6v5.5c0 2.8-2.3 5.1-5.1 5.1-2.8 0-5.1-2.3-5.1-5.1 0-2.8 2.3-5.1 5.1-5.1.1 0 .3 0 .4.1v2.5c-.1 0-.3-.1-.4-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V3.8h2.5c.2 1.5 1.3 2.7 2.7 3v2.6c-.5.2-1 .2-1.5.2z"/>
                </svg>
                <span className="font-medium">TikTok Ads</span>
              </Button>
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
