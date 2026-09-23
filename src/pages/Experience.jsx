import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    id: '01',
    title: 'FULLSTACK WEB DEVELOPER',
    company: 'SELF-EMPLOYED · JEPARA',
    desc: 'Building and maintaining web platforms — from landing pages to data-driven admin systems — delivering 20+ projects for local clients and school portfolios. Handling design, development, and deployment from requirements to production.',
    highlights: ['AGENTIC DEVELOPMENT', 'PRODUCTION MAINTENANCE', 'DATABASE & DATA OPERATIONS', 'REQUIREMENTS TO DELIVERY'],
    period: 'AUG 2024 — PRESENT · 1 YEAR',
    image: '/profile.webp',
  },
  {
    id: '02',
    title: 'TKJ STUDENT & NETWORKING',
    company: 'SMKN 3 JEPARA',
    desc: 'Vocational high school focusing on Computer & Network Engineering, Cisco, Mikrotik, and infrastructure. Combining logic and creativity while competing nationally in informatics and building reliable systems.',
    highlights: ['NETWORK INFRASTRUCTURE', 'CISCO & MIKROTIK LABS', 'COMPETITIVE PROGRAMMING', 'DESIGN & MOTION'],
    period: '2023 — PRESENT · 3 YEARS',
    image: '/og-image.png',
  },
  {
    id: '03',
    title: 'GOLD MEDALIST — INFORMATICS',
    company: 'FSBN & ONSP NASIONAL 2025',
    desc: 'Two gold medals at national level (FSBN & ONSP 2025) plus silver POSN 2022 and Excellent Robotic Maze Solving — proven consistency in algorithms, problem-solving, and competitive programming.',
    highlights: ['FSBN GOLD 2025', 'ONSP GOLD 2025', 'POSN SILVER 2022', 'ROBOTIC EXCELLENT 2022'],
    image: '/profile.webp',
  },
];

export default function Experience() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollTo = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-card]');
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      setActive(idx);
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstChild ? el.firstChild.offsetWidth + 24 : 1;
    const idx = Math.round(scrollLeft / cardWidth);
    setActive(Math.min(idx, experiences.length - 1));
  };

  return (
    <main className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* Spacer for fixed navbar */}
      <div className="h-[72px]" />

      {/* Header */}
      <section className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 pt-6 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/30 mb-3">Career Archive</p>
            <h1 className="text-[28px] md:text-[40px] font-black tracking-[-0.03em] leading-none">EXPERIENCES</h1>
          </div>
          <p className="mono text-[12px] md:text-[13px] text-white/40 md:text-right">Roles, systems, and the work behind them.</p>
        </div>
      </section>

      {/* Watermark */}
      <div className="relative overflow-hidden">
        <div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-black leading-none tracking-[-0.08em] text-white/[0.035]"
          style={{ fontSize: 'clamp(200px, 36vw, 560px)' }}
        >
          E
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`,
            backgroundSize: `24px 24px`,
          }}
        />

        {/* Cards slider */}
        <div className="relative max-w-[1440px] mx-auto">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-6 md:pl-10 lg:pl-12 pr-6 md:pr-10 lg:pr-12 pb-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                data-card
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="min-w-[92vw] sm:min-w-[560px] md:min-w-[820px] lg:min-w-[1080px] xl:min-w-[1120px] snap-start shrink-0 bg-[#F5F3EE] border border-white/10 flex flex-col md:flex-row h-auto md:h-[620px] overflow-hidden relative"
              >
                {/* Left */}
                <div className="w-full md:w-[52%] xl:w-[56%] bg-[#F5F3EE] p-7 sm:p-8 md:p-10 lg:p-12 flex flex-col">
                  <div className="flex items-center gap-2 mono text-[9.5px] tracking-[0.18em] uppercase text-black/40">
                    <span>Professional Experience</span>
                    <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white text-[8.5px] tracking-[0.14em] font-medium">WORK</span>
                  </div>

                  <h2 className="mt-6 md:mt-7 font-black tracking-[-0.045em] leading-[0.85] text-black text-[32px] sm:text-[40px] md:text-[42px] lg:text-[48px]">
                    {exp.title.split(' ').map((w, i) => (
                      <span key={i} className="block">{w}</span>
                    ))}
                  </h2>
                  <p className="mono text-[11px] md:text-[12px] font-semibold tracking-[0.08em] uppercase text-black mt-3">{exp.company}</p>

                  <p className="mt-7 md:mt-10 text-[13px] md:text-[14px] leading-[1.75] text-black/55 max-w-[440px] font-normal">{exp.desc}</p>

                  <div className="mt-auto pt-10 md:pt-8">
                    <p className="mono text-[10px] tracking-[0.2em] uppercase text-black/35 mb-3">Highlights</p>
                    <div className="border-t border-black/10">
                      <div className="grid grid-cols-2">
                        {exp.highlights.map((h, i) => (
                          <div
                            key={i}
                            className={`flex gap-2 py-3.5 md:py-4 mono text-[11px] font-semibold tracking-[0.04em] uppercase text-black border-black/10 ${i < 2 ? 'border-b' : ''} ${i % 2 === 0 ? 'border-r pr-3 md:pr-4' : 'pl-3 md:pl-4'}`}
                          >
                            <span className="text-black/25 font-normal mono text-[10px]">0{i + 1}</span>
                            <span className="leading-tight">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right image */}
                <div className="w-full md:w-[48%] xl:w-[44%] relative bg-[#0F0F0F] overflow-hidden aspect-[4/3] md:aspect-auto md:h-full">
                  <img
                    src={exp.image}
                    alt={exp.company}
                    className="w-full h-full object-cover grayscale contrast-[1.08] brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/[0.04]" />
                  <span className="absolute top-4 right-4 md:top-5 md:right-5 mono text-white text-[18px] md:text-[22px] font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{exp.id}</span>
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap mono text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    {exp.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots / progress */}
          <div className="flex items-center justify-center gap-2 pb-8">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`transition-all duration-300 rounded-full ${active === i ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/40'}`}
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>

          {/* Hint text mobile */}
          <p className="mono text-[10px] tracking-[0.18em] uppercase text-white/25 text-center pb-6 md:hidden">Swipe to explore →</p>
        </div>
      </div>

      {/* Bottom subtle line */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="h-[1px] bg-white/5 w-full" />
        <div className="py-6 flex items-center justify-between mono text-[10px] tracking-[0.18em] uppercase text-white/25">
          <span>0{experiences.length} Experiences</span>
          <span className="hidden md:inline">Scroll or swipe → 01 / 0{experiences.length}</span>
        </div>
      </div>
    </main>
  );
}
