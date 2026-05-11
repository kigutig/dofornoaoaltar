import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './ProductContext';

interface CartItem extends Product {
  quantity: number;
}

const getInitialCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('cart');
  if (!stored) return [];
  try {
    return JSON.parse(stored) as CartItem[];
  } catch {
    return [];
  }
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartSubtotal: number;
  cartDiscount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'cart') {
        if (!event.newValue) {
          setCart([]);
          return;
        }
        try {
          setCart(JSON.parse(event.newValue));
        } catch {
          setCart([]);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // Calculate Subtotal (Standard Prices)
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Calculate Promotional Price
  const calculateTotal = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    // Sort items by price descending to apply promotion to the most expensive ones first
    const sortedItems: Product[] = [];
    cart.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        sortedItems.push({ ...item });
      }
    });
    sortedItems.sort((a, b) => b.price - a.price);

    let total = 0;
    let remaining = totalItems;
    let index = 0;

    // Apply groups of 3 (R$ 30,00)
    while (remaining >= 3) {
      total += 30;
      remaining -= 3;
      index += 3;
    }

    // Apply groups of 2 (R$ 22,00)
    while (remaining >= 2) {
      total += 22;
      remaining -= 2;
      index += 2;
    }

    // Add remaining items at their normal price
    while (remaining > 0) {
      total += sortedItems[index].price;
      remaining -= 1;
      index += 1;
    }

    return total;
  };

  const cartTotal = calculateTotal();
  const cartDiscount = cartSubtotal - cartTotal;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartSubtotal, cartDiscount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
