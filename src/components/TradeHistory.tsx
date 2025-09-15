import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Trade {
  id: string;
  type: "buy" | "sell";
  asset: string;
  amount: string;
  price: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

const mockTrades: Trade[] = [
  {
    id: "1",
    type: "buy",
    asset: "XLM",
    amount: "1,250",
    price: "$0.1245",
    timestamp: "2 min ago",
    status: "completed"
  },
  {
    id: "2",
    type: "sell",
    asset: "USDC",
    amount: "500",
    price: "$1.00",
    timestamp: "5 min ago",
    status: "completed"
  },
  {
    id: "3",
    type: "buy",
    asset: "yXLM",
    amount: "2,100",
    price: "$0.1156",
    timestamp: "12 min ago",
    status: "pending"
  }
];

const statusConfig = {
  completed: "bg-success text-success-foreground",
  pending: "bg-warning text-warning-foreground",
  failed: "bg-destructive text-destructive-foreground"
};

export function TradeHistory() {
  return (
    <Card className="border border-border/50 bg-gradient-to-br from-card to-card/80">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary" />
          Recent Trades
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockTrades.map((trade) => (
            <div
              key={trade.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center",
                  trade.type === "buy" ? "bg-success/20" : "bg-destructive/20"
                )}>
                  {trade.type === "buy" ? (
                    <ArrowDownLeft className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {trade.type.toUpperCase()} {trade.asset}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {trade.amount} @ {trade.price}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge className={cn("mb-1", statusConfig[trade.status])}>
                  {trade.status}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {trade.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}