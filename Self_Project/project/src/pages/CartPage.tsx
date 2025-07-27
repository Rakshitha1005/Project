import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

const CartPage = () => {
  const { state } = useCart();

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {state.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Cart Items ({state.items.length})</h2>
                </div>
                
                <div>
                  {state.items.map((item) => (
                    <CartItem 
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <Link 
                    to="/products" 
                    className="text-accent-600 inline-flex items-center hover:text-accent-700 transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 text-gray-400 rounded-full mb-6">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;