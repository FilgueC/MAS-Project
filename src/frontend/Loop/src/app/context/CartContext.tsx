import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useStock } from "./StockContext";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  warranty: "24" | "36";
  warrantyPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "warranty" | "warrantyPrice">, warranty?: "24" | "36") => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateWarranty: (id: number, warranty: "24" | "36") => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { reserveStock, releaseStock } = useStock();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("loop_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("loop_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity" | "warranty" | "warrantyPrice">, warranty: "24" | "36" = "24") => {
    // Reserva 1 unidade de stock
    reserveStock(item.id, 1);

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id && cartItem.warranty === warranty);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.warranty === warranty
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          warranty,
          warrantyPrice: warranty === "36" ? 49 : 0,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((cartItem) => cartItem.id === id);
      if (item) {
        // Liberta todas as unidades reservadas deste produto
        releaseStock(id, item.quantity);
      }
      return prevCart.filter((cartItem) => cartItem.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) => {
      const item = prevCart.find((cartItem) => cartItem.id === id);
      if (item) {
        const diff = quantity - item.quantity;
        if (diff > 0) {
          reserveStock(id, diff);   // adicionou mais unidades → reserva
        } else if (diff < 0) {
          releaseStock(id, -diff);  // reduziu unidades → liberta
        }
      }
      return prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      );
    });
  };

  const updateWarranty = (id: number, warranty: "24" | "36") => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, warranty, warrantyPrice: warranty === "36" ? 49 : 0 }
          : item
      )
    );
  };

  const clearCart = () => {
    // Liberta todo o stock reservado ao limpar o carrinho
    setCart((prevCart) => {
      prevCart.forEach((item) => releaseStock(item.id, item.quantity));
      return [];
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price + item.warrantyPrice) * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateWarranty,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}