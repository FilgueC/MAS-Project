import { useParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { products } from "../data/products";
import { Star, Shield, Check, Heart, ChevronLeft, Leaf, Droplet, Zap, Trash2, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useStock } from "../context/StockContext";
import { motion } from "motion/react";
import { toast } from "sonner";

interface UserReview {
  id: string;
  userName: string;
  comment: string;
  date: string;
  verified: boolean;
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const { getEffectiveStock } = useStock();
  const [selectedWarranty, setSelectedWarranty] = useState<"24" | "36">("24");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [userReviews, setUserReviews] = useState<UserReview[]>(() => {
    const saved = localStorage.getItem(`product_reviews_${id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl mb-4 text-gray-900">Produto não encontrado</h1>
            <button 
              onClick={() => navigate("/produtos")}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Voltar aos Produtos
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate multiple product images for gallery
  const productImages = product.images || [
    product.image,
    "https://images.unsplash.com/photo-1609085174749-243b6a90e6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwY2xvc2UtdXB|en|1|||1773436477|0&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5wmSYsGGurcZU5vvWIQFJiLZMUasiNU_64Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaG9K4SQ9uBUwSH1Jusl3L1AxRdrqsdSclw&s",
  ];

  const effectiveStock = getEffectiveStock(product.id, product.stock);

  // FIX 1: Only show success toast if addToCart actually succeeded (respects stock limit)
  const handleAddToCart = () => {
    const success = addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      selectedWarranty
    );

    if (success) {
      toast.success("Produto adicionado ao carrinho!");
    }
  };

  // FIX 2: Show toast error instead of redirecting when not logged in
  const handleFavoriteClick = () => {
    if (!user) {
      toast.error("Precisa de iniciar sessão para guardar favoritos.");
      return;
    }

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.success("Produto removido dos favoritos");
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      toast.success("Produto adicionado aos favoritos!");
    }
  };

  // US2 Cenário 2 (BR-02): histórico técnico só está completo se os 4 campos do
  // timeline estiverem preenchidos. Se algum faltar, o botão fica bloqueado.
  const hasCompleteTimeline =
    !!product.timeline.manufactured &&
    !!product.timeline.firstUse &&
    !!product.timeline.receivedForRefurbishment &&
    !!product.timeline.replacedParts &&
    !!product.timeline.qualityTested;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    // Se a string não for uma data válida (ex: "Ecrã, Bateria"), retorna o próprio texto
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("pt-PT", { year: "numeric", month: "long" });
  };

  const timelineSteps = [
    {
      title: "Fabricação",
      date: formatDate(product.timeline.manufactured),
      available: !!product.timeline.manufactured,
      description: "Produto fabricado pela marca",
      icon: "🏭",
    },
    {
      title: "Primeira Utilização",
      date: formatDate(product.timeline.firstUse),
      available: !!product.timeline.firstUse,
      description: "Início de uso pelo proprietário anterior",
      icon: "📱",
    },
    {
      title: "Recondicionamento",
      date: formatDate(product.timeline.receivedForRefurbishment),
      available: !!product.timeline.receivedForRefurbishment,
      description: "Recebido na LOOP para recondicionamento",
      icon: "🔧",
    },
    {
      title: "Peças Substituídas",
      // CORREÇÃO: Transforma o array ['Peça1', 'Peça2'] numa única string "Peça1, Peça2"
      date: product.timeline.replacedParts && product.timeline.replacedParts.length > 0
        ? product.timeline.replacedParts.join(", ")
        : "Nenhuma peça substituída",
      available: !!product.timeline.replacedParts,
      description: "Peças substituídas durante o processo de recondicionamento",
      icon: "🔧",
    },  
    {
      title: "Testes de Qualidade",
      date: formatDate(product.timeline.qualityTested),
      available: !!product.timeline.qualityTested,
      description: "Testes rigorosos de funcionalidade e qualidade",
      icon: "✅",
    },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!reviewComment.trim()) {
      toast.error("Escreva um comentário");
      return;
    }
    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      userName: user.name,
      comment: reviewComment,
      date: new Date().toISOString(),
      verified: true,
    };
    const updated = [newReview, ...userReviews];
    setUserReviews(updated);
    localStorage.setItem(`product_reviews_${id}`, JSON.stringify(updated));
    setReviewComment("");
    setShowReviewForm(false);
    toast.success("Avaliação publicada com sucesso! 🌟");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <button
            onClick={() => navigate("/produtos")}
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar aos Produtos
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Main Image */}
                <div
                  className="h-96 bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${productImages[selectedImageIndex]})` }}
                />
                
                {/* Image Gallery Thumbnails */}
                <div className="p-6">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index
                            ? "border-emerald-600 ring-2 ring-emerald-200"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {product.condition}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 fill-blue-600" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              {product.ecoImpact && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-6 mt-6 text-white shadow-lg"
                >
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    Impacto Ambiental Poupado
                  </h3>
                  <p className="text-emerald-100 mb-4 text-sm">
                    Ao escolher este produto recondicionado, está a contribuir para um futuro mais sustentável
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5 text-emerald-200" />
                        <span className="text-sm text-emerald-100">CO₂</span>
                      </div>
                      <div className="text-2xl">{product.ecoImpact.co2Saved}kg</div>
                      <div className="text-xs text-emerald-200">poupados</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="w-5 h-5 text-blue-200" />
                        <span className="text-sm text-emerald-100">Água</span>
                      </div>
                      <div className="text-2xl">{product.ecoImpact.waterSaved}L</div>
                      <div className="text-xs text-emerald-200">poupados</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-yellow-200" />
                        <span className="text-sm text-emerald-100">Energia</span>
                      </div>
                      <div className="text-2xl">{product.ecoImpact.energySaved}kWh</div>
                      <div className="text-xs text-emerald-200">poupados</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Trash2 className="w-5 h-5 text-gray-200" />
                        <span className="text-sm text-emerald-100">Resíduos</span>
                      </div>
                      <div className="text-2xl">{product.ecoImpact.wastePrevented}kg</div>
                      <div className="text-xs text-emerald-200">evitados</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-sm text-emerald-700 mb-2">{product.brand}</div>
              <h1 className="text-4xl mb-4 text-gray-900">{product.name}</h1>

              {/* Stock Status */}
              <div className="mb-4">
                {effectiveStock > 0 ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                    <Check className="w-4 h-4" />
                    {effectiveStock} unidades em stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg">
                    Produto Esgotado
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl text-gray-900">€{product.price}</span>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <h3 className="text-xl mb-4 text-gray-900">Especificações</h3>
                <div className="space-y-3">
                  {product.storage && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Armazenamento</span>
                      <span className="text-gray-900">{product.storage}</span>
                    </div>
                  )}
                  {product.color && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cor</span>
                      <span className="text-gray-900">{product.color}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado</span>
                    <span className="text-gray-900">{product.condition}</span>
                  </div>
                </div>

                {product.specs && product.specs.length > 0 && (
                  <>
                    <div className="border-t border-gray-200 my-4" />
                    <div className="space-y-2">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700">
                          <Check className="w-4 h-4 text-emerald-600" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Warranty Selection */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <h3 className="text-xl mb-4 text-gray-900">Garantia</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer p-4 border-2 rounded-lg transition-colors hover:border-emerald-300"
                    style={{
                      borderColor: selectedWarranty === "24" ? "rgb(5 150 105)" : "rgb(229 231 235)",
                      backgroundColor: selectedWarranty === "24" ? "rgb(240 253 250)" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      name="warranty"
                      value="24"
                      checked={selectedWarranty === "24"}
                      onChange={() => setSelectedWarranty("24")}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Garantia de 24 meses</span>
                        <span className="text-emerald-700">Incluída</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Garantia padrão LOOP de 2 anos
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer p-4 border-2 rounded-lg transition-colors hover:border-emerald-300"
                    style={{
                      borderColor: selectedWarranty === "36" ? "rgb(5 150 105)" : "rgb(229 231 235)",
                      backgroundColor: selectedWarranty === "36" ? "rgb(240 253 250)" : "white",
                    }}
                  >
                    <input
                      type="radio"
                      name="warranty"
                      value="36"
                      checked={selectedWarranty === "36"}
                      onChange={() => setSelectedWarranty("36")}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Garantia de 36 meses</span>
                        <span className="text-emerald-700">+€49</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Garantia estendida de 3 anos
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                {effectiveStock > 0 && hasCompleteTimeline ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors text-lg"
                  >
                    Adicionar ao Carrinho
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-500 py-4 rounded-lg cursor-not-allowed text-lg"
                  >
                    {effectiveStock === 0 ? "Produto Esgotado" : "Indisponível para Compra"}
                  </button>
                )}

                <button
                  onClick={handleFavoriteClick}
                  className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-red-300 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      user && isFavorite(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* US2 Cenário 2 (BR-02): aviso de histórico técnico indisponível */}
              {!hasCompleteTimeline && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <span className="text-amber-500 text-xl mt-0.5">⚠️</span>
                  <div>
                    <p className="font-semibold text-amber-800">Histórico indisponível</p>
                    <p className="text-amber-700 text-sm mt-1">
                      O histórico técnico completo deste produto ainda não se encontra registado no sistema.
                      Não é possível adicionar ao carrinho até que toda a informação de recondicionamento esteja disponível.
                    </p>
                  </div>
                </div>
              )}

              {/* Total Price */}
              {selectedWarranty === "36" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total com garantia estendida:</span>
                    <span className="text-2xl text-emerald-700">
                      €{product.price + 49}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Product Lifecycle Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl mb-2 text-gray-900 text-center">
                Linha do Tempo da Vida do Produto
              </h2>
              <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                Acompanhe toda a jornada deste produto, desde a fabricação até aos nossos rigorosos testes de qualidade
              </p>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-600 to-teal-600 transform md:-translate-x-1/2" />

                <div className="space-y-12">
                  {timelineSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`relative flex items-center ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      } flex-row`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-20 md:pl-0`}>
                        <div className={`p-6 rounded-xl border ${
                          step.available
                            ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100"
                            : "bg-gray-50 border-gray-200"
                        }`}>
                          <div className={`text-2xl mb-2 ${!step.available ? "grayscale opacity-40" : ""}`}>{step.icon}</div>
                          <h3 className={`text-xl mb-1 ${step.available ? "text-gray-900" : "text-gray-400"}`}>{step.title}</h3>
                          {step.available ? (
                            <p className="text-emerald-700 mb-2">{step.date}</p>
                          ) : (
                            <p className="text-gray-400 mb-2 text-sm italic">Informação não disponível</p>
                          )}
                          <p className={step.available ? "text-gray-600" : "text-gray-400"}>{step.description}</p>
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div className={`absolute left-8 md:left-1/2 w-16 h-16 md:transform md:-translate-x-1/2 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10 ${
                        step.available ? "bg-emerald-600" : "bg-gray-300"
                      }`}>
                        <span className={`text-xl ${step.available ? "text-white" : "grayscale opacity-60"}`}>{step.icon}</span>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* US2 Cenário 3: produto esgotado → sugerir produtos similares */}
          {effectiveStock === 0 && (() => {
            const similar = products
              .filter(p => p.id !== product.id && p.category === product.category && getEffectiveStock(p.id, p.stock) > 0)
              .slice(0, 3);
            if (similar.length === 0) return null;
            return (
              <div className="mb-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Produtos Similares Disponíveis</h2>
                <p className="text-gray-600 mb-6">Este produto está esgotado. Veja alternativas da mesma categoria:</p>
                <div className="grid sm:grid-cols-3 gap-6">
                  {similar.map(p => (
                    <button
                      key={p.id}
                      onClick={() => navigate(`/produto/${p.id}`)}
                      className="text-left bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
                    >
                      <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                      <div className="p-4">
                        <div className="text-sm text-emerald-600 font-semibold mb-1">{p.brand}</div>
                        <p className="font-medium text-gray-900 mb-2">{p.name}</p>
                        <p className="text-emerald-700 font-bold">{p.price}€</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

        </div>
      </main>

      <Footer />
    </div>
  );
}