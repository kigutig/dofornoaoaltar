import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Product, useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

// Premium Components
import HeroSection from '../components/Premium/HeroSection';
import StorytellingSection from '../components/Premium/StorytellingSection';
import ProductShowcase from '../components/Premium/ProductShowcase';
import SocialProofSection from '../components/Premium/SocialProofSection';
import FinalCTASection from '../components/Premium/FinalCTASection';

const Home: React.FC = () => {
  const { hash } = useLocation();
  const { products } = useProducts();
  const { addToCart } = useCart();

  // Scroll para seção quando navegar via hash
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [hash]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section Cinematográfica */}
      <HeroSection />

      {/* Storytelling da Marca */}
      <StorytellingSection />

      {/* Vitrine de Produtos */}
      <ProductShowcase 
        products={products} 
        onAddToCart={handleAddToCart}
      />

      {/* Social Proof */}
      <SocialProofSection />

      {/* CTA Final */}
      <FinalCTASection />
    </div>
  );
};

export default Home;
