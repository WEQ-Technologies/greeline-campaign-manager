import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const audiences = [
  {
    id: "1",
    name: "Tech Enthusiasts 25-45",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    type: "Interest-based",
    size: "~500K",
    status: "active",
  },
  {
    id: "2",
    name: "Auto Owners - Premium",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    type: "Custom Intent",
    size: "~250K",
    status: "active",
  },
  {
    id: "3",
    name: "Local Glass Service Seekers",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    type: "In-Market",
    size: "~180K",
    status: "paused",
  },
];

export default function Audience() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audience</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all audience segments</p>
        </div>
        <Button onClick={() => navigate("/audience/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Audience
        </Button>
      </div>

      {/* Selection Layer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Selection Layer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Clients</SelectItem>
                  <SelectItem value="tech">Tech Startup Inc</SelectItem>
                  <SelectItem value="nations">Nations Auto Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Campaign</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="brand">Brand Awareness Q1</SelectItem>
                  <SelectItem value="holiday">Holiday Special</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ad Group</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select ad group" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Ad Groups</SelectItem>
                  <SelectItem value="suv">SUV Models - Winter</SelectItem>
                  <SelectItem value="sedan">Sedan Specials</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Accounts</SelectItem>
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Audience Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="interest">Interest-based</SelectItem>
                  <SelectItem value="intent">Custom Intent</SelectItem>
                  <SelectItem value="market">In-Market</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">List View</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Audience Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Estimated Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {audiences.map((audience) => (
                <TableRow key={audience.id}>
                  <TableCell className="font-medium">{audience.name}</TableCell>
                  <TableCell>{audience.client}</TableCell>
                  <TableCell>{audience.campaign}</TableCell>
                  <TableCell>{audience.type}</TableCell>
                  <TableCell>{audience.size}</TableCell>
                  <TableCell>
                    <Badge variant={audience.status === "active" ? "default" : "secondary"}>
                      {audience.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Audience</DropdownMenuItem>
                        <DropdownMenuItem>Remove from Campaign</DropdownMenuItem>
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
  );
}
