import React from 'react';
import { Mail } from 'lucide-react';
import confiqLogo from '../assets/CONFIQ.png';

export default function Footer({ onOpenBrochure, scrollToSection }) {
  return (
    <footer className="bg-white text-gray-800 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top 3-column layout matching PDF */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-gray-200">

          {/* Left Column matching user logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 sm:space-x-2.5">
              <img 
                src={confiqLogo} 
                alt="CONFIQ Logo" 
                className="h-6 sm:h-7 md:h-8 w-auto object-contain select-none drop-shadow-xs"
              />
              <span className="inline-block px-2 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-black bg-[#17472B] text-white uppercase tracking-wider shadow-xs">
                1ST EDITION
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              An annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh.
            </p>

            <div className="text-xs sm:text-sm font-bold text-[#17472B]">
              AHLUSSUFFA Dars • Parapram, Pinarayi, Kannur, Kerala
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#17472B] mb-3 sm:mb-4">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold text-gray-600">
              <li>
                <button onClick={() => scrollToSection('tracks')} className="hover:text-[#17472B] transition-colors text-left">
                  Academic Tracks
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('sessions')} className="hover:text-[#17472B] transition-colors text-left">
                  Scheduled Sessions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('countdown')} className="hover:text-[#17472B] transition-colors text-left">
                  Summit Countdown
                </button>
              </li>
              <li>
                <button onClick={onOpenBrochure} className="hover:text-[#17472B] transition-colors text-left">
                  Download Brochure
                </button>
              </li>
            </ul>
          </div>

          {/* Secretariat Desk Column */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs font-black uppercase tracking-widest text-[#17472B] mb-3 sm:mb-4">
              SECRETARIAT DESK
            </h4>

            <div className="space-y-1.5 text-xs sm:text-sm text-gray-600">
              <p className="font-bold text-[#17472B]">Ahlussuffa Dars Complex</p>
              <p>Parapram, Pinarayi, Kannur</p>
              <p>Kerala 670741, India</p>

              <div className="pt-2">
                <a
                  href="mailto:contact@confiqh.com"
                  className="inline-flex items-center gap-1.5 text-[#17472B] font-bold hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>contact@confiqh.com</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[11px] text-gray-500 gap-4 text-center sm:text-left">

          <div className="flex items-center gap-2.5">
            {/* Green Circle Badge updated from N to C for CON FIQH */}
            <div className="w-6 h-6 rounded-full bg-[#17472B] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs select-none">
              C
            </div>
            <span className="font-medium text-gray-700">
              © 2026 CON FIQH • AHLUSSUFFA Dars. All Rights Reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 font-medium text-gray-600">
            <span className="font-mono text-[#17472B] font-bold">www.confiqh.com</span>
            <span className="text-gray-300">•</span>
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Delegate registration data is strictly used for summit organization.'); }} 
              className="hover:text-[#17472B] transition-colors"
            >
              Privacy
            </a>
            <span className="text-gray-300">•</span>
            <a 
              href="#terms" 
              onClick={(e) => { e.preventDefault(); alert('Terms: Registration is subject to eligibility requirements for scholars and students.'); }} 
              className="hover:text-[#17472B] transition-colors"
            >
              Terms
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
