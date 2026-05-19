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

// Mock user data
const MOCK_USERS = [
  {
    id: "1",
    name: "John Silva",
    email: "john@loop.pt",
    password: "loop2024",
    phone: "+351 912 345 678",
    avatar: "",
    isAdmin: false,
    isPartner: false,
  },
  {
    id: "admin",
    name: "Administrador LOOP",
    email: "admin@loop.pt",
    password: "admin2024",
    phone: "+351 900 000 000",
    avatar: "",
    isAdmin: true,
    isPartner: false,
  },
  {
    id: "partner",
    name: "TechRenew Lisboa",
    email: "partner@techrenew.pt",
    password: "partner2024",
    phone: "+351 210 123 456",
    avatar: "",
    isAdmin: false,
    isPartner: true,
  },
];

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-03-05",
    status: "Entregue",
    total: 1498,
    items: [
      {
        id: "1",
        name: "MacBook Pro 14\"",
        quantity: 1,
        price: 1499,
        image: "https://images.unsplash.com/photo-1551533390-b80b6ffa7816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWNCb29rJTIwUHJvJTIwbGFwdG9wfGVufDF8fHx8MTc3MzI1OTE4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-08",
    status: "Em Processamento",
    total: 978,
    items: [
      {
        id: "2",
        name: "iPhone 13 Pro",
        quantity: 1,
        price: 699,
        image: "https://images.unsplash.com/photo-1643858527913-16e06986db32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxMyUyMFBybyUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzczMjU5MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        id: "3",
        name: "AirPods Pro 2",
        quantity: 1,
        price: 279,
        image: "https://images.unsplash.com/photo-1639789974886-7873405240ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBaXJQb2RzJTIwUHJvJTIwZWFyYnVkc3xlbnwxfHx8fDE3NzMyMzMwMDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
    ],
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("loop_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Load orders for logged in user
      if (userData.email === "john@loop.pt") {
        setOrders(MOCK_ORDERS);
      }
      
      // Load favorites
      const savedFavorites = localStorage.getItem(`loop_favorites_${userData.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      // Load wallet
      const savedWallet = localStorage.getItem(`loop_wallet_${userData.id}`);
      if (savedWallet) {
        const walletData = JSON.parse(savedWallet);
        setWalletBalance(walletData.balance || 0);
        setWalletTransactions(walletData.transactions || []);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check mock users
    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem("loop_user", JSON.stringify(userWithoutPassword));
      
      // Load orders for John
      if (email === "john@loop.pt") {
        setOrders(MOCK_ORDERS);
      }
      
      // Load favorites
      const savedFavorites = localStorage.getItem(`loop_favorites_${mockUser.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      // Load wallet
      const savedWallet = localStorage.getItem(`loop_wallet_${mockUser.id}`);
      if (savedWallet) {
        const walletData = JSON.parse(savedWallet);
        setWalletBalance(walletData.balance || 0);
        setWalletTransactions(walletData.transactions || []);
      }
      
      return true;
    }

    // Check registered users
    const registeredUsers = JSON.parse(localStorage.getItem("loop_registered_users") || "[]");
    const registeredUser = registeredUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (registeredUser) {
      const { password: _, ...userWithoutPassword } = registeredUser;
      setUser(userWithoutPassword);
      localStorage.setItem("loop_user", JSON.stringify(userWithoutPassword));
      
      // Load favorites
      const savedFavorites = localStorage.getItem(`loop_favorites_${registeredUser.id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }

      // Load wallet
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
    // Check if email already exists
    const registeredUsers = JSON.parse(localStorage.getItem("loop_registered_users") || "[]");
    const emailExists = registeredUsers.some((u: any) => u.email === email) ||
                        MOCK_USERS.some((u) => u.email === email);

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

    // Update in registered users if exists
    const registeredUsers = JSON.parse(localStorage.getItem("loop_registered_users") || "[]");
    const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...data };
      localStorage.setItem("loop_registered_users", JSON.stringify(registeredUsers));
    }
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