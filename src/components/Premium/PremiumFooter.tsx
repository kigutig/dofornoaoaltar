import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, Share2 } from 'lucide-react';

const PremiumFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Do Forno ao Altar',
      links: [
        { label: 'Sobre Nós', href: '#' },
        { label: 'Nossa História', href: '#historia' },
        { label: 'Produtos', href: '#produtos' },
        { label: 'Contato', href: '#' },
      ],
    },
    {
      title: 'Atendimento',
      links: [
        { label: 'FAQ', href: '#' },
        { label: 'Política de Entrega', href: '#' },
        { label: 'Termos de Uso', href: '#' },
        { label: 'Privacidade', href: '#' },
      ],
    },
    {
      title: 'Redes Sociais',
      links: [
        { label: 'Instagram', href: 'https://www.instagram.com/dofornoaoaltarconfeitaria/', icon: Share2 },
        { label: 'Facebook', href: 'https://facebook.com', icon: Share2 },
        { label: 'WhatsApp', href: 'https://wa.me/5511986959635', icon: Phone },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Do Forno</h3>
                  <p className="text-sm text-pink-400">ao Altar</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transformando açúcar em sonhos. Cada brownie é um passo mais próximo do altar.
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  href="https://instagram.com"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600/30 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  href="https://facebook.com"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-pink-600/30 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            {/* Footer Sections */}
            {footerSections.map((section, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <h4 className="font-semibold text-lg mb-6 text-pink-400">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => {
                    const Icon = 'icon' in link ? link.icon : null;
                    return (
                      <li key={link.label}>
                        <motion.a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                          whileHover={{ x: 4 }}
                        >
                          {Icon && <Icon className="w-4 h-4 group-hover:text-pink-400 transition-colors" />}
                          {link.label}
                        </motion.a>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="border-t border-gray-700 pt-8 mb-10"
          >
            <h4 className="font-semibold text-lg mb-8 text-pink-400">Entre em contato</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Localização</p>
                  <p className="text-gray-300">Rua Jose Barbosa, 79 - Jd Saint Moritz</p>
                  <p className="text-gray-300">Taboão da Serra, SP</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">WhatsApp</p>
                  <p className="text-gray-300">(11) 98695-9635</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-widest">Email</p>
                  <p className="text-gray-300">dofornoaoaltar@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-700 py-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Do Forno ao Altar. Feito com{' '}
            <Heart className="w-4 h-4 inline fill-pink-500 text-pink-500" /> por um casal apaixonado.
          </p>
          <p className="text-pink-400 text-xs mt-2 italic">
            "Cada brownie é um passo mais próximo do altar." 💕
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
