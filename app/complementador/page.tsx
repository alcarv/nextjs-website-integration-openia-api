import Navigation from '@/components/Navigation';
import HumanizeText from '@/components/HumanizeText';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';

export default function ComplementadorPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HumanizeText />
      <Footer />
      <Toaster />
    </div>
  );
}

