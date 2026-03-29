import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { categories, getPopularItems, howItWorks, testimonials, businessInfo, formatPrice } from '@/lib/data';
import { useCart } from '@/hooks/useCart';
import { ArrowRight, Star, MapPin, Play, Search, ShoppingCart, ChefHat, Utensils } from 'lucide-react';

export function HomePage() {
  const { addItem } = useCart();
  const popularItems = getPopularItems().slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1920&q=80')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="text-white">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Star className="w-4 h-4 text-food-orange fill-food-orange" />
                <span className="text-sm font-medium">Ilorin&apos;s #1 Rated Food Delivery</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Delicious <span className="text-gradient bg-gradient-to-r from-food-orange to-food-red bg-clip-text text-transparent">Nigerian</span> Meals Delivered Fast
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl">
                Experience authentic flavors from Jollof Rice to Egusi Soup. Freshly prepared and delivered hot to your doorstep in Ilorin.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/menu">
                  <Button size="lg" className="bg-gradient-to-r from-food-orange to-food-red text-white px-8 py-6 text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full backdrop-blur-sm">
                  <Play className="mr-2 w-5 h-5" />Watch Video
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-food-orange" /><span>Opposite UITH, Ilorin</span></div>
                <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span className="text-white font-semibold">4.9</span><span>(2,000+ reviews)</span></div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block relative">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-10 -left-10 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1662116765994-54592f7e2d35?w=200&q=80" alt="Jollof Rice" className="w-24 h-24 rounded-xl object-cover mb-2" />
                <p className="font-semibold text-sm">Jollof Special</p>
                <p className="text-food-orange font-bold">₦4,500</p>
              </motion.div>

              <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-20 right-0 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&q=80" alt="Egusi Soup" className="w-28 h-28 rounded-xl object-cover mb-2" />
                <p className="font-semibold text-sm">Egusi Soup</p>
                <p className="text-food-orange font-bold">₦3,500</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="absolute bottom-0 right-10 bg-gradient-to-br from-food-orange to-food-red rounded-2xl p-6 text-white shadow-2xl">
                <p className="text-3xl font-bold">25-45</p>
                <p className="text-sm opacity-90">Minutes Delivery</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Browse by <span className="text-gradient">Category</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Explore our wide range of authentic Nigerian dishes</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={`/menu?category=${category.id}`}>
                  <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer text-center">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-food-orange/10 to-food-red/10 rounded-xl flex items-center justify-center mb-4 group-hover:from-food-orange group-hover:to-food-red transition-all duration-300">
                      <span className="text-2xl">{category.icon === 'Rice' ? '🍚' : category.icon === 'Soup' ? '🍲' : '🍽️'}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-food-orange transition-colors">{category.name}</h3>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">Popular <span className="text-gradient">Dishes</span></h2>
              <p className="text-gray-600 dark:text-gray-400">Most loved meals by our customers</p>
            </div>
            <Link to="/menu"><Button variant="outline" className="rounded-full">View All Menu</Button></Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {popularItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.isPopular && <span className="px-2 py-1 bg-food-orange text-white text-xs rounded-full">Popular</span>}
                      {item.tags.includes('spicy') && <span className="px-2 py-1 bg-white/90 text-red-500 text-xs rounded-full">🌶️ Spicy</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-food-orange transition-colors">{item.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4 fill-current" /><span className="text-sm font-semibold">{item.rating}</span></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-food-orange">{formatPrice(item.price)}</span>
                      <Button size="sm" onClick={() => addItem(item)} className="bg-gradient-to-r from-food-orange to-food-red rounded-full">Add to Cart</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It <span className="text-gradient">Works</span></h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <motion.div whileHover={{ scale: 1.1 }} className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} p-0.5`}>
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-4xl">
                    {step.step === 1 ? '🔍' : step.step === 2 ? '🛒' : step.step === 3 ? '📍' : '🍽️'}
                  </div>
                </motion.div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-food-orange to-food-red text-white flex items-center justify-center font-bold mx-auto mb-4">{step.step}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our <span className="text-gradient">Customers</span> Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">Visit Our <span className="text-gradient">Kitchen</span></h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Located right opposite the University of Ilorin Teaching Hospital (UITH).</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-food-orange/10 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-6 h-6 text-food-orange" /></div>
                  <div><h3 className="font-semibold text-gray-900 dark:text-white mb-1">Address</h3><p className="text-gray-600 dark:text-gray-400">{businessInfo.location}</p></div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-food-orange/10 rounded-xl flex items-center justify-center flex-shrink-0"><span className="text-2xl">📞</span></div>
                  <div><h3 className="font-semibold text-gray-900 dark:text-white mb-1">Phone</h3><p className="text-gray-600 dark:text-gray-400">{businessInfo.phone}</p></div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-16 h-16 text-food-orange mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">FOOD 101</h3>
                  <p className="text-gray-600">Opposite UITH</p>
                  <p className="text-gray-500 text-sm mt-2">Ilorin, Kwara State</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-food-orange via-food-red to-purple-600">
            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20 text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Ready to Order?</h2>
              <p className="text-white/90 text-lg mb-8">Get your favorite Nigerian meals delivered in minutes. First order gets 10% off!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/menu">
                  <Button size="lg" className="bg-white text-food-orange hover:bg-gray-100 rounded-full px-8">Order Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
