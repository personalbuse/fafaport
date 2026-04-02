import React, { useEffect, useRef, useState } from 'react';

const VIVID_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#FFE66D',
  '#A8E6CF',
  '#FFA07A',
  '#9B59B6',
  '#87CEFA',
];

const HouseIcon = ({ className = "" }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="50,15 90,55 10,55" fill="currentColor"/>
    <rect x="25" y="55" width="50" height="40" fill="currentColor"/>
    <rect x="40" y="70" width="20" height="25" fill="#F9F6F0"/>
    <polygon points="50,15 35,40 65,40" fill="currentColor" opacity="0.7"/>
  </svg>
);

const MagneticTitle = ({ text, className = "", vivid = false, colors = null, persistent = true }) => {
  const containerRef = useRef(null);
  const [morphProgress, setMorphProgress] = useState(0);
  const palette = colors || VIVID_COLORS;
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('.magnetic-letter');
    const titleWrapper = containerRef.current.closest('.title-animated');
    
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
      const rect = containerRef.current.getBoundingClientRect();
      const isNear = clientX >= rect.left - 50 && 
                     clientX <= rect.right + 50 && 
                     clientY >= rect.top - 50 && 
                     clientY <= rect.bottom + 50;

      setIsAnimating(isNear);

      if (titleWrapper) {
        if (isNear) {
          titleWrapper.classList.add('paused');
        } else {
          titleWrapper.classList.remove('paused');
        }
      }

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
  }, [vivid, palette]);

  useEffect(() => {
    const maxScrollDistance = window.innerHeight * 0.5;
    
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / maxScrollDistance, 1);
      setMorphProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderChar = (char, wIdx, cIdx) => {
    if (char === 'y' && wIdx === 0 && cIdx === 6) {
      const charOpacity = Math.max(0, 1 - morphProgress);
      const houseOpacity = Math.min(1, morphProgress);
      
      return (
        <span
          key={`${wIdx}-${cIdx}`}
          className="morph-letter relative inline-flex items-center justify-center w-[0.8em] h-[0.9em] align-middle mx-0.5"
        >
          <span 
            className="char absolute text-dark"
            style={{
              opacity: charOpacity,
              fontSize: '1em',
              transition: 'opacity 0.1s linear',
            }}
          >
            {char}
          </span>
          <span 
            className="house absolute text-dark"
            style={{
              opacity: houseOpacity,
              width: '1.2em',
              height: '1.2em',
              transition: 'opacity 0.1s linear',
            }}
          >
            <HouseIcon className="w-full h-full" />
          </span>
        </span>
      );
    }

    return (
      <span
        key={`${wIdx}-${cIdx}`}
        className="magnetic-letter inline-block transition-all duration-150 ease-out will-change-transform"
        style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        {char}
      </span>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className={`flex flex-wrap gap-y-2 cursor-default select-none ${className}`}
    >
      {text.split(' ').map((word, wIdx) => (
        <div key={wIdx} className="flex">
          {word.split('').map((char, cIdx) => renderChar(char, wIdx, cIdx))}
          {wIdx < text.split(' ').length - 1 && (
            <span className="space pointer-events-none" style={{ width: '0.35em' }}>&nbsp;</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MagneticTitle;