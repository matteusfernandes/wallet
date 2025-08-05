'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, BarChart3, PieChart } from 'lucide-react'

import { useWalletStore } from '@/stores/walletStore'
import { Button } from '@/components/ui/button'
import ExpenseCharts from '@/components/ExpenseCharts'

export default function ChartsPage() {
  const router = useRouter()
  const { user } = useWalletStore()

  useEffect(() => {
    if (!user?.email || !user?.isLoggedIn) {
      router.push('/')
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button className="mr-4 bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <ArrowLeft size={16} className="mr-2" />
                  Voltar
                </Button>
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-3">
                  <BarChart3 size={20} />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Gráficos e Análises</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Análise Visual das Suas Despesas
          </h2>
          <p className="text-gray-600">
            Visualize seus gastos através de gráficos interativos e estatísticas detalhadas.
          </p>
        </div>

        <ExpenseCharts />
      </main>
    </div>
  )
}
