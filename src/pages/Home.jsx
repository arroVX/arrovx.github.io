import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, Github, Instagram, Mail, ExternalLink, Globe, Layers, Terminal, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Marquee from '../components/Marquee';
import SwiperGallery from '../components/SwiperGallery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Data - Experience pakai biodata Arro (tanpa Iqmal) tapi layout persis reference
const experiences = [
  {
    id: '01',
    role: 'FULLSTACK WEB DEVELOPER',
    company: 'SELF-EMPLOYED · JEPARA',
    period: 'AUG 2024 — PRESENT · 1 YEAR',
    desc: 'Building and maintaining web platforms — from landing pages to data-driven admin systems — delivering 20+ projects for local clients and school portfolios. Handling design, development, and deployment from requirements to production.',
    highlights: ['AGENTIC DEVELOPMENT', 'PRODUCTION MAINTENANCE', 'DATABASE & DATA OPERATIONS', 'REQUIREMENTS TO DELIVERY'],
    image: '/profile.webp',
    tag: 'Work',
    longDesc: 'Building and maintaining web platforms — from landing pages to data-driven admin systems — delivering 20+ projects for local clients and school portfolios.'
  },
  {
    id: '02',
    role: 'TKJ STUDENT & NETWORKING',
    company: 'SMKN 3 JEPARA',
    period: '2023 — PRESENT · 3 YEARS',
    desc: 'Siswa TKJ SMKN 3 Jepara fokus pada Computer & Network Engineering, Cisco, Mikrotik, dan infrastruktur jaringan. Menggabungkan logic dan kreativitas sambil berkompetisi nasional di informatika.',
    highlights: ['NETWORK INFRASTRUCTURE', 'CISCO & MIKROTIK LABS', 'COMPETITIVE PROGRAMMING', 'DESIGN & MOTION'],
    image: 'project-assets/images/0001_0.png',
    tag: 'Education'
  },
  {
    id: '03',
    role: 'GOLD MEDALIST — INFORMATICS',
    company: 'FSBN & ONSP NASIONAL 2025',
    period: '2025 · NATIONAL LEVEL',
    desc: 'Meraih Medali Emas di dua kompetisi informatika nasional (FSBN & ONSP 2025), ditambah Perak POSN 2022 dan Excellent Robotic Maze Solving — konsistensi dalam algoritma dan problem solving.',
    highlights: ['FSBN GOLD 2025', 'ONSP GOLD 2025', 'POSN SILVER 2022', 'ROBOTIC EXCELLENT 2022'],
    image: '/og-image.png',
    tag: 'Achievement'
  },
];

const marqueeItems = ['Next.js', 'Laravel', 'React', 'Tailwind CSS', 'Firebase', 'Networking', 'Figma', 'Photoshop', ' Premiere', 'Cisco'];

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const techs = Array.isArray(project.tech) ? project.tech : (typeof project.tech === 'string' ? project.tech.split(',').map(s => s.trim()) : []);
  const features = project.features || [];
  const images = [project.image, project.image, project.image].filter(Boolean);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.98, y: 12, opacity: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        className="w-full max-w-6xl max-h-[92vh] md:max-h-[88vh] bg-white rounded-2xl border border-black/10 shadow-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl px-5 md:px-8 py-4 border-b border-black/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 mono text-xs tracking-widest uppercase text-black/40">
            <span>Projects</span>
            <span className="w-1 h-1 bg-black/20 rounded-full" />
            <span className="text-black truncate max-w-[180px]">{project.title}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div>
                <p className="mono text-xs tracking-[0.2em] uppercase text-black/40 mb-3">{project.category || 'Portfolio'} · {project.classLevel || 'General'}</p>
                <h2 className="headline-serif text-4xl md:text-5xl mb-4 leading-none">{project.title}</h2>
                <p className="text-black/60 leading-relaxed">{project.longDesc || project.desc}</p>
              </div>

              {features.length > 0 && (
                <div className="border-t border-black/5 pt-6">
                  <p className="mono text-xs tracking-widest uppercase text-black/30 mb-3">Highlights</p>
                  <div className="space-y-2">
                    {features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="mono text-xs text-black/30">0{i + 1}</span>
                        <span className="text-black/70 leading-relaxed flex-1">{typeof f === 'string' ? f : JSON.stringify(f)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {techs.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-xs tracking-wide">{t}</span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                {(project.liveUrl && project.liveUrl !== '#') && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black/80">
                    <Globe size={16} /> Live Demo
                  </a>
                )}
                {(project.githubUrl && project.githubUrl !== '#') && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-black/10 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black hover:text-white">
                    <Github size={16} /> GitHub
                  </a>
                )}
                {project.fileUrl && (
                  <a href={project.fileUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 border border-black/10 rounded-full text-sm font-medium inline-flex items-center gap-2">
                    <ExternalLink size={16} /> File
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl overflow-hidden border border-black/5 bg-zinc-100">
                <img src={project.image} alt={project.title} className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {images.slice(0, 3).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-black/5 bg-zinc-100 aspect-[4/3]">
                    <img src={img} alt="" className="w-full h-full object-cover opacity-70" />
                  </div>
                ))}
              </div>
              <div className="mono text-xs tracking-widest text-black/20 text-center">01 / 03 — Gallery</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function HomeExperienceSlider({ experiences, trackRef, onActiveChange, onDotClick }) {
  const scrollRef = useRef(null);
  const [activeLocal, setActiveLocal] = useState(0);
  const active = onActiveChange ? undefined : activeLocal;
  const setActive = onActiveChange || setActiveLocal;

  // Dots -> loncat ke posisi scroll pin yang tepat (via ScrollTrigger, bukan offsetTop)
  const scrollTo = (idx) => {
    if (onDotClick) {
      onDotClick(idx);
      return;
    }
    // Fallback native scroll when GSAP not ready (reduced motion)
    const expSection = document.getElementById('experience');
    if (expSection && trackRef && trackRef.current) {
      const track = trackRef.current;
      const amount = Math.max(0, track.scrollWidth - window.innerWidth + 48);
      const progress = idx / Math.max(1, experiences.length - 1);
      const targetY = expSection.offsetTop + progress * amount;
      const lenis = window.__LENIS__ || null;
      // If lenis available via global, use it, else smooth scroll
      if (lenis) lenis.scrollTo(targetY, { duration: 1.1 });
      else window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }
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
    const card = el.firstChild;
    const gap = 24;
    const w = card ? card.offsetWidth + gap : 1;
    const idx = Math.round(scrollLeft / w);
    setActive(Math.min(Math.max(idx, 0), experiences.length - 1));
  };

  // Use external trackRef for GSAP hijack — render differently
  if (trackRef) {
    return (
      <div className="relative max-w-[1440px] mx-auto overflow-hidden">
        {/* Track that GSAP translates horizontally */}
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 will-change-transform pl-6 md:pl-10 lg:pl-12 pr-6 md:pr-10 lg:pr-12 pb-4 md:pb-8"
          style={{ width: 'max-content' }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              data-card
              className="min-w-[86vw] sm:min-w-[560px] md:min-w-[820px] lg:min-w-[1080px] xl:min-w-[1120px] shrink-0 bg-[#F5F3EE] border border-white/10 flex flex-col md:flex-row h-[68svh] md:h-[clamp(460px,60vh,620px)] overflow-hidden relative"
            >
              <div className="w-full md:w-[52%] xl:w-[56%] bg-[#F5F3EE] p-5 md:p-10 lg:p-12 flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-2 mono text-[9px] md:text-[9.5px] tracking-[0.18em] uppercase text-black/40">
                  <span>Professional Experience</span>
                  <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white text-[8px] md:text-[8.5px] tracking-[0.14em] font-medium">WORK</span>
                </div>
                <h3 className="mt-4 md:mt-7 font-black tracking-[-0.045em] leading-[0.9] text-black text-[26px] sm:text-[32px] md:text-[42px] lg:text-[48px]">
                  {exp.role.split(' ').map((w, i) => (
                    <span key={i} className="inline-block mr-[0.2em]">{w}</span>
                  ))}
                </h3>
                <p className="mono text-[10px] md:text-[12px] font-semibold tracking-[0.08em] uppercase text-black mt-2 md:mt-3">{exp.company}</p>
                <p className="mt-4 md:mt-10 text-[12px] md:text-[14px] leading-[1.6] md:leading-[1.75] text-black/55 max-w-[440px] line-clamp-3 md:line-clamp-none">{exp.desc}</p>
                <div className="mt-auto pt-4 md:pt-8">
                  <p className="mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-black/35 mb-2 md:mb-3">Highlights</p>
                  <div className="border-t border-black/10">
                    <div className="grid grid-cols-2">
                      {exp.highlights.map((h, i) => (
                        <div
                          key={i}
                          className={`flex gap-2 py-2 md:py-4 mono text-[10px] md:text-[11px] font-semibold tracking-[0.04em] uppercase text-black border-black/10 ${i < 2 ? 'border-b' : ''} ${i % 2 === 0 ? 'border-r pr-3 md:pr-4' : 'pl-3 md:pl-4'}`}
                        >
                          <span className="text-black/25 font-normal mono text-[10px]">0{i + 1}</span>
                          <span className="leading-tight">{String(h).replace(/^\d+\s*/, '').toUpperCase()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[48%] xl:w-[44%] relative bg-[#0F0F0F] overflow-hidden h-44 sm:h-52 shrink-0 md:shrink md:h-full md:aspect-auto">
                <img src={exp.image} alt={exp.company} className="w-full h-full object-cover object-top grayscale contrast-[1.08] brightness-[0.92]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 md:top-5 md:right-5 mono text-white text-[18px] md:text-[22px] font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{exp.id}</span>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap mono text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">{exp.period}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 pb-4">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${i === 0 ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/40'}`}
              data-dot={i}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>
        <p className="mono text-[10px] tracking-[0.18em] uppercase text-white/25 text-center pb-2 md:hidden">Scroll vertikal → gerak horizontal</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-[1440px] mx-auto">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-6 md:pl-10 lg:pl-12 pr-6 md:pr-10 lg:pr-12 pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
        {experiences.map((exp) => (
          <div
            key={exp.id}
            data-card
            className="min-w-[86vw] sm:min-w-[560px] md:min-w-[820px] lg:min-w-[1080px] xl:min-w-[1120px] snap-start shrink-0 bg-[#F5F3EE] border border-white/10 flex flex-col md:flex-row h-[68svh] md:h-[clamp(460px,60vh,620px)] overflow-hidden relative"
          >
            <div className="w-full md:w-[52%] xl:w-[56%] bg-[#F5F3EE] p-7 sm:p-8 md:p-10 lg:p-12 flex flex-col">
              <div className="flex items-center gap-2 mono text-[9.5px] tracking-[0.18em] uppercase text-black/40">
                <span>Professional Experience</span>
                <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white text-[8.5px] tracking-[0.14em] font-medium">WORK</span>
              </div>
              <h3 className="mt-6 md:mt-7 font-black tracking-[-0.045em] leading-[0.85] text-black text-[32px] sm:text-[40px] md:text-[42px] lg:text-[48px]">
                {exp.role.split(' ').map((w, i) => (
                  <span key={i} className="inline-block mr-[0.2em]">{w}</span>
                ))}
              </h3>
              <p className="mono text-[11px] md:text-[12px] font-semibold tracking-[0.08em] uppercase text-black mt-3">{exp.company}</p>
              <p className="mt-7 md:mt-10 text-[13px] md:text-[14px] leading-[1.75] text-black/55 max-w-[440px]">{exp.desc}</p>
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
                        <span className="leading-tight">{String(h).replace(/^\d+\s*/, '').toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[48%] xl:w-[44%] relative bg-[#0F0F0F] overflow-hidden h-44 sm:h-52 shrink-0 md:shrink md:h-full md:aspect-auto">
              <img src={exp.image} alt={exp.company} className="w-full h-full object-cover object-top grayscale contrast-[1.08] brightness-[0.92]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 md:top-5 md:right-5 mono text-white text-[18px] md:text-[22px] font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{exp.id}</span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap mono text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">{exp.period}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 pb-6">
        {experiences.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${active === i ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/25 hover:bg-white/40'}`}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
      <p className="mono text-[10px] tracking-[0.18em] uppercase text-white/25 text-center pb-2 md:hidden">Swipe to explore →</p>
    </div>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [firebaseProjects, setFirebaseProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const stackRef = useRef(null);
  const heroRef = useRef(null);
  const expSectionRef = useRef(null);
  const expTrackRef = useRef(null);
  const horizSTRef = useRef(null);

  // Dots -> loncat ke posisi pin horizontal yang tepat (sesuai progress ScrollTrigger)
  const scrollToCard = (idx) => {
    const st = horizSTRef.current;
    const progress = idx / Math.max(1, experiences.length - 1);
    if (st) {
      const target = st.start + progress * (st.end - st.start);
      const lenis = window.__LENIS__ || null;
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else window.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const heroCurveRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFirebaseProjects(data);
      setLoadingProjects(false);
    }, () => setLoadingProjects(false));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedProject]);

  const displayProjects = firebaseProjects.length ? firebaseProjects : [];

  // --- Sticky Overlay + Horizontal Hijack + Unpinning + Lenis momentum ---
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stack = stackRef.current;
      const hero = heroRef.current;
      const exp = expSectionRef.current;
      const track = expTrackRef.current;
      if (!stack || !hero || !exp || !track) return;

      // 1) Sticky Overlay: hero pakai CSS sticky (bukan GSAP pin) supaya tidak
      // bentrok dengan pin horizontal Experiences (nested pin = gap/strip putih + kartu kepotong).
      // Hero: sticky top-0 z-10, Experiences: relative z-20 menutupi seperti tirai.

      // 1b) Hero curve morph — busur melengkung → lurus (scrub)
      if (heroCurveRef.current) {
        const straight = "M0 100 Q720 100 1440 100 L1440 100 L0 100 Z";
        gsap.to(heroCurveRef.current, {
          attr: { d: straight },
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.1,
          }
        });
      }

      // 1c) About TextReveal per kata — abu redup → putih tegas (scrub, ala iqmal.dev)
      const about = aboutRef.current;
      if (about) {
        const words1 = about.querySelectorAll('.about-word');
        const wordsDim = about.querySelectorAll('.about-word-dim');
        const words2 = about.querySelectorAll('.about-word2');
        gsap.to(words1, {
          color: 'rgba(255,255,255,0.96)',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          }
        });
        gsap.to(wordsDim, {
          color: 'rgba(255,255,255,0.55)',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          }
        });
        gsap.to(words2, {
          color: 'rgba(255,255,255,0.5)',
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true,
          }
        });
      }

      // 2) Horizontal Hijack: vertikal → horizontal di #experience (3 cards) — tetap aktif mobile, lamban dramatis
      const getAmount = () => {
        const scrollWidth = track.scrollWidth;
        const viewport = window.innerWidth;
        return Math.max(0, scrollWidth - viewport + 48);
      };

      const horizTween = gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
      });

      const st = ScrollTrigger.create({
        trigger: exp,
        start: 'top top',
        end: () => `+=${getAmount()}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.35,
        anticipatePin: 1,
        animation: horizTween,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const progress = self.progress;
          const idx = Math.round(progress * (experiences.length - 1));
          const dots = exp.querySelectorAll('[data-dot]');
          dots.forEach((d, i) => {
            if (i === idx) {
              d.className = 'transition-all duration-300 rounded-full w-6 h-1.5 bg-white';
            } else {
              d.className = 'transition-all duration-300 rounded-full w-1.5 h-1.5 bg-white/25 hover:bg-white/40';
            }
          });
        }
      });
      horizSTRef.current = st;

      // Optional parallax watermark — lamban
      gsap.to(exp.querySelector('[data-watermark]'), {
        xPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: exp,
          start: 'top top',
          end: () => `+=${getAmount()}`,
          scrub: 1.35,
        }
      });

      // 6) Generic fade-up reveal untuk section lain (projects, contact) — tanpa scrub
      // Satu selector saja supaya tiap elemen cuma dapat 1 tween.
      // #about DIKECUALIKAN: ia punya scrub reveal per-kata sendiri + baseline inline
      // yang sudah terlihat redup; fade generik (opacity 0) berisiko menyembunyikan
      // satu section utuh kalau triggernya meleset.
      gsap.utils.toArray('[data-reveal]').forEach(el => {
        if (el.id === 'experience' || el.id === 'home' || el.id === 'about') return;
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          }
        });
      });
      // Per-project stagger inside #projects
      const projItems = document.querySelectorAll('#projects [data-project-card]');
      if (projItems.length) {
        gsap.from(projItems, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          }
        });
      }

    }, stackRef);

    // refresh after images/fonts load (webfont mengubah tinggi heading -> jarak pin bergeser)
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
    }
    // small delay for layout
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
      horizSTRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <main className="bg-[#e8e8e5] text-[#0a0a0a]">
      <div ref={stackRef} id="sticky-stack" className="relative">
        {/* HERO — sticky overlay via CSS (dikunci putih, ditutupi Experiences seperti tirai) */}
        <section ref={heroRef} id="home" className="sticky top-0 z-10 min-h-[100dvh] bg-[#e8e8e5] overflow-hidden flex flex-col">
        {/* subtle top vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(0,0,0,0.02), transparent 60%)' }} />

        <div className="relative flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12 flex flex-col justify-center pt-[96px] pb-[132px] lg:pt-[104px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 xl:col-span-7"
            >
              {/* Social icons row */}
              <div className="flex items-center gap-[14px] mb-7">
                <a href="https://github.com/arroVX" target="_blank" rel="noopener noreferrer" className="text-black/35 hover:text-black/60 transition-colors" aria-label="GitHub">
                  <Github size={18} strokeWidth={1.6} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-black/35 hover:text-black/60 transition-colors" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.instagram.com/jingroo_" target="_blank" rel="noopener noreferrer" className="text-black/35 hover:text-black/60 transition-colors" aria-label="Instagram">
                  <Instagram size={18} strokeWidth={1.6} />
                </a>
                <a href="mailto:arroudhilanfi01@gmail.com" className="text-black/35 hover:text-black/60 transition-colors" aria-label="Email">
                  <Mail size={18} strokeWidth={1.6} />
                </a>
              </div>

              <p className="mono text-[11px] tracking-[0.22em] uppercase text-black/40 mb-6">Central Java · Indonesia</p>

              <h1 className="headline-serif leading-[0.88] tracking-[-0.045em] text-black">
                <span className="block text-[52px] sm:text-[68px] lg:text-[84px] xl:text-[92px] font-normal">Hi, I'm</span>
                <span className="block text-[52px] sm:text-[68px] lg:text-[84px] xl:text-[92px] italic font-normal -mt-1">Arro.</span>
              </h1>

              <p className="mt-6 text-[20px] sm:text-[24px] lg:text-[28px] font-light tracking-[-0.02em] text-[#0a0a0a]/80 leading-none">
                Full-Stack Web Developer
              </p>

              <div className="mt-8">
                <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center justify-center mono text-[10px] tracking-[0.16em] font-bold bg-black text-white px-[22px] py-[11px] rounded-full hover:bg-black/85 transition-colors">
                  RESUME
                </a>
              </div>
            </motion.div>

            {/* Right — Portrait Card persis reference */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
              className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-[320px] sm:w-[360px] lg:w-[380px] xl:w-[410px] aspect-[0.78] rounded-[28px] overflow-hidden bg-[#0B0B0F] shadow-[0_28px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.16)] border border-black/10">
                {/* Top subtle line */}
                <div className="absolute top-[18px] left-5 right-5 h-[1px] bg-white/[0.06] z-10" />
                {/* Code icons decoration */}
                <div className="absolute top-[28px] left-0 right-0 flex justify-between px-6 pointer-events-none select-none z-10 opacity-[0.07]">
                  <span className="mono text-[42px] font-bold text-white rotate-[-12deg]">&lt;/&gt;</span>
                  <span className="mono text-[42px] font-bold text-white rotate-[12deg]">&lt;/&gt;</span>
                </div>
                {/* Gradient background */}
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 22%, #2A2A32 0%, #14151A 45%, #0B0B0F 100%)' }} />
                {/* Vignette bottom */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)' }} />

                {/* Portrait image - full color with white outline */}
                <img
                  src="/profile.webp"
                  alt="Arroudhil Anfi"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{
                    filter: 'contrast(1.05) brightness(1.0) drop-shadow(2px 0 0 rgba(255,255,255,0.92)) drop-shadow(-2px 0 0 rgba(255,255,255,0.92)) drop-shadow(0 2px 0 rgba(255,255,255,0.92)) drop-shadow(0 -1px 0 rgba(255,255,255,0.92))',
                  }}
                />
                {/* Bottom bar */}
                <div className="absolute bottom-[14px] left-[12px] right-[12px] bg-[#1C1D22]/95 backdrop-blur-xl rounded-[14px] border border-white/[0.07] px-3.5 py-[10px] flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-20">
                  <div>
                    <div className="mono text-[12.5px] font-semibold tracking-tight text-white leading-none">@arroVX</div>
                    <div className="mono text-[11px] text-white/45 leading-none mt-[5px]">Available for work!</div>
                  </div>
                  <span className="w-[8px] h-[8px] bg-[#1BFF6B] rounded-full shadow-[0_0_10px_rgba(27,255,107,0.85)] animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-[128px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-[20px] h-[30px] rounded-full border border-black/15 flex justify-center pt-1.5">
            <span className="w-[3px] h-[6px] bg-black/30 rounded-full block animate-bounce" />
          </div>
          <span className="mono text-[8.5px] tracking-[0.24em] uppercase text-black/30">Scroll Down</span>
          <span className="text-black/20 text-[10px] leading-none">↓</span>
        </div>

        {/* Curved black bottom divider — SVG morph driven by ScrollTrigger scrub */}
        <div className="absolute bottom-0 left-0 w-full h-[100px] overflow-hidden pointer-events-none z-20">
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-[130%] md:w-[110%] h-[100px] absolute left-1/2 -translate-x-1/2 bottom-0">
            <path
              ref={heroCurveRef}
              d="M0 88 Q720 -30 1440 88 L1440 100 L0 100 Z"
              fill="#0A0A0A"
            />
          </svg>
        </div>
      </section>

      {/* EXPERIENCES — dibawah landing page, persis Image 1, biodata Arro, bg hitam full-bleed — horizontal hijack */}
      <section ref={expSectionRef} id="experience" className="bg-[#0A0A0A] text-white relative z-20 overflow-hidden w-full min-h-[100svh] flex flex-col justify-center">
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12 pt-6 md:pt-8 pb-3 md:pb-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/30 mb-3">Career Archive</p>
              <h2 className="text-[28px] md:text-[40px] font-black tracking-[-0.03em] leading-none">EXPERIENCES</h2>
            </div>
            <p className="mono text-[12px] md:text-[13px] text-white/40">Roles, systems, and the work behind them.</p>
          </div>
        </div>

        {/* watermark + slider */}
        <div className="relative">
          <div data-watermark className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-black leading-none tracking-[-0.08em] text-white/[0.035]" style={{ fontSize: 'clamp(220px, 36vw, 560px)' }}>E</div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`, backgroundSize: `24px 24px` }} />

          {/* slider — hijack vertikal ke horizontal, lamban dramatis, tetap aktif mobile */}
          <HomeExperienceSlider experiences={experiences} trackRef={expTrackRef} onDotClick={scrollToCard} />
        </div>

        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12">
          <div className="h-[1px] bg-white/5 w-full" />
          <div className="py-3 flex items-center justify-between mono text-[10px] tracking-[0.18em] uppercase text-white/25">
            <span>0{experiences.length} Experiences</span>
            <Link to="/experience" className="hidden md:inline-flex items-center gap-1.5 hover:text-white/60 transition-colors">View all — Experience page <ArrowUpRight size={12} /></Link>
          </div>
        </div>
      </section>
      </div>{/* /sticky-stack — unpinning terjadi setelah kartu terakhir, lalu scroll vertikal normal ke About/Projects */}


      {/* ABOUT — ala iqmal.dev: statement besar center, reveal per-kata (redup -> putih), marquee gelap */}
      <section ref={aboutRef} id="about" data-reveal className="relative z-10 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-16 md:pb-20 text-center">
          <p className="mono text-[10px] tracking-[0.28em] uppercase text-white/30 mb-8">About</p>
          <p className="reveal-text tracking-[-0.02em] leading-[1.18] text-[clamp(26px,4.6vw,54px)] flex flex-wrap justify-center gap-x-[0.24em] gap-y-1">
            {"I build fullstack web systems with clean user interfaces, reliable backend architecture, and database-driven workflows helping turn complex processes into efficient digital products.".split(' ').map((w, i) => {
              const isBold = ['fullstack', 'web', 'systems', 'reliable', 'backend', 'architecture,', 'efficient', 'digital', 'products.'].includes(w);
              return <span key={i} className={`${isBold ? 'about-word font-bold' : 'about-word-dim font-normal'} inline-block will-change-[opacity,color]`} style={{ color: 'rgba(255,255,255,0.32)' }}>{w}</span>;
            })}
          </p>
          <p className="reveal-text2 mt-10 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-[0.2em] gap-y-1 text-[13px] md:text-sm leading-relaxed">
            {"Siswa TKJ SMKN 3 Jepara & Gold Medalist Informatika (FSBN & ONSP 2025). Fokus di React, Tailwind, Firebase, dan Network Infrastructure.".split(' ').map((w, i) => (
              <span key={i} className="about-word2 inline-block will-change-[opacity,color]" style={{ color: 'rgba(255,255,255,0.35)' }}>{w}</span>
            ))}
          </p>
        </div>
        <Marquee items={marqueeItems} dark />
      </section>

      {/* SELECTED PROJECTS — iqmal.dev carousel style — Swiper blur→sharp + fade-up */}
      <section id="projects" data-reveal className="py-16 md:py-24 bg-[#e8e8e5] border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="mono text-xs tracking-[0.2em] uppercase text-black/40">Projects</p>
              <h2 className="headline-serif text-4xl md:text-5xl mt-2">Selected projects</h2>
              <p className="mono text-xs tracking-widest uppercase text-black/30 mt-2">Portfolio showcase</p>
            </div>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-black/50 hover:text-black">
              View all projects <ArrowUpRight size={14} />
            </Link>
          </div>

          {loadingProjects ? (
            <div className="py-12 mono text-sm text-black/40">Loading projects...</div>
          ) : displayProjects.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-black/10 rounded-2xl bg-[#FCFCF9]">
              <p className="text-black/60">Belum ada project di database. Tambah via <Link to="/admin" className="underline">Admin</Link>.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {displayProjects.slice(0, 4).map((p, idx) => {
                const images = [p.image, p.image, p.image].filter(Boolean);
                const techs = Array.isArray(p.tech) ? p.tech : (typeof p.tech === 'string' ? p.tech.split(',').map(s => s.trim()) : []);
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={p.id || p.title}
                    data-project-card
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start ${!isEven ? 'lg:[&>div:first-child]:order-2' : ''}`}
                  >
                    <div className="lg:col-span-7">
                      <SwiperGallery images={images} title={p.title} />
                      <div className="flex items-center justify-between mt-3 mono text-xs tracking-widest text-black/30">
                        <span>0{idx + 1} / 0{displayProjects.slice(0, 4).length}</span>
                        <span className="hidden md:inline">swipe — 01 / 03</span>
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="mono text-xs tracking-widest uppercase text-black/40 mb-2">{String(idx + 1).padStart(2, '0')} · {p.category || 'Portfolio'}</div>
                      <h3 className="headline-serif text-3xl leading-none mb-3">{p.title}</h3>
                      <p className="text-black/60 leading-relaxed text-sm mb-4 line-clamp-3">{p.longDesc || p.desc}</p>
                      <div className="space-y-1 mb-4 border-l border-black/5 pl-4">
                        {(p.features || []).slice(0, 3).map((f, i) => (
                          <div key={i} className="mono text-xs text-black/50 flex gap-2">
                            <span className="text-black/20">0{i + 1}</span> <span className="line-clamp-1">{typeof f === 'string' ? f : ''}</span>
                          </div>
                        ))}
                        {(!p.features || p.features.length===0) && (
                          <div className="mono text-xs text-black/40">Highlights coming soon</div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {techs.slice(0, 6).map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-[11px]">{t}</span>
                        ))}
                      </div>
                      <button onClick={() => setSelectedProject(p)} className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black/80">
                        View project <ArrowUpRight size={16} />
                      </button>
                      {idx < displayProjects.slice(0, 4).length - 1 && (
                        <div className="mono text-xs tracking-widest uppercase text-black/20 mt-8 hidden lg:block">Next project / 0{idx + 2} / 0{displayProjects.slice(0, 4).length}</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          <div className="mt-10 md:hidden">
            <Link to="/projects" className="w-full justify-center inline-flex items-center gap-2 mono text-xs tracking-widest uppercase border border-black/10 rounded-full py-3">
              View all projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT — card putih rounded di atas beige, seperti referensi */}
      <section data-reveal className="bg-[#e8e8e5] py-16 md:py-24">
        <div id="contact" data-reveal className="max-w-7xl mx-auto px-6">
          <div className="rounded-[20px] border border-black/5 bg-white px-6 py-7 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div>
              <p className="mono text-[11px] tracking-[0.22em] uppercase text-black/40">Contact</p>
              <h3 className="headline-serif text-[22px] md:text-2xl mt-1.5 text-black">Let's build something useful.</h3>
            </div>
            <a href="mailto:arroudhilanfi01@gmail.com" className="shrink-0 px-7 py-3.5 bg-black text-white rounded-full text-[15px] font-medium inline-flex items-center gap-2 hover:bg-black/85 transition-colors">
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </main>
  );
}
