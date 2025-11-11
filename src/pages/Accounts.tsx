import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MetaIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const accounts = [
  { id: 1, accId: "123456789012", name: "Tech Startup Search", clientName: "Tech Startup Inc", budget: "$5,000", spent: "$4,250", status: "active", type: "google" },
  { id: 2, accId: "987654321098", name: "Tech Startup Social", clientName: "Tech Startup Inc", budget: "$3,000", spent: "$2,100", status: "active", type: "meta" },
  { id: 3, accId: "456789123456", name: "Nations Auto Main", clientName: "Nations Auto Glass", budget: "$2,500", spent: "$1,825", status: "active", type: "google" },
  { id: 4, accId: "789123456789", name: "VW Heavy Display", clientName: "VW Heavy Up", budget: "$1,200", spent: "$852", status: "active", type: "google" },
  { id: 5, accId: "321654987321", name: "VW Shopping Ads", clientName: "Volkswagen", budget: "$4,500", spent: "$3,600", status: "active", type: "google" },
  { id: 6, accId: "654987321654", name: "VW Brand Campaign", clientName: "Volkswagen", budget: "$2,800", spent: "$1,960", status: "active", type: "meta" },
  { id: 7, accId: "147258369147", name: "Auto Glass Local", clientName: "Nations Auto Glass", budget: "$1,800", spent: "$1,440", status: "active", type: "meta" },
  { id: 8, accId: "258369147258", name: "Tech Display Network", clientName: "Tech Startup Inc", budget: "$3,500", spent: "$2,625", status: "active", type: "google" },
  { id: 9, accId: "369147258369", name: "Heavy Equipment Ads", clientName: "VW Heavy Up", budget: "$2,200", spent: "$1,540", status: "deactive", type: "google" },
  { id: 10, accId: "741852963741", name: "Brand Awareness FB", clientName: "Tech Startup Inc", budget: "$4,000", spent: "$3,200", status: "active", type: "meta" },
  { id: 11, accId: "852963741852", name: "Local Service Search", clientName: "Nations Auto Glass", budget: "$1,500", spent: "$1,200", status: "active", type: "google" },
  { id: 12, accId: "963741852963", name: "Performance Max", clientName: "Volkswagen", budget: "$5,500", spent: "$4,675", status: "active", type: "google" },
  { id: 13, accId: "159753486159", name: "Instagram Stories", clientName: "Tech Startup Inc", budget: "$2,000", spent: "$1,600", status: "active", type: "meta" },
  { id: 14, accId: "357951468357", name: "Video Campaign", clientName: "VW Heavy Up", budget: "$3,800", spent: "$2,660", status: "active", type: "meta" },
  { id: 15, accId: "486159357486", name: "Search Network", clientName: "Nations Auto Glass", budget: "$2,700", spent: "$2,160", status: "active", type: "google" },
  { id: 16, accId: "624813579624", name: "Remarketing Ads", clientName: "Volkswagen", budget: "$1,900", spent: "$1,330", status: "deactive", type: "google" },
  { id: 17, accId: "813579624813", name: "Lead Generation", clientName: "Tech Startup Inc", budget: "$3,300", spent: "$2,640", status: "active", type: "meta" },
  { id: 18, accId: "579246813579", name: "Shopping Campaign", clientName: "VW Heavy Up", budget: "$4,200", spent: "$3,360", status: "active", type: "google" },
  { id: 19, accId: "246813579246", name: "Display Remarketing", clientName: "Nations Auto Glass", budget: "$1,600", spent: "$1,120", status: "active", type: "google" },
  { id: 20, accId: "135792468135", name: "Messenger Ads", clientName: "Volkswagen", budget: "$2,400", spent: "$1,680", status: "active", type: "meta" },
  { id: 21, accId: "792468135792", name: "Brand Search", clientName: "Tech Startup Inc", budget: "$5,200", spent: "$4,160", status: "active", type: "google" },
  { id: 22, accId: "468135792468", name: "Carousel Ads", clientName: "VW Heavy Up", budget: "$2,900", spent: "$2,030", status: "deactive", type: "meta" },
  { id: 23, accId: "913578246913", name: "Call Ads", clientName: "Nations Auto Glass", budget: "$1,400", spent: "$1,050", status: "active", type: "google" },
  { id: 24, accId: "578246913578", name: "Collection Ads", clientName: "Volkswagen", budget: "$3,700", spent: "$2,960", status: "active", type: "meta" },
  { id: 25, accId: "246913578246", name: "Smart Campaign", clientName: "Tech Startup Inc", budget: "$2,100", spent: "$1,680", status: "active", type: "google" },
];

export default function Accounts() {
  const navigate = useNavigate();
  const [accountStatus, setAccountStatus] = useState<Record<number, string>>(
    Object.fromEntries(accounts.map((a) => [a.id, a.status])),
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
          <h1 className="text-3xl font-bold tracking-tight">Ads Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage advertising accounts</p>
        </div>
        <Button className="bg-primary hover:bg-primary-hover" onClick={() => navigate("/accounts/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Acc ID</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-mono text-sm">{account.accId}</TableCell>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.clientName}</TableCell>
                  <TableCell>{account.budget}</TableCell>
                  <TableCell>{account.spent}</TableCell>
                  <TableCell>
                    <Badge variant={accountStatus[account.id] === "active" ? "default" : "secondary"}>
                      {accountStatus[account.id]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {account.type === "google" ? <GoogleIcon /> : <MetaIcon />}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-popover" align="end">
                        <DropdownMenuItem onClick={() => navigate(`/accounts/${account.id}`)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleStatus(account.id)}>
                          {accountStatus[account.id] === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/accounts/${account.id}/edit`)}>
                          Edit
                        </DropdownMenuItem>
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
