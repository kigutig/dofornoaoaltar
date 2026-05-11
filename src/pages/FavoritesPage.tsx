import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Home as HomeIcon } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const FavoritesPage: React.FC = () => {
  const { favorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Nenhum favorito ainda</h1>
          <p className="text-gray-600 mb-8">Comece a adicionar produtos aos seus favoritos!</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            <HomeIcon className="h-5 w-5" />
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Heart className="h-10 w-10 fill-pink-600 text-pink-600" />
              Meus Favoritos
            </h1>
            <p className="text-gray-600 mt-2">{favorites.length} produto(s) marcado(s) como favorito</p>
          </div>
          <button
            onClick={clearFavorites}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Limpar favoritos
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center py-8 border-t border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <HomeIcon className="h-5 w-5" />
            Continuar Comprando
          </Link>
          <Link
            to="/carrinho"
            className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            Ver Carrinho
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
