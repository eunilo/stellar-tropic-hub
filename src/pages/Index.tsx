import { useEffect, useState, lazy, Suspense } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { MetricsCard } from "@/components/MetricsCard";
import { StrategyCard } from "@/components/StrategyCard";
import { TradeHistory } from "@/components/TradeHistory";
import { TrendingUp, DollarSign, Bot, Zap } from "lucide-react";
const TradingChart = lazy(() => import("@/components/TradingChart").then(m => ({ default: m.TradingChart })));

const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL as string | undefined;

type PriceRow = { symbol: string; price: number; volume: number; changePercent24h: number };

const Index = () => {
  const [status, setStatus] = useState("Conectando ao backend...");
  const [isConnected, setIsConnected] = useState(false);
  const [version, setVersion] = useState("N/A");
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [strategies, setStrategies] = useState([
    { id: 'strategy-1', name: 'Stellar Arbitrage AI', status: 'active', performance: '+18.3%', trades: 247, type: 'ai' },
    { id: 'strategy-2', name: 'Defindex Liquidity Pool', status: 'optimizing', performance: '+24.1%', trades: 189, type: 'defindex' },
    { id: 'strategy-3', name: 'Cross-Chain Yield', status: 'paused', performance: '+12.7%', trades: 156, type: 'ai' },
    { id: 'strategy-4', name: 'Market Making Bot', status: 'active', performance: '+31.2%', trades: 421, type: 'ai' },
  ] as Array<{ id: string; name: string; status: 'active' | 'paused' | 'optimizing'; performance: string; trades: number; type: 'ai' | 'defindex' }>);

  useEffect(() => {
    async function checkBackendStatus() {
      try {
        if (!BACKEND_URL) {
          setStatus("Erro: VITE_BACKEND_URL não está configurada.");
          return;
        }
        const response = await fetch(`${BACKEND_URL}/health`);
        const data = await response.json();
        if (data?.success && data?.data?.status === "healthy") {
          setStatus("Backend conectado com sucesso!");
          setIsConnected(true);
          setVersion(data?.data?.version ?? "N/A");
        } else {
          setStatus("Erro ao conectar ao backend.");
          setIsConnected(false);
        }
      } catch (error: any) {
        setStatus(`Falha na conexão: ${error?.message ?? "erro desconhecido"}`);
        setIsConnected(false);
      }
    }

    async function loadPrices() {
      try {
        if (!BACKEND_URL) return;
        const res = await fetch(`${BACKEND_URL}/api/market/prices`);
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          setPrices(json.data as PriceRow[]);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch market prices:", error);
      }
    }

    checkBackendStatus();
    loadPrices();
  }, []);

  async function handlePause(id?: string) {
    if (!id || !BACKEND_URL) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/strategies/pause`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json?.success) {
        setStrategies(prev => prev.map(s => s.id === id ? { ...s, status: 'paused' } : s));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Pause failed', e);
    }
  }

  async function handleResume(id?: string) {
    if (!id || !BACKEND_URL) return;
    try {
      const res = await fetch(`${BACKEND_URL}/api/strategies/resume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const json = await res.json();
      if (json?.success) {
        setStrategies(prev => prev.map(s => s.id === id ? { ...s, status: 'active' } : s));
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Resume failed', e);
    }
  }

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
        {/* Painel de status do backend */}
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-foreground">Status do Backend</h3>
          <p className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>{status}</p>
          {isConnected && (
            <p className="text-sm text-muted-foreground mt-1">
              Versão do backend: <code className="bg-muted px-1 py-0.5 rounded">{version}</code>
            </p>
          )}
          <p className="text-xs text-muted-foreground mt-2">
            BACKEND_URL: <code className="bg-muted px-1 py-0.5 rounded">{String(BACKEND_URL || 'não definido')}</code>
          </p>
        </div>

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

        {/* Gráfico de Trading */}
        <div className="bg-card rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Performance do Mercado</h3>
            <Suspense fallback={<p className="text-muted-foreground">Carregando gráfico...</p>}>
              <TradingChart />
            </Suspense>
        </div>

        {/* Tabela de preços do backend */}
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Dados de Mercado (API)</h3>
          {prices.length === 0 ? (
            <p className="text-muted-foreground">Nenhum dado de mercado disponível ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-muted rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-secondary text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-2">Símbolo</th>
                    <th className="px-4 py-2">Preço</th>
                    <th className="px-4 py-2">Volume</th>
                    <th className="px-4 py-2">Variação 24h</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {prices.map((p, idx) => (
                    <tr key={idx} className="hover:bg-secondary/50">
                      <td className="px-4 py-2 whitespace-nowrap">{p.symbol}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{Number(p.price).toFixed(4)}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{Math.round(Number(p.volume))}</td>
                      <td className={`px-4 py-2 whitespace-nowrap ${Number(p.changePercent24h) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(Number(p.changePercent24h) || 0).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Strategies and Trading */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">Active Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map(s => (
                <StrategyCard
                  key={s.id}
                  id={s.id}
                  name={s.name}
                  status={s.status}
                  performance={s.performance}
                  trades={s.trades}
                  type={s.type}
                  onPause={handlePause}
                  onResume={handleResume}
                />
              ))}
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