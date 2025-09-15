import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon?: React.ReactNode;
}

export function MetricsCard({ title, value, change, trend, icon }: MetricsCardProps) {
  return (
    <Card className="relative overflow-hidden border border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="relative">
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs mt-1">
          {trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-success mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive mr-1" />
          )}
          <span
            className={cn(
              "font-medium",
              trend === "up" ? "text-success" : "text-destructive"
            )}
          >
            {change}
          </span>
          <span className="text-muted-foreground ml-1">from last period</span>
        </div>
      </CardContent>
    </Card>
  );
}