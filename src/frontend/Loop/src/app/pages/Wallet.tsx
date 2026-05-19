import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import {
  ChevronLeft,
  Wallet as WalletIcon,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Info,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function Wallet() {
  const { user, walletBalance, walletTransactions, addToWallet } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSimulateTradeIn = () => {
    addToWallet(150, "Crédito Trade-In — iPhone 12 (Bom estado)");
    toast.success("Crédito de Trade-In adicionado à carteira! 💚");
  };

  const handleWithdraw = () => {
    if (walletBalance <= 0) {
      toast.error("Saldo insuficiente na carteira");
      return;
    }
    addToWallet(-walletBalance, "Transferência bancária — IBAN terminado em 4521");
    toast.success("Transferência solicitada com sucesso!");
  };

  const totalCredits = walletTransactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);

  const totalDebits = walletTransactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back */}
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar à Conta
          </Link>

          <h1 className="text-3xl md:text-4xl mb-2 text-gray-900">Carteira LOOP</h1>
          <p className="text-gray-600 mb-8">Gerencie os seus créditos de Trade-In e saldo digital</p>

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-700 to-teal-600 rounded-2xl p-8 mb-6 text-white shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <WalletIcon className="w-5 h-5 text-emerald-200" />
                  <p className="text-emerald-100 text-sm">Saldo Disponível</p>
                </div>
                <p className="text-5xl mb-1">€{walletBalance.toFixed(2)}</p>
                <p className="text-emerald-200 text-sm">Créditos LOOP</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <WalletIcon className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
              <div>
                <p className="text-emerald-200 text-xs mb-1">Total Recebido</p>
                <p className="text-white text-lg">€{totalCredits.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-emerald-200 text-xs mb-1">Total Retirado</p>
                <p className="text-white text-lg">€{totalDebits.toFixed(2)}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <button
              onClick={handleWithdraw}
              disabled={walletBalance <= 0}
              className="flex items-center justify-center gap-3 bg-white border-2 border-emerald-600 text-emerald-700 py-4 rounded-xl hover:bg-emerald-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CreditCard className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Transferir para Conta Bancária</p>
                <p className="text-xs text-gray-500">Processamento em 2-3 dias úteis</p>
              </div>
            </button>

            <button
              onClick={handleSimulateTradeIn}
              className="flex items-center justify-center gap-3 bg-emerald-700 text-white py-4 rounded-xl hover:bg-emerald-800 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <div className="text-left">
                <p className="text-sm">Simular Crédito Trade-In</p>
                <p className="text-xs text-emerald-200">Demo: +€150 trade-in</p>
              </div>
            </button>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-blue-900 text-sm mb-1">
                <strong>Como funciona a Carteira LOOP?</strong>
              </p>
              <p className="text-blue-700 text-sm">
                Quando realiza um Trade-In aprovado, o valor é creditado automaticamente na sua
                Carteira LOOP. Pode usar esse saldo para compras futuras ou transferir para a sua
                conta bancária a qualquer momento.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <TrendingUp className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl text-gray-900">{walletTransactions.filter((t) => t.type === "credit").length}</p>
              <p className="text-xs text-gray-500">Trade-Ins Aprovados</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <ArrowUpCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl text-gray-900">€{totalCredits.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Total Ganho</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
              <ArrowDownCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl text-gray-900">€{totalDebits.toFixed(0)}</p>
              <p className="text-xs text-gray-500">Total Retirado</p>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl text-gray-900">Histórico de Movimentos</h2>
            </div>

            {walletTransactions.length === 0 ? (
              <div className="py-16 text-center">
                <WalletIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">Sem movimentos ainda</p>
                <p className="text-gray-400 text-sm">
                  Realize um Trade-In para ver os seus créditos aqui
                </p>
                <Link
                  to="/conta/trade-in"
                  className="inline-flex items-center gap-2 mt-4 text-emerald-700 hover:text-emerald-800"
                >
                  <RefreshCw className="w-4 h-4" />
                  Iniciar Trade-In
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {walletTransactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "credit"
                            ? "bg-emerald-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {tx.type === "credit" ? (
                          <ArrowUpCircle className="w-5 h-5 text-emerald-700" />
                        ) : (
                          <ArrowDownCircle className="w-5 h-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-gray-900 text-sm">{tx.description}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(tx.date).toLocaleDateString("pt-PT", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-gray-400 text-xs font-mono">{tx.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg ${
                          tx.type === "credit" ? "text-emerald-700" : "text-orange-600"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "-"}€{Math.abs(tx.amount).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
