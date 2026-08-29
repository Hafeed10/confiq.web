import React, { useState, useEffect } from 'react';

export default function CountdownSection() {
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

      </div>
    </section>
  );
}
