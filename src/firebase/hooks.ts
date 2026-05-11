import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { saveCart, getCart, CartItem, saveFavorites, getFavorites } from './services';
import { useFirebaseAuth } from './auth';

export const useFirebaseCart = () => {
  const { cart, addToCart } = useCart();
  const { user, loading } = useFirebaseAuth();
  const userId = user?.uid;

  useEffect(() => {
    if (loading || !userId) return;

    const loadCartFromFirebase = async () => {
      try {
        const savedCart = await getCart(userId);

        if (savedCart && savedCart.length > 0 && cart.length === 0) {
          savedCart.forEach((item) => {
            addToCart({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              description: item.name,
            } as any);
            if (item.quantity > 1) {
              for (let i = 1; i < item.quantity; i += 1) {
                addToCart({
                  id: item.productId,
                  name: item.name,
                  price: item.price,
                  image: item.image,
                  description: item.name,
                } as any);
              }
            }
          });
        }
      } catch (error) {
        console.error('Error loading cart from Firebase:', error);
      }
    };

    loadCartFromFirebase();
  }, [loading, userId]);

  useEffect(() => {
    if (loading || !userId) return;

    const saveCartToFirebase = async () => {
      try {
        const cartItems: CartItem[] = cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));
        await saveCart(userId, cartItems);
      } catch (error) {
        console.error('Error saving cart to Firebase:', error);
      }
    };

    const timer = setTimeout(saveCartToFirebase, 1000);
    return () => clearTimeout(timer);
  }, [cart, loading, userId]);

  return { cart, addToCart };
};

export const useFirebaseFavorites = () => {
  const { favorites, addToFavorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { user, loading } = useFirebaseAuth();
  const userId = user?.uid;

  useEffect(() => {
    if (loading || !userId) return;

    const loadFavoritesFromFirebase = async () => {
      try {
        const savedFavorites = await getFavorites(userId);

        if (savedFavorites && savedFavorites.length > 0 && favorites.length === 0) {
          savedFavorites.forEach((favorite) => addToFavorites(favorite));
        }
      } catch (error) {
        console.error('Error loading favorites from Firebase:', error);
      }
    };

    loadFavoritesFromFirebase();
  }, [loading, userId]);

  useEffect(() => {
    if (loading || !userId) return;

    const saveFavoritesToFirebase = async () => {
      try {
        await saveFavorites(userId, favorites);
      } catch (error) {
        console.error('Error saving favorites to Firebase:', error);
      }
    };

    const timer = setTimeout(saveFavoritesToFirebase, 1000);
    return () => clearTimeout(timer);
  }, [favorites, loading, userId]);

  return { favorites, addToFavorites, removeFromFavorites, clearFavorites };
};
