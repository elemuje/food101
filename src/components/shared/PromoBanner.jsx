import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';

const promos = [
  { id: 1, text: "🎉 First order gets 10% off! Use code: WELCOME10", color: "from-food-orange to-food-red" },
  { id: 2, text: "🚚 Free delivery on orders above ₦5,000", color: "from-green-500 to-emerald-600" },
  { id: 3, text: "⭐ Refer a friend and earn ₦500 credit", color: "from-purple-500 to-pink-500" },
];

export function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const promo = promos[currentPromo];

  return (
    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`bg-gradient-to-r ${promo.color} text-white relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Tag className="w-4 h-4" />
          <AnimatePresence mode="wait">
            <motion.span key={promo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {promo.text}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <button onClick={() => setIsVisible(false)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"><X className="w-4 h-4" /></button>
    </motion.div>
  );
}
