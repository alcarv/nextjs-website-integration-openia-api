import Navigation from '@/components/Navigation';
import HumanizeText from '@/components/HumanizeText';
import { Toaster } from '@/components/ui/toaster';

export default function HumanizarPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HumanizeText />
      <Toaster />
    </div>
  );
}