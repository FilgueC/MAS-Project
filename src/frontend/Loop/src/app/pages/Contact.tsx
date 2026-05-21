import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    alert("Mensagem enviada com sucesso! Entraremos em contacto em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              Entre em Contacto
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-emerald-100"
            >
              Estamos aqui para ajudar. Envie-nos uma mensagem!
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl mb-6 text-gray-900">
                Informações de contacto
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Tem alguma questão? Estamos disponíveis para ajudar através dos seguintes canais:
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Email</h3>
                    <p className="text-gray-600">suporte@loop.pt</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Telefone</h3>
                    <p className="text-gray-600">+351 210 000 000</p>
                    <p className="text-sm text-gray-500">Seg-Sex: 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Morada</h3>
                    <p className="text-gray-600">Avenida da Liberdade, 123</p>
                    <p className="text-gray-600">1250-140 Lisboa, Portugal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-1 text-gray-900">Horário</h3>
                    <p className="text-gray-600">Segunda a Sexta: 9h - 18h</p>
                    <p className="text-gray-600">Sábado: 10h - 14h</p>
                    <p className="text-gray-600">Domingo: Encerrado</p>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-2xl"
            >
              <h2 className="text-3xl mb-6 text-gray-900">
                Envie-nos uma Mensagem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                    Nome Completo*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="O seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm mb-2 text-gray-700">
                    Assunto*
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="produto">Questão sobre Produto</option>
                    <option value="encomenda">Estado da Encomenda</option>
                    <option value="garantia">Garantia e Devolução</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-gray-700">
                    Mensagem*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    placeholder="Escreva a sua mensagem..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 text-white py-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>

              <p className="mt-4 text-sm text-gray-500 text-center">
                * Campos obrigatórios.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
