import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ProductProvider } from './context/ProductContext';
import { useFirebaseCart, useFirebaseFavorites } from './firebase/hooks';
import PremiumNavbar from './components/Premium/PremiumNavbar';
import PremiumFooter from './components/Premium/PremiumFooter';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import History from './pages/History';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin';

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900 ${isAdminRoute ? 'bg-slate-950 text-slate-100' : 'bg-white'}`}>
      <ScrollToTop />
      {!isAdminRoute && <PremiumNavbar />}
      <main className={`flex-grow ${isAdminRoute ? 'min-h-screen' : 'pt-14 md:pt-16'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<History />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <PremiumFooter />}
    </div>
  );
};

const FirebaseSync: React.FC = () => {
  useFirebaseCart();
  useFirebaseFavorites();
  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <ProductProvider>
          <FirebaseSync />
          <Router>
            <AppRoutes />
          </Router>
        </ProductProvider>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default App;
