import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Shield, Recycle } from "lucide-react";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      // Check if it's an admin user
      const savedUser = JSON.parse(localStorage.getItem("loop_user") || "{}");
      if (savedUser.isAdmin) {
        navigate("/admin");
      } else {
        setError("Acesso não autorizado. Esta área é reservada a administradores.");
      }
    } else {
      setError("Credenciais inválidas. Verifique o email e a password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)" }}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Recycle className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-white text-2xl tracking-widest">LOOP</span>
              <span className="block text-emerald-300 text-xs tracking-wider -mt-1">BACKOFFICE</span>
            </div>
          </div>

          {/* Headlines */}
          <div className="space-y-6">
            <h1 className="text-5xl text-white leading-tight">
              Painel de<br />
              <span className="text-emerald-300">Administração</span>
            </h1>
            <p className="text-emerald-200 text-lg leading-relaxed max-w-sm">
              Espaço de trabalho interno da LOOP para gestão completa da plataforma de electrónicos recondicionados.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { label: "Produtos Ativos", value: "247" },
            { label: "Encomendas Hoje", value: "38" },
            { label: "Receita Mensal", value: "€48.7k" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-white text-xl">{stat.value}</p>
              <p className="text-emerald-300 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white lg:rounded-l-3xl">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-emerald-900 text-xl tracking-wider">LOOP</span>
              <span className="block text-emerald-600 text-xs -mt-1">BACKOFFICE</span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-emerald-700" />
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Área Restrita
              </span>
            </div>
            <h2 className="text-3xl text-gray-900 mb-2">Iniciar Sessão</h2>
            <p className="text-gray-500">Acesso exclusivo para a equipa LOOP</p>
          </div>

          {/* Credentials hint */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
            <p className="text-xs text-blue-700 mb-2 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              <strong>Credenciais de Acesso — Administrador</strong>
            </p>
            <p className="text-xs text-blue-600">Email: <strong>admin@loop.pt</strong></p>
            <p className="text-xs text-blue-600">Password: <strong>admin2024</strong></p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Email corporativo
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                  placeholder="admin@loop.pt"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 text-gray-900 placeholder-gray-400 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  A verificar...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Entrar no Backoffice
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400">
              LOOP Backoffice © 2026 — Uso exclusivamente interno
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
