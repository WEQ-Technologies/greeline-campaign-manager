import { MoreVertical, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ModuleSyncPanel, SyncStatusBadge, SyncErrorBanner } from "@/components/sync";
import { useSync } from "@/hooks/use-sync";

const adGroups = [
  {
    id: "1",
    name: "SUV Models - Winter",
    status: "Paused",
    adGroupType: "Standard",
  },
  {
    id: "2",
    name: "Sedan Specials",
    status: "In Review",
    adGroupType: "Dynamic",
  },
  {
    id: "3",
    name: "Glass Repair - Emergency",
    status: "Campaign is paused",
    adGroupType: "Standard",
  },
];

export default function AdGroups() {
  const navigate = useNavigate();
  const [filterCampaign, setFilterCampaign] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterOpen, setFilterOpen] = useState(false);

  const { globalLock, modules } = useSync();
  const isModuleLocked = globalLock || modules["ad-groups"].status === "syncing";

  return (
    <div className="p-6 space-y-6">
      {/* Sync Error Banner */}
      <SyncErrorBanner module="ad-groups" />

      {/* Module Sync Panel */}
      <ModuleSyncPanel module="ad-groups" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ad Groups</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all ad groups</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setFilterOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setFilterOpen(false)}>
                    Apply
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={() => navigate("/google-ads/ad-groups/new")}>
            <Plus className="w-4 h-4 mr-2" />
            Create Ad Group
          </Button>
        </div>
      </div>

      {/* List View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">List View</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Group Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ad Group Type</TableHead>
                <TableHead>Sync Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adGroups.map((group) => (
                <TableRow key={group.id} className={isModuleLocked ? "opacity-60 pointer-events-none" : ""}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{group.adGroupType}</TableCell>
                  <TableCell>
                    <SyncStatusBadge itemId={`adgroup-${group.id}`} module="ad-groups" />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={isModuleLocked}>
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
