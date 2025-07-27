import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/Product';
import { ShoppingCart, Star, PhoneCall } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    if (!product.customizable) {
      addToCart(product, 1);
      
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 
        'fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded-md shadow-lg z-50 animate-slideUp';
      toast.textContent = `${product.name} added to cart!`;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.add('animate-fadeOut');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }
  };

  // Format price
  const formattedPrice = product.customizable 
    ? 'Custom Quote' 
    : new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(product.price);

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden h-64">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            product.stockStatus === 'In Stock' 
              ? 'bg-green-100 text-green-800' 
              : product.stockStatus === 'Low Stock'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {product.stockStatus}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-1">
          {product.rating && (
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
            </div>
          )}
          <span className="text-sm text-gray-500 ml-auto">{product.weight}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{formattedPrice}</span>
          {product.customizable ? (
            <Link 
              to="/contact" 
              className="btn-accent py-1.5 px-3"
              aria-label="Contact for bulk order"
            >
              <PhoneCall size={18} />
              <span className="ml-1">Contact</span>
            </Link>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="btn-accent py-1.5 px-3"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={18} />
              <span className="ml-1">Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;