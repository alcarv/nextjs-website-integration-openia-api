import { Button } from '@/components/ui/button';
import { ArrowRight, Scale, PenTool, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { getWhatsAppUrl } from '@/lib/whatsapp';

export default function Hero() {
  return (
    <section className="gradient-bg py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-gradient">Assessoria Acadêmica, Elaboração</span> e{' '}
              <span className="text-gradient">Humanização de Textos</span> com Excelência
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed text-justify">
              Auxílio personalizado para alunos de graduação, mestrado e doutorado. Desde a elaboração completa de trabalhos, até a paráfrase e humanização acadêmica, entrego textos consistentes, aprofundados e livres de marcas artificiais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link
                  href={getWhatsAppUrl('Olá! Gostaria de agendar uma consulta')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Falar Diretamente com a Dra. Ruth Monielly
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Link href="/humanizar" className="flex items-center">
                  Humanizar Texto
                  <PenTool className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex items-start gap-3 rounded-xl border border-blue-200 bg-white/70 px-4 py-3 text-left shadow-sm backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" />
                <p className="text-sm text-gray-700 max-w-xl">
                  <span className="font-medium">Garantia de originalidade:</span> Todas as opções, humanização, paráfrase ou complemento, entregam textos livres de inteligência artificial, com escrita 100% autoral.
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Scale className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Assessoria Acadêmica</h3>
                    <p className="text-gray-600 text-sm">Acompanhamento especializado em todos os tipos de trabalhos, incluindo artigos, TCCs, dissertações e teses.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                  <PenTool className="h-8 w-8 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Revisão e Normalização</h3>
                    <p className="text-gray-600 text-sm">Adequação às normas ABNT e APA, com precisão e técnica.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <Shield className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Humanização e Paráfrase</h3>
                    <p className="text-gray-600 text-sm">Transformação de textos artificiais em produções autênticas, profundas e consistentes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
