import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { 
  Package, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Star,
  Truck,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

interface Message {
  id: number;
  type: "order" | "tradein" | "system";
  title: string;
  message: string;
  date: string;
  read: boolean;
  icon: typeof Package;
  iconColor: string;
  bgColor: string;
}

export function Messages() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const messages: Message[] = [
    {
      id: 1,
      type: "order",
      title: "Encomenda #1001 enviada",
      message: "O seu iPhone 13 Pro foi enviado e está a caminho! Tempo estimado de entrega: 2-3 dias úteis.",
      date: "2026-03-12",
      read: false,
      icon: Truck,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      type: "tradein",
      title: "Avaliação Trade-In concluída",
      message: "O seu MacBook Pro 2019 foi avaliado em €450. A oferta é válida por 14 dias. Deseja aceitar?",
      date: "2026-03-11",
      read: false,
      icon: Star,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: 3,
      type: "order",
      title: "Encomenda #998 entregue",
      message: "A sua encomenda foi entregue com sucesso. Esperamos que esteja satisfeito com a sua compra!",
      date: "2026-03-10",
      read: true,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: 4,
      type: "system",
      title: "Lembrete: Garantia estendida",
      message: "Pode fazer upgrade para garantia de 36 meses por apenas +€49 no seu iPhone 13 Pro.",
      date: "2026-03-09",
      read: true,
      icon: AlertCircle,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 5,
      type: "tradein",
      title: "Trade-In recebido",
      message: "Recebemos o seu dispositivo para Trade-In. A avaliação será concluída em 2-3 dias úteis.",
      date: "2026-03-08",
      read: true,
      icon: Package,
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50",
    },
    {
      id: 6,
      type: "order",
      title: "Encomenda #995 em processamento",
      message: "A sua encomenda está a ser preparada para envio. Receberá uma notificação quando for enviada.",
      date: "2026-03-07",
      read: true,
      icon: Clock,
      iconColor: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  const unreadCount = messages.filter(m => !m.read).length;

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/conta")}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à conta
            </button>
            <h1 className="text-3xl text-gray-900 mb-2">
              Mensagens e Notificações
            </h1>
            <p className="text-gray-600">
              Acompanhe as suas encomendas, avaliações de Trade-In e outras notificações importantes
            </p>
          </div>

          {/* Unread Count */}
          {unreadCount > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-900">
                  Tem {unreadCount} {unreadCount === 1 ? "mensagem não lida" : "mensagens não lidas"}
                </span>
              </div>
            </div>
          )}

          {/* Messages List */}
          <div className="space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
                  !message.read ? "border-2 border-emerald-200" : "border border-gray-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`${message.bgColor} p-3 rounded-lg flex-shrink-0`}>
                    <message.icon className={`w-6 h-6 ${message.iconColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className={`text-lg ${!message.read ? "text-gray-900" : "text-gray-700"}`}>
                        {message.title}
                        {!message.read && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                            Nova
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {new Date(message.date).toLocaleDateString("pt-PT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600">{message.message}</p>

                    {/* Action Buttons for Trade-In Messages */}
                    {message.type === "tradein" && !message.read && (
                      <div className="flex gap-3 mt-4">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                          Ver Avaliação
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Recusar
                        </button>
                      </div>
                    )}

                    {/* Action Button for Order Messages */}
                    {message.type === "order" && message.title.includes("enviada") && (
                      <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                        Ver Tracking
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State (if no messages) */}
          {messages.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Sem mensagens</h3>
              <p className="text-gray-600">
                Quando tiver notificações sobre encomendas ou Trade-Ins, elas aparecerão aqui
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
