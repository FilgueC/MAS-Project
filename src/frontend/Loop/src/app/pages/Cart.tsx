import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, X,
  Truck, MapPin, Package, CreditCard, Smartphone, RefreshCw,
  CheckCircle2, Clock, Download, AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type ShippingMethod = "ctt" | "dhl" | "pickup";
type PaymentMethod = "mbway" | "revolut" | "visa" | "mastercard";

interface ShippingLabel {
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  address?: string;
}

export function Cart() {
  const { cart, removeFromCart, updateQuantity, updateWarranty, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");

  // Shipping
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("ctt");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("visa");
  const [mbwayPhone, setMbwayPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [revolutEmail, setRevolutEmail] = useState("");

  // Checkout flow: "summary" | "shipping" | "payment" | "label"
  const [checkoutStep, setCheckoutStep] = useState<"summary" | "shipping" | "payment" | "label">("summary");
  const [generatedLabel, setGeneratedLabel] = useState<ShippingLabel | null>(null);

  const handleApplyCoupon = () => {
    setCouponError("");
    const result = validateCoupon(couponCode, getCartTotal());
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      toast.success(`Cupão "${result.coupon.code}" aplicado com sucesso!`);
      setCouponCode("");
    } else {
      setCouponError(result.error || "Erro ao validar cupão");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
    toast.success("Cupão removido");
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setCheckoutStep("summary");
    setShowCheckout(true);
  };

  const generateTrackingNumber = () => {
    const prefix = { ctt: "CT", dhl: "DH", pickup: "PU" }[shippingMethod];
    return `${prefix}${Date.now().toString().slice(-9)}PT`;
  };

  const getEstimatedDelivery = () => {
    const days = shippingMethod === "dhl" ? 1 : shippingMethod === "ctt" ? 3 : 2;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long" });
  };

  const handleCompleteCheckout = () => {
    // Validate payment
    if (paymentMethod === "mbway" && !mbwayPhone) {
      toast.error("Insira o número de telemóvel para MBWay");
      return;
    }
    if ((paymentMethod === "visa" || paymentMethod === "mastercard") && (!cardNumber || !cardExpiry || !cardCvv)) {
      toast.error("Preencha todos os dados do cartão");
      return;
    }
    if (paymentMethod === "revolut" && !revolutEmail) {
      toast.error("Insira o email/telemóvel Revolut");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const label: ShippingLabel = {
        trackingNumber: generateTrackingNumber(),
        carrier:
          shippingMethod === "ctt"
            ? "CTT Expresso"
            : shippingMethod === "dhl"
            ? "DHL Express"
            : "Ponto de Recolha LOOP",
        estimatedDelivery: getEstimatedDelivery(),
        address: shippingMethod === "pickup" ? pickupAddress || "LOOP Store — Rua Augusta 145, Lisboa" : deliveryAddress || "Morada de entrega",
      };
      setGeneratedLabel(label);
      setCheckoutStep("label");
      setIsProcessing(false);
    }, 2000);
  };

  const handleFinalConfirm = () => {
    clearCart();
    setShowCheckout(false);
    setAppliedCoupon(null);
    setGeneratedLabel(null);
    setCheckoutStep("summary");
    toast.success("Encomenda confirmada! Etiqueta enviada para o seu email 🎉");
    navigate("/conta/encomendas");
  };

  const subtotal = getCartTotal();
  const discount = appliedCoupon ? calculateDiscount(appliedCoupon, subtotal) : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const shippingCost =
    shippingMethod === "dhl" ? 9.99 : subtotalAfterDiscount < 50 ? 5 : 0;
  const total = subtotalAfterDiscount + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h1 className="text-3xl mb-4 text-gray-900">O seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8">Adicione produtos ao carrinho para continuar</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Steps indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[
                { key: "summary", label: "Resumo" },
                { key: "shipping", label: "Envio" },
                { key: "payment", label: "Pagamento" },
                { key: "label", label: "Etiqueta" },
              ].map((step, i) => {
                const steps = ["summary", "shipping", "payment", "label"];
                const currentIdx = steps.indexOf(checkoutStep);
                const stepIdx = steps.indexOf(step.key);
                const isDone = stepIdx < currentIdx;
                const isActive = stepIdx === currentIdx;
                return (
                  <div key={step.key} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all ${
                        isDone
                          ? "bg-emerald-600 text-white"
                          : isActive
                          ? "bg-emerald-700 text-white ring-2 ring-emerald-200"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                    </div>
                    <span className={`text-xs hidden sm:block ${isActive ? "text-emerald-700" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                    {i < 3 && <div className={`w-6 h-px ${stepIdx < currentIdx ? "bg-emerald-400" : "bg-gray-200"}`} />}
                  </div>
                );
              })}
            </div>

            <motion.div
              key={checkoutStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              {/* ── STEP 1: SUMMARY ── */}
              {checkoutStep === "summary" && (
                <>
                  <h1 className="text-2xl mb-5 text-gray-900">Resumo da Encomenda</h1>
                  <div className="space-y-3 mb-5">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.warranty}`} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x{item.quantity} ({item.warranty}m garantia)
                        </span>
                        <span className="text-gray-900">
                          €{((item.price + item.warrantyPrice) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-100 pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span>€{subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-emerald-600">
                          <span>Desconto ({appliedCoupon?.code})</span>
                          <span>-€{discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Envio estimado</span>
                        <span className={shippingCost === 0 ? "text-emerald-600" : ""}>
                          {shippingCost === 0 ? "Grátis" : `€${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
                      <span className="text-gray-900">Total</span>
                      <span className="text-emerald-700">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setShowCheckout(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200">
                      Voltar
                    </button>
                    <button onClick={() => setCheckoutStep("shipping")} className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2">
                      Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP 2: SHIPPING ── */}
              {checkoutStep === "shipping" && (
                <>
                  <h1 className="text-2xl mb-5 text-gray-900">Método de Envio</h1>
                  <div className="space-y-3 mb-5">
                    {[
                      {
                        id: "ctt" as ShippingMethod,
                        label: "CTT Expresso",
                        sub: "2-3 dias úteis • Gratuito em compras >€50",
                        price: subtotalAfterDiscount >= 50 ? "Grátis" : "€5,00",
                        icon: "📮",
                      },
                      {
                        id: "dhl" as ShippingMethod,
                        label: "DHL Express",
                        sub: "24h • Entrega expresso garantida",
                        price: "€9,99",
                        icon: "🚀",
                      },
                      {
                        id: "pickup" as ShippingMethod,
                        label: "Ponto de Recolha",
                        sub: "Recolha numa loja parceira LOOP",
                        price: "Grátis",
                        icon: "🏪",
                      },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setShippingMethod(m.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          shippingMethod === m.id
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl">{m.icon}</span>
                        <div className="flex-1">
                          <p className="text-gray-900 text-sm">{m.label}</p>
                          <p className="text-gray-500 text-xs">{m.sub}</p>
                        </div>
                        <span className={`text-sm ${shippingMethod === m.id ? "text-emerald-700" : "text-gray-600"}`}>
                          {m.price}
                        </span>
                      </button>
                    ))}

                    {shippingMethod === "pickup" ? (
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Selecionar Ponto de Recolha</label>
                        <select
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="">Escolha um ponto...</option>
                          <option value="LOOP Store Lisboa — Rua Augusta 145">LOOP Store Lisboa — Rua Augusta 145</option>
                          <option value="CTT Porto — Praça da Liberdade 32">CTT Porto — Praça da Liberdade 32</option>
                          <option value="Continente Braga — Parque Retail Braga">Continente Braga — Parque Retail Braga</option>
                          <option value="FNAC Coimbra — Forum Coimbra">FNAC Coimbra — Forum Coimbra</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Morada de Entrega</label>
                        <input
                          type="text"
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Rua, nº, código postal, cidade"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep("summary")} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200">
                      Voltar
                    </button>
                    <button onClick={() => setCheckoutStep("payment")} className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2">
                      Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP 3: PAYMENT ── */}
              {checkoutStep === "payment" && (
                <>
                  <h1 className="text-2xl mb-5 text-gray-900">Método de Pagamento</h1>
                  <div className="space-y-3 mb-5">
                    {[
                      { id: "mbway" as PaymentMethod, label: "MBWay", icon: "📱", color: "text-red-600" },
                      { id: "revolut" as PaymentMethod, label: "Revolut", icon: "💜", color: "text-violet-600" },
                      { id: "visa" as PaymentMethod, label: "Cartão Visa", icon: "💳", color: "text-blue-700" },
                      { id: "mastercard" as PaymentMethod, label: "Cartão Mastercard", icon: "💳", color: "text-orange-600" },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                          paymentMethod === pm.id
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl">{pm.icon}</span>
                        <span className={`text-sm ${pm.color}`}>{pm.label}</span>
                        {paymentMethod === pm.id && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />
                        )}
                      </button>
                    ))}

                    {/* Payment method details */}
                    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                      {paymentMethod === "mbway" && (
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Número de Telemóvel MBWay</label>
                          <div className="flex gap-2 items-center">
                            <span className="text-gray-500 text-sm">+351</span>
                            <input
                              type="tel"
                              value={mbwayPhone}
                              onChange={(e) => setMbwayPhone(e.target.value)}
                              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                              placeholder="9XX XXX XXX"
                              maxLength={9}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Receberá uma notificação na app MBWay para confirmar.</p>
                        </div>
                      )}
                      {paymentMethod === "revolut" && (
                        <div>
                          <label className="block text-sm text-gray-700 mb-2">Email ou Telemóvel Revolut</label>
                          <input
                            type="text"
                            value={revolutEmail}
                            onChange={(e) => setRevolutEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                            placeholder="email@exemplo.com ou +351 9XX..."
                          />
                          <p className="text-xs text-gray-500 mt-1">Receberá um pedido de pagamento via Revolut.</p>
                        </div>
                      )}
                      {(paymentMethod === "visa" || paymentMethod === "mastercard") && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-700 mb-1">Número do Cartão</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                              placeholder="•••• •••• •••• ••••"
                              maxLength={16}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">Validade</label>
                              <input
                                type="text"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                placeholder="MM/AA"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-700 mb-1">CVV</label>
                              <input
                                type="password"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                                placeholder="•••"
                                maxLength={4}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">🔒 Pagamento seguro com encriptação SSL 256-bit</p>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex justify-between items-center">
                      <span className="text-gray-700">Total a pagar</span>
                      <span className="text-2xl text-emerald-700">€{total.toFixed(2)}</span>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        Esta é uma demonstração. Nenhum pagamento real será processado.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setCheckoutStep("shipping")} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200" disabled={isProcessing}>
                      Voltar
                    </button>
                    <button
                      onClick={handleCompleteCheckout}
                      disabled={isProcessing}
                      className="flex-1 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          A processar...
                        </>
                      ) : (
                        <>
                          Pagar €{total.toFixed(2)}
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}

              {/* ── STEP 4: SHIPPING LABEL ── */}
              {checkoutStep === "label" && generatedLabel && (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl text-gray-900 mb-1">Pagamento Confirmado!</h1>
                    <p className="text-gray-500 text-sm">A sua encomenda foi registada com sucesso</p>
                  </div>

                  {/* Generated Shipping Label */}
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 mb-6 bg-gray-50">
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="w-5 h-5 text-emerald-700" />
                      <h2 className="text-gray-900">Etiqueta de Envio</h2>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Transportadora</p>
                          <p className="text-gray-900">{generatedLabel.carrier}</p>
                        </div>
                        <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">
                          ✓ Gerada
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500">Número de Rastreio</p>
                          <p className="text-gray-900 font-mono text-lg tracking-wider">
                            {generatedLabel.trackingNumber}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Entrega Estimada</p>
                            <p className="text-gray-900 text-sm">{generatedLabel.estimatedDelivery}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">
                              {shippingMethod === "pickup" ? "Ponto de Recolha" : "Morada de Entrega"}
                            </p>
                            <p className="text-gray-900 text-sm">{generatedLabel.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">Método de Pagamento</p>
                            <p className="text-gray-900 text-sm capitalize">
                              {paymentMethod === "mbway" ? "MBWay" : paymentMethod === "revolut" ? "Revolut" : paymentMethod === "visa" ? "Visa" : "Mastercard"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Barcode simulation */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex gap-0.5 justify-center mb-1">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <div
                              key={i}
                              className="bg-gray-900"
                              style={{
                                width: `${Math.random() > 0.5 ? 2 : 1}px`,
                                height: "40px",
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-center text-xs font-mono text-gray-600">
                          {generatedLabel.trackingNumber}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 text-center mt-3">
                      A etiqueta será enviada para o seu email. Apresente-a na recolha.
                    </p>
                  </div>

                  <button
                    onClick={handleFinalConfirm}
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Package className="w-5 h-5" />
                    Concluir e Ver Encomendas
                  </button>
                </>
              )}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl mb-8 text-gray-900">Carrinho de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.warranty}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex gap-6">
                    <div
                      className="w-32 h-32 bg-cover bg-center rounded-lg flex-shrink-0"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div className="flex-1">
                      <h3 className="text-xl mb-2 text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.category}</p>
                      <div className="mb-4">
                        <label className="text-sm text-gray-600 mb-2 block">Garantia:</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateWarranty(item.id, "24")}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                              item.warranty === "24" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            24 meses
                          </button>
                          <button
                            onClick={() => updateWarranty(item.id, "36")}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                              item.warranty === "36" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            36 meses (+€49)
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-gray-900">
                            €{((item.price + item.warrantyPrice) * item.quantity).toFixed(2)}
                          </div>
                          {item.warrantyPrice > 0 && (
                            <div className="text-sm text-gray-600">
                              (€{item.price} + €{item.warrantyPrice} garantia) x {item.quantity}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        toast.success("Produto removido do carrinho");
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 sticky top-24"
              >
                <h2 className="text-2xl mb-6 text-gray-900">Resumo</h2>

                <div className="space-y-4 mb-6">
                  {/* Coupon Section */}
                  <div className="border-b border-gray-200 pb-4">
                    {!appliedCoupon ? (
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Cupão de Desconto</label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Código do cupão"
                              value={couponCode}
                              onChange={(e) => {
                                setCouponCode(e.target.value.toUpperCase());
                                setCouponError("");
                              }}
                              className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                            />
                          </div>
                          <button
                            onClick={handleApplyCoupon}
                            disabled={!couponCode}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                          >
                            Aplicar
                          </button>
                        </div>
                        {couponError && <p className="text-xs text-red-600 mt-1">{couponError}</p>}
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-emerald-700" />
                            <div>
                              <p className="text-sm text-emerald-900">Cupão <strong>{appliedCoupon.code}</strong></p>
                              <p className="text-xs text-emerald-700">{appliedCoupon.description}</p>
                            </div>
                          </div>
                          <button onClick={handleRemoveCoupon} className="text-emerald-700 hover:text-emerald-800">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Desconto ({appliedCoupon?.code})</span>
                      <span>-€{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Envio</span>
                    <span className={shippingCost === 0 ? "text-emerald-600" : "text-gray-900"}>
                      {shippingCost === 0 ? "Grátis" : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {subtotalAfterDiscount < 50 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
                      Adicione mais €{(50 - subtotalAfterDiscount).toFixed(2)} para envio CTT grátis
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center text-xl">
                      <span className="text-gray-900">Total</span>
                      <span className="text-emerald-700">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment method badges */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs text-gray-500">Aceita:</span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">MBWay</span>
                  <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-xs">Revolut</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Visa</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">MC</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors text-lg flex items-center justify-center gap-2"
                >
                  Finalizar Compra
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate("/produtos")}
                  className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Continuar a Comprar
                </button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">✓</div>
                      <span>Garantia de 24 meses incluída</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">✓</div>
                      <span>Devolução grátis em 30 dias</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">🔒</div>
                      <span>Pagamento 100% seguro</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
