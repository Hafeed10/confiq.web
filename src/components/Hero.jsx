import React from 'react';
import { Compass, Download } from 'lucide-react';
import confiqLogo from '../assets/CONFIQ.png';
import group8Img from '../assets/Group 8.png';
import vectorSmartObj from '../assets/Vector Smart Object.png';

export default function Hero({ onOpenBrochure, scrollToSection }) {
  return (
    <section className="relative bg-[#EBF5DA] pt-8 pb-16 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Hero Layout matching user layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">

          {/* Left Column: Official CONFIQ.png Logo & Vector Smart Object Pill Badge */}
          <div className="lg:col-span-7 space-y-6">

            {/* CONFIQ.png Official Brand Logo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-4">
              <img 
                src={confiqLogo} 
                alt="CONFIQ - Annual Kerala Fiqh Summit" 
                className="h-20 sm:h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-md select-none"
              />

              <div className="font-serif text-sm sm:text-base font-semibold text-[#3D4C33] leading-snug tracking-tight">
                The <br />
                First <br />
                Edition
              </div>
            </div>

            {/* Vector Smart Object.png Image (Keralam Fiqh Summit 2026 Badge) */}
            <div className="pt-2">
              <img 
                src={vectorSmartObj} 
                alt="Keralam Fiqh Summit 2026" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain shadow-sm select-none"
              />
            </div>

          </div>

          {/* Right Column: Group 8.png Image (Date & Location Graphic) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">

            {/* Vertical Interlocking Tessellation Pattern Strip floating on #EBF5DA */}
            <div className="mb-4 w-[200px] flex justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="snippetExactTessellation" width="50" height="50" patternUnits="userSpaceOnUse">
                    {/* Light Green 8-pointed Octagon Star Fill */}
                    <path
                      d="M15 0 L35 0 L50 15 L50 35 L35 50 L15 50 L0 35 L0 15 Z"
                      fill="#C5DF9F"
                    />
                    {/* Dark Green Interlocking 4-Pointed Cross Motif */}
                    <path
                      d="M25 0 L30 15 L45 15 L35 25 L45 35 L30 35 L25 50 L20 35 L5 35 L15 25 L5 15 L20 15 Z"
                      fill="#17472B"
                    />
                    <path
                      d="M0 25 L15 20 L15 5 L25 15 L35 5 L35 20 L50 25 L35 30 L35 45 L25 35 L15 45 L15 30 Z"
                      fill="#17472B"
                    />
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#snippetExactTessellation)" />
              </svg>
            </div>

            {/* Group 8.png Graphic Image (11-12 Sept 2026, Parapram Pinarayi) */}
            <div className="bg-white/60 backdrop-blur-xs p-3 rounded-2xl border border-[#C5DF9F]/80 shadow-md">
              <img 
                src={group8Img} 
                alt="11-12 September 2026 - AHLUSSUFFA Parapram, Pinarayi" 
                className="h-20 sm:h-24 md:h-28 w-auto object-contain select-none"
              />
            </div>

          </div>

        </div>

        {/* Subtitle Paragraph matching User Snippet */}
        <div className="max-w-4xl mt-6 mb-10">
          <p className="text-[#405238] text-sm sm:text-base font-normal leading-relaxed tracking-wide">
            An annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh. Free delegate registration is open for students, scholars, and faculty for the inaugural 2026 edition.
          </p>
        </div>

        {/* 4 Soft Green Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-8">
          <div
            onClick={() => scrollToSection('tracks')}
            className="aspect-[4/3] bg-[#CCE5B4] hover:bg-[#BEDE9E] transition-all rounded-2xl border border-[#B3D98E]/50 shadow-sm cursor-pointer flex flex-col justify-end p-4 group"
          >
            <span className="text-xs font-bold text-[#17472B] group-hover:underline">Crypto Fiqh →</span>
          </div>

          <div
            onClick={() => scrollToSection('tracks')}
            className="aspect-[4/3] bg-[#CCE5B4] hover:bg-[#BEDE9E] transition-all rounded-2xl border border-[#B3D98E]/50 shadow-sm cursor-pointer flex flex-col justify-end p-4 group"
          >
            <span className="text-xs font-bold text-[#17472B] group-hover:underline">AI Fatwa Limits →</span>
          </div>

          <div
            onClick={() => scrollToSection('tracks')}
            className="aspect-[4/3] bg-[#CCE5B4] hover:bg-[#BEDE9E] transition-all rounded-2xl border border-[#B3D98E]/50 shadow-sm cursor-pointer flex flex-col justify-end p-4 group"
          >
            <span className="text-xs font-bold text-[#17472B] group-hover:underline">CRISPR Bioethics →</span>
          </div>

          <div
            onClick={() => scrollToSection('about')}
            className="aspect-[4/3] bg-[#CCE5B4] hover:bg-[#BEDE9E] transition-all rounded-2xl border border-[#B3D98E]/50 shadow-sm cursor-pointer flex flex-col justify-end p-4 group"
          >
            <span className="text-xs font-bold text-[#17472B] group-hover:underline">Makhdoomi Tradition →</span>
          </div>
        </div>

        {/* Dark Green Action Buttons matching user layout diagram */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2 max-w-xl sm:max-w-none">
          <button
            onClick={() => scrollToSection('sessions')}
            className="bg-[#17472B] hover:bg-[#20603B] text-white px-5 sm:px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-white shrink-0" />
            <span>Explore <span className="font-extrabold">Sessions</span></span>
          </button>

          <button
            onClick={onOpenBrochure}
            className="bg-[#17472B] hover:bg-[#20603B] text-white px-5 sm:px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-white shrink-0" />
            <span>Download <span className="font-extrabold">Brochure</span></span>
          </button>
        </div>

      </div>
    </section>
  );
}
