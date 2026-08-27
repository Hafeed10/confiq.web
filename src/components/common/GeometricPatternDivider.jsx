import React from 'react';
import webPattern from '../../assets/web pattern@4x.png';

export default function GeometricPatternDivider() {
  return (
    <div className="w-full bg-white py-6 sm:py-10 relative overflow-hidden my-0 flex items-center justify-center select-none">
      <div 
        className="w-full h-20 sm:h-28 md:h-32 bg-repeat-x bg-contain bg-center opacity-95"
        style={{ backgroundImage: `url(${webPattern})` }}
      />
    </div>
  );
}

