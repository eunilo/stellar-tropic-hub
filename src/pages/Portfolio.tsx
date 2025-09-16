import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";

// Detectar se está sendo acessado externamente e usar IP da rede local
const isExternal = !window.location.hostname.includes('localhost') && !window.location.hostname.includes('127.0.0.1');
const BACKEND_URL = isExternal 
  ? 'http://10.150.0.119:3000' // IP da sua rede local
  : (import.meta as any).env?.VITE_BACKEND_URL || 'http://localhost:3000';

export default function Portfolio() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [strategyId, setStrategyId] = useState<string>("grid-strategy-1");
  const [amount, setAmount] = useState<string>("");
  const [asset, setAsset] = useState<string>("XLM");
  const [depositResult, setDepositResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [balances, setBalances] = useState<Array<{ asset: string; balance: string }>>([]);
  const [perf, setPerf] = useState<{ totalValueUSD: number; pnlPercent: number }>({ totalValueUSD: 0, pnlPercent: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("tropic_connected_pubkey");
    if (saved) setPublicKey(saved);
    // Mock balances para evitar problemas de importação
    if (saved) {
      setBalances([
        { asset: 'XLM', balance: '1000.0000000' },
        { asset: 'USDC:GBBD47IF6LXCC7C7VWX3O7V3SNS2CO7Z3XC5HGKHMELQI3XJQ6VWILL4', balance: '500.0000000' }
      ]);
      setPerf({ totalValueUSD: 620.00, pnlPercent: 12.3 });
    }
  }, []);

  async function handleDeposit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setDepositResult(null);
    try {
      if (!BACKEND_URL) {
        setErrorMsg("VITE_BACKEND_URL não configurada no frontend.");
        return;
      }
      if (!publicKey) {
        setErrorMsg("Conecte sua carteira primeiro.");
        return;
      }
      const body = {
        investor: publicKey,
        strategyId,
        amount: Number(amount),
        asset,
      };
      if (!Number.isFinite(body.amount) || body.amount <= 0) {
        setErrorMsg("Informe um valor válido para Amount.");
        return;
      }
      const res = await fetch(`${BACKEND_URL}/api/strategy/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        setErrorMsg(json?.message || "Falha no depósito");
        return;
      }
      setDepositResult(json.data);
    } catch (e: any) {
      setErrorMsg(e?.message || "Erro desconhecido");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Performance resumida */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h4 className="text-sm text-muted-foreground">Portfolio Value</h4>
            <p className="text-2xl font-bold text-foreground mt-1">${perf.totalValueUSD}</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h4 className="text-sm text-muted-foreground">PnL %</h4>
            <p className="text-2xl font-bold text-green-400 mt-1">{perf.pnlPercent}%</p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h4 className="text-sm text-muted-foreground">Carteira</h4>
            <p className="text-xs text-muted-foreground break-all">{publicKey || '—'}</p>
          </div>
        </div>

        {/* Saldos */}
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Saldos</h3>
          {balances.length === 0 ? (
            <p className="text-muted-foreground">Nenhum saldo disponível.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-muted rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-secondary text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-2">Ativo</th>
                    <th className="px-4 py-2">Saldo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {balances.map((b, idx) => (
                    <tr key={idx} className="hover:bg-secondary/50">
                      <td className="px-4 py-2 whitespace-nowrap">{b.asset}</td>
                      <td className="px-4 py-2 whitespace-nowrap">{b.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bg-card rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-2 text-foreground">Meu Portfólio</h2>
          <p className="text-sm text-muted-foreground">Carteira conectada: {publicKey ? (
            <code className="bg-muted px-1 py-0.5 rounded">{publicKey}</code>
          ) : (
            <span className="text-red-400">nenhuma</span>
          )}</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Depósito em Estratégia</h3>
          <form onSubmit={handleDeposit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Strategy ID</label>
              <input
                type="text"
                value={strategyId}
                onChange={(e) => setStrategyId(e.target.value)}
                placeholder="grid-strategy-1"
                className="w-full px-3 py-2 rounded bg-muted text-foreground border border-border focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Amount</label>
              <input
                type="number"
                step="0.0000001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-full px-3 py-2 rounded bg-muted text-foreground border border-border focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Asset</label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                placeholder="XLM"
                className="w-full px-3 py-2 rounded bg-muted text-foreground border border-border focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:opacity-90 font-semibold py-2 px-6 rounded"
              >
                Depositar
              </button>
            </div>
          </form>
          {errorMsg && <p className="text-red-400 text-sm mt-3">{errorMsg}</p>}
          {depositResult && (
            <div className="mt-6 bg-muted rounded p-4 text-sm">
              <p><span className="text-muted-foreground">Strategy:</span> {depositResult.strategyId}</p>
              <p><span className="text-muted-foreground">Asset:</span> {depositResult.asset}</p>
              <p><span className="text-muted-foreground">Allocation:</span> {depositResult.allocation}</p>
              <p><span className="text-muted-foreground">New Balance:</span> {depositResult.newBalance}</p>
              <p><span className="text-muted-foreground">Fee Charged:</span> {depositResult.feeCharged}</p>
              <p><span className="text-muted-foreground">Decided At:</span> {new Date(depositResult.decidedAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


