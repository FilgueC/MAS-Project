import { Leaf, Recycle, Award, TrendingDown } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Leaf,
    title: "Amigo do Ambiente",
    description: "Cada produto recondicionado evita toneladas de CO₂ e reduz o desperdício eletrónico.",
  },
  {
    icon: Recycle,
    title: "Economia Circular",
    description: "Prolongamos a vida útil dos produtos, criando um ciclo sustentável de consumo.",
  },
  {
    icon: Award,
    title: "Qualidade Garantida",
    description: "Todos os produtos passam por rigorosos testes de qualidade e têm garantia de 24 meses.",
  },
  {
    icon: TrendingDown,
    title: "Preços Justos",
    description: "Poupe até 50% em relação a produtos novos sem comprometer a qualidade.",
  },
];

export function SustainabilitySection() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
              Mais do que tecnologia,{" "}
              <span className="text-emerald-700">uma escolha sustentável</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Na LOOP, acreditamos que a tecnologia pode e deve ser sustentável. 
              Cada produto recondicionado representa uma escolha consciente que 
              beneficia o planeta e o seu bolso.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-700" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1666804830091-56ba0e22becf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMGVjb25vbXklMjByZWN5Y2xpbmd8ZW58MXx8fHwxNzczMTk1OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sustentabilidade"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent" />
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
            >
              <div className="text-center">
                <div className="text-4xl text-emerald-700 mb-2">10.000+</div>
                <div className="text-gray-600">Produtos Recondicionados</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 bg-emerald-700 text-white p-6 rounded-xl shadow-xl"
            >
              <div className="text-center">
                <div className="text-4xl mb-2">95%</div>
                <div className="text-emerald-100">Clientes Satisfeitos</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
