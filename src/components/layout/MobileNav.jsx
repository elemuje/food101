import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, UtensilsCrossed, ShoppingCart, User, MapPin } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const mobileNavItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/track', label: 'Track', icon: MapPin },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 lg:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href} className="relative flex flex-col items-center justify-center w-full h-full">
              <motion.div whileTap={{ scale: 0.9 }} className="relative">
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-food-orange' : 'text-gray-500'}`} />
                {item.label === 'Cart' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-food-red text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </motion.div>
              <span className={`text-[10px] mt-1 transition-colors ${isActive ? 'text-food-orange font-medium' : 'text-gray-500'}`}>{item.label}</span>
              {isActive && <motion.div layoutId="mobileNavIndicator" className="absolute top-0 w-12 h-0.5 bg-food-orange rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
