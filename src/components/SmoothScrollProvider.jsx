import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children, enabled = true }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.45,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;
    window.__LENIS__ = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(time => lenis.raf(time * 1000));
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      window.__LENIS__ = null;
    };
  }, [enabled]);

  return children;
}
