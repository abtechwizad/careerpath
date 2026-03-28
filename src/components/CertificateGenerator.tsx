import { useRef } from 'react';
import { Button } from './ui/button';
import { Download, Printer, X, Award, ShieldCheck, Globe, Trophy } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  userName: string;
  testName: string;
  date: string;
  score?: string;
  resultType?: string;
  onClose: () => void;
}

export function CertificateGenerator({
  userName,
  testName,
  date,
  score,
  resultType,
  onClose,
}: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => window.print();

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fdfdfb',
    });

    const image = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `Certificate-${userName.replace(/\s+/g, '-')}.png`;
    link.href = image;
    link.click();
  };

  const certificateID = `CP-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    /* ✅ GREEN OVERLAY */
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 backdrop-blur-md flex items-center justify-center p-4 z-[100] print:bg-white overflow-y-auto">
      <div className="w-full max-w-5xl space-y-6 print:space-y-0">

        {/* CONTROLS */}
        <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 print:hidden shadow-2xl">
          <div className="flex items-center space-x-3 text-white">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300">Preview Mode</p>
              <h3 className="font-bold">Achievement Certificate</h3>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>

            <Button onClick={handlePrint} className="bg-white text-emerald-900 hover:bg-emerald-50">
              <Printer className="mr-2 h-4 w-4" />
              Print / PDF
            </Button>

            <Button onClick={onClose} variant="ghost" className="text-white hover:bg-white/10">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* CERTIFICATE */}
        <div
          ref={certificateRef}
          className="relative bg-[#fdfdfb] aspect-[1.414/1] w-full shadow-2xl print:shadow-none border-[16px] border-emerald-900 p-1"
        >
          <div className="h-full border-2 border-emerald-900/20 p-12 flex flex-col justify-between items-center text-center">

            {/* HEADER */}
            <div className="space-y-4">
              <Award className="h-16 w-16 text-emerald-800 mx-auto" />
              <h1 className="text-6xl font-serif font-black text-slate-900">
                CERTIFICATE <span className="text-emerald-800">OF</span> ACHIEVEMENT
              </h1>
              <p className="text-slate-500">Presented to</p>
            </div>

            {/* NAME */}
            <h2 className="text-7xl font-serif italic text-emerald-950 border-b-2 border-emerald-200 px-10">
              {userName || 'Candidate Name'}
            </h2>

            {/* CONTENT */}
            <div className="max-w-3xl space-y-4">
              <p className="text-xl text-slate-600">
                Successfully completed the
                <span className="block text-3xl font-bold text-slate-900 mt-2">
                  {testName}
                </span>
              </p>

              {resultType && (
                <span className="inline-block bg-emerald-50 px-6 py-2 rounded-full border border-emerald-200 text-emerald-800 font-bold">
                  Result: {resultType}
                </span>
              )}
            </div>

            {/* FOOTER */}
            <div className="w-full grid grid-cols-3 items-end">
              <div>
                <p className="font-bold border-b mx-10">{date}</p>
                <p className="text-xs text-slate-400">Date</p>
              </div>

              <div className="flex flex-col items-center">
                <ShieldCheck className="h-10 w-10 text-emerald-900" />
                <p className="text-[10px] mt-2 font-mono text-slate-500">
                  ID: {certificateID}
                </p>
              </div>

              <div>
                <p className="font-serif italic text-xl border-b mx-10">Career Passport</p>
                <p className="text-xs text-slate-400">Authorized</p>
              </div>
            </div>

            <div className="absolute bottom-4 flex items-center gap-2 text-[10px] text-slate-400">
              <Globe className="h-3 w-3" />
              www.careerpassport.com.pk
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: landscape; margin: 0; }
          body { -webkit-print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}