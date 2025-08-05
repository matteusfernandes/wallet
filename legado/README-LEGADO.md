# 📦 TrybeWallet - Versão Legado

Esta pasta contém a versão original do TrybeWallet preservada antes da modernização para Next.js + TypeScript + Zustand.

## 🏗️ Stack Original
- **React**: 16.13.1 (Class Components)
- **Redux**: 4.0.5 + Redux Thunk
- **React Router**: 5.2.0
- **react-scripts**: 3.4.3
- **Bootstrap**: 4.5.2

## 🚀 Como executar a versão legado

```bash
cd legado
npm install
NODE_OPTIONS="--openssl-legacy-provider" npm start
```

## 📁 Estrutura Original
```
src/
├── actions/         # Redux actions
├── assets/          # Imagens e recursos
├── components/      # Componentes reutilizáveis
├── pages/           # Páginas (Login, Wallet)
├── reducers/        # Redux reducers
├── services/        # API calls
└── store/           # Redux store
```

## ⚡ Funcionalidades Preservadas
- ✅ Sistema de login com validação
- ✅ Gerenciamento de despesas
- ✅ Conversão de moedas em tempo real
- ✅ Tabela de despesas com ações
- ✅ Estados gerenciados com Redux

---

**Preservado em:** ${new Date().toISOString().split('T')[0]}  
**Modernização:** Em andamento na pasta raiz com Next.js + TypeScript
