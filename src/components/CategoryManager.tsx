'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash2, Tag, X } from 'lucide-react'

import { useWalletStore } from '@/stores/walletStore'
import { Button } from '@/components/ui/button'
import { customCategorySchema, type CustomCategoryFormData } from '@/lib/schemas'
import { cn } from '@/lib/utils'

interface CategoryManagerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CategoryManager({ isOpen, onClose }: CategoryManagerProps) {
  const { categories, customCategories, addCustomCategory, removeCustomCategory } = useWalletStore()
  const [isAdding, setIsAdding] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CustomCategoryFormData>({
    resolver: zodResolver(customCategorySchema),
  })

  const onSubmit = (data: CustomCategoryFormData) => {
    addCustomCategory(data.name)
    reset()
    setIsAdding(false)
  }

  const handleRemove = (category: string) => {
    if (confirm(`Tem certeza que deseja remover a categoria "${category}"?`)) {
      removeCustomCategory(category)
    }
  }

  const allCategories = [...categories, ...customCategories]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <Tag className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Gerenciar Categorias</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Categorias Padrão */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Categorias Padrão</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                >
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <Tag className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Categorias Personalizadas */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Categorias Personalizadas</h3>
              <Button
                onClick={() => setIsAdding(true)}
                className="wallet-gradient hover:opacity-90"
              >
                <Plus size={16} className="mr-2" />
                Nova Categoria
              </Button>
            </div>

            {/* Form para adicionar categoria */}
            {isAdding && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Nome da categoria"
                      className={cn(
                        'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 bg-white placeholder-gray-400',
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      )}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      disabled={!isValid}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Adicionar
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsAdding(false)
                        reset()
                      }}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Lista de categorias personalizadas */}
            {customCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {customCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <span className="text-sm font-medium text-green-800">{category}</span>
                    <button
                      onClick={() => handleRemove(category)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remover categoria"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Tag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhuma categoria personalizada criada</p>
                <p className="text-sm">Clique em "Nova Categoria" para começar</p>
              </div>
            )}
          </div>

          {/* Estatísticas */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Estatísticas</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{categories.length}</p>
                <p className="text-sm text-gray-600">Padrão</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{customCategories.length}</p>
                <p className="text-sm text-gray-600">Personalizadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{allCategories.length}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="wallet-gradient hover:opacity-90"
            >
              Concluído
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
