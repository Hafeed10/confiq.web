import React from 'react';
import { Compass, Download } from 'lucide-react';
import heroTitleImg from '../../assets/confiq_hero_title.png';
import dateBadgeImg from '../../assets/image1.png';
import vectorSmartObj from '../../assets/Vector Smart Object.png';
import patternImg from '../../assets/pattern@4x.png';

export default function Hero({ onOpenBrochure, scrollToSection }) {
  return (
    <section className="relative bg-[#EBF5DA] pt-4 sm:pt-6 pb-16 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Model Poster Design Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8 sm:mb-12">

          {/* Left Column: CON FIQH Typography + Summit Banner */}
          <div className="lg:col-span-7 flex flex-col items-start justify-start pt-6 sm:pt-10 md:pt-12 lg:pt-14">

            {/* Locked Proportional Brand Group */}
            <div className="w-full max-w-[230px] sm:max-w-[290px] md:max-w-[350px] lg:max-w-[400px] flex flex-col items-start">

              {/* CON FIQH & The First Edition */}
              <div className="w-full mb-2.5 sm:mb-3">
                <img
                  src={heroTitleImg}
                  alt="CONFIQ - The First Edition - Annual Kerala Fiqh Summit"
                  className="w-full h-auto object-contain select-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
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
          <div className="lg:col-span-5 flex justify-center lg:justify-end -mt-4 sm:-mt-6 pr-0 lg:pr-6">

            {/* Shared Centered Column for Pattern & Dates */}
            <div className="flex flex-col items-center">

              {/* Pattern Hanging from Top */}
              <div className="w-28 sm:w-36 md:w-42 lg:w-48 flex justify-center">
                <img
                  src={patternImg}
                  alt="Islamic Geometric Tessellation Pattern"
                  className="w-full h-auto object-contain select-none"
                />
              </div>

              {/* Date and Location Badge centered directly under the pattern */}
              <div className="mt-4 sm:mt-5 flex justify-center w-full">
                <img
                  src={dateBadgeImg}
                  alt="11-12 September 2026 - Parapram, Pinarayi"
                  className="w-full max-w-[130px] sm:max-w-[155px] md:max-w-[175px] lg:max-w-[195px] h-auto object-contain select-none mx-auto"
                />
              </div>

            </div>

          </div>

        </div>

        {/* Model Subtitle Paragraph */}
        <div className="max-w-4xl">
          <p className="text-[#3B4D33]/90 font-light text-xs sm:text-sm md:text-[15px] leading-relaxed tracking-wide">
            An annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh. Free delegate registration is open for students, scholars, and faculty for the inaugural 2026 edition.
          </p>
        </div>

      </div>
    </section>
  );
}
