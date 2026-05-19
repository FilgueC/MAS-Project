import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Award, Shield, TrendingUp, Users, Globe, CheckCircle2, Leaf, Clock } from "lucide-react";
import { motion } from "motion/react";

export function Supplier() {
  const stats = [
    { icon: Clock, label: "Anos de Experiência", value: "20+" },
    { icon: Award, label: "Produtos Recondicionados", value: "500k+" },
    { icon: Users, label: "Clientes Satisfeitos", value: "200k+" },
    { icon: Globe, label: "Países Servidos", value: "25+" },
  ];

  const certifications = [
    "ISO 9001:2015 - Gestão de Qualidade",
    "ISO 14001:2015 - Gestão Ambiental",
    "R2 Certified - Reciclagem Responsável",
    "WEEE Compliance - Gestão de Resíduos Eletrónicos",
  ];

  const timeline = [
    { year: "2003", event: "Fundação da empresa como pioneira em recondicionamento" },
    { year: "2008", event: "Expansão para mercados europeus" },
    { year: "2015", event: "Certificação ISO e liderança no mercado" },
    { year: "2020", event: "500 mil dispositivos recondicionados" },
    { year: "2024", event: "Parceria com LOOP para sustentabilidade premium" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl mb-6">
                O Nosso Fornecedor
              </h1>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
                Mais de 20 anos de excelência em recondicionamento de dispositivos eletrónicos, 
                líder europeu em qualidade e sustentabilidade
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-md"
              >
                <stat.icon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <div className="text-3xl text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* About Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl text-gray-900 mb-6">Líder no Mercado Europeu</h2>
              <p className="text-gray-600 mb-4">
                Desde 2003, o nosso parceiro fornecedor tem sido pioneiro na indústria de recondicionamento 
                de dispositivos eletrónicos, estabelecendo os mais altos padrões de qualidade e sustentabilidade 
                no mercado europeu.
              </p>
              <p className="text-gray-600 mb-4">
                Com mais de duas décadas de experiência, desenvolvemos processos avançados de recondicionamento 
                que garantem que cada dispositivo atinge níveis de desempenho comparáveis a novos, mas com um 
                impacto ambiental significativamente reduzido.
              </p>
              <p className="text-gray-600">
                A nossa parceria com LOOP representa o compromisso mútuo com a excelência, oferecendo aos 
                consumidores europeus produtos premium recondicionados com garantia estendida e certificação 
                de qualidade.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-emerald-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-emerald-600" />
                Compromisso com a Qualidade
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Processo de recondicionamento certificado com mais de 75 pontos de verificação
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Apenas componentes originais ou de qualidade equivalente
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Testes rigorosos de bateria, ecrã, câmara e funcionalidades
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    Garantia de qualidade com certificação de cada dispositivo
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-2xl p-8 mb-16 shadow-md">
            <h3 className="text-2xl text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-600" />
              Certificações e Compliance
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-gray-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-600 rounded-2xl p-8 mb-16 text-white">
            <h3 className="text-2xl mb-6 flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              Impacto Ambiental
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">5,000+</div>
                <div className="text-emerald-100">Toneladas de CO₂ evitadas</div>
              </div>
              <div>
                <div className="text-3xl mb-2">2M+</div>
                <div className="text-emerald-100">Litros de água poupados</div>
              </div>
              <div>
                <div className="text-3xl mb-2">500+</div>
                <div className="text-emerald-100">Toneladas de resíduos eletrónicos reciclados</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl text-gray-900 mb-8 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              A Nossa História
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200 md:left-1/2 md:-ml-px"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                      <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="text-2xl text-emerald-600 mb-2">{item.year}</div>
                        <p className="text-gray-700">{item.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 w-8 h-8 bg-emerald-600 rounded-full border-4 border-white md:left-1/2 md:-ml-4"></div>
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-md">
            <h3 className="text-2xl text-gray-900 mb-4">Qualidade Garantida</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Todos os produtos LOOP são fornecidos e recondicionados pelos melhores especialistas 
              europeus, garantindo excelência, durabilidade e sustentabilidade.
            </p>
            <a
              href="/produtos"
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Ver Produtos
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
