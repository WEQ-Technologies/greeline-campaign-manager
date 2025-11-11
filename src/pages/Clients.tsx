import { useState } from "react";
import { Plus, MoreVertical, CheckCircle2, XCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Tech Startup Inc",
    adsAccountsStatus: "active",
    adsAccountCount: 2,
    campaignsCount: 3,
    totalBudgetAllocated: "$5,000",
    totalBudgetSpent: "$4,250",
    percentSpent: 85,
    googleAdsAccountCount: 1,
    fbAdsAccountCount: 1,
    connections: {
      google: true,
      facebook: true,
    },
  },
  {
    id: 2,
    name: "Nations Auto Glass",
    adsAccountsStatus: "active",
    adsAccountCount: 1,
    campaignsCount: 2,
    totalBudgetAllocated: "$2,500",
    totalBudgetSpent: "$1,825",
    percentSpent: 73,
    googleAdsAccountCount: 1,
    fbAdsAccountCount: 0,
    connections: {
      google: true,
      facebook: false,
    },
  },
  {
    id: 3,
    name: "VW Heavy Up",
    adsAccountsStatus: "deactive",
    adsAccountCount: 1,
    campaignsCount: 1,
    totalBudgetAllocated: "$1,200",
    totalBudgetSpent: "$852",
    percentSpent: 71,
    googleAdsAccountCount: 1,
    fbAdsAccountCount: 0,
    connections: {
      google: true,
      facebook: false,
    },
  },
  {
    id: 4,
    name: "Volkswagen",
    adsAccountsStatus: "deactive",
    adsAccountCount: 0,
    campaignsCount: 0,
    totalBudgetAllocated: "$0",
    totalBudgetSpent: "$0",
    percentSpent: 0,
    googleAdsAccountCount: 0,
    fbAdsAccountCount: 0,
    connections: {
      google: false,
      facebook: false,
    },
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [clientStatus, setClientStatus] = useState<Record<number, string>>(
    Object.fromEntries(clients.map((c) => [c.id, c.adsAccountsStatus]))
  );

  const toggleStatus = (id: number) => {
    setClientStatus((prev) => ({
      ...prev,
      [id]: prev[id] === "active" ? "deactive" : "active",
    }));
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Client Management</h1>
            <p className="text-muted-foreground mt-1">Manage your client accounts</p>
          </div>
          <Button 
            className="bg-primary hover:bg-primary-hover"
            onClick={() => navigate("/clients/new")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Ads Accounts Status</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Campaigns Count
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This includes both Google and Facebook campaigns</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      Total Budget Allocated
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Cumulative budget of all campaigns across platforms</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead>Total Budget Spent</TableHead>
                  <TableHead>% Spent</TableHead>
                  <TableHead>Connections</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant={client.adsAccountsStatus === "active" ? "default" : "secondary"}
                      >
                        {client.adsAccountsStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.campaignsCount}</TableCell>
                    <TableCell>{client.totalBudgetAllocated}</TableCell>
                    <TableCell>{client.totalBudgetSpent}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${client.percentSpent}%` }}
                          />
                        </div>
                        <span className="text-sm">{client.percentSpent}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {client.connections.google && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <span className="text-sm">Google ({client.googleAdsAccountCount})</span>
                          </div>
                        )}
                        {client.connections.facebook && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            <span className="text-sm">Facebook ({client.fbAdsAccountCount})</span>
                          </div>
                        )}
                        {!client.connections.google && !client.connections.facebook && (
                          <span className="text-sm text-muted-foreground">No connections</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover" align="end">
                          <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}`)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleStatus(client.id)}>
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}/edit`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
