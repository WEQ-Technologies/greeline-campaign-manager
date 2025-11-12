import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Upload } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddAssetDialog({ open, onOpenChange, onSuccess }: AddAssetDialogProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("logos");
  
  const [logos, setLogos] = useState<string[]>([]);
  const [headlines, setHeadlines] = useState<string[]>([""]);
  const [longHeadlines, setLongHeadlines] = useState<string[]>([""]);
  const [descriptions, setDescriptions] = useState<string[]>([""]);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([""]);
  const [priceAssets, setPriceAssets] = useState<Array<{ type: string; header: string; amount: string; description: string }>>([]);
  const [callouts, setCallouts] = useState<string[]>([""]);
  const [structuredSnippets, setStructuredSnippets] = useState<string[]>([""]);

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
                  <TabsTrigger value="logos">Brand Logos</TabsTrigger>
                  <TabsTrigger value="headline">Headlines</TabsTrigger>
                  <TabsTrigger value="long-headline">Long Headlines</TabsTrigger>
                  <TabsTrigger value="description">Descriptions</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="prices">Price Assets</TabsTrigger>
                  <TabsTrigger value="callouts">Callouts</TabsTrigger>
                  <TabsTrigger value="snippets">Snippets</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="logos" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Brand Logos (up to 5)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logos.length < 5 && setLogos([...logos, ""])}
                    disabled={logos.length >= 5}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Logo
                  </Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload logo files (PNG, SVG recommended)
                  </p>
                  <Button variant="outline" type="button">
                    Browse Files
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{logos.length}/5 logos</p>
              </TabsContent>

              <TabsContent value="headline" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Headlines (up to 15, 30 characters max each)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => headlines.length < 15 && setHeadlines([...headlines, ""])}
                    disabled={headlines.length >= 15}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Headline
                  </Button>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {headlines.map((headline, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          maxLength={30}
                          placeholder={`Headline ${index + 1}`}
                          value={headline}
                          onChange={(e) => {
                            const updated = [...headlines];
                            updated[index] = e.target.value;
                            setHeadlines(updated);
                          }}
                        />
                        <p className="text-xs text-muted-foreground">{headline.length}/30</p>
                      </div>
                      {headlines.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setHeadlines(headlines.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{headlines.length}/15 headlines</p>
              </TabsContent>

              <TabsContent value="long-headline" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Long Headlines (up to 5, 90 characters max each)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => longHeadlines.length < 5 && setLongHeadlines([...longHeadlines, ""])}
                    disabled={longHeadlines.length >= 5}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Long Headline
                  </Button>
                </div>
                <div className="space-y-3">
                  {longHeadlines.map((headline, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          maxLength={90}
                          placeholder={`Long headline ${index + 1}`}
                          value={headline}
                          onChange={(e) => {
                            const updated = [...longHeadlines];
                            updated[index] = e.target.value;
                            setLongHeadlines(updated);
                          }}
                        />
                        <p className="text-xs text-muted-foreground">{headline.length}/90</p>
                      </div>
                      {longHeadlines.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setLongHeadlines(longHeadlines.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{longHeadlines.length}/5 long headlines</p>
              </TabsContent>

              <TabsContent value="description" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Descriptions (up to 5, 90 characters max each)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => descriptions.length < 5 && setDescriptions([...descriptions, ""])}
                    disabled={descriptions.length >= 5}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Description
                  </Button>
                </div>
                <div className="space-y-3">
                  {descriptions.map((description, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Textarea
                          maxLength={90}
                          placeholder={`Description ${index + 1}`}
                          value={description}
                          onChange={(e) => {
                            const updated = [...descriptions];
                            updated[index] = e.target.value;
                            setDescriptions(updated);
                          }}
                          rows={2}
                        />
                        <p className="text-xs text-muted-foreground">{description.length}/90</p>
                      </div>
                      {descriptions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDescriptions(descriptions.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{descriptions.length}/5 descriptions</p>
              </TabsContent>

              <TabsContent value="images" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Images (up to 20)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => images.length < 20 && setImages([...images, ""])}
                    disabled={images.length >= 20}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload image files (JPG, PNG, max 5MB each)
                  </p>
                  <Button variant="outline" type="button">
                    Browse Files
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{images.length}/20 images</p>
              </TabsContent>

              <TabsContent value="videos" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Videos (up to 5)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => videos.length < 5 && setVideos([...videos, ""])}
                    disabled={videos.length >= 5}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </div>
                <div className="space-y-3">
                  {videos.map((video, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1">
                        <Input
                          placeholder="YouTube URL or upload video"
                          value={video}
                          onChange={(e) => {
                            const updated = [...videos];
                            updated[index] = e.target.value;
                            setVideos(updated);
                          }}
                        />
                      </div>
                      {videos.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mt-4">
                  <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Or upload video files (MP4, max 100MB)</p>
                  <Button variant="outline" type="button" size="sm">
                    Browse Files
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{videos.length}/5 videos</p>
              </TabsContent>

              <TabsContent value="prices" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Price Assets (up to 8)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => priceAssets.length < 8 && setPriceAssets([...priceAssets, { type: "", header: "", amount: "", description: "" }])}
                    disabled={priceAssets.length >= 8}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Price
                  </Button>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {priceAssets.map((price, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Price {index + 1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setPriceAssets(priceAssets.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Type</Label>
                          <Select
                            value={price.type}
                            onValueChange={(value) => {
                              const updated = [...priceAssets];
                              updated[index].type = value;
                              setPriceAssets(updated);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="product">Product</SelectItem>
                              <SelectItem value="service">Service</SelectItem>
                              <SelectItem value="subscription">Subscription</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Amount</Label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="99.99"
                            value={price.amount}
                            onChange={(e) => {
                              const updated = [...priceAssets];
                              updated[index].amount = e.target.value;
                              setPriceAssets(updated);
                            }}
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <Label className="text-xs">Header</Label>
                          <Input
                            placeholder="e.g., Premium Plan"
                            value={price.header}
                            onChange={(e) => {
                              const updated = [...priceAssets];
                              updated[index].header = e.target.value;
                              setPriceAssets(updated);
                            }}
                          />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <Label className="text-xs">Description</Label>
                          <Textarea
                            placeholder="Brief description"
                            value={price.description}
                            onChange={(e) => {
                              const updated = [...priceAssets];
                              updated[index].description = e.target.value;
                              setPriceAssets(updated);
                            }}
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{priceAssets.length}/8 price assets</p>
              </TabsContent>

              <TabsContent value="callouts" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Callouts (up to 20, 25 characters max each)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => callouts.length < 20 && setCallouts([...callouts, ""])}
                    disabled={callouts.length >= 20}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Callout
                  </Button>
                </div>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {callouts.map((callout, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          maxLength={25}
                          placeholder={`Callout ${index + 1}`}
                          value={callout}
                          onChange={(e) => {
                            const updated = [...callouts];
                            updated[index] = e.target.value;
                            setCallouts(updated);
                          }}
                        />
                        <p className="text-xs text-muted-foreground">{callout.length}/25</p>
                      </div>
                      {callouts.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setCallouts(callouts.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{callouts.length}/20 callouts</p>
              </TabsContent>

              <TabsContent value="snippets" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <Label>Structured Snippet Values (up to 10, 25 characters max each)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => structuredSnippets.length < 10 && setStructuredSnippets([...structuredSnippets, ""])}
                    disabled={structuredSnippets.length >= 10}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Value
                  </Button>
                </div>
                <div className="space-y-3">
                  {structuredSnippets.map((snippet, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 space-y-1">
                        <Input
                          maxLength={25}
                          placeholder={`Value ${index + 1}`}
                          value={snippet}
                          onChange={(e) => {
                            const updated = [...structuredSnippets];
                            updated[index] = e.target.value;
                            setStructuredSnippets(updated);
                          }}
                        />
                        <p className="text-xs text-muted-foreground">{snippet.length}/25</p>
                      </div>
                      {structuredSnippets.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setStructuredSnippets(structuredSnippets.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">{structuredSnippets.length}/10 values</p>
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
