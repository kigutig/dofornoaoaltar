import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartSubtotal, cartDiscount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-rose-500" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-2 text-center">Seu carrinho está vazio</h2>
        <p className="text-gray-600 mb-8 text-center">Nenhum brownie por aqui ainda. Adicione alguns para adoçar o seu dia!</p>
        <Link 
          to="/" 
          className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-600 transition shadow-lg"
        >
          Voltar para o Cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-gray-500 hover:text-rose-600 transition">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="font-serif text-3xl font-bold text-rose-800">Seu Carrinho</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl border border-rose-100 shadow-sm">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                <p className="text-rose-600 font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-rose-200 rounded-full p-1 bg-rose-50/50">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-rose-600 hover:bg-white rounded-full transition"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-rose-600 hover:bg-white rounded-full transition"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-xl sticky top-24">
            <h2 className="font-serif text-2xl font-bold text-rose-800 mb-6">Resumo do Pedido</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto (Promoção)</span>
                  <span>- R$ {cartDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 pb-4 border-b border-rose-100">
                <span>Frete</span>
                <span className="text-green-600 font-medium">Grátis</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 pt-2">
                <span>Total</span>
                <span className="text-rose-600">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold text-center block hover:bg-rose-700 transition shadow-lg active:scale-95"
            >
              Ir para o Pagamento
            </Link>
            
            <p className="mt-4 text-xs text-center text-gray-400">
              Ao continuar, você concorda em apoiar o nosso casamento. ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
