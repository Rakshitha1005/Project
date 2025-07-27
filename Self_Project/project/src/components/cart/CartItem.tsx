import React from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';

type CartItemProps = {
  product: Product;
  quantity: number;
};

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedSubtotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price * quantity);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 gap-4">
      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium text-primary-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.weight}</p>
        <p className="text-accent-700 font-medium mt-1">{formattedPrice}</p>
      </div>
      
      <div className="flex items-center border border-gray-300 rounded-md">
        <button
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="px-3 py-1 text-center min-w-[40px]">{quantity}</span>
        <button
          className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <div className="text-right sm:min-w-[100px]">
        <p className="font-semibold">{formattedSubtotal}</p>
        <button
          className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1 transition-colors"
          onClick={handleRemove}
        >
          <Trash size={14} className="mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;