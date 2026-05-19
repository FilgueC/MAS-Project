import { Shield, Truck, RotateCcw, Headset } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Garantia 24 Meses",
    description: "Todos os produtos com garantia completa",
  },
  {
    icon: Truck,
    title: "Envio Grátis",
    description: "Em compras acima de €50",
  },
  {
    icon: RotateCcw,
    title: "Devolução 30 Dias",
    description: "Não ficou satisfeito? Devolvemos o dinheiro",
  },
  {
    icon: Headset,
    title: "Suporte Premium",
    description: "Apoio ao cliente sempre disponível",
  },
];

export function TrustSection() {
  return (
    <section className="py-12 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="text-lg mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
