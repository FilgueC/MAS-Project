import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { ChevronLeft, Smartphone, Laptop, Tablet, Headphones, Cable, DollarSign, CheckCircle, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function TradeIn() {
  const { user, addToWallet } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    deviceType: "",
    brand: "",
    model: "",
    condition: "",
    storage: "",
  });
  const [estimatedValue, setEstimatedValue] = useState(0);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Check age 18+
    if (user.dateOfBirth) {
      const today = new Date();
      const birth = new Date(user.dateOfBirth);
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      if (age < 18) {
        toast.error("Tem de ter pelo menos 18 anos para usar o Trade-In.");
        navigate("/conta");
        return;
      }
    }
  }, [user, navigate]);

  if (!user) return null;

  const deviceTypes = [
    { value: "smartphone", label: "Telemóvel", icon: Smartphone },
    { value: "laptop", label: "Computador", icon: Laptop },
    { value: "tablet", label: "Tablet", icon: Tablet },
    { value: "audio", label: "Áudio", icon: Headphones },
    { value: "charger", label: "Carregador", icon: Cable },
  ];

  const conditions = [
    { value: "como-novo", label: "Como Novo", price: 1.0 },
    { value: "excelente", label: "Excelente", price: 0.85 },
    { value: "bom", label: "Bom", price: 0.65 },
    { value: "aceitavel", label: "Aceitável", price: 0.45 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let baseValue = 200;

    if (formData.deviceType === "laptop") baseValue = 400;
    if (formData.deviceType === "tablet") baseValue = 300;
    if (formData.deviceType === "audio") baseValue = 80;
    if (formData.deviceType === "charger") baseValue = 20;

    const conditionMultiplier =
      conditions.find((c) => c.value === formData.condition)?.price || 0.5;

    const value = Math.round(baseValue * conditionMultiplier);

    setEstimatedValue(value);
    setStep(2);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleConfirmTradeIn = () => {
    const conditionLabel = conditions.find((c) => c.value === formData.condition)?.label || "";
    addToWallet(
      estimatedValue,
      `Trade-In — ${formData.brand} ${formData.model} (${conditionLabel})`
    );
    toast.success(`€${estimatedValue} creditados na sua Carteira LOOP! 💚`);
    navigate("/conta/carteira");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar à Conta
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-2 text-gray-900">
              Trade-In
            </h1>
            <p className="text-lg text-gray-600">
              Venda o seu dispositivo antigo e receba crédito na Carteira LOOP
            </p>
          </div>

          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl mb-6 text-gray-900">
                Avalie o seu dispositivo
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Device Type */}
                <div>
                  <label className="block text-sm mb-3 text-gray-700">
                    Tipo de Dispositivo *
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {deviceTypes.map((type) => {
                      const Icon = type.icon;

                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleChange("deviceType", type.value)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.deviceType === type.value
                              ? "border-emerald-700 bg-emerald-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Icon
                            className={`w-8 h-8 mx-auto mb-2 ${
                              formData.deviceType === type.value
                                ? "text-emerald-700"
                                : "text-gray-400"
                            }`}
                          />

                          <div className="text-sm text-center">
                            {type.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Marca *
                  </label>

                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      handleChange("brand", e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ex: Apple, Samsung, Dell..."
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Modelo *
                  </label>

                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) =>
                      handleChange("model", e.target.value)
                    }
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Ex: iPhone 13 Pro, MacBook Pro 14..."
                  />
                </div>

                {/* Storage */}
                <div>
                  <label className="block text-sm mb-2 text-gray-700">
                    Armazenamento
                  </label>

                  <select
                    value={formData.storage}
                    onChange={(e) =>
                      handleChange("storage", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="64GB">64GB</option>
                    <option value="128GB">128GB</option>
                    <option value="256GB">256GB</option>
                    <option value="512GB">512GB</option>
                    <option value="1TB">1TB</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm mb-3 text-gray-700">
                    Estado do Dispositivo *
                  </label>

                  <div className="space-y-3">
                    {conditions.map((condition) => (
                      <button
                        key={condition.value}
                        type="button"
                        onClick={() =>
                          handleChange("condition", condition.value)
                        }
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          formData.condition === condition.value
                            ? "border-emerald-700 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-lg mb-1">
                          {condition.label}
                        </div>

                        <div className="text-sm text-gray-600">
                          {condition.value === "como-novo" &&
                            "Sem riscos, como novo"}
                          {condition.value === "excelente" &&
                            "Pequenos sinais de uso"}
                          {condition.value === "bom" &&
                            "Alguns riscos visíveis"}
                          {condition.value === "aceitavel" &&
                            "Riscos e marcas de uso"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 text-white py-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Obter Avaliação
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />

                <h2 className="text-3xl mb-2 text-gray-900">
                  Avaliação Concluída!
                </h2>

                <p className="text-gray-600">
                  Valor estimado do seu dispositivo
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-8 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="w-8 h-8 text-emerald-700" />

                  <span className="text-5xl text-emerald-700">
                    €{estimatedValue}
                  </span>
                </div>

                <p className="text-gray-600">em crédito na Carteira LOOP</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <Wallet className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-900 text-sm mb-1">
                    <strong>Carteira LOOP Digital</strong>
                  </p>
                  <p className="text-blue-700 text-sm">
                    O valor será creditado na sua Carteira LOOP. Pode usar esse saldo para compras
                    ou transferir para conta bancária a qualquer momento.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmTradeIn}
                  className="w-full bg-emerald-700 text-white py-4 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  Confirmar e Creditar na Carteira
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Fazer Nova Avaliação
                </button>
              </div>

              <p className="text-sm text-gray-500 text-center mt-6">
                * Valor sujeito a confirmação após inspeção física do dispositivo
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
