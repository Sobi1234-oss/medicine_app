// store/useCartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        const newItem = { ...item, quantity: 1 };
        const updatedItems = [...state.items, newItem];
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    });
  },
  
  removeFromCart: (id) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  },
  
  updateQuantity: (id, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    });
  },
  
  clearCart: () => {
    set({ items: [], total: 0 });
  },
}));

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};