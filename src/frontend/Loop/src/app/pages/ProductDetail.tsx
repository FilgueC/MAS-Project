import { useParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { products } from "../data/products";
import { Star, Shield, Check, Heart, ChevronLeft, Leaf, Droplet, Zap, Trash2, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion } from "motion/react";
import { toast } from "sonner";

interface UserReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const [selectedWarranty, setSelectedWarranty] = useState<"24" | "36">("24");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [userReviewRating, setUserReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
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
    "https://images.unsplash.com/photo-1609085174749-243b6a90e6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwY2xvc2UtdXB8ZW58MXx8fHwxNzczNDM2NDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5wmSYsGGurcZU5vvWIQFJiLZMUasiNU_64Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpaG9K4SQ9uBUwSH1Jusl3L1AxRdrqsdSclw&s",
  ];

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
      selectedWarranty
    );
    toast.success("Produto adicionado ao carrinho!");
  };

  const handleFavoriteClick = () => {
    if (!user) {
      navigate("/login");
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-PT", { year: "numeric", month: "long" });
  };

  const timelineSteps = [
    {
      title: "Fabricação",
      date: formatDate(product.timeline.manufactured),
      description: "Produto fabricado pela marca",
      icon: "🏭",
    },
    {
      title: "Primeira Utilização",
      date: formatDate(product.timeline.firstUse),
      description: "Início de uso pelo proprietário anterior",
      icon: "📱",
    },
    {
      title: "Recondicionamento",
      date: formatDate(product.timeline.receivedForRefurbishment),
      description: "Recebido na LOOP para recondicionamento",
      icon: "🔧",
    },
    {
      title: "Testes de Qualidade",
      date: formatDate(product.timeline.qualityTested),
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
    if (userReviewRating === 0) {
      toast.error("Selecione uma classificação de 1 a 5 estrelas");
      return;
    }
    if (!reviewComment.trim()) {
      toast.error("Escreva um comentário");
      return;
    }
    const newReview: UserReview = {
      id: `rev-${Date.now()}`,
      userName: user.name,
      rating: userReviewRating,
      comment: reviewComment,
      date: new Date().toISOString(),
      verified: true,
    };
    const updated = [newReview, ...userReviews];
    setUserReviews(updated);
    localStorage.setItem(`product_reviews_${id}`, JSON.stringify(updated));
    setReviewComment("");
    setUserReviewRating(0);
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
                      {product.rating} / 5.0
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
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                    <Check className="w-4 h-4" />
                    {product.stock} unidades em stock
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
                {product.stock > 0 ? (
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
                    Produto Esgotado
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
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                          <div className="text-2xl mb-2">{step.icon}</div>
                          <h3 className="text-xl mb-1 text-gray-900">{step.title}</h3>
                          <p className="text-emerald-700 mb-2">{step.date}</p>
                          <p className="text-gray-600">{step.description}</p>
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
            </div>
          </motion.div>

          {/* Product Reviews */}
          {(product.reviews && product.reviews.length > 0 || userReviews.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl mb-1 text-gray-900">Avaliações de Clientes</h2>
                    <p className="text-gray-600">
                      {(product.reviews?.length || 0) + userReviews.length}{" "}
                      {(product.reviews?.length || 0) + userReviews.length === 1 ? "avaliação" : "avaliações"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (!user) { navigate("/login"); return; }
                      setShowReviewForm(!showReviewForm);
                    }}
                    className="flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {showReviewForm ? "Cancelar" : "Avaliar Produto"}
                  </button>
                </div>

                {/* Review Form */}
                {showReviewForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8"
                  >
                    <h3 className="text-xl mb-4 text-gray-900">A Sua Avaliação</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      {/* Star Rating Selector */}
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Classificação *</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserReviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 transition-colors ${
                                  star <= (hoverRating || userReviewRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                          {userReviewRating > 0 && (
                            <span className="ml-2 text-sm text-gray-600 self-center">
                              {["", "Muito Mau", "Mau", "Razoável", "Bom", "Excelente"][userReviewRating]}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Comment */}
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Comentário *</label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                          placeholder="Partilhe a sua experiência com este produto..."
                          required
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800"
                        >
                          <Send className="w-4 h-4" />
                          Publicar Avaliação
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                <div className="space-y-6">
                  {/* User submitted reviews first */}
                  {userReviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-b border-gray-200 pb-6 last:border-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-900">{review.userName}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                              <Check className="w-3 h-3" />
                              Compra Verificada
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("pt-PT", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </motion.div>
                  ))}

                  {/* Existing product reviews */}
                  {product.reviews?.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-gray-900">{review.userName}</span>
                            {review.verified && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                <Check className="w-3 h-3" />
                                Compra Verificada
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString("pt-PT", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* No reviews yet - show form */}
          {(!product.reviews || product.reviews.length === 0) && userReviews.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl text-gray-900">Avaliações de Clientes</h2>
                  <button
                    onClick={() => {
                      if (!user) { navigate("/login"); return; }
                      setShowReviewForm(!showReviewForm);
                    }}
                    className="flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Ser o Primeiro a Avaliar
                  </button>
                </div>

                {showReviewForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
                  >
                    <h3 className="text-xl mb-4 text-gray-900">A Sua Avaliação</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Classificação *</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setUserReviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 transition-colors ${
                                  star <= (hoverRating || userReviewRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Comentário *</label>
                        <textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                          placeholder="Partilhe a sua experiência com este produto..."
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800"
                      >
                        <Send className="w-4 h-4" />
                        Publicar Avaliação
                      </button>
                    </form>
                  </motion.div>
                )}

                {!showReviewForm && (
                  <div className="text-center py-8">
                    <Star className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500">Ainda não há avaliações. Seja o primeiro a partilhar a sua experiência!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}