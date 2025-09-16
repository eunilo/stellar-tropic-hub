# 🔧 Configuração do Backend via Ngrok

## ❌ Problema Atual
- Frontend via ngrok: ✅ Funcionando
- Backend local: ✅ Funcionando  
- **Backend via ngrok:** ❌ Não configurado
- **Resultado:** Outras máquinas não conseguem acessar a API

## ✅ Solução

### 1. Expor o Backend via Ngrok
```bash
# Terminal 3 - Backend via ngrok
cd C:\Users\nilom\stellar-ai-trading-automation
ngrok http 3000
```

### 2. Obter a URL do Backend Ngrok
Quando o ngrok do backend iniciar, você verá algo como:
```
Forwarding    https://abc123.ngrok-free.app -> http://localhost:3000
```

### 3. Atualizar Frontend para Usar Backend Ngrok
Edite o arquivo `.env` do frontend:

```bash
# C:\Users\nilom\stellar-tropic-hub\.env
VITE_BACKEND_URL=https://SUA_URL_BACKEND_NGROK.ngrok-free.app
```

### 4. Reiniciar Frontend
```bash
cd C:\Users\nilom\stellar-tropic-hub
npm run dev -- --port 5174 --strictPort
```

## 🔄 Processo Completo

### Terminal 1 - Backend Local
```bash
cd C:\Users\nilom\stellar-ai-trading-automation
npm run start:simple
```

### Terminal 2 - Frontend Local
```bash
cd C:\Users\nilom\stellar-tropic-hub
npm run dev -- --port 5174 --strictPort
```

### Terminal 3 - Frontend Ngrok
```bash
ngrok http 5174
```

### Terminal 4 - Backend Ngrok
```bash
cd C:\Users\nilom\stellar-ai-trading-automation
ngrok http 3000
```

## 📝 URLs Finais

- **Frontend Local:** http://localhost:5174
- **Frontend Público:** https://cc77efc01466.ngrok-free.app
- **Backend Local:** http://localhost:3000
- **Backend Público:** https://SUA_URL_BACKEND_NGROK.ngrok-free.app

## ⚠️ Importante

1. **Sempre mantenha ambos os ngroks rodando**
2. **Atualize o .env sempre que a URL do backend ngrok mudar**
3. **Reinicie o frontend após mudar o .env**

## 🎯 Resultado Esperado

- ✅ Frontend acessível publicamente
- ✅ Backend acessível publicamente  
- ✅ API funcionando em qualquer máquina
- ✅ Gráficos atualizando em tempo real
- ✅ Sistema de depósitos funcionando

---
**🚀 Após configurar, sua demo funcionará 100% em qualquer máquina!**
