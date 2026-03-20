import React, { useEffect, useRef } from 'react';

const VIVID_COLORS = [
  '#FF6B6B', // Red/Pink
  '#4ECDC4', // Cyan
  '#FFE66D', // Yellow/Peach
  '#A8E6CF', // Light Green
  '#FFA07A', // Light Salmon
  '#9B59B6', // Purple
  '#87CEFA', // Light Sky Blue
];

const MagneticTitle = ({ text, className = "", vivid = false, colors = null, persistent = true }) => {
  const containerRef = useRef(null);
  const palette = colors || VIVID_COLORS;

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('.magnetic-letter');
    
    if (vivid && persistent) {
      letters.forEach(el => {
        const color = palette[Math.floor(Math.random() * palette.length)];
        el.dataset.color = color;
        el.style.color = color;
      });
    } else if (vivid && !persistent) {
      letters.forEach(el => {
        el.dataset.color = palette[Math.floor(Math.random() * palette.length)];
      });
    }

    const onMouseMove = ({ clientX, clientY }) => {
      letters.forEach(el => {
        const { left, top, width, height } = el.getBoundingClientRect();
        const dx = clientX - (left + width / 2);
        const dy = clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);
        
        const intensity = Math.max(0, (90 - dist) / 90);

        if (intensity > 0) {
          const xPercent = (-dx * intensity * 100) / width;
          const yPercent = (-dy * intensity * 100) / height;
          const scale = 1 + intensity * 0.2;

          el.style.transform = `translate(${xPercent}%, ${yPercent}%) scale(${scale})`;
          if (vivid) {
            el.style.color = el.dataset.color;
            el.style.textShadow = `0 4px 12px ${el.dataset.color}80`;
          } else {
            el.style.color = '#1A1A1A'; 
          }
        } else {
          el.style.transform = '';
          if (vivid && persistent) {
            el.style.color = el.dataset.color;
            el.style.textShadow = '';
          } else {
            el.style.color = '';
            el.style.textShadow = '';
          }
        }
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [vivid]);

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap gap-y-2 cursor-default select-none ${className}`}
    >
      {text.split(' ').map((word, wIdx) => (
        <div key={wIdx} className="flex">
          {word.split('').map((char, cIdx) => (
            <span
              key={`${wIdx}-${cIdx}`}
              className="magnetic-letter inline-block transition-all duration-150 ease-out will-change-transform"
              style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
            >
              {char}
            </span>
          ))}
          {wIdx < text.split(' ').length - 1 && (
            <span className="space pointer-events-none" style={{ width: '0.35em' }}>&nbsp;</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MagneticTitle;
