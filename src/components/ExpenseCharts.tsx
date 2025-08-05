'use client'

import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import { useWalletStore } from '@/stores/walletStore'
import { formatCurrency, generateColors } from '@/lib/utils'

interface ExpenseChartsProps {
  className?: string
}

export default function ExpenseCharts({ className }: ExpenseChartsProps) {
  const { expenses } = useWalletStore()

  // Dados para gráfico de pizza por categoria
  const categoryData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      const value = expense.convertedValue || expense.value
      acc[expense.tag] = (acc[expense.tag] || 0) + value
      return acc
    }, {} as Record<string, number>)

    return Object.entries(categoryTotals)
      .map(([category, total]) => ({
        name: category,
        value: total,
        formattedValue: formatCurrency(total),
      }))
      .sort((a, b) => b.value - a.value)
  }, [expenses])

  // Dados para gráfico de barras por mês
  const monthlyData = useMemo(() => {
    const monthlyTotals = expenses.reduce((acc, expense) => {
      const date = new Date(expense.createdAt)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      const monthName = date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' })
      
      const value = expense.convertedValue || expense.value
      
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthName, total: 0 }
      }
      acc[monthKey].total += value
      
      return acc
    }, {} as Record<string, { month: string; total: number }>)

    return Object.values(monthlyTotals)
      .sort((a, b) => a.month.localeCompare(b.month))
  }, [expenses])

  // Cores para os gráficos
  const colors = generateColors(Math.max(categoryData.length, monthlyData.length))

  // Custom tooltip para valores formatados
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-gray-900 font-medium">{label}</p>
          <p className="text-primary">
            {`Valor: ${formatCurrency(payload[0].value)}`}
          </p>
        </div>
      )
    }
    return null
  }

  if (expenses.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gráficos de Despesas</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>Adicione algumas despesas para ver os gráficos</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gráfico de Pizza - Despesas por Categoria */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Despesas por Categoria
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} (${((percent || 0) * 100).toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Barras - Despesas por Mês */}
      {monthlyData.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Despesas por Mês
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="total" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Estatísticas Resumidas */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Estatísticas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Categoria com mais gastos</p>
            <p className="text-lg font-semibold text-gray-900">
              {categoryData[0]?.name || 'N/A'}
            </p>
            <p className="text-sm text-gray-500">
              {categoryData[0]?.formattedValue || 'R$ 0,00'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Média por despesa</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatCurrency(
                expenses.reduce((sum, exp) => sum + (exp.convertedValue || exp.value), 0) / expenses.length
              )}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total de categorias</p>
            <p className="text-lg font-semibold text-gray-900">
              {categoryData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
