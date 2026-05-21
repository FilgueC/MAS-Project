import { Link } from "react-router";
import { Mail, Phone, MapPin} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Description */}
          <div className="space-y-4">
            <p className="text-sm">
              Tecnologia recondicionada de qualidade premium. Sustentável, económico e inteligente.
            </p>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white mb-4 align-right">Contacto</h3>
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
        </div>
      </div>
    </footer>
  );
}