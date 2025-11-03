import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const historyData = [
  {
    id: "1",
    date: "2025-01-20 14:30:00",
    user: "john@example.com",
    module: "Campaign",
    fieldChanged: "Budget",
    oldValue: "$1,200",
    newValue: "$1,500",
  },
  {
    id: "2",
    date: "2025-01-19 10:15:00",
    user: "sarah@example.com",
    module: "Ad Group",
    fieldChanged: "Status",
    oldValue: "Paused",
    newValue: "Active",
  },
  {
    id: "3",
    date: "2025-01-18 16:45:00",
    user: "mike@example.com",
    module: "Asset",
    fieldChanged: "Headline",
    oldValue: "Winter Sale",
    newValue: "Winter Sale - Up to 30% Off",
  },
  {
    id: "4",
    date: "2025-01-17 09:20:00",
    user: "john@example.com",
    module: "Campaign",
    fieldChanged: "End Date",
    oldValue: "2025-02-28",
    newValue: "2025-03-31",
  },
  {
    id: "5",
    date: "2025-01-16 13:00:00",
    user: "sarah@example.com",
    module: "Ad Group",
    fieldChanged: "Bid Amount",
    oldValue: "$2.00",
    newValue: "$2.50",
  },
  {
    id: "6",
    date: "2025-01-15 11:30:00",
    user: "mike@example.com",
    module: "Asset",
    fieldChanged: "Image",
    oldValue: "hero-banner-old.jpg",
    newValue: "hero-banner-new.jpg",
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
        <p className="text-muted-foreground mt-1">Track all changes made to this campaign</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date / Time</TableHead>
                <TableHead>User</TableHead>
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
