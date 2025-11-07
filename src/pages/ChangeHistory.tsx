import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const historyData = [
  {
    id: "1",
    date: "2025-01-20 14:30:00",
    user: "john@weqtech.com",
    client: "Tech Startup Inc",
    campaign: "Brand Awareness Q1",
    module: "Campaign",
    fieldChanged: "Budget",
    oldValue: "$1,200",
    newValue: "$1,500",
  },
  {
    id: "2",
    date: "2025-01-19 10:15:00",
    user: "sarah@weqtech.com",
    client: "Nations Auto Glass",
    campaign: "Holiday Special",
    module: "Ad Group",
    fieldChanged: "Status",
    oldValue: "Paused",
    newValue: "Active",
  },
  {
    id: "3",
    date: "2025-01-18 16:45:00",
    user: "mike@weqtech.com",
    client: "VW Heavy Up",
    campaign: "New Year Promo",
    module: "Asset",
    fieldChanged: "Headline",
    oldValue: "Winter Sale",
    newValue: "Winter Sale - Up to 30% Off",
  },
];

function getModuleBadgeVariant(module: string) {
  switch (module) {
    case "Campaign":
      return "default";
    case "Ad Group":
      return "secondary";
    case "Asset":
      return "outline";
    default:
      return "secondary";
  }
}

export default function ChangeHistory() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Change History</h1>
        <p className="text-muted-foreground mt-1">Track all changes made across campaigns</p>
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
              <Label>Module</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select module" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="adgroup">Ad Group</SelectItem>
                  <SelectItem value="asset">Asset</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Change Log</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date / Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Field Changed</TableHead>
                <TableHead>Old Value</TableHead>
                <TableHead>New Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.user}</TableCell>
                  <TableCell>{record.client}</TableCell>
                  <TableCell>{record.campaign}</TableCell>
                  <TableCell>
                    <Badge variant={getModuleBadgeVariant(record.module)}>
                      {record.module}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.fieldChanged}</TableCell>
                  <TableCell className="text-muted-foreground">{record.oldValue}</TableCell>
                  <TableCell className="font-medium">{record.newValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
