import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { Package, ChevronLeft, Eye, CheckCircle2, Truck, Home, RotateCcw, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function Orders() {
  const { user, orders } = useAuth();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800";
      case "Em Processamento":
        return "bg-blue-100 text-blue-800";
      case "Enviada":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrackingSteps = (status: string) => {
    const baseSteps = [
      { 
        title: "Encomenda Confirmada", 
        description: "A sua encomenda foi confirmada",
        icon: CheckCircle2,
        completed: true 
      },
      { 
        title: "Em Processamento", 
        description: "Estamos a preparar a sua encomenda",
        icon: Package,
        completed: status === "Em Processamento" || status === "Enviada" || status === "Entregue"
      },
      { 
        title: "Enviada", 
        description: "A sua encomenda está a caminho",
        icon: Truck,
        completed: status === "Enviada" || status === "Entregue"
      },
      { 
        title: "Entregue", 
        description: "A sua encomenda foi entregue",
        icon: Home,
        completed: status === "Entregue"
      },
    ];

    return baseSteps;
  };

  const handleReturn = (orderId: string) => {
    toast.success("Pedido de devolução iniciado. Receberá um email em breve.");
  };

  const handleExchange = (orderId: string) => {
    toast.success("Pedido de troca iniciado. Receberá um email em breve.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar à Conta
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-2 text-gray-900">
              As Minhas Encomendas
            </h1>
            <p className="text-lg text-gray-600">
              {orders.length} {orders.length === 1 ? "encomenda" : "encomendas"}
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl mb-2 text-gray-900">
                Ainda não tem encomendas
              </h2>
              <p className="text-gray-600 mb-6">
                Explore os nossos produtos e faça a sua primeira compra
              </p>
              <Link
                to="/produtos"
                className="inline-block bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Ver Produtos
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const trackingSteps = getTrackingSteps(order.status);
                
                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl mb-1 text-gray-900">
                            Encomenda #{order.id}
                          </h3>
                          <p className="text-gray-600">
                            {new Date(order.date).toLocaleDateString("pt-PT", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                          <button
                            onClick={() =>
                              setSelectedOrder(
                                selectedOrder === order.id ? null : order.id
                              )
                            }
                            className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                          >
                            <Eye className="w-5 h-5" />
                            {selectedOrder === order.id ? "Ocultar" : "Ver Detalhes"}
                          </button>
                        </div>
                      </div>

                      {selectedOrder === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6"
                        >
                          {/* Tracking Timeline */}
                          <div className="bg-gray-50 rounded-xl p-6 mb-6">
                            <h4 className="text-lg text-gray-900 mb-6">Estado da Encomenda</h4>
                            <div className="relative">
                              {/* Progress Line */}
                              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200">
                                <div
                                  className="bg-emerald-600 w-full transition-all duration-500"
                                  style={{
                                    height: `${(trackingSteps.filter(s => s.completed).length / trackingSteps.length) * 100}%`
                                  }}
                                />
                              </div>

                              <div className="space-y-6 relative">
                                {trackingSteps.map((step, index) => {
                                  const StepIcon = step.icon;
                                  return (
                                    <div key={index} className="flex items-start gap-4 relative">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${
                                        step.completed 
                                          ? "bg-emerald-600 text-white" 
                                          : "bg-gray-200 text-gray-400"
                                      }`}>
                                        <StepIcon className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1">
                                        <h5 className={`text-sm mb-1 ${
                                          step.completed ? "text-gray-900" : "text-gray-500"
                                        }`}>
                                          {step.title}
                                        </h5>
                                        <p className="text-xs text-gray-500">{step.description}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="border-t border-gray-200 pt-6 mb-6">
                            <h4 className="text-lg text-gray-900 mb-4">Produtos</h4>
                            <div className="space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg mb-1 text-gray-900">
                                      {item.name}
                                    </h4>
                                    <p className="text-gray-600">
                                      Quantidade: {item.quantity}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-lg text-gray-900">
                                      €{item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Total */}
                          <div className="border-t border-gray-200 pt-6 mb-6">
                            <div className="flex justify-between items-center">
                              <span className="text-xl text-gray-900">Total</span>
                              <span className="text-2xl text-emerald-700">
                                €{order.total}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          {order.status === "Entregue" && (
                            <div className="border-t border-gray-200 pt-6">
                              <h4 className="text-sm text-gray-700 mb-4">Precisa de ajuda com esta encomenda?</h4>
                              <div className="flex flex-wrap gap-3">
                                <button
                                  onClick={() => handleReturn(order.id)}
                                  className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                  <RotateCcw className="w-4 h-4" />
                                  Solicitar Devolução
                                </button>
                                <button
                                  onClick={() => handleExchange(order.id)}
                                  className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  Solicitar Troca
                                </button>
                              </div>
                              <p className="text-xs text-gray-500 mt-3">
                                Tem 14 dias para devolver ou trocar o seu produto sem custos adicionais
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
