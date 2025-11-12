import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddAssetDialog({ open, onOpenChange, onSuccess }: AddAssetDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("headline");

  const handleSave = () => {
    toast({ 
      title: "Success", 
      description: "Asset created successfully" 
    });
    onOpenChange(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setActiveTab("headline");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Asset</DialogTitle>
          <p className="text-sm text-muted-foreground">Create creative assets for your campaigns</p>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="font-semibold">Asset Type</h3>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="inline-flex w-auto min-w-full">
                  <TabsTrigger value="headline">Headline</TabsTrigger>
                  <TabsTrigger value="long-headline">Long Headline</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="sitelinks">Sitelinks</TabsTrigger>
                  <TabsTrigger value="callouts">Callouts</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="headline" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="headlineText">Heading (up to 30 characters max)</Label>
                  <Input
                    id="headlineText"
                    maxLength={30}
                    placeholder="Enter headline"
                  />
                </div>
              </TabsContent>

              <TabsContent value="long-headline" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="longHeadlineText">Long headline (up to 90 characters max)</Label>
                  <Input
                    id="longHeadlineText"
                    maxLength={90}
                    placeholder="Enter long headline"
                  />
                </div>
              </TabsContent>

              <TabsContent value="description" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="descriptionText">Description (up to 90 characters max)</Label>
                  <Textarea
                    id="descriptionText"
                    maxLength={90}
                    placeholder="Enter description"
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Add Images (Max file up to 5 images)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop images here, or click to browse
                    </p>
                    <Button variant="outline" type="button">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="videos" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Add Videos (Max file up to 5 videos)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop videos here, or click to browse
                    </p>
                    <Button variant="outline" type="button">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sitelinks" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="sitelinkText">Sitelink text</Label>
                  <Input
                    id="sitelinkText"
                    placeholder="Enter sitelink text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sitelinkDesc1">Description line 1</Label>
                  <Input
                    id="sitelinkDesc1"
                    placeholder="Enter description line 1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sitelinkDesc2">Description line 2</Label>
                  <Input
                    id="sitelinkDesc2"
                    placeholder="Enter description line 2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sitelinkFinalUrl">Final URL</Label>
                  <Input
                    id="sitelinkFinalUrl"
                    placeholder="https://example.com"
                  />
                </div>
              </TabsContent>

              <TabsContent value="callouts" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="calloutText">Callout Text</Label>
                  <Input
                    id="calloutText"
                    placeholder="Enter callout text (up to 25 characters max)"
                    maxLength={25}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Assets Scheduling</Label>
                  <Input type="date" placeholder="Start Date" className="mb-2" />
                  <Input type="date" placeholder="End Date" />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
