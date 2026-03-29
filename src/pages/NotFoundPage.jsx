import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Home, UtensilsCrossed } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          className="text-8xl mb-6"
        >
          🍽️
        </motion.div>
        <h1 className="text-6xl font-bold text-food-orange mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Looks like this page went out for delivery and never came back!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white px-6">
              <Home className="w-4 h-4 mr-2" /> Go Home
            </Button>
          </Link>
          <Link to="/menu">
            <Button variant="outline" className="rounded-full px-6">
              <UtensilsCrossed className="w-4 h-4 mr-2" /> Browse Menu
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
