# TrybeWallet Next.js - Versão 2.0.0

## 🚀 Modernização Completa da Carteira Digital

Uma versão completamente modernizada do TrybeWallet, refatorada de React 16 + Redux para **Next.js 15** + **TypeScript** + **Zustand**, mantendo todas as funcionalidades originais e adicionando recursos avançados.

## ✨ Principais Melhorias

### 🔄 Stack Tecnológica Moderna
- **Next.js 15.4.5** - Framework React de última geração
- **React 19.1.0** - Hooks modernos e performance otimizada
- **TypeScript** - Tipagem estática para maior confiabilidade  
- **Zustand 5.0.7** - Gerenciamento de estado simplificado e poderoso
- **Tailwind CSS 4** - Estilização moderna e responsiva
- **Zod 4.0.14** - Validação de formulários type-safe

### 🎯 Novas Funcionalidades
- **📊 Gráficos Interativos** - Visualização de gastos com Recharts
- **🏷️ Categorias Personalizadas** - Crie suas próprias categorias de gastos
- **📤 Exportação Múltipla** - PDF, CSV e JSON com dados formatados  
- **🔄 Sincronização em Tempo Real** - Câmbio atualizado automaticamente
- **📱 Interface Responsiva** - Design moderno adaptável a todos os dispositivos
- **🎨 Sistema de Cores Dinâmico** - Paleta de cores inteligente para gráficos

### 🛠️ Experiência do Desenvolvedor
- **TypeScript** completo com tipagem robusta
- **Validação Zod** para formulários seguros
- **Middleware Immer** para atualizações imutáveis
- **Persistência automática** de dados com Zustand
- **DevTools integrados** para debugging
- **Arquitetura modular** e escalável

## 📦 Instalação e Uso

### Requisitos
- Node.js 18+ 
- npm ou yarn

### Executar a versão moderna
```bash
npm install
npm run dev
```

### Acessar versão legado preservada
```bash
npm run legacy
```

### 🔑 Credenciais para Teste
Para testar a aplicação, use qualquer email válido e senha com pelo menos 6 caracteres:

**Exemplo:**
- **Email:** `admin@trybewallet.com`
- **Senha:** `123456`

*A validação é apenas de formato - não há autenticação real.*

## 🏗️ Arquitetura

### 📁 Estrutura de Diretórios
```
src/
├── app/                    # App Router Next.js
│   ├── page.tsx           # Página de login moderna
│   ├── dashboard/         # Dashboard principal  
│   └── charts/            # Análises visuais
├── components/            # Componentes reutilizáveis
│   ├── ui/                # Componentes base (Button, etc)
│   ├── AddExpenseModal.tsx
│   ├── ExportModal.tsx
│   ├── ExpenseCharts.tsx
│   └── CategoryManager.tsx
├── stores/                # Gerenciamento de estado Zustand
│   ├── walletStore.ts     # Estado principal da carteira
│   └── currencyStore.ts   # Cotações e câmbio
├── lib/                   # Utilitários e configurações
│   ├── utils.ts           # Funções auxiliares
│   ├── schemas.ts         # Validação Zod
│   └── export.ts          # Exportação de dados
└── legado/                # Código original preservado
```

### 🔄 Gerenciamento de Estado
```typescript
// Zustand com TypeScript e Immer
interface WalletState {
  user: User | null
  expenses: Expense[]
  categories: string[]
  customCategories: string[]
}

// Actions type-safe
interface WalletActions {
  login: (email: string) => void
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void
  getTotalExpenses: () => number
  // ... mais actions
}
```

## 🎨 Funcionalidades Destacadas

### 📊 Dashboard Inteligente
- **Cards informativos** com métricas principais
- **Tabela dinâmica** de despesas com ações
- **Filtragem e busca** em tempo real
- **Navegação intuitiva** entre seções

### 📈 Análises Visuais
- **Gráfico de Pizza** - Gastos por categoria
- **Gráfico de Barras** - Evolução temporal
- **Estatísticas detalhadas** - Métricas calculadas automaticamente
- **Exportação de gráficos** em PNG

### 💾 Exportação de Dados
- **PDF Formatado** - Relatório profissional com tabelas
- **CSV para Excel** - Dados estruturados para análise
- **JSON Técnico** - Backup completo dos dados
- **Nomes personalizados** de arquivos

### 🏷️ Gestão de Categorias
- **Categorias padrão** - 9 categorias pré-definidas
- **Categorias personalizadas** - Crie quantas precisar  
- **Validação inteligente** - Evita duplicações
- **Exclusão segura** - Confirmação antes de remover

## 🔧 Tecnologias e Dependências

### Core
- **Next.js** `15.4.5` - Framework React
- **React** `19.1.0` - Biblioteca de UI
- **TypeScript** `5` - Tipagem estática
- **Tailwind CSS** - Styling moderno

### Estado e Dados
- **Zustand** `5.0.7` - Gerenciamento de estado
- **Immer** - Updates imutáveis
- **Zod** `4.0.14` - Validação de esquemas

### UI e Formulários  
- **React Hook Form** `7.62.0` - Formulários performáticos
- **Lucide React** - Ícones modernos
- **Class Variance Authority** - Componentes com variantes

### Gráficos e Exportação
- **Recharts** `3.1.1` - Gráficos responsivos
- **jsPDF** - Geração de PDFs
- **FileSaver.js** - Download de arquivos
- **html2canvas** - Captura de elementos

## 🌟 Diferenciais da Modernização

### Antes (Legado)
- React 16 com class components
- Redux complexo com boilerplate
- JavaScript puro sem tipagem
- CSS tradicional
- Funcionalidades básicas

### Depois (Moderno)
- React 19 com hooks otimizados
- Zustand simples e poderoso
- TypeScript com segurança total
- Tailwind CSS responsivo
- Funcionalidades avançadas (gráficos, export, categorias)

## 🚀 Performance e Otimização

- **Bundle otimizado** com Next.js
- **Code splitting** automático
- **Lazy loading** de componentes pesados
- **Caching inteligente** de requisições de câmbio
- **Persistência local** eficiente

## 📱 Responsividade

- **Mobile First** - Funciona perfeitamente em celulares
- **Tablet otimizado** - Layout adaptado para tablets  
- **Desktop completo** - Máximo aproveitamento de tela
- **Componentes flexíveis** - Se adaptam a qualquer resolução

## 🔐 Segurança e Validação

- **Validação client-side** com Zod
- **TypeScript** previne erros em tempo de compilação
- **Sanitização de inputs** para prevenção de XSS
- **Estado imutável** com Immer

## 🎯 Próximos Passos

- [ ] Temas escuro/claro
- [ ] PWA (Progressive Web App)
- [ ] Sincronização em nuvem
- [ ] Relatórios avançados
- [ ] API própria para dados

## 🤝 Contribuições

Este projeto representa uma modernização completa, mantendo a essência do TrybeWallet original enquanto adiciona funcionalidades modernas e uma experiência de usuário superior.

---

**TrybeWallet Next.js v2.0.0** - Construído com ❤️ e tecnologias modernas
