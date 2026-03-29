import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { foodItems, categories, formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/hooks/useCart';
import { Search, SlidersHorizontal, X, Plus, Star, Clock, Flame, ChevronDown } from 'lucide-react';

export function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setSearchParams(catId !== 'all' ? { category: catId } : {});
  };

  const filteredItems = foodItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 pb-20">
      {/* Sticky Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-full"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="h-12 px-6 rounded-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-food-orange to-food-red text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Max Price: ₦{maxPrice.toLocaleString()}
                </label>
                <input
                  type="range" min="500" max="10000" step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-48 accent-food-orange"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Food Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.04 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {item.isPopular && (
                      <Badge className="bg-food-orange text-white border-0 text-xs">Popular</Badge>
                    )}
                    {item.tags.includes('spicy') && (
                      <Badge variant="outline" className="bg-white/90 text-red-500 border-0 text-xs">
                        <Flame className="w-3 h-3 mr-1" />Spicy
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-food-orange transition-colors text-sm">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-semibold">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.prepTime}</span>
                    <span>{item.calories} cal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-food-orange">{formatPrice(item.price)}</span>
                    <Button
                      size="sm"
                      onClick={() => addItem(item)}
                      className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">No items found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setMaxPrice(10000); }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
