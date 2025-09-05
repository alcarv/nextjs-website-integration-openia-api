import Navigation from '@/components/Navigation';
import HumanizeText from '@/components/HumanizeText';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/Footer';

export default function HumanizarPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HumanizeText />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
