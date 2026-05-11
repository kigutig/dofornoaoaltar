import React from 'react';
import { motion } from 'framer-motion';
import { PremiumSection, PremiumHeading } from './PremiumComponents';
import PremiumProductCard from './PremiumProductCard';
import { Product } from '../../context/ProductContext';

interface ProductShowcaseProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ products, onAddToCart }) => {
  return (
    <PremiumSection 
      id="produtos"
      className="bg-gradient-to-b from-white to-amber-50"
    >
      {/* Header com animação */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <PremiumHeading level="h2">
          Nossas Delícias
        </PremiumHeading>
        <p className="mt-6 text-lg text-amber-900/70 max-w-2xl mx-auto">
          Brownies artesanais feitos com amor e ingredientes premium.
          <br />
          <span className="font-semibold">Cada compra ajuda a realizar um sonho.</span>
        </p>
      </motion.div>

      {/* Promoção em destaque */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12 p-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-2xl text-white text-center shadow-xl"
      >
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
          🎁 Super Promoção!
        </h3>
        <p className="text-lg mb-2">
          Compre <span className="font-bold">2 por R$ 22,00</span> ou{' '}
          <span className="font-bold">3 por R$ 30,00</span>!
        </p>
        <p className="text-sm italic opacity-90">
          *Válido para qualquer combinação de nossos brownies recheados.
        </p>
      </motion.div>

      {/* Grid de produtos */}
      <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <PremiumProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            index={index}
          />
        ))}
      </div>

      {/* Garantia Premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 pt-12 border-t border-amber-200 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-amber-900/50 mb-4">
          Garantia de Qualidade
        </p>
        <p className="text-lg text-amber-900 italic max-w-2xl mx-auto">
          "Se você não amar nossos brownies, devolvemos seu dinheiro.
          <br />
          Sem perguntas. Porque sabemos que cada mordida é uma experiência."
        </p>
      </motion.div>
    </PremiumSection>
  );
};

export default ProductShowcase;
