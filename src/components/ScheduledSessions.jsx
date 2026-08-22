import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, Sparkles, BookOpen } from 'lucide-react';

export default function ScheduledSessions({ sessionsData, onExploreAllSessions }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bioModalSpeaker, setBioModalSpeaker] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const defaultSessions = [
    {
      id: 'session-1',
      speakerName: 'Zack Wilson',
      flag: '🇬🇧',
      role: 'Senior Product Designer at Meta',
      affiliation: 'Lead Researcher in AI Fatwa Limits & UX Guardrails',
      photo: '/zack_wilson.jpg',
      tags: ['UX/UI design', 'Product design', 'Copywriting'],
      bio: 'Zack Wilson is a Senior Product Designer at Meta with over 12 years of experience designing complex algorithmic interfaces and human-AI interaction patterns.',
      abstract: 'This session explores how user interfaces can transparently signal AI confidence levels, prevent automated fatwa hallucinations, and preserve human scholarly authority in digital legal consultations.'
    },
    {
      id: 'session-2',
      speakerName: 'Dr. Abdullah Al-Makhdoomi',
      flag: '🇮🇳',
      role: 'Professor of Shafi\'i Jurisprudence',
      affiliation: 'Ahlussuffa Dars Complex & Ponnani Research Chair',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      tags: ['Shafi\'i Fiqh', 'Makhdoomi Legacy', 'Maritime Trade'],
      bio: 'Dr. Abdullah Al-Makhdoomi is a distinguished scholar of classical Shafi\'ite jurisprudence and author of 14 treatises on Indian Ocean maritime legal history.',
      abstract: 'An analytical review of how 16th-century Shafi\'i jurists in Malabar resolved novel trade contracts and maritime disputes.'
    },
    {
      id: 'session-3',
      speakerName: 'Sheikh Ibrahim Al-Kerali',
      flag: '🇦🇪',
      role: 'Islamic Finance & Crypto Ethicist',
      affiliation: 'Advisor to Global Decentralized Finance Protocols',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      tags: ['DeFi Yields', 'Smart Contracts', 'Crypto Fiqh'],
      bio: 'Sheikh Ibrahim Al-Kerali is a pioneer in Islamic Fintech and cryptocurrency jurisprudence.',
      abstract: 'Evaluating liquidity pool staking, automated market makers (AMMs), and algorithmic stablecoins under traditional legal maxims.'
    }
  ];

  const sessions = sessionsData && sessionsData.length > 0 ? sessionsData : defaultSessions;
  const currentSession = sessions[currentSlide] || sessions[0];

  // Automatic sliding timer (every 4 seconds)
  useEffect(() => {
    if (sessions.length <= 1 || isPaused || bioModalSpeaker) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sessions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [sessions.length, isPaused, bioModalSpeaker]);

  const handleExploreClick = () => {
    if (onExploreAllSessions) {
      onExploreAllSessions();
    } else {
      window.location.hash = '#all-sessions';
    }
  };

  return (
    <section id="sessions" className="py-14 sm:py-24 bg-[#EBF5DA]/40 border-t border-[#D5E0D2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-10 sm:mb-14">
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#123C2C] uppercase tracking-tight">
            SCHEDULED <span className="font-black text-[#123C2C]">SESSIONS</span>
          </h2>

          <button 
            onClick={handleExploreClick}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123C2C] hover:underline self-start sm:self-auto group cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Explore all Sessions</span>
          </button>
        </div>

        {/* Layered Cards Deck Container matching Model Screenshot */}
        <div 
          className="relative max-w-5xl mx-auto my-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Layer 1: Outermost Left Blue Deck Card */}
          <div className="absolute inset-y-3 -left-12 -right-12 bg-[#0E6E8E] rounded-[36px] transform scale-95 opacity-90 hidden sm:block shadow-md pointer-events-none" />

          {/* Layer 2: Middle Olive-Green Deck Card */}
          <div className="absolute inset-y-2 -left-6 -right-6 bg-[#4B6338] rounded-[36px] transform scale-[0.98] opacity-95 hidden sm:block shadow-md pointer-events-none" />

          {/* Layer 3: Right Stacked Card Accents */}
          <div className="absolute inset-y-2.5 -right-6 w-16 bg-[#2E7D32] rounded-r-[36px] hidden sm:block opacity-90 pointer-events-none" />
          <div className="absolute inset-y-3.5 -right-12 w-16 bg-[#17472B] rounded-r-[36px] hidden sm:block opacity-90 pointer-events-none" />

          {/* Foreground Main White Card */}
          <div className="relative bg-white rounded-[32px] sm:rounded-[36px] shadow-2xl border border-gray-100/80 overflow-hidden z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 items-center">
              
              {/* Left Column: Speaker Portrait with Ambient Aura Background */}
              <div className="md:col-span-5 h-72 sm:h-80 md:h-[360px] bg-gradient-to-tr from-amber-50/80 via-purple-50/70 to-pink-50/80 flex items-end justify-center relative overflow-hidden">
                <img
                  src={currentSession.photo}
                  alt={currentSession.speakerName}
                  className="w-full h-full object-cover object-top md:object-cover scale-100 hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/zack_wilson.jpg';
                  }}
                />
              </div>

              {/* Right Column: Speaker Details & Actions */}
              <div className="md:col-span-7 p-6 sm:p-10 space-y-4 sm:space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#123C2C]">
                      {currentSession.speakerName}
                    </h3>
                    <span className="text-xl sm:text-2xl shrink-0">{currentSession.flag}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
                    {currentSession.role}
                  </p>
                </div>

                {/* "Helping with:" Tags Section */}
                <div>
                  <span className="text-xs font-semibold text-gray-500 block mb-2">
                    Helping with:
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(currentSession.tags) ? currentSession.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#F0F2F5] text-gray-800 border border-gray-200 shadow-2xs"
                      >
                        {tag}
                      </span>
                    )) : (
                      <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#F0F2F5] text-gray-800 border border-gray-200">
                        {currentSession.tags}
                      </span>
                    )}
                  </div>
                </div>

                {/* Horizontal Divider */}
                <div className="w-full h-px bg-gray-200/90 pt-0 my-2" />

                {/* Action Buttons: [ About ] and [ Book lector ] */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => setBioModalSpeaker(currentSession)}
                    className="px-8 py-2.5 rounded-2xl border-2 border-gray-900 text-gray-900 font-extrabold text-xs sm:text-sm bg-white hover:bg-gray-50 transition-all cursor-pointer shadow-xs"
                  >
                    About
                  </button>

                  <button
                    onClick={() => setBioModalSpeaker(currentSession)}
                    className="px-8 py-2.5 rounded-2xl bg-[#5B50EE] hover:bg-[#4E43E0] text-white font-extrabold text-xs sm:text-sm transition-all cursor-pointer shadow-md hover:shadow-lg"
                  >
                    Book lector
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Carousel Dots with elongated active indicator matching screenshot */}
        <div className="flex items-center justify-center space-x-1.5 mt-8 sm:mt-10">
          {sessions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx 
                  ? 'w-10 bg-[#123C2C]' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Speaker Bio Modal */}
      {bioModalSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setBioModalSpeaker(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#EEF3EA] shadow border-2 border-[#17472B] shrink-0">
                <img
                  src={bioModalSpeaker.photo}
                  alt={bioModalSpeaker.speakerName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/zack_wilson.jpg';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-xl sm:text-2xl font-black text-[#123C2C]">
                    {bioModalSpeaker.speakerName}
                  </h3>
                  <span className="text-xl">{bioModalSpeaker.flag}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-600 mt-0.5">
                  {bioModalSpeaker.role}
                </p>
                {bioModalSpeaker.affiliation && (
                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {bioModalSpeaker.affiliation}
                  </p>
                )}
              </div>
            </div>

            {bioModalSpeaker.bio && (
              <div className="mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                  Speaker Biography
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {bioModalSpeaker.bio}
                </p>
              </div>
            )}

            {bioModalSpeaker.abstract && (
              <div className="bg-[#F4F8F1] p-4 rounded-2xl border border-emerald-200 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#123C2C] block mb-1.5">
                  Session Topic Abstract:
                </span>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  {bioModalSpeaker.abstract}
                </p>
              </div>
            )}

            <button
              onClick={() => setBioModalSpeaker(null)}
              className="w-full py-3 bg-[#123C2C] hover:bg-[#1C5842] text-white rounded-xl font-bold text-xs sm:text-sm shadow cursor-pointer transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
