import { Plus, MoreVertical, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { ModuleSyncPanel, SyncStatusBadge, SyncErrorBanner } from "@/components/sync";
import { useSync } from "@/hooks/use-sync";

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
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterOpen, setFilterOpen] = useState(false);
  const [createAudienceOpen, setCreateAudienceOpen] = useState(false);

  const { globalLock, modules, syncModule } = useSync();
  const isModuleLocked = globalLock || modules.audience.status === "syncing";

  return (
    <div className="p-6 space-y-6">
      <SyncErrorBanner module="audience" />
      <ModuleSyncPanel module="audience" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audience</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor all audience segments</p>
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
          <Button 
            variant="outline"
            onClick={() => toast({ title: "Syncing audiences", description: "Fetching latest audience data from Google Ads" })}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Audience
          </Button>
          <Dialog open={createAudienceOpen} onOpenChange={setCreateAudienceOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Audience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Audience</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please use the below link for Audience creation
                </p>
                <Button 
                  className="w-full" 
                  onClick={() => window.open('https://ads.google.com/aw/audiences', '_blank')}
                >
                  Open Google Ads
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
