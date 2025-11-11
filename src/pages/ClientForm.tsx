import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const availableAccounts = {
  google: [
    { id: "123-456-7890", name: "Tech Startup Google Ads" },
    { id: "234-567-8901", name: "Main Google Ads Account" },
    { id: "345-678-9012", name: "VW Heavy Up Ads" },
  ],
  meta: [
    { id: "meta-001", name: "Tech Startup Meta Ads" },
    { id: "meta-002", name: "Main Meta Business" },
    { id: "meta-003", name: "VW Meta Campaign" },
  ],
  linkedin: [
    { id: "li-001", name: "Tech Startup LinkedIn" },
    { id: "li-002", name: "Corporate LinkedIn Ads" },
  ],
  tiktok: [
    { id: "tt-001", name: "Tech Startup TikTok" },
    { id: "tt-002", name: "Brand TikTok Ads" },
  ],
};

export default function ClientForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    clientName: "",
    preferredCampaignName: "",
    preferredDealershipName: "",
  });

  const [linkedAccounts, setLinkedAccounts] = useState<Array<{ platform: string; id: string; name: string }>>([]);
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isEditing ? "Client updated successfully!" : "Client created successfully!");
    navigate("/clients");
  };

  const handleAddAccount = (platform: string) => {
    if (!selectedAccountId) {
      toast.error("Please select an account");
      return;
    }

    const accounts = availableAccounts[platform as keyof typeof availableAccounts];
    const account = accounts.find(acc => acc.id === selectedAccountId);
    
    if (account && !linkedAccounts.some(acc => acc.id === account.id)) {
      setLinkedAccounts([...linkedAccounts, { platform, ...account }]);
      toast.success(`${account.name} linked successfully`);
    }
    
    setDialogOpen(null);
    setSelectedAccountId("");
  };

  const handleRemoveAccount = (accountId: string) => {
    setLinkedAccounts(linkedAccounts.filter(acc => acc.id !== accountId));
    toast.success("Account removed");
  };

  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case 'google':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
        );
      case 'meta':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0zm5.5 11.6c-.8 0-1.5-.2-2.1-.6v5.5c0 2.8-2.3 5.1-5.1 5.1-2.8 0-5.1-2.3-5.1-5.1 0-2.8 2.3-5.1 5.1-5.1.1 0 .3 0 .4.1v2.5c-.1 0-.3-.1-.4-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V3.8h2.5c.2 1.5 1.3 2.7 2.7 3v2.6c-.5.2-1 .2-1.5.2z"/>
          </svg>
        );
      default:
        return null;
    }
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
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Dialog open={dialogOpen === 'google'} onOpenChange={(open) => setDialogOpen(open ? 'google' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="font-medium">Google Ads</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select Google Ads Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAccounts.google.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleAddAccount('google')}>
                        Add Account
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={dialogOpen === 'meta'} onOpenChange={(open) => setDialogOpen(open ? 'meta' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="font-medium">Meta Ads</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select Meta Ads Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAccounts.meta.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleAddAccount('meta')}>
                        Add Account
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={dialogOpen === 'linkedin'} onOpenChange={(open) => setDialogOpen(open ? 'linkedin' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span className="font-medium">LinkedIn Ads</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select LinkedIn Ads Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAccounts.linkedin.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleAddAccount('linkedin')}>
                        Add Account
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog open={dialogOpen === 'tiktok'} onOpenChange={(open) => setDialogOpen(open ? 'tiktok' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="h-24 flex flex-col gap-2"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0zm5.5 11.6c-.8 0-1.5-.2-2.1-.6v5.5c0 2.8-2.3 5.1-5.1 5.1-2.8 0-5.1-2.3-5.1-5.1 0-2.8 2.3-5.1 5.1-5.1.1 0 .3 0 .4.1v2.5c-.1 0-.3-.1-.4-.1-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4 2.4-1.1 2.4-2.4V3.8h2.5c.2 1.5 1.3 2.7 2.7 3v2.6c-.5.2-1 .2-1.5.2z"/>
                    </svg>
                    <span className="font-medium">TikTok Ads</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Select TikTok Ads Account</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an account" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableAccounts.tiktok.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setDialogOpen(null)}>
                        Cancel
                      </Button>
                      <Button onClick={() => handleAddAccount('tiktok')}>
                        Add Account
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {linkedAccounts.length > 0 && (
              <div className="space-y-2 pt-4 border-t">
                <Label>Linked Accounts</Label>
                <div className="space-y-2">
                  {linkedAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {getPlatformIcon(account.platform)}
                        <div>
                          <p className="font-medium text-sm">{account.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)} • {account.id}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveAccount(account.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
