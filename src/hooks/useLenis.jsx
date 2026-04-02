import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.0,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;