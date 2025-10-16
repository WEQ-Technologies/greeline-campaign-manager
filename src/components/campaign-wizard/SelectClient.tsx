import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, AlertCircle } from "lucide-react";

const clients = [
  { id: "1", name: "Tech Startup Inc", status: "connected", campaigns: 3 },
  { id: "2", name: "Local Bakery", status: "connected", campaigns: 2 },
  { id: "3", name: "Fitness Center", status: "connected", campaigns: 1 },
  { id: "4", name: "Restaurant Chain", status: "pending", campaigns: 0 },
];

interface SelectClientProps {
  value: string;
  onChange: (value: string) => void;
}

export function SelectClient({ value, onChange }: SelectClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Client</CardTitle>
        <CardDescription>Choose which client this campaign is for</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={onChange}>
          <div className="grid gap-4">
            {clients.map((client) => (
              <Label
                key={client.id}
                htmlFor={client.id}
                className={`flex items-center justify-between rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  value === client.id
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <RadioGroupItem value={client.id} id={client.id} />
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {client.status === "connected" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="text-sm text-muted-foreground">
                            Connected • {client.campaigns} campaigns
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-warning" />
                          <span className="text-sm text-muted-foreground">Pending setup</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
