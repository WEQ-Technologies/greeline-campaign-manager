import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddAssetDialog } from "@/components/assets/AddAssetDialog";
import { useState } from "react";

const assets = [
  {
    id: "1",
    asset: "Winter Sale Headlines",
    assetType: "Headline",
    addedTo: "Brand Awareness Q1",
    level: "Campaign",
    status: "Active",
  },
  {
    id: "2",
    asset: "Extended Product Descriptions",
    assetType: "Long headline",
    addedTo: "Holiday Special",
    level: "Ad",
    status: "Active",
  },
  {
    id: "3",
    asset: "Service Descriptions",
    assetType: "Description",
    addedTo: "New Year Promo",
    level: "Campaign",
    status: "Deactive",
  },
  {
    id: "4",
    asset: "Product Photography",
    assetType: "Images",
    addedTo: "Brand Awareness Q1",
    level: "Ad",
    status: "Active",
  },
  {
    id: "5",
    asset: "Product Demo Videos",
    assetType: "Videos",
    addedTo: "Holiday Special",
    level: "Campaign",
    status: "Active",
  },
];

export default function Assets() {
  const navigate = useNavigate();
  const [filterDateRange, setFilterDateRange] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all creative assets</p>
        </div>
        <AddAssetDialog />
      </div>

      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Input
                id="dateRange"
                type="date"
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-popover z-50">
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Deactive">Deactive</SelectItem>
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
                <TableHead>Asset</TableHead>
                <TableHead>Asset Type</TableHead>
                <TableHead>Added to (Campaign Name)</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets
                .filter(asset => 
                  (!filterStatus || asset.status === filterStatus)
                )
                .map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.asset}</TableCell>
                    <TableCell>{asset.assetType}</TableCell>
                    <TableCell>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-primary hover:underline"
                        onClick={() => navigate('/google-ads/campaigns')}
                      >
                        {asset.addedTo}
                      </Button>
                    </TableCell>
                    <TableCell>{asset.level}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-popover z-50" align="end">
                          <DropdownMenuItem>Remove</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>
                            Update Status (Status: {asset.status})
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
