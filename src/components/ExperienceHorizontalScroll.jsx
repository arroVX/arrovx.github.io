import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ExperienceHorizontalScroll — pinned background text + horizontal track
 * Props: experiences (3 items), tetap aktif di mobile via scrub
 */
export default function ExperienceHorizontalScroll({ experiences = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
      const tween = gsap.to(track, { x: () => -getAmount(), ease: 'none' });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getAmount()}`,
        pin: true,
        scrub: 1.35,
        anticipatePin: 1,
        animation: tween,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const progress = self.progress;
          const idx = Math.round(progress * (experiences.length - 1));
          section.querySelectorAll('[data-dot]').forEach((d, i) => {
            d.className = i === idx ? 'transition-all duration-300 rounded-full w-6 h-1.5 bg-white' : 'transition-all duration-300 rounded-full w-1.5 h-1.5 bg-white/25 hover:bg-white/40';
          });
          const viewportCenter = window.innerWidth / 2;
          track.querySelectorAll('[data-card]').forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const dist = Math.abs(cardCenter - viewportCenter);
            const maxDist = window.innerWidth * 0.55;
            const n = Math.min(1, dist / maxDist);
            card.style.opacity = 1 - n * 0.42;
            card.style.filter = `grayscale(${n}) blur(${n * 3.5}px)`;
            card.style.transform = `scale(${1 - n * 0.02})`;
          });
        }
      });

      gsap.to(section.querySelector('[data-watermark]'), {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getAmount()}`,
          scrub: 1.35,
        }
      });
    }, section);

    return () => ctx.revert();
  }, [experiences]);

  return (
    <section ref={sectionRef} id="experience" className="bg-[#0A0A0A] text-white relative overflow-hidden w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 pt-12 md:pt-16 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/30 mb-3">Career Archive</p>
            <h2 className="text-[28px] md:text-[40px] font-black tracking-[-0.03em] leading-none">EXPERIENCES</h2>
          </div>
          <p className="mono text-[12px] md:text-[13px] text-white/40">Roles, systems, and the work behind them.</p>
        </div>
      </div>
      <div className="relative">
        <div data-watermark className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-black leading-none tracking-[-0.08em] text-white/[0.035]" style={{ fontSize: 'clamp(220px, 36vw, 560px)' }}>E</div>
        <div className="relative max-w-[1440px] mx-auto overflow-hidden">
          <div ref={trackRef} className="flex gap-6 will-change-transform pl-6 md:pl-10 lg:pl-12 pr-6 md:pr-10 lg:pr-12 pb-8" style={{ width: 'max-content' }}>
            {experiences.map(exp => (
              <div key={exp.id} data-card className="min-w-[92vw] sm:min-w-[560px] md:min-w-[820px] lg:min-w-[1080px] xl:min-w-[1120px] shrink-0 bg-[#F5F3EE] border border-white/10 flex flex-col md:flex-row h-auto md:h-[620px] overflow-hidden relative">
                <div className="w-full md:w-[52%] bg-[#F5F3EE] p-7 md:p-10 lg:p-12 flex flex-col">
                  <div className="flex items-center gap-2 mono text-[9.5px] tracking-[0.18em] uppercase text-black/40"><span>Professional Experience</span><span className="px-2.5 py-1 rounded-full border border-black/10 bg-white text-[8.5px]">WORK</span></div>
                  <h3 className="mt-6 font-black tracking-[-0.045em] leading-[0.85] text-black text-[42px]">{exp.role}</h3>
                  <p className="mono text-[12px] font-semibold uppercase text-black mt-3">{exp.company}</p>
                  <p className="mt-8 text-[14px] leading-[1.75] text-black/55 max-w-[440px]">{exp.desc}</p>
                </div>
                <div className="w-full md:w-[48%] relative bg-[#0F0F0F] overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
                  <img src={exp.image} alt={exp.company} className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 pb-6">
            {experiences.map((_, i) => <button key={i} data-dot={i} className={`transition-all duration-300 rounded-full ${i===0?'w-6 h-1.5 bg-white':'w-1.5 h-1.5 bg-white/25'}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
