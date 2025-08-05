import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Tipos para as APIs de câmbio
export interface ExchangeRate {
  ask: string
  bid: string
  code: string
  codein: string
  create_date: string
  high: string
  low: string
  name: string
  pctChange: string
  timestamp: string
  varBid: string
}

export interface ExchangeRatesResponse {
  [key: string]: ExchangeRate
}

interface CurrencyState {
  exchangeRates: ExchangeRatesResponse
  lastUpdated: Date | null
  isLoading: boolean
  error: string | null
}

interface CurrencyActions {
  fetchExchangeRates: () => Promise<void>
  getConvertedValue: (value: number, currency: string) => number
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

type CurrencyStore = CurrencyState & CurrencyActions

const initialState: CurrencyState = {
  exchangeRates: {},
  lastUpdated: null,
  isLoading: false,
  error: null,
}

export const useCurrencyStore = create<CurrencyStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      fetchExchangeRates: async () => {
        const { lastUpdated } = get()
        
        // Cache por 5 minutos
        if (lastUpdated && Date.now() - lastUpdated.getTime() < 5 * 60 * 1000) {
          return
        }
        
        set({ isLoading: true, error: null })
        
        try {
          const response = await fetch('https://economia.awesomeapi.com.br/json/all')
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          
          const data: ExchangeRatesResponse = await response.json()
          
          set({
            exchangeRates: data,
            lastUpdated: new Date(),
            isLoading: false,
            error: null,
          })
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar cotações'
          
          set({
            isLoading: false,
            error: errorMessage,
          })
        }
      },
      
      getConvertedValue: (value: number, currency: string): number => {
        const { exchangeRates } = get()
        
        // Se for BRL, retorna o valor original
        if (currency === 'BRL') {
          return value
        }
        
        // Busca a taxa de câmbio
        const rate = exchangeRates[currency]
        if (!rate) {
          return value
        }
        
        return value * parseFloat(rate.ask)
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },
      
      setError: (error: string | null) => {
        set({ error })
      },
    }),
    { name: 'Currency Store' }
  )
)
