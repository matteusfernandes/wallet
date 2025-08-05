'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart,
  Download,
  Settings,
  LogOut,
  Edit,
  Trash2,
  Tag
} from 'lucide-react'

import { useWalletStore } from '@/stores/walletStore'
import { useCurrencyStore } from '@/stores/currencyStore'
import { Button } from '@/components/ui/button'
import AddExpenseModal from '@/components/AddExpenseModal'
import ExportModal from '@/components/ExportModal'
import CategoryManager from '@/components/CategoryManager'
import { formatCurrency, formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const { 
    user, 
    expenses, 
    getTotalExpenses,
    isLoading,
    logout,
    removeExpense,
    setLoading 
  } = useWalletStore()
  
  const { exchangeRates, fetchExchangeRates } = useCurrencyStore()
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)

  useEffect(() => {
    if (!user?.email || !user?.isLoggedIn) {
      router.push('/')
      return
    }
    
    fetchExchangeRates()
  }, [user, fetchExchangeRates, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleAddExpense = () => {
    setShowAddExpense(true)
  }

  const handleEditExpense = (id: string) => {
    // TODO: Implementar edição
    console.log('Edit expense:', id)
  }

  const handleDeleteExpense = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta despesa?')) {
      removeExpense(id)
    }
  }

  const handleExportData = () => {
    setShowExportModal(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-3">
                  <DollarSign size={20} />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">TrybeWallet</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowCategoryManager(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Tag size={16} className="mr-2" />
                Categorias
              </Button>
              <span className="text-sm text-gray-600">
                Olá, {user?.email}
              </span>
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total de Gastos */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Gastos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(getTotalExpenses())}
                </p>
              </div>
            </div>
          </div>

          {/* Número de Transações */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PieChart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Transações</p>
                <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
              </div>
            </div>
          </div>

          {/* Câmbio */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">USD/BRL</p>
                <p className="text-2xl font-bold text-gray-900">
                  {exchangeRates.USD ? formatCurrency(parseFloat(exchangeRates.USD.ask), 'BRL') : '...'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Suas Despesas</h2>
          <div className="flex space-x-3">
            <Link href="/charts">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                <PieChart size={16} className="mr-2" />
                Gráficos
              </Button>
            </Link>
            <Button
              onClick={handleExportData}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              <Download size={16} className="mr-2" />
              Exportar
            </Button>
            <Button
              onClick={handleAddExpense}
              className="wallet-gradient hover:opacity-90"
            >
              <Plus size={16} className="mr-2" />
              Nova Despesa
            </Button>
          </div>
        </div>

        {/* Tabela de Despesas */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {expenses.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhuma despesa cadastrada
              </h3>
              <p className="text-gray-500 mb-6">
                Comece adicionando sua primeira despesa para acompanhar seus gastos.
              </p>
              <Button
                onClick={handleAddExpense}
                className="wallet-gradient hover:opacity-90"
              >
                <Plus size={16} className="mr-2" />
                Adicionar Primeira Despesa
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tag
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Método
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Moeda
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Câmbio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor Convertido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses.map((expense) => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expense.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {expense.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(expense.value, expense.currency)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.currency}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {expense.exchangeRates && expense.exchangeRates[expense.currency] 
                          ? formatCurrency(parseFloat(expense.exchangeRates[expense.currency].ask), 'BRL') 
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {expense.convertedValue 
                          ? formatCurrency(expense.convertedValue, 'BRL')
                          : formatCurrency(expense.value, 'BRL')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditExpense(expense.id)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AddExpenseModal 
        isOpen={showAddExpense} 
        onClose={() => setShowAddExpense(false)} 
      />
      
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />

      <CategoryManager
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
      />
    </div>
  )
}
