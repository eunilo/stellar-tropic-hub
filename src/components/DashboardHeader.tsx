import TropicLogo from "@/assets/home.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Settings, Bell } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* O valor de 'h-24' foi alterado para 'h-32' */}
            <div className="flex items-center space-x-3">
              <img src={TropicLogo} alt="TROPIC Logo" className="h-32" />
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              Testnet
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}