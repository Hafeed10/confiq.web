import React from 'react';

export default function AcademicIntro() {
  return (
    <section id="about" className="py-20 bg-white border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column matching PDF */}
          <div className="lg:col-span-5">
            <h2 className="font-sans text-5xl sm:text-6xl font-normal leading-[1.05] tracking-tight">
              <span className="text-[#789885] block">Academic</span>
              <span className="text-[#789885] block">Summit for</span>
              <span className="text-[#123C2C] font-black block mt-1">Applied Fiqh</span>
            </h2>

            {/* Geometric Repeating Wavy Pattern under title matching PDF mockup */}
            <div className="mt-4 w-64 overflow-hidden">
              <svg className="w-full h-5 text-[#123C2C]" viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 C10 0, 20 20, 30 10 C40 0, 50 20, 60 10 C70 0, 80 20, 90 10 C100 0, 110 20, 120 10 C130 0, 140 20, 150 10 C160 0, 170 20, 180 10 C190 0, 200 20, 210 10 C220 0, 230 20, 240 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="15" cy="10" r="2.5" fill="currentColor" />
                <circle cx="45" cy="10" r="2.5" fill="currentColor" />
                <circle cx="75" cy="10" r="2.5" fill="currentColor" />
                <circle cx="105" cy="10" r="2.5" fill="currentColor" />
                <circle cx="135" cy="10" r="2.5" fill="currentColor" />
                <circle cx="165" cy="10" r="2.5" fill="currentColor" />
                <circle cx="195" cy="10" r="2.5" fill="currentColor" />
                <circle cx="225" cy="10" r="2.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Right Column text paragraphs matching PDF */}
          <div className="lg:col-span-7 space-y-6 text-[#2C3E35] text-base sm:text-lg leading-relaxed font-medium">
            <p>
              conFiqh is an annual Kerala Fiqh Summit focused on contemporary discussions, scholarly sessions, and intellectual engagement around Fiqh.
            </p>
            
            <p>
              This is the 1st Edition of conFiqh, hosted at <strong className="text-[#123C2C] font-bold">AHLUSSUFFA Dars, Parapram, Pinarayi, Kannur</strong>. Kerala has historically flourished as a cradle of Shafi'ite jurisprudence in the Indian Ocean world, notably through the seminal Makhdoomi tradition of Ponnani and centuries of coastal trade. conFiqh carries this torch forward into the 21st century, addressing urgent contemporary subjects such as decentralized crypto finance, artificial intelligence fatwa limits and CRISPR gene editing.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
