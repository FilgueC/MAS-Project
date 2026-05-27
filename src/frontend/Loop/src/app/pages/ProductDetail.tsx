import { useParams, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { products } from "../data/products";
import { Star, Shield, Check, Heart, ChevronLeft, Leaf, Droplet, Zap, Trash2} from "lucide-react";
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

  // UC1.2 Cenário 2 (BR-02): histórico técnico obrigatório para permitir compra
  const hasServiceHistory = product.serviceHistory !== undefined && product.serviceHistory !== null;

  // UC1.2 Cenário 3: produto esgotado — sugestões de produtos similares
  const similarProducts = products
    .filter(p => p.id !== product.id && p.category === product.category && p.stock > 0)
    .slice(0, 3);

  const productImages = product.images || [
    product.image,
    "https://images.unsplash.com/photo-1609085174749-243b6a90e6b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjBzbWFydHBob25lJTIwY2xvc2UtdXB8ZW58MXx8fHwxNzczNDM2NDc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
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

  // Botão de carrinho deve estar desativado se: sem stock OU sem histórico técnico (BR-02)
  const canAddToCart = product.stock > 0 && hasServiceHistory;

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
                <div
                  className="h-96 bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${productImages[selectedImageIndex]})` }}
                />
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

              {/* UC1.2 Cenário 3: Stock status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                    <Check className="w-4 h-4" />
                    {product.stock} unidades em stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg">
                    Esgotado
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

              {/* UC1.2 Cenário 2 (BR-02): Aviso de histórico técnico indisponível */}
              {!hasServiceHistory && (
                <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <div>
                    <p className="text-amber-800 font-medium">Histórico indisponível</p>
                    <p className="text-amber-700 text-sm mt-1">
                      O histórico técnico deste produto não está disponível. Não é possível adicionar ao carrinho sem esta informação.
                    </p>
                  </div>
                </div>
              )}

              {/* UC1.2 Cenário 1: Histórico de intervenções e peças substituídas */}
              {hasServiceHistory && product.serviceHistory && (
                <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                  <h3 className="text-xl mb-4 text-gray-900">Histórico Técnico</h3>
                  <div className="space-y-3">
                    {product.serviceHistory.map((entry: { date: string; intervention: string; parts?: string[] }, index: number) => (
                      <div key={index} className="border-l-2 border-emerald-400 pl-4">
                        <p className="text-sm text-emerald-700 mb-1">
                          {new Date(entry.date).toLocaleDateString("pt-PT", { year: "numeric", month: "long" })}
                        </p>
                        <p className="text-gray-900 text-sm">{entry.intervention}</p>
                        {entry.parts && entry.parts.length > 0 && (
                          <p className="text-gray-500 text-xs mt-1">
                            Peças substituídas: {entry.parts.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warranty Selection */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <h3 className="text-xl mb-4 text-gray-900">Garantia</h3>
                <div className="space-y-3">
                  <label
                    className="flex items-center gap-3 cursor-pointer p-4 border-2 rounded-lg transition-colors hover:border-emerald-300"
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
                      <p className="text-sm text-gray-600 mt-1">Garantia padrão LOOP de 2 anos</p>
                    </div>
                  </label>

                  <label
                    className="flex items-center gap-3 cursor-pointer p-4 border-2 rounded-lg transition-colors hover:border-emerald-300"
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
                      <p className="text-sm text-gray-600 mt-1">Garantia estendida de 3 anos</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              {/* UC1.2 Cenário 2 (BR-02) + Cenário 3: botão desativado sem histórico ou sem stock */}
              <div className="flex gap-4 mb-6">
                {canAddToCart ? (
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors text-lg"
                  >
                    Adicionar ao Carrinho
                  </button>
                ) : (
                  <button
                    disabled
                    title={
                      !hasServiceHistory
                        ? "Histórico técnico indisponível"
                        : "Produto esgotado"
                    }
                    className="flex-1 bg-gray-300 text-gray-500 py-4 rounded-lg cursor-not-allowed text-lg"
                  >
                    {product.stock === 0 ? "Produto Esgotado" : "Indisponível para compra"}
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

              {selectedWarranty === "36" && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Total com garantia estendida:</span>
                    <span className="text-2xl text-emerald-700">€{product.price + 49}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* UC1.2 Cenário 3: Produtos similares quando esgotado */}
          {product.stock === 0 && similarProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl text-gray-900 mb-2">Produtos Similares Disponíveis</h2>
                <p className="text-gray-600 mb-6">
                  Este produto está esgotado. Veja outras opções da mesma categoria:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {similarProducts.map((similar) => (
                    <div
                      key={similar.id}
                      onClick={() => navigate(`/produto/${similar.id}`)}
                      className="group bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all border border-gray-100"
                    >
                      <div
                        className="h-40 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${similar.image})` }}
                      />
                      <div className="p-4">
                        <p className="text-xs text-emerald-700 mb-1">{similar.brand}</p>
                        <p className="text-gray-900 mb-2 text-sm">{similar.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-emerald-700">€{similar.price}</span>
                          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            {similar.condition}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

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
                      <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-20 md:pl-0`}>
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                          <div className="text-2xl mb-2">{step.icon}</div>
                          <h3 className="text-xl mb-1 text-gray-900">{step.title}</h3>
                          <p className="text-emerald-700 mb-2">{step.date}</p>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>

                      <div className="absolute left-8 md:left-1/2 w-16 h-16 md:transform md:-translate-x-1/2 bg-emerald-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                        <span className="text-white text-xl">{step.icon}</span>
                      </div>

                      <div className="hidden md:block flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}