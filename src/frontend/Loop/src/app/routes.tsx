import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Account } from "./pages/Account";
import { Orders } from "./pages/Orders";
import { Favorites } from "./pages/Favorites";
import { TradeIn } from "./pages/TradeIn";
import { Settings } from "./pages/Settings";
import { TermsOfService } from "./pages/TermsOfService";
import { Supplier } from "./pages/Supplier";
import { Messages } from "./pages/Messages";
import { Complaints } from "./pages/Complaints";
import { Wallet } from "./pages/Wallet";



export const router = createBrowserRouter([
  // ── Public routes ─────────────────────────────────────────────────────────
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/produtos",
    Component: Products,
  },
  {
    path: "/produto/:id",
    Component: ProductDetail,
  },
  {
    path: "/carrinho",
    Component: Cart,
  },
  {
    path: "/sobre",
    Component: About,
  },
  {
    path: "/contacto",
    Component: Contact,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/conta",
    Component: Account,
  },
  {
    path: "/conta/encomendas",
    Component: Orders,
  },
  {
    path: "/conta/favoritos",
    Component: Favorites,
  },
  {
    path: "/conta/trade-in",
    Component: TradeIn,
  },
  {
    path: "/conta/definicoes",
    Component: Settings,
  },
  {
    path: "/conta/mensagens",
    Component: Messages,
  },
  {
    path: "/conta/reclamacoes",
    Component: Complaints,
  },
  {
    path: "/conta/carteira",
    Component: Wallet,
  },
  {
    path: "/termos-de-servico",
    Component: TermsOfService,
  },
  {
    path: "/fornecedor",
    Component: Supplier,
  },
]);