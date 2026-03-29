import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const deliveryFee = 500;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/menu">
            <Button className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white">
              Browse Menu
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">{item.name}</h3>
                        <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-500 p-1 flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-food-orange"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-semibold w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-food-orange"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-food-orange">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Button variant="outline" onClick={clearCart} className="w-full">
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm">
                  <span>Delivery Fee</span><span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span className="text-food-orange">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <MapPin className="w-3 h-3" />
                <span>Delivery within Ilorin</span>
              </div>
              <Link to="/checkout">
                <Button className="w-full bg-gradient-to-r from-food-orange to-food-red rounded-full py-6 text-base text-white">
                  Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" className="w-full mt-3 rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
