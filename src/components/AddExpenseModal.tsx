'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save } from 'lucide-react'

import { useWalletStore } from '@/stores/walletStore'
import { useCurrencyStore } from '@/stores/currencyStore'
import { expenseSchema, type ExpenseFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AddExpenseModalProps {
  isOpen: boolean
  onClose: () => void
  editingExpenseId?: string | null
}

export default function AddExpenseModal({ isOpen, onClose, editingExpenseId }: AddExpenseModalProps) {
  const { addExpense, updateExpense, expenses, categories, customCategories } = useWalletStore()
  const { exchangeRates, fetchExchangeRates } = useCurrencyStore()
  
  const [selectedCurrency, setSelectedCurrency] = useState('BRL')
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      currency: 'BRL',
      method: 'Dinheiro',
      tag: 'Alimentação',
    },
  })

  const watchedCurrency = watch('currency')

  // Encontrar a despesa sendo editada
  const editingExpense = editingExpenseId 
    ? expenses.find(expense => expense.id === editingExpenseId)
    : null

  // Popular o formulário quando estiver editando
  useEffect(() => {
    if (editingExpense) {
      reset({
        description: editingExpense.description,
        value: editingExpense.value,
        currency: editingExpense.currency,
        method: editingExpense.method,
        tag: editingExpense.tag,
      })
    }
  }, [editingExpense, reset])

  useEffect(() => {
    if (watchedCurrency !== 'BRL') {
      fetchExchangeRates()
    }
  }, [watchedCurrency, fetchExchangeRates])

  const onSubmit = (data: ExpenseFormData) => {
    const expenseData = {
      ...data,
      exchangeRates: watchedCurrency !== 'BRL' ? exchangeRates : undefined,
    }
    
    if (editingExpenseId && editingExpense) {
      // Editar despesa existente
      updateExpense(editingExpenseId, expenseData)
    } else {
      // Adicionar nova despesa
      addExpense(expenseData)
    }
    
    reset()
    onClose()
  }

  const allCategories = [...categories, ...customCategories]

  const currencies = [
    'BRL', 'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY',
    'BTC', 'ETH', 'LTC', 'XRP', 'ARS'
  ]

  const paymentMethods = [
    'Dinheiro',
    'Cartão de crédito',
    'Cartão de débito',
    'PIX',
    'Transferência bancária',
    'Boleto',
    'Outros'
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingExpenseId ? 'Editar Despesa' : 'Nova Despesa'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <input
              id="description"
              type="text"
              placeholder="Ex: Almoço no restaurante"
              className={cn(
                'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white placeholder-gray-400',
                errors.description ? 'border-red-500' : 'border-gray-300'
              )}
              {...register('description')}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              Valor *
            </label>
            <input
              id="value"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className={cn(
                'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white placeholder-gray-400',
                errors.value ? 'border-red-500' : 'border-gray-300'
              )}
              {...register('value', { valueAsNumber: true })}
            />
            {errors.value && (
              <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
            )}
          </div>

          {/* Moeda */}
          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
              Moeda *
            </label>
            <select
              id="currency"
              className={cn(
                'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white',
                errors.currency ? 'border-red-500' : 'border-gray-300'
              )}
              {...register('currency')}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            {errors.currency && (
              <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
            )}
          </div>

          {/* Método de Pagamento */}
          <div>
            <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
              Método de Pagamento *
            </label>
            <select
              id="method"
              className={cn(
                'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white',
                errors.method ? 'border-red-500' : 'border-gray-300'
              )}
              {...register('method')}
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {errors.method && (
              <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>
            )}
          </div>

          {/* Categoria */}
          <div>
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              id="tag"
              className={cn(
                'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white',
                errors.tag ? 'border-red-500' : 'border-gray-300'
              )}
              {...register('tag')}
            >
              {allCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.tag && (
              <p className="mt-1 text-sm text-red-600">{errors.tag.message}</p>
            )}
          </div>

          {/* Taxa de câmbio info */}
          {watchedCurrency !== 'BRL' && exchangeRates[watchedCurrency] && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Taxa de câmbio {watchedCurrency}/BRL:</strong>{' '}
                R$ {parseFloat(exchangeRates[watchedCurrency].ask).toFixed(4)}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Atualizado em: {new Date(exchangeRates[watchedCurrency].create_date).toLocaleString('pt-BR')}
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="flex-1 wallet-gradient hover:opacity-90 transition-opacity"
            >
              <Save className="mr-2" size={16} />
              {editingExpenseId ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
