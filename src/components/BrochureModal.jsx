import React from 'react';
import { X, Download, FileText, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function BrochureModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate simulated PDF brochure download
    const element = document.createElement('a');
    const file = new Blob([
      `conFiqh — Keralam Fiqh Summit 2026 OFFICIAL BROCHURE\n\n` +
      `Date: 11–12 September 2026\n` +
      `Venue: AHLUSSUFFA Dars, Parapram, Pinarayi, Kannur, Kerala\n\n` +
      `ACADEMIC TRACKS:\n` +
      `1. Decentralized Crypto Finance & Smart Contracts\n` +
      `2. Artificial Intelligence & Fatwa Limits\n` +
      `3. CRISPR Gene Editing & Bioethical Jurisprudence\n` +
      `4. Makhdoomi Shafi'i Heritage & Applied Jurisprudence\n\n` +
      `SECRETARIAT DESK:\n` +
      `Ahlussuffa Dars Complex, Parapram, Pinarayi, Kannur, Kerala 670741\n` +
      `Email: contact@confiqh.com\n`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "conFiqh_Summit_2026_Official_Brochure.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto no-scrollbar border border-brand-light">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center text-lg font-bold transition-colors"
          aria-label="Close brochure modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-gold flex items-center justify-center font-bold text-xl shadow">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-dark">
              Summit Official Brochure
            </h3>
            <p className="text-xs font-bold text-brand-medium">
              1st Edition • conFiqh 2026 Academic Prospectus
            </p>
          </div>
        </div>

        {/* Official Summit Poster Image View */}
        <div className="space-y-6">
          
          <div className="bg-[#F8FBF6] p-4 sm:p-6 rounded-2xl border border-emerald-200 shadow-sm text-center space-y-4">
            <span className="inline-block px-3 py-1 bg-[#17472B] text-white rounded-full text-xs font-extrabold uppercase tracking-wider">
              Official Summit Poster
            </span>
            
            <div className="max-w-xl mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-[#17472B] bg-white">
              <img 
                src="/Group 8.png" 
                alt="conFiqh 2026 Official Summit Poster"
                className="w-full h-auto object-contain max-h-[60vh] mx-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Schedule Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F4F8F3] p-5 rounded-2xl border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono px-2.5 py-1 bg-[#17472B] text-white rounded">
                  DAY 1 • 11 SEPT 2026
                </span>
                <span className="text-xs font-bold text-emerald-800">09:00 AM – 05:00 PM</span>
              </div>
              <h5 className="font-bold text-[#17472B] text-base mb-2">Shafi'i Heritage & AI Limits</h5>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                <li>Inaugural Keynote: Makhdoomi Tradition in Kerala</li>
                <li>Panel 1: AI Fatwa Limits & Algorithmic Guardrails</li>
                <li>Paper Presentations: Shafi'i Maritime Legal History</li>
              </ul>
            </div>

            <div className="bg-[#F4F8F3] p-5 rounded-2xl border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono px-2.5 py-1 bg-[#17472B] text-white rounded">
                  DAY 2 • 12 SEPT 2026
                </span>
                <span className="text-xs font-bold text-emerald-800">09:30 AM – 04:30 PM</span>
              </div>
              <h5 className="font-bold text-[#17472B] text-base mb-2">Crypto Finance & CRISPR Bioethics</h5>
              <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                <li>Panel 2: Decentralized Crypto Yields & Smart Contract Gharar</li>
                <li>Panel 3: CRISPR Germline Editing & Genomic Jurisprudence</li>
                <li>Valedictory Resolution & Declaration</li>
              </ul>
            </div>
          </div>

          {/* Secretariat info */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#17472B]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>AHLUSSUFFA Dars Complex, Parapram, Pinarayi, Kannur, Kerala 670741</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>11–12 September 2026</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-[#17472B] hover:bg-[#20603B] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Download Official Poster & Prospectus</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all text-center cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
