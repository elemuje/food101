import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react';

export function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    login({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: '',
      createdAt: new Date(),
    });
    navigate('/');
  };

  const fields = [
    { key: 'name', label: 'Full Name', icon: User, type: 'text', placeholder: 'John Doe' },
    { key: 'email', label: 'Email Address', icon: Mail, type: 'email', placeholder: 'you@example.com' },
    { key: 'phone', label: 'Phone Number', icon: Phone, type: 'tel', placeholder: '+234 803 123 4567' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-food-orange to-food-red rounded-full mb-4">
              <span className="text-white font-bold text-2xl">F</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
            <p className="text-gray-500 text-sm mt-1">Join FOOD 101 and start ordering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ key, label, icon: Icon, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type={type} required value={formData[key]} onChange={(e) => setFormData({ ...formData, [key]: e.target.value })} className="pl-9 h-12 rounded-xl" placeholder={placeholder} />
                </div>
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="pl-9 pr-10 h-12 rounded-xl" placeholder="Min. 8 characters" minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              By signing up you agree to our{' '}
              <a href="#" className="text-food-orange hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-food-orange hover:underline">Privacy Policy</a>.
            </p>

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-food-orange to-food-red rounded-xl text-white text-base font-semibold">
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-food-orange font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
