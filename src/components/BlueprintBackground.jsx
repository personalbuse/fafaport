import React from 'react';

const BlueprintBackground = () => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid */}
      {Array.from({ length: 15 }, (_, i) => (
        <line
          key={`hg-${i}`}
          x1="0" y1={i * 60}
          x2="1440" y2={i * 60}
          stroke="#2A3B32" strokeOpacity="0.08" strokeWidth="0.4"
        />
      ))}
      {Array.from({ length: 25 }, (_, i) => (
        <line
          key={`vg-${i}`}
          x1={i * 60} y1="0"
          x2={i * 60} y2="900"
          stroke="#2A3B32" strokeOpacity="0.08" strokeWidth="0.4"
        />
      ))}

      {/* Border frame */}
      <rect
        x="30" y="30" width="1380" height="840"
        stroke="#2A3B32" strokeOpacity="0.15" strokeWidth="0.7" fill="none"
      />
      <rect
        x="25" y="25" width="1390" height="850"
        stroke="#2A3B32" strokeOpacity="0.08" strokeWidth="0.4" fill="none"
      />

      {/* Tick marks along border */}
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={`tt-${i}`}
          x1={30 + i * 60} y1="30"
          x2={30 + i * 60} y2="40"
          stroke="#2A3B32" strokeOpacity="0.15" strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={`tl-${i}`}
          x1="30" y1={30 + i * 60}
          x2="40" y2={30 + i * 60}
          stroke="#2A3B32" strokeOpacity="0.15" strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 24 }, (_, i) => (
        <line
          key={`bt-${i}`}
          x1={30 + i * 60} y1="870"
          x2={30 + i * 60} y2="860"
          stroke="#2A3B32" strokeOpacity="0.15" strokeWidth="0.6"
        />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <line
          key={`bl-${i}`}
          x1="1410" y1={30 + i * 60}
          x2="1400" y2={30 + i * 60}
          stroke="#2A3B32" strokeOpacity="0.15" strokeWidth="0.6"
        />
      ))}

      {/* Compass rose - top right */}
      <g transform="translate(1280, 160)" stroke="#2A3B32" strokeOpacity="0.15" fill="none">
        <circle cx="0" cy="0" r="55" strokeWidth="0.7" />
        <circle cx="0" cy="0" r="45" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="30" strokeWidth="0.4" strokeDasharray="3,3" />
        <line x1="0" y1="-55" x2="0" y2="55" strokeWidth="0.6" />
        <line x1="-55" y1="0" x2="55" y2="0" strokeWidth="0.6" />
        <line x1="-39" y1="-39" x2="39" y2="39" strokeWidth="0.3" />
        <line x1="39" y1="-39" x2="-39" y2="39" strokeWidth="0.3" />
        <polygon points="0,-65 -5,-52 5,-52" fill="#2A3B32" fillOpacity="0.15" stroke="none" />
        <text x="0" y="-74" textAnchor="middle" fontSize="11" fill="#2A3B32" fillOpacity="0.25" stroke="none" fontFamily="serif" fontWeight="bold">N</text>
      </g>

      {/* Abstract floor plan 1 - left side */}
      <g stroke="#2A3B32" strokeOpacity="0.12" fill="none" strokeWidth="0.7">
        <rect x="120" y="250" width="220" height="180" rx="2" />
        <rect x="120" y="250" width="140" height="180" rx="2" />
        <line x1="260" y1="290" x2="260" y2="300" strokeWidth="0.4" />
        <path d="M 260 300 Q 278 300 278 290" strokeWidth="0.4" fill="none" />
        <rect x="380" y="250" width="160" height="180" rx="2" />
        <line x1="380" y1="320" x2="392" y2="320" strokeWidth="0.4" />
        <line x1="380" y1="340" x2="392" y2="340" strokeWidth="0.4" />
        <line x1="380" y1="360" x2="392" y2="360" strokeWidth="0.4" />
        <rect x="120" y="470" width="160" height="140" rx="2" />
        <line x1="200" y1="470" x2="200" y2="476" strokeWidth="0.4" />
        <path d="M 200 476 Q 212 476 212 470" strokeWidth="0.4" fill="none" />
        <rect x="310" y="470" width="230" height="140" rx="2" />
        <circle cx="500" cy="490" r="8" strokeWidth="0.4" strokeDasharray="2,2" />
        <circle cx="500" cy="510" r="8" strokeWidth="0.4" strokeDasharray="2,2" />
      </g>

      {/* Abstract floor plan 2 - right side */}
      <g stroke="#2A3B32" strokeOpacity="0.1" fill="none" strokeWidth="0.6">
        <rect x="880" y="400" width="140" height="140" rx="2" />
        <rect x="880" y="400" width="70" height="140" rx="2" />
        <line x1="950" y1="440" x2="950" y2="446" strokeWidth="0.3" />
        <path d="M 950 446 Q 960 446 960 440" strokeWidth="0.3" fill="none" />
        <rect x="1050" y="400" width="120" height="140" rx="2" />
        <line x1="1050" y1="450" x2="1062" y2="450" strokeWidth="0.3" />
        <rect x="880" y="570" width="180" height="100" rx="2" />
        <circle cx="1020" cy="600" r="20" strokeWidth="0.4" strokeDasharray="3,3" />
        <circle cx="1020" cy="600" r="12" strokeWidth="0.3" />
        <line x1="998" y1="600" x2="1042" y2="600" strokeWidth="0.3" />
        <line x1="1020" y1="578" x2="1020" y2="622" strokeWidth="0.3" />
      </g>

      {/* Dimension lines */}
      <g stroke="#2A3B32" strokeOpacity="0.12" fill="none" strokeWidth="0.5">
        <line x1="120" y1="218" x2="540" y2="218" />
        <line x1="120" y1="212" x2="120" y2="224" />
        <line x1="540" y1="212" x2="540" y2="224" />
        <polygon points="540,218 535,214 535,222" fill="#2A3B32" fillOpacity="0.12" stroke="none" />
        <polygon points="120,218 125,214 125,222" fill="#2A3B32" fillOpacity="0.12" stroke="none" />
        <text x="330" y="212" textAnchor="middle" fontSize="9" fill="#2A3B32" fillOpacity="0.2" stroke="none" fontFamily="sans-serif">12.00 m</text>

        <line x1="858" y1="470" x2="858" y2="540" />
        <line x1="852" y1="470" x2="864" y2="470" />
        <line x1="852" y1="540" x2="864" y2="540" />
        <polygon points="858,470 854,475 862,475" fill="#2A3B32" fillOpacity="0.12" stroke="none" />
        <polygon points="858,540 854,535 862,535" fill="#2A3B32" fillOpacity="0.12" stroke="none" />
        <text x="862" y="508" textAnchor="start" fontSize="9" fill="#2A3B32" fillOpacity="0.2" stroke="none" fontFamily="sans-serif">8.50 m</text>
      </g>

      {/* Decorative circles */}
      <g stroke="#2A3B32" strokeOpacity="0.1" fill="none" strokeWidth="0.5">
        <circle cx="720" cy="120" r="80" strokeDasharray="4,6" />
        <circle cx="720" cy="120" r="65" />
        <circle cx="720" cy="120" r="50" strokeDasharray="2,4" />
        <circle cx="720" cy="120" r="35" />

        <line x1="636" y1="120" x2="804" y2="120" strokeWidth="0.3" />
        <line x1="720" y1="36" x2="720" y2="204" strokeWidth="0.3" />
      </g>

      {/* Decorative arcs */}
      <g stroke="#C8755D" strokeOpacity="0.08" fill="none" strokeWidth="0.6">
        <path d="M 1145 750 Q 1200 695 1255 750" />
        <path d="M 1145 750 Q 1200 805 1255 750" />
        <circle cx="1200" cy="750" r="5" strokeWidth="0.4" />
        <circle cx="1200" cy="750" r="12" strokeWidth="0.3" strokeDasharray="2,2" />
      </g>

      {/* Title block */}
      <g stroke="#2A3B32" strokeOpacity="0.12" fill="none" strokeWidth="0.6">
        <rect x="30" y="810" width="220" height="60" />
        <rect x="30" y="810" width="220" height="20" fill="#2A3B32" fillOpacity="0.06" stroke="none" />
        <text x="45" y="824" fontSize="9" fill="#2A3B32" fillOpacity="0.2" stroke="none" fontFamily="sans-serif" fontWeight="bold">A-01</text>
        <text x="140" y="824" fontSize="9" fill="#2A3B32" fillOpacity="0.2" stroke="none" fontFamily="sans-serif">SCALE 1:100</text>
        <text x="45" y="845" fontSize="8" fill="#2A3B32" fillOpacity="0.15" stroke="none" fontFamily="sans-serif">SITE PLAN · ELEVATION</text>
        <text x="45" y="858" fontSize="8" fill="#2A3B32" fillOpacity="0.15" stroke="none" fontFamily="sans-serif">2024</text>
      </g>

      {/* Small cross marks in corners */}
      {[
        [45, 45], [1395, 45], [45, 855], [1395, 855]
      ].map(([x, y], i) => (
        <g key={`cross-${i}`} stroke="#2A3B32" strokeOpacity="0.12" strokeWidth="0.5">
          <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
          <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
        </g>
      ))}
    </svg>
  );
};

export default BlueprintBackground;
