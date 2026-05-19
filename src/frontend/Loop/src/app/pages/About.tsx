import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Leaf, Award, Users, Target } from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Comprometidos com a redução do impacto ambiental através da economia circular.",
  },
  {
    icon: Award,
    title: "Qualidade",
    description: "Rigorosos padrões de teste e certificação para garantir produtos de excelência.",
  },
  {
    icon: Users,
    title: "Confiança",
    description: "Transparência total e garantias sólidas para a tranquilidade dos nossos clientes.",
  },
  {
    icon: Target,
    title: "Inovação",
    description: "Constantemente a melhorar processos para oferecer a melhor experiência.",
  },
];

const stats = [
  { value: "1.000+", label: "Produtos Vendidos" },
  { value: "95%", label: "Satisfação" },
  { value: "24", label: "Meses Garantia" },
  { value: "500+", label: "Toneladas CO₂ Evitadas" },
];

export function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl mb-6"
            >
              Dar uma segunda vida à tecnologia
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-emerald-100"
            >
              A LOOP nasceu da convicção de que tecnologia de qualidade não precisa de ser nova para ser excelente
            </motion.p>
          </div>
        </div>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl mb-6 text-gray-900">
                  A Nossa Missão
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  Na LOOP, acreditamos que a tecnologia deve ser acessível, sustentável e de alta qualidade. 
                  O nosso compromisso é oferecer produtos eletrónicos recondicionados que não só economizam 
                  dinheiro, mas também protegem o planeta.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Cada produto que passa pelas nossas mãos é cuidadosamente testado, certificado e preparado 
                  para ter uma segunda vida. Prolongamos o ciclo de vida dos dispositivos eletrónicos, 
                  contribuindo para uma economia mais circular e sustentável.
                </p>
                <p className="text-lg text-gray-600">
                  Mais do que uma loja, somos um movimento que promove o consumo consciente e responsável.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1719256969258-2be8c184e3f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHRlY2hub2xvZ3klMjBncmVlbnxlbnwxfHx8fDE3NzMyNTg1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Nossa Missão"
                  className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
                Os Nossos Valores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Princípios que guiam cada decisão que tomamos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-md text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-emerald-700" />
                    </div>
                    <h3 className="text-xl mb-3 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-emerald-700 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl mb-2">{stat.value}</div>
                  <div className="text-emerald-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
                O Nosso Processo de Recondicionamento
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cada produto passa por um rigoroso processo de 5 etapas
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                { step: "1", title: "Inspeção", description: "Análise detalhada de cada componente" },
                { step: "2", title: "Testes", description: "Verificação completa de funcionalidades" },
                { step: "3", title: "Limpeza", description: "Higienização profunda e profissional" },
                { step: "4", title: "Reparação", description: "Substituição de peças quando necessário" },
                { step: "5", title: "Certificação", description: "Garantia de qualidade e funcionamento" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-emerald-700 text-white rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
