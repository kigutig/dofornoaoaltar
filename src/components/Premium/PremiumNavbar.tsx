import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const PremiumNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu ao navegar
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Produtos', href: '/#produtos' },
    { label: 'História', href: '/#historia' },
    { label: 'Carrinho', href: '/carrinho' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href.split('#')[0];
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-black/80 backdrop-blur-sm'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-14">
          {/* Logo - Left */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className={`font-serif font-bold text-base hidden sm:inline transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              } group-hover:text-pink-600`}>
                Do Forno ao Altar
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {navLinks.filter(link => link.href !== '/carrinho').map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-900 hover:text-pink-600'
                    : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-600 to-pink-400`}
                    layoutId="navbar-indicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Cart - Right */}
          <div className="flex items-center gap-4">
            {/* Favorites Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/favoritos"
                className="relative"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                />
                {favorites.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {favorites.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/carrinho"
                className="relative"
              >
                <ShoppingCart
                  className={`w-5 h-5 transition-colors ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}
                />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden border-t ${
                isScrolled ? 'border-gray-200 bg-white/50' : 'border-white/10'
              }`}
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`block py-2 font-medium transition-colors ${
                      isScrolled
                        ? 'text-gray-900 hover:text-pink-600'
                        : 'text-white/90 hover:text-white'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default PremiumNavbar;
