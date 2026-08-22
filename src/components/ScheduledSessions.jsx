import React, { useState } from 'react';
import { ArrowUpRight, Calendar, X, User, ArrowRight, CheckCircle } from 'lucide-react';

export default function ScheduledSessions({ sessionsData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bioModalSpeaker, setBioModalSpeaker] = useState(null);
  const [allSessionsModalOpen, setAllSessionsModalOpen] = useState(false);

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
    }
  ];

  const sessions = sessionsData && sessionsData.length > 0 ? sessionsData : defaultSessions;
  const currentSession = sessions[currentSlide] || sessions[0];

  return (
    <section id="sessions" className="py-12 sm:py-20 bg-[#EEF3EA] border-t border-[#D5E0D2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Row matching PDF */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <h2 className="font-sans text-2xl sm:text-4xl font-extrabold text-[#123C2C] uppercase tracking-tight">
            SCHEDULED <span className="font-black text-[#123C2C]">SESSIONS</span>
          </h2>

          <button 
            onClick={() => setAllSessionsModalOpen(true)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#123C2C] hover:underline self-start sm:self-auto group"
          >
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span>Explore all Sessions</span>
          </button>
        </div>

        {/* Outer Card Dark Green Container matching theme */}
        <div className="relative">
          <div className="bg-[#387B52] p-3.5 sm:p-7 rounded-3xl shadow-2xl relative overflow-hidden border border-[#20603B]">
            
            {/* Inner White/Off-white Card matching PDF */}
            <div className="bg-[#F7F9F5] rounded-2xl p-4 sm:p-8 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center overflow-hidden">
              
              {/* Left Oval Speaker Frame matching PDF */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-48 h-48 sm:w-72 sm:h-72 rounded-3xl overflow-hidden bg-white shadow-md border-4 border-white shrink-0">
                  <img
                    src={currentSession.photo}
                    alt={currentSession.speakerName}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = '/zack_wilson.jpg'; }}
                  />
                </div>
              </div>

              {/* Right Speaker Details matching PDF */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 min-w-0 w-full overflow-hidden">
                
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 max-w-full">
                    <h3 className="font-sans text-2xl sm:text-4xl font-black text-[#123C2C] break-words max-w-full">
                      {currentSession.speakerName}
                    </h3>
                    <span className="text-xl sm:text-2xl shrink-0">{currentSession.flag}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-gray-600 mt-1 break-words">
                    {currentSession.role}
                  </p>
                  
                  {currentSession.affiliation && (
                    <p className="text-[11px] sm:text-xs font-semibold text-emerald-800 mt-0.5 break-words">
                      {currentSession.affiliation}
                    </p>
                  )}
                </div>

                {/* "Helping with:" Tags Section matching PDF */}
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Helping with:
                  </span>
                  
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {Array.isArray(currentSession.tags) ? currentSession.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-white text-[#123C2C] border border-gray-200 shadow-xs break-words"
                      >
                        {tag}
                      </span>
                    )) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#123C2C] border border-gray-200">
                        {currentSession.tags}
                      </span>
                    )}
                  </div>
                </div>

                {/* Buttons matching user diagram */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-2 w-full">
                  <button
                    onClick={() => setBioModalSpeaker(currentSession)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-400 text-[#123C2C] font-bold text-xs sm:text-sm bg-white hover:bg-gray-50 shadow-xs transition-all text-center"
                  >
                    About
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* Carousel Dots matching PDF */}
          {sessions.length > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              {sessions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === idx ? 'w-8 bg-[#123C2C]' : 'w-2.5 bg-gray-300'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Speaker Bio Modal */}
      {bioModalSpeaker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl relative border border-gray-200 max-h-[90vh] overflow-y-auto no-scrollbar">
            <button
              onClick={() => setBioModalSpeaker(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-base flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <h3 className="text-xl sm:text-2xl font-black text-[#123C2C] mb-1 break-words pr-8">
              {bioModalSpeaker.speakerName} {bioModalSpeaker.flag}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-gray-600 mb-3 break-words">
              {bioModalSpeaker.role}
            </p>
            {bioModalSpeaker.bio && (
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4 break-words">
                {bioModalSpeaker.bio}
              </p>
            )}
            {bioModalSpeaker.abstract && (
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#123C2C] block mb-1">
                  Session Topic Abstract:
                </span>
                <p className="text-xs text-gray-800 leading-relaxed font-medium break-words">
                  {bioModalSpeaker.abstract}
                </p>
              </div>
            )}
            <button
              onClick={() => setBioModalSpeaker(null)}
              className="w-full py-3 bg-[#123C2C] hover:bg-[#1C5842] text-white rounded-xl font-bold text-xs sm:text-sm shadow cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ALL SCHEDULED SESSIONS MODAL PAGE (Opens when clicking Explore All Sessions) */}
      {allSessionsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 animate-fadeIn">
          <div className="bg-[#FAFBF8] rounded-3xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative border border-gray-300 max-h-[92vh] overflow-y-auto no-scrollbar">
            
            {/* Close Button */}
            <button
              onClick={() => setAllSessionsModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-lg transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Title */}
            <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4 pr-10">
              <div className="p-3 bg-[#17472B] text-white rounded-2xl shadow-sm shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#17472B]">
                  All Scheduled Summit Sessions
                </h3>
                <p className="text-xs font-bold text-[#387B52] mt-0.5">
                  1st Edition • conFiqh 2026 Academic Sessions ({sessions.length} Published)
                </p>
              </div>
            </div>

            {/* Grid of All Sessions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessions.map((session, idx) => {
                const tagsList = Array.isArray(session.tags) ? session.tags : (session.tags ? session.tags.split(',') : []);
                return (
                  <div 
                    key={session.id || idx}
                    className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex flex-col justify-between hover:border-emerald-600 transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                          <img 
                            src={session.photo} 
                            alt={session.speakerName}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/zack_wilson.jpg'; }}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-sans text-lg font-black text-[#17472B] truncate">
                              {session.speakerName}
                            </h4>
                            <span className="text-lg shrink-0">{session.flag}</span>
                          </div>
                          <p className="text-xs font-bold text-gray-600 truncate">
                            {session.role}
                          </p>
                          {session.affiliation && (
                            <p className="text-[11px] font-semibold text-emerald-800 truncate">
                              {session.affiliation}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Session Abstract */}
                      {session.abstract && (
                        <p className="text-xs text-gray-600 leading-relaxed font-medium line-clamp-3 mb-4 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                          {session.abstract}
                        </p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {tagsList.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx}
                            className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-gray-100 text-[#17472B] border border-gray-200"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setAllSessionsModalOpen(false);
                          setBioModalSpeaker(session);
                        }}
                        className="w-full py-2 px-3 rounded-xl border border-gray-300 text-[#17472B] font-bold text-xs hover:bg-gray-50 transition-all text-center cursor-pointer"
                      >
                        About Speaker & Abstract
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setAllSessionsModalOpen(false)}
                className="bg-[#17472B] hover:bg-[#20603B] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
