import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Award, Clock, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1282536/pexels-photo-1282536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Charcoal background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container-custom relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Premium Quality Charcoal for Perfect Grilling
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              Balaji Charcoal offers high-quality charcoal products for homes, 
              restaurants, and industries since 1985.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-accent">
                Explore Products
              </Link>
              <Link to="/contact" className="btn bg-white text-primary-800 hover:bg-gray-100">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Balaji Charcoal?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With over three decades of experience, we pride ourselves on delivering the finest 
              charcoal products that meet the highest standards of quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-accent-500 rounded-full mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Our charcoal is made from selected hardwoods to ensure consistent quality and performance.
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-accent-500 rounded-full mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Long Burning</h3>
              <p className="text-gray-600">
                Our products burn longer with steady heat, saving you money and providing better results.
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-accent-500 rounded-full mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We ensure quick delivery across India with secure packaging to protect product quality.
              </p>
            </div>

            <div className="text-center p-6 hover:shadow-md transition-shadow rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 text-accent-500 rounded-full mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always ready to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story Since 1985</h2>
              <p className="text-gray-600 mb-4">
                Balaji Charcoal was founded with a simple mission: to provide the highest quality charcoal 
                products at competitive prices. What began as a small family business has grown into one of 
                India's most trusted charcoal suppliers.
              </p>
              <p className="text-gray-600 mb-6">
                For over 38 years, we've maintained our commitment to quality, sustainability, and customer 
                satisfaction. Our charcoal is sourced from responsibly managed forests and processed using 
                techniques that minimize environmental impact.
              </p>
              <Link to="/contact" className="inline-flex items-center text-accent-600 font-medium hover:text-accent-700 transition-colors">
                Learn more about our journey
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/5840396/pexels-photo-5840396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Charcoal production"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't take our word for it. Here's what our valued customers have to say about 
              Balaji Charcoal products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "We've been using Balaji's restaurant-grade charcoal for our grill house for over 
                5 years. The quality is consistently excellent, and it burns longer than any other 
                brand we've tried."
              </p>
              <div className="font-medium">
                <p className="text-primary-800">Rajesh Sharma</p>
                <p className="text-sm text-gray-500">Owner, Flames Grill House</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The coconut shell charcoal is simply amazing. It adds a subtle flavor to the food 
                and burns with very little smoke. Perfect for my weekend BBQ sessions with family."
              </p>
              <div className="font-medium">
                <p className="text-primary-800">Priya Patel</p>
                <p className="text-sm text-gray-500">Home Chef</p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-500 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a supplier for several restaurants, I need reliable quality and timely delivery. 
                Balaji Charcoal has never disappointed in the 3 years we've been working with them."
              </p>
              <div className="font-medium">
                <p className="text-primary-800">Vikram Singh</p>
                <p className="text-sm text-gray-500">Restaurant Supplier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Best Charcoal?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Browse our selection of premium charcoal products and place your order today. 
            Enjoy free shipping on orders over ₹2000.
          </p>
          <Link to="/products" className="btn-accent">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;