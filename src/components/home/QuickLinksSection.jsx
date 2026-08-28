import React from 'react';
import { 
  IslamicChipIcon, 
  IslamicStarIcon, 
  IslamicBioNodeIcon, 
  IslamicBookIcon, 
  IslamicCompassIcon, 
  IslamicScrollIcon,
  IslamicArchIcon
} from '../common/IslamicIcons';

export default function QuickLinksSection({ onOpenBrochure, scrollToSection }) {
  const cards = [
    {
      title: 'Crypto Fiqh',
      tag: 'Track 01',
      desc: 'DeFi & Smart Contracts',
      icon: IslamicChipIcon,
      section: 'tracks'
    },
    {
      title: 'AI Fatwa Limits',
      tag: 'Track 02',
      desc: 'Autonomous Jurisprudence',
      icon: IslamicStarIcon,
      section: 'tracks'
    },
    {
      title: 'CRISPR Bioethics',
      tag: 'Track 03',
      desc: 'Genomic Engineering',
      icon: IslamicBioNodeIcon,
      section: 'tracks'
    },
    {
      title: 'Makhdoomi Heritage',
      tag: 'Heritage',
      desc: 'Shafi‘ite Kerala Tradition',
      icon: IslamicBookIcon,
      section: 'about'
    }
  ];

  return (
    <section className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#D8E6C8]">
      <div className="max-w-6xl mx-auto">

        {/* 4 Rounded Squircle Cards Grid matching User Diagram */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => scrollToSection && scrollToSection(card.section)}
                className="aspect-square sm:aspect-[4/3] bg-[#D4E8B8] hover:bg-[#C7E1A6] rounded-3xl border-2 border-[#17472B]/60 p-4 sm:p-5 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer group select-none"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/70 text-[#17472B] flex items-center justify-center shadow-2xs group-hover:bg-[#17472B] group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-[#17472B]/70 bg-white/50 px-2 py-0.5 rounded-md">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm md:text-base font-extrabold text-[#17472B] mb-0.5 group-hover:text-[#0e301c] transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs font-medium text-[#38592A] line-clamp-1">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
