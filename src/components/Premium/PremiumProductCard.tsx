import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../context/ProductContext';
import { useFavorites } from '../../context/FavoritesContext';

interface PremiumProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  index?: number;
}

const PremiumProductCard: React.FC<PremiumProductCardProps> = ({ 
  product, 
  onAddToCart,
  index = 0 
}) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(product.id);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group h-full"
    >
      <div className=" bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-pink-100/30">
        {/* Image Container com overlay */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-100 transition-transform duration-500"
            whileHover={{ scale: 1.1 }}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (favorite) {
                removeFromFavorites(product.id);
              } else {
                addToFavorites(product);
              }
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            type="button"
          >
            <Heart
              className={`w-5 h-5 transition-all ${
                favorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-white'
              }`}
            />
          </motion.button>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-white text-xs ml-1 font-semibold">4.9</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Product Info */}
          <div className="flex-grow">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h3>

            <div className="w-12 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mb-4" />

            <p className="text-amber-900/70 text-sm leading-relaxed mb-4">
              {product.description}
            </p>
          </div>

          {/* Footer with Price and Button */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-100 gap-4">
            <div className="flex-1">
              <p className="text-xs text-amber-900/50 uppercase tracking-widest">
                Valor unitário
              </p>
              <p className="text-2xl font-bold text-amber-900">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 group/btn flex items-center gap-2 font-semibold text-base whitespace-nowrap"
            >
              <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              <span>Adicionar</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumProductCard;
