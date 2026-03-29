import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { User, Mail, Phone, MapPin, Edit2, LogOut, Camera, ShoppingBag, Star } from 'lucide-react';

export function ProfilePage() {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Sign In</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Sign in to view and manage your profile</p>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-food-orange to-food-red rounded-full text-white px-8">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-8 pb-24 lg:pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

        {/* Profile Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-food-orange to-food-red rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-gray-900 dark:bg-gray-600 text-white rounded-full flex items-center justify-center">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <p className="text-xs text-gray-400 mt-1">Member since 2024</p>
            </div>
            <Button variant="outline" onClick={() => setIsEditing(!isEditing)} className="rounded-full flex-shrink-0">
              <Edit2 className="w-4 h-4 mr-2" />{isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: ShoppingBag, label: 'Total Orders', value: '12' },
            { icon: Star, label: 'Avg Rating', value: '4.8' },
            { icon: MapPin, label: 'Saved Address', value: '2' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <Icon className="w-5 h-5 text-food-orange mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* Personal Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Personal Information</h3>
          {isEditing ? (
            <div className="space-y-4">
              {[
                { key: 'name', label: 'Full Name', icon: User, type: 'text' },
                { key: 'email', label: 'Email', icon: Mail, type: 'email' },
                { key: 'phone', label: 'Phone', icon: Phone, type: 'tel' },
                { key: 'address', label: 'Address', icon: MapPin, type: 'text' },
              ].map(({ key, label, icon: Icon, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type={type}
                      value={formData[key]}
                      onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={handleSave} className="w-full bg-gradient-to-r from-food-orange to-food-red rounded-full text-white">
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { icon: User, label: 'Name', value: user?.name },
                { icon: Mail, label: 'Email', value: user?.email },
                { icon: Phone, label: 'Phone', value: user?.phone || 'Not set' },
                { icon: MapPin, label: 'Address', value: user?.address || 'Not set' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-food-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-food-orange" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Sign Out */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Button
            variant="outline"
            onClick={logout}
            className="w-full border-red-200 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl py-4"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
