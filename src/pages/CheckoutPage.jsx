import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice, generateOrderId } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CreditCard, MapPin, Phone, User, Truck, Wallet, CheckCircle } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    notes: '',
  });

  const deliveryFee = 500;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));
    const orderId = generateOrderId();
    clearCart();
    navigate(`/orders?success=true&orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
          <Link to="/menu"><Button className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white">Browse Menu</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-8 pb-24 lg:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-food-orange" /> Delivery Details
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-9" placeholder="John Doe" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="pl-9" placeholder="+234 803 123 4567" />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delivery Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:border-transparent min-h-[80px] resize-none"
                      placeholder="Enter your delivery address in Ilorin..."
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Any special instructions..."
                    rows={2}
                  />
                </div>
              </form>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-food-orange" /> Payment Method
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'card', icon: CreditCard, label: 'Card Payment', desc: 'Visa, Mastercard' },
                  { id: 'cash', icon: Wallet, label: 'Cash on Delivery', desc: 'Pay when delivered' },
                ].map(({ id, icon: Icon, label, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === id
                        ? 'border-food-orange bg-food-orange/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${paymentMethod === id ? 'bg-food-orange/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      <Icon className={`w-5 h-5 ${paymentMethod === id ? 'text-food-orange' : 'text-gray-500'}`} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm text-gray-900 dark:text-white">{label}</p>
                      <p className="text-xs text-gray-500">{desc}</p>
                    </div>
                    {paymentMethod === id && <CheckCircle className="w-5 h-5 text-food-orange ml-auto" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 truncate pr-2">{item.name} × {item.quantity}</span>
                    <span className="font-medium text-gray-900 dark:text-white flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Delivery Fee</span><span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 dark:text-white pt-1 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span><span className="text-food-orange">{formatPrice(total)}</span>
                </div>
              </div>
              <button
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary flex items-center justify-center gap-2 py-4"
              >
                {isProcessing ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>Place Order • {formatPrice(total)}</>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
