import { Smartphone, Laptop, Tablet, Headphones, Cable, Speaker } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";

const categories = [
  {
    name: "Telemóveis",
    slug: "Telemóvel",
    icon: Smartphone,
    description: "iPhone, Samsung, e mais",
    image: "https://st4.depositphotos.com/1017228/21326/i/450/depositphotos_213262698-stock-photo-close-excited-young-girl-standing.jpg",
  },
  {
    name: "Computadores",
    slug: "Computador",
    icon: Laptop,
    description: "MacBook, Dell, HP, Lenovo",
    image: "https://images.unsplash.com/flagged/photo-1576697010739-6373b63f3204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzMyMzI3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Tablets",
    slug: "Tablet",
    icon: Tablet,
    description: "iPad, Samsung Galaxy Tab",
    image: "https://images.unsplash.com/photo-1769603795371-ad63bd85d524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJsZXQlMjBkZXZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzczMjMwMjc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Auscultadores",
    slug: "Auscultadores",
    icon: Headphones,
    description: "AirPods, Sony, Bose",
    image: "https://images.unsplash.com/photo-1640300065113-738f2abb8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXMlMjBhdWRpb3xlbnwxfHx8fDE3NzMyNTIwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Colunas",
    slug: "Colunas",
    icon: Speaker,
    description: "Bluetooth, portáteis",
    image: "https://images.unsplash.com/photo-1645020089957-608f1f0dfb61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVldG9vdGglMjBzcGVha2VyJTIwc291bmR8ZW58MXx8fHwxNzczMjU4NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    name: "Acessórios",
    slug: "Acessórios",
    icon: Cable,
    description: "Cabos, carregadores",
    image: "https://images.unsplash.com/photo-1771554753127-8e5a90b5a61d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyZ2luZyUyMGNhYmxlcyUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MzI1ODUyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

export function CategorySection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
            Explore as Nossas Categorias
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra uma vasta gama de produtos eletrónicos recondicionados de alta qualidade
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => navigate(`/produtos?categoria=${category.slug}`)}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Background Image */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <Icon className="w-10 h-10 mb-3" />
                  <h3 className="text-xl mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200">{category.description}</p>
                </div>

                {/* Hover Effect */}
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver mais
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}