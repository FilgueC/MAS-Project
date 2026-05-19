import { useState } from "react";
import {
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Handshake,
  ChevronRight,
  Sparkles,
  Eye,
  Search as SearchIcon,
  Users,
  RefreshCw,
  Calendar,
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
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { useNavigate } from "react-router";
import { PortugalMap } from "../../components/PortugalMap";

// ── KPI Data por período ────────────────────────────────────────────────────────

type Period = "diario" | "semanal" | "mensal";

const kpiByPeriod: Record<Period, {
  transacoes: string;
  transVar: string;
  aov: string;
  aovVar: string;
  devolucoes: string;
  devVar: string;
  receita: string;
  receitaVar: string;
  utilizadores: string;
  utilizadoresVar: string;
}> = {
  diario: {
    transacoes: "38",
    transVar: "+14%",
    aov: "€274,30",
    aovVar: "+3%",
    devolucoes: "2",
    devVar: "-50%",
    receita: "€10.423",
    receitaVar: "+18%",
    utilizadores: "127",
    utilizadoresVar: "+8%",
  },
  semanal: {
    transacoes: "247",
    transVar: "+9%",
    aov: "€281,20",
    aovVar: "+4%",
    devolucoes: "8",
    devVar: "-20%",
    receita: "€69.456",
    receitaVar: "+12%",
    utilizadores: "842",
    utilizadoresVar: "+11%",
  },
  mensal: {
    transacoes: "1 247",
    transVar: "+12%",
    aov: "€284,50",
    aovVar: "+5%",
    devolucoes: "23",
    devVar: "-8%",
    receita: "€354.777",
    receitaVar: "+15%",
    utilizadores: "3.418",
    utilizadoresVar: "+18%",
  },
};

// ── Chart data ─────────────────────────────────────────────────────────────────

const chartDataByPeriod: Record<Period, { label: string; transacoes: number; devolucoes: number; receita: number }[]> = {
  diario: [
    { label: "08h", transacoes: 3, devolucoes: 0, receita: 820 },
    { label: "10h", transacoes: 6, devolucoes: 0, receita: 1640 },
    { label: "12h", transacoes: 9, devolucoes: 1, receita: 2460 },
    { label: "14h", transacoes: 7, devolucoes: 0, receita: 1918 },
    { label: "16h", transacoes: 8, devolucoes: 1, receita: 2192 },
    { label: "18h", transacoes: 5, devolucoes: 0, receita: 1393 },
  ],
  semanal: [
    { label: "Seg", transacoes: 28, devolucoes: 1, receita: 7896 },
    { label: "Ter", transacoes: 34, devolucoes: 0, receita: 9626 },
    { label: "Qua", transacoes: 41, devolucoes: 2, receita: 11601 },
    { label: "Qui", transacoes: 38, devolucoes: 1, receita: 10754 },
    { label: "Sex", transacoes: 52, devolucoes: 2, receita: 14716 },
    { label: "Sáb", transacoes: 32, devolucoes: 1, receita: 9056 },
    { label: "Dom", transacoes: 22, devolucoes: 1, receita: 6226 },
  ],
  mensal: [
    { label: "Jan", transacoes: 280, devolucoes: 18, receita: 79520 },
    { label: "Fev", transacoes: 310, devolucoes: 22, receita: 88085 },
    { label: "Mar", transacoes: 295, devolucoes: 17, receita: 83827 },
    { label: "Abr", transacoes: 362, devolucoes: 23, receita: 102889 },
  ],
};

const categoryData = [
  { name: "Smartphones", value: 45 },
  { name: "Laptops", value: 30 },
  { name: "Tablets", value: 15 },
  { name: "Outros", value: 10 },
];

const DONUT_COLORS = ["#059669", "#064e3b", "#34d399", "#a7f3d0"];

const recentOrders = [
  { id: "ORD-2026-0128", cliente: "Sofia Lima", produto: "Dell XPS 15", valor: 1299, estado: "Em Trânsito", data: "23/04/2026" },
  { id: "ORD-2026-0127", cliente: "João Oliveira", produto: "AirPods Pro 2", valor: 249, estado: "Entregue", data: "22/04/2026" },
  { id: "ORD-2026-0126", cliente: "Maria Santos", produto: "Samsung Galaxy S23", valor: 549, estado: "Devolvido", data: "22/04/2026" },
  { id: "ORD-2026-0125", cliente: "Pedro Costa", produto: "iPad Pro 11\"", valor: 589, estado: "Processamento", data: "21/04/2026" },
  { id: "ORD-2026-0124", cliente: "Ana Ferreira", produto: "MacBook Air M3", valor: 1149, estado: "Em Trânsito", data: "21/04/2026" },
  { id: "ORD-2026-0123", cliente: "Carlos Mendes", produto: "iPhone 14 Pro", valor: 699, estado: "Entregue", data: "20/04/2026" },
];

const topPartner = { nome: "TechRenew Lisboa", pais: "Portugal", receita: 48750, pedidos: 187, rating: 4.8, avaliacoes: 247 };

const aiTrendingProducts = [
  { nome: "iPhone 15 Pro", categoria: "Smartphones", pesquisas: 2450, tendencia: "+45%", previsao: "Alta procura esperada nos próximos 7 dias", confianca: 92 },
  { nome: "MacBook Pro M3", categoria: "Laptops", pesquisas: 1820, tendencia: "+32%", previsao: "Crescimento estável previsto", confianca: 87 },
  { nome: "iPad Air 2024", categoria: "Tablets", pesquisas: 1340, tendencia: "+28%", previsao: "Aumento de interesse detectado", confianca: 85 },
  { nome: "AirPods Max", categoria: "Áudio", pesquisas: 980, tendencia: "+18%", previsao: "Procura moderada consistente", confianca: 78 },
];

// Returns & Complaints monthly data
const returnsComplaintsData = [
  { mes: "Jan", devolucoes: 18, reclamacoes: 12 },
  { mes: "Fev", devolucoes: 22, reclamacoes: 15 },
  { mes: "Mar", devolucoes: 17, reclamacoes: 9 },
  { mes: "Abr", devolucoes: 23, reclamacoes: 14 },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

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

function CustomLineTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="text-gray-700 mb-1 text-sm">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} style={{ color: entry.color }} className="text-sm">
            {entry.name}: <strong>{entry.value.toLocaleString("pt-PT")}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

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

// ── Main Component ─────────────────────────────────────────────────────────────

export function AdminOverview() {
  const [period, setPeriod] = useState<Period>("mensal");
  const navigate = useNavigate();
  const kpi = kpiByPeriod[period];
  const chartData = chartDataByPeriod[period];

  const periodLabel = period === "diario" ? "hoje" : period === "semanal" ? "esta semana" : "este mês";

  const kpiCards = [
    {
      titulo: "Volume de Transações",
      valor: kpi.transacoes,
      variacao: kpi.transVar,
      positivo: true,
      descricao: `vs. período anterior`,
      icon: ShoppingCart,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-700",
    },
    {
      titulo: "Valor Médio de Encomenda",
      valor: kpi.aov,
      variacao: kpi.aovVar,
      positivo: true,
      descricao: `vs. período anterior`,
      icon: TrendingUp,
      bg: "bg-blue-50",
      iconColor: "text-blue-700",
    },
    {
      titulo: "Receita Total",
      valor: kpi.receita,
      variacao: kpi.receitaVar,
      positivo: true,
      descricao: periodLabel,
      icon: TrendingUp,
      bg: "bg-violet-50",
      iconColor: "text-violet-700",
    },
    {
      titulo: "Parceiros Ativos",
      valor: "1",
      variacao: "TechRenew Lisboa",
      positivo: true,
      descricao: "parceiro premium",
      icon: Handshake,
      bg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      noArrow: true,
    },
    {
      titulo: "Utilizadores Ativos",
      valor: kpi.utilizadores,
      variacao: kpi.utilizadoresVar,
      positivo: true,
      descricao: periodLabel,
      icon: Users,
      bg: "bg-indigo-50",
      iconColor: "text-indigo-700",
    },
    {
      titulo: "Devoluções & Reclamações",
      valor: kpi.devolucoes,
      variacao: kpi.devVar,
      positivo: false,
      descricao: "vs. período anterior",
      icon: ArrowDownRight,
      bg: "bg-orange-50",
      iconColor: "text-orange-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Period filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5">
          <Calendar className="w-4 h-4 text-gray-400 ml-2" />
          {([
            { id: "diario", label: "Diário" },
            { id: "semanal", label: "Semanal" },
            { id: "mensal", label: "Mensal" },
          ] as const).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setPeriod(id)}
              className={`px-4 py-1.5 rounded-xl text-sm transition-all ${
                period === id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-sm hidden sm:block">
          A mostrar dados {periodLabel} — Abril 2026
        </p>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {kpiCards.map((kpi) => {
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
                {!(kpi as any).noArrow && (
                  <span
                    className={`inline-flex items-center gap-1 text-sm px-2 py-0.5 rounded-lg ${
                      kpi.positivo ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {kpi.positivo ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {kpi.variacao}
                  </span>
                )}
                {(kpi as any).noArrow && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700">
                    {kpi.variacao}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm mb-1">{kpi.titulo}</p>
              <p className="text-gray-900 text-2xl">{kpi.valor}</p>
              <p className="text-gray-400 text-xs mt-1">{kpi.descricao}</p>
            </div>
          );
        })}
      </div>

      {/* ── AI Trending Products ── */}
      <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl shadow-sm border border-violet-100 p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-gray-900 text-base flex items-center gap-2">
                Produtos Mais Procurados
                <span className="text-xs bg-violet-600 text-white px-2 py-0.5 rounded-lg">IA</span>
              </h2>
              <p className="text-gray-600 text-sm">Análise preditiva baseada em pesquisas e tendências</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/admin/insights")}
            className="text-violet-700 text-sm hover:text-violet-800 transition-colors flex items-center gap-1"
          >
            Ver análise completa <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiTrendingProducts.map((product, index) => (
            <div
              key={product.nome}
              className="bg-white rounded-xl border border-violet-100 p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm">{product.nome}</p>
                    <p className="text-gray-500 text-xs">{product.categoria}</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-100">
                  {product.tendencia}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">
                  <strong>{product.pesquisas.toLocaleString("pt-PT")}</strong> pesquisas
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <SearchIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">{product.previsao}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Confiança da Previsão</span>
                  <span className="text-xs text-gray-700">{product.confianca}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-violet-600 h-1.5 rounded-full transition-all"
                    style={{ width: `${product.confianca}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-white/60 border border-violet-100 rounded-xl">
          <p className="text-xs text-violet-900">
            <strong>💡 Recomendação:</strong> Considere aumentar o stock destes produtos e contactar fornecedores para garantir disponibilidade.
          </p>
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-gray-900 text-base">Evolução de Transações & Receita</h2>
              <p className="text-gray-500 text-sm capitalize">{period === "diario" ? "Hoje (por hora)" : period === "semanal" ? "Esta Semana" : "Janeiro – Abril 2026"}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-lg px-2 py-1">
              <RefreshCw className="w-3 h-3" />
              Tempo real
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="gradTrans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomLineTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
              <Area type="monotone" dataKey="transacoes" name="Transações" stroke="#059669" fill="url(#gradTrans)" strokeWidth={2.5} dot={{ r: 4, fill: "#059669", strokeWidth: 0 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="devolucoes" name="Devoluções" stroke="#f87171" strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3, fill: "#f87171", strokeWidth: 0 }} />
            </AreaChart>
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
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <PieTooltip content={<CustomDonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: DONUT_COLORS[i] }} />
                  <span className="text-gray-600 text-sm">{cat.name}</span>
                </div>
                <span className="text-gray-800 text-sm">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Orders Table + Partner ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-2">
        {/* Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-gray-900 text-base">Últimas Encomendas</h2>
              <p className="text-gray-500 text-sm">6 encomendas mais recentes</p>
            </div>
            <button
              onClick={() => navigate("/admin/encomendas")}
              className="text-emerald-700 text-sm hover:text-emerald-800 transition-colors flex items-center gap-1"
            >
              Ver todas <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["ID", "Cliente", "Produto", "Valor", "Estado", "Data"].map((col) => (
                    <th key={col} className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="text-emerald-700 text-sm font-mono">{order.id}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-gray-800 text-sm">{order.cliente}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-gray-600 text-sm">{order.produto}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-gray-900 text-sm">€{order.valor.toLocaleString("pt-PT")}</span>
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

        {/* Parceiro Premium */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 text-base">Parceiro Premium</h2>
              <p className="text-gray-500 text-sm">Desempenho em Abril</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-lg flex-shrink-0">
                T
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 truncate">{topPartner.nome}</p>
                <p className="text-gray-600 text-xs">{topPartner.pais}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Receita</span>
                <span className="text-gray-900 text-sm">€{topPartner.receita.toLocaleString("pt-PT")}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Pedidos</span>
                <span className="text-gray-900 text-sm">{topPartner.pedidos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Rating</span>
                <span className="text-gray-900 text-sm">{topPartner.rating} ★ ({topPartner.avaliacoes})</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-900 mb-2">
              <strong>Status:</strong> Parceiro verificado e premium
            </p>
            <p className="text-xs text-blue-800">
              Desempenho excecional com 98% de satisfação dos clientes
            </p>
          </div>
        </div>
      </div>

      {/* ── Portugal Map + Returns/Complaints Charts ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-4">
        <PortugalMap title="Densidade Geográfica de Vendas" subtitle="Distribuição nacional de encomendas — Abril 2026" />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="mb-5">
            <h2 className="text-gray-900 text-base">Devoluções & Reclamações por Mês</h2>
            <p className="text-gray-500 text-sm">Janeiro – Abril 2026</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={returnsComplaintsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Bar dataKey="devolucoes" name="Devoluções" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="reclamacoes" name="Reclamações" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
              <p className="text-xs text-amber-700 mb-1">Total Devoluções (YTD)</p>
              <p className="text-xl text-amber-900">{returnsComplaintsData.reduce((a, d) => a + d.devolucoes, 0)}</p>
              <p className="text-xs text-amber-600">Taxa: {(returnsComplaintsData.reduce((a, d) => a + d.devolucoes, 0) / 1247 * 100).toFixed(1)}%</p>
            </div>
            <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <p className="text-xs text-red-700 mb-1">Total Reclamações (YTD)</p>
              <p className="text-xl text-red-900">{returnsComplaintsData.reduce((a, d) => a + d.reclamacoes, 0)}</p>
              <p className="text-xs text-red-600">Taxa: {(returnsComplaintsData.reduce((a, d) => a + d.reclamacoes, 0) / 1247 * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}