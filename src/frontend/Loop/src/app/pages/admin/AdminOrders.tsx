import { ShoppingCart, Search, Filter, Eye, Download, Package } from "lucide-react";

const mockOrders = [
  { id: "ORD-2026-0128", cliente: "Sofia Lima", email: "sofia.lima@email.pt", produto: "Dell XPS 15", quantidade: 1, valor: 1299, estado: "Em Trânsito", data: "23/04/2026", parceiro: "RefurbPro Madrid" },
  { id: "ORD-2026-0127", cliente: "João Oliveira", email: "joao.oliveira@email.pt", produto: "AirPods Pro 2", quantidade: 1, valor: 249, estado: "Entregue", data: "22/04/2026", parceiro: "TechRenew Lisboa" },
  { id: "ORD-2026-0126", cliente: "Maria Santos", email: "maria.santos@email.pt", produto: "Samsung Galaxy S23", quantidade: 1, valor: 549, estado: "Devolvido", data: "22/04/2026", parceiro: "GreenTech Berlin" },
  { id: "ORD-2026-0125", cliente: "Pedro Costa", email: "pedro.costa@email.pt", produto: "iPad Pro 11\"", quantidade: 2, valor: 1178, estado: "Processamento", data: "21/04/2026", parceiro: "EcoGadgets Porto" },
  { id: "ORD-2026-0124", cliente: "Ana Ferreira", email: "ana.ferreira@email.pt", produto: "MacBook Air M3", quantidade: 1, valor: 1149, estado: "Em Trânsito", data: "21/04/2026", parceiro: "TechRenew Lisboa" },
  { id: "ORD-2026-0123", cliente: "Carlos Mendes", email: "carlos.mendes@email.pt", produto: "iPhone 14 Pro", quantidade: 1, valor: 699, estado: "Entregue", data: "20/04/2026", parceiro: "TechRenew Lisboa" },
  { id: "ORD-2026-0122", cliente: "Luísa Rocha", email: "luisa.rocha@email.pt", produto: "Apple Watch S9", quantidade: 1, valor: 359, estado: "Entregue", data: "20/04/2026", parceiro: "TechRenew Lisboa" },
  { id: "ORD-2026-0121", cliente: "Ricardo Alves", email: "ricardo.alves@email.pt", produto: "Sony WH-1000XM5", quantidade: 1, valor: 299, estado: "Processamento", data: "19/04/2026", parceiro: "EcoGadgets Porto" },
];

function OrderBadge({ estado }: { estado: string }) {
  const styles: Record<string, string> = {
    Entregue: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    "Em Trânsito": "bg-blue-100 text-blue-800 border border-blue-200",
    Processamento: "bg-amber-100 text-amber-800 border border-amber-200",
    Devolvido: "bg-red-100 text-red-800 border border-red-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${styles[estado] ?? "bg-gray-100 text-gray-700"}`}>
      {estado}
    </span>
  );
}

export function AdminOrders() {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.valor, 0);
  const delivered = mockOrders.filter(o => o.estado === "Entregue").length;
  const inTransit = mockOrders.filter(o => o.estado === "Em Trânsito").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl">Gestão de Encomendas</h1>
          <p className="text-gray-500 text-sm mt-1">
            {totalOrders} encomendas registadas
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Encomendas</p>
              <p className="text-gray-900 text-xl">{totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Em Trânsito</p>
              <p className="text-gray-900 text-xl">{inTransit}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Entregues</p>
              <p className="text-gray-900 text-xl">{delivered}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-violet-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Valor Total</p>
              <p className="text-gray-900 text-xl">€{totalRevenue.toLocaleString("pt-PT")}</p>
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
              placeholder="Pesquisar por ID, cliente ou produto..."
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700">
            <Filter className="w-4 h-4" />
            Filtrar por Estado
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  ID Encomenda
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Parceiro
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Qtd
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="text-emerald-700 text-sm font-mono">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-gray-800 text-sm">{order.cliente}</p>
                      <p className="text-gray-500 text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-600 text-sm">{order.produto}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-600 text-sm">{order.parceiro}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-900 text-sm">{order.quantidade}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-900 text-sm">
                      €{order.valor.toLocaleString("pt-PT")}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <OrderBadge estado={order.estado} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-500 text-sm">{order.data}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
