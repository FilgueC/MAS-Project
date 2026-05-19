import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { Heart, ChevronLeft, Trash2, ShoppingCart } from "lucide-react";
import { useEffect } from "react";

export function Favorites() {
  const { user, favorites, removeFromFavorites } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

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
              Os Meus Favoritos
            </h1>
            <p className="text-lg text-gray-600">
              {favorites.length} {favorites.length === 1 ? "produto" : "produtos"} guardados
            </p>
          </div>

          {favorites.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl mb-2 text-gray-900">
                Ainda não tem favoritos
              </h2>
              <p className="text-gray-600 mb-6">
                Explore os produtos e guarde os seus preferidos aqui
              </p>
              <Link
                to="/produtos"
                className="inline-block bg-emerald-700 text-white px-8 py-3 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Ver Produtos
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden group"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="text-sm text-emerald-700 mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl text-gray-900">
                        €{product.price}
                      </span>
                    </div>

                    <button className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
