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
    type: "Asset Group name",
    name: "Winter Campaign Assets",
  },
  {
    id: "2",
    type: "Business Names",
    name: "Tech Solutions Inc",
  },
  {
    id: "3",
    type: "Brand Logos",
    name: "Company Logo Set",
  },
  {
    id: "4",
    type: "Marketing Images",
    name: "Product Photography",
  },
  {
    id: "5",
    type: "Heading",
    name: "Winter Sale Headlines",
  },
  {
    id: "6",
    type: "Long headline",
    name: "Extended Product Descriptions",
  },
  {
    id: "7",
    type: "Description",
    name: "Service Descriptions",
  },
  {
    id: "8",
    type: "Add videos",
    name: "Product Demo Videos",
  },
];

export default function Assets() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [filterName, setFilterName] = useState("");

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
              <Label htmlFor="assetType">Asset Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="assetType">
                  <SelectValue placeholder="Select asset type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group">Asset Group name</SelectItem>
                  <SelectItem value="business">Business Names</SelectItem>
                  <SelectItem value="logo">Brand Logos</SelectItem>
                  <SelectItem value="images">Marketing Images</SelectItem>
                  <SelectItem value="heading">Heading</SelectItem>
                  <SelectItem value="long-heading">Long headline</SelectItem>
                  <SelectItem value="description">Description</SelectItem>
                  <SelectItem value="videos">Add videos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="assetName">Name</Label>
              <Input
                id="assetName"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Search by name"
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
                <TableHead>Asset Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets
                .filter(asset => 
                  (!filterType || asset.type === filterType) &&
                  (!filterName || asset.name.toLowerCase().includes(filterName.toLowerCase()))
                )
                .map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.type}</TableCell>
                    <TableCell>{asset.name}</TableCell>
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
