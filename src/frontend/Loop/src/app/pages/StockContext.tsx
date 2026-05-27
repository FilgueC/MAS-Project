import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Stock reservado: mapa de productId -> quantidade reservada no carrinho
type ReservedStock = Record<number, number>;

interface StockContextType {
  reserveStock: (productId: number, quantity: number) => void;
  releaseStock: (productId: number, quantity: number) => void;
  getEffectiveStock: (productId: number, baseStock: number) => number;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

const STORAGE_KEY = "loop_reserved_stock";

export function StockProvider({ children }: { children: ReactNode }) {
  const [reserved, setReserved] = useState<ReservedStock>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reserved));
  }, [reserved]);

  const reserveStock = (productId: number, quantity: number) => {
    setReserved((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + quantity,
    }));
  };

  const releaseStock = (productId: number, quantity: number) => {
    setReserved((prev) => {
      const current = prev[productId] ?? 0;
      const next = Math.max(0, current - quantity);
      if (next === 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: next };
    });
  };

  const getEffectiveStock = (productId: number, baseStock: number) => {
    return Math.max(0, baseStock - (reserved[productId] ?? 0));
  };

  return (
    <StockContext.Provider value={{ reserveStock, releaseStock, getEffectiveStock }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
}