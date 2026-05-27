import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useStock } from "./StockContext";
import { products } from "../data/products"; // Importar para validar contra o stock base
import { toast } from "sonner";

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
  addToCart: (item: Omit<CartItem, "quantity" | "warranty" | "warrantyPrice">, warranty?: "24" | "36") => boolean;
  updateQuantity: (id: number, quantity: number) => boolean;
  removeFromCart: (id: number) => void;
  updateWarranty: (id: number, warranty: "24" | "36") => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { reserveStock, releaseStock, getEffectiveStock } = useStock();

  // Carregar o carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("loop_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guardar o carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("loop_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    item: Omit<CartItem, "quantity" | "warranty" | "warrantyPrice">, 
    warranty: "24" | "36" = "24"
  ): boolean => {
    const originalProduct = products.find(p => p.id === item.id);
    const baseStock = originalProduct ? originalProduct.stock : 0;
    const availableStock = getEffectiveStock(item.id, baseStock);

    if (availableStock <= 0) {
      toast.error("Não existem mais unidades disponíveis em stock!");
      return false;
    }

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

    return true;
  };

  const updateQuantity = (id: number, quantity: number): boolean => {
    if (quantity <= 0) {
      removeFromCart(id);
      return true;
    }

    const originalProduct = products.find(p => p.id === id);
    const baseStock = originalProduct ? originalProduct.stock : 0;

    let success = true;

    setCart((prevCart) => {
      const item = prevCart.find((cartItem) => cartItem.id === id);
      if (!item) return prevCart;

      const diff = quantity - item.quantity;
      
      if (diff > 0) {
        const availableStock = getEffectiveStock(id, baseStock);
        if (diff > availableStock) {
          toast.error(`Apenas existem ${baseStock} unidades no total para este produto.`);
          success = false;
          return prevCart;
        }
        reserveStock(id, diff);
      } else if (diff < 0) {
        releaseStock(id, -diff);
      }

      return prevCart.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity } : cartItem
      );
    });

    return success;
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((cartItem) => cartItem.id === id);
      if (item) {
        releaseStock(id, item.quantity);
      }
      return prevCart.filter((cartItem) => cartItem.id !== id);
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