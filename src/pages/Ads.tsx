import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ads = [
  {
    id: "1",
    name: "Winter SUV Special",
    adGroup: "SUV Models - Winter",
    status: "Paused",
    adType: "Responsive Search Ad",
  },
  {
    id: "2",
    name: "Sedan Promo",
    adGroup: "Sedan Specials",
    status: "In Review",
    adType: "Responsive Display Ad",
  },
  {
    id: "3",
    name: "Glass Repair Emergency",
    adGroup: "Glass Repair - Emergency",
    status: "Campaign is paused",
    adType: "Responsive Search Ad",
  },
];

export default function Ads() {
  const navigate = useNavigate();
  const [filterCampaign, setFilterCampaign] = useState("");
  const [filterAdGroup, setFilterAdGroup] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all ads</p>
        </div>
        <Button onClick={() => navigate("/google-ads/ads/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad
        </Button>
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Select campaign" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="brand-awareness">Brand Awareness Q1</SelectItem>
                  <SelectItem value="holiday-special">Holiday Special</SelectItem>
                  <SelectItem value="new-year-promo">New Year Promo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adGroup">Ad Group</Label>
              <Select value={filterAdGroup} onValueChange={setFilterAdGroup}>
                <SelectTrigger id="adGroup">
                  <SelectValue placeholder="Select ad group" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="all">All Ad Groups</SelectItem>
                  <SelectItem value="suv-winter">SUV Models - Winter</SelectItem>
                  <SelectItem value="sedan-specials">Sedan Specials</SelectItem>
                  <SelectItem value="glass-repair">Glass Repair - Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
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
                <TableHead>Ad Name</TableHead>
                <TableHead>Ad Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ad Type</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.name}</TableCell>
                  <TableCell>{ad.adGroup}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ad.adType}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
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
