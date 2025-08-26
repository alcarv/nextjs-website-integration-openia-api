'use client';

import Navigation from '@/components/Navigation';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setShowAuthModal(!user);
  }, [user]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {user ? (
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          <p className="text-gray-700">Finalize sua assinatura do plano premium.</p>
        </div>
      ) : null}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

