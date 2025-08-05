'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Wallet, LogIn } from 'lucide-react'

import { useWalletStore } from '@/stores/walletStore'
import { loginSchema, type LoginFormData } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { login } = useWalletStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: LoginFormData) => {
    login(data.email)
    router.push('/dashboard')
  }

  const handleLegacyAccess = () => {
    window.open('/legado', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full mb-4">
            <Wallet size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TrybeWallet</h1>
          <p className="text-gray-600">Gerencie suas finanças com inteligência</p>
        </div>

        {/* Card de Login */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className={cn(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-gray-900 bg-white placeholder-gray-400',
                  errors.email ? 'border-red-500' : 'border-gray-300'
                )}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  className={cn(
                    'w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-gray-900 bg-white placeholder-gray-400',
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Botão de Login */}
            <Button
              type="submit"
              disabled={!isValid}
              className="w-full wallet-gradient hover:opacity-90 transition-opacity h-11 rounded-md px-8"
            >
              <LogIn className="mr-2" size={20} />
              Entrar
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="px-4 text-sm text-gray-500">ou</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          {/* Acesso à versão legado */}
          <Button
            type="button"
            onClick={handleLegacyAccess}
            className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900"
          >
            <Wallet className="mr-2" size={20} />
            Acessar Versão Legado
          </Button>
        </div>

        {/* Features */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">✨ Versão moderna com:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Next.js</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">TypeScript</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Zustand</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Gráficos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
