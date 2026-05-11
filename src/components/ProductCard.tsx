import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../context/ProductContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-rose-50 flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Favorite button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-md"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              favorite ? 'fill-pink-600 text-pink-600' : 'text-gray-400 hover:text-pink-600'
            }`}
          />
        </button>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-pink-600">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-colors shadow-sm active:scale-95 flex items-center gap-2 px-4"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
