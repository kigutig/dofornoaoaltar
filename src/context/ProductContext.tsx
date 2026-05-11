import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getProducts as fetchProductsFromDb,
  addProduct as addProductToDb,
  updateProduct as updateProductInDb,
  deleteProduct as deleteProductFromDb,
  getProductsSeeded,
  setProductsSeeded,
} from '../firebase/services';
import { useFirebaseAuth } from '../firebase/auth';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  ingredients?: string[];
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Promise<string>;
  updateProduct: (product: Product) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
}

const initialProducts: Omit<Product, 'id'>[] = [
  {
    name: 'Brownie c/ Maracujá',
    price: 12.0,
    image: '/browniemaracuja.jpeg',
    description: 'Brownie chocolatudo com um toque cítrico e cremoso de maracujá.',
    category: 'Brownies',
  },
  {
    name: 'Brownie c/ Brigadeiro',
    price: 12.0,
    image: '/browniebrigadeiro.jpeg',
    description: 'A combinação perfeita do nosso brownie com o brigadeiro gourmet mais amado do Brasil.',
    category: 'Brownies',
  },
  {
    name: 'Brownie c/ Doce de Leite',
    price: 12.0,
    image: '/browniedocedeleite.jpeg',
    description: 'Generosamente recheado com o melhor doce de leite caseiro.',
    category: 'Brownies',
  },
  {
    name: 'Brownie c/ Coco',
    price: 12.9,
    image: '/browniedecoco.jpeg',
    description: 'Brownie úmido com um toque tropical de coco ralado e leite de coco.',
    category: 'Brownies',
  },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, loading: authLoading } = useFirebaseAuth();
  const userId = user?.uid;

  useEffect(() => {
    if (authLoading) return;

    const loadProducts = async () => {
      try {
        const remoteProducts = await fetchProductsFromDb();

        if (remoteProducts.length === 0) {
          const isSeeded = await getProductsSeeded();

          if (!isSeeded) {
            const seededProducts = await Promise.all(
              initialProducts.map(async (product) => {
                const id = await addProductToDb(product);
                return { ...product, id };
              })
            );
            await setProductsSeeded();
            setProducts(seededProducts);
          } else {
            setProducts([]);
          }
        } else {
          setProducts(
            remoteProducts.map((product) => ({
              ...product,
              category: product.category || 'Brownies',
              id: product.id,
            }))
          );
        }
      } catch (error) {
        console.error('Erro ao carregar produtos do Firebase:', error);
        setProducts([]);
      }
    };

    loadProducts();
  }, [authLoading, userId]);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    if (!userId) {
      const id = `local-${Date.now()}`;
      const newProduct = { ...product, id };
      setProducts((prev) => [...prev, newProduct]);
      return id;
    }

    const id = await addProductToDb(product);
    const newProduct = { ...product, id };
    setProducts((prev) => [...prev, newProduct]);
    return id;
  };

  const updateProduct = async (product: Product) => {
    if (userId) {
      const payload: Partial<Product> = {
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category || 'Brownies',
      };

      if (product.ingredients !== undefined) {
        payload.ingredients = product.ingredients;
      }

      await updateProductInDb(product.id, payload);
    }
    setProducts((prev) => prev.map((item) => (item.id === product.id ? product : item)));
  };

  const removeProduct = async (productId: string) => {
    if (userId) {
      await deleteProductFromDb(productId);
    }
    setProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
