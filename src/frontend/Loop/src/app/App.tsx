import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { StockProvider } from "./context/StockContext";
import { Toaster } from "sonner";

export default function App() {
  return (
    <AuthProvider>
      <StockProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </CartProvider>
      </StockProvider>
    </AuthProvider>
  );
}