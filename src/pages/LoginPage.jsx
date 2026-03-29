import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    login({
      id: '1',
      name: 'John Doe',
      email: formData.email,
      phone: '+234 803 123 4567',
      address: 'Opposite UITH, Ilorin',
      createdAt: new Date(),
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-food-orange to-food-red rounded-full mb-4">
              <span className="text-white font-bold text-2xl">F</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to continue ordering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-9 h-12 rounded-xl" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="pl-9 pr-10 h-12 rounded-xl" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 accent-food-orange" />
                Remember me
              </label>
              <a href="#" className="text-food-orange hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-food-orange to-food-red rounded-xl text-white text-base font-semibold">
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
              ) : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-food-orange font-medium hover:underline">Sign up free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
