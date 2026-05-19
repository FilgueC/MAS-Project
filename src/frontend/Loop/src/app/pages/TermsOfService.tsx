import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-8 text-gray-900">
            Termos de Serviço
          </h1>
          
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl mb-4 text-gray-900">1. Introdução</h2>
              <p className="text-gray-600 leading-relaxed">
                Bem-vindo à LOOP. Ao aceder e utilizar o nosso website, concorda com os presentes termos de serviço. Se não concordar com algum destes termos, por favor, não utilize os nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">2. Produtos Recondicionados</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Todos os produtos vendidos pela LOOP são rigorosamente recondicionados e testados para garantir a máxima qualidade. Os produtos passam por um processo de certificação que inclui:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Inspeção completa de hardware e software</li>
                <li>Substituição de componentes danificados</li>
                <li>Limpeza profunda e restauração estética</li>
                <li>Testes de funcionalidade rigorosos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">3. Garantia</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Todos os produtos da LOOP incluem uma garantia de 24 meses. Esta garantia cobre:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Defeitos de fabrico</li>
                <li>Componentes com falhas</li>
                <li>Problemas de software relacionados com o recondicionamento</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Oferecemos ainda a possibilidade de upgrade para uma garantia de 36 meses por apenas €49 adicionais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">4. Envios e Devoluções</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong>Envios:</strong> Oferecemos envio grátis em Portugal Continental para encomendas superiores a €50. Para encomendas de valor inferior, aplicamos uma taxa de envio de €5.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>Devoluções:</strong> Tem 30 dias a partir da data de receção para devolver qualquer produto, desde que esteja nas condições originais. As devoluções são gratuitas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">5. Programa Trade-In</h2>
              <p className="text-gray-600 leading-relaxed">
                O nosso programa Trade-In permite-lhe trocar os seus dispositivos usados por crédito para utilizar na compra de produtos recondicionados. O valor do crédito é determinado com base no estado e especificações do dispositivo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">6. Privacidade</h2>
              <p className="text-gray-600 leading-relaxed">
                A LOOP compromete-se a proteger a privacidade dos seus dados pessoais. Recolhemos apenas as informações necessárias para processar as suas encomendas e melhorar a sua experiência. Os seus dados nunca serão partilhados com terceiros sem o seu consentimento.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">7. Pagamentos</h2>
              <p className="text-gray-600 leading-relaxed">
                Aceitamos pagamentos através de cartão de crédito, débito, Multibanco e MB Way. Todos os pagamentos são processados de forma segura através de sistemas encriptados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">8. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                A LOOP não se responsabiliza por danos resultantes de utilização inadequada dos produtos, acidentes, ou danos causados por terceiros. A nossa responsabilidade limita-se à garantia fornecida com cada produto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">9. Alterações aos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                A LOOP reserva-se o direito de modificar estes termos de serviço a qualquer momento. As alterações entrarão em vigor imediatamente após a sua publicação no website. Recomendamos que consulte regularmente esta página.
              </p>
            </section>

            <section>
              <h2 className="text-2xl mb-4 text-gray-900">10. Contacto</h2>
              <p className="text-gray-600 leading-relaxed">
                Para questões relacionadas com estes termos de serviço, por favor contacte-nos através de:
              </p>
              <ul className="list-none text-gray-600 space-y-2 mt-4">
                <li><strong>Email:</strong> info@loop.pt</li>
                <li><strong>Telefone:</strong> +351 210 000 000</li>
                <li><strong>Morada:</strong> Lisboa, Portugal</li>
              </ul>
            </section>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Última atualização: {new Date().toLocaleDateString("pt-PT", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
