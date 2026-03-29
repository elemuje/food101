import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PromoBanner } from '@/components/shared/PromoBanner';
import { FloatingCartButton } from '@/components/shared/FloatingCartButton';

import { HomePage } from '@/pages/HomePage';
import { MenuPage } from '@/pages/MenuPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { TrackPage } from '@/pages/TrackPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Pages that should not show the site chrome (Navbar / Footer)
const AUTH_PATHS = ['/login', '/signup'];

function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <PromoBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <MobileNav />
      <FloatingCartButton />
    </div>
  );
}

function App() {
  const { theme, initTheme } = useTheme();

  // Apply persisted theme class on first render
  useEffect(() => {
    initTheme(theme);
  }, []);

  return (
    <Routes>
      {/* Auth pages — minimal layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Main app — full chrome */}
      <Route
        path="*"
        element={
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/track" element={<TrackPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  );
}

export default App;
