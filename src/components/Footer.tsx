import React from 'react';
import { Phone, Mail, Camera, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rose-50 border-t border-rose-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          {/* Brand and Mission */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
              <span className="font-serif text-2xl font-bold text-rose-800">Do Forno ao Altar Confeitaria</span>
            </div>
            <p className="text-gray-600 max-w-sm">
              Cada brownie que você saboreia é um passo a mais para o nosso sonho do casamento se tornar realidade.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-rose-800">Contato</h3>
            <div className="space-y-2">
              <a href="https://wa.me/5511986959635" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 hover:text-rose-600">
                <Phone className="h-4 w-4" />
                <span>1198695-9635</span>
              </a>
              <a href="mailto:dofornoaoaltar@gmail.com" className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 hover:text-rose-600">
                <Mail className="h-4 w-4" />
                <span>dofornoaoaltar@gmail.com</span>
              </a>
              <a href="https://www.instagram.com/dofornoaoaltarconfeitaria/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start space-x-2 text-gray-600 hover:text-rose-600">
                <Camera className="h-4 w-4" />
                <span>@dofornoaoaltarconfeitaria</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-rose-800">Siga-nos</h3>
            {/* Instagram Preview */}
            <div className="mt-6">
              <div className="bg-black rounded-3xl p-2 shadow-xl max-w-xs mx-auto">
                <div className="bg-white rounded-2xl p-3">
                  <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl p-4 text-center">
                    <Camera className="h-10 w-10 mx-auto text-white mb-2" />
                    <p className="text-white text-sm font-bold">@dofornoaoaltarconfeitaria</p>
                    <a 
                      href="https://www.instagram.com/dofornoaoaltarconfeitaria" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white text-xs underline hover:text-gray-200 transition"
                    >
                      Ver no Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-rose-200 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Do Forno ao Altar Confeitaria. Todos os direitos reservados.</p>
          <p className="mt-1">Feito com amor para o nosso casamento.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
