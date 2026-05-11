import React from 'react';
import { motion } from 'framer-motion';

// Container elegante com padding responsivo
export const PremiumContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Section com animação de fade ao entrar na view
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const PremiumSection: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id, 
  fullWidth = false 
}) => (
  <motion.section
    id={id}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: '-100px' }}
    className={`py-12 md:py-20 ${className}`}
  >
    {fullWidth ? children : <PremiumContainer>{children}</PremiumContainer>}
  </motion.section>
);

// Button premium com hover sofisticado
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const PremiumButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}) => {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer';
  
  const variants = {
    primary: 'bg-amber-900 text-white hover:bg-amber-800 hover:shadow-lg',
    secondary: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
    ghost: 'text-amber-900 hover:bg-amber-900/5',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick, disabled };

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Component
        {...props}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children}
      </Component>
    </motion.div>
  );
};

// Heading elegante com tipografia sofisticada
interface HeadingProps {
  children: React.ReactNode;
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
  accent?: boolean;
}

export const PremiumHeading: React.FC<HeadingProps> = ({ 
  children, 
  level = 'h2', 
  className = '',
  accent = true 
}) => {
  const sizes = {
    h1: 'text-4xl md:text-6xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
  };

  return React.createElement(
    level,
    {
      className: `${sizes[level]} font-serif font-bold text-gray-900 ${className}`,
    },
    <>
      {children}
      {accent && <div className="w-24 h-1 bg-pink-600 mx-auto mt-4" />}
    </>
  );
};

// Card premium com hover 3D
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover3D?: boolean;
}

export const PremiumCard: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover3D = true 
}) => (
  <motion.div
    whileHover={hover3D ? { y: -8, rotateZ: 2 } : {}}
    transition={{ duration: 0.3 }}
    className={`rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

// Divisor elegante
export const ElegantDivider = () => (
  <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-pink-400 mx-auto my-8" />
);
