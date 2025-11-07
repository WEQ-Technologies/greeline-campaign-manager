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

const locations = [
  {
    id: "1",
    location: "New York, NY",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    targetType: "City",
    bidAdjustment: "+20%",
    status: "active",
    impressions: 8450,
    conversions: 145,
  },
  {
    id: "2",
    location: "Los Angeles County, CA",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    targetType: "County",
    bidAdjustment: "+15%",
    status: "active",
    impressions: 6230,
    conversions: 98,
  },
  {
    id: "3",
    location: "Chicago Metro Area",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    targetType: "Metro Area",
    bidAdjustment: "-10%",
    status: "paused",
    impressions: 4120,
    conversions: 67,
  },
];

export default function Location() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Location</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor location targeting</p>
        </div>
        <Button onClick={() => navigate("/location/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Location
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
              <Label>Target Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                  <SelectItem value="county">County</SelectItem>
                  <SelectItem value="metro">Metro Area</SelectItem>
                  <SelectItem value="radius">Radius</SelectItem>
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
                <TableHead>Location</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Target Type</TableHead>
                <TableHead>Bid Adjustment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">{location.location}</TableCell>
                  <TableCell>{location.client}</TableCell>
                  <TableCell>{location.campaign}</TableCell>
                  <TableCell>{location.targetType}</TableCell>
                  <TableCell>{location.bidAdjustment}</TableCell>
                  <TableCell>
                    <Badge variant={location.status === "active" ? "default" : "secondary"}>
                      {location.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{location.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{location.conversions}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>Edit Bid Adjustment</DropdownMenuItem>
                        <DropdownMenuItem>Exclude Location</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
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
