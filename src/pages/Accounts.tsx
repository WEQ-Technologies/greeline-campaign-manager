import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const accounts = [
  {
    id: 1,
    name: "Account 1",
    budget: "$5,000",
    status: "active",
  },
  {
    id: 2,
    name: "Account 2",
    budget: "$2,500",
    status: "active",
  },
  {
    id: 3,
    name: "Account 3",
    budget: "$1,200",
    status: "deactive",
  },
];

export default function Accounts() {
  const navigate = useNavigate();
  const [accountStatus, setAccountStatus] = useState<Record<number, string>>(
    Object.fromEntries(accounts.map((a) => [a.id, a.status]))
  );

  const toggleStatus = (id: number) => {
    setAccountStatus((prev) => ({
      ...prev,
      [id]: prev[id] === "active" ? "deactive" : "active",
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Management</h1>
          <p className="text-muted-foreground mt-1">Manage advertising accounts</p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary-hover"
          onClick={() => navigate("/accounts/new")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.budget}</TableCell>
                  <TableCell>
                    <Badge
                      variant={accountStatus[account.id] === "active" ? "default" : "secondary"}
                    >
                      {accountStatus[account.id]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem onClick={() => navigate(`/accounts/${account.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(account.id)}>
                          {accountStatus[account.id] === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/accounts/${account.id}/edit`)}>
                          Edit Account
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Account
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
