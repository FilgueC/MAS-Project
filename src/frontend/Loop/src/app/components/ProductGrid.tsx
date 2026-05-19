import { Star, Shield, Heart } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../data/products";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function ProductGrid() {
  const { user, addToFavorites, removeFromFavorites, isFavorite } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // Get first 6 products for homepage
  const featuredProducts = products.slice(0, 6);

  const handleFavoriteClick = (product: typeof products[0], e: React.MouseEvent) => {
    e.stopPropagation();
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Produtos em Destaque
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seleção premium de produtos recondicionados com garantia de qualidade
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                  onClick={(e) => handleFavoriteClick(product, e)}
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
                <div className="text-sm text-emerald-700 mb-2">{product.category}</div>
                <h3 className="text-xl mb-2 text-gray-900">{product.name}</h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">Garantia 24 meses</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl text-gray-900">€{product.price}</span>
                </div>

                {/* CTA Button */}
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/produtos")}
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Ver Todos os Produtos
          </button>
        </div>
      </div>
    </section>
  );
}