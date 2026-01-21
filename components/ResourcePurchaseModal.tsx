'use client';

import { useState } from 'react';
import { X, ShoppingCart, CreditCard, Lock } from 'lucide-react';
import type { Resource } from '@/lib/types/resources';

interface ResourcePurchaseModalProps {
  resource: Resource;
  isOpen: boolean;
  onClose: () => void;
}

export default function ResourcePurchaseModal({
  resource,
  isOpen,
  onClose,
}: ResourcePurchaseModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleStripePayment = async () => {
    setIsProcessing(true);
    
    // In production, you would:
    // 1. Create a Stripe checkout session via your API
    // 2. Redirect to Stripe checkout
    // Example:
    // const response = await fetch('/api/create-checkout-session', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId: resource.stripeProductId }),
    // });
    // const { url } = await response.json();
    // window.location.href = url;

    // For demo purposes:
    alert(`Redirecting to Stripe Checkout for ${resource.title}...\n\nIn production, this would redirect to Stripe payment page.`);
    
    setIsProcessing(false);
    onClose();
  };

  const handlePayPalPayment = async () => {
    setIsProcessing(true);
    
    // In production, you would:
    // 1. Create a PayPal order via your API
    // 2. Redirect to PayPal checkout
    // Example:
    // const response = await fetch('/api/create-paypal-order', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ productId: resource.paypalProductId }),
    // });
    // const { url } = await response.json();
    // window.location.href = url;

    // For demo purposes:
    alert(`Redirecting to PayPal Checkout for ${resource.title}...\n\nIn production, this would redirect to PayPal payment page.`);
    
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8 relative animate-in fade-in zoom-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mb-4">
            <ShoppingCart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Comprar Recurso Premium
          </h2>
          <p className="text-gray-600 mb-4">
            {resource.title}
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-gray-800">
              ${resource.priceAmount?.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500">{resource.currency || 'USD'}</span>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 mb-6 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Pago Seguro y Encriptado</span>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setPaymentMethod('stripe')}
            disabled={isProcessing}
            className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
              paymentMethod === 'stripe'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-800">Tarjeta de Crédito/Débito</div>
                <div className="text-sm text-gray-500">Stripe - Visa, Mastercard, Amex</div>
              </div>
            </div>
            {paymentMethod === 'stripe' && (
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>

          <button
            onClick={() => setPaymentMethod('paypal')}
            disabled={isProcessing}
            className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
              paymentMethod === 'paypal'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="text-blue-600 font-bold text-xl">PayPal</div>
              <div className="text-sm text-gray-500">PayPal Account</div>
            </div>
            {paymentMethod === 'paypal' && (
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        </div>

        {/* Purchase Button */}
        {paymentMethod && (
          <button
            onClick={paymentMethod === 'stripe' ? handleStripePayment : handlePayPalPayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {isProcessing ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Procesando...</span>
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Proceder al Pago</span>
              </>
            )}
          </button>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          Tu compra es segura. Recibirás el enlace de descarga por correo electrónico después del pago.
        </p>
      </div>
    </div>
  );
}
