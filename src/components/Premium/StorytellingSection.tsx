import React from 'react';
import { motion } from 'framer-motion';
import { PremiumSection, PremiumHeading, ElegantDivider } from './PremiumComponents';
import { Heart, Cake, Sparkles } from 'lucide-react';

const StorytellingSection: React.FC = () => {
  const storyPoints = [
    {
      icon: Heart,
      title: 'Um Sonho Especial',
      description:
        'Nascida do amor e da vontade de realizar um sonho. Do Forno ao Altar é a história de um casal que decidiu transformar sua paixão em brownies incríveis.',
    },
    {
      icon: Cake,
      title: 'Artesanal e Autêntico',
      description:
        'Cada brownie é preparado com ingredientes premium e muito carinho. Sem conservantes, sem pressa. Apenas qualidade artesanal que você pode sentir no primeiro gosto.',
    },
    {
      icon: Sparkles,
      title: 'Seu Pedido Faz Diferença',
      description:
        'Ao comprar um de nossos brownies, você não apenas desfruta de algo delicioso. Você faz parte de uma história de amor e ajuda a realizar um sonho.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <PremiumSection 
      id="historia"
      className="bg-gradient-to-b from-white via-amber-50/30 to-white"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <PremiumHeading level="h2">
          A História que nos Move
        </PremiumHeading>
        <p className="mt-6 text-lg text-amber-900/70 max-w-2xl mx-auto italic">
          "Transformamos a paixão em confeitaria. Cada brownie é um passo mais próximo do altar."
        </p>
      </motion.div>

      {/* Story Points */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {storyPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-100/30 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-amber-900 mb-4">
                {point.title}
              </h3>
              <p className="text-amber-900/70 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      <ElegantDivider />

      {/* Emotional Message */}
      <motion.div
        className="bg-gradient-to-r from-amber-50 to-pink-50 rounded-2xl p-12 border border-amber-200/30 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-xl md:text-2xl font-serif text-amber-900 mb-4">
          "Somos mais que uma confeitaria. Somos uma história de amor em cada mordida."
        </p>
        <p className="text-amber-900/70">
          Quando você escolhe Do Forno ao Altar, você não está apenas comprando um brownie.
          <br />
          Você está sendo parte de um sonho. E isso faz toda a diferença.
        </p>
      </motion.div>
    </PremiumSection>
  );
};

export default StorytellingSection;
