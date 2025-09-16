import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface StrategyCardProps {
  id?: string;
  name: string;
  status: "active" | "paused" | "optimizing";
  performance: string;
  trades: number;
  type: "ai" | "defindex";
  onPause?: (id?: string) => void;
  onResume?: (id?: string) => void;
}

const statusConfig = {
  active: {
    color: "bg-success text-success-foreground",
    icon: Activity,
    label: "Active"
  },
  paused: {
    color: "bg-warning text-warning-foreground",
    icon: Activity,
    label: "Paused"
  },
  optimizing: {
    color: "bg-primary text-primary-foreground",
    icon: Zap,
    label: "Optimizing"
  }
};

export function StrategyCard({ id, name, status, performance, trades, type, onPause, onResume }: StrategyCardProps) {
  const statusInfo = statusConfig[status];
  const StatusIcon = statusInfo.icon;

  return (
    <Card className="relative overflow-hidden border border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-xl transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {name}
              </CardTitle>
              <p className="text-sm text-muted-foreground capitalize">
                {type} Strategy
              </p>
            </div>
          </div>
          <Badge className={cn("flex items-center space-x-1", statusInfo.color)}>
            <StatusIcon className="h-3 w-3" />
            <span>{statusInfo.label}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Performance</p>
            <p className="text-lg font-bold text-success">{performance}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trades</p>
            <p className="text-lg font-bold text-foreground">{trades}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          {status === "paused" ? (
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => onResume?.(id)}>
              Resume
            </Button>
          ) : (
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => onPause?.(id)}>
              Pause
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}