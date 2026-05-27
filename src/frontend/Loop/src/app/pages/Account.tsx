import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { User, Package, Heart, RefreshCw, Settings, LogOut, MessageCircle, AlertTriangle, Wallet } from "lucide-react";
import { useEffect } from "react";

export function Account() {
  const { user, logout, walletBalance } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      icon: Package,
      title: "As Minhas Encomendas",
      description: "Ver histórico e estado das encomendas",
      path: "/conta/encomendas",
    },
    {
      icon: Heart,
      title: "Os Meus Favoritos",
      description: "Produtos guardados para mais tarde",
      path: "/conta/favoritos",
    },
    {
      icon: Settings,
      title: "Definições",
      description: "Gerir perfil e preferências",
      path: "/conta/definicoes",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* User Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10" />
                )}
              </div>
              <div>
                <h1 className="text-3xl mb-2">Olá, {user.name}!</h1>
                <p className="text-emerald-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <Icon className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                      <h3 className="text-xl mb-1 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full md:w-auto bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Terminar Sessão
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}