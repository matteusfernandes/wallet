import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utilitário para merge de classes Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mapeamento de símbolos de moedas
const currencySymbols: Record<string, string> = {
  'BRL': 'R$',
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥',
  'CAD': 'C$',
  'AUD': 'A$',
  'CHF': 'CHF',
  'CNY': '¥',
  'BTC': '₿',
  'ETH': 'Ξ',
  'LTC': 'Ł',
  'XRP': 'XRP',
  'ARS': '$',
}

// Mapeamento de códigos de moeda para Intl.NumberFormat
const currencyCodeMapping: Record<string, string> = {
  'BRL': 'BRL',
  'USD': 'USD',
  'EUR': 'EUR',
  'GBP': 'GBP',
  'JPY': 'JPY',
  'CAD': 'CAD',
  'AUD': 'AUD',
  'CHF': 'CHF',
  'CNY': 'CNY',
  'ARS': 'ARS',
  // Criptomoedas usam formatação personalizada
  'BTC': 'USD',
  'ETH': 'USD',
  'LTC': 'USD',
  'XRP': 'USD',
}

// Formatador de moeda
export function formatCurrency(value: number, currency: string = 'BRL'): string {
  // Para criptomoedas, usar formatação personalizada
  if (['BTC', 'ETH', 'LTC', 'XRP'].includes(currency)) {
    const symbol = currencySymbols[currency] || currency
    return `${symbol} ${value.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    })}`
  }

  // Para moedas tradicionais, usar Intl.NumberFormat
  const mappedCurrency = currencyCodeMapping[currency] || 'USD'
  
  try {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: mappedCurrency,
    }).format(value)
  } catch (error) {
    // Fallback para moedas não suportadas pelo Intl
    const symbol = currencySymbols[currency] || currency
    return `${symbol} ${value.toLocaleString('pt-BR', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`
  }
}

// Função para obter apenas o símbolo da moeda
export function getCurrencySymbol(currency: string): string {
  return currencySymbols[currency] || currency
}

// Formatador de data
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

// Formatador de data e hora
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Validador de email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Gerador de cores para gráficos
export function generateColors(count: number): string[] {
  const colors = [
    '#3B82F6', // blue-500
    '#EF4444', // red-500
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#8B5CF6', // violet-500
    '#06B6D4', // cyan-500
    '#F97316', // orange-500
    '#84CC16', // lime-500
    '#EC4899', // pink-500
    '#6B7280', // gray-500
  ]
  
  // Se precisar de mais cores, gera dinamicamente
  while (colors.length < count) {
    const hue = (colors.length * 137.5) % 360 // Golden angle approximation
    colors.push(`hsl(${hue}, 70%, 50%)`)
  }
  
  return colors.slice(0, count)
}

// Função para download de arquivos
export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
