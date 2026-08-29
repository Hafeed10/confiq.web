import React, { useState, useEffect } from 'react';
import {
  IslamicCompassIcon,
  IslamicScrollIcon,
  IslamicArchIcon
} from '../common/IslamicIcons';

export default function QuickLinksSection({ onOpenBrochure, scrollToSection }) {
  const targetDate = new Date('2026-09-11T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="bg-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D8E6C8]">
      <div className="max-w-6xl mx-auto">

        {/* Countdown to Summit Inauguration Container matching User Screenshot */}
        <div className="bg-[#EEF3EA] rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-7 md:p-8 border border-[#D5E0D2] mb-8 sm:mb-12 shadow-xs">

          {/* Header row with Compass icon */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6 text-[#123C2C] font-bold text-xs sm:text-sm">
            <IslamicCompassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2B6D45] shrink-0" />
            <span className="truncate">Countdown to Summit Inauguration • 11 Sept 2026</span>
          </div>

          {/* 4 Countdown Timer Numbers - Clean borderless/boxless display */}
          <div className="grid grid-cols-4 gap-1.5 xs:gap-2.5 sm:gap-4 select-none text-center">
            {/* 1. DAYS */}
            <div className="py-2 sm:py-4 flex flex-col items-center justify-center min-w-0">
              <span className="font-sans text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-[#123C2C] tracking-tight">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-600 mt-1 sm:mt-1.5 truncate">
                DAYS
              </span>
            </div>

            {/* 2. HOURS */}
            <div className="py-2 sm:py-4 flex flex-col items-center justify-center min-w-0 border-l border-[#123C2C]/15">
              <span className="font-sans text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-[#123C2C] tracking-tight">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-600 mt-1 sm:mt-1.5 truncate">
                HOURS
              </span>
            </div>

            {/* 3. MINUTES */}
            <div className="py-2 sm:py-4 flex flex-col items-center justify-center min-w-0 border-l border-[#123C2C]/15">
              <span className="font-sans text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-[#123C2C] tracking-tight">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-600 mt-1 sm:mt-1.5 truncate">
                MINUTES
              </span>
            </div>

            {/* 4. SECONDS */}
            <div className="py-2 sm:py-4 flex flex-col items-center justify-center min-w-0 border-l border-[#123C2C]/15">
              <span className="font-sans text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-[#17472B] tracking-tight">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#17472B] font-extrabold mt-1 sm:mt-1.5 truncate">
                SECONDS
              </span>
            </div>
          </div>

        </div>

        {/* 3 Dark Green Action Buttons Layout matching User Diagram: 2 on top, 1 full-width on bottom for mobile */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-2.5 xs:gap-3 sm:gap-4 md:gap-5 max-w-lg sm:max-w-none mx-auto">
          {/* Button 1: Explore Sessions (Top Left on mobile) */}
          <button
            onClick={() => scrollToSection && scrollToSection('sessions')}
            className="col-span-1 bg-[#17472B] hover:bg-[#20603B] text-white px-3 xs:px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer select-none group"
          >
            <IslamicCompassIcon className="w-4 h-4 text-[#D8ECC0] group-hover:rotate-45 transition-transform shrink-0" />
            <span className="truncate">Explore Sessions</span>
          </button>

          {/* Button 2: Download Brochure (Top Right on mobile) */}
          <button
            onClick={onOpenBrochure}
            className="col-span-1 bg-[#17472B] hover:bg-[#20603B] text-white px-3 xs:px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer select-none"
          >
            <IslamicScrollIcon className="w-4 h-4 text-[#D8ECC0] shrink-0" />
            <span className="truncate">Download Brochure</span>
          </button>

          {/* Button 3: Register Now (Full Width centered on mobile bottom) */}
          <button
            onClick={onOpenBrochure}
            className="col-span-2 w-full sm:w-auto bg-[#17472B] hover:bg-[#20603B] text-white px-5 sm:px-8 md:px-9 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer select-none"
          >
            <IslamicArchIcon className="w-4 h-4 text-[#D8ECC0] shrink-0" />
            <span>Register Now</span>
          </button>
        </div>

      </div>
    </section>
  );
}
