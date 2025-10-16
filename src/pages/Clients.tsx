import { useState } from "react";
import { Plus, MoreVertical, CheckCircle2, AlertCircle, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientConnectionDialog } from "@/components/clients/ClientConnectionDialog";
import { Separator } from "@/components/ui/separator";

const clients = [
  {
    id: 1,
    name: "Tech Startup Inc",
    status: "active",
    campaigns: 3,
    spend: "$4,250",
    connections: {
      googleMyBusiness: "https://google.com/maps/123",
      googleAds: "123-456-7890",
      googleAnalytics: "G-XXXXXXXXXX",
      facebookPage: "https://facebook.com/techstartup",
      facebookPixel: "123456789012345",
      youtubeChannel: "https://youtube.com/@techstartup",
    },
  },
  {
    id: 2,
    name: "Local Bakery",
    status: "active",
    campaigns: 2,
    spend: "$1,820",
    connections: {
      googleMyBusiness: "https://google.com/maps/456",
      googleAds: "234-567-8901",
      googleAnalytics: "UA-123456789-1",
      facebookPage: "https://facebook.com/localbakery",
      facebookPixel: "",
      youtubeChannel: "",
    },
  },
  {
    id: 3,
    name: "Fitness Center",
    status: "paused",
    campaigns: 1,
    spend: "$850",
    connections: {
      googleMyBusiness: "https://google.com/maps/789",
      googleAds: "",
      googleAnalytics: "",
      facebookPage: "",
      facebookPixel: "",
      youtubeChannel: "",
    },
  },
  {
    id: 4,
    name: "Restaurant Chain",
    status: "pending",
    campaigns: 0,
    spend: "$0",
    connections: {
      googleMyBusiness: "",
      googleAds: "",
      googleAnalytics: "",
      facebookPage: "",
      facebookPixel: "",
      youtubeChannel: "",
    },
  },
];

export default function Clients() {
  const [connectionDialogOpen, setConnectionDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof clients[0] | null>(null);

  const getConnectedCount = (connections: typeof clients[0]["connections"]) => {
    return Object.values(connections).filter((val) => val !== "").length;
  };

  const handleManageConnections = (client: typeof clients[0]) => {
    setSelectedClient(client);
    setConnectionDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">Manage your client accounts</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        client.status === "active"
                          ? "default"
                          : client.status === "paused"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {client.status}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Client</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleManageConnections(client)}
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Manage Connections
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Remove Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Campaigns</span>
                <span className="text-sm font-medium">{client.campaigns}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spend</span>
                <span className="text-sm font-medium">{client.spend}</span>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Integrations</span>
                  <span className="text-xs text-muted-foreground">
                    {getConnectedCount(client.connections)}/6 connected
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                    {client.connections.googleMyBusiness ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-center">GMB</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                    {client.connections.googleAds ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-center">Ads</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                    {client.connections.googleAnalytics ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-center">GA</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                    {client.connections.facebookPage ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-center">FB</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                    {client.connections.facebookPixel ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-center">Pixel</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-muted/50">
                    {client.connections.youtubeChannel ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-center">YT</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => handleManageConnections(client)}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Manage Connections
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ClientConnectionDialog
        open={connectionDialogOpen}
        onOpenChange={setConnectionDialogOpen}
        clientId={selectedClient?.id.toString()}
        clientName={selectedClient?.name}
        existingConnections={selectedClient?.connections}
      />
    </div>
  );
}
