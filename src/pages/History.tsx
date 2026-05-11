import React from 'react';
import { Heart, Stars, Calendar } from 'lucide-react';

const History: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: 'url(/fotocasamento2.webp)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Heart className="h-12 w-12 text-pink-500 mx-auto mb-6 fill-pink-500 animate-pulse" />
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 italic">
            Nossa História: Do Forno ao Altar Confeitaria
          </h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed italic">
            "Um doce sonho de amor que começou em uma cozinha e terminará no altar."
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(/fotocasamento.webp)' }}>
              <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-lg font-semibold italic">O início do nosso amor</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Stars className="h-6 w-6 text-pink-500" /> Como tudo começou
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Sempre acreditamos que as melhores coisas da vida são feitas à mão e com muito carinho. 
                Nossa jornada começou com uma simples receita de brownie em um jantar de domingo. 
                O que era apenas um hobby se transformou no motor de um grande sonho: o nosso casamento.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Cada ingrediente é escolhido com o mesmo cuidado que planejamos cada detalhe da nossa união. 
                Ao fundar a <strong>Do Forno ao Altar Confeitaria</strong>, unimos nossa paixão pela gastronomia 
                ao sonho de realizar o nosso casamento perfeito.
              </p>
            </div>
          </div>

          <div className="mt-20 bg-gray-50 rounded-3xl p-12 text-center border border-gray-200">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8">Toda a Arrecadação é para o Nosso Casamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border-2 border-pink-500">
                  <Calendar className="h-6 w-6 text-pink-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Foco no Altar</h4>
                <p className="text-gray-600 text-sm">Cada centavo lucrado nesta confeitaria é destinado exclusivamente aos custos da nossa cerimônia e festa de casamento.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border-2 border-pink-500">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Um Sonho Real</h4>
                <p className="text-gray-600 text-sm">Não se trata apenas de brownies, mas de cada tijolo emocional que estamos colocando no caminho para o nosso 'Sim'.</p>
              </div>
            </div>
          </div>

          {/* Wedding Photos Gallery */}
          <div className="mt-20">
            <h2 className="font-serif text-3xl font-bold text-gray-900 text-center mb-12">Momentos que nos Inspiraram</h2>
            <div className="space-y-12">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: 'url(/fotocasamento.webp)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="text-center text-white">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-pink-400" />
                    <h3 className="text-2xl font-bold mb-2">O Nosso Primeiro Encontro</h3>
                    <p className="text-lg italic">O momento em que tudo começou</p>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: 'url(/fotocasamento2.webp)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent"></div>
                <div className="relative z-10 flex items-center justify-end h-full pr-12">
                  <div className="text-center text-white max-w-md">
                    <Stars className="h-12 w-12 mx-auto mb-4 text-pink-400" />
                    <h3 className="text-2xl font-bold mb-2">Momentos de Alegria</h3>
                    <p className="text-lg italic">Cada sorriso que compartilhamos</p>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center scale-105" style={{ backgroundImage: 'url(/fotocasamento3.webp)' }}></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                <div className="relative z-10 flex items-center justify-start h-full pl-12">
                  <div className="text-center text-white max-w-md">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-pink-400" />
                    <h3 className="text-2xl font-bold mb-2">Olhando para o Futuro</h3>
                    <p className="text-lg italic">Juntos construindo nossa história</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 italic">Você faz parte desse "Sim"!</h3>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto mb-10">
              Obrigado por apoiar o nosso empreendimento e por nos ajudar a tornar realidade o dia mais importante de nossas vidas. 
              Saboreie cada pedaço sabendo que ele é feito com gratidão e esperança.
            </p>
            <div className="inline-block p-1 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-500 rounded-full">
              <div className="bg-white px-8 py-3 rounded-full text-pink-600 font-bold">
                Com carinho, O Casal.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;
