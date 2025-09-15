import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricsCard } from "@/components/MetricsCard";
import { StrategyCard } from "@/components/StrategyCard";
import { TradeHistory } from "@/components/TradeHistory";
import { TrendingUp, DollarSign, Bot, Zap } from "lucide-react";
// O import da imagem de fundo foi removido, conforme discutimos
import { TradingChart } from "@/components/TradingChart"; // Importe o componente do gráfico

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      {/* Seção "Hero" sem a imagem de fundo */}
      <div 
        className="relative h-48 flex items-center justify-center bg-cover bg-center"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Stellar Trading Dashboard</h2>
          <p className="text-lg text-white/80">AI-Powered Yield Optimization on Stellar Network</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="Total Portfolio Value"
            value="$12,847.32"
            change="+12.4%"
            trend="up"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <MetricsCard
            title="24h Performance"
            value="+$1,247.89"
            change="+8.2%"
            trend="up"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <MetricsCard
            title="Active Strategies"
            value="3"
            change="+1"
            trend="up"
            icon={<Bot className="h-4 w-4" />}
          />
          <MetricsCard
            title="Avg. APY"
            value="23.5%"
            change="+2.1%"
            trend="up"
            icon={<Zap className="h-4 w-4" />}
          />
        </div>

        {/* Gráfico de Trading: ONDE O NOVO CÓDIGO ESTÁ */}
        <div className="bg-card rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Performance do Mercado</h3>
            <TradingChart />
        </div>

        {/* Strategies and Trading */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Active Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StrategyCard
                name="Stellar Arbitrage AI"
                status="active"
                performance="+18.3%"
                trades={247}
                type="ai"
              />
              <StrategyCard
                name="Defindex Liquidity Pool"
                status="optimizing"
                performance="+24.1%"
                trades={189}
                type="defindex"
              />
              <StrategyCard
                name="Cross-Chain Yield"
                status="paused"
                performance="+12.7%"
                trades={156}
                type="ai"
              />
              <StrategyCard
                name="Market Making Bot"
                status="active"
                performance="+31.2%"
                trades={421}
                type="ai"
              />
            </div>
          </div>

          <div>
            <TradeHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;