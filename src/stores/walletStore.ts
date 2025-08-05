import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Tipos TypeScript
export interface Expense {
  id: string
  description: string
  value: number
  currency: string
  method: string
  tag: string
  exchangeRates?: Record<string, { ask: string; bid: string }>
  convertedValue?: number
  createdAt: Date
}

export interface User {
  email: string
  isLoggedIn: boolean
}

interface WalletState {
  // Estado do usuário
  user: User
  
  // Estado das despesas
  expenses: Expense[]
  
  // Estado da UI
  isLoading: boolean
  error: string | null
  
  // Moedas disponíveis
  currencies: string[]
  
  // Categorias
  categories: string[]
  customCategories: string[]
}

interface WalletActions {
  // Ações do usuário
  login: (email: string) => void
  logout: () => void
  
  // Ações das despesas
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void
  removeExpense: (id: string) => void
  updateExpense: (id: string, updates: Partial<Expense>) => void
  
  // Ações das categorias
  addCustomCategory: (category: string) => void
  removeCustomCategory: (category: string) => void
  
  // Ações da UI
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Utilitários
  getTotalExpenses: () => number
  getExpensesByCategory: (category: string) => Expense[]
  getExpensesByDateRange: (startDate: Date, endDate: Date) => Expense[]
  
  // Reset
  resetState: () => void
}

type WalletStore = WalletState & WalletActions

// Estado inicial
const initialState: WalletState = {
  user: {
    email: '',
    isLoggedIn: false,
  },
  expenses: [],
  isLoading: false,
  error: null,
  currencies: [
    'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY',
    'BTC', 'ETH', 'LTC', 'XRP', 'ARS', 'BRL'
  ],
  categories: [
    'Alimentação',
    'Lazer',
    'Trabalho',
    'Transporte',
    'Saúde',
    'Educação',
    'Casa',
    'Roupas',
    'Outros'
  ],
  customCategories: [],
}

// Helper function para calcular valor convertido
const calculateConvertedValue = (expense: Expense): number => {
  if (!expense.exchangeRates || !expense.exchangeRates[expense.currency]) {
    return expense.value
  }
  
  const rate = parseFloat(expense.exchangeRates[expense.currency].ask)
  return expense.value * rate
}

export const useWalletStore = create<WalletStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // Ações do usuário
        login: (email: string) => {
          set((state) => {
            state.user.email = email
            state.user.isLoggedIn = true
            state.error = null
          })
        },
        
        logout: () => {
          set((state) => {
            state.user.email = ''
            state.user.isLoggedIn = false
          })
        },
        
        // Ações das despesas
        addExpense: (expenseData) => {
          set((state) => {
            const expense: Expense = {
              ...expenseData,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              convertedValue: calculateConvertedValue({
                ...expenseData,
                id: '',
                createdAt: new Date(),
              }),
            }
            state.expenses.push(expense)
            state.error = null
          })
        },
        
        removeExpense: (id: string) => {
          set((state) => {
            state.expenses = state.expenses.filter(expense => expense.id !== id)
          })
        },
        
        updateExpense: (id: string, updates: Partial<Expense>) => {
          set((state) => {
            const index = state.expenses.findIndex(expense => expense.id === id)
            if (index !== -1) {
              const updatedExpense = { ...state.expenses[index], ...updates }
              updatedExpense.convertedValue = calculateConvertedValue(updatedExpense)
              state.expenses[index] = updatedExpense
            }
          })
        },
        
        // Ações das categorias
        addCustomCategory: (category: string) => {
          set((state) => {
            if (!state.customCategories.includes(category) && 
                !state.categories.includes(category)) {
              state.customCategories.push(category)
            }
          })
        },
        
        removeCustomCategory: (category: string) => {
          set((state) => {
            state.customCategories = state.customCategories.filter(cat => cat !== category)
          })
        },
        
        // Ações da UI
        setLoading: (loading: boolean) => {
          set((state) => {
            state.isLoading = loading
          })
        },
        
        setError: (error: string | null) => {
          set((state) => {
            state.error = error
          })
        },
        
        // Utilitários
        getTotalExpenses: () => {
          const { expenses } = get()
          return expenses.reduce((total, expense) => {
            return total + (expense.convertedValue || calculateConvertedValue(expense))
          }, 0)
        },
        
        getExpensesByCategory: (category: string) => {
          const { expenses } = get()
          return expenses.filter(expense => expense.tag === category)
        },
        
        getExpensesByDateRange: (startDate: Date, endDate: Date) => {
          const { expenses } = get()
          return expenses.filter(expense => {
            const expenseDate = new Date(expense.createdAt)
            return expenseDate >= startDate && expenseDate <= endDate
          })
        },
        
        // Reset
        resetState: () => {
          set(initialState)
        },
      })),
      {
        name: 'trybewallet-storage',
        partialize: (state) => ({
          user: state.user,
          expenses: state.expenses,
          customCategories: state.customCategories,
        }),
      }
    ),
    { name: 'TrybeWallet Store' }
  )
)
