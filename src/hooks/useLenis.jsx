import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 1.0,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(() => {
      lenis.raf(performance.now());
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;
