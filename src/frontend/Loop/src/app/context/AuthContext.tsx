import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isAdmin?: boolean;
  isPartner?: boolean;
  dateOfBirth?: string;
}

interface Order {
  id: string;
  date: string;
  status: "Enviada" | "Em Processamento" | "Entregue";
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, dateOfBirth: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  favorites: FavoriteProduct[];
  addToFavorites: (product: FavoriteProduct) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  walletBalance: number;
  addToWallet: (amount: number, description: string) => void;
  walletTransactions: WalletTransaction[];
}

interface WalletTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: "credit" | "debit";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);

  // Carrega o utilizador e os seus dados do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("loop_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Carrega encomendas do utilizador ligado
      const savedOrders = localStorage.getItem(`loop_orders_${userData.id}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      
      // Carrega favoritos
      const savedFavorites = localStorage.getItem(`loop_favorites_${userData.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      // Carrega dados da carteira
      const savedWallet = localStorage.getItem(`loop_wallet_${userData.id}`);
      if (savedWallet) {
        const walletData = JSON.parse(savedWallet);
        setWalletBalance(walletData.balance || 0);
        setWalletTransactions(walletData.transactions || []);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Verifica apenas na lista de utilizadores registados no localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("loop_registered_users") || "[]");
    const registeredUser = registeredUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (registeredUser) {
      const { password: _, ...userWithoutPassword } = registeredUser;
      setUser(userWithoutPassword);
      localStorage.setItem("loop_user", JSON.stringify(userWithoutPassword));
      
      // Carrega os favoritos do utilizador
      const savedFavorites = localStorage.getItem(`loop_favorites_${registeredUser.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      // Carrega as encomendas
      const savedOrders = localStorage.getItem(`loop_orders_${registeredUser.id}`);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }

      // Carrega o saldo e transações da carteira
      const savedWallet = localStorage.getItem(`loop_wallet_${registeredUser.id}`);
      if (savedWallet) {
        const walletData = JSON.parse(savedWallet);
        setWalletBalance(walletData.balance || 0);
        setWalletTransactions(walletData.transactions || []);
      }
      
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setOrders([]);
    setFavorites([]);
    setWalletBalance(0);
    setWalletTransactions([]);
    localStorage.removeItem("loop_user");
  };

  const register = async (name: string, email: string, password: string, dateOfBirth: string): Promise<boolean> => {
    const registeredUsers = JSON.parse(localStorage.getItem("loop_registered_users") || "[]");
    
    // Verifica se o email já se encontra registado
    const emailExists = registeredUsers.some((u: any) => u.email === email);

    if (emailExists) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone: "",
      avatar: "",
      dateOfBirth,
    };

    registeredUsers.push(newUser);
    localStorage.setItem("loop_registered_users", JSON.stringify(registeredUsers));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("loop_user", JSON.stringify(userWithoutPassword));

    return true;
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem("loop_user", JSON.stringify(updatedUser));

    const registeredUsers = JSON.parse(localStorage.getItem("loop_registered_users") || "[]");
    const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...data };
      localStorage.setItem("loop_registered_users", JSON.stringify(registeredUsers));
    }
  };

  const addOrder = (order: Order) => {
    if (!user) return;
    const newOrders = [order, ...orders];
    setOrders(newOrders);
    localStorage.setItem(`loop_orders_${user.id}`, JSON.stringify(newOrders));
  };

  const addToWallet = (amount: number, description: string) => {
    if (!user) return;
    const tx: WalletTransaction = {
      id: `TXN-${Date.now()}`,
      amount,
      description,
      date: new Date().toISOString(),
      type: amount >= 0 ? "credit" : "debit",
    };
    const newBalance = walletBalance + amount;
    const newTransactions = [tx, ...walletTransactions];
    setWalletBalance(newBalance);
    setWalletTransactions(newTransactions);
    localStorage.setItem(
      `loop_wallet_${user.id}`,
      JSON.stringify({ balance: newBalance, transactions: newTransactions })
    );
  };

  const addToFavorites = (product: FavoriteProduct) => {
    if (!user) return;
    
    const newFavorites = [...favorites, product];
    setFavorites(newFavorites);
    localStorage.setItem(`loop_favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (productId: number) => {
    if (!user) return;
    
    const newFavorites = favorites.filter((p) => p.id !== productId);
    setFavorites(newFavorites);
    localStorage.setItem(`loop_favorites_${user.id}`, JSON.stringify(newFavorites));
  };

  const isFavorite = (productId: number) => {
    return favorites.some((p) => p.id === productId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfile,
        orders,
        addOrder,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        walletBalance,
        addToWallet,
        walletTransactions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}