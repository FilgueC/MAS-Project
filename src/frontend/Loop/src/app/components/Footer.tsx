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
      </div>
    </footer>
  );
}