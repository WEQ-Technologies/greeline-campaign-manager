import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AddAdDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    campaign: "",
    adGroup: "",
    finalUrl: "",
    displayPath: "",
  });

  const handleSave = () => {
    toast({ title: "Success", description: "Ad created successfully" });
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Ad</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign</Label>
            <Select value={formData.campaign} onValueChange={(value) => setFormData({ ...formData, campaign: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign1">Brand Awareness Q1</SelectItem>
                <SelectItem value="campaign2">Holiday Special</SelectItem>
                <SelectItem value="campaign3">New Year Promo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="adGroup">Ad Group</Label>
            <Select value={formData.adGroup} onValueChange={(value) => setFormData({ ...formData, adGroup: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select ad group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="adgroup1">SUV Models - Winter</SelectItem>
                <SelectItem value="adgroup2">Sedan Specials</SelectItem>
                <SelectItem value="adgroup3">Glass Repair - Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Where will people go when they click your ad?</Label>
            <Label htmlFor="finalUrl" className="text-sm font-normal text-muted-foreground">Final URL (required)</Label>
            <Input
              id="finalUrl"
              value={formData.finalUrl}
              onChange={(e) => setFormData({ ...formData, finalUrl: e.target.value })}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="displayPath">Display path</Label>
            <Input
              id="displayPath"
              value={formData.displayPath}
              onChange={(e) => setFormData({ ...formData, displayPath: e.target.value })}
              placeholder="Enter display path"
            />
          </div>

          <div className="space-y-2">
            <Label>Assets</Label>
            <p className="text-sm text-muted-foreground">Show same assets section here</p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
