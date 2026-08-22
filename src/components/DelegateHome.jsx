import React from 'react';
import { 
  User, CheckCircle, Printer, LogOut, Layers, Calendar, Clock, 
  Download, Sparkles, Award, MapPin, Building2, Phone, BookOpen, 
  ShieldCheck, FileText, ArrowRight
} from 'lucide-react';
import AcademicTracks from './AcademicTracks';
import ScheduledSessions from './ScheduledSessions';
import CountdownSection from './CountdownSection';
import GeometricPatternDivider from './GeometricPatternDivider';
import Footer from './Footer';

import confiqLogo from '../assets/CONFIQ.png';
import group8Img from '../assets/Group 8.png';
import vectorSmartObj from '../assets/Vector Smart Object.png';

export default function DelegateHome({ 
  currentUser, 
  onLogout, 
  onOpenBrochure, 
  scrollToSection,
  sessionsData,
  tracksData,
  onOpenRegister
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-textDark font-sans selection:bg-brand-dark selection:text-white flex flex-col animate-fadeIn">
      
      {/* Print CSS Rules for Official Badge */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #home-printable-badge, #home-printable-badge * {
            visibility: visible !important;
          }
          #home-printable-badge {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 450px !important;
            margin: 0 !important;
            padding: 28px !important;
            background: #17472B !important;
            color: #ffffff !important;
            border: 4px solid #354823 !important;
            border-radius: 24px !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* 1. Delegate Dashboard Header / Welcome Section */}
      <section className="bg-gradient-to-b from-[#E2F0C8] via-[#EBF5DA] to-brand-bg pt-6 pb-10 border-b border-[#C5DF9F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Banner Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-[#17472B]/20 shadow-xl relative overflow-hidden">
            
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#17472B]/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Left Column: Greeting, CONFIQ Logo & Info */}
              <div className="space-y-4 max-w-2xl">
                
                <div className="flex flex-wrap items-center gap-3">
                  <img 
                    src={confiqLogo} 
                    alt="CONFIQ Logo" 
                    className="h-10 sm:h-12 w-auto object-contain select-none"
                  />
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17472B] text-white rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    <span>Authenticated Delegate Portal</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-[#17472B] tracking-tight leading-tight">
                  Ahlan wa Sahlan, {currentUser?.fullName || 'Delegate'}!
                </h1>

                {/* Vector Smart Object Badge */}
                <div>
                  <img 
                    src={vectorSmartObj} 
                    alt="Keralam Fiqh Summit 2026" 
                    className="h-9 sm:h-10 w-auto object-contain select-none"
                  />
                </div>

                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                  Welcome to your official <strong>conFiqh 2026</strong> Delegate Home. You have full access to academic tracks, research session abstracts, speaker schedules, and delegate resources.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Status: {currentUser?.status || 'Student'}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-200">
                    <Award className="w-3.5 h-3.5 text-amber-700" />
                    Study Range: {currentUser?.studyRange || 'Muthawwal'}
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-900 rounded-xl text-xs font-bold border border-blue-200">
                    <Building2 className="w-3.5 h-3.5 text-blue-700" />
                    {currentUser?.status === 'Student' ? (currentUser?.campus || 'Ahlussuffa Dars') : (currentUser?.position || 'Delegate')}
                  </span>
                </div>
              </div>

              {/* Right Column: Date Graphic & Pass Badge Action */}
              <div className="w-full lg:w-auto shrink-0 flex flex-col items-center lg:items-end gap-4">
                
                {/* Group 8.png Image Date & Location */}
                <div className="bg-[#EBF5DA]/80 p-2.5 rounded-2xl border border-[#C5DF9F] shadow-sm">
                  <img 
                    src={group8Img} 
                    alt="11-12 Sept 2026 Location" 
                    className="h-16 sm:h-20 w-auto object-contain select-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full">
                  <button
                    onClick={handlePrint}
                    className="bg-[#17472B] hover:bg-[#20603B] text-white px-6 py-3 rounded-2xl font-extrabold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#354823]"
                  >
                    <Printer className="w-4 h-4 text-amber-300" />
                    <span>Print Delegate Badge</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="bg-gray-100 hover:bg-red-50 hover:text-red-700 text-gray-700 px-5 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Official Printable Delegate Badge Banner */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div id="home-printable-badge" className="bg-[#17472B] text-white rounded-2xl p-5 sm:p-6 shadow-xl border-4 border-[#354823] space-y-4">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#354823] pb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={confiqLogo} 
                      alt="CONFIQ Logo" 
                      className="h-8 w-auto object-contain brightness-200 contrast-200"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                        Annual Kerala Fiqh Summit • 1st Edition
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#354823] text-[#C5DF9F] font-mono text-xs font-bold rounded-xl border border-[#C5DF9F]/30">
                    PASS ID: {currentUser?.id || 'CF-2026-6249'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Delegate Name</span>
                    <span className="font-extrabold text-base text-white">{currentUser?.fullName || 'Registered Delegate'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Study Range / Status</span>
                    <span className="font-bold text-white">{currentUser?.studyRange || 'Muthawwal'} • {currentUser?.status || 'Student'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Campus / Designation</span>
                    <span className="font-bold text-white">{currentUser?.campus || currentUser?.position || 'Ahlussuffa Dars'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#354823] flex flex-wrap items-center justify-between text-[11px] text-emerald-200 font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" /> Ahlussuffa Dars, Parapram, Pinarayi, Kannur
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" /> Sept 11–12, 2026
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-700/80 text-white rounded font-mono font-bold text-[10px]">
                    PAYMENT: {currentUser?.paymentStatus || 'PAID ₹200 ✓'}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Main Delegate Home Content */}
      <main className="flex-grow">

        {/* Quick Delegate Action Bar */}
        <section className="py-6 bg-[#EBF5DA]/50 border-b border-[#C5DF9F]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex items-center gap-2 text-[#17472B] font-extrabold text-sm sm:text-base">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Delegate Navigation:</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => scrollToSection && scrollToSection('tracks')}
                  className="px-4 py-2 bg-white hover:bg-[#DDF0C2] text-[#17472B] rounded-xl text-xs font-bold shadow-xs border border-[#C5DF9F] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#387B52]" />
                  <span>Academic Tracks</span>
                </button>

                <button
                  onClick={() => scrollToSection && scrollToSection('sessions')}
                  className="px-4 py-2 bg-white hover:bg-[#DDF0C2] text-[#17472B] rounded-xl text-xs font-bold shadow-xs border border-[#C5DF9F] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#387B52]" />
                  <span>Scheduled Sessions</span>
                </button>

                <button
                  onClick={() => scrollToSection && scrollToSection('countdown')}
                  className="px-4 py-2 bg-white hover:bg-[#DDF0C2] text-[#17472B] rounded-xl text-xs font-bold shadow-xs border border-[#C5DF9F] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-[#387B52]" />
                  <span>Countdown</span>
                </button>

                <button
                  onClick={() => onOpenBrochure && onOpenBrochure()}
                  className="px-4 py-2 bg-[#17472B] hover:bg-[#20603B] text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download Brochure</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* Academic Tracks Grid */}
        <AcademicTracks 
          onOpenRegister={onOpenRegister || (() => {})}
          tracksData={tracksData}
        />

        {/* Scheduled Sessions Carousel */}
        <ScheduledSessions 
          onOpenRegister={onOpenRegister || (() => {})}
          sessionsData={sessionsData}
        />

        {/* Geometric Pattern Divider */}
        <GeometricPatternDivider />

        {/* Countdown & Live Stats */}
        <CountdownSection 
          onOpenRegister={onOpenRegister || (() => {})}
        />

      </main>

      {/* Footer & Secretariat Desk */}
      <Footer 
        onOpenRegister={onOpenRegister || (() => {})}
        onOpenBrochure={onOpenBrochure || (() => {})}
        scrollToSection={scrollToSection || (() => {})}
      />

    </div>
  );
}
