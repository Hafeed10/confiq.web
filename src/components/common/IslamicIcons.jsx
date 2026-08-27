import React from 'react';

// 1. Islamic Geometric Chip Icon (Matching exact image uploaded by user: microchip with Islamic geometric Khatam pins & central square)
export function IslamicChipIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Square Core */}
      <rect x="8" y="8" width="8" height="8" rx="1" stroke={color} strokeWidth="1.6" />
      
      {/* Outer Geometric Frame */}
      <rect x="5.5" y="5.5" width="13" height="13" rx="2" stroke={color} strokeWidth="1.6" />
      
      {/* 8 Islamic Geometric Nodes/Pins */}
      {/* Top Pins */}
      <path d="M9 5.5V3M12 5.5V2.5M15 5.5V3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Bottom Pins */}
      <path d="M9 18.5V21M12 18.5V21.5M15 18.5V21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Left Pins */}
      <path d="M5.5 9H3M5.5 12H2.5M5.5 15H3" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Right Pins */}
      <path d="M18.5 9H21M18.5 12H21.5M18.5 15H21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 2. Islamic 8-Pointed Star / Rub el Hizb
export function IslamicStarIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14.5 6.5L19.5 5L18 10L22 12.5L18 15L19.5 20L14.5 18.5L12 23L9.5 18.5L4.5 20L6 15L2 12.5L6 10L4.5 5L9.5 6.5L12 2Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12.5" r="2.5" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

// 3. Islamic Mihrab Arch / Dome
export function IslamicArchIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 21V12C5 7 12 3 12 3C12 3 19 7 19 12V21"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8 21V13C8 9.5 12 6.5 12 6.5C12 6.5 16 9.5 16 13V21"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line x1="3" y1="21" x2="21" y2="21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="3" r="1" fill={color} />
    </svg>
  );
}

// 4. Quran on Rehal (Islamic Bookstand)
export function IslamicBookIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rehal legs */}
      <path d="M4 19L12 11L20 19" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 17L12 11L18 17" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Open Scripture Pages */}
      <path d="M12 11C12 7.5 7 5 3 6V14C7 13 12 15 12 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11C12 7.5 17 5 21 6V14C17 13 12 15 12 15" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="6" x2="12" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 5. Islamic Astrolabe / Compass
export function IslamicCompassIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.6" />
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 8L14 12L12 16L10 12Z" stroke={color} strokeWidth="1.4" fill={color} fillOpacity="0.15" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      {/* Top ring */}
      <circle cx="12" cy="3" r="1.5" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

// 6. Islamic Scroll / Legal Fatwa
export function IslamicScrollIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 17V5C19 3.5 17.5 3 16 3H7C5 3 4 4 4 6C4 8 5 9 7 9H17C18.5 9 20 10.5 20 12V18C20 19.5 18.5 21 17 21H6C4 21 3 20 3 18.5C3 17 4 16 6 16H16"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="8" y1="13" x2="14" y2="13" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="16.5" x2="12" y2="16.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// 7. Islamic Geometric Bio-Node / Khatam Helix (CRISPR Bioethics)
export function IslamicBioNodeIcon({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Intertwined Geometric Helix */}
      <path d="M4 5C8 5 16 19 20 19" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 19C8 19 16 5 20 5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* Geometric rungs */}
      <line x1="7" y1="8" x2="17" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="12" x2="14" y2="12" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7" y1="16" x2="17" y2="16" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Star Nodes */}
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="1.2" />
      <circle cx="4" cy="5" r="1.5" fill={color} />
      <circle cx="20" cy="5" r="1.5" fill={color} />
      <circle cx="4" cy="19" r="1.5" fill={color} />
      <circle cx="20" cy="19" r="1.5" fill={color} />
    </svg>
  );
}
