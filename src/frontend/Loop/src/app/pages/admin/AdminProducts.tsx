import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Minus,
  AlertTriangle,
  X,
  Save,
  ChevronUp,
  ChevronDown,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: number;
  nome: string;
  categoria: string;
  estoque: number;
  preco: number;
  estado: string;
  fornecedor: string;
  ativo: boolean;
  estoqueMinimo: number;
  sku: string;
}

const initialProducts: Product[] = [
  { id: 1, nome: "iPhone 14 Pro", categoria: "Smartphones", estoque: 12, preco: 699, estado: "Como Novo", fornecedor: "TechRenew Lisboa", ativo: true, estoqueMinimo: 10, sku: "APL-IP14P-256" },
  { id: 2, nome: "MacBook Air M3", categoria: "Laptops", estoque: 4, preco: 1149, estado: "Excelente", fornecedor: "TechRenew Lisboa", ativo: true, estoqueMinimo: 8, sku: "APL-MBA-M3" },
  { id: 3, nome: "iPad Pro 11\"", categoria: "Tablets", estoque: 15, preco: 589, estado: "Como Novo", fornecedor: "EcoGadgets Porto", ativo: true, estoqueMinimo: 8, sku: "APL-IPP11-M2" },
  { id: 4, nome: "AirPods Pro 2", categoria: "Áudio", estoque: 24, preco: 249, estado: "Como Novo", fornecedor: "TechRenew Lisboa", ativo: true, estoqueMinimo: 10, sku: "APL-APP2" },
  { id: 5, nome: "Dell XPS 15", categoria: "Laptops", estoque: 5, preco: 1299, estado: "Bom", fornecedor: "RefurbPro Madrid", ativo: true, estoqueMinimo: 6, sku: "DEL-XPS15-I7" },
  { id: 6, nome: "Samsung Galaxy S23", categoria: "Smartphones", estoque: 0, preco: 549, estado: "Excelente", fornecedor: "GreenTech Berlin", ativo: false, estoqueMinimo: 8, sku: "SAM-GS23-128" },
  { id: 7, nome: "Apple Watch S9", categoria: "Acessórios", estoque: 18, preco: 359, estado: "Como Novo", fornecedor: "TechRenew Lisboa", ativo: true, estoqueMinimo: 10, sku: "APL-AWS9" },
  { id: 8, nome: "Sony WH-1000XM5", categoria: "Áudio", estoque: 10, preco: 299, estado: "Excelente", fornecedor: "EcoGadgets Porto", ativo: true, estoqueMinimo: 8, sku: "SNY-WH1000XM5" },
];

interface StockModalProps {
  product: Product;
  onClose: () => void;
  onUpdate: (id: number, newStock: number, note: string) => void;
}

function StockModal({ product, onClose, onUpdate }: StockModalProps) {
  const [qty, setQty] = useState(0);
  const [operation, setOperation] = useState<"add" | "remove" | "set">("add");
  const [note, setNote] = useState("");

  const newStock =
    operation === "add" ? product.estoque + qty :
    operation === "remove" ? Math.max(0, product.estoque - qty) :
    qty;

  const handleSave = () => {
    if (qty < 0) return;
    onUpdate(product.id, newStock, note);
    toast.success(`Stock de "${product.nome}" atualizado para ${newStock} unidades`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h3 className="text-gray-900">Atualizar Stock</h3>
            <p className="text-gray-500 text-xs mt-0.5">{product.nome} · SKU: {product.sku}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Current stock */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="text-xs text-gray-500">Stock Atual</p>
              <p className="text-gray-900 text-2xl">{product.estoque} un.</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Stock Mínimo</p>
              <p className="text-gray-600 text-lg">{product.estoqueMinimo} un.</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Novo Stock</p>
              <p className={`text-2xl ${newStock < product.estoqueMinimo ? "text-red-600" : "text-emerald-700"}`}>
                {newStock} un.
              </p>
            </div>
          </div>

          {/* Operation type */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Operação</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "add", label: "Adicionar" },
                { val: "remove", label: "Remover" },
                { val: "set", label: "Definir" },
              ].map((op) => (
                <button
                  key={op.val}
                  onClick={() => { setOperation(op.val as typeof operation); setQty(0); }}
                  className={`py-2 rounded-xl text-sm border transition-all ${
                    operation === op.val
                      ? "bg-emerald-700 text-white border-emerald-700"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity input with +/- */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              {operation === "add" ? "Quantidade a Adicionar" :
               operation === "remove" ? "Quantidade a Remover" :
               "Novo Valor de Stock"}
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(0, qty - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="0"
              />
              <button
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Quick amounts */}
            <div className="flex gap-2 mt-2">
              {[5, 10, 20, 50].map((n) => (
                <button
                  key={n}
                  onClick={() => setQty(n)}
                  className="flex-1 text-xs py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +{n}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Nota (opcional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Reposição de stock mensal, retorno de devolução..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
            />
          </div>

          {newStock < product.estoqueMinimo && newStock >= 0 && (
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                O novo stock ({newStock}) estará abaixo do mínimo recomendado ({product.estoqueMinimo}).
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

interface EditModalProps {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

function EditModal({ product, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState({ ...product });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-5 border-b border-gray-100 rounded-t-2xl">
          <h3 className="text-gray-900">Editar Produto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {[
            { label: "Nome do Produto", field: "nome", type: "text" },
            { label: "Preço (€)", field: "preco", type: "number" },
            { label: "Fornecedor", field: "fornecedor", type: "text" },
            { label: "SKU", field: "sku", type: "text" },
            { label: "Stock Mínimo", field: "estoqueMinimo", type: "number" },
          ].map(({ label, field, type }) => (
            <div key={field}>
              <label className="block text-sm text-gray-700 mb-1.5">{label}</label>
              <input
                type={type}
                value={(form as any)[field]}
                onChange={(e) => setForm({ ...form, [field]: type === "number" ? parseFloat(e.target.value) || 0 : e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
            >
              {["Smartphones", "Laptops", "Tablets", "Áudio", "Acessórios"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1.5">Estado</label>
            <select
              value={form.estado}
              onChange={(e) => setForm({ ...form, estado: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
            >
              {["Como Novo", "Excelente", "Bom", "Aceitável"].map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <input
              type="checkbox"
              id="ativo"
              checked={form.ativo}
              onChange={(e) => setForm({ ...form, ativo: e.target.checked })}
              className="w-4 h-4 accent-emerald-700"
            />
            <label htmlFor="ativo" className="text-sm text-gray-700">Produto ativo no catálogo</label>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
            Cancelar
          </button>
          <button
            onClick={() => { onSave(form); toast.success(`"${form.nome}" atualizado com sucesso`); onClose(); }}
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl transition-colors text-sm"
          >
            <Save className="w-4 h-4" />
            Guardar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Todos");
  const [stockModal, setStockModal] = useState<Product | null>(null);
  const [editModal, setEditModal] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<"nome" | "estoque" | "preco">("nome");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.categoria)))];

  const handleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortBy }) => (
    <span className="ml-1 inline-flex flex-col -mt-0.5">
      <ChevronUp className={`w-2.5 h-2.5 -mb-0.5 ${sortBy === col && sortDir === "asc" ? "text-emerald-700" : "text-gray-300"}`} />
      <ChevronDown className={`w-2.5 h-2.5 ${sortBy === col && sortDir === "desc" ? "text-emerald-700" : "text-gray-300"}`} />
    </span>
  );

  const filtered = products
    .filter((p) => {
      const matchSearch = p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.fornecedor.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "Todos" || p.categoria === filterCat;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortBy === "nome") return mult * a.nome.localeCompare(b.nome);
      if (sortBy === "estoque") return mult * (a.estoque - b.estoque);
      if (sortBy === "preco") return mult * (a.preco - b.preco);
      return 0;
    });

  const handleStockUpdate = (id: number, newStock: number, _note: string) => {
    setProducts((prev) =>
      prev.map((p) => p.id === id ? { ...p, estoque: newStock, ativo: newStock > 0 } : p)
    );
  };

  const handleEditSave = (updated: Product) => {
    setProducts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
  };

  const handleDelete = (id: number, nome: string) => {
    if (confirm(`Remover "${nome}" do catálogo?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success(`"${nome}" removido do catálogo`);
    }
  };

  const quickAdjust = (id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newStock = Math.max(0, p.estoque + delta);
        toast.success(`Stock de "${p.nome}": ${p.estoque} → ${newStock}`);
        return { ...p, estoque: newStock, ativo: newStock > 0 || p.ativo };
      })
    );
  };

  const lowStock = products.filter((p) => p.estoque < p.estoqueMinimo && p.estoque > 0).length;
  const outOfStock = products.filter((p) => p.estoque === 0).length;
  const totalValue = products.reduce((sum, p) => sum + p.preco * p.estoque, 0);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-2xl">Gestão de Produtos & Stock</h1>
            <p className="text-gray-500 text-sm mt-1">
              {products.length} produtos · {lowStock} com stock baixo · {outOfStock} esgotados
            </p>
          </div>
          <button
            onClick={() => toast.info("Formulário de novo produto em breve")}
            className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar Produto
          </button>
        </div>

        {/* Low stock alert */}
        {(lowStock > 0 || outOfStock > 0) && (
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-amber-800 text-sm">
              <strong>{lowStock} produto(s)</strong> com stock abaixo do mínimo e
              <strong> {outOfStock} produto(s)</strong> esgotados. Atualize o stock para evitar perdas de vendas.
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total de Produtos", value: products.length.toString(), color: "bg-emerald-50", iconColor: "text-emerald-700", icon: Package },
            { label: "Produtos Ativos", value: products.filter((p) => p.ativo).length.toString(), color: "bg-blue-50", iconColor: "text-blue-700", icon: Eye },
            { label: "Stock Baixo", value: lowStock.toString(), color: "bg-amber-50", iconColor: "text-amber-700", icon: AlertTriangle },
            { label: "Valor em Stock", value: `€${totalValue.toLocaleString("pt-PT")}`, color: "bg-violet-50", iconColor: "text-violet-700", icon: BarChart3 },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{stat.label}</p>
                    <p className="text-gray-900 text-xl">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por nome, fornecedor ou SKU..."
                className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex gap-1 overflow-x-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`px-3 py-1.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                      filterCat === cat
                        ? "bg-emerald-700 text-white"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th
                    className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort("nome")}
                  >
                    Produto <SortIcon col="nome" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Fornecedor</th>
                  <th
                    className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort("estoque")}
                  >
                    Stock <SortIcon col="estoque" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ajustar</th>
                  <th
                    className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                    onClick={() => handleSort("preco")}
                  >
                    Preço <SortIcon col="preco" />
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((product) => {
                  const isLow = product.estoque < product.estoqueMinimo && product.estoque > 0;
                  const isOut = product.estoque === 0;
                  return (
                    <tr key={product.id} className={`hover:bg-gray-50/60 transition-colors ${isOut ? "bg-red-50/30" : isLow ? "bg-amber-50/30" : ""}`}>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          {isOut && <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />}
                          {isLow && <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />}
                          {!isLow && !isOut && <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />}
                          <span className="text-gray-800 text-sm">{product.nome}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-400 text-xs font-mono">{product.sku}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-600 text-sm">{product.categoria}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs px-2 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                          {product.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-600 text-sm">{product.fornecedor}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div>
                          <span className={`text-sm ${isOut ? "text-red-600" : isLow ? "text-amber-600" : "text-gray-900"}`}>
                            {product.estoque} un.
                          </span>
                          <div className="w-16 bg-gray-100 rounded-full h-1 mt-1">
                            <div
                              className={`h-1 rounded-full ${isOut ? "bg-red-500" : isLow ? "bg-amber-400" : "bg-emerald-500"}`}
                              style={{ width: `${Math.min((product.estoque / (product.estoqueMinimo * 2)) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => quickAdjust(product.id, -1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setStockModal(product)}
                            className="px-2 h-7 rounded-lg border border-emerald-200 text-emerald-700 text-xs hover:bg-emerald-50 transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => quickAdjust(product.id, 1)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-gray-900 text-sm">€{product.preco.toLocaleString("pt-PT")}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        {product.ativo ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200">
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setEditModal(product)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar produto"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.nome)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remover produto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-gray-400">
                      Nenhum produto encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {stockModal && (
        <StockModal
          product={stockModal}
          onClose={() => setStockModal(null)}
          onUpdate={handleStockUpdate}
        />
      )}
      {editModal && (
        <EditModal
          product={editModal}
          onClose={() => setEditModal(null)}
          onSave={handleEditSave}
        />
      )}
    </>
  );
}
