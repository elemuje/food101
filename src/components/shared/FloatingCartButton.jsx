import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export function FloatingCartButton() {
  const { getTotalItems, getTotalPrice } = useCart();
  const itemCount = getTotalItems();
  const total = getTotalPrice();

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-20 left-4 right-4 z-40 lg:hidden">
        <Link to="/cart">
          <div className="bg-gradient-to-r from-food-orange to-food-red text-white rounded-full p-4 shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-food-orange rounded-full flex items-center justify-center text-xs font-bold">{itemCount}</span>
              </div>
              <span className="font-medium">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            </div>
            <span className="font-bold text-lg">{formatPrice(total)}</span>
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
