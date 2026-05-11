import React from 'react';
import { motion } from 'framer-motion';
import { PremiumSection, PremiumButton } from './PremiumComponents';
import { Heart, Sparkles } from 'lucide-react';

const FinalCTASection: React.FC = () => {
  return (
    <PremiumSection
      className="relative overflow-hidden py-20 md:py-28"
      fullWidth
    >
      {/* Background com gradiente cinematográfico */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black" />

      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        {/* Icon decorativo */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center mb-8"
        >
          <Heart className="w-12 h-12 fill-pink-300 text-pink-300" />
        </motion.div>

        {/* Headline emocionante */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight"
        >
          Não é só um brownie.
          <br />
          <span className="text-pink-300">É um ato de amor.</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-white/80 mb-12 italic max-w-2xl mx-auto"
        >
          Cada pedido você faz parte de uma história de amor e ajuda a realizar um sonho que vai mudar vidas.
        </motion.p>

        {/* Bullets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-center gap-8 mb-12 text-white/90"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-pink-300" />
            <span>Ingredientes Premium</span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-pink-300" />
            <span>Feito com Amor</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-pink-300" />
            <span>Impacto Real</span>
          </div>
        </motion.div>

        {/* CTA Primary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <PremiumButton
            variant="primary"
            size="lg"
            href="https://wa.me/5511986959635"
            className="!bg-white !text-gray-900 hover:!bg-gray-100 shadow-2xl"
          >
            <span>Fazer meu Pedido Agora</span>
            <Heart className="w-5 h-5" />
          </PremiumButton>
        </motion.div>

        {/* Secondary message */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-white/70 text-sm"
        >
          Entrega segura em Taboão da Serra. Garantia 100% de satisfação.
          <br />
          <span className="text-pink-300 font-semibold">Ajude-nos a alcançar o altar. 💕</span>
        </motion.p>
      </div>
    </PremiumSection>
  );
};

export default FinalCTASection;
