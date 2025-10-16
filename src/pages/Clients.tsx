import { Plus, MoreVertical, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const clients = [
  {
    id: 1,
    name: "Tech Startup Inc",
    status: "active",
    campaigns: 3,
    spend: "$4,250",
    connected: true,
  },
  {
    id: 2,
    name: "Local Bakery",
    status: "active",
    campaigns: 2,
    spend: "$1,820",
    connected: true,
  },
  {
    id: 3,
    name: "Fitness Center",
    status: "paused",
    campaigns: 1,
    spend: "$850",
    connected: true,
  },
  {
    id: 4,
    name: "Restaurant Chain",
    status: "pending",
    campaigns: 0,
    spend: "$0",
    connected: false,
  },
];

export default function Clients() {
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
                    {client.connected ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {client.connected ? "Connected" : "Pending"}
                    </span>
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
                    <DropdownMenuItem className="text-destructive">
                      Remove Client
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Campaigns</span>
                <span className="text-sm font-medium">{client.campaigns}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spend</span>
                <span className="text-sm font-medium">{client.spend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
