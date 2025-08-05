import jsPDF from 'jspdf'
import { saveAs } from 'file-saver'

import { type Expense } from '@/stores/walletStore'
import { formatCurrency, formatDate } from '@/lib/utils'

export interface ExportOptions {
  format: 'pdf' | 'csv' | 'json'
  filename?: string
  includeCharts?: boolean
}

export class DataExporter {
  static exportExpenses(expenses: Expense[], options: ExportOptions = { format: 'pdf' }) {
    const filename = options.filename || `despesas-${new Date().toISOString().split('T')[0]}`
    
    switch (options.format) {
      case 'pdf':
        this.exportToPDF(expenses, filename)
        break
      case 'csv':
        this.exportToCSV(expenses, filename)
        break
      case 'json':
        this.exportToJSON(expenses, filename)
        break
      default:
        throw new Error('Formato não suportado')
    }
  }

  private static exportToPDF(expenses: Expense[], filename: string) {
    const doc = new jsPDF()
    
    // Título
    doc.setFontSize(20)
    doc.text('Relatório de Despesas - TrybeWallet', 20, 20)
    
    // Data de geração
    doc.setFontSize(12)
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 20, 35)
    
    // Resumo
    const total = expenses.reduce((sum, exp) => sum + (exp.convertedValue || exp.value), 0)
    doc.text(`Total de despesas: ${expenses.length}`, 20, 50)
    doc.text(`Valor total: ${formatCurrency(total)}`, 20, 60)
    
    // Lista de despesas (substituindo a tabela)
    let yPosition = 80
    
    expenses.forEach((expense, index) => {
      if (yPosition > 270) { // Nova página se necessário
        doc.addPage()
        yPosition = 20
      }
      
      doc.setFontSize(10)
      doc.text(`${index + 1}. ${expense.description}`, 20, yPosition)
      doc.text(`Categoria: ${expense.tag}`, 30, yPosition + 10)
      doc.text(`Valor: ${formatCurrency(expense.value, expense.currency)}`, 30, yPosition + 20)
      doc.text(`Método: ${expense.method}`, 30, yPosition + 30)
      doc.text(`Data: ${formatDate(expense.createdAt)}`, 30, yPosition + 40)
      
      yPosition += 55
    })

    // Salvar
    doc.save(`${filename}.pdf`)
  }

  private static exportToCSV(expenses: Expense[], filename: string) {
    const headers = [
      'Descrição',
      'Categoria', 
      'Método de Pagamento',
      'Valor Original',
      'Moeda',
      'Valor em BRL',
      'Taxa de Câmbio',
      'Data de Criação'
    ]

    const csvData = expenses.map(expense => [
      expense.description,
      expense.tag,
      expense.method,
      expense.value.toString(),
      expense.currency,
      (expense.convertedValue || expense.value).toString(),
      expense.exchangeRates && expense.exchangeRates[expense.currency] 
        ? expense.exchangeRates[expense.currency].ask.toString()
        : '1',
      expense.createdAt.toISOString()
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `${filename}.csv`)
  }

  private static exportToJSON(expenses: Expense[], filename: string) {
    const exportData = {
      exportedAt: new Date().toISOString(),
      totalExpenses: expenses.length,
      totalValue: expenses.reduce((sum, exp) => sum + (exp.convertedValue || exp.value), 0),
      expenses: expenses.map(expense => ({
        id: expense.id,
        description: expense.description,
        value: expense.value,
        currency: expense.currency,
        convertedValue: expense.convertedValue,
        method: expense.method,
        category: expense.tag,
        exchangeRates: expense.exchangeRates,
        createdAt: expense.createdAt.toISOString()
      }))
    }

    const jsonContent = JSON.stringify(exportData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    saveAs(blob, `${filename}.json`)
  }

  static exportChart(chartElement: HTMLElement, filename: string = 'grafico') {
    // Implementação para exportar gráficos usando html2canvas
    import('html2canvas').then(html2canvas => {
      html2canvas.default(chartElement).then(canvas => {
        canvas.toBlob(blob => {
          if (blob) {
            saveAs(blob, `${filename}.png`)
          }
        })
      })
    })
  }

  static generateReport(expenses: Expense[]): string {
    const total = expenses.reduce((sum, exp) => sum + (exp.convertedValue || exp.value), 0)
    const categories = expenses.reduce((acc, exp) => {
      acc[exp.tag] = (acc[exp.tag] || 0) + (exp.convertedValue || exp.value)
      return acc
    }, {} as Record<string, number>)

    const mostExpensiveCategory = Object.entries(categories)
      .sort(([,a], [,b]) => b - a)[0]

    const averageExpense = total / expenses.length

    return `
RELATÓRIO DE DESPESAS - TRYBEWALLET

📊 RESUMO GERAL
• Total de despesas: ${expenses.length}
• Valor total gasto: ${formatCurrency(total)}
• Valor médio por despesa: ${formatCurrency(averageExpense)}

📈 CATEGORIA COM MAIOR GASTO
• ${mostExpensiveCategory?.[0] || 'N/A'}: ${formatCurrency(mostExpensiveCategory?.[1] || 0)}

💰 BREAKDOWN POR CATEGORIA
${Object.entries(categories)
  .sort(([,a], [,b]) => b - a)
  .map(([cat, val]) => `• ${cat}: ${formatCurrency(val)}`)
  .join('\n')}

📅 Relatório gerado em: ${new Date().toLocaleString('pt-BR')}
    `.trim()
  }
}
