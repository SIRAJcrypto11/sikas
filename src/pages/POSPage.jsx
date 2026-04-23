import React, { useState } from 'react'
import { Search, ShoppingCart, User, LogOut, Package, Filter, Plus, Minus, CreditCard, Lock, Wallet } from 'lucide-react'
import { cn, formatRupiah } from '../lib/utils'
import { usePOSStore } from '../store/posStore'

const categories = [
  { id: 'all', name: 'Semua', icon: Package },
  { id: 'food', name: 'Makanan', icon: Package },
  { id: 'drink', name: 'Minuman', icon: Package },
  { id: 'snack', name: 'Snack', icon: Package },
]

const products = [
  { id: 1, name: 'Nasi Goreng Spesial', price: 25000, category: 'food', image: 'https://placehold.co/200x200/teal/white?text=Nasi+Goreng' },
  { id: 2, name: 'Es Teh Manis', price: 5000, category: 'drink', image: 'https://placehold.co/200x200/teal/white?text=Es+Teh' },
  { id: 3, name: 'Ayam Bakar Madu', price: 35000, category: 'food', image: 'https://placehold.co/200x200/teal/white?text=Ayam+Bakar' },
  { id: 4, name: 'Kopi Susu Gula Aren', price: 18000, category: 'drink', image: 'https://placehold.co/200x200/teal/white?text=Kopi+Susu' },
  { id: 5, name: 'Kentang Goreng', price: 15000, category: 'snack', image: 'https://placehold.co/200x200/teal/white?text=Kentang' },
]

export default function POSPage() {
  const { 
    cart, 
    activeCategory, 
    searchQuery, 
    session,
    setCategory, 
    setSearchQuery, 
    addToCart, 
    updateQty,
    getTotals,
    openSession,
    closeSession
  } = usePOSStore()

  const [isOpeningModal, setIsOpeningModal] = useState(!session)
  const [openingAmount, setOpeningAmount] = useState(0)

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const { subtotal, tax, total } = getTotals()

  const handleOpenSession = (e) => {
    e.preventDefault()
    openSession(openingAmount)
    setIsOpeningModal(false)
  }

  // Session Opening Modal
  if (!session || isOpeningModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-sikas-dark/80 backdrop-blur-sm p-6">
        <div className="bg-white rounded-[32px] w-full max-w-md p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-sikas-primary/10 rounded-3xl flex items-center justify-center text-sikas-primary mb-8 mx-auto">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-black text-center mb-2">Buka Kasir</h2>
          <p className="text-slate-500 text-center mb-8">Masukkan modal awal untuk memulai shift hari ini.</p>
          
          <form onSubmit={handleOpenSession} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Modal Awal (Rp)</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input 
                  type="number" 
                  autoFocus
                  required
                  className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-2xl text-2xl font-black outline-none focus:border-sikas-primary transition-all"
                  value={openingAmount}
                  onChange={(e) => setOpeningAmount(Number(e.target.value))}
                />
              </div>
            </div>
            
            <button type="submit" className="sikas-button-primary w-full py-5 text-xl font-black shadow-glow">
              MULAI SHIFT SEKARANG
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-sikas-surface overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-20 bg-sikas-secondary flex flex-col items-center py-6 gap-8">
        <div className="w-12 h-12 bg-sikas-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-glow">
          S
        </div>
        <nav className="flex flex-col gap-6">
          <button className="p-3 text-white/60 hover:text-white transition-colors bg-white/10 rounded-xl">
            <ShoppingCart size={24} />
          </button>
          <button className="p-3 text-white/60 hover:text-white transition-colors">
            <Package size={24} />
          </button>
          <button className="p-3 text-white/60 hover:text-white transition-colors">
            <User size={24} />
          </button>
        </nav>
        <button className="mt-auto p-3 text-white/40 hover:text-danger transition-colors">
          <LogOut size={24} />
        </button>
      </aside>

      {/* Main POS Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold">SIKAS Kasir</h1>
            <p className="text-sm text-slate-500">Outlet Utama • Kasir: John Doe</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari produk atau scan..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl w-64 focus:ring-2 focus:ring-sikas-primary/20 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => closeSession()}
              className="bg-sikas-danger/10 text-sikas-danger px-4 py-2 rounded-xl font-semibold hover:bg-sikas-danger hover:text-white transition-all"
            >
              Tutup Kasir
            </button>
          </div>
        </header>

        {/* Product Grid & Categories */}
        <div className="flex-1 overflow-hidden flex flex-col p-8 gap-6">
          {/* Categories */}
          <div className="flex gap-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-6 py-3 rounded-2xl flex items-center gap-2 font-semibold transition-all",
                  activeCategory === cat.id 
                    ? "bg-sikas-primary text-white shadow-glow" 
                    : "bg-white text-slate-600 hover:bg-slate-50"
                )}
              >
                <cat.icon size={18} />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="pos-grid-item flex flex-col gap-3 group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-slate-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-slate-800 line-clamp-1">{product.name}</h3>
                    <p className="text-sikas-primary font-bold">{formatRupiah(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Cart Sidebar */}
      <aside className="w-[400px] bg-white border-l border-slate-200 flex flex-col shadow-2xl z-10">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="text-sikas-primary" /> Keranjang
          </h2>
          <div className="flex items-center gap-2">
            <span className="bg-sikas-primary/10 text-sikas-primary px-3 py-1 rounded-full text-sm font-bold">
              {cart.length} Item
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center opacity-40">
              <ShoppingCart size={64} strokeWidth={1} />
              <p className="mt-4 font-semibold">Keranjang Kosong</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 group border border-transparent hover:border-sikas-primary/20 transition-all">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                  <p className="text-sm text-slate-500">{formatRupiah(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-sikas-primary transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-6 text-center">{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-sikas-primary transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="p-8 bg-white border-t border-slate-100 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Pajak (10%)</span>
              <span>{formatRupiah(tax)}</span>
            </div>
            <div className="flex justify-between text-2xl font-black text-slate-900 mt-2">
              <span>TOTAL</span>
              <span className="text-sikas-primary">{formatRupiah(total)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <button className="py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Filter size={18} /> Diskon
            </button>
            <button className="py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <User size={18} /> Member
            </button>
          </div>

          <button 
            disabled={cart.length === 0}
            className={cn(
              "w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all mt-2 shadow-glow",
              cart.length === 0 
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none" 
                : "bg-sikas-primary text-white hover:bg-sikas-primary-light active:scale-[0.98]"
            )}
          >
            <CreditCard size={24} /> BAYAR SEKARANG
          </button>
        </div>
      </aside>
    </div>
  )
}
