import { z } from 'zod'

// Schema para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Schema para despesas
export const expenseSchema = z.object({
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(100, 'Descrição muito longa'),
  value: z
    .number()
    .positive('Valor deve ser positivo')
    .max(999999, 'Valor muito alto'),
  currency: z
    .string()
    .min(1, 'Moeda é obrigatória'),
  method: z
    .string()
    .min(1, 'Método de pagamento é obrigatório'),
  tag: z
    .string()
    .min(1, 'Categoria é obrigatória'),
})

export type ExpenseFormData = z.infer<typeof expenseSchema>

// Schema para categorias personalizadas
export const customCategorySchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(30, 'Nome deve ter no máximo 30 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
})

export type CustomCategoryFormData = z.infer<typeof customCategorySchema>

// Schema para filtros de data
export const dateFilterSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
}).refine(
  (data) => data.startDate <= data.endDate,
  {
    message: 'Data inicial deve ser anterior à data final',
    path: ['endDate'],
  }
)

export type DateFilterFormData = z.infer<typeof dateFilterSchema>

// Constantes para select options
export const PAYMENT_METHODS = [
  { value: 'money', label: 'Dinheiro' },
  { value: 'credit_card', label: 'Cartão de crédito' },
  { value: 'debit_card', label: 'Cartão de débito' },
  { value: 'pix', label: 'PIX' },
  { value: 'bank_transfer', label: 'Transferência bancária' },
] as const

export const DEFAULT_CATEGORIES = [
  { value: 'food', label: 'Alimentação' },
  { value: 'leisure', label: 'Lazer' },
  { value: 'work', label: 'Trabalho' },
  { value: 'transport', label: 'Transporte' },
  { value: 'health', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'home', label: 'Casa' },
  { value: 'clothes', label: 'Roupas' },
  { value: 'others', label: 'Outros' },
] as const

export const CURRENCIES = [
  { value: 'USD', label: 'Dólar Americano (USD)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'GBP', label: 'Libra Esterlina (GBP)' },
  { value: 'JPY', label: 'Iene Japonês (JPY)' },
  { value: 'CAD', label: 'Dólar Canadense (CAD)' },
  { value: 'AUD', label: 'Dólar Australiano (AUD)' },
  { value: 'CHF', label: 'Franco Suíço (CHF)' },
  { value: 'CNY', label: 'Yuan Chinês (CNY)' },
  { value: 'BTC', label: 'Bitcoin (BTC)' },
  { value: 'ETH', label: 'Ethereum (ETH)' },
  { value: 'LTC', label: 'Litecoin (LTC)' },
  { value: 'XRP', label: 'Ripple (XRP)' },
  { value: 'ARS', label: 'Peso Argentino (ARS)' },
  { value: 'BRL', label: 'Real Brasileiro (BRL)' },
] as const
