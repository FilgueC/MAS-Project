import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import {
  Eye,
  Euro,
  Star,
  Package,
  FileText,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Download,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Award,
  Users,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Info,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";

// ═══════════════════════════════════════════════════════════════════════════════
// DATA — Correlacionada com o Admin Panel (TechRenew Lisboa = parceiro #1)
// ═══════════════════════════════════════════════════════════════════════════════

// KPIs globais do parceiro (matching admin panel top partner: TechRenew Lisboa)
const PARTNER = {
  nome: "TechRenew Lisboa",
  pais: "Portugal",
  rank: 1,
  totalParceiros: 38,
  receita: 48750,
  comissao: 9750, // 20%
  encomendas: 187,
  rating: 4.8,
  reviews: 247,
  taxaConversao: 7.2, // %
  taxaDevolucao: 2.1, // %
  impressoes: 18420,
  vistosUniqueVisitors: 6840,
};

// Impressões mensais (Jan-Abr 2026)
const impressoesData = [
  { mes: "Jan", impressoes: 12400, visitantes: 4100, conversoes: 285 },
  { mes: "Fev", impressoes: 14200, visitantes: 4890, conversoes: 312 },
  { mes: "Mar", impressoes: 15800, visitantes: 5340, conversoes: 298 },
  { mes: "Abr", impressoes: 18420, visitantes: 6840, conversoes: 401 },
];

// Fontes de tráfego
const trafficSourceData = [
  { name: "Pesquisa Direta", value: 38, color: "#059669" },
  { name: "Orgânico LOOP", value: 31, color: "#064e3b" },
  { name: "Destaque Editorial", value: 18, color: "#34d399" },
  { name: "Referência Externa", value: 13, color: "#a7f3d0" },
];

// Receita e comissões (Jan-Abr 2026)
const revenueData = [
  { mes: "Jan", receita: 42300, comissao: 8460, liquido: 33840 },
  { mes: "Fev", receita: 45100, comissao: 9020, liquido: 36080 },
  { mes: "Mar", receita: 43800, comissao: 8760, liquido: 35040 },
  { mes: "Abr", receita: 48750, comissao: 9750, liquido: 39000 },
];

// Receita por categoria
const categoryRevenueData = [
  { name: "Smartphones", value: 41, color: "#059669" },
  { name: "Laptops", value: 29, color: "#064e3b" },
  { name: "Acessórios", value: 18, color: "#34d399" },
  { name: "Tablets", value: 12, color: "#a7f3d0" },
];

// Evolução mensal de receita por categoria
const revenueByCategoryTrend = [
  { mes: "Jan", smartphones: 17300, laptops: 12100, acessorios: 7400, tablets: 5500 },
  { mes: "Fev", smartphones: 18500, laptops: 13400, acessorios: 7800, tablets: 5400 },
  { mes: "Mar", smartphones: 18100, laptops: 12700, acessorios: 7300, tablets: 5700 },
  { mes: "Abr", smartphones: 20400, laptops: 14250, acessorios: 8600, tablets: 5500 },
];

// Avaliações por estrela
const ratingDistribution = [
  { estrelas: "5 ★", count: 148, pct: 60, color: "#059669" },
  { estrelas: "4 ★", count: 64, pct: 26, color: "#34d399" },
  { estrelas: "3 ★", count: 22, pct: 9, color: "#fbbf24" },
  { estrelas: "2 ★", count: 9, pct: 3.6, color: "#f87171" },
  { estrelas: "1 ★", count: 4, pct: 1.6, color: "#ef4444" },
];

// Evolução da classificação média
const ratingTrendData = [
  { mes: "Jan", rating: 4.5, reviews: 52 },
  { mes: "Fev", rating: 4.6, reviews: 61 },
  { mes: "Mar", rating: 4.7, reviews: 68 },
  { mes: "Abr", rating: 4.8, reviews: 66 },
];

// Avaliações recentes
const recentReviews = [
  { cliente: "Maria S.", produto: "iPhone 14 Pro", rating: 5, comentario: "Produto em excelente estado, melhor que o esperado! Recomendo totalmente.", data: "22/04/2026" },
  { cliente: "João P.", produto: "MacBook Air M3", rating: 5, comentario: "Recondicionado impecável, funciona como novo. Entrega super rápida.", data: "21/04/2026" },
  { cliente: "Ana F.", produto: "AirPods Pro 2", rating: 4, comentario: "Bom produto, entrega rápida. Bateria praticamente nova.", data: "20/04/2026" },
  { cliente: "Ricardo M.", produto: "iPad Pro 11\"", rating: 5, comentario: "Excelente estado. Sem riscos, bateria 97%. Muito satisfeito.", data: "19/04/2026" },
  { cliente: "Sofia L.", produto: "Apple Watch S9", rating: 4, comentario: "Bom produto mas a caixa de envio estava ligeiramente danificada.", data: "18/04/2026" },
];

// Produtos top vendedores (correlacionado com admin)
const topProducts = [
  { nome: "AirPods Pro 2", vendas: 54, visualizacoes: 1580, receita: 15066, rating: 4.8, taxaConv: 3.4, stock: 12 },
  { nome: "iPhone 14 Pro", vendas: 45, visualizacoes: 1250, receita: 31455, rating: 4.9, taxaConv: 3.6, stock: 8 },
  { nome: "MacBook Air M3", vendas: 32, visualizacoes: 890, receita: 36768, rating: 4.7, taxaConv: 3.6, stock: 5 },
  { nome: "iPad Pro 11\"", vendas: 28, visualizacoes: 720, receita: 16492, rating: 4.6, taxaConv: 3.9, stock: 9 },
  { nome: "Apple Watch S9", vendas: 23, visualizacoes: 650, receita: 8073, rating: 4.5, taxaConv: 3.5, stock: 14 },
];

// Produtos menos vendidos
const bottomProducts = [
  { nome: "Dell XPS 15", vendas: 18, visualizacoes: 480, receita: 23382, rating: 4.4, taxaConv: 3.8, stock: 3 },
  { nome: "Samsung Tab S9", vendas: 15, visualizacoes: 390, receita: 9750, rating: 4.3, taxaConv: 3.8, stock: 7 },
  { nome: "Sony WH-1000XM5", vendas: 12, visualizacoes: 340, receita: 4188, rating: 4.5, taxaConv: 3.5, stock: 11 },
];

// Dados para bar chart de produtos (combinado)
const productBarData = [
  { nome: "AirPods Pro 2", vendas: 54, visualizacoes: 1580 },
  { nome: "iPhone 14 Pro", vendas: 45, visualizacoes: 1250 },
  { nome: "MacBook Air M3", vendas: 32, visualizacoes: 890 },
  { nome: "iPad Pro 11\"", vendas: 28, visualizacoes: 720 },
  { nome: "Apple Watch", vendas: 23, visualizacoes: 650 },
  { nome: "Dell XPS 15", vendas: 18, visualizacoes: 480 },
  { nome: "Samsung Tab S9", vendas: 15, visualizacoes: 390 },
  { nome: "Sony WH-XM5", vendas: 12, visualizacoes: 340 },
];

// Comparação com plataforma (correlacionado com dados admin)
const comparisonData = [
  { metrica: "Vendas", voce: 87, media: 65 },
  { metrica: "Avaliações", voce: 96, media: 78 },
  { metrica: "Taxa Conv.", voce: 82, media: 72 },
  { metrica: "Resp. Rápida", voce: 95, media: 70 },
  { metrica: "Devoluções", voce: 79, media: 65 },
  { metrica: "Impressões", voce: 91, media: 68 },
];

// Métricas de comparação detalhada
const comparisonMetrics = [
  { label: "Taxa de Conversão", voce: "7,2%", media: "5,3%", melhor: true },
  { label: "Classificação Média", voce: "4,8 ★", media: "4,2 ★", melhor: true },
  { label: "Taxa de Devolução", voce: "2,1%", media: "4,7%", melhor: true },
  { label: "Tempo de Resposta", voce: "< 2h", media: "~8h", melhor: true },
  { label: "Receita por Produto", voce: "€260", media: "€198", melhor: true },
  { label: "Ranking na Plataforma", voce: "#1 / 38", media: "—", melhor: true },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS & CONSTANTES
// ═══════════════════════════════════════════════════════════════════════════════

type Section =
  | "impressoes"
  | "receita"
  | "avaliacoes"
  | "produtos"
  | "comparacao"
  | "relatorios";

type Period = "hoje" | "semana" | "mes" | "trimestre";

const navItems: { id: Section; label: string; icon: any; badge?: string }[] = [
  { id: "impressoes", label: "Impressões", icon: Eye, badge: "+18%" },
  { id: "receita", label: "Receita & Comissões", icon: Euro },
  { id: "avaliacoes", label: "Avaliações", icon: Star },
  { id: "produtos", label: "Produtos", icon: Package },
  { id: "comparacao", label: "Comparação Global", icon: Globe },
  { id: "relatorios", label: "Relatórios", icon: FileText },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS & SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const w = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${w} ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  badge,
  badgePositive = true,
  iconBg = "bg-emerald-50",
  iconColor = "text-emerald-700",
}: {
  icon: any;
  label: string;
  value: string;
  sub?: string;
  badge?: string;
  badgePositive?: boolean;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {badge && (
          <span
            className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-lg font-medium ${
              badgePositive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {badgePositive ? (
              <ArrowUpRight className="w-3 h-3" />
            ) : (
              <ArrowDownRight className="w-3 h-3" />
            )}
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-1 font-medium">{label}</p>
      <p className="text-gray-900 text-2xl font-bold">{value}</p>
      {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-gray-900 text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  badge,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 ${className}`}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-gray-900 text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>
        {badge && (
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg font-medium">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function CustomTooltipLine({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="text-gray-600 mb-1.5 font-medium">{label} 2026</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}:{" "}
          <strong>
            {entry.name?.includes("€") || entry.name?.toLowerCase().includes("receita") || entry.name?.toLowerCase().includes("comiss") || entry.name?.toLowerCase().includes("líquido")
              ? `€${entry.value.toLocaleString("pt-PT")}`
              : entry.value.toLocaleString("pt-PT")}
          </strong>
        </p>
      ))}
    </div>
  );
}

function CustomTooltipSimple({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="text-gray-600 mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.dataKey} style={{ color: entry.color }}>
          {entry.name}: <strong>{entry.value.toLocaleString("pt-PT")}</strong>
        </p>
      ))}
    </div>
  );
}

function CustomDonutTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
      <p className="text-gray-700">
        {payload[0].name}: <strong>{payload[0].value}%</strong>
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: IMPRESSÕES
// ═══════════════════════════════════════════════════════════════════════════════

function ImpressoesSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Impressões & Tráfego"
        subtitle="Visibilidade dos seus produtos na plataforma LOOP — Abril 2026"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={Eye} label="Impressões Totais" value="18.420" badge="+18%" badgePositive iconBg="bg-blue-50" iconColor="text-blue-700" sub="views dos seus produtos" />
        <KpiCard icon={Users} label="Visitantes Únicos" value="6.840" badge="+22%" badgePositive iconBg="bg-indigo-50" iconColor="text-indigo-700" sub="utilizadores distintos" />
        <KpiCard icon={Target} label="Taxa de Conversão" value="7,2%" badge="+1.9pp" badgePositive iconBg="bg-teal-50" iconColor="text-teal-700" sub="cliques → compras" />
        <KpiCard icon={Zap} label="Posição Média" value="#2,4" badge="Top 5%" badgePositive iconBg="bg-amber-50" iconColor="text-amber-600" sub="nos resultados de pesquisa" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard title="Evolução de Impressões" subtitle="Janeiro – Abril 2026" badge="Área temporal" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={impressoesData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="gImpr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gVisit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipLine />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Area type="monotone" dataKey="impressoes" name="Impressões" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gImpr)" />
              <Area type="monotone" dataKey="visitantes" name="Visitantes Únicos" stroke="#059669" strokeWidth={2.5} fill="url(#gVisit)" />
              <Area type="monotone" dataKey="conversoes" name="Conversões" stroke="#f59e0b" strokeWidth={2.5} fill="url(#gConv)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Fontes de Tráfego" subtitle="De onde vêm os seus visitantes">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={trafficSourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {trafficSourceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomDonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-3">
            {trafficSourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-gray-600 text-sm flex-1">{s.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, backgroundColor: s.color }} />
                  </div>
                  <span className="text-gray-800 text-sm font-medium w-8 text-right">{s.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Impressões por produto */}
      <ChartCard title="Impressões por Produto" subtitle="Comparação de visualizações e conversões por artigo">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={productBarData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="nome" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" interval={0} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltipSimple />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="visualizacoes" name="Visualizações" fill="#bfdbfe" radius={[6, 6, 0, 0]} />
            <Bar dataKey="vendas" name="Vendas" fill="#059669" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Insight box */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <p className="text-blue-900 text-sm font-semibold">Insight sobre Visibilidade</p>
          <p className="text-blue-700 text-sm mt-1">
            Os seus produtos têm uma taxa de clique médio de <strong>7,2%</strong> face às impressões — significativamente acima da média da plataforma de 5,3%. O produto <em>AirPods Pro 2</em> regista o maior número de visualizações (1.580) e é também o mais vendido.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: RECEITA & COMISSÕES
// ═══════════════════════════════════════════════════════════════════════════════

function ReceitaSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Receita & Comissões"
        subtitle="Análise financeira detalhada — correlacionada com dados da plataforma"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={Euro} label="Receita Total (Abr)" value="€48.750" badge="+11%" badgePositive iconBg="bg-emerald-50" iconColor="text-emerald-700" sub="vs. março €43.800" />
        <KpiCard icon={TrendingDown} label="Comissões Pagas" value="€9.750" badge="20%" iconBg="bg-amber-50" iconColor="text-amber-600" sub="taxa fixa de plataforma" />
        <KpiCard icon={TrendingUp} label="Receita Líquida" value="€39.000" badge="+11%" badgePositive iconBg="bg-teal-50" iconColor="text-teal-700" sub="após dedução de comissões" />
        <KpiCard icon={ShoppingCart} label="Ticket Médio" value="€260,70" badge="+4%" badgePositive iconBg="bg-violet-50" iconColor="text-violet-700" sub="por encomenda (Abr)" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard title="Receita vs. Comissões" subtitle="Evolução mensal Jan–Abr 2026" badge="Últimos 4 meses" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipLine />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Bar dataKey="receita" name="Receita Bruta" fill="#d1fae5" radius={[6, 6, 0, 0]} />
              <Bar dataKey="liquido" name="Receita Líquida" fill="#059669" radius={[6, 6, 0, 0]} />
              <Line type="monotone" dataKey="comissao" name="Comissões Pagas" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 4" dot={{ r: 4, fill: "#f59e0b", strokeWidth: 0 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Receita por Categoria" subtitle="Abril 2026">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={categoryRevenueData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {categoryRevenueData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomDonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryRevenueData.map((c) => (
              <div key={c.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-gray-600 text-sm">{c.name}</span>
                </div>
                <span className="text-gray-800 text-sm font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Receita por Categoria — Evolução Mensal" subtitle="Jan–Abr 2026, todas as categorias">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueByCategoryTrend} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltipLine />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
            <Bar dataKey="smartphones" name="Smartphones" stackId="a" fill="#059669" />
            <Bar dataKey="laptops" name="Laptops" stackId="a" fill="#064e3b" />
            <Bar dataKey="acessorios" name="Acessórios" stackId="a" fill="#34d399" />
            <Bar dataKey="tablets" name="Tablets" stackId="a" fill="#a7f3d0" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Tabela mensal */}
      <ChartCard title="Detalhe Mensal" subtitle="Receita, comissões e receita líquida por mês">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {["Período", "Receita Bruta", "Comissão LOOP (20%)", "Receita Líquida", "Encomendas", "Ticket Médio", "Variação"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-gray-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {revenueData.map((row, i) => {
                const orders = [280, 310, 295, 362][i];
                const ticket = Math.round(row.receita / orders);
                const prev = i > 0 ? revenueData[i - 1].receita : null;
                const pct = prev ? (((row.receita - prev) / prev) * 100).toFixed(1) : null;
                return (
                  <tr key={row.mes} className={`hover:bg-gray-50/60 transition-colors ${i === 3 ? "bg-emerald-50/30" : ""}`}>
                    <td className="py-3.5 px-3 text-gray-700 font-medium">{row.mes} 2026{i === 3 && <span className="ml-1.5 text-xs text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">atual</span>}</td>
                    <td className="py-3.5 px-3 text-gray-900 font-medium">€{row.receita.toLocaleString("pt-PT")}</td>
                    <td className="py-3.5 px-3 text-amber-700">€{row.comissao.toLocaleString("pt-PT")}</td>
                    <td className="py-3.5 px-3 text-emerald-700 font-semibold">€{row.liquido.toLocaleString("pt-PT")}</td>
                    <td className="py-3.5 px-3 text-gray-600">{orders}</td>
                    <td className="py-3.5 px-3 text-gray-600">€{ticket}</td>
                    <td className="py-3.5 px-3">
                      {pct ? (
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-md ${parseFloat(pct) >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                          {parseFloat(pct) >= 0 ? "+" : ""}{pct}%
                        </span>
                      ) : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: AVALIAÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

function AvaliacoesSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Avaliações & Satisfação"
        subtitle="Classificação média atribuída pelos compradores — Abril 2026"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={Star} label="Classificação Média" value="4,8 ★" badge="+0.3" badgePositive iconBg="bg-amber-50" iconColor="text-amber-500" sub="melhorou vs. trimestre" />
        <KpiCard icon={Users} label="Total de Avaliações" value="247" badge="+66" badgePositive iconBg="bg-emerald-50" iconColor="text-emerald-700" sub="recebidas em 2026" />
        <KpiCard icon={CheckCircle} label="Avaliações Positivas" value="91,9%" badge="+2.1pp" badgePositive iconBg="bg-green-50" iconColor="text-green-700" sub="4 ou 5 estrelas" />
        <KpiCard icon={AlertCircle} label="Avaliações Negativas" value="5,3%" badge="-0.8pp" badgePositive iconBg="bg-rose-50" iconColor="text-rose-600" sub="1 ou 2 estrelas" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Rating Distribution */}
        <ChartCard title="Distribuição por Estrelas" subtitle="Total de 247 avaliações">
          <div className="space-y-3 mt-2">
            {ratingDistribution.map((r) => (
              <div key={r.estrelas} className="flex items-center gap-3">
                <span className="text-gray-700 text-sm w-8 flex-shrink-0 font-medium">{r.estrelas}</span>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${r.pct}%`, backgroundColor: r.color }}
                  />
                </div>
                <span className="text-gray-500 text-sm w-8 text-right">{r.count}</span>
              </div>
            ))}
          </div>

          {/* Big rating display */}
          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-4">
            <div className="text-center">
              <p className="text-5xl font-bold text-gray-900">4.8</p>
              <StarRating rating={5} size="md" />
              <p className="text-gray-400 text-xs mt-1">247 avaliações</p>
            </div>
            <div className="flex-1 ml-2">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-amber-800 text-xs">
                  <strong>Top 3%</strong> dos parceiros na plataforma. A sua classificação média supera a média global de <strong>4,2 ★</strong>.
                </p>
              </div>
            </div>
          </div>
        </ChartCard>

        {/* Rating trend */}
        <ChartCard title="Evolução da Classificação" subtitle="Tendência da nota média" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={ratingTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="rating" domain={[4, 5]} tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="reviews" orientation="right" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltipLine />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
              <Bar yAxisId="reviews" dataKey="reviews" name="Nº Avaliações" fill="#fef3c7" radius={[4, 4, 0, 0]} />
              <Line yAxisId="rating" type="monotone" dataKey="rating" name="Classificação Média" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: "#f59e0b", strokeWidth: 0 }} activeDot={{ r: 7 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Reviews */}
      <ChartCard title="Avaliações Recentes" subtitle="Últimas 5 avaliações de compradores">
        <div className="space-y-3">
          {recentReviews.map((review, i) => (
            <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {review.cliente[0]}
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">{review.cliente}</p>
                    <p className="text-gray-400 text-xs">{review.produto}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <StarRating rating={review.rating} />
                  <span className="text-gray-400 text-xs">{review.data}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic pl-11">"{review.comentario}"</p>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: PRODUTOS
// ═══════════════════════════════════════════════════════════════════════════════

function ProdutosSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Análise de Produtos"
        subtitle="Performance detalhada por produto — mais e menos vendidos"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard icon={Package} label="Produtos Ativos" value="8" sub="no catálogo LOOP" iconBg="bg-emerald-50" iconColor="text-emerald-700" />
        <KpiCard icon={TrendingUp} label="Produto Top" value="AirPods Pro 2" badge="54 vendas" badgePositive iconBg="bg-blue-50" iconColor="text-blue-700" sub="maior volume" />
        <KpiCard icon={Euro} label="Maior Receita" value="MacBook Air M3" badge="€36.768" badgePositive iconBg="bg-violet-50" iconColor="text-violet-700" sub="maior valor gerado" />
        <KpiCard icon={AlertCircle} label="Produto a Melhorar" value="Sony WH-XM5" badge="12 vendas" badgePositive={false} iconBg="bg-orange-50" iconColor="text-orange-600" sub="menor volume" />
      </div>

      {/* Bar chart geral */}
      <ChartCard title="Visualizações vs. Vendas por Produto" subtitle="Comparação entre tráfego e conversão">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={productBarData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="nome" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} angle={-25} textAnchor="end" interval={0} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltipSimple />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="visualizacoes" name="Visualizações" fill="#bfdbfe" radius={[6, 6, 0, 0]} />
            <Bar dataKey="vendas" name="Vendas" fill="#059669" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Top Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Produtos Mais Vendidos
              </h3>
              <p className="text-gray-500 text-sm">Top 5 em Abril 2026</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Produto</th>
                  <th className="text-right py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Vendas</th>
                  <th className="text-right py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Receita</th>
                  <th className="text-right py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topProducts.map((p, i) => (
                  <tr key={p.nome} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-gray-800 font-medium text-sm truncate max-w-[120px]">{p.nome}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right text-gray-700">{p.vendas}</td>
                    <td className="py-3.5 px-4 text-right text-emerald-700 font-medium">€{p.receita.toLocaleString("pt-PT")}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-amber-600 font-medium">{p.rating} ★</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 text-base font-semibold flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange-500" />
                Produtos Menos Vendidos
              </h3>
              <p className="text-gray-500 text-sm">Oportunidades de melhoria</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/60">
                  <th className="text-left py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Produto</th>
                  <th className="text-right py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Vendas</th>
                  <th className="text-right py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Views</th>
                  <th className="text-right py-2.5 px-4 text-gray-500 text-xs uppercase tracking-wider">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bottomProducts.map((p) => (
                  <tr key={p.nome} className="hover:bg-orange-50/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <TrendingDown className="w-4 h-4 text-orange-400 flex-shrink-0" />
                        <span className="text-gray-800 font-medium text-sm truncate max-w-[130px]">{p.nome}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right text-orange-600 font-medium">{p.vendas}</td>
                    <td className="py-3.5 px-4 text-right text-gray-500">{p.visualizacoes}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-amber-600 font-medium">{p.rating} ★</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 bg-orange-50/50">
            <p className="text-xs text-orange-800">
              <strong>Sugestão LOOP AI:</strong> Atualize as imagens e otimize as descrições destes produtos — têm baixas visualizações face ao catálogo e margem de melhoria considerável.
            </p>
          </div>
        </div>
      </div>

      {/* Product details grid */}
      <ChartCard title="Detalhes Completos por Produto" subtitle="Todas as métricas por artigo">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60">
                {["Produto", "Vendas", "Visualizações", "Taxa Conv.", "Receita", "Rating", "Stock", "Estado"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 text-gray-500 text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[...topProducts, ...bottomProducts].map((p, i) => (
                <tr key={p.nome} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-3 text-gray-800 font-medium">{p.nome}</td>
                  <td className="py-3.5 px-3 text-gray-700">{p.vendas}</td>
                  <td className="py-3.5 px-3 text-gray-600">{p.visualizacoes}</td>
                  <td className="py-3.5 px-3 text-emerald-700">{p.taxaConv}%</td>
                  <td className="py-3.5 px-3 text-gray-900 font-medium">€{p.receita.toLocaleString("pt-PT")}</td>
                  <td className="py-3.5 px-3 text-amber-600">{p.rating} ★</td>
                  <td className="py-3.5 px-3 text-gray-600">{p.stock} un.</td>
                  <td className="py-3.5 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      p.stock > 10 ? "bg-emerald-100 text-emerald-700" :
                      p.stock > 5 ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {p.stock > 10 ? "Disponível" : p.stock > 5 ? "Limitado" : "Crítico"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: COMPARAÇÃO GLOBAL
// ═══════════════════════════════════════════════════════════════════════════════

function ComparacaoSection() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Comparação Global Anónima"
        subtitle="Desempenho face à média global dos parceiros da plataforma LOOP"
      />

      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-2xl p-6 text-white flex items-center justify-between">
        <div>
          <p className="text-emerald-300 text-sm mb-1">Ranking Atual</p>
          <p className="text-4xl font-bold">#1 <span className="text-2xl text-emerald-300">/ 38</span></p>
          <p className="text-emerald-200 text-sm mt-1">parceiros ativos na plataforma</p>
        </div>
        <div className="text-right">
          <p className="text-emerald-300 text-sm mb-1">Pontuação Geral</p>
          <p className="text-4xl font-bold">88<span className="text-xl text-emerald-300">/100</span></p>
          <p className="text-emerald-200 text-sm mt-1">acima da média (67/100)</p>
        </div>
        <Award className="w-16 h-16 text-emerald-400 opacity-80 hidden xl:block" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <ChartCard title="Radar de Desempenho" subtitle="O seu desempenho vs. média global dos parceiros">
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={comparisonData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metrica" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} tickCount={5} />
              <Radar name="TechRenew Lisboa" dataKey="voce" stroke="#059669" fill="#059669" fillOpacity={0.35} strokeWidth={2.5} />
              <Radar name="Média Global LOOP" dataKey="media" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.15} strokeWidth={2} strokeDasharray="5 4" />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar comparison */}
        <ChartCard title="Comparação por Métrica" subtitle="Score percentual (0–100) por critério">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={comparisonData} layout="vertical" margin={{ top: 5, right: 15, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="metrica" type="category" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip content={<CustomTooltipSimple />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
              <Bar dataKey="media" name="Média Global" fill="#e5e7eb" radius={[0, 4, 4, 0]} />
              <Bar dataKey="voce" name="TechRenew Lisboa" fill="#059669" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Metrics comparison table */}
      <ChartCard title="Indicadores Detalhados" subtitle="Comparação anónima com a plataforma (dados agregados sem identificação de terceiros)">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {comparisonMetrics.map((m) => (
            <div key={m.label} className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
              <p className="text-gray-500 text-xs mb-2 font-medium uppercase tracking-wider">{m.label}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-900 text-lg font-bold">{m.voce}</p>
                  <p className="text-gray-400 text-xs mt-0.5">o seu resultado</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-base">{m.media}</p>
                  <p className="text-gray-400 text-xs mt-0.5">média global</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 text-xs font-medium">Acima da média</span>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-gray-500 text-sm">
          A comparação é completamente anónima. Os dados da média global são calculados a partir de todos os parceiros ativos sem revelar informação identificável de terceiros. Os dados são atualizados mensalmente pela equipa LOOP.
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION: RELATÓRIOS & EXPORTAÇÃO
// ═══════════════════════════════════════════════════════════════════════════════

function RelatoriosSection({ onExport }: { onExport: (format: "Excel" | "PDF", report: string) => void }) {
  const reports = [
    {
      id: "completo",
      titulo: "Relatório Completo",
      desc: "Todos os indicadores: impressões, receita, avaliações, produtos e comparação global.",
      icon: FileText,
      color: "emerald",
      pages: "~12 páginas",
    },
    {
      id: "impressoes",
      titulo: "Relatório de Impressões",
      desc: "Análise de tráfego, visitantes únicos, fontes e conversões por produto.",
      icon: Eye,
      color: "blue",
      pages: "~4 páginas",
    },
    {
      id: "receita",
      titulo: "Relatório Financeiro",
      desc: "Receita bruta, comissões pagas, receita líquida e breakdown por categoria.",
      icon: Euro,
      color: "amber",
      pages: "~5 páginas",
    },
    {
      id: "avaliacoes",
      titulo: "Relatório de Avaliações",
      desc: "Classificação média, distribuição por estrelas e avaliações recentes.",
      icon: Star,
      color: "violet",
      pages: "~3 páginas",
    },
    {
      id: "produtos",
      titulo: "Relatório de Produtos",
      desc: "Performance detalhada, top e bottom produtos, taxa de conversão por artigo.",
      icon: Package,
      color: "teal",
      pages: "~4 páginas",
    },
    {
      id: "comparacao",
      titulo: "Relatório de Comparação",
      desc: "Análise do desempenho face à média global da plataforma LOOP.",
      icon: Globe,
      color: "rose",
      pages: "~3 páginas",
    },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    teal: "bg-teal-50 text-teal-700 border-teal-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const iconColorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    violet: "bg-violet-100 text-violet-700",
    teal: "bg-teal-100 text-teal-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Relatórios & Exportação"
        subtitle="Exporte os seus dados em formato Excel (.xlsx) ou PDF para partilha e análise"
      />

      {/* Info banner */}
      <div className="bg-emerald-900 rounded-2xl p-6 text-white flex items-center justify-between gap-4">
        <div>
          <p className="text-emerald-300 text-sm mb-1">Centro de Exportação</p>
          <p className="text-xl font-semibold">Todos os dados exportáveis</p>
          <p className="text-emerald-200 text-sm mt-1">Escolha o relatório e o formato pretendido. Os ficheiros serão gerados instantaneamente.</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 bg-emerald-800 rounded-xl px-3 py-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
            <span className="text-emerald-200 text-sm">.xlsx</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-800 rounded-xl px-3 py-2">
            <FileText className="w-5 h-5 text-red-300" />
            <span className="text-emerald-200 text-sm">.pdf</span>
          </div>
        </div>
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.id} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow ${colorMap[r.color]}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconColorMap[r.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs text-gray-400">{r.pages}</span>
              </div>
              <p className="text-gray-900 text-sm font-semibold mb-1">{r.titulo}</p>
              <p className="text-gray-500 text-xs mb-4 leading-relaxed">{r.desc}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onExport("Excel", r.titulo)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-xl py-2 text-xs font-medium transition-all"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Excel
                </button>
                <button
                  onClick={() => onExport("PDF", r.titulo)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-xl py-2 text-xs font-medium transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick export of all */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-gray-900 text-base font-semibold mb-1">Exportação Rápida — Relatório Completo</h3>
        <p className="text-gray-500 text-sm mb-5">Exporte todos os dados consolidados de uma só vez.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onExport("Excel", "Relatório Completo")}
            className="flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
          >
            <FileSpreadsheet className="w-5 h-5" />
            Exportar Tudo para Excel (.xlsx)
          </button>
          <button
            onClick={() => onExport("PDF", "Relatório Completo")}
            className="flex items-center justify-center gap-2.5 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
          >
            <FileText className="w-5 h-5" />
            Exportar Tudo para PDF
          </button>
        </div>
      </div>

      {/* History (mock) */}
      <ChartCard title="Histórico de Exportações" subtitle="Últimas exportações realizadas">
        <div className="space-y-3">
          {[
            { nome: "Relatório Completo Março 2026", formato: "PDF", data: "01/04/2026 14:32", tamanho: "2.4 MB" },
            { nome: "Relatório Financeiro Março 2026", formato: "Excel", data: "31/03/2026 10:15", tamanho: "856 KB" },
            { nome: "Relatório de Impressões Fevereiro 2026", formato: "Excel", data: "01/03/2026 09:40", tamanho: "612 KB" },
            { nome: "Relatório Completo Fevereiro 2026", formato: "PDF", data: "01/03/2026 09:38", tamanho: "2.1 MB" },
          ].map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${h.formato === "PDF" ? "bg-red-100" : "bg-emerald-100"}`}>
                {h.formato === "PDF"
                  ? <FileText className="w-4 h-4 text-red-600" />
                  : <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 text-sm font-medium truncate">{h.nome}</p>
                <p className="text-gray-400 text-xs">{h.data} · {h.tamanho}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${h.formato === "PDF" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                .{h.formato.toLowerCase()}
              </span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function PartnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>("impressoes");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [period, setPeriod] = useState<Period>("mes");

  useEffect(() => {
    if (!user || !user.isPartner) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user || !user.isPartner) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleExport = useCallback(
    (format: "Excel" | "PDF", report: string = "Relatório Completo") => {
      setExportMenuOpen(false);
      setIsExporting(true);
      setTimeout(() => {
        setIsExporting(false);
        toast.success(`"${report}" exportado em formato ${format}!`, {
          description: `O ficheiro ${format === "Excel" ? ".xlsx" : ".pdf"} foi gerado com sucesso.`,
          duration: 4000,
        });
      }, 1800);
    },
    []
  );

  const periodLabels: Record<Period, string> = {
    hoje: "Hoje",
    semana: "Esta semana",
    mes: "Abril 2026",
    trimestre: "Q2 2026",
  };

  const sectionTitle = navItems.find((i) => i.id === activeSection)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-emerald-900 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-emerald-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-400 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-emerald-900 text-base font-extrabold">L</span>
            </div>
            <div>
              <span className="text-white text-lg font-bold tracking-widest">LOOP</span>
              <span className="block text-emerald-400 text-xs -mt-0.5 font-medium tracking-wide">Enterprise Panel</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-emerald-300 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Period selector in sidebar */}
        <div className="px-4 py-3 border-b border-emerald-800/60">
          <p className="text-emerald-400 text-xs mb-2 font-medium uppercase tracking-wider">Período</p>
          <div className="grid grid-cols-2 gap-1">
            {(["hoje", "semana", "mes", "trimestre"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs py-1.5 rounded-lg transition-colors font-medium ${
                  period === p
                    ? "bg-emerald-400 text-emerald-900"
                    : "text-emerald-300 hover:bg-emerald-800 hover:text-white"
                }`}
              >
                {periodLabels[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left group ${
                activeSection === id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-emerald-200 hover:bg-emerald-800 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium flex-1">{label}</span>
              {badge && (
                <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                  activeSection === id
                    ? "bg-emerald-600 text-emerald-100"
                    : "bg-emerald-800 text-emerald-300 group-hover:bg-emerald-700"
                }`}>
                  {badge}
                </span>
              )}
              {activeSection === id && <ChevronRight className="w-3.5 h-3.5 text-emerald-300 flex-shrink-0" />}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="px-4 py-3 border-t border-emerald-800">
          <div className="bg-emerald-800/50 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-emerald-300 text-xs font-medium">Ranking</span>
              <span className="text-white text-xs font-bold">#1 / 38</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-emerald-300 text-xs font-medium">Score</span>
              <span className="text-white text-xs font-bold">88/100</span>
            </div>
            <div className="mt-2 h-1.5 bg-emerald-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: "88%" }} />
            </div>
          </div>
        </div>

        {/* Partner + actions */}
        <div className="px-3 pb-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              T
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-medium truncate">TechRenew Lisboa</p>
              <p className="text-emerald-400 text-xs truncate">{user.email}</p>
            </div>
          </div>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-emerald-200 hover:bg-emerald-800 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Ver Site Público</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ═════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 flex-shrink-0"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-gray-900 text-xl font-semibold truncate">{sectionTitle}</h1>
                <span className="hidden sm:inline text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                  {periodLabels[period]}
                </span>
              </div>
              <p className="text-gray-500 text-sm truncate">
                TechRenew Lisboa · Parceiro #1 · Abril 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Period filter (top bar, compact) */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              {(["hoje", "semana", "mes", "trimestre"] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    period === p
                      ? "bg-white text-emerald-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {periodLabels[p]}
                </button>
              ))}
            </div>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                disabled={isExporting}
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-70 flex-shrink-0"
              >
                {isExporting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Exportar</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {exportMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">Exportar Relatório</p>
                  </div>
                  <button
                    onClick={() => handleExport("Excel")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <div className="text-left">
                      <p className="font-medium">Excel (.xlsx)</p>
                      <p className="text-xs text-gray-400">Dados tabelares completos</p>
                    </div>
                  </button>
                  <div className="h-px bg-gray-100 w-full" />
                  <button
                    onClick={() => handleExport("PDF")}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-4 h-4 text-red-500" />
                    <div className="text-left">
                      <p className="font-medium">PDF</p>
                      <p className="text-xs text-gray-400">Relatório formatado</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <main
          className="flex-1 overflow-y-auto px-6 py-6"
          onClick={() => exportMenuOpen && setExportMenuOpen(false)}
        >
          {activeSection === "impressoes" && <ImpressoesSection />}
          {activeSection === "receita" && <ReceitaSection />}
          {activeSection === "avaliacoes" && <AvaliacoesSection />}
          {activeSection === "produtos" && <ProdutosSection />}
          {activeSection === "comparacao" && <ComparacaoSection />}
          {activeSection === "relatorios" && <RelatoriosSection onExport={handleExport} />}
        </main>
      </div>
    </div>
  );
}
