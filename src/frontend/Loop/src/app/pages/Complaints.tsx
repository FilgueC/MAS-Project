import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import {
  AlertTriangle,
  ChevronLeft,
  Send,
  FileText,
  CheckCircle2,
  RotateCcw,
  Clock,
  Shield,
  Info,
  Package,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Complaint {
  id: string;
  orderId: string;
  type: "produto" | "entrega" | "servico" | "outro";
  subject: string;
  description: string;
  status: "Pendente" | "Em Análise" | "Resolvida" | "Rejeitada";
  date: string;
  response?: string;
}

interface Return {
  id: string;
  orderId: string;
  productName: string;
  reason: "defeito" | "nao-corresponde" | "danificado" | "outro";
  description: string;
  status: "Pendente" | "Aprovada" | "Rejeitada" | "Recolha Agendada" | "Concluída";
  date: string;
  orderDate: string;
  withinPolicy: boolean;
}

type Tab = "devolucoes" | "reclamacoes";

export function Complaints() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("devolucoes");
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [returns, setReturns] = useState<Return[]>([]);

  const [complaintForm, setComplaintForm] = useState({
    orderId: "",
    type: "produto" as Complaint["type"],
    subject: "",
    description: "",
  });

  const [returnForm, setReturnForm] = useState({
    orderId: "",
    productName: "",
    orderDate: "",
    reason: "defeito" as Return["reason"],
    description: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const savedComplaints = localStorage.getItem(`complaints_${user.id}`);
    if (savedComplaints) setComplaints(JSON.parse(savedComplaints));

    const savedReturns = localStorage.getItem(`returns_${user.id}`);
    if (savedReturns) setReturns(JSON.parse(savedReturns));
  }, [user, navigate]);

  if (!user) return null;

  const isWithinReturnPolicy = (orderDate: string) => {
    const order = new Date(orderDate);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - order.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintForm.subject || !complaintForm.description) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    const newComplaint: Complaint = {
      id: `REC-${Date.now()}`,
      orderId: complaintForm.orderId || "N/A",
      type: complaintForm.type,
      subject: complaintForm.subject,
      description: complaintForm.description,
      status: "Pendente",
      date: new Date().toISOString(),
    };
    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem(`complaints_${user.id}`, JSON.stringify(updated));
    toast.success("Reclamação enviada com sucesso!");
    setShowComplaintForm(false);
    setComplaintForm({ orderId: "", type: "produto", subject: "", description: "" });
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnForm.orderId || !returnForm.productName || !returnForm.orderDate || !returnForm.description) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }
    const withinPolicy = isWithinReturnPolicy(returnForm.orderDate);
    const newReturn: Return = {
      id: `DEV-${Date.now()}`,
      orderId: returnForm.orderId,
      productName: returnForm.productName,
      reason: returnForm.reason,
      description: returnForm.description,
      status: withinPolicy ? "Pendente" : "Rejeitada",
      date: new Date().toISOString(),
      orderDate: returnForm.orderDate,
      withinPolicy,
    };
    const updated = [newReturn, ...returns];
    setReturns(updated);
    localStorage.setItem(`returns_${user.id}`, JSON.stringify(updated));

    if (withinPolicy) {
      toast.success("Pedido de devolução submetido! Entraremos em contacto em 24h.");
    } else {
      toast.error(
        "Prazo de devolução expirado (30 dias). Será aplicada a garantia do produto."
      );
    }
    setShowReturnForm(false);
    setReturnForm({ orderId: "", productName: "", orderDate: "", reason: "defeito", description: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolvida":
      case "Concluída":
      case "Aprovada":
        return "bg-green-100 text-green-800";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Em Análise":
      case "Recolha Agendada":
        return "bg-blue-100 text-blue-800";
      case "Rejeitada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: Complaint["type"]) => {
    const labels = { produto: "Produto", entrega: "Entrega", servico: "Serviço", outro: "Outro" };
    return labels[type];
  };

  const getReturnReasonLabel = (reason: Return["reason"]) => {
    const labels = {
      defeito: "Produto com defeito",
      "nao-corresponde": "Não corresponde à descrição",
      danificado: "Chegou danificado",
      outro: "Outro motivo",
    };
    return labels[reason];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/conta" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-6">
            <ChevronLeft className="w-5 h-5" />
            Voltar à Conta
          </Link>

          <h1 className="text-3xl md:text-4xl mb-2 text-gray-900">Reclamações & Devoluções</h1>
          <p className="text-gray-600 mb-6">Gerir pedidos de devolução e reclamações</p>

          {/* Policy Info Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex gap-3">
            <Shield className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-900 text-sm mb-1">
                <strong>Política de Devoluções & Garantia LOOP</strong>
              </p>
              <ul className="text-emerald-700 text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Devolução gratuita: </strong>Tem <strong>30 dias</strong> após a receção do
                    produto para solicitar uma devolução sem qualquer custo.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Fora do prazo (após 30 dias): </strong>Aplica-se a garantia do produto
                    (mínimo 24 meses). Defeitos de fabrico são cobertos pela garantia LOOP.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-6">
            <button
              onClick={() => setActiveTab("devolucoes")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === "devolucoes"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              Devoluções ({returns.length})
            </button>
            <button
              onClick={() => setActiveTab("reclamacoes")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm transition-all ${
                activeTab === "reclamacoes"
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Reclamações ({complaints.length})
            </button>
          </div>

          {/* ─── DEVOLUÇÕES TAB ─── */}
          {activeTab === "devolucoes" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">{returns.length} {returns.length === 1 ? "devolução" : "devoluções"} registadas</p>
                <button
                  onClick={() => setShowReturnForm(!showReturnForm)}
                  className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  {showReturnForm ? "Cancelar" : "Pedir Devolução"}
                </button>
              </div>

              {/* Return Form */}
              {showReturnForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-white rounded-2xl shadow-md p-6 mb-6"
                >
                  <h2 className="text-xl mb-1 text-gray-900">Pedido de Devolução</h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Devoluções apenas aceites até 30 dias após a receção. Após esse prazo, aplica-se a garantia.
                  </p>
                  <form onSubmit={handleReturnSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Nº da Encomenda *</label>
                        <input
                          type="text"
                          value={returnForm.orderId}
                          onChange={(e) => setReturnForm({ ...returnForm, orderId: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Ex: ORD-2024-001"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Nome do Produto *</label>
                        <input
                          type="text"
                          value={returnForm.productName}
                          onChange={(e) => setReturnForm({ ...returnForm, productName: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Ex: iPhone 13 Pro"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Data de Receção do Produto *</label>
                      <input
                        type="date"
                        value={returnForm.orderDate}
                        onChange={(e) => setReturnForm({ ...returnForm, orderDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      {returnForm.orderDate && (
                        <div
                          className={`mt-2 p-2 rounded-lg text-xs flex items-center gap-2 ${
                            isWithinReturnPolicy(returnForm.orderDate)
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                          }`}
                        >
                          {isWithinReturnPolicy(returnForm.orderDate) ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Dentro do prazo de 30 dias — Devolução gratuita elegível
                            </>
                          ) : (
                            <>
                              <Info className="w-4 h-4" />
                              Fora do prazo de 30 dias — Será aplicada a garantia do produto
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Motivo da Devolução *</label>
                      <select
                        value={returnForm.reason}
                        onChange={(e) => setReturnForm({ ...returnForm, reason: e.target.value as Return["reason"] })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="defeito">Produto com defeito</option>
                        <option value="nao-corresponde">Não corresponde à descrição</option>
                        <option value="danificado">Chegou danificado</option>
                        <option value="outro">Outro motivo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Descrição do Problema *</label>
                      <textarea
                        value={returnForm.description}
                        onChange={(e) => setReturnForm({ ...returnForm, description: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        placeholder="Descreva detalhadamente o problema..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submeter Pedido de Devolução
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Returns List */}
              {returns.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h2 className="text-xl text-gray-700 mb-2">Nenhuma devolução registada</h2>
                  <p className="text-gray-500">Tem 30 dias após a receção para devolver qualquer produto.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {returns.map((ret) => (
                    <div key={ret.id} className="bg-white rounded-2xl shadow-md p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg text-gray-900">{ret.productName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(ret.status)}`}>
                              {ret.status}
                            </span>
                            {!ret.withinPolicy && (
                              <span className="px-3 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                                Fora do prazo — Garantia
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-1">
                            #{ret.id} • Encomenda {ret.orderId}
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            Submetido em {new Date(ret.date).toLocaleDateString("pt-PT")}
                          </p>
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Motivo:</strong> {getReturnReasonLabel(ret.reason)}
                          </p>
                          <p className="text-sm text-gray-600">{ret.description}</p>
                          {ret.withinPolicy && (
                            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                              <p className="text-xs text-emerald-700 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4" />
                                Dentro do prazo — Devolução gratuita. Receberá etiqueta de envio por email.
                              </p>
                            </div>
                          )}
                          {!ret.withinPolicy && (
                            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <p className="text-xs text-blue-700 flex items-center gap-1">
                                <Shield className="w-4 h-4" />
                                Fora do prazo — Pedido redirecionado para equipa de garantia (24 meses).
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── RECLAMAÇÕES TAB ─── */}
          {activeTab === "reclamacoes" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">{complaints.length} {complaints.length === 1 ? "reclamação" : "reclamações"}</p>
                <button
                  onClick={() => setShowComplaintForm(!showComplaintForm)}
                  className="bg-emerald-700 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {showComplaintForm ? "Cancelar" : "Nova Reclamação"}
                </button>
              </div>

              {/* Complaint Form */}
              {showComplaintForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-white rounded-2xl shadow-md p-6 mb-6"
                >
                  <h2 className="text-xl mb-5 text-gray-900">Submeter Reclamação</h2>
                  <form onSubmit={handleComplaintSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Nº da Encomenda (Opcional)</label>
                      <input
                        type="text"
                        value={complaintForm.orderId}
                        onChange={(e) => setComplaintForm({ ...complaintForm, orderId: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Ex: ORD-2024-001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Tipo de Reclamação *</label>
                      <select
                        value={complaintForm.type}
                        onChange={(e) => setComplaintForm({ ...complaintForm, type: e.target.value as Complaint["type"] })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="produto">Problema com o Produto</option>
                        <option value="entrega">Problema de Entrega</option>
                        <option value="servico">Atendimento ao Cliente</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Assunto *</label>
                      <input
                        type="text"
                        value={complaintForm.subject}
                        onChange={(e) => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Descreva brevemente o problema"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Descrição Detalhada *</label>
                      <textarea
                        value={complaintForm.description}
                        onChange={(e) => setComplaintForm({ ...complaintForm, description: e.target.value })}
                        rows={5}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                        placeholder="Descreva detalhadamente o problema..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Reclamação
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Complaints List */}
              {complaints.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center">
                  <AlertTriangle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h2 className="text-xl text-gray-700 mb-2">Nenhuma reclamação ainda</h2>
                  <p className="text-gray-500">Felizmente, não tem reclamações registadas.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="bg-white rounded-2xl shadow-md p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg text-gray-900">{complaint.subject}</h3>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {getTypeLabel(complaint.type)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                              {complaint.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-1">
                            #{complaint.id}
                            {complaint.orderId !== "N/A" && ` • Encomenda ${complaint.orderId}`}
                          </p>
                          <p className="text-sm text-gray-500 mb-3">
                            {new Date(complaint.date).toLocaleDateString("pt-PT", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-gray-700">{complaint.description}</p>
                          {complaint.response && (
                            <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                                <span className="text-sm text-emerald-900">Resposta da LOOP:</span>
                              </div>
                              <p className="text-sm text-gray-700">{complaint.response}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
