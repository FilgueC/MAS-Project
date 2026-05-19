import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Handshake,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
} from "recharts";

// ── Mock data ──────────────────────────────────────────────────────────────────

const transactionData = [
  { mes: "Jan", transacoes: 280, devolucoes: 18 },
  { mes: "Fev", transacoes: 310, devolucoes: 22 },
  { mes: "Mar", transacoes: 295, devolucoes: 17 },
  { mes: "Abr", transacoes: 362, devolucoes: 23 },
];

const categoryData = [
  { name: "Smartphones", value: 45 },
  { name: "Laptops", value: 30 },
  { name: "Tablets", value: 15 },
  { name: "Outros", value: 10 },
];

const DONUT_COLORS = ["#059669", "#064e3b", "#34d399", "#a7f3d0"];

const recentOrders = [
  {
    id: "ORD-2026-0128",
    cliente: "Sofia Lima",
    produto: "Dell XPS 15",
    valor: 1299,
    estado: "Em Trânsito",
    data: "23/04/2026",
  },
  {
    id: "ORD-2026-0127",
    cliente: "João Oliveira",
    produto: "AirPods Pro 2",
    valor: 249,
    estado: "Entregue",
    data: "22/04/2026",
  },
  {
    id: "ORD-2026-0126",
    cliente: "Maria Santos",
    produto: "Samsung Galaxy S23",
    valor: 549,
    estado: "Devolvido",
    data: "22/04/2026",
  },
  {
    id: "ORD-2026-0125",
    cliente: "Pedro Costa",
    produto: "iPad Pro 11\"",
    valor: 589,
    estado: "Processamento",
    data: "21/04/2026",
  },
  {
    id: "ORD-2026-0124",
    cliente: "Ana Ferreira",
    produto: "MacBook Air M3",
    valor: 1149,
    estado: "Em Trânsito",
    data: "21/04/2026",
  },
  {
    id: "ORD-2026-0123",
    cliente: "Carlos Mendes",
    produto: "iPhone 14 Pro",
    valor: 699,
    estado: "Entregue",
    data: "20/04/2026",
  },
];

const topPartners = [
  {
    nome: "TechRenew Lisboa",
    pais: "Portugal",
    receita: 48750,
    pedidos: 187,
    cor: "#059669",
  },
  {
    nome: "EcoGadgets Porto",
    pais: "Portugal",
    receita: 32150,
    pedidos: 124,
    cor: "#0891b2",
  },
  {
    nome: "RefurbPro Madrid",
    pais: "Espanha",
    receita: 29800,
    pedidos: 109,
    cor: "#7c3aed",
  },
  {
    nome: "GreenTech Berlin",
    pais: "Alemanha",
    receita: 21400,
    pedidos: 83,
    cor: "#d97706",
  },
];

const kpiData = [
  {
    titulo: "Volume de Transações",
    valor: "1 247",
    variacao: "+12%",
    positivo: true,
    descricao: "vs. mês anterior",
    icon: ShoppingCart,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-700",
  },
  {
    titulo: "Valor Médio de Encomenda",
    valor: "€284,50",
    variacao: "+5%",
    positivo: true,
    descricao: "vs. mês anterior",
    icon: TrendingUp,
    bg: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    titulo: "Vendedores & Parceiros Ativos",
    valor: "38",
    variacao: "+3 este mês",
    positivo: true,
    descricao: "novos parceiros",
    icon: Handshake,
    bg: "bg-violet-50",
    iconColor: "text-violet-700",
  },
  {
    titulo: "Devoluções & Reclamações",
    valor: "23",
    variacao: "-8%",
    positivo: false,
    descricao: "vs. mês anterior",
    icon: ArrowDownRight,
    bg: "bg-orange-50",
    iconColor: "text-orange-700",
  },
];

// ── Badge helper ───────────────────────────────────────────────────────────────

function OrderBadge({ estado }: { estado: string }) {
  const styles: Record<string, string> = {
    Entregue: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    "Em Trânsito": "bg-blue-100 text-blue-800 border border-blue-200",
    Processamento: "bg-amber-100 text-amber-800 border border-amber-200",
    Devolvido: "bg-red-100 text-red-800 border border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${styles[estado] ?? "bg-gray-100 text-gray-700"}`}
    >
      {estado}
    </span>
  );
}

// ── Custom Tooltip for Line Chart ──────────────────────────────────────────────

function CustomLineTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="text-gray-700 mb-1 text-sm">{label} 2026</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// ── Custom Tooltip for Donut Chart ────────────────────────────────────────────

function CustomDonutTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="text-gray-700 text-sm">
          {payload[0].name}: <strong>{payload[0].value}%</strong>
        </p>
      </div>
    );
  }
  return null;
}

// ── Sidebar Nav Item ───────────────────────────────────────────────────────────

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "produtos", label: "Produtos", icon: Package },
  { id: "encomendas", label: "Encomendas", icon: ShoppingCart },
  { id: "utilizadores", label: "Utilizadores", icon: Users },
  { id: "parceiros", label: "Parceiros", icon: Handshake },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

// ── Main Component ─────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-emerald-900 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
              <span className="text-emerald-900 text-sm">↺</span>
            </div>
            <div>
              <span className="text-white text-lg tracking-wider">LOOP</span>
              <span className="block text-emerald-400 text-xs -mt-1">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-emerald-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left ${
                activeSection === id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-emerald-200 hover:bg-emerald-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{label}</span>
              {activeSection === id && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          ))}
        </nav>

        {/* Admin info + actions */}
        <div className="px-3 pb-4 border-t border-emerald-800 pt-4 space-y-2">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm flex-shrink-0">
              A
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm truncate">{user.name}</p>
              <p className="text-emerald-400 text-xs truncate">{user.email}</p>
            </div>
          </div>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-800 hover:text-white transition-all"
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Ver Site Público</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-900/40 hover:text-red-200 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-900 text-xl">
                {navItems.find((i) => i.id === activeSection)?.label ?? "Dashboard"}
              </h1>
              <p className="text-gray-500 text-sm">
                Bem-vindo, {user.name.split(" ")[0]} — Abril 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-transparent text-sm text-gray-600 outline-none w-40 placeholder-gray-400"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* ── KPI Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpiData.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.titulo}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-lg ${
                        kpi.positivo
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {kpi.positivo ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      {kpi.variacao}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{kpi.titulo}</p>
                  <p className="text-gray-900 text-2xl">{kpi.valor}</p>
                  <p className="text-gray-400 text-xs mt-1">{kpi.descricao}</p>
                </div>
              );
            })}
          </div>

          {/* ── Charts Row ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Line Chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-gray-900 text-base">Evolução de Transações</h2>
                  <p className="text-gray-500 text-sm">Janeiro – Abril 2026</p>
                </div>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                  Últimos 4 meses
                </span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={transactionData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomLineTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="transacoes"
                    name="Transações"
                    stroke="#059669"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#059669", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#059669" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="devolucoes"
                    name="Devoluções"
                    stroke="#f87171"
                    strokeWidth={2.5}
                    strokeDasharray="5 4"
                    dot={{ r: 4, fill: "#f87171", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#f87171" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Donut Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-gray-900 text-base">Receita por Categoria</h2>
                <p className="text-gray-500 text-sm">Distribuição em Abril 2026</p>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <PieTooltip content={<CustomDonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Legend */}
              <div className="space-y-2 mt-2">
                {categoryData.map((cat, i) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: DONUT_COLORS[i] }}
                      />
                      <span className="text-gray-600 text-sm">{cat.name}</span>
                    </div>
                    <span className="text-gray-800 text-sm">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Orders Table + Partners ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-2">
            {/* Orders Table */}
            <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-gray-900 text-base">Últimas Encomendas</h2>
                  <p className="text-gray-500 text-sm">6 encomendas mais recentes</p>
                </div>
                <button className="text-emerald-700 text-sm hover:text-emerald-800 transition-colors flex items-center gap-1">
                  Ver todas <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["ID", "Cliente", "Produto", "Valor", "Estado", "Data"].map(
                        (col) => (
                          <th
                            key={col}
                            className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider"
                          >
                            {col}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50/60 transition-colors"
                      >
                        <td className="px-4 py-3.5">
                          <span className="text-emerald-700 text-sm font-mono">
                            {order.id}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-gray-800 text-sm">{order.cliente}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-gray-600 text-sm">{order.produto}</span>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Partners */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-gray-900 text-base">Top Parceiros</h2>
                  <p className="text-gray-500 text-sm">Por receita em Abril</p>
                </div>
                <button className="text-emerald-700 text-sm hover:text-emerald-800 transition-colors flex items-center gap-1">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {topPartners.map((partner, index) => (
                  <div key={partner.nome} className="flex items-center gap-3">
                    {/* Rank */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0"
                      style={{ backgroundColor: partner.cor }}
                    >
                      {index + 1}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm truncate">{partner.nome}</p>
                      <p className="text-gray-400 text-xs">{partner.pais} · {partner.pedidos} pedidos</p>
                    </div>

                    {/* Revenue */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-900 text-sm">
                        €{partner.receita.toLocaleString("pt-PT")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Total parceiros ativos</span>
                  <span className="text-emerald-700 text-sm">38</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-gray-500 text-sm">Receita total (top 4)</span>
                  <span className="text-gray-900 text-sm">€132.100</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
