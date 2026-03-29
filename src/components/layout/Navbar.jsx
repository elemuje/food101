import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/Button';
import {
  ShoppingCart, User, Menu, X, Search, MapPin, Phone, LogOut, Sun, Moon,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/orders', label: 'Orders' },
  { href: '/track', label: 'Track' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const cartCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-food-dark text-white text-xs py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-food-orange" />
              Opposite UITH, Ilorin
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-food-orange" />
              +234 803 123 4567
            </span>
          </div>
          <span>Open: 7AM – 10PM Daily</span>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg'
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-food-orange to-food-red rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">F</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gradient">FOOD 101</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Ilorin's Finest</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors relative group ${
                    location.pathname === link.href
                      ? 'text-food-orange'
                      : 'text-gray-700 dark:text-gray-300 hover:text-food-orange'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-food-orange transition-all ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Search */}
              <Link to="/menu">
                <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:flex">
                  <Search className="w-5 h-5" />
                </button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <button className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-food-red text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </button>
              </Link>

              {/* Profile */}
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-food-orange to-food-red rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {isAuthenticated ? user?.name?.charAt(0) : 'U'}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                            <p className="font-medium text-sm text-gray-900 dark:text-white">{user?.name}</p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                          </div>
                          <Link to="/profile" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <User className="w-4 h-4" /> Profile
                          </Link>
                          <Link to="/orders" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <ShoppingCart className="w-4 h-4" /> My Orders
                          </Link>
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link to="/login" className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <User className="w-4 h-4" /> Sign In
                          </Link>
                          <Link to="/signup" className="flex items-center gap-2 px-4 py-3 text-sm text-food-orange hover:bg-orange-50 dark:hover:bg-orange-900/20">
                            Sign Up
                          </Link>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'bg-food-orange/10 text-food-orange'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                  {isAuthenticated ? (
                    <button onClick={logout} className="flex-1 text-center py-2 text-sm text-red-500">Sign Out</button>
                  ) : (
                    <>
                      <Link to="/login" className="flex-1 text-center py-2 text-sm text-gray-700 dark:text-gray-300">Sign In</Link>
                      <Link to="/signup" className="flex-1 text-center py-2 text-sm bg-gradient-to-r from-food-orange to-food-red text-white rounded-full">Sign Up</Link>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
