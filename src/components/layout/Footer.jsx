import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-food-dark text-white pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-food-orange to-food-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gradient">FOOD 101</h2>
                <p className="text-xs text-gray-400">Ilorin's Finest</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Authentic Nigerian meals delivered hot and fresh to your doorstep. Serving Ilorin with pride since 2020.
            </p>
            <div className="flex gap-3 mt-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-food-orange transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[['/', 'Home'], ['/menu', 'Menu'], ['/orders', 'My Orders'], ['/track', 'Track Order'], ['/profile', 'Profile']].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="hover:text-food-orange transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu Categories */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {['Rice Dishes', 'Swallows', 'Soups', 'Proteins', 'Snacks', 'Drinks', 'Breakfast'].map((cat) => (
                <li key={cat}>
                  <Link to={`/menu?category=${cat.toLowerCase().split(' ')[0]}`} className="hover:text-food-orange transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-food-orange mt-0.5 flex-shrink-0" />
                <span>Opposite UITH, Ilorin, Kwara State, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-food-orange flex-shrink-0" />
                <span>+234 803 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-food-orange flex-shrink-0" />
                <span>hello@food101.ng</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-food-orange mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon–Fri: 7AM – 10PM</p>
                  <p>Sat–Sun: 8AM – 11PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FOOD 101. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-food-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-food-orange transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
