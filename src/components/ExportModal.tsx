'use client'

import { useState } from 'react'
import { Download, FileText, File, Code, X } from 'lucide-react'

import { useWalletStore } from '@/stores/walletStore'
import { Button } from '@/components/ui/button'
import { DataExporter, type ExportOptions } from '@/lib/export'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { expenses } = useWalletStore()
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'json'>('pdf')
  const [customFilename, setCustomFilename] = useState('')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (expenses.length === 0) {
      alert('Não há despesas para exportar!')
      return
    }

    setIsExporting(true)
    
    try {
      const options: ExportOptions = {
        format: selectedFormat,
        filename: customFilename || undefined,
      }
      
      DataExporter.exportExpenses(expenses, options)
      
      // Feedback visual
      setTimeout(() => {
        setIsExporting(false)
        onClose()
      }, 1000)
      
    } catch (error) {
      console.error('Erro ao exportar:', error)
      alert('Erro ao exportar dados. Tente novamente.')
      setIsExporting(false)
    }
  }

  const formatOptions = [
    {
      value: 'pdf' as const,
      label: 'PDF',
      description: 'Documento formatado com tabelas',
      icon: FileText,
      color: 'text-red-600',
    },
    {
      value: 'csv' as const,
      label: 'CSV',
      description: 'Planilha compatível com Excel',
      icon: File,
      color: 'text-green-600',
    },
    {
      value: 'json' as const,
      label: 'JSON',
      description: 'Dados estruturados para desenvolvedores',
      icon: Code,
      color: 'text-blue-600',
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Exportar Dados</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isExporting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>{expenses.length}</strong> despesas serão exportadas
            </p>
          </div>

          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Formato de Exportação
            </label>
            <div className="space-y-3">
              {formatOptions.map((option) => {
                const Icon = option.icon
                return (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedFormat === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="format"
                      value={option.value}
                      checked={selectedFormat === option.value}
                      onChange={(e) => setSelectedFormat(e.target.value as any)}
                      className="sr-only"
                    />
                    <Icon className={`w-5 h-5 mr-3 ${option.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                    {selectedFormat === option.value && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </label>
                )
              })}
            </div>
          </div>

          {/* Custom Filename */}
          <div>
            <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-2">
              Nome do Arquivo (Opcional)
            </label>
            <input
              id="filename"
              type="text"
              placeholder={`despesas-${new Date().toISOString().split('T')[0]}`}
              value={customFilename}
              onChange={(e) => setCustomFilename(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white placeholder-gray-400"
              disabled={isExporting}
            />
            <p className="mt-1 text-xs text-gray-500">
              A extensão será adicionada automaticamente
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleExport}
              disabled={isExporting || expenses.length === 0}
              className="flex-1 wallet-gradient hover:opacity-90 transition-opacity"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="mr-2" size={16} />
                  Exportar {selectedFormat.toUpperCase()}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
