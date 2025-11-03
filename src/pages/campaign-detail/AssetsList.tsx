import { Plus, Edit, Eye, Image as ImageIcon, Video, Type, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const assets = [
  {
    id: "1",
    type: "Image",
    name: "hero-banner.jpg",
    campaign: "Brand Awareness Q1",
    adGroup: "SUV Models - Winter",
    status: "active",
    addedDate: "2025-01-15",
  },
  {
    id: "2",
    type: "Video",
    name: "product-demo.mp4",
    campaign: "Brand Awareness Q1",
    adGroup: "Sedan Specials",
    status: "active",
    addedDate: "2025-01-16",
  },
  {
    id: "3",
    type: "Headline",
    name: "Winter Sale - Up to 30% Off",
    campaign: "Brand Awareness Q1",
    adGroup: "SUV Models - Winter",
    status: "active",
    addedDate: "2025-01-15",
  },
  {
    id: "4",
    type: "Description",
    name: "Experience luxury driving this winter...",
    campaign: "Brand Awareness Q1",
    adGroup: "Sedan Specials",
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
    case "Description":
      return <FileText className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
}

export default function AssetsList() {
  const navigate = useNavigate();
  const { id: campaignId } = useParams();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets</h1>
          <p className="text-muted-foreground mt-1">Manage creative assets for this campaign</p>
        </div>
        <Button onClick={() => navigate(`/campaigns/${campaignId}/assets/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Asset
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Ad Group</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>{asset.campaign}</TableCell>
                  <TableCell>{asset.adGroup}</TableCell>
                  <TableCell>
                    <Badge variant={asset.status === "active" ? "default" : "secondary"}>
                      {asset.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.addedDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => navigate(`/campaigns/${campaignId}/assets/${asset.id}/edit`)}
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
