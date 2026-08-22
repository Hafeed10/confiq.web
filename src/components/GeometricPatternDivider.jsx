import React from 'react';

export default function GeometricPatternDivider() {
  return (
    <div className="w-full bg-[#123C2C] py-8 relative overflow-hidden my-0">
      <div className="max-w-full overflow-hidden flex items-center justify-center">
        <div className="grid grid-cols-12 sm:grid-cols-16 md:grid-cols-24 gap-3 w-full opacity-80">
          {Array.from({ length: 48 }).map((_, i) => (
            <svg key={i} className="w-8 h-8 mx-auto text-[#789885]" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 0 L23 14 L37 14 L26 22 L30 36 L20 27 L10 36 L14 22 L3 14 L17 14 Z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
