import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCurve({ triggerRef }) {
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    if (!triggerRef?.current || !pathRef.current) return;
    const curved = "M0 88 Q720 -30 1440 88 L1440 100 L0 100 Z";
    const straight = "M0 100 Q720 100 1440 100 L1440 100 L0 100 Z";
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
    <div className="absolute bottom-0 left-0 w-full h-[100px] overflow-hidden pointer-events-none z-20">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-[130%] md:w-[110%] h-[100px] absolute left-1/2 -translate-x-1/2 bottom-0">
        <path ref={pathRef} d="M0 88 Q720 -30 1440 88 L1440 100 L0 100 Z" fill="#0A0A0A" />
      </svg>
    </div>
  );
}
