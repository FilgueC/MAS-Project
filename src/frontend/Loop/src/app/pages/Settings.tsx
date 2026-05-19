import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { ChevronLeft, User, Mail, Phone, Camera, Check, Lock, Bell, Shield, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export function Settings() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailOrders: true,
    emailNewProducts: false,
    pushNotifications: false,
  });
  
  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "private" as "public" | "private",
    shareData: false,
    trackingCookies: true,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAvatarUrlChange = (url: string) => {
    setFormData({ ...formData, avatar: url });
    setAvatarPreview(url);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("As passwords não coincidem");
      return;
    }
    if (newPassword.length < 6) {
      alert("A password deve ter pelo menos 6 caracteres");
      return;
    }
    // Simulate password change
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleNotificationsSubmit = () => {
    localStorage.setItem("loop_notifications", JSON.stringify(notifications));
    setShowNotificationsModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePrivacySubmit = () => {
    localStorage.setItem("loop_privacy", JSON.stringify(privacy));
    setShowPrivacyModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            to="/conta"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-6"
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar à Conta
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl mb-2 text-gray-900">
              Definições
            </h1>
            <p className="text-lg text-gray-600">
              Gerir as informações do seu perfil
            </p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-700" />
              <p className="text-emerald-800">Perfil atualizado com sucesso!</p>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar Section */}
              <div>
                <label className="block text-sm mb-4 text-gray-700">
                  Foto de Perfil
                </label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-emerald-700 rounded-full p-2">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="url"
                      value={formData.avatar}
                      onChange={(e) => handleAvatarUrlChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                      placeholder="URL da imagem do perfil"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Cole o URL de uma imagem (ex: https://exemplo.com/foto.jpg)
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm mb-2 text-gray-700">
                  Nome de Utilizador
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="O seu nome"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm mb-2 text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="seuemail@exemplo.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm mb-2 text-gray-700">
                  Número de Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="+351 912 345 678"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 text-white py-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Guardar Alterações
                </button>
              </div>
            </form>

            {/* Additional Settings */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg mb-4 text-gray-900">Outras Definições</h3>
              <div className="space-y-3">
                <button
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => setShowPasswordModal(true)}
                >
                  Alterar Password
                </button>
                <button
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => setShowNotificationsModal(true)}
                >
                  Preferências de Notificações
                </button>
                <button
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                  onClick={() => setShowPrivacyModal(true)}
                >
                  Privacidade e Segurança
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Alterar Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Password Atual</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Password Atual"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Nova Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Nova Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Confirmar Nova Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Confirmar Nova Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 mr-4"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 text-white py-2 px-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Preferências de Notificações</h2>
            <form onSubmit={handleNotificationsSubmit} className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.emailMarketing}
                  onChange={(e) => setNotifications({ ...notifications, emailMarketing: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Email de Marketing</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.emailOrders}
                  onChange={(e) => setNotifications({ ...notifications, emailOrders: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Email de Encomendas</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.emailNewProducts}
                  onChange={(e) => setNotifications({ ...notifications, emailNewProducts: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Email de Novos Produtos</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Notificações Push</label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 mr-4"
                  onClick={() => setShowNotificationsModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 text-white py-2 px-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Privacidade e Segurança</h2>
            <form onSubmit={handlePrivacySubmit} className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={privacy.profileVisibility === "public"}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisibility: "public" })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Perfil Público</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={privacy.profileVisibility === "private"}
                  onChange={(e) => setPrivacy({ ...privacy, profileVisibility: "private" })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Perfil Privado</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={privacy.shareData}
                  onChange={(e) => setPrivacy({ ...privacy, shareData: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Compartilhar Dados</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={privacy.trackingCookies}
                  onChange={(e) => setPrivacy({ ...privacy, trackingCookies: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm text-gray-700">Cookies de Rastreamento</label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 mr-4"
                  onClick={() => setShowPrivacyModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-700 text-white py-2 px-4 rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}