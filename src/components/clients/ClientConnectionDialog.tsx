import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

interface ClientConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  clientId?: string;
  clientName?: string;
  existingConnections?: {
    googleMyBusiness: string;
    googleAds: string;
    googleAnalytics: string;
    facebookPage: string;
    facebookPixel: string;
    youtubeChannel: string;
  };
}

export function ClientConnectionDialog({
  open,
  onOpenChange,
  clientName = "New Client",
  existingConnections,
}: ClientConnectionDialogProps) {
  const [connections, setConnections] = useState({
    googleMyBusiness: existingConnections?.googleMyBusiness || "",
    googleAds: existingConnections?.googleAds || "",
    googleAnalytics: existingConnections?.googleAnalytics || "",
    facebookPage: existingConnections?.facebookPage || "",
    facebookPixel: existingConnections?.facebookPixel || "",
    youtubeChannel: existingConnections?.youtubeChannel || "",
  });

  const handleSave = () => {
    toast.success("Client connections updated successfully!");
    onOpenChange(false);
  };

  const validateUrl = (url: string) => {
    if (!url) return null;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getConnectionStatus = (value: string) => {
    const isValid = validateUrl(value);
    if (isValid === null) return null;
    return isValid;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect Integrations - {clientName}</DialogTitle>
          <DialogDescription>
            Link client accounts and tracking for campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Google My Business */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="gmb" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Google My Business Profile
              </Label>
              {connections.googleMyBusiness && (
                getConnectionStatus(connections.googleMyBusiness) ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="w-3 h-3" />
                    Invalid URL
                  </Badge>
                )
              )}
            </div>
            <Input
              id="gmb"
              placeholder="https://www.google.com/maps/place/..."
              value={connections.googleMyBusiness}
              onChange={(e) =>
                setConnections({ ...connections, googleMyBusiness: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your Google Business Profile URL or location ID
            </p>
          </div>

          {/* Google Ads */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="google-ads" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Google Ads Account ID
              </Label>
              {connections.googleAds && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Connected
                </Badge>
              )}
            </div>
            <Input
              id="google-ads"
              placeholder="123-456-7890"
              value={connections.googleAds}
              onChange={(e) =>
                setConnections({ ...connections, googleAds: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your Google Ads customer ID (10 digits)
            </p>
          </div>

          {/* Google Analytics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="ga" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Google Analytics Property ID
              </Label>
              {connections.googleAnalytics && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Connected
                </Badge>
              )}
            </div>
            <Input
              id="ga"
              placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
              value={connections.googleAnalytics}
              onChange={(e) =>
                setConnections({ ...connections, googleAnalytics: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your Google Analytics tracking ID or measurement ID
            </p>
          </div>

          {/* Facebook Page */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="fb-page" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Facebook Page URL
              </Label>
              {connections.facebookPage && (
                getConnectionStatus(connections.facebookPage) ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="w-3 h-3" />
                    Invalid URL
                  </Badge>
                )
              )}
            </div>
            <Input
              id="fb-page"
              placeholder="https://www.facebook.com/yourpage"
              value={connections.facebookPage}
              onChange={(e) =>
                setConnections({ ...connections, facebookPage: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your Facebook business page URL
            </p>
          </div>

          {/* Facebook Pixel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="fb-pixel" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Facebook Pixel ID
              </Label>
              {connections.facebookPixel && (
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Connected
                </Badge>
              )}
            </div>
            <Input
              id="fb-pixel"
              placeholder="XXXXXXXXXXXXXXX"
              value={connections.facebookPixel}
              onChange={(e) =>
                setConnections({ ...connections, facebookPixel: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your Facebook Pixel ID (15-16 digits)
            </p>
          </div>

          {/* YouTube Channel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="youtube" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                YouTube Channel URL
              </Label>
              {connections.youtubeChannel && (
                getConnectionStatus(connections.youtubeChannel) ? (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="gap-1">
                    <XCircle className="w-3 h-3" />
                    Invalid URL
                  </Badge>
                )
              )}
            </div>
            <Input
              id="youtube"
              placeholder="https://www.youtube.com/@channelname"
              value={connections.youtubeChannel}
              onChange={(e) =>
                setConnections({ ...connections, youtubeChannel: e.target.value })
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your YouTube channel URL
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary-hover">
            Save Connections
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
