import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice, orderStatuses } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const mockOrders = [
  {
    id: 'FD123456',
    items: [
      { name: 'Jollof Rice Special', quantity: 2, price: 4500 },
      { name: 'Grilled Chicken', quantity: 1, price: 3500 },
    ],
    total: 13000,
    status: 'delivered',
    date: '2024-03-28',
    estimatedDelivery: 'Delivered at 2:30 PM',
  },
  {
    id: 'FD123455',
    items: [
      { name: 'Egusi Soup', quantity: 1, price: 3500 },
      { name: 'Pounded Yam', quantity: 2, price: 2000 },
    ],
    total: 8000,
    status: 'out-for-delivery',
    date: '2024-03-28',
    estimatedDelivery: 'Arriving in 10 mins',
  },
  {
    id: 'FD123454',
    items: [{ name: 'Fried Rice Supreme', quantity: 1, price: 5000 }],
    total: 5500,
    status: 'preparing',
    date: '2024-03-27',
    estimatedDelivery: 'Ready in 20 mins',
  },
];

export function OrdersPage() {
  const [searchParams] = useSearchParams();
  const showSuccess = searchParams.get('success') === 'true';
  const orderId = searchParams.get('orderId');
  const [showSuccessMsg, setShowSuccessMsg] = useState(showSuccess);

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => setShowSuccessMsg(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-8 pb-24 lg:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {showSuccessMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500 text-white rounded-2xl p-5 mb-8 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Order Placed Successfully!</h3>
                <p className="text-green-100 text-sm">Your order #{orderId} is confirmed and being prepared.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <Link to="/menu">
            <Button variant="outline" className="rounded-full text-sm">
              Order Again
            </Button>
          </Link>
        </div>

        {mockOrders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">Your order history will appear here.</p>
            <Link to="/menu"><Button className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white">Browse Menu</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order, i) => {
              const statusInfo = orderStatuses.find((s) => s.id === order.status);
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Order #{order.id}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusInfo?.bgColor} ${statusInfo?.color}`}>
                      {statusInfo?.label}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.name} × {item.quantity}</span>
                        <span className="text-gray-700 dark:text-gray-300">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500">{order.estimatedDelivery}</p>
                      <p className="font-bold text-food-orange">{formatPrice(order.total)}</p>
                    </div>
                    <div className="flex gap-2">
                      {order.status !== 'delivered' && (
                        <Link to={`/track?orderId=${order.id}`}>
                          <Button size="sm" className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white text-xs">
                            Track <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      )}
                      <Button size="sm" variant="outline" className="rounded-full text-xs">Reorder</Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
