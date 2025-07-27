import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Star, CheckCircle, ChevronRight } from 'lucide-react';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  
  useEffect(() => {
    // Check if there's an order to give feedback for
    const orderData = localStorage.getItem('lastOrder');
    if (!orderData) {
      navigate('/');
      return;
    }
    
    setLastOrder(JSON.parse(orderData));
  }, [navigate]);
  
  if (!lastOrder) {
    return null; // Will redirect in useEffect
  }
  
  const handleStarHover = (hoveredValue: number) => {
    setHoveredRating(hoveredValue);
  };
  
  const handleStarClick = (clickedValue: number) => {
    setRating(clickedValue);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send feedback to a backend
    console.log('Feedback submitted:', { rating, feedback, orderId: lastOrder.orderId });
    
    // Show success message
    setIsSubmitted(true);
    
    // Clear last order data after 5 seconds
    setTimeout(() => {
      localStorage.removeItem('lastOrder');
    }, 5000);
  };
  
  return (
    <div className="py-8">
      <div className="container-custom max-w-3xl">
        {!isSubmitted ? (
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">How Was Your Experience?</h1>
              <p className="text-gray-600">
                Thank you for your purchase! We'd love to hear your feedback.
              </p>
            </div>
            
            <div className="mb-8 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Order #{lastOrder.orderId}</h3>
              <div className="flex flex-wrap gap-4">
                {lastOrder.items.map((item: any) => (
                  <div key={item.product.id} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm">{item.product.name} × {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Rate your overall experience
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={() => handleStarHover(0)}
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={36}
                        className={`transition-colors ${
                          (hoveredRating || rating) >= star
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Share your thoughts (optional)
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full"
                disabled={rating === 0}
              >
                Submit Feedback
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
              <CheckCircle size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Thank You for Your Feedback!</h1>
            <p className="text-gray-600 mb-8">
              We appreciate you taking the time to share your experience with us.
              Your feedback helps us improve our products and services.
            </p>
            <Link to="/" className="btn-primary inline-flex items-center">
              Continue Shopping
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;