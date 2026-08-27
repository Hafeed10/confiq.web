import React from 'react';

export default function AcademicIntro() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading + 2-Row 8-Point Star Micro-Divider matching Reference Image */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight">
              <span className="text-[#849C62] block font-medium">Academic</span>
              <span className="text-[#849C62] block font-medium">Summit for</span>
              <span className="text-[#154728] font-black block mt-0.5 sm:mt-1">Applied Fiqh</span>
            </h2>

            {/* Exact 2-Row 8-Point Star Outline Divider matching Reference Graphic */}
            <div className="mt-4 sm:mt-5 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] overflow-hidden select-none">
              <svg className="w-full h-auto" viewBox="0 0 308 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <g id="eight-point-star">
                    <path
                      d="M7.0,1.5 L8.2,4.0 L10.9,3.1 L10.0,5.8 L12.5,7.0 L10.0,8.2 L10.9,10.9 L8.2,10.0 L7.0,12.5 L5.8,10.0 L3.1,10.9 L4.0,8.2 L1.5,7.0 L4.0,5.8 L3.1,3.1 L5.8,4.0Z"
                      strokeWidth="1.15"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </g>
                </defs>
                {/* Row 1: Soft Light Olive/Green Outlined Stars */}
                <g stroke="#7E9B71">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <use key={`row1-${i}`} href="#eight-point-star" x={i * 13} y={0} />
                  ))}
                </g>
                {/* Row 2: Deep Dark Forest Green Outlined Stars */}
                <g stroke="#154728">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <use key={`row2-${i}`} href="#eight-point-star" x={i * 13} y={13} />
                  ))}
                </g>
              </svg>
            </div>
          </div>

          {/* Right Column: Paragraph Text matching  */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-[#222E26] text-sm sm:text-[15px] md:text-base leading-relaxed font-normal">
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
