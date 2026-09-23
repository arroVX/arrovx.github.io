import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function Marquee({ items = [], dark = false }) {
  const trackRef = useRef(null);
  const duplicated = [...items, ...items, ...items, ...items];

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      // Infinite xPercent loop — independen dari scroll, linear
      gsap.to(track, {
        xPercent: -50,
        duration: 20,
        ease: 'linear',
        repeat: -1,
      });
    }, track);
    return () => ctx.revert();
  }, []);

  return (
    <div className={`relative w-full overflow-hidden border-y py-4 ${dark ? 'border-white/10 bg-[#0A0A0A]' : 'border-black/5 bg-white'}`}>
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform w-max">
        {duplicated.map((item, i) => (
          <span key={i} className={`mono text-sm font-medium tracking-widest uppercase inline-flex items-center ${dark ? 'text-white/55' : 'text-black/70'}`}>
            <span className="mx-6">{item}</span>
            <span className={dark ? 'text-white/20' : 'text-black/20'}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
