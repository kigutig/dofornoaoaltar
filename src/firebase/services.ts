import { db, rtdb } from './config';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import {
  ref,
  push,
  get,
  child,
  set,
  update as updateRtdb,
  remove as removeRtdb,
} from 'firebase/database';

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  ingredients?: string[];
  createdAt?: number;
}

// Cart item type
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order type
export interface Order {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt?: Timestamp;
  deliveryDate?: string;
  notes?: string;
}

// ===== PRODUCTS FUNCTIONS =====
export const addProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  const productsRef = ref(rtdb, 'products');
  const newProductRef = await push(productsRef, {
    ...product,
    createdAt: Date.now(),
  });
  if (!newProductRef.key) {
    throw new Error('Unable to create product in Realtime Database');
  }
  return newProductRef.key;
};

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await get(ref(rtdb, 'products'));
  const data = snapshot.val();
  if (!data) return [];
  return Object.entries(data).map(([key, value]) => ({
    id: key,
    ...(value as Record<string, unknown>),
  })) as Product[];
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const snapshot = await get(child(ref(rtdb), `products/${id}`));
  if (!snapshot.exists()) return null;
  return { id, ...(snapshot.val() as Record<string, unknown>) } as Product;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  const allProducts = await getProducts();
  return allProducts.filter((product) => product.category === category);
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  const cleanProduct = Object.entries(product).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  if (Object.keys(cleanProduct).length > 0) {
    await updateRtdb(ref(rtdb, `products/${id}`), cleanProduct);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  await removeRtdb(ref(rtdb, `products/${id}`));
};

export const getProductsSeeded = async (): Promise<boolean> => {
  const snapshot = await get(ref(rtdb, 'productsSeeded'));
  return snapshot.exists() ? Boolean(snapshot.val()) : false;
};

export const setProductsSeeded = async (): Promise<void> => {
  await set(ref(rtdb, 'productsSeeded'), true);
};

// ===== ORDERS FUNCTIONS =====
export const createOrder = async (order: Order): Promise<string> => {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...order,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getOrders = async (): Promise<Order[]> => {
  const querySnapshot = await getDocs(collection(db, 'orders'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  const docRef = doc(db, 'orders', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Order;
  }
  return null;
};

export const getOrdersByCustomer = async (email: string): Promise<Order[]> => {
  const q = query(collection(db, 'orders'), where('customerEmail', '==', email));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
};

export const updateOrder = async (id: string, order: Partial<Order>): Promise<void> => {
  const docRef = doc(db, 'orders', id);
  await updateDoc(docRef, order);
};

export const deleteOrder = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'orders', id));
};

// ===== CART FUNCTIONS =====
export const saveCart = async (userId: string, items: CartItem[]): Promise<void> => {
  const cartRef = doc(db, 'carts', userId);
  await setDoc(
    cartRef,
    {
      userId,
      items,
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
};

export const getCart = async (userId: string): Promise<CartItem[]> => {
  const docRef = doc(db, 'carts', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().items || [];
  }
  return [];
};

export const clearCart = async (userId: string): Promise<void> => {
  const cartRef = doc(db, 'carts', userId);
  await setDoc(
    cartRef,
    { items: [] },
    { merge: true }
  );
};

export const saveFavorites = async (userId: string, favorites: Product[]): Promise<void> => {
  const favoritesRef = doc(db, 'favorites', userId);
  await setDoc(
    favoritesRef,
    {
      userId,
      favorites,
      updatedAt: Timestamp.now(),
    },
    { merge: true }
  );
};

export const getFavorites = async (userId: string): Promise<Product[]> => {
  const docRef = doc(db, 'favorites', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().favorites || [];
  }
  return [];
};

export const clearFavorites = async (userId: string): Promise<void> => {
  const favoritesRef = doc(db, 'favorites', userId);
  await setDoc(
    favoritesRef,
    { favorites: [] },
    { merge: true }
  );
};

// ===== SITE SETTINGS FUNCTIONS =====
export interface SiteSettings {
  siteName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  businessHours: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    whatsapp?: string;
  };
}

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  const docRef = doc(db, 'settings', 'site');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as SiteSettings;
  }
  return null;
};

export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<void> => {
  const docRef = doc(db, 'settings', 'site');
  await updateDoc(docRef, settings).catch(() => {
    // If document doesn't exist, create it
    return addDoc(collection(db, 'settings'), {
      id: 'site',
      ...settings,
    });
  });
};

// ===== SALES ANALYTICS FUNCTIONS =====
export interface SalesChartData {
  day: string;
  vendas: number;
  meta: number;
}

export const getSalesDataLastSevenDays = async (): Promise<SalesChartData[]> => {
  try {
    const orders = await getOrders();
    
    // Get dates for last 7 days
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const today = new Date();
    const salesByDay: Record<string, number> = {};
    
    // Initialize all days with 0
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      salesByDay[dateStr] = 0;
    }

    // Sum sales by day from orders
    orders.forEach((order) => {
      if (order.createdAt) {
        const orderDate = new Date(order.createdAt.toDate()).toISOString().split('T')[0];
        if (salesByDay.hasOwnProperty(orderDate)) {
          salesByDay[orderDate] += order.totalPrice || 0;
        }
      }
    });

    // Calculate total and average for meta
    const totalSales = Object.values(salesByDay).reduce((sum, val) => sum + val, 0);
    const meta = Math.ceil(totalSales / 7) || 240;

    // Format data for chart
    const chartData: SalesChartData[] = days.map((day, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() - (6 - index));
      const dateStr = date.toISOString().split('T')[0];
      return {
        day,
        vendas: Math.round(salesByDay[dateStr]),
        meta,
      };
    });

    return chartData;
  } catch (error) {
    console.error('Erro ao buscar dados de vendas:', error);
    // Return default data if error
    const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    return days.map((day) => ({ day, vendas: 0, meta: 240 }));
  }
};
