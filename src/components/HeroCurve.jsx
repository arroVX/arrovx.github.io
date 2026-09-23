import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCurve({ triggerRef }) {
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    if (!triggerRef?.current || !pathRef.current) return;
    const curved = "M0 30 Q720 -12 1440 30 L1440 40 L0 40 Z";
    const straight = "M0 40 Q720 40 1440 40 L1440 40 L0 40 Z";
    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        attr: { d: straight },
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        }
      });
    });
    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[40px] overflow-hidden pointer-events-none z-20">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-[120%] md:w-full h-[40px] absolute left-1/2 -translate-x-1/2 bottom-0">
        <path ref={pathRef} d="M0 30 Q720 -12 1440 30 L1440 40 L0 40 Z" fill="#0A0A0A" />
      </svg>
    </div>
  );
}
