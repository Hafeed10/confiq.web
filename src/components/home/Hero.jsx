import React from 'react';
import { Compass, Download } from 'lucide-react';
import heroTitleImg from '../../assets/confiq_hero_title.png';
import dateBadgeImg from '../../assets/image1.png';
import vectorSmartObj from '../../assets/Vector Smart Object.png';
import patternImg from '../../assets/pattern@4x.png';

export default function Hero({ onOpenBrochure, scrollToSection }) {
  return (
    <section className="relative bg-[#EBF5DA] min-h-[calc(100vh-3.5rem)] flex flex-col justify-between pt-4 sm:pt-6 pb-10 sm:pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-between">

        {/* Model Poster Design Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start mb-6 sm:mb-8">

          {/* Left Column: CON FIQH Typography + Summit Banner */}
          <div className="lg:col-span-7 flex flex-col items-start justify-start pt-2 sm:pt-4">

            {/* Locked Proportional Brand Group */}
            <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[580px] flex flex-col items-start">

              {/* CON FIQH & The First Edition */}
              <div className="w-full mb-3 sm:mb-4">
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
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 sm:mt-10 lg:-mt-8 pr-0 lg:pr-6">

            {/* Shared Centered Column for Pattern & Dates */}
            <div className="flex flex-col items-center">

              {/* Pattern Hanging from Top */}
              <div className="w-32 sm:w-44 md:w-52 lg:w-60 xl:w-64 flex justify-center">
                <img
                  src={patternImg}
                  alt="Islamic Geometric Tessellation Pattern"
                  className="w-full h-auto object-contain select-none"
                />
              </div>

              {/* Date and Location Badge centered directly under the pattern */}
              <div className="mt-4 sm:mt-6 flex justify-center w-full">
                <img
                  src={dateBadgeImg}
                  alt="11-12 September 2026 - Parapram, Pinarayi"
                  className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[210px] lg:max-w-[250px] h-auto object-contain select-none mx-auto filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.08)]"
                />
              </div>

            </div>

          </div>

        </div>

        {/* Model Subtitle Paragraph */}
        <div className="max-w-4xl pb-4 sm:pb-6">
          <p className="text-[#3B4D33]/90 font-light text-xs sm:text-sm md:text-[15px] leading-relaxed tracking-wide">
            An annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh. Free delegate registration is open for students, scholars, and faculty for the inaugural 2026 edition.
          </p>
        </div>

      </div>
    </section>
  );
}
