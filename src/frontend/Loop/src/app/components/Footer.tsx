import { Link } from "react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";
import logoImage from "figma:asset/7dd3bcd6b3ac8acf1406c32cfc67a42f9934c484.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img 
              src={logoImage} 
              alt="LOOP" 
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm">
              Tecnologia recondicionada de qualidade premium. Sustentável, económico e inteligente.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="hover:text-emerald-400 transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-emerald-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/fornecedor" className="hover:text-emerald-400 transition-colors">
                  O Nosso Fornecedor
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-emerald-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-white mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/produtos?categoria=Telemóvel" className="hover:text-emerald-400 transition-colors">
                  Telemóveis
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Computador" className="hover:text-emerald-400 transition-colors">
                  Computadores
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Tablet" className="hover:text-emerald-400 transition-colors">
                  Tablets
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Auscultadores" className="hover:text-emerald-400 transition-colors">
                  Auscultadores
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Colunas" className="hover:text-emerald-400 transition-colors">
                  Colunas
                </Link>
              </li>
              <li>
                <Link to="/produtos?categoria=Acessórios" className="hover:text-emerald-400 transition-colors">
                  Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>info@loop.pt</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>+351 210 000 000</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Lisboa, Portugal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <p>&copy; {new Date().getFullYear()} LOOP. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <Link to="/termos-de-servico" className="hover:text-emerald-400 transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">Loop bem feito 🌱</p>
        </div>
      </div>
    </footer>
  );
}