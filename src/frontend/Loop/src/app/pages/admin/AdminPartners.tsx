import { Handshake, Search, Filter, Plus, Edit, Eye, Star, TrendingUp, Euro, Package } from "lucide-react";

const mockPartners = [
  {
    id: 1,
    nome: "TechRenew Lisboa",
    email: "partner@techrenew.pt",
    pais: "Portugal",
    cidade: "Lisboa",
    registado: "10/02/2024",
    produtos: 45,
    vendas: 187,
    receita: 48750,
    rating: 4.8,
    avaliacoes: 247,
    ativo: true,
  },
];

export function AdminPartners() {
  const totalPartners = mockPartners.length;
  const activePartners = mockPartners.filter(p => p.ativo).length;
  const totalRevenue = mockPartners.reduce((sum, p) => sum + p.receita, 0);
  const totalProducts = mockPartners.reduce((sum, p) => sum + p.produtos, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl">Gestão de Parceiros</h1>
          <p className="text-gray-500 text-sm mt-1">
            {totalPartners} parceiro ativo na plataforma
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Parceiro
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Handshake className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Parceiros Ativos</p>
              <p className="text-gray-900 text-xl">{activePartners}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
              <Euro className="w-5 h-5 text-violet-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Receita Total</p>
              <p className="text-gray-900 text-xl">€{totalRevenue.toLocaleString("pt-PT")}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Produtos Listados</p>
              <p className="text-gray-900 text-xl">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Rating Médio</p>
              <p className="text-gray-900 text-xl">
                {(mockPartners.reduce((sum, p) => sum + p.rating, 0) / mockPartners.length).toFixed(1)} ★
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar parceiros..."
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Parceiro
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Produtos
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Vendas
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Receita
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Registado
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockPartners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-gray-800 text-sm">{partner.nome}</p>
                      <p className="text-gray-500 text-xs">{partner.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-gray-800 text-sm">{partner.cidade}</p>
                      <p className="text-gray-500 text-xs">{partner.pais}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-900 text-sm">{partner.produtos}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-900 text-sm">{partner.vendas}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-900 text-sm">
                      €{partner.receita.toLocaleString("pt-PT")}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-gray-900 text-sm">{partner.rating}</span>
                      <span className="text-gray-500 text-xs">({partner.avaliacoes})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-500 text-sm">{partner.registado}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    {partner.ativo ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Ativo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200">
                        Inativo
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Performance Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-gray-900 text-base mb-4">Desempenho do Parceiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-gray-500 text-sm mb-1">Taxa de Conversão</p>
            <p className="text-gray-900 text-2xl">3.6%</p>
            <p className="text-xs text-emerald-600 mt-1">+0.4% vs. média</p>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-gray-500 text-sm mb-1">Tempo Médio de Resposta</p>
            <p className="text-gray-900 text-2xl">2.3h</p>
            <p className="text-xs text-emerald-600 mt-1">-1.2h vs. média</p>
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
            <p className="text-gray-500 text-sm mb-1">Taxa de Devolução</p>
            <p className="text-gray-900 text-2xl">1.8%</p>
            <p className="text-xs text-emerald-600 mt-1">-1.5% vs. média</p>
          </div>
        </div>
      </div>
    </div>
  );
}
