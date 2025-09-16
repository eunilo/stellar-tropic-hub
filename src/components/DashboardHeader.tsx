import TropicLogo from "@/assets/home.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Settings, Bell, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  isConnected as freighterIsConnected,
  isAllowed as freighterIsAllowed,
  requestAccess as freighterRequestAccess,
  getAddress as freighterGetAddress,
  WatchWalletChanges,
} from "@stellar/freighter-api";

export function DashboardHeader() {
  const navigate = useNavigate();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const watcherRef = useRef<InstanceType<typeof WatchWalletChanges> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tropic_connected_pubkey");
    if (saved) setPublicKey(saved);

    (async () => {
      try {
        // Se a extensão estiver instalada e o app já permitido, pega o endereço
        const conn = await freighterIsConnected();
        if (!conn?.isConnected) return;
        const allowed = await freighterIsAllowed();
        if (allowed?.isAllowed) {
          const addrObj = await freighterGetAddress();
          const addr = addrObj?.address || addrObj; // compat
          if (typeof addr === 'string' && addr.length > 0) {
            setPublicKey(addr);
            localStorage.setItem("tropic_connected_pubkey", addr);
          }
        }
      } catch {}
    })();

    // Observa mudanças de conta/rede
    try {
      watcherRef.current = new WatchWalletChanges(1000);
      watcherRef.current.watch(({ address }) => {
        if (address && address !== publicKey) {
          setPublicKey(address);
          localStorage.setItem("tropic_connected_pubkey", address);
        }
      });
    } catch {}

    return () => {
      try { watcherRef.current?.stop(); } catch {}
      watcherRef.current = null;
    };
  }, []);

  async function handleConnectWallet() {
    setConnecting(true);
    try {
      const conn = await freighterIsConnected();
      if (!conn?.isConnected) {
        alert("Ative a extensão Freighter para este site e recarregue a página.");
        return;
      }
      const allowed = await freighterIsAllowed();
      const addrObj = allowed?.isAllowed ? await freighterGetAddress() : await freighterRequestAccess();
      const addr = addrObj?.address || addrObj; // compat
      if (typeof addr === 'string' && addr.length > 0) {
        setPublicKey(addr);
        localStorage.setItem("tropic_connected_pubkey", addr);
        // redireciona para o dashboard pessoal
        try { navigate('/portfolio'); } catch {}
      }
    } catch (e) {
      console.error("Wallet connect failed", e);
    } finally {
      setConnecting(false);
    }
  }

  function handleDisconnect() {
    setPublicKey(null);
    localStorage.removeItem("tropic_connected_pubkey");
  }

  function handleGoHome() {
    navigate('/');
  }
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo responsiva */}
            <div className="flex items-center space-x-3">
              <img src={TropicLogo} alt="TROPIC Logo" className="h-12 sm:h-16 md:h-20 w-auto max-w-full" />
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              Testnet
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={handleGoHome}
              title="Voltar ao Dashboard"
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Settings className="h-4 w-4" />
            </Button>
            {publicKey ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-foreground font-medium">
                  {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(publicKey)}
                >
                  Copiar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDisconnect}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Button
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                onClick={handleConnectWallet}
                disabled={connecting}
              >
                <Wallet className="h-4 w-4 mr-2" />
                {connecting ? "Conectando..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}