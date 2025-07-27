import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Flame, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Flame size={28} className="text-accent-500" />
            <span className="text-primary-800 text-xl font-bold">Balaji Charcoal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </nav>

          {/* Cart Icon */}
          <Link 
            to="/cart" 
            className="flex items-center gap-1 ml-4 text-primary-800 hover:text-accent-500 transition-colors"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white absolute top-full left-0 w-full border-t border-gray-200 shadow-lg animate-fadeIn">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <NavLink to="/" className="nav-link py-2">
              Home
            </NavLink>
            <NavLink to="/products" className="nav-link py-2">
              Products
            </NavLink>
            <NavLink to="/contact" className="nav-link py-2">
              Contact
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;