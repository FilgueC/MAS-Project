import { Link } from "react-router";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import logoImage from "../../Imagens/Logo.png";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoImage} 
              alt="LOOP" 
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              Início
            </Link>
            <Link 
              to="/produtos" 
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              Produtos
            </Link>
            <Link 
              to="/sobre" 
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contacto" 
              className="text-gray-700 hover:text-emerald-700 transition-colors"
            >
              Contacto
            </Link>
          </nav>

          {/* Cart, Account & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Link to="/carrinho" className="relative p-2 text-gray-700 hover:text-emerald-700 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Account Button */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  to="/conta"
                  className="flex items-center gap-2 p-2 text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                  <span className="text-sm">{user.name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <Link 
                to="/login"
                className="hidden md:flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                <User className="w-5 h-5" />
                Entrar
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/produtos" 
                className="text-gray-700 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Produtos
              </Link>
              <Link 
                to="/sobre" 
                className="text-gray-700 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/contacto" 
                className="text-gray-700 hover:text-emerald-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </Link>
              
              {/* Mobile Account Links */}
              {user ? (
                <>
                  <Link 
                    to="/conta" 
                    className="text-gray-700 hover:text-emerald-700 transition-colors flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    A Minha Conta
                  </Link>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  Entrar / Registar
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}