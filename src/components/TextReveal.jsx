import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal — Split per-kata, scrub opacity/color
 * Props: text, className, wordClass, boldWords[], start, end
 */
export default function TextReveal({ text, className = '', wordClass = 'inline-block mr-[0.22em] will-change-[opacity,color]', boldWords = [], start = 'top 80%', end = 'bottom 50%', dimColor = 'rgba(10,10,10,0.18)', activeColor = 'rgba(10,10,10,0.92)' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll('[data-word]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(words, { color: activeColor });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(words, {
        color: activeColor,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        }
      });
    }, el);
    return () => ctx.revert();
  }, [text, start, end, activeColor]);

  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const isBold = boldWords.includes(w.replace(/[^a-zA-Z-]/g, ''));
        return (
          <span key={i} data-word className={`${wordClass} ${isBold ? 'font-medium' : ''}`} style={{ color: dimColor }}>
            {w}
          </span>
        );
      })}
    </p>
  );
}
