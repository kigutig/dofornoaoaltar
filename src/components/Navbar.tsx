import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-white/90 to-rose-50/90 backdrop-blur-md sticky top-0 z-50 border-b border-rose-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-18 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className="h-7 w-7 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
            <span className="font-serif text-xl font-bold text-rose-800 group-hover:text-rose-600 transition-colors">Do Forno ao Altar Confeitaria</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">Início</Link>
            <Link to="/historia" className="text-gray-600 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">Nossa História</Link>
            <Link to="/#produtos" className="text-gray-600 hover:text-rose-600 transition-all duration-300 hover:scale-105 font-medium">Brownies</Link>
            <Link to="/carrinho" className="relative p-2 text-gray-600 hover:text-rose-600 transition-all duration-300 hover:scale-110">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/carrinho" className="relative p-2 text-gray-600 hover:text-rose-600 transition">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-rose-600 transition p-1">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-rose-50">Início</Link>
            <Link to="/historia" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-rose-50">Nossa História</Link>
            <Link to="/#produtos" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-rose-50">Brownies</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
