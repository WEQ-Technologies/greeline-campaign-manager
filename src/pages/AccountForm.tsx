import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function AccountForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [createFormData, setCreateFormData] = useState({
    name: "",
    timezone: "",
    currency: "",
    accountType: "",
  });

  const [linkFormData, setLinkFormData] = useState({
    name: "",
    accountType: "",
    accountIds: "",
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("New account created successfully!");
    navigate("/accounts");
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Existing account linked successfully!");
    navigate("/accounts");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/accounts")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isEditing ? "Edit Account" : "Create New Account"}</h1>
          <p className="text-muted-foreground mt-1">
            {isEditing ? "Update account details" : "Add a new advertising account"}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Create New Account Section */}
        <form onSubmit={handleCreateSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>1️⃣ Create New Ads Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="create-name">Ads Account Name</Label>
                <Input
                  id="create-name"
                  placeholder="Enter account name"
                  value={createFormData.name}
                  onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-timezone">Time Zone</Label>
                <Select
                  value={createFormData.timezone}
                  onValueChange={(value) => setCreateFormData({ ...createFormData, timezone: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="cst">Central Time (CST)</SelectItem>
                    <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-currency">Currency</Label>
                <Select
                  value={createFormData.currency}
                  onValueChange={(value) => setCreateFormData({ ...createFormData, currency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD - US Dollar</SelectItem>
                    <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                    <SelectItem value="gbp">GBP - British Pound</SelectItem>
                    <SelectItem value="eur">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="create-account-type">Account Type</Label>
                <Select
                  value={createFormData.accountType}
                  onValueChange={(value) => setCreateFormData({ ...createFormData, accountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-ads">Google Ads Account</SelectItem>
                    <SelectItem value="meta-ads">Meta Ads Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/accounts")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary-hover">
                  Create Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Link Existing Account Section */}
        <form onSubmit={handleLinkSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>2️⃣ Link Existing Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="link-name">Account Name</Label>
                <Input
                  id="link-name"
                  placeholder="Enter account name"
                  value={linkFormData.name}
                  onChange={(e) => setLinkFormData({ ...linkFormData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-account-type">Account Type</Label>
                <Select
                  value={linkFormData.accountType}
                  onValueChange={(value) => setLinkFormData({ ...linkFormData, accountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google-ads">Google Ads Account</SelectItem>
                    <SelectItem value="meta-ads">Meta Ads Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="link-account-ids">Add Account IDs</Label>
                <Textarea
                  id="link-account-ids"
                  placeholder="Enter account IDs (one per line or comma-separated)"
                  rows={4}
                  value={linkFormData.accountIds}
                  onChange={(e) => setLinkFormData({ ...linkFormData, accountIds: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Enter multiple account IDs separated by commas or new lines
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate("/accounts")}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary-hover">
                  Link Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
