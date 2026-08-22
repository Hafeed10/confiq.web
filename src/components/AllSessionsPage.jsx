import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  BookOpen, 
  X, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  MessageSquareQuote,
  Layers,
  Award,
  Globe
} from 'lucide-react';
import confiqLogo from '../assets/CONFIQ.png';

export default function AllSessionsPage({ onBackToHome, onOpenBrochure, sessionsData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [selectedBioSpeaker, setSelectedBioSpeaker] = useState(null);

  // Accordion state tracking for individual cards
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [expandedBios, setExpandedBios] = useState({});

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  // Extract all unique tags
  const allTags = ['ALL', ...new Set(
    sessions.flatMap((s) => (Array.isArray(s.tags) ? s.tags : [s.tags])).filter(Boolean)
  )];

  // Filtered sessions
  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      (s.speakerName && s.speakerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.role && s.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.affiliation && s.affiliation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.abstract && s.abstract.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.bio && s.bio.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (Array.isArray(s.tags)
        ? s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        : String(s.tags).toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === 'ALL' ||
      (Array.isArray(s.tags) ? s.tags.includes(selectedTag) : s.tags === selectedTag);

    return matchesSearch && matchesTag;
  });

  const toggleAbstract = (id) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBio = (id) => {
    setExpandedBios((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#F7FAF4] text-[#123C2C] font-sans selection:bg-[#17472B] selection:text-white flex flex-col">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#EBF5DA]/95 backdrop-blur-md border-b border-[#C5DF9F]/80 shadow-xs py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 sm:h-14">
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={onBackToHome}>
            <img
              src={confiqLogo}
              alt="CONFIQ Logo"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain drop-shadow-xs"
            />
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-black bg-[#17472B] text-white uppercase tracking-wider shadow-xs">
              1ST EDITION
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="bg-white hover:bg-gray-100 text-[#17472B] border border-[#C5DF9F] px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            {onOpenBrochure && (
              <button
                onClick={onOpenBrochure}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Brochure</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section of Sessions Page */}
      <section className="bg-[#EBF5DA] py-10 sm:py-14 border-b border-[#C5DF9F]/70 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#17472B]/10 border border-[#17472B]/20 text-[#17472B] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Summit Program</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#123C2C] tracking-tight mb-4 leading-tight">
            All Scheduled Sessions & Speakers
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-3xl leading-relaxed mb-8 font-medium">
            Explore the comprehensive roster of keynote lectures, scholarly research panels, and applied jurisprudence presentations taking place across the two days of conFiqh 2026.
          </p>

          {/* Search & Tag Filtering Bar */}
          <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#C5DF9F] shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search speaker name, topic, institution, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#123C2C] focus:outline-none focus:border-[#17472B] bg-[#F9FBF8]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Tag Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-[#17472B] text-white shadow-xs'
                      : 'bg-[#EEF3EA] text-[#123C2C] hover:bg-[#DDF0C2]'
                  }`}
                >
                  {tag === 'ALL' ? 'All Topics' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Sessions Feed matching User Wireframe Model */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-grow w-full">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-black text-[#123C2C] uppercase tracking-wide">
            {filteredSessions.length} {filteredSessions.length === 1 ? 'Session' : 'Sessions'} Available
          </h2>
          {searchQuery && (
            <span className="text-xs font-medium text-gray-600">
              Showing results for "<span className="font-bold text-[#17472B]">{searchQuery}</span>"
            </span>
          )}
        </div>

        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#EEF3EA] text-[#17472B] flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#123C2C]">No sessions match your search</h3>
            <p className="text-xs text-gray-600">
              Try adjusting your search terms or selecting "All Topics" to view all available sessions.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('ALL');
              }}
              className="bg-[#17472B] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-xs hover:bg-[#20603B]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* Stacked Wide Card Model layout */
          <div className="space-y-6 sm:space-y-8">
            {filteredSessions.map((session) => {
              const tags = Array.isArray(session.tags) ? session.tags : [session.tags];
              const isAbstractOpen = !!expandedAbstracts[session.id];
              const isBioOpen = !!expandedBios[session.id];

              return (
                <div
                  key={session.id}
                  className="bg-white rounded-3xl border-2 border-[#D5E0D2] hover:border-[#17472B]/60 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group"
                >
                  {/* Top-left Message / Quote Floating Badge from diagram */}
                  <div className="absolute top-0 left-0 bg-[#17472B] text-white px-3.5 py-1.5 rounded-br-2xl flex items-center gap-1.5 z-10 shadow-xs">
                    <MessageSquareQuote className="w-4 h-4 text-emerald-300" />
                    <span className="text-[10px] font-black uppercase tracking-wider">
                      Keynote Speaker
                    </span>
                  </div>

                  <div className="p-5 sm:p-8 pt-9 sm:pt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                      
                      {/* LEFT COLUMN: Large Circular Speaker Avatar & Metadata matching diagram */}
                      <div className="lg:col-span-4 flex flex-col items-center text-center">
                        {/* Circular Speaker Avatar */}
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-[#17472B] bg-[#EEF3EA] shadow-md relative shrink-0">
                          <img
                            src={session.photo}
                            alt={session.speakerName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/zack_wilson.jpg';
                            }}
                          />
                        </div>

                        {/* Speaker Name with Flag */}
                        <div className="mt-4 flex items-center justify-center gap-2">
                          <h3 className="font-sans text-xl sm:text-2xl font-black text-[#123C2C]">
                            {session.speakerName}
                          </h3>
                          <span className="text-xl shrink-0">{session.flag}</span>
                        </div>

                        {/* Role & Affiliation */}
                        <p className="text-xs sm:text-sm font-bold text-gray-700 mt-1 max-w-xs">
                          {session.role}
                        </p>
                        
                        {session.affiliation && (
                          <p className="text-[11px] sm:text-xs font-semibold text-emerald-800 mt-1 max-w-xs">
                            {session.affiliation}
                          </p>
                        )}

                        {/* Underline accent from sketch */}
                        <div className="w-16 h-1 bg-[#17472B] rounded-full mt-3 opacity-80" />
                      </div>

                      {/* RIGHT COLUMN: Tags, 2 Accordion Bars with Down Arrows, & Action Button */}
                      <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
                        
                        {/* 1. Top Tags Pills Row matching sketch */}
                        <div className="flex flex-wrap items-center gap-2">
                          {tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-xl text-xs font-extrabold bg-[#EBF5DA] text-[#17472B] border border-[#C5DF9F] shadow-xs"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        {/* 2. Accordion Bar 1: Session Abstract Dropdown Bar with Down Arrow */}
                        <div className="rounded-2xl border-2 border-gray-200 overflow-hidden bg-[#FBFDF9] transition-all">
                          <button
                            onClick={() => toggleAbstract(session.id)}
                            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-emerald-50/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <BookOpen className="w-4 h-4 text-[#17472B]" />
                              <span className="font-extrabold text-xs sm:text-sm text-[#123C2C]">
                                Session Abstract & Focus
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#17472B] bg-[#EBF5DA] px-2.5 py-1 rounded-lg">
                              <span>{isAbstractOpen ? 'Hide' : 'Read'}</span>
                              {isAbstractOpen ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </button>

                          {isAbstractOpen && (
                            <div className="px-4 pb-4 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white">
                              <p className="font-medium">{session.abstract || 'Detailed abstract not provided.'}</p>
                            </div>
                          )}
                        </div>

                        {/* 3. Accordion Bar 2: Speaker Biography Dropdown Bar with Down Arrow */}
                        <div className="rounded-2xl border-2 border-gray-200 overflow-hidden bg-[#FBFDF9] transition-all">
                          <button
                            onClick={() => toggleBio(session.id)}
                            className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-emerald-50/50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <Award className="w-4 h-4 text-[#17472B]" />
                              <span className="font-extrabold text-xs sm:text-sm text-[#123C2C]">
                                Speaker Biography & Background
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#17472B] bg-[#EBF5DA] px-2.5 py-1 rounded-lg">
                              <span>{isBioOpen ? 'Hide' : 'Read'}</span>
                              {isBioOpen ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </button>

                          {isBioOpen && (
                            <div className="px-4 pb-4 pt-1 border-t border-gray-100 text-xs sm:text-sm text-gray-700 leading-relaxed bg-white">
                              <p className="font-medium">{session.bio || `${session.speakerName} is an esteemed keynote contributor to conFiqh 2026.`}</p>
                            </div>
                          )}
                        </div>

                        {/* 4. Bottom Right Action Button from sketch */}
                        <div className="flex justify-end pt-2">
                          <button
                            onClick={() => setSelectedBioSpeaker(session)}
                            className="bg-[#17472B] hover:bg-[#20603B] text-white px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>View Full Speaker Profile</span>
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Speaker Full Profile Modal */}
      {selectedBioSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-200 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setSelectedBioSpeaker(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-[#EEF3EA] shadow border-2 border-[#17472B] shrink-0">
                <img
                  src={selectedBioSpeaker.photo}
                  alt={selectedBioSpeaker.speakerName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/zack_wilson.jpg';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-xl sm:text-2xl font-black text-[#123C2C]">
                    {selectedBioSpeaker.speakerName}
                  </h3>
                  <span className="text-xl">{selectedBioSpeaker.flag}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-gray-600 mt-0.5">
                  {selectedBioSpeaker.role}
                </p>
                {selectedBioSpeaker.affiliation && (
                  <p className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {selectedBioSpeaker.affiliation}
                  </p>
                )}
              </div>
            </div>

            {selectedBioSpeaker.bio && (
              <div className="mb-6">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
                  Speaker Biography
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                  {selectedBioSpeaker.bio}
                </p>
              </div>
            )}

            {selectedBioSpeaker.abstract && (
              <div className="bg-[#F4F8F1] p-4 rounded-2xl border border-emerald-200 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#123C2C] block mb-1.5">
                  Session Topic Abstract:
                </span>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                  {selectedBioSpeaker.abstract}
                </p>
              </div>
            )}

            <button
              onClick={() => setSelectedBioSpeaker(null)}
              className="w-full py-3 bg-[#123C2C] hover:bg-[#1C5842] text-white rounded-xl font-bold text-xs sm:text-sm shadow cursor-pointer transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#17472B] text-white flex items-center justify-center font-black text-[10px]">
              C
            </div>
            <span className="font-medium">© 2026 CON FIQH • AHLUSSUFFA Dars</span>
          </div>
          <button
            onClick={onBackToHome}
            className="text-[#17472B] font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Summit Homepage</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
