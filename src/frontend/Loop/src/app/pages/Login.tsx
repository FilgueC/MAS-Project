import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Mail, Lock, User, Calendar } from "lucide-react";

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        // Redirect based on user type
        if (email === "admin@loop.pt") {
          navigate("/admin");
        } else if (email === "partner@techrenew.pt") {
          navigate("/parceiro/dashboard");
        } else {
          navigate("/conta");
        }
      } else {
        setError("Email ou password incorretos");
      }
    } else {
      if (!name || !email || !password || !dateOfBirth) {
        setError("Preencha todos os campos");
        return;
      }

      // Verify age >= 18
      const age = calculateAge(dateOfBirth);
      if (age < 18) {
        setError("Deve ter pelo menos 18 anos para se registar");
        return;
      }

      const success = await register(name, email, password, dateOfBirth);
      if (success) {
        navigate("/conta");
      } else {
        setError("Este email já está registado");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl mb-2 text-gray-900">
                {isLogin ? "Entrar" : "Criar Conta"}
              </h1>
              <p className="text-gray-600">
                {isLogin ? "Bem-vindo de volta à LOOP" : "Junte-se à LOOP"}
              </p>
            </div>
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                      Nome Completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="O seu nome"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm mb-2 text-gray-700">
                      Data de Nascimento
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        id="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Deve ter pelo menos 18 anos para se registar
                    </p>
                  </div>
                </>
              )}

              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                {isLogin ? "Entrar" : "Criar Conta"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {isLogin
                  ? "Ainda não tem conta? Criar uma agora"
                  : "Já tem conta? Entrar"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}