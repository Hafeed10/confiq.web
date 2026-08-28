import React from 'react';
import { X, Download, FileText, Calendar, MapPin } from 'lucide-react';
import group8Poster from '../../assets/Group 8.png';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 xs:p-5 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar border border-[#D5E0D2]">
        
        {/* Close Button with safe top-right spacing */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center text-lg font-bold transition-colors z-20 cursor-pointer shrink-0 shadow-xs"
          aria-label="Close brochure modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header with padding to avoid close button overlap */}
        <div className="flex items-start xs:items-center gap-2.5 sm:gap-3.5 mb-5 sm:mb-6 pr-10 sm:pr-12">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#17472B] text-[#D8ECC0] flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-sans text-lg xs:text-xl sm:text-2xl font-extrabold text-[#123C2C] leading-tight">
              Summit Official Brochure
            </h3>
            <p className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-gray-500 mt-0.5 truncate">
              1st Edition • conFiqh 2026 Academic Prospectus
            </p>
          </div>
        </div>

        {/* Official Summit Poster Image View */}
        <div className="space-y-4 sm:space-y-6">
          
          <div className="bg-[#F8FBF6] p-3.5 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs text-center space-y-3">
            <span className="inline-block px-3 py-1 bg-[#17472B] text-white rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
              Official Summit Poster
            </span>
            
            <div className="max-w-md mx-auto rounded-xl overflow-hidden shadow-xs border border-[#17472B]/20 bg-white p-3">
              <img 
                src={group8Poster} 
                alt="conFiqh 2026 Official Summit Poster"
                className="w-full h-auto object-contain max-h-[40vh] mx-auto"
              />
            </div>
          </div>

          {/* Schedule Highlights with Responsive Wrap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-[#F4F8F3] p-4 sm:p-5 rounded-2xl border border-emerald-200/80">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                <span className="text-[10px] xs:text-[11px] font-bold font-mono px-2 py-0.5 bg-[#17472B] text-white rounded-md shrink-0">
                  DAY 1 • 11 SEPT 2026
                </span>
                <span className="text-[10px] xs:text-[11px] font-extrabold text-emerald-800 shrink-0">
                  09:00 AM – 05:00 PM
                </span>
              </div>
              <h5 className="font-bold text-[#17472B] text-xs sm:text-sm mb-1.5">
                Shafi'i Heritage & AI Limits
              </h5>
              <ul className="text-[11px] xs:text-xs text-gray-700 space-y-1 list-disc list-inside">
                <li>Inaugural Keynote: Makhdoomi Tradition in Kerala</li>
                <li>Panel 1: AI Fatwa Limits & Algorithmic Guardrails</li>
                <li>Paper Presentations: Shafi'i Maritime Legal History</li>
              </ul>
            </div>

            <div className="bg-[#F4F8F3] p-4 sm:p-5 rounded-2xl border border-emerald-200/80">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                <span className="text-[10px] xs:text-[11px] font-bold font-mono px-2 py-0.5 bg-[#17472B] text-white rounded-md shrink-0">
                  DAY 2 • 12 SEPT 2026
                </span>
                <span className="text-[10px] xs:text-[11px] font-extrabold text-emerald-800 shrink-0">
                  09:30 AM – 04:30 PM
                </span>
              </div>
              <h5 className="font-bold text-[#17472B] text-xs sm:text-sm mb-1.5">
                Crypto Finance & CRISPR Bioethics
              </h5>
              <ul className="text-[11px] xs:text-xs text-gray-700 space-y-1 list-disc list-inside">
                <li>Panel 2: Decentralized Crypto Yields & Smart Contract Gharar</li>
                <li>Panel 3: CRISPR Germline Editing & Genomic Jurisprudence</li>
                <li>Valedictory Resolution & Declaration</li>
              </ul>
            </div>
          </div>

          {/* Secretariat info */}
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[11px] sm:text-xs font-semibold text-[#17472B]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>AHLUSSUFFA Dars Complex, Parapram, Pinarayi</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>11–12 September 2026</span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all text-center cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto bg-[#17472B] hover:bg-[#20603B] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-300 shrink-0" />
            <span>Download Official Poster</span>
          </button>
        </div>

      </div>
    </div>
  );
}
