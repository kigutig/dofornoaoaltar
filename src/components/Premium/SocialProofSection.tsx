import React from 'react';
import { motion } from 'framer-motion';
import { PremiumSection, PremiumHeading } from './PremiumComponents';
import { Star, Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

const SocialProofSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Maria Silva',
      role: 'Cliente desde 2024',
      content:
        'Melhor brownie que já comi. Muito mais que um doce, é um ato de amor. Pedi para meu casamento e foi sucesso!',
      rating: 5,
      image: '👰',
    },
    {
      name: 'João Santos',
      role: 'Cliente Premium',
      content:
        'A qualidade é incrível. Ingredientes frescos, sabor profundo... e saber que estou ajudando um casal a realizar seu sonho torna tudo especial.',
      rating: 5,
      image: '🤵',
    },
    {
      name: 'Ana Costa',
      role: 'Anfitriã de Eventos',
      content:
        'Já pedi várias vezes para meus eventos. Meus convidados sempre perguntam o segredo. Agora sou fã da marca!',
      rating: 5,
      image: '💃',
    },
    {
      name: 'Pedro Oliveira',
      role: 'Empresário',
      content:
        'Não é só sobre brownies. É sobre apoiar um sonho. Virou parte da minha rotina comprar e compartilhar com amigos.',
      rating: 5,
      image: '👨‍💼',
    },
  ];

  const stats = [
    { label: 'Clientes Felizes', value: '1.2K+' },
    { label: 'Brownies Vendidos', value: '15K+' },
    { label: 'Avaliação Média', value: '4.9⭐' },
    { label: 'Dinheiro para o Sonho', value: 'R$ 45K+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <PremiumSection className="bg-gradient-to-b from-amber-50 via-white to-pink-50">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <PremiumHeading level="h2">
          O que nossos clientes dizem
        </PremiumHeading>
        <p className="mt-6 text-lg text-amber-900/70 max-w-2xl mx-auto">
          Histórias reais de pessoas que fazem parte dessa jornada especial.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-amber-100/30"
          >
            <p className="text-2xl md:text-3xl font-bold text-amber-700 mb-2">
              {stat.value}
            </p>
            <p className="text-sm text-amber-900/60 uppercase tracking-widest">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonials */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-100/30"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Content */}
            <p className="text-amber-900 mb-6 italic leading-relaxed">
              "{testimonial.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-amber-100">
              <div className="text-3xl">{testimonial.image}</div>
              <div>
                <p className="font-semibold text-amber-900">{testimonial.name}</p>
                <p className="text-xs text-amber-900/60">{testimonial.role}</p>
              </div>
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400 ml-auto" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Instagram Feed Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-16 pt-12 border-t border-amber-200 text-center"
      >
        <p className="text-sm uppercase tracking-widest text-amber-900/50 mb-6">
          Veja mais nos Stories
        </p>
        <p className="text-xl text-amber-900 font-semibold mb-2">
          @dofornoaoaltarconfeitaria
        </p>
        <p className="text-amber-900/70 mb-6">
          Acompanhe nossos bastidores, receitas e histórias especiais no Instagram
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://www.instagram.com/dofornoaoaltarconfeitaria/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
        >
          Seguir no Instagram →
        </motion.a>
      </motion.div>
    </PremiumSection>
  );
};

export default SocialProofSection;
