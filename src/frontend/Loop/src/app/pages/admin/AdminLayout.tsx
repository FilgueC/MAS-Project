import { useState, useEffect, ReactNode } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Handshake,
  Settings,
  LogOut,
  ExternalLink,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  RefreshCw,
  Recycle,
  Activity,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { id: "produtos", label: "Produtos & Stock", icon: Package, path: "/admin/produtos" },
  { id: "encomendas", label: "Encomendas", icon: ShoppingCart, path: "/admin/encomendas" },
  { id: "trade-in", label: "Trade-in", icon: RefreshCw, path: "/admin/trade-in", badge: "3" },
  { id: "insights", label: "IA & Insights", icon: Sparkles, path: "/admin/insights", badge: "IA" },
  { id: "utilizadores", label: "Utilizadores", icon: Users, path: "/admin/utilizadores" },
  { id: "parceiros", label: "Parceiros", icon: Handshake, path: "/admin/parceiros" },
  { id: "configuracoes", label: "Configurações", icon: Settings, path: "/admin/configuracoes" },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(5);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const currentPath = location.pathname;
  const currentSection = navItems.find(
    (item) => item.path === currentPath || (item.path !== "/admin" && currentPath.startsWith(item.path))
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ background: "linear-gradient(180deg, #064e3b 0%, #065f46 100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-white text-lg tracking-widest">LOOP</span>
              <span className="block text-emerald-400 text-xs -mt-1 tracking-wider">Backoffice</span>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-emerald-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live indicator */}
        <div className="mx-3 mt-3 px-4 py-2 bg-emerald-800/50 rounded-xl border border-emerald-700/50 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 text-xs">Plataforma Online</span>
          <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon, path, badge }) => (
            <Link
              key={id}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                currentPath === path || (path !== "/admin" && currentPath.startsWith(path))
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-emerald-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm flex-1">{label}</span>
              {badge && (
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                  badge === "IA"
                    ? "bg-violet-500 text-white"
                    : "bg-amber-500 text-white"
                }`}>
                  {badge}
                </span>
              )}
              {(currentPath === path || (path !== "/admin" && currentPath.startsWith(path))) && (
                <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
              )}
            </Link>
          ))}
        </nav>

        {/* Admin info + actions */}
        <div className="px-3 pb-4 border-t border-emerald-800 pt-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-white/10 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm truncate">{user.name}</p>
              <p className="text-emerald-400 text-xs truncate">{user.email}</p>
            </div>
          </div>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-emerald-200 hover:bg-white/10 hover:text-white transition-all"
          >
            <ExternalLink className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Ver Site Público</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-300 hover:bg-red-900/40 hover:text-red-200 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-gray-900 text-xl">
                {currentSection?.label ?? "Dashboard"}
              </h1>
              <p className="text-gray-500 text-sm">
                Bem-vindo, {user.name.split(" ")[0]} — Abril 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar..."
                className="bg-transparent text-sm text-gray-600 outline-none w-40 placeholder-gray-400"
              />
            </div>
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setNotifications(0)}
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px]">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
