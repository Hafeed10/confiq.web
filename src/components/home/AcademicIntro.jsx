import React from 'react';

export default function AcademicIntro() {
  return (
    <section id="about" className="py-12 sm:py-20 lg:py-24 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading + 2-Row 8-Point Star Micro-Divider matching Reference Graphic */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <h2 className="font-sans text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight text-left">
              <span className="text-[#849C62] block font-medium">Academic</span>
              <span className="text-[#849C62] block font-medium">Summit for</span>
              <span className="text-[#154728] font-black block mt-0.5 sm:mt-1">Applied Fiqh</span>
            </h2>

            {/* Exact 2-Row 8-Point Star Outline Divider matching Reference Graphic */}
            <div className="mt-3.5 sm:mt-5 w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[340px] md:max-w-[380px] select-none">
              <svg 
                className="w-full h-auto overflow-visible" 
                viewBox="0 0 290 28" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <g id="eight-point-star">
                    <path
                      d="M6 1 L7.2 4.2 L10.5 3 L9.2 6.3 L12.5 7.5 L9.2 8.7 L10.5 12 L7.2 10.8 L6 14 L4.8 10.8 L1.5 12 L2.8 8.7 L-0.5 7.5 L2.8 6.3 L1.5 3 L4.8 4.2Z"
                      strokeWidth="1.15"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </g>
                </defs>
                {/* Row 1: Soft Light Olive/Green Outlined Stars */}
                <g stroke="#7E9B71">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <use key={`row1-${i}`} href="#eight-point-star" x={i * 13 + 1} y={0} />
                  ))}
                </g>
                {/* Row 2: Deep Dark Forest Green Outlined Stars */}
                <g stroke="#154728">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <use key={`row2-${i}`} href="#eight-point-star" x={i * 13 + 1} y={13.5} />
                  ))}
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column: Paragraph Text */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-[#222E26] text-sm sm:text-[15px] md:text-base leading-relaxed font-normal pt-1 sm:pt-2">
            <p>
              conFiqh is an annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh.
            </p>
            
            <p>
              This is the 1st Edition of conFiqh, hosted at AHLUSSUFFA Dars, Parapram, Pinarayi, Kannur. Kerala has historically flourished as a cradle of Shafi'ite jurisprudence in the Indian Ocean world, notably through the seminal Makhdoomi tradition of Ponnani and centuries of coastal trade. conFiqh carries this torch forward into the 21st century, addressing urgent contemporary subjects such as decentralized crypto finance, artificial intelligence fatwa limits and CRISPR gene editing.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
