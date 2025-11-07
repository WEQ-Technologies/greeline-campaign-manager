import { Plus, MoreVertical, Image as ImageIcon, Video, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const assets = [
  {
    id: "1",
    type: "Image",
    name: "hero-banner.jpg",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    adGroup: "SUV Models - Winter",
    status: "active",
    addedDate: "2025-01-15",
  },
  {
    id: "2",
    type: "Video",
    name: "product-demo.mp4",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    adGroup: "Sedan Specials",
    status: "active",
    addedDate: "2025-01-16",
  },
  {
    id: "3",
    type: "Headline",
    name: "Winter Sale - Up to 30% Off",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    adGroup: "Glass Repair - Emergency",
    status: "paused",
    addedDate: "2025-01-17",
  },
];

function getAssetIcon(type: string) {
  switch (type) {
    case "Image":
      return <ImageIcon className="w-4 h-4" />;
    case "Video":
      return <Video className="w-4 h-4" />;
    case "Headline":
      return <Type className="w-4 h-4" />;
    default:
      return <Type className="w-4 h-4" />;
  }
}

export default function Assets() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all creative assets</p>
        </div>
        <Button onClick={() => navigate("/assets/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
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
              <Label>Date Range</Label>
              <Input type="date" />
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
                <TableHead>Asset Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Ad Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getAssetIcon(asset.type)}
                      <span className="font-medium">{asset.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{asset.name}</TableCell>
                  <TableCell>{asset.client}</TableCell>
                  <TableCell>{asset.campaign}</TableCell>
                  <TableCell>{asset.adGroup}</TableCell>
                  <TableCell>
                    <Badge variant={asset.status === "active" ? "default" : "secondary"}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.addedDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                        <DropdownMenuItem>Remove Asset</DropdownMenuItem>
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
