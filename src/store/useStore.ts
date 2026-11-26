import { create } from 'zustand';

interface CartItem {
  productId: number;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  imageUrl: string | null;
  quantity: number;
}

interface WishlistItem {
  productId: number;
  slug: string;
  name: string;
}

interface StoreState {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;

  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (productId: number) => boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  cartCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cartItems: [],
  wishlistItems: [],
  cartOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,

  addToCart: (item) =>
    set((s) => {
      const existing = s.cartItems.find(c => c.productId === item.productId);
      if (existing) {
        return { cartItems: s.cartItems.map(c => c.productId === item.productId ? { ...c, quantity: c.quantity + 1 } : c) };
      }
      return { cartItems: [...s.cartItems, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set(s => ({ cartItems: s.cartItems.filter(c => c.productId !== productId) })),

  updateQty: (productId, qty) =>
    set(s => ({
      cartItems: qty <= 0
        ? s.cartItems.filter(c => c.productId !== productId)
        : s.cartItems.map(c => c.productId === productId ? { ...c, quantity: qty } : c),
    })),

  toggleWishlist: (item) =>
    set(s => {
      const exists = s.wishlistItems.some(w => w.productId === item.productId);
      return { wishlistItems: exists ? s.wishlistItems.filter(w => w.productId !== item.productId) : [...s.wishlistItems, item] };
    }),

  isWishlisted: (productId) => get().wishlistItems.some(w => w.productId === productId),

  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  cartCount: () => get().cartItems.reduce((acc, c) => acc + c.quantity, 0),
}));
