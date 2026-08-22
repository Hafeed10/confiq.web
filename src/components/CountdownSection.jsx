import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownSection() {
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
    <section id="countdown" className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Row matching PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">

          {/* Left Title: Let's witness the first Edition */}
          <div className="lg:col-span-7">
            <h2 className="font-sans text-5xl sm:text-7xl font-normal text-[#123C2C] leading-[1.05]">
              Let's witness <br />
              <span className="font-sans font-extrabold text-[#123C2C]">
                the <span className="font-black text-[#123C2C]">first Edition</span>
              </span>
            </h2>
          </div>

          {/* Right 4 Stacked Color Bars matching PDF */}
          <div className="lg:col-span-5 flex justify-start lg:justify-end">
            <div className="w-full max-w-[280px] space-y-2.5">
              <div className="h-5 bg-[#6E7E65] rounded-sm" />
              <div className="h-5 bg-[#A1AFA0] rounded-sm" />
              <div className="h-5 bg-[#CCD6C9] rounded-sm" />
              <div className="h-5 bg-[#E6EBE4] rounded-sm" />
            </div>
          </div>

        </div>

        {/* Dynamic Countdown Display */}
        <div className="bg-[#EEF3EA] rounded-3xl p-8 sm:p-10 border border-[#D5E0D2]">

          <div className="flex items-center gap-2 mb-6 text-[#123C2C] font-bold text-sm">
            <Clock className="w-5 h-5" />
            <span>Countdown to Summit Inauguration • 11 September 2026</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-4xl sm:text-6xl font-black text-[#123C2C]">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-xs font-bold uppercase text-gray-500 mt-2">Days</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-4xl sm:text-6xl font-black text-[#123C2C]">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs font-bold uppercase text-gray-500 mt-2">Hours</div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-4xl sm:text-6xl font-black text-[#123C2C]">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs font-bold uppercase text-gray-500 mt-2">Minutes</div>
            </div>

            <div className="bg-[#123C2C] text-white p-6 rounded-2xl shadow-md">
              <div className="text-4xl sm:text-6xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs font-bold uppercase text-gray-300 mt-2">Seconds</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
