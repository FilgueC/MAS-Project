import { Settings, Save, Bell, Shield, Mail, Globe, Palette, Database } from "lucide-react";

export function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl">Configurações da Plataforma</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gerir as configurações gerais do marketplace
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors">
          <Save className="w-4 h-4" />
          Guardar Alterações
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base">Configurações Gerais</h2>
              <p className="text-gray-500 text-sm">Informações básicas da plataforma</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nome da Plataforma
              </label>
              <input
                type="text"
                defaultValue="LOOP Marketplace"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email de Contacto
              </label>
              <input
                type="email"
                defaultValue="contacto@loop.pt"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Telefone de Suporte
              </label>
              <input
                type="tel"
                defaultValue="+351 210 000 000"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base">Configurações de Envio</h2>
              <p className="text-gray-500 text-sm">Taxas e opções de entrega</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Taxa de Envio Base
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                <input
                  type="number"
                  defaultValue="5.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Valor Mínimo para Envio Grátis
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                <input
                  type="number"
                  defaultValue="50.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Prazo de Entrega (dias úteis)
              </label>
              <input
                type="number"
                defaultValue="3-5"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Commission Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-violet-700" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base">Comissões</h2>
              <p className="text-gray-500 text-sm">Taxas cobradas aos parceiros</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Comissão por Venda (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  defaultValue="20"
                  step="0.1"
                  className="w-full pr-8 pl-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Taxa de Listagem Mensal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                <input
                  type="number"
                  defaultValue="29.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Nota:</strong> Alterações nas taxas de comissão só se aplicam a novos parceiros.
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base">Notificações</h2>
              <p className="text-gray-500 text-sm">Preferências de alertas</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Novas encomendas</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Novos parceiros</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Estoque baixo</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Devoluções</span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
            </label>
          </div>
        </div>

        {/* Warranty Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base">Garantia</h2>
              <p className="text-gray-500 text-sm">Opções de garantia dos produtos</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Garantia Base (meses)
              </label>
              <input
                type="number"
                defaultValue="24"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Garantia Estendida (meses)
              </label>
              <input
                type="number"
                defaultValue="36"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Custo Garantia Estendida
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                <input
                  type="number"
                  defaultValue="49.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-pink-700" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base">Aparência</h2>
              <p className="text-gray-500 text-sm">Personalização da plataforma</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Cor Principal
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  defaultValue="#059669"
                  className="w-12 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#059669"
                  className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Modo de Tema
              </label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm">
                <option>Claro</option>
                <option>Escuro</option>
                <option>Automático</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
