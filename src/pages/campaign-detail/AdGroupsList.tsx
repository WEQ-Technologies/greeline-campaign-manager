import { Plus, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adGroups = [
  {
    id: "1",
    name: "SUV Models - Winter",
    campaignName: "Brand Awareness Q1",
    goal: "Sales",
    status: "active",
    biddingType: "Conversions",
    createdDate: "2025-01-15",
  },
  {
    id: "2",
    name: "Sedan Specials",
    campaignName: "Brand Awareness Q1",
    goal: "Leads",
    status: "active",
    biddingType: "Conversion Value",
    createdDate: "2025-01-18",
  },
  {
    id: "3",
    name: "Glass Repair - Emergency",
    campaignName: "Holiday Special",
    goal: "Sales",
    status: "paused",
    biddingType: "Conversions",
    createdDate: "2025-01-10",
  },
];

export default function AdGroupsList() {
  const navigate = useNavigate();
  const { id: campaignId } = useParams();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ad Groups</h1>
          <p className="text-muted-foreground mt-1">Manage ad groups for this campaign</p>
        </div>
        <Button onClick={() => navigate(`/campaigns/${campaignId}/ad-groups/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Ad Group
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad Group Name</TableHead>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Goal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bidding Type</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adGroups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>{group.campaignName}</TableCell>
                  <TableCell>{group.goal}</TableCell>
                  <TableCell>
                    <Badge variant={group.status === "active" ? "default" : "secondary"}>
                      {group.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{group.biddingType}</TableCell>
                  <TableCell>{group.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigate(`/campaigns/${campaignId}/ad-groups/${group.id}/edit`)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
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
