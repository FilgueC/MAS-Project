import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Star, Shield, SlidersHorizontal, Heart, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products } from "../data/products";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFromUrl = searchParams.get("categoria");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "Todos");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const { addToCart } = useCart();

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const categories = [
    { id: "Todos", name: "Todos", icon: "📱" },
    { id: "Telemóvel", name: "Telemóveis", icon: "📱" },
    { id: "Computador", name: "Computadores", icon: "💻" },
    { id: "Tablet", name: "Tablets", icon: "📱" },
    { id: "Auscultadores", name: "Auscultadores", icon: "🎧" },
    { id: "Colunas", name: "Colunas", icon: "🔊" },
    { id: "Acessórios", name: "Acessórios", icon: "🔌" }
  ];

  // Extract unique brands, storages, and conditions from products
  const brands = Array.from(new Set(products.map(p => p.brand))).sort();
  const storages = Array.from(new Set(products.map(p => p.storage).filter(Boolean) as string[])).sort();
  const conditions = Array.from(new Set(products.map(p => p.condition)));

  // Filter products
  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === "Todos" || p.category === selectedCategory;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
    const storageMatch = selectedStorages.length === 0 || (p.storage && selectedStorages.includes(p.storage));
    const conditionMatch = selectedConditions.length === 0 || selectedConditions.includes(p.condition);

    // Search query filter (searches in name, brand, category)
    const searchMatch = searchQuery === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Price filter
    const minPriceMatch = minPrice === "" || p.price >= minPrice;
    const maxPriceMatch = maxPrice === "" || p.price <= maxPrice;

    return categoryMatch && brandMatch && storageMatch && conditionMatch && searchMatch && minPriceMatch && maxPriceMatch;
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    navigate(categoryId === "Todos" ? "/produtos" : `/produtos?categoria=${categoryId}`);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleStorage = (storage: string) => {
    setSelectedStorages(prev => 
      prev.includes(storage) ? prev.filter(s => s !== storage) : [...prev, storage]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev => 
      prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
    );
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedStorages([]);
    setSelectedConditions([]);
    setSelectedCategory("Todos");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    navigate("/produtos");
  };

  const activeFiltersCount = selectedBrands.length + selectedStorages.length + selectedConditions.length +
    (selectedCategory !== "Todos" ? 1 : 0) +
    (searchQuery !== "" ? 1 : 0) +
    (minPrice !== "" ? 1 : 0) +
    (maxPrice !== "" ? 1 : 0);

  const handleFavoriteClick = (product: typeof products[0]) => {
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

  const handleAddToCart = (product: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success("Produto adicionado ao carrinho!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl mb-4">
              Todos os Produtos
            </h1>
            <p className="text-xl text-emerald-100">
              Descubra a nossa seleção completa de produtos recondicionados
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar por produto ou marca"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-emerald-700 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl text-gray-900">Filtros Avançados</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    {/* Price Filter */}
                    <div>
                      <h4 className="text-sm text-gray-700 mb-3">Preço (€)</h4>
                      <div className="space-y-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                        <input
                          type="number"
                          placeholder="Máx"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Brand Filter */}
                    <div>
                      <h4 className="text-sm text-gray-700 mb-3">Marca</h4>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <label key={brand} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className="w-4 h-4 text-emerald-600 rounded"
                            />
                            <span className="text-gray-700">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Storage Filter */}
                    <div>
                      <h4 className="text-sm text-gray-700 mb-3">Armazenamento</h4>
                      <div className="space-y-2">
                        {storages.map(storage => (
                          <label key={storage} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedStorages.includes(storage)}
                              onChange={() => toggleStorage(storage)}
                              className="w-4 h-4 text-emerald-600 rounded"
                            />
                            <span className="text-gray-700">{storage}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Condition Filter */}
                    <div>
                      <h4 className="text-sm text-gray-700 mb-3">Estado</h4>
                      <div className="space-y-2">
                        {conditions.map(condition => (
                          <label key={condition} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedConditions.includes(condition)}
                              onChange={() => toggleCondition(condition)}
                              className="w-4 h-4 text-emerald-600 rounded"
                            />
                            <span className="text-gray-700">{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {activeFiltersCount > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm text-gray-700">Filtros ativos ({activeFiltersCount}):</h4>
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          Limpar tudo
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategory !== "Todos" && (
                          <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                            {categories.find(c => c.id === selectedCategory)?.icon}{" "}
                            {categories.find(c => c.id === selectedCategory)?.name}
                            <button
                              onClick={() => handleCategorySelect("Todos")}
                              className="hover:bg-emerald-200 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )}
                        {selectedBrands.map(brand => (
                          <span key={brand} className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {brand}
                            <button
                              onClick={() => toggleBrand(brand)}
                              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {selectedStorages.map(storage => (
                          <span key={storage} className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                            {storage}
                            <button
                              onClick={() => toggleStorage(storage)}
                              className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        {selectedConditions.map(condition => (
                          <span key={condition} className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                            {condition}
                            <button
                              onClick={() => toggleCondition(condition)}
                              className="hover:bg-amber-200 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-gray-600 mb-6">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => navigate(`/produto/${product.id}`)}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/95 text-gray-900 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {product.condition}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteClick(product);
                    }}
                    className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${
                        user && isFavorite(product.id) 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="text-sm text-emerald-700 mb-2">{product.brand}</div>
                  <h3 className="text-xl mb-2 text-gray-900">{product.name}</h3>

                  {/* Rating & Stock */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">Garantia 24 meses</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                      {product.stock > 0 ? `${product.stock} em stock` : "Esgotado"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl text-gray-900">€{product.price}</span>
                  </div>

                  {/* CTA Button */}
                  {product.stock > 0 ? (
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Adicionar ao Carrinho
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed"
                    >
                      Produto Esgotado
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os seus filtros ou explore outras categorias
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
