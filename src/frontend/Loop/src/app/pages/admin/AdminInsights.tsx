import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  ShoppingCart,
  Target,
  Zap,
  RefreshCw,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { toast } from "sonner";

// ── Mock Data ───────────────────────────────────────────────────────────────────

const aiProducts = [
  {
    id: 1,
    nome: "iPhone 15 Pro",
    categoria: "Smartphones",
    pesquisas: 2450,
    tendencia: "+45%",
    positivo: true,
    confianca: 92,
    stockAtual: 8,
    stockRecomendado: 25,
    prioridade: "Alta",
    previsaoVendas: 18,
    previsaoReceita: 12582,
    historico: [1200, 1450, 1800, 2100, 2200, 2450],
  },
  {
    id: 2,
    nome: "MacBook Pro M3",
    categoria: "Laptops",
    pesquisas: 1820,
    tendencia: "+32%",
    positivo: true,
    confianca: 87,
    stockAtual: 4,
    stockRecomendado: 15,
    prioridade: "Alta",
    previsaoVendas: 11,
    previsaoReceita: 14279,
    historico: [900, 1100, 1350, 1500, 1680, 1820],
  },
  {
    id: 3,
    nome: "iPad Air 2024",
    categoria: "Tablets",
    pesquisas: 1340,
    tendencia: "+28%",
    positivo: true,
    confianca: 85,
    stockAtual: 12,
    stockRecomendado: 20,
    prioridade: "Média",
    previsaoVendas: 8,
    previsaoReceita: 4712,
    historico: [700, 850, 1000, 1100, 1240, 1340],
  },
  {
    id: 4,
    nome: "AirPods Max",
    categoria: "Áudio",
    pesquisas: 980,
    tendencia: "+18%",
    positivo: true,
    confianca: 78,
    stockAtual: 15,
    stockRecomendado: 18,
    prioridade: "Baixa",
    previsaoVendas: 6,
    previsaoReceita: 2394,
    historico: [550, 620, 720, 820, 920, 980],
  },
  {
    id: 5,
    nome: "Samsung Galaxy S23",
    categoria: "Smartphones",
    pesquisas: 620,
    tendencia: "-12%",
    positivo: false,
    confianca: 81,
    stockAtual: 6,
    stockRecomendado: 4,
    prioridade: "Baixa",
    previsaoVendas: 3,
    previsaoReceita: 1647,
    historico: [920, 850, 780, 720, 660, 620],
  },
  {
    id: 6,
    nome: "Dell XPS 15",
    categoria: "Laptops",
    pesquisas: 480,
    tendencia: "-8%",
    positivo: false,
    confianca: 74,
    stockAtual: 5,
    stockRecomendado: 3,
    prioridade: "Baixa",
    previsaoVendas: 2,
    previsaoReceita: 2598,
    historico: [580, 550, 530, 510, 500, 480],
  },
];

const weeklyData = [
  { dia: "Seg", pesquisas: 842, vendas: 18 },
  { dia: "Ter", pesquisas: 920, vendas: 22 },
  { dia: "Qua", pesquisas: 1100, vendas: 28 },
  { dia: "Qui", pesquisas: 980, vendas: 24 },
  { dia: "Sex", pesquisas: 1350, vendas: 35 },
  { dia: "Sáb", pesquisas: 1580, vendas: 42 },
  { dia: "Dom", pesquisas: 1200, vendas: 30 },
];

const categoryPerformance = [
  { cat: "Smartphones", pesquisas: 4850, meta: 5000 },
  { cat: "Laptops", cat_short: "Laptops", pesquisas: 3200, meta: 3500 },
  { cat: "Tablets", pesquisas: 1820, meta: 2000 },
  { cat: "Áudio", pesquisas: 1560, meta: 1800 },
  { cat: "Acessórios", pesquisas: 920, meta: 1200 },
];

const stockAlerts = [
  { produto: "iPhone 15 Pro", stock: 8, min: 15, urgencia: "alta" },
  { produto: "MacBook Pro M3", stock: 4, min: 10, urgencia: "crítica" },
  { produto: "iPad Air 2024", stock: 12, min: 15, urgencia: "média" },
];

function MiniTrend({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 30;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#059669" : "#ef4444"}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PriorityBadge({ p }: { p: string }) {
  const cfg: Record<string, string> = {
    Alta: "bg-red-100 text-red-700 border-red-200",
    Média: "bg-amber-100 text-amber-700 border-amber-200",
    Baixa: "bg-gray-100 text-gray-600 border-gray-200",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${cfg[p] ?? ""}`}>{p}</span>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="text-gray-600 text-xs mb-1">{label}</p>
        {payload.map((entry: any) => (
          <p key={entry.dataKey} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <strong>{entry.value.toLocaleString("pt-PT")}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function AdminInsights() {
  const [activeTab, setActiveTab] = useState<"tendencias" | "stock" | "previsoes">("tendencias");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRefreshing(false);
    toast.success("Análise IA atualizada com sucesso", {
      description: "Dados sincronizados com as últimas 24h.",
    });
  };

  const trending = aiProducts.filter((p) => p.positivo);
  const declining = aiProducts.filter((p) => !p.positivo);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-gray-900 text-2xl">Análise IA & Insights</h1>
            <span className="text-xs bg-violet-600 text-white px-2.5 py-0.5 rounded-lg">IA</span>
          </div>
          <p className="text-gray-500 text-sm">
            Previsões baseadas em pesquisas, tendências de mercado e histórico de vendas
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl transition-colors disabled:opacity-70"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Atualizando..." : "Atualizar IA"}
        </button>
      </div>

      {/* AI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            titulo: "Produtos em Alta",
            valor: trending.length.toString(),
            descricao: "Aumentar stock urgente",
            icon: TrendingUp,
            bg: "bg-emerald-50",
            iconColor: "text-emerald-700",
            badge: "bg-emerald-100 text-emerald-700",
            badgeText: "↑ Ação necessária",
          },
          {
            titulo: "Produtos em Baixa",
            valor: declining.length.toString(),
            descricao: "Considerar redução de stock",
            icon: TrendingDown,
            bg: "bg-red-50",
            iconColor: "text-red-600",
            badge: "bg-red-100 text-red-600",
            badgeText: "↓ Monitorizar",
          },
          {
            titulo: "Alertas de Stock",
            valor: stockAlerts.length.toString(),
            descricao: "Produtos abaixo do mínimo",
            icon: AlertTriangle,
            bg: "bg-amber-50",
            iconColor: "text-amber-700",
            badge: "bg-amber-100 text-amber-700",
            badgeText: "! Restock urgente",
          },
          {
            titulo: "Previsão Receita 7d",
            valor: "€38.2k",
            descricao: "Baseado em tendências atuais",
            icon: BarChart3,
            bg: "bg-violet-50",
            iconColor: "text-violet-700",
            badge: "bg-violet-100 text-violet-700",
            badgeText: "+22% vs. semana anterior",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.titulo} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.iconColor}`} />
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-lg ${card.badge}`}>
                  {card.badgeText}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{card.titulo}</p>
              <p className="text-gray-900 text-2xl">{card.valor}</p>
              <p className="text-gray-400 text-xs mt-1">{card.descricao}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          {[
            { id: "tendencias", label: "Tendências de Mercado", icon: TrendingUp },
            { id: "stock", label: "Recomendações de Stock", icon: Package },
            { id: "previsoes", label: "Previsões de Vendas", icon: Target },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm transition-all border-b-2 ${
                activeTab === id
                  ? "border-emerald-700 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── TENDÊNCIAS ── */}
          {activeTab === "tendencias" && (
            <div className="space-y-6">
              {/* Weekly chart */}
              <div>
                <h3 className="text-gray-900 text-base mb-4">Pesquisas vs. Vendas — Últimos 7 Dias</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="gradPesquisas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradVendas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="dia" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="pesquisas" name="Pesquisas" stroke="#7c3aed" fill="url(#gradPesquisas)" strokeWidth={2} />
                    <Area type="monotone" dataKey="vendas" name="Vendas" stroke="#059669" fill="url(#gradVendas)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category bar chart */}
              <div>
                <h3 className="text-gray-900 text-base mb-4">Pesquisas por Categoria vs. Meta</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={categoryPerformance} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="cat" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="pesquisas" name="Pesquisas" radius={[6, 6, 0, 0]}>
                      {categoryPerformance.map((entry, index) => (
                        <Cell key={index} fill={entry.pesquisas >= entry.meta ? "#059669" : "#d1fae5"} />
                      ))}
                    </Bar>
                    <Bar dataKey="meta" name="Meta" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Product trend list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Produtos em Alta
                  </h3>
                  <div className="space-y-2">
                    {trending.map((p, i) => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm truncate">{p.nome}</p>
                          <p className="text-gray-500 text-xs">{p.pesquisas.toLocaleString("pt-PT")} pesquisas</p>
                        </div>
                        <MiniTrend data={p.historico} positive={p.positivo} />
                        <span className="text-emerald-700 text-sm flex items-center gap-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {p.tendencia}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-700 text-sm mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                    Produtos em Baixa
                  </h3>
                  <div className="space-y-2">
                    {declining.map((p, i) => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                        <span className="w-6 h-6 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-xs flex-shrink-0">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm truncate">{p.nome}</p>
                          <p className="text-gray-500 text-xs">{p.pesquisas.toLocaleString("pt-PT")} pesquisas</p>
                        </div>
                        <MiniTrend data={p.historico} positive={p.positivo} />
                        <span className="text-red-600 text-sm flex items-center gap-0.5">
                          <ArrowDownRight className="w-3.5 h-3.5" />
                          {p.tendencia}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STOCK ── */}
          {activeTab === "stock" && (
            <div className="space-y-6">
              {/* Urgent alerts */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-amber-900">Alertas de Stock Crítico</h3>
                </div>
                <div className="space-y-2">
                  {stockAlerts.map((alert) => (
                    <div key={alert.produto} className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-100">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          alert.urgencia === "crítica" ? "bg-red-500 animate-pulse" :
                          alert.urgencia === "alta" ? "bg-amber-500" :
                          "bg-yellow-400"
                        }`} />
                        <span className="text-gray-800 text-sm">{alert.produto}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Atual / Mínimo</p>
                          <p className="text-sm">
                            <span className={alert.stock <= 5 ? "text-red-600" : "text-amber-600"}>{alert.stock}</span>
                            <span className="text-gray-400"> / {alert.min}</span>
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-lg capitalize ${
                          alert.urgencia === "crítica" ? "bg-red-100 text-red-700" :
                          alert.urgencia === "alta" ? "bg-amber-100 text-amber-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {alert.urgencia}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              <div>
                <h3 className="text-gray-900 text-base mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  Recomendações de Reposição — IA
                </h3>
                <div className="space-y-3">
                  {aiProducts.map((p) => {
                    const needsRestock = p.stockAtual < p.stockRecomendado;
                    const stockPercent = Math.min((p.stockAtual / p.stockRecomendado) * 100, 100);
                    return (
                      <div key={p.id} className="p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm ${
                              needsRestock ? "bg-red-100 text-red-700" : "bg-emerald-100 text-emerald-700"
                            }`}>
                              {needsRestock ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                            </div>
                            <div>
                              <p className="text-gray-900 text-sm">{p.nome}</p>
                              <p className="text-gray-500 text-xs">{p.categoria}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <PriorityBadge p={p.prioridade} />
                            <span className={`text-xs flex items-center gap-0.5 ${p.positivo ? "text-emerald-700" : "text-red-600"}`}>
                              {p.positivo ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                              {p.tendencia}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500">Stock Atual</p>
                            <p className={`text-lg ${p.stockAtual < p.stockRecomendado ? "text-red-600" : "text-gray-900"}`}>
                              {p.stockAtual}
                            </p>
                          </div>
                          <div className="text-center p-2 bg-emerald-50 rounded-lg">
                            <p className="text-xs text-gray-500">Recomendado</p>
                            <p className="text-lg text-emerald-700">{p.stockRecomendado}</p>
                          </div>
                          <div className="text-center p-2 bg-violet-50 rounded-lg">
                            <p className="text-xs text-gray-500">Confiança IA</p>
                            <p className="text-lg text-violet-700">{p.confianca}%</p>
                          </div>
                        </div>

                        {/* Stock progress bar */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Nível de stock</span>
                            <span className="text-xs text-gray-600">
                              {p.stockAtual}/{p.stockRecomendado} un.
                              {needsRestock && (
                                <span className="text-red-600 ml-1">(faltam {p.stockRecomendado - p.stockAtual})</span>
                              )}
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                stockPercent < 40 ? "bg-red-500" :
                                stockPercent < 70 ? "bg-amber-400" :
                                "bg-emerald-500"
                              }`}
                              style={{ width: `${stockPercent}%` }}
                            />
                          </div>
                        </div>

                        {needsRestock && (
                          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              💡 Repor <strong>{p.stockRecomendado - p.stockAtual} unidades</strong> nos próximos 3 dias
                            </p>
                            <button
                              onClick={() => toast.success(`Pedido de restock para ${p.nome} enviado!`)}
                              className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200"
                            >
                              <Zap className="w-3 h-3" />
                              Pedir Restock
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── PREVISÕES ── */}
          {activeTab === "previsoes" && (
            <div className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-100 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-violet-900 text-sm">
                      <strong>Previsão IA para os próximos 7 dias:</strong> Espera-se um crescimento de vendas de
                      <strong className="text-emerald-700"> +22%</strong> face à semana anterior, com receita estimada de
                      <strong className="text-emerald-700"> €38.200</strong>. Os smartphones continuam a liderar a procura.
                    </p>
                  </div>
                </div>
              </div>

              {/* Products forecast */}
              <div>
                <h3 className="text-gray-900 text-base mb-4">Previsão de Vendas por Produto — 7 dias</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 rounded-xl">
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Produto</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Categoria</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Vendas Prev.</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Receita Prev.</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Tendência</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Confiança</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Prioridade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {aiProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                          <td className="px-4 py-3.5">
                            <span className="text-gray-800 text-sm">{p.nome}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-gray-500 text-sm">{p.categoria}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <ShoppingCart className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-900 text-sm">{p.previsaoVendas} un.</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-emerald-700 text-sm">€{p.previsaoReceita.toLocaleString("pt-PT")}</span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`text-sm flex items-center gap-0.5 ${p.positivo ? "text-emerald-700" : "text-red-600"}`}>
                              {p.positivo ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                              {p.tendencia}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-100 rounded-full h-1.5">
                                <div
                                  className="bg-violet-600 h-1.5 rounded-full"
                                  style={{ width: `${p.confianca}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-600">{p.confianca}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <PriorityBadge p={p.prioridade} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revenue forecast */}
              <div className="p-4 bg-white border border-gray-200 rounded-2xl">
                <h3 className="text-gray-900 text-base mb-4 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  Receita Total Prevista — Próximas 4 Semanas
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { semana: "Semana 1", valor: 38200, var: "+22%" },
                    { semana: "Semana 2", valor: 41500, var: "+9%" },
                    { semana: "Semana 3", valor: 39800, var: "-4%" },
                    { semana: "Semana 4", valor: 44200, var: "+11%" },
                  ].map((s) => (
                    <div key={s.semana} className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">{s.semana}</p>
                      <p className="text-gray-900">€{(s.valor / 1000).toFixed(1)}k</p>
                      <p className={`text-xs mt-1 ${s.var.startsWith("+") ? "text-emerald-600" : "text-red-500"}`}>
                        {s.var}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <ChevronRight className="w-3.5 h-3.5" />
                  Previsões geradas com confiança média de 83% · Atualizado a 23/04/2026
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
