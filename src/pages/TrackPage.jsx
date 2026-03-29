import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { orderStatuses, formatPrice } from '@/lib/data';
import { MapPin, Phone, MessageCircle, Bike, Clock, CheckCircle2, Star } from 'lucide-react';

const trackingData = {
  id: 'FD123455',
  status: 'out-for-delivery',
  estimatedTime: '10 mins',
  driver: { name: 'Abdul Ibrahim', phone: '+234 805 123 4567', rating: 4.9, vehicle: 'Motorcycle – ABC 123 XY' },
  items: [{ name: 'Egusi Soup', quantity: 1 }, { name: 'Pounded Yam', quantity: 2 }],
  total: 8000,
  steps: [
    { status: 'pending', time: '1:30 PM', completed: true },
    { status: 'confirmed', time: '1:32 PM', completed: true },
    { status: 'preparing', time: '1:35 PM', completed: true },
    { status: 'ready', time: '2:00 PM', completed: true },
    { status: 'out-for-delivery', time: '2:15 PM', completed: true, current: true },
    { status: 'delivered', time: 'Est. 2:25 PM', completed: false },
  ],
};

export function TrackPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || trackingData.id;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(80), 600);
    return () => clearTimeout(t);
  }, []);

  const currentStatus = orderStatuses.find((s) => s.id === trackingData.status);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-8 pb-24 lg:pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Track Order</h1>

        {/* Status Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-food-orange to-food-red rounded-2xl p-6 text-white mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm">Order #{orderId}</p>
              <h2 className="text-2xl font-bold">{currentStatus?.label}</h2>
              <p className="text-white/80 text-sm mt-1">{currentStatus?.description}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Bike className="w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Arriving in {trackingData.estimatedTime}</span>
          </div>
          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-white h-2 rounded-full"
            />
          </div>
        </motion.div>

        {/* Driver Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Delivery Partner</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-food-orange to-food-red rounded-full flex items-center justify-center text-white text-xl font-bold">
                {trackingData.driver.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{trackingData.driver.name}</h4>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{trackingData.driver.rating}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{trackingData.driver.vehicle}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${trackingData.driver.phone}`} className="w-10 h-10 bg-food-orange/10 rounded-full flex items-center justify-center text-food-orange hover:bg-food-orange hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <button className="w-10 h-10 bg-food-orange/10 rounded-full flex items-center justify-center text-food-orange hover:bg-food-orange hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 mb-6"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Order Timeline</h3>
          <div className="space-y-4">
            {trackingData.steps.map((step, i) => {
              const statusInfo = orderStatuses.find((s) => s.id === step.status);
              return (
                <div key={step.status} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <CheckCircle2 className={`w-4 h-4 ${step.completed ? 'text-green-500' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${step.current ? 'text-food-orange' : step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                      {statusInfo?.label}
                    </p>
                    <p className="text-xs text-gray-500">{statusInfo?.description}</p>
                  </div>
                  <span className={`text-xs flex-shrink-0 ${step.completed ? 'text-gray-500' : 'text-gray-400'}`}>{step.time}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Order Items</h3>
          {trackingData.items.map((item) => (
            <div key={item.name} className="flex justify-between text-sm py-1">
              <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
              <span className="text-gray-700 dark:text-gray-300">× {item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 dark:border-gray-700 mt-3 pt-3 flex justify-between font-bold">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-food-orange">{formatPrice(trackingData.total)}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
