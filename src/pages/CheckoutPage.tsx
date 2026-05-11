import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, Calendar, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import QRCode from 'qrcode';

const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, cartSubtotal, cartDiscount, clearCart } = useCart();
  const [isPaid, setIsPaid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [pixQrCode, setPixQrCode] = useState('');
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMercadoPago().then(() => {
      // @ts-ignore
      window.MercadoPago = new window.MercadoPago('YOUR_PUBLIC_KEY');
    });
  }, []);

  const generatePixQr = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'BRL',
          })),
          payment_methods: {
            default_payment_method_id: 'pix',
          },
          back_urls: {
            success: window.location.origin + '/success',
            failure: window.location.origin + '/failure',
          },
        }),
      });

      const preference = await response.json();
      const qrCodeData = preference.point_of_interaction.transaction_data.qr_code;
      setPixQrCode(qrCodeData);
      QRCode.toDataURL(qrCodeData).then(setPixQrCodeBase64);
    } catch (error) {
      console.error('Erro ao gerar QR PIX:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === 'card') {
        // Para cartão, redirecionar para checkout do Mercado Pago
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart.map(item => ({
              title: item.name,
              quantity: item.quantity,
              unit_price: item.price,
              currency_id: 'BRL',
            })),
            back_urls: {
              success: window.location.origin + '/success',
              failure: window.location.origin + '/failure',
            },
          }),
        });

        const preference = await response.json();
        window.location.href = preference.init_point;
      } else if (paymentMethod === 'pix') {
        // Para PIX, criar preferência e gerar QR code
        const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: cart.map(item => ({
              title: item.name,
              quantity: item.quantity,
              unit_price: item.price,
              currency_id: 'BRL',
            })),
            payment_methods: {
              default_payment_method_id: 'pix',
            },
            back_urls: {
              success: window.location.origin + '/success',
              failure: window.location.origin + '/failure',
            },
          }),
        });

        const preference = await response.json();
        const qrCodeData = preference.point_of_interaction.transaction_data.qr_code;
        setPixQrCode(qrCodeData);
        QRCode.toDataURL(qrCodeData).then(setPixQrCodeBase64);
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (isPaid) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">Pagamento Confirmado!</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-lg">
          Muito obrigado! Seu pedido foi recebido e cada centavo será investido no nosso grande dia. 
          Entraremos em contato em breve para confirmar a entrega.
        </p>
        <Link 
          to="/" 
          className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-600 transition shadow-xl"
        >
          Voltar para Início
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4 text-center">O carrinho está vazio</h2>
        <Link 
          to="/" 
          className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold hover:bg-rose-600 transition shadow-lg"
        >
          Ver Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold text-rose-800 mb-10 text-center">Finalizar Pedido</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <form onSubmit={handlePayment} className="space-y-6 bg-white p-8 rounded-2xl border border-rose-100 shadow-xl">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Truck className="h-6 w-6 text-rose-500" /> Entrega
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-600">Nome Completo</label>
                <input 
                  required
                  type="text" 
                  placeholder="Seu nome" 
                  className="p-3 border border-rose-100 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-600">Telefone</label>
                <input 
                  required
                  type="tel" 
                  placeholder="(00) 00000-0000" 
                  className="p-3 border border-rose-100 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-600">Endereço de Entrega</label>
              <input 
                required
                type="text" 
                placeholder="Rua, número, bairro" 
                className="p-3 border border-rose-100 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition"
              />
            </div>

            <div className="pt-6 border-t border-rose-50">
              <h2 className="font-serif text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-rose-500" /> Pagamento
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('pix'); generatePixQr(); }}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'pix' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'}`}
                >
                  <span className="font-bold text-rose-600">PIX</span>
                  <span className="text-xs text-gray-500 text-center leading-tight">Aprovação instantânea</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setPaymentMethod('card'); setPixQrCode(''); setPixQrCodeBase64(''); }}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-rose-500 bg-rose-50' : 'border-gray-100 hover:border-rose-200'}`}
                >
                  <CreditCard className="h-6 w-6 text-rose-600" />
                  <span className="text-xs text-gray-500 text-center leading-tight">Cartão de Crédito</span>
                </button>
              </div>

              {paymentMethod === 'pix' ? (
                <div className="bg-rose-50/50 p-6 rounded-xl border border-rose-100 text-center">
                  <p className="text-gray-600 mb-4">Escaneie o QR Code ou use o código Pix Copia e Cola após finalizar o pedido.</p>
                  {pixQrCodeBase64 ? (
                    <img src={pixQrCodeBase64} alt="QR Code PIX" className="w-32 h-32 mx-auto mb-4 border-2 border-white shadow-sm" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 mx-auto rounded-lg flex items-center justify-center border-2 border-white shadow-sm mb-4">
                      <span className="text-gray-400 text-xs">QR CODE PIX</span>
                    </div>
                  )}
                  {pixQrCode && (
                    <p className="font-mono text-xs text-gray-400 break-all">{pixQrCode}</p>
                  )}
                </div>
              ) : (
                <div className="space-y-4" id="cardForm">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-bold text-gray-600">Número do Cartão</label>
                    <input 
                      id="cardNumber"
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="p-3 border border-rose-100 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-bold text-gray-600">Validade</label>
                      <input 
                        id="expirationDate"
                        type="text" 
                        placeholder="MM/YY" 
                        className="p-3 border border-rose-100 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-bold text-gray-600">CVV</label>
                      <input 
                        id="securityCode"
                        type="text" 
                        placeholder="123" 
                        className="p-3 border border-rose-100 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-rose-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-rose-700 transition shadow-xl mt-8 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Finalizar Pagamento'} <Lock className="h-5 w-5" />
            </button>

            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 underline text-sm"
              >
                Cancelar Pedido
              </Link>
            </div>
          </form>
        </div>

        {/* Order Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm sticky top-24">
            <h2 className="font-serif text-2xl font-bold text-rose-800 mb-6">Seu Pedido</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-rose-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-rose-50">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity}x R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <span className="font-bold text-rose-600 text-sm">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-rose-100">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>R$ {cartSubtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto Aplicado</span>
                  <span>- R$ {cartDiscount.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl text-gray-800 pt-2 border-t border-rose-50">
                <span>Total</span>
                <span className="text-rose-600">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-sm text-green-700 bg-green-50 p-3 rounded-lg border border-green-100">
                <ShieldCheck className="h-5 w-5" />
                <span>Compra segura e criptografada.</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-100">
                <Calendar className="h-5 w-5" />
                <span>Entrega prevista em até 48 horas.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
