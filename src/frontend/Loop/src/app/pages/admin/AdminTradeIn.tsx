import { useState } from "react";
import {
  RefreshCw,
  Search,
  Filter,
  Bell,
  Check,
  X,
  Eye,
  ChevronDown,
  Send,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Clock,
  Euro,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

interface TradeInRequest {
  id: string;
  cliente: string;
  email: string;
  telefone: string;
  dispositivo: string;
  categoria: "Smartphone" | "Laptop" | "Tablet" | "Áudio";
  marca: string;
  modelo: string;
  estado: "Excelente" | "Bom" | "Aceitável" | "Com Danos";
  descricao: string;
  valorEstimadoCliente: number;
  valorOferta?: number;
  data: string;
  status: "Pendente" | "Em Avaliação" | "Aprovado" | "Rejeitado" | "Concluído";
  imagens: number;
  notas?: string;
}

const mockTradeIns: TradeInRequest[] = [
  {
    id: "TI-2026-0041",
    cliente: "Sofia Lima",
    email: "sofia.lima@email.pt",
    telefone: "+351 913 456 789",
    dispositivo: "iPhone 13 Pro",
    categoria: "Smartphone",
    marca: "Apple",
    modelo: "iPhone 13 Pro 256GB",
    estado: "Excelente",
    descricao: "Telemóvel em perfeito estado, sem riscos ou danos. Bateria a 91%. Inclui caixa original.",
    valorEstimadoCliente: 450,
    data: "23/04/2026",
    status: "Pendente",
    imagens: 4,
  },
  {
    id: "TI-2026-0040",
    cliente: "João Oliveira",
    email: "joao.oliveira@email.pt",
    telefone: "+351 914 567 890",
    dispositivo: "MacBook Pro 14\"",
    categoria: "Laptop",
    marca: "Apple",
    modelo: "MacBook Pro 14\" M1 Pro 16GB",
    estado: "Bom",
    descricao: "Portátil com alguns riscos superficiais na tampa. Funciona perfeitamente. Bateria a 87%.",
    valorEstimadoCliente: 900,
    valorOferta: 750,
    data: "22/04/2026",
    status: "Em Avaliação",
    imagens: 6,
    notas: "Riscos na tampa são menores que o esperado. Propomos €750.",
  },
  {
    id: "TI-2026-0039",
    cliente: "Maria Santos",
    email: "maria.santos@email.pt",
    telefone: "+351 915 678 901",
    dispositivo: "Samsung Galaxy S22",
    categoria: "Smartphone",
    marca: "Samsung",
    modelo: "Galaxy S22 Ultra 128GB",
    estado: "Bom",
    descricao: "Ecrã sem riscos, parte traseira com pequeno risco. Todas as funcionalidades operacionais.",
    valorEstimadoCliente: 350,
    valorOferta: 280,
    data: "21/04/2026",
    status: "Aprovado",
    imagens: 3,
    notas: "Aprovado por €280. Cliente notificado.",
  },
  {
    id: "TI-2026-0038",
    cliente: "Pedro Costa",
    email: "pedro.costa@email.pt",
    telefone: "+351 916 789 012",
    dispositivo: "iPad Pro 2021",
    categoria: "Tablet",
    marca: "Apple",
    modelo: "iPad Pro 11\" M1 256GB Wi-Fi",
    estado: "Aceitável",
    descricao: "Ecrã com pequenas marcas de uso. Cantos ligeiramente danificados. Funcional.",
    valorEstimadoCliente: 500,
    data: "20/04/2026",
    status: "Rejeitado",
    imagens: 5,
    notas: "Estado do ecrã não cumpre requisitos mínimos.",
  },
  {
    id: "TI-2026-0037",
    cliente: "Ana Ferreira",
    email: "ana.ferreira@email.pt",
    telefone: "+351 917 890 123",
    dispositivo: "AirPods Max",
    categoria: "Áudio",
    marca: "Apple",
    modelo: "AirPods Max Silver",
    estado: "Excelente",
    descricao: "Headphones em excelente estado. Almofadas sem desgaste. Inclui capa Smart Case.",
    valorEstimadoCliente: 250,
    valorOferta: 210,
    data: "20/04/2026",
    status: "Concluído",
    imagens: 4,
    notas: "Trade-in concluído. Crédito aplicado na conta.",
  },
  {
    id: "TI-2026-0036",
    cliente: "Carlos Mendes",
    email: "carlos.mendes@email.pt",
    telefone: "+351 918 901 234",
    dispositivo: "Dell XPS 13",
    categoria: "Laptop",
    marca: "Dell",
    modelo: "XPS 13 9310 Intel i7 16GB",
    estado: "Bom",
    descricao: "Portátil com desgaste normal de uso. Teclado e ecrã em bom estado.",
    valorEstimadoCliente: 500,
    data: "19/04/2026",
    status: "Pendente",
    imagens: 3,
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  Pendente: { label: "Pendente", color: "bg-amber-100 text-amber-800 border-amber-200", icon: Clock },
  "Em Avaliação": { label: "Em Avaliação", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Eye },
  Aprovado: { label: "Aprovado", color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: CheckCircle },
  Rejeitado: { label: "Rejeitado", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
  Concluído: { label: "Concluído", color: "bg-gray-100 text-gray-700 border-gray-200", icon: CheckCircle },
};

const categoryIcons: Record<string, any> = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Tablet: Tablet,
  Áudio: Headphones,
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status];
  const Icon = cfg?.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border ${cfg?.color ?? "bg-gray-100 text-gray-700 border-gray-200"}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {cfg?.label ?? status}
    </span>
  );
}

interface NotifyModalProps {
  request: TradeInRequest;
  onClose: () => void;
}

function NotifyModal({ request, onClose }: NotifyModalProps) {
  const [message, setMessage] = useState("");
  const [tipo, setTipo] = useState<"avaliacao" | "aprovacao" | "rejeicao" | "personalizada">("avaliacao");
  const [sending, setSending] = useState(false);

  const templates = {
    avaliacao: `Olá ${request.cliente},\n\nO seu pedido de Trade-in ${request.id} para o(a) ${request.modelo} está em avaliação.\n\nEntre em contacto caso tenha questões.\n\nEquipa LOOP`,
    aprovacao: `Olá ${request.cliente},\n\nTemos boas notícias! O seu Trade-in ${request.id} foi aprovado.\n\nValor oferecido: €${request.valorOferta ?? "—"}\n\nResponda a este email para confirmar a aceitação.\n\nEquipa LOOP`,
    rejeicao: `Olá ${request.cliente},\n\nInfelizmente não podemos aceitar o seu pedido de Trade-in ${request.id} para o(a) ${request.modelo} no estado atual.\n\nPode submeter um novo pedido caso o dispositivo seja reparado.\n\nEquipa LOOP`,
    personalizada: "",
  };

  const handleSelectTemplate = (t: typeof tipo) => {
    setTipo(t);
    setMessage(templates[t]);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    toast.success(`Notificação enviada para ${request.email}`, {
      description: "O cliente será notificado por email.",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-gray-900">Enviar Notificação</h3>
              <p className="text-gray-500 text-xs">Para: {request.cliente} ({request.email})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Template selector */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Tipo de notificação</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "avaliacao", label: "Em Avaliação" },
                { value: "aprovacao", label: "Aprovado" },
                { value: "rejeicao", label: "Rejeitado" },
                { value: "personalizada", label: "Personalizada" },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => handleSelectTemplate(t.value as typeof tipo)}
                  className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                    tipo === t.value
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message area */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Mensagem</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 resize-none"
              placeholder="Escreva a mensagem para o cliente..."
            />
          </div>

          {/* Request ref */}
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <MessageSquare className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              Referência: <strong className="text-gray-700">{request.id}</strong> — {request.modelo}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3 rounded-xl transition-colors text-sm disabled:opacity-70"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar Notificação
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface DetailModalProps {
  request: TradeInRequest;
  onClose: () => void;
  onNotify: () => void;
  onUpdateStatus: (id: string, status: TradeInRequest["status"], oferta?: number) => void;
}

function DetailModal({ request, onClose, onNotify, onUpdateStatus }: DetailModalProps) {
  const [oferta, setOferta] = useState(request.valorOferta?.toString() ?? "");
  const [nota, setNota] = useState(request.notas ?? "");
  const CatIcon = categoryIcons[request.categoria] ?? Smartphone;

  const handleApprove = () => {
    const val = parseFloat(oferta);
    if (!val || isNaN(val)) {
      toast.error("Insira um valor de oferta válido");
      return;
    }
    onUpdateStatus(request.id, "Aprovado", val);
    toast.success(`Trade-in ${request.id} aprovado por €${val}`);
    onClose();
  };

  const handleReject = () => {
    onUpdateStatus(request.id, "Rejeitado");
    toast.info(`Trade-in ${request.id} rejeitado`);
    onClose();
  };

  const handleEvaluate = () => {
    onUpdateStatus(request.id, "Em Avaliação");
    toast.success(`Trade-in ${request.id} movido para avaliação`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-5 border-b border-gray-100 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CatIcon className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-gray-900">{request.id}</h3>
              <p className="text-gray-500 text-xs">{request.modelo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={request.status} />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors ml-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Client info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Cliente</p>
              <p className="text-gray-900 text-sm">{request.cliente}</p>
              <p className="text-gray-500 text-xs mt-0.5">{request.email}</p>
              <p className="text-gray-500 text-xs">{request.telefone}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Dispositivo</p>
              <p className="text-gray-900 text-sm">{request.modelo}</p>
              <p className="text-gray-500 text-xs mt-0.5">{request.categoria} · {request.marca}</p>
              <p className="text-gray-500 text-xs">Submetido: {request.data}</p>
            </div>
          </div>

          {/* Device state & description */}
          <div className="p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-700">Estado Declarado pelo Cliente</p>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                request.estado === "Excelente" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                request.estado === "Bom" ? "bg-blue-100 text-blue-800 border-blue-200" :
                request.estado === "Aceitável" ? "bg-amber-100 text-amber-800 border-amber-200" :
                "bg-red-100 text-red-800 border-red-200"
              }`}>
                {request.estado}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{request.descricao}</p>
            <div className="flex items-center gap-2 mt-3">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">{request.imagens} imagens submetidas pelo cliente</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-xs text-amber-700 mb-1">Valor Estimado pelo Cliente</p>
              <p className="text-amber-900 text-2xl">€{request.valorEstimadoCliente}</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-xs text-emerald-700 mb-1">Oferta LOOP</p>
              {request.valorOferta ? (
                <p className="text-emerald-900 text-2xl">€{request.valorOferta}</p>
              ) : (
                <div className="flex items-center gap-2">
                  <Euro className="w-4 h-4 text-emerald-600" />
                  <input
                    type="number"
                    value={oferta}
                    onChange={(e) => setOferta(e.target.value)}
                    placeholder="0"
                    className="text-2xl text-emerald-900 bg-transparent outline-none w-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Notas Internas</label>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              rows={3}
              placeholder="Adicione notas internas sobre esta avaliação..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNotify}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              <Bell className="w-4 h-4" />
              Notificar Cliente
            </button>

            {request.status === "Pendente" && (
              <button
                onClick={handleEvaluate}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                Iniciar Avaliação
              </button>
            )}

            {(request.status === "Pendente" || request.status === "Em Avaliação") && (
              <>
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-colors text-sm"
                >
                  <Check className="w-4 h-4" />
                  Aprovar Trade-in
                </button>
                <button
                  onClick={handleReject}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors text-sm"
                >
                  <X className="w-4 h-4" />
                  Rejeitar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminTradeIn() {
  const [requests, setRequests] = useState<TradeInRequest[]>(mockTradeIns);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");
  const [selectedRequest, setSelectedRequest] = useState<TradeInRequest | null>(null);
  const [notifyRequest, setNotifyRequest] = useState<TradeInRequest | null>(null);

  const statusOptions = ["Todos", "Pendente", "Em Avaliação", "Aprovado", "Rejeitado", "Concluído"];

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.cliente.toLowerCase().includes(search.toLowerCase()) ||
      r.modelo.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Todos" || r.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (id: string, status: TradeInRequest["status"], oferta?: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status, ...(oferta !== undefined ? { valorOferta: oferta } : {}) } : r
      )
    );
  };

  const pendentes = requests.filter((r) => r.status === "Pendente").length;
  const emAvaliacao = requests.filter((r) => r.status === "Em Avaliação").length;
  const aprovados = requests.filter((r) => r.status === "Aprovado").length;
  const totalValor = requests.filter((r) => r.valorOferta).reduce((sum, r) => sum + (r.valorOferta ?? 0), 0);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-2xl">Gestão de Trade-in</h1>
            <p className="text-gray-500 text-sm mt-1">
              {requests.length} pedidos · {pendentes} pendentes de resposta
            </p>
          </div>
          <div className="flex items-center gap-2">
            {pendentes > 0 && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 text-sm">
                  {pendentes} a aguardar avaliação
                </span>
              </div>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total de Pedidos", value: requests.length.toString(), color: "bg-gray-50", iconColor: "text-gray-700", icon: RefreshCw },
            { label: "Pendentes", value: pendentes.toString(), color: "bg-amber-50", iconColor: "text-amber-700", icon: Clock },
            { label: "Em Avaliação", value: emAvaliacao.toString(), color: "bg-blue-50", iconColor: "text-blue-700", icon: Eye },
            { label: "Valor Total Aprovado", value: `€${totalValor.toLocaleString("pt-PT")}`, color: "bg-emerald-50", iconColor: "text-emerald-700", icon: Euro },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{stat.label}</p>
                    <p className="text-gray-900 text-xl">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por ID, cliente ou dispositivo..."
                className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex gap-1 overflow-x-auto">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                      filterStatus === s
                        ? "bg-emerald-700 text-white"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trade-in Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["ID", "Cliente", "Dispositivo", "Estado", "Valor Cliente", "Oferta LOOP", "Status", "Data", "Ações"].map((col) => (
                    <th key={col} className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((req) => {
                  const CatIcon = categoryIcons[req.categoria] ?? Smartphone;
                  return (
                    <tr key={req.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-4 py-3.5">
                        <span className="text-emerald-700 text-sm font-mono">{req.id}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="text-gray-800 text-sm">{req.cliente}</p>
                          <p className="text-gray-500 text-xs">{req.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <CatIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                          <div>
                            <p className="text-gray-800 text-sm">{req.dispositivo}</p>
                            <p className="text-gray-500 text-xs">{req.categoria}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                          req.estado === "Excelente" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                          req.estado === "Bom" ? "bg-blue-100 text-blue-800 border-blue-200" :
                          req.estado === "Aceitável" ? "bg-amber-100 text-amber-800 border-amber-200" :
                          "bg-red-100 text-red-800 border-red-200"
                        }`}>
                          {req.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-600 text-sm">€{req.valorEstimadoCliente}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        {req.valorOferta ? (
                          <span className="text-emerald-700 text-sm">€{req.valorOferta}</span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-500 text-sm">{req.data}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setSelectedRequest(req)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setNotifyRequest(req)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Notificar cliente"
                          >
                            <Bell className="w-4 h-4" />
                          </button>
                          {req.status === "Pendente" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(req.id, "Em Avaliação")}
                                className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                                title="Iniciar avaliação"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                      Nenhum pedido encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <DetailModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onNotify={() => {
            setNotifyRequest(selectedRequest);
            setSelectedRequest(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* Notify Modal */}
      {notifyRequest && (
        <NotifyModal
          request={notifyRequest}
          onClose={() => setNotifyRequest(null)}
        />
      )}
    </>
  );
}
