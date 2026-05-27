import { useParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { products } from "../data/products";
import { Star, Shield, Check, Heart, ChevronLeft, Leaf, Droplet, Zap, Trash2, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useStock } from "../context/StockContext"; // Importado para gerir o limite de stock
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
  const { getEffectiveStock } = useStock(); // Hook para obter o stock atual dinâmico
  
  const [selectedWarranty, setSelectedWarranty] = useState<"24" | "36">("24");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [userReviews, setUserReviews] = useState<UserReview[]>(() => {
    const saved = localStorage.getItem(`product_reviews_${id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  // Se o produto não existir, redireciona ou mostra erro
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
            <button onClick={() => navigate("/produtos")} className="text-emerald-600 hover:underline">
              Voltar para os produtos
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calcula o stock disponível subtraindo o que já está reservado no carrinho
  const effectiveStock = getEffectiveStock(product.id, product.stock);

  const handleAddToCart = () => {
    // addToCart agora devolve true se conseguir adicionar ou false se bater no limite do stock
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

  const handleToggleFavorite = () => {
    if (!user) {
      toast.error("Precisa de iniciar sessão para guardar favoritos.");
      return;
    }
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
      toast.success("Removido dos favoritos.");
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      toast.success("Adicionado aos favoritos!");
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const newReview: UserReview = {
      id: Date.now().toString(),
      userName: user?.name || "Utilizador Anónimo",
      comment: reviewComment,
      date: new Date().toLocaleDateString("pt-PT"),
      verified: true,
    };

    const updatedReviews = [newReview, ...userReviews];
    setUserReviews(updatedReviews);
    localStorage.setItem(`product_reviews_${id}`, JSON.stringify(updatedReviews));
    setReviewComment("");
    setShowReviewForm(false);
    toast.success("Avaliação enviada com sucesso!");
  };

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = userReviews.filter((r) => r.id !== reviewId);
    setUserReviews(updatedReviews);
    localStorage.setItem(`product_reviews_${id}`, JSON.stringify(updatedReviews));
    toast.success("Avaliação removida.");
  };

  // Histórico técnico simulado do recondicionamento (Loop)
  const technicalSteps = [
    { title: "Diagnóstico Inicial", date: "Recebido em Loja", description: "Testes a mais de 40 pontos de hardware.", icon: "🔍" },
    { title: "Substituição de Componentes", date: "Fase de Reparação", description: "Bateria substituída por uma nova original/compatível de alta qualidade.", icon: "🛠️" },
    { title: "Limpeza Ultra-sónica & Higienização", date: "Fase Estética", description: "Limpeza profunda interna e externa do equipamento.", icon: "✨" },
    { title: "Controlo de Qualidade Final", date: "Aprovado para Venda", description: "Certificação do sistema e embalamento ecológico em caixa Loop.", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-6 transition-colors group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        {/* Product Essential Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 mb-12">
          {/* Images Column */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-4">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* Product Info Column */}
          <div className="flex-1">
            <div className="mb-6">
              <span className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({12 + userReviews.length} avaliações)</span>
              </div>

              <div className="text-3xl font-bold text-gray-900">
                {product.price}€
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {effectiveStock > 0 ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg font-medium">
                  <Check className="w-4 h-4" />
                  {effectiveStock} unidades em stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium">
                  Produto Esgotado
                </span>
              )}
            </div>

            {/* Warranty Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Extensão de Garantia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedWarranty("24")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedWarranty === "24"
                      ? "border-emerald-600 bg-emerald-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-gray-900">Garantia Base (24 Meses)</div>
                  <div className="text-sm text-gray-500 mt-0.5">Incluído no preço comercial</div>
                </button>
                <button
                  onClick={() => setSelectedWarranty("36")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedWarranty === "36"
                      ? "border-emerald-600 bg-emerald-50/50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-gray-900">Garantia Loop Pro (36 Meses)</div>
                  <div className="text-sm text-emerald-600 font-medium mt-0.5">+49,00€</div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {effectiveStock > 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 text-white py-4 rounded-xl hover:bg-emerald-700 font-semibold transition-colors shadow-sm"
                >
                  Adicionar ao Carrinho
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-200 text-gray-400 py-4 rounded-xl font-semibold cursor-not-allowed"
                >
                  Produto Esgotado
                </button>
              )}
              <button
                onClick={handleToggleFavorite}
                className={`p-4 rounded-xl border transition-colors ${
                  isFavorite(product.id)
                    ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                    : "border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-600"
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite(product.id) ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Quick Benefits Tags */}
            <div className="grid grid-cols-3 gap-2 mt-8 border-t border-gray-100 pt-6 text-center">
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                <Leaf className="w-5 h-5 text-emerald-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Pegada Ecológica Reduzida</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                <Zap className="w-5 h-5 text-amber-500 mb-1" />
                <span className="text-xs font-medium text-gray-700">Bateria Nova Certificada</span>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                <Droplet className="w-5 h-5 text-blue-500 mb-1" />
                <span className="text-xs font-medium text-gray-700">Limpeza Higiénica 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Journey Timeline */}
        <div className="mb-12 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">A Jornada de Recondicionamento Loop</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Cada equipamento passa por um rigoroso processo técnico antes de chegar até si.
          </p>

          <div className="relative border-l-2 border-emerald-100 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:h-full md:before:w-0.5 md:before:bg-emerald-100 space-y-12">
            {technicalSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-20 md:pl-0`}>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-emerald-700 text-sm font-semibold mb-2">{step.date}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 md:transform md:-translate-x-1/2 bg-emerald-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <span className="text-white text-xl">{step.icon}</span>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Avaliações da Comunidade</h2>
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors font-medium text-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Deixar Avaliação
              </button>
            )}
          </div>

          {showReviewForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleAddReview}
              className="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-6 flex flex-col gap-3"
            >
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Partilhe a sua opinião sobre este equipamento recondicionado..."
                className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 min-h-[80px]"
                maxLength={300}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!reviewComment.trim()}
                  className="flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submeter
                </button>
              </div>
            </motion.form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {userReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 last:border-none pb-4 last:pb-0 flex justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 text-sm">{review.userName}</span>
                    {review.verified && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                        Compra Verificada
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-auto">{review.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                </div>
                {user?.isAdmin && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-400 hover:text-red-600 p-1 self-start transition-colors"
                    title="Remover avaliação (Admin)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            {/* Static Default Review */}
            <div className="border-b border-gray-100 last:border-none pb-4 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 text-sm">Mariana Costa</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                  Compra Verificada
                </span>
                <span className="text-xs text-gray-400 ml-auto">12/03/2026</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                O equipamento veio rigorosamente novo! Sem qualquer risco visível e a saúde da bateria está a 100%. Recomendo muito a Loop pela rapidez de entrega.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}