import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

export default function TechMarquee({ items = [] }) {
  const trackRef = useRef(null);
  const duplicated = [...items, ...items, ...items, ...items];

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
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
    <div className="relative w-full overflow-hidden border-y border-black/5 bg-white py-4">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform w-max">
        {duplicated.map((item, i) => (
          <span key={i} className="mono text-sm font-medium tracking-widest uppercase text-black/70 inline-flex items-center">
            <span className="mx-6">{item}</span>
            <span className="text-black/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
