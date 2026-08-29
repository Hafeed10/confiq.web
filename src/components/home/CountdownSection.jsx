import React, { useState, useEffect } from 'react';
import { IslamicCompassIcon } from '../common/IslamicIcons';

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

  // Automated topic rotation across the 4 color bars
  const [topicIndex, setTopicIndex] = useState(0);
  const topicSets = [
    [
      { num: '01', title: 'Crypto Fiqh & Smart Contracts' },
      { num: '02', title: 'AI Fatwa Limits & Machine Ijtihad' },
      { num: '03', title: 'CRISPR Gene Editing & Bioethics' },
      { num: '04', title: 'Makhdoomi Shafi‘ite Dars Heritage' }
    ],
    [
      { num: '01', title: 'DeFi Liquidity & Gharar Analytics' },
      { num: '02', title: 'Autonomous LLM Legal Liability' },
      { num: '03', title: 'Germline Editing & Maqasid al-Shariah' },
      { num: '04', title: 'Indian Ocean Shafi‘i Trade Codes' }
    ],
    
  ];

  useEffect(() => {
    const topicInterval = setInterval(() => {
      setTopicIndex((prev) => (prev + 1) % topicSets.length);
    }, 3500);
    return () => clearInterval(topicInterval);
  }, [topicSets.length]);

  const currentTopics = topicSets[topicIndex];
  const barStyles = [
    { bg: 'bg-[#17472B]', text: 'text-white' },
    { bg: 'bg-[#A1AFA0]', text: 'text-[#123C2C]' },
    { bg: 'bg-[#CCD6C9]', text: 'text-[#123C2C]' },
    { bg: 'bg-[#E6EBE4]', text: 'text-[#123C2C]' }
  ];

  return (
    <section id="countdown" className="py-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Row matching PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-12 sm:mb-16">

          {/* Left Title: Let's witness the first Edition */}
          <div className="lg:col-span-6">
            <h2 className="font-sans text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#123C2C] leading-[1.08] tracking-tight">
              Let's witness <br />
              <span className="font-sans font-extrabold text-[#123C2C]">
                the <span className="font-black text-[#123C2C]">first Edition</span>
              </span>
            </h2>
          </div>

          {/* Right 4 Stacked Color Bars with Automatically Displayed Topics */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <div className="w-full max-w-[380px] sm:max-w-[440px] space-y-2 sm:space-y-2.5">
              {currentTopics.map((item, idx) => {
                const style = barStyles[idx];
                return (
                  <div
                    key={idx}
                    className={`h-7 sm:h-8 ${style.bg} ${style.text} rounded-md px-2.5 sm:px-4 flex items-center justify-between shadow-2xs transition-all duration-700 ease-in-out hover:scale-[1.01]`}
                  >
                    <span className="text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider truncate mr-1.5">
                      {item.title}
                    </span>
                    <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-mono font-bold opacity-80 shrink-0">
                      {item.num}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Dynamic Countdown Display */}
        <div className="bg-[#EEF3EA] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-[#D5E0D2]">

          <div className="flex items-center gap-2 mb-5 sm:mb-6 text-[#123C2C] font-bold text-xs sm:text-sm">
            <IslamicCompassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2B6D45] shrink-0" />
            <span className="truncate">Countdown to Summit Inauguration • 11 Sept 2026</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-5xl md:text-6xl font-black text-[#123C2C]">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-gray-500 mt-1.5 sm:mt-2">Days</div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-5xl md:text-6xl font-black text-[#123C2C]">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-gray-500 mt-1.5 sm:mt-2">Hours</div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
              <div className="text-3xl sm:text-5xl md:text-6xl font-black text-[#123C2C]">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-gray-500 mt-1.5 sm:mt-2">Minutes</div>
            </div>

            <div className="bg-[#123C2C] text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md">
              <div className="text-3xl sm:text-5xl md:text-6xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[10px] sm:text-xs font-bold uppercase text-gray-300 mt-1.5 sm:mt-2">Seconds</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
