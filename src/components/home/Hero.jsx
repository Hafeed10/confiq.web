import React from 'react';
import heroTitleImg from '../../assets/confiq_hero_title.png';
import confiqLogo from '../../assets/CONFIQ.png';
import group8Img from '../../assets/Group 8.png';
import dateBadgeImg from '../../assets/image1.png';
import vectorSmartObj from '../../assets/Vector Smart Object.png';
import patternImg from '../../assets/pattern@4x.png';

export default function Hero({ onOpenBrochure, scrollToSection }) {
  return (
    <section className="relative bg-[#EBF5DA] min-h-0 lg:min-h-[calc(100vh-3.5rem)] flex flex-col justify-start lg:justify-between pt-4 sm:pt-6 pb-6 sm:pb-10 lg:pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-start lg:justify-between flex-grow">

        {/* 1. Mobile Specific Layout (compact, tightly stacked with no awkward gap) */}
        <div className="flex lg:hidden flex-col items-center justify-center text-center pt-2 pb-1">
          
          {/* "THE FIRST EDITION OF" Header Text */}
          <p className="text-[#17472B] font-bold text-[11px] xs:text-xs sm:text-sm tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
            THE FIRST EDITION OF
          </p>

          {/* Horizontal CONFIQ Logo */}
          <div className="w-full max-w-[240px] xs:max-w-[280px] sm:max-w-[340px] mb-2 sm:mb-2.5">
            <img
              src={confiqLogo}
              alt="CONFIQ"
              className="w-full h-auto object-contain select-none mx-auto filter drop-shadow-xs"
            />
          </div>

          {/* Keralam Fiqh Summit 2026 Arch Banner */}
          <div className="w-full max-w-[220px] xs:max-w-[250px] sm:max-w-[310px] mb-2.5 sm:mb-3">
            <img
              src={vectorSmartObj}
              alt="Keralam Fiqh Summit 2026"
              className="w-full h-auto object-contain select-none mx-auto drop-shadow-xs"
            />
          </div>

          {/* 11 12 2026 September AHLUSSUFFA • Parapram, Pinarayi Badge */}
          <div className="w-full max-w-[200px] xs:max-w-[230px] sm:max-w-[280px] mb-3 sm:mb-4">
            <img
              src={group8Img}
              alt="11-12 September 2026 - AHLUSSUFFA Parapram, Pinarayi"
              className="w-full h-auto object-contain select-none mx-auto drop-shadow-xs"
            />
          </div>

        </div>

        {/* 2. Desktop Model Poster Design Layout (preserved without change) */}
        <div className="hidden lg:grid grid-cols-12 gap-10 items-start mb-8">

          {/* Left Column: CON FIQH Typography + Summit Banner */}
          <div className="col-span-7 flex flex-col items-start justify-start pt-4">

            {/* Locked Proportional Brand Group */}
            <div className="w-full max-w-[580px] flex flex-col items-start">

              {/* CON FIQH & The First Edition */}
              <div className="w-full mb-4">
                <img
                  src={heroTitleImg}
                  alt="CONFIQ - The First Edition - Annual Kerala Fiqh Summit"
                  className="w-full h-auto object-contain select-none filter drop-shadow-[0_12px_24px_rgba(23,71,43,0.18)]"
                />
              </div>

              {/* Keralam Fiqh Summit 2026 Banner */}
              <div className="w-full">
                <img
                  src={vectorSmartObj}
                  alt="Keralam Fiqh Summit 2026"
                  className="w-full h-auto object-contain select-none drop-shadow-md hover:scale-[1.01] transition-transform"
                />
              </div>

            </div>

          </div>

          {/* Right Column: Islamic Tessellation Pattern Block & Date Badge */}
          <div className="col-span-5 flex justify-end -mt-8 pr-6">

            {/* Shared Centered Column for Pattern & Dates */}
            <div className="flex flex-col items-center">

              {/* Pattern Hanging from Top */}
              <div className="w-60 xl:w-64 flex justify-center">
                <img
                  src={patternImg}
                  alt="Islamic Geometric Tessellation Pattern"
                  className="w-full h-auto object-contain select-none"
                />
              </div>

              {/* Date and Location Badge centered directly under the pattern */}
              <div className="mt-6 flex justify-center w-full">
                <img
                  src={dateBadgeImg}
                  alt="11-12 September 2026 - Parapram, Pinarayi"
                  className="w-full max-w-[250px] h-auto object-contain select-none mx-auto filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                />
              </div>

            </div>

          </div>

        </div>

        {/* Subtitle Paragraph */}
        <div className="max-w-4xl pb-4 sm:pb-6 text-center lg:text-left mx-auto lg:mx-0 mt-2 sm:mt-4 lg:mt-0">
          <p className="text-[#3B4D33]/90 font-light text-xs sm:text-sm md:text-[15px] leading-relaxed tracking-wide">
            An annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh. Free delegate registration is open for students, scholars, and faculty for the inaugural 2026 edition.
          </p>
        </div>

      </div>
    </section>
  );
}
