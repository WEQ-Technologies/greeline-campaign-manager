import { useState } from "react";
import { Plus, MoreVertical, CheckCircle2, XCircle } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Tech Startup Inc",
    status: "active",
    campaignsCount: 3,
    adCount: 8,
    totalBudget: "$5,000",
    percentSpent: 85,
    connections: {
      google: true,
      facebook: true,
    },
  },
  {
    id: 2,
    name: "Nations Auto Glass",
    status: "active",
    campaignsCount: 2,
    adCount: 5,
    totalBudget: "$2,500",
    percentSpent: 73,
    connections: {
      google: true,
      facebook: false,
    },
  },
  {
    id: 3,
    name: "VW Heavy Up",
    status: "deactive",
    campaignsCount: 1,
    adCount: 3,
    totalBudget: "$1,200",
    percentSpent: 71,
    connections: {
      google: true,
      facebook: false,
    },
  },
  {
    id: 4,
    name: "Volkswagen",
    status: "deactive",
    campaignsCount: 0,
    adCount: 0,
    totalBudget: "$0",
    percentSpent: 0,
    connections: {
      google: false,
      facebook: false,
    },
  },
];

export default function Clients() {
  const navigate = useNavigate();
  const [clientStatus, setClientStatus] = useState<Record<number, string>>(
    Object.fromEntries(clients.map((c) => [c.id, c.status]))
  );

  const toggleStatus = (id: number) => {
    setClientStatus((prev) => ({
      ...prev,
      [id]: prev[id] === "active" ? "deactive" : "active",
    }));
  };

  return (
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
                <TableHead>Status</TableHead>
                <TableHead>Campaigns Count</TableHead>
                <TableHead>Ad Count</TableHead>
                <TableHead>Total Budget</TableHead>
                <TableHead>% Spent</TableHead>
                <TableHead>Connections</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={clientStatus[client.id] === "active" ? "default" : "secondary"}
                    >
                      {clientStatus[client.id]}
                    </Badge>
                  </TableCell>
                  <TableCell>{client.campaignsCount}</TableCell>
                  <TableCell>{client.adCount}</TableCell>
                  <TableCell>{client.totalBudget}</TableCell>
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
                    <div className="flex gap-2">
                      {client.connections.google ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-xs">Google</span>
                      {client.connections.facebook ? (
                        <CheckCircle2 className="w-4 h-4 text-success ml-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-muted-foreground ml-2" />
                      )}
                      <span className="text-xs">Facebook</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(client.id)}>
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/clients/${client.id}/edit`)}>
                          Edit Client
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Client
                        </DropdownMenuItem>
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
  );
}
