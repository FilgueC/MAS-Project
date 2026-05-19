import { Users, Search, Filter, Plus, Edit, Trash2, Mail, Phone, Shield } from "lucide-react";

const mockUsers = [
  { id: 1, nome: "John Silva", email: "john@loop.pt", telefone: "+351 912 345 678", tipo: "Cliente", registado: "15/01/2024", encomendas: 2, gasto: 2477, ativo: true },
  { id: 2, nome: "Administrador LOOP", email: "admin@loop.pt", telefone: "+351 900 000 000", tipo: "Admin", registado: "01/01/2024", encomendas: 0, gasto: 0, ativo: true },
  { id: 3, nome: "TechRenew Lisboa", email: "partner@techrenew.pt", telefone: "+351 210 123 456", tipo: "Parceiro", registado: "10/02/2024", encomendas: 187, gasto: 48750, ativo: true },
  { id: 4, nome: "Sofia Lima", email: "sofia.lima@email.pt", telefone: "+351 913 456 789", tipo: "Cliente", registado: "23/04/2026", encomendas: 1, gasto: 1299, ativo: true },
  { id: 5, nome: "Maria Santos", email: "maria.santos@email.pt", telefone: "+351 914 567 890", tipo: "Cliente", registado: "22/04/2026", encomendas: 1, gasto: 549, ativo: true },
  { id: 6, nome: "Pedro Costa", email: "pedro.costa@email.pt", telefone: "+351 915 678 901", tipo: "Cliente", registado: "21/04/2026", encomendas: 1, gasto: 1178, ativo: true },
  { id: 7, nome: "Ana Ferreira", email: "ana.ferreira@email.pt", telefone: "+351 916 789 012", tipo: "Cliente", registado: "21/04/2026", encomendas: 1, gasto: 1149, ativo: true },
  { id: 8, nome: "Carlos Mendes", email: "carlos.mendes@email.pt", telefone: "+351 917 890 123", tipo: "Cliente", registado: "20/04/2026", encomendas: 1, gasto: 699, ativo: true },
];

function UserTypeBadge({ tipo }: { tipo: string }) {
  const styles: Record<string, string> = {
    Cliente: "bg-blue-100 text-blue-800 border border-blue-200",
    Admin: "bg-purple-100 text-purple-800 border border-purple-200",
    Parceiro: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${styles[tipo] ?? "bg-gray-100 text-gray-700"}`}>
      {tipo}
    </span>
  );
}

export function AdminUsers() {
  const totalUsers = mockUsers.length;
  const clients = mockUsers.filter(u => u.tipo === "Cliente").length;
  const partners = mockUsers.filter(u => u.tipo === "Parceiro").length;
  const admins = mockUsers.filter(u => u.tipo === "Admin").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 text-2xl">Gestão de Utilizadores</h1>
          <p className="text-gray-500 text-sm mt-1">
            {totalUsers} utilizadores registados
          </p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors">
          <Plus className="w-4 h-4" />
          Adicionar Utilizador
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Utilizadores</p>
              <p className="text-gray-900 text-xl">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Clientes</p>
              <p className="text-gray-900 text-xl">{clients}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Parceiros</p>
              <p className="text-gray-900 text-xl">{partners}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Administradores</p>
              <p className="text-gray-900 text-xl">{admins}</p>
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
              placeholder="Pesquisar utilizadores..."
              className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-gray-700">
            <Filter className="w-4 h-4" />
            Filtrar por Tipo
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Utilizador
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Registado
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Encomendas
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Gasto Total
                </th>
                <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm flex-shrink-0">
                        {user.nome.charAt(0)}
                      </div>
                      <span className="text-gray-800 text-sm">{user.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">{user.telefone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <UserTypeBadge tipo={user.tipo} />
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-500 text-sm">{user.registado}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-900 text-sm">{user.encomendas}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-gray-900 text-sm">
                      €{user.gasto.toLocaleString("pt-PT")}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
