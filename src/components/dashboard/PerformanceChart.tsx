import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
  { date: "Jan 1", clicks: 1200, conversions: 45, spend: 850 },
  { date: "Jan 8", clicks: 1800, conversions: 62, spend: 1200 },
  { date: "Jan 15", clicks: 2400, conversions: 78, spend: 1650 },
  { date: "Jan 22", clicks: 2100, conversions: 71, spend: 1400 },
  { date: "Jan 29", clicks: 2800, conversions: 95, spend: 1850 },
  { date: "Feb 5", clicks: 3200, conversions: 108, spend: 2100 },
  { date: "Feb 12", clicks: 3600, conversions: 125, spend: 2400 },
];

export function PerformanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Campaign Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="conversions"
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
