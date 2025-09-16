# 🌐 Configuração do Ngrok para Demo Pública

## ✅ Status Atual
- **Frontend:** ✅ Rodando na porta 5174
- **Backend:** ✅ Rodando na porta 3000
- **Configuração Vite:** ✅ Atualizada para aceitar ngrok

## 🚀 Passos para Configurar o Ngrok

### 1. Configurar Backend para Acesso Externo
O backend já está configurado para aceitar conexões externas:
- ✅ `HOST: 0.0.0.0` (aceita qualquer IP)
- ✅ CORS configurado para ngrok
- ✅ Backend rodando na porta 3000

### 2. Instalar o Ngrok
```bash
# Baixe e instale o ngrok em: https://ngrok.com/download
# Ou use o chocolatey:
choco install ngrok

# Ou use o winget:
winget install ngrok.ngrok
```

### 3. Criar Conta e Obter Token
1. Acesse: https://ngrok.com/
2. Crie uma conta gratuita
3. Obtenha seu token de autenticação
4. Configure o token:
```bash
ngrok config add-authtoken SEU_TOKEN_AQUI
```

### 4. Expor os Serviços

#### Opção A: Apenas Frontend (Recomendado)
```bash
ngrok http 5174
```

#### Opção B: Frontend + Backend (Para testes completos)
```bash
# Terminal 1 - Frontend
ngrok http 5174

# Terminal 2 - Backend  
ngrok http 3000
```

### 5. Atualizar Configuração do Vite
Quando o ngrok gerar a URL (ex: `https://abc123.ngrok-free.app`), atualize o arquivo `vite.config.ts`:

```typescript
allowedHosts: ['abc123.ngrok-free.app'], // Substitua pela sua URL real
```

### 6. Configurar Frontend para Backend Externo

Se você expôs o backend via ngrok, atualize o `.env` do frontend:

```bash
# No arquivo C:\Users\nilom\stellar-tropic-hub\.env
VITE_BACKEND_URL=https://SUA_URL_BACKEND_NGROK.ngrok-free.app
```

### 7. Reiniciar o Frontend
```bash
cd C:\Users\nilom\stellar-tropic-hub
npm run dev -- --port 5174 --strictPort
```

## 🔧 Configuração Atual do Vite

O arquivo `vite.config.ts` já está configurado com:
- ✅ `host: "::"` - Aceita conexões de qualquer IP
- ✅ `strictPort: true` - Força uso da porta 5174
- ✅ `allowedHosts: ['43580ca629f7.ngrok-free.app']` - Lista de hosts permitidos
- ✅ HMR configurado para a porta 5174

## 🌍 URLs de Acesso

### Local
- **Frontend:** http://localhost:5174
- **Backend:** http://localhost:3000

### Público (após configurar ngrok)
- **Frontend:** https://SUA_URL_NGROK.ngrok-free.app
- **Backend:** https://SUA_URL_NGROK.ngrok-free.app:3000 (se expor o backend também)

## ⚠️ Importante

1. **Atualize a URL do ngrok** no `vite.config.ts` sempre que reiniciar o ngrok
2. **Mantenha o backend rodando** na porta 3000
3. **Teste localmente** antes de compartilhar a URL pública
4. **Use HTTPS** para funcionalidades de carteira (Freighter)

## 🐛 Troubleshooting

### Erro: "Host not allowed"
- Verifique se a URL do ngrok está correta no `allowedHosts`
- Reinicie o frontend após atualizar a configuração

### Erro: "Connection refused"
- Verifique se o backend está rodando na porta 3000
- Teste: http://localhost:3000/health

### Erro: "Port already in use"
- Pare todos os processos Node.js: `taskkill /F /IM node.exe`
- Reinicie o frontend

## 📱 Teste da Demo

1. Acesse a URL do ngrok
2. Conecte uma carteira Freighter
3. Navegue para o Portfolio
4. Teste o formulário de depósito
5. Verifique se os dados de mercado estão atualizando

---

**🎉 Sua demo estará acessível publicamente via ngrok!**
