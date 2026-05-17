import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GridBackground = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = svgRef.current?.querySelectorAll('line');
      if (!lines?.length) return;

      gsap.from(lines, {
        scrollTrigger: {
          trigger: svgRef.current?.closest('section'),
          start: 'top 80%',
          once: true,
        },
        strokeDashoffset: (i) => {
          const length = lines[i].getTotalLength?.() || 200;
          return length;
        },
        strokeDasharray: (i) => {
          const length = lines[i].getTotalLength?.() || 200;
          return length;
        },
        duration: 2,
        stagger: 0.03,
        ease: 'power2.out',
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      preserveAspectRatio="none"
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <line
          key={`h-${i}`}
          x1="0"
          y1={i * 75 + 37.5}
          x2="1440"
          y2={i * 75 + 37.5}
          stroke="#2A3B32"
          strokeOpacity="0.04"
          strokeWidth="0.5"
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 20 }, (_, i) => (
        <line
          key={`v-${i}`}
          x1={i * 75 + 37.5}
          y1="0"
          x2={i * 75 + 37.5}
          y2="900"
          stroke="#2A3B32"
          strokeOpacity="0.04"
          strokeWidth="0.5"
        />
      ))}
      {/* Diagonal accent lines */}
      {[0, 1, 2].map((i) => (
        <line
          key={`d-${i}`}
          x1={i * 400}
          y1="0"
          x2={i * 400 + 300}
          y2="900"
          stroke="#C8755D"
          strokeOpacity="0.03"
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <line
          key={`dd-${i}`}
          x1={i * 400 + 200}
          y1="0"
          x2={i * 400 - 100}
          y2="900"
          stroke="#C8755D"
          strokeOpacity="0.03"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
};

export default GridBackground;
