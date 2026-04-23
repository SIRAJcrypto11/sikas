import { create } from 'zustand'

export const usePOSStore = create((set, get) => ({
  cart: [],
  activeCategory: 'all',
  searchQuery: '',
  session: null, // { id, openedAt, openingAmount }
  
  setCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  addToCart: (product) => {
    const { cart } = get()
    const existing = cart.find(item => item.id === product.id)
    
    if (existing) {
      set({
        cart: cart.map(item => 
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      })
    } else {
      set({ cart: [...cart, { ...product, qty: 1 }] })
    }
  },
  
  removeFromCart: (productId) => {
    const { cart } = get()
    set({ cart: cart.filter(item => item.id !== productId) })
  },
  
  updateQty: (productId, delta) => {
    const { cart } = get()
    set({
      cart: cart.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.qty + delta)
          return { ...item, qty: newQty }
        }
        return item
      })
    })
  },
  
  clearCart: () => set({ cart: [] }),

  openSession: (openingAmount) => {
    set({ 
      session: { 
        id: crypto.randomUUID(), 
        openedAt: new Date().toISOString(), 
        openingAmount 
      } 
    })
  },

  closeSession: (closingAmount) => {
    set({ session: null })
    // In real app, this would save to DB
  },
  
  getTotals: () => {
    const { cart } = get()
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax
    return { subtotal, tax, total }
  }
}))
