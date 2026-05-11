import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { PremiumButton } from './PremiumComponents';

const HeroSection: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="h-screen flex items-center justify-center overflow-hidden bg-black -mt-14 md:-mt-16 pt-14 md:pt-16">
      {/* Background Image com parallax */}
      <motion.div
        className="absolute -top-14 md:-top-16 inset-x-0 h-[calc(100%+3.5rem)] md:h-[calc(100%+4rem)]"
        style={{
          y: mousePosition.y * 0.05,
        }}
      >
        <img
          src="/fotocasamento.webp"
          alt="Do Forno ao Altar - Brownies Premium"
          className="w-full h-full object-cover object-center"
        />
        {/* Overlay gradient cinematográfico */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </motion.div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Conteúdo */}
      <motion.div
        className="relative z-10 text-center text-white px-4 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pequeno label elegante */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
          <span className="text-sm font-light tracking-widest uppercase text-pink-300">
            Artesanal Premium
          </span>
          <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
        </motion.div>

        {/* Headline principal cinematográfica */}
        <motion.h1
          variants={itemVariants}
          className="font-serif text-5xl md:text-7xl font-light mb-6 leading-tight"
        >
          Cada brownie
          <br />
          <span className="font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 bg-clip-text text-transparent">
            nos aproxima
          </span>
          <br />
          do altar
        </motion.h1>

        {/* Subtítulo elegante */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl font-light mb-12 text-white/80 italic"
        >
          Transformando açúcar em sonhos. Cada pedido ajuda a realizar um deles.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <PremiumButton
            variant="primary"
            size="md"
            href="https://wa.me/5511986959635"
            className="group"
          >
            <span>Fazer Pedido</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </PremiumButton>

          {/* Scroll indicator between buttons */}
          <motion.div
            className="hidden sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <motion.div
                className="w-1 h-3 bg-white/50 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <PremiumButton
            variant="secondary"
            size="md"
            href="#historia"
          >
            Nossa História
          </PremiumButton>
        </motion.div>

        {/* Scroll indicator for mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 sm:hidden"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
