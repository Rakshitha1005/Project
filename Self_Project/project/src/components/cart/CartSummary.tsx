import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

type CartSummaryProps = {
  showCheckoutButton?: boolean;
};

const CartSummary: React.FC<CartSummaryProps> = ({ showCheckoutButton = true }) => {
  const { state } = useCart();
  const navigate = useNavigate();

  const subtotal = state.total;
  const shipping = subtotal > 0 ? 100 : 0; // Free shipping over ₹2000
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  // Format currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{subtotal > 0 ? (subtotal > 2000 ? 'Free' : formatPrice(shipping)) : '—'}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <div className="pt-3 border-t border-gray-200 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-lg">{formatPrice(total)}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <button
          className="btn-primary w-full"
          onClick={() => navigate('/checkout')}
          disabled={state.items.length === 0}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default CartSummary;