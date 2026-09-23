import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useFadeUpReveal — reusable fade-up on enter
 * usage: const ref = useRef(); useFadeUpReveal(ref);
 */
export default function useFadeUpReveal(ref, options = {}) {
  const { y = 32, start = 'top 88%', duration = 0.7, stagger = 0, once = true } = options;
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration,
        ease: 'power2.out',
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        }
      });
    }, el);
    return () => ctx.revert();
  }, [y, start, duration, stagger, once]);
}
