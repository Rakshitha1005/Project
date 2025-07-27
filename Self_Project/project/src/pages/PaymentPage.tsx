import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/cart/CartSummary';
import { CheckCircle, CreditCard, Cast as Cash, AlertCircle } from 'lucide-react';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checkoutData, setCheckoutData] = useState<any>(null);
  
  useEffect(() => {
    // Check if user has gone through checkout page
    const savedCheckoutData = sessionStorage.getItem('checkoutData');
    if (!savedCheckoutData || state.items.length === 0) {
      navigate('/checkout');
      return;
    }
    
    setCheckoutData(JSON.parse(savedCheckoutData));
  }, [navigate, state.items.length]);
  
  if (!checkoutData) {
    return null; // Will redirect in useEffect
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
      
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } 
    // Format expiry date
    else if (name === 'expiryDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
      
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } 
    // Format CVV (numbers only)
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 3);
      
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } 
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'card') {
      // Validate card number (16 digits)
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      // Validate card holder
      if (!formData.cardHolder.trim()) {
        newErrors.cardHolder = 'Cardholder name is required';
      }
      
      // Validate expiry date (MM/YY format)
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Enter a valid date (MM/YY)';
      } else {
        const [month, year] = formData.expiryDate.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (month < 1 || month > 12) {
          newErrors.expiryDate = 'Invalid month';
        } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = 'Card has expired';
        }
      }
      
      // Validate CVV (3 digits)
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length !== 3) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      processPayment();
    }
  };
  
  const processPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Store order information (in a real app, this would go to a database)
      const orderDetails = {
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: state.items,
        total: state.total,
        shipping: state.total > 2000 ? 0 : 100,
        tax: Math.round(state.total * 0.18),
        shippingInfo: checkoutData,
        paymentMethod,
        date: new Date().toISOString(),
      };
      
      // Save order details to local storage (for demo purposes)
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      
      // Clear cart after successful payment
      clearCart();
      
      // Clear checkout data
      sessionStorage.removeItem('checkoutData');
      
      // Navigate to feedback page after 2 seconds
      setTimeout(() => {
        navigate('/feedback');
      }, 2000);
    }, 2000);
  };
  
  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">Payment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {!paymentComplete ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="sr-only"
                      />
                      <CreditCard className="text-primary-700" size={24} />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'cod' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="sr-only"
                      />
                      <Cash className="text-primary-700" size={24} />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number*
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="XXXX XXXX XXXX XXXX"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        />
                        {errors.cardNumber && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name*
                        </label>
                        <input
                          type="text"
                          id="cardHolder"
                          name="cardHolder"
                          placeholder="Name on card"
                          value={formData.cardHolder}
                          onChange={handleChange}
                          className={`w-full px-3 py-2 border rounded-md ${
                            errors.cardHolder ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                        />
                        {errors.cardHolder && (
                          <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date (MM/YY)*
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV*
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <AlertCircle size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          <p>This is a demo. No actual payment will be processed. Use any valid-looking card details.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'cod' && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-md">
                      <p className="text-gray-600">
                        Pay with cash upon delivery. Please ensure someone is available at the delivery address to 
                        receive the package and make the payment.
                      </p>
                    </div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </span>
                    ) : (
                      `Complete Payment ${paymentMethod === 'card' ? 'Now' : '(Cash on Delivery)'}`
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
                  <p className="text-gray-600 mb-4">
                    Your order has been placed successfully. Thank you for shopping with us.
                  </p>
                  <p className="text-gray-600">
                    You will be redirected to the feedback page in a moment...
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <CartSummary showCheckoutButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;