import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowUpRight,
  X,
  Github,
  Instagram,
  Mail,
  ExternalLink,
  Globe,
  Layers,
  Terminal,
  MapPin,
} from 'lucide-react'
import { db } from '../firebase'
import { collection, onSnapshot, DocumentData } from 'firebase/firestore'
import Marquee from '../components/Marquee'
import SwiperGallery from '../components/SwiperGallery'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

type ProjectData = DocumentData & {
  id?: string
  title?: string
  desc?: string
  longDesc?: string
  category?: string
  classLevel?: string
  tech?: string[] | string
  features?: string[]
  images?: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  fileUrl?: string
  role?: string
  company?: string
  relatedExperience?: string
  impact?: string
  impactPoints?: string[]
  stats?: { value: string; label: string }[]
}

type ExperienceItem = {
  id: string
  role: string
  company: string
  period: string
  desc: string
  highlights: string[]
  image: string
  tag?: string
  longDesc?: string
}

const experiences: ExperienceItem[] = [
  {
    id: '01',
    role: 'FULLSTACK WEB DEVELOPER',
    company: 'SELF-EMPLOYED · JEPARA',
    period: 'AUG 2024 — PRESENT · 1 YEAR',
    desc: 'Building and maintaining web platforms — from landing pages to data-driven admin systems — delivering 20+ projects for local clients and school portfolios. Handling design, development, and deployment from requirements to production.',
    highlights: ['AGENTIC DEVELOPMENT', 'PRODUCTION MAINTENANCE', 'DATABASE & DATA OPERATIONS', 'REQUIREMENTS TO DELIVERY'],
    image: '/profile.webp',
    tag: 'Work',
    longDesc: 'Building and maintaining web platforms — from landing pages to data-driven admin systems — delivering 20+ projects for local clients and school portfolios.',
  },
  {
    id: '02',
    role: 'TKJ STUDENT & NETWORKING',
    company: 'SMKN 3 JEPARA',
    period: '2023 — PRESENT · 3 YEARS',
    desc: 'Siswa TKJ SMKN 3 Jepara fokus pada Computer & Network Engineering, Cisco, Mikrotik, dan infrastruktur jaringan. Menggabungkan logic dan kreativitas sambil berkompetisi nasional di informatika.',
    highlights: ['NETWORK INFRASTRUCTURE', 'CISCO & MIKROTIK LABS', 'COMPETITIVE PROGRAMMING', 'DESIGN & MOTION'],
    image: '/project-assets/images/0001_0.png',
    tag: 'Education',
  },
  {
    id: '03',
    role: 'GOLD MEDALIST — INFORMATICS',
    company: 'FSBN & ONSP NASIONAL 2025',
    period: '2025 · NATIONAL LEVEL',
    desc: 'Meraih Medali Emas di dua kompetisi informatika nasional (FSBN & ONSP 2025), ditambah Perak POSN 2022 dan Excellent Robotic Maze Solving — konsistensi dalam algoritma dan problem solving.',
    highlights: ['FSBN GOLD 2025', 'ONSP GOLD 2025', 'POSN SILVER 2022', 'ROBOTIC EXCELLENT 2022'],
    image: '/og-image.png',
    tag: 'Achievement',
  },
  {
    id: '04',
    role: 'GRAPHIC DESIGNER & VISUAL CREATOR',
    company: 'FREELANCE · CREATIVE WORK',
    period: '2022 — PRESENT · 3 YEARS',
    desc: 'Designing posters, branding assets, and visual content — combining typography, photo manipulation, and layout design for school events, competitions, and local clients.',
    highlights: ['POSTER & FLYER DESIGN', 'BRANDING & IDENTITY', 'PHOTO MANIPULATION', 'MOTION & VIDEO EDIT'],
    image: '/project-assets/images/0001_0.png',
    tag: 'Creative',
  },
]

const marqueeItems = ['Next.js', 'Laravel', 'React', 'Tailwind CSS', 'Firebase', 'Networking', 'Figma', 'Photoshop', 'Premiere', 'Cisco']

type ProjectModalProps = {
  project: ProjectData | null
  onClose: () => void
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null
  const techs = Array.isArray(project.tech)
    ? project.tech
    : typeof project.tech === 'string'
      ? project.tech.split(',').map((s) => s.trim())
      : []
  const features = project.features || []
  const images = [
    ...(Array.isArray(project.images) ? project.images : []),
    project.image,
  ].filter((src, i, arr) => src && arr.indexOf(src) === i)

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
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl px-5 md:px-8 py-4 border-b border-black/5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 mono text-xs tracking-widest uppercase text-black/40">
            <span>Projects</span>
            <span className="w-1 h-1 bg-black/20 rounded-full" />
            <span className="text-black truncate max-w-[180px]">{project.title}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors" aria-label="Tutup detail project">
            <X size={16} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-8">
              <div>
                <p className="mono text-xs tracking-[0.2em] uppercase text-black/40 mb-3">
                  {project.category || 'Portfolio'} · {project.classLevel || 'General'}
                </p>
                <h2 className="headline-serif text-4xl md:text-5xl mb-4 leading-none">
                  {project.title}
                </h2>
                <p className="text-black/60 leading-relaxed">
                  {project.longDesc || project.desc}
                </p>
              </div>

              {features.length > 0 && (
                <div className="border-t border-black/5 pt-6">
                  <p className="mono text-xs tracking-widest uppercase text-black/30 mb-3">
                    Highlights
                  </p>
                  <div className="space-y-2">
                    {features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="mono text-xs text-black/30">0{i + 1}</span>
                        <span className="text-black/70 leading-relaxed flex-1">
                          {typeof f === 'string' ? f : JSON.stringify(f)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {techs.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-xs tracking-wide">
                    {t}
                  </span>
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
                <img
                  src={project.image}
                  alt={project.title || ''}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {images.slice(0, 3).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-black/5 bg-zinc-100 aspect-[4/3]">
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                ))}
              </div>
              <div className="mono text-xs tracking-widest text-black/20 text-center">
                {String(Math.min(images.length, 1)).padStart(2, '0')} / {String(images.length || 1).padStart(2, '0')} — Gallery
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

type HomeExperienceSliderProps = {
  experiences: ExperienceItem[]
  trackRef: React.RefObject<HTMLDivElement | null> | null
  onActiveChange?: (idx: number) => void
  onDotClick?: (idx: number) => void
}

function HomeExperienceSlider({
  experiences,
  trackRef,
  onActiveChange,
  onDotClick,
}: HomeExperienceSliderProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [activeLocal, setActiveLocal] = useState(0)
  const [activeTrack, setActiveTrack] = useState(0)
  const active = onActiveChange ? undefined : activeLocal
  const setActive = onActiveChange || setActiveLocal

  const scrollTo = (idx: number) => {
    if (!trackRef) {
      const el = scrollRef.current
      if (!el) return
      const cards = el.querySelectorAll<HTMLElement>('[data-card]')
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
        setActive(idx)
        setActiveTrack(idx)
      }
      return
    }
    if (onDotClick) {
      onDotClick(idx)
      setActiveTrack(idx)
      return
    }
    const expSection = document.getElementById('experience')
    if (expSection && trackRef && trackRef.current) {
      const track = trackRef.current
      const amount = Math.max(0, track.scrollWidth - window.innerWidth)
      const progress = idx / Math.max(1, experiences.length - 1)
      const targetY = expSection.offsetTop + progress * amount
      const lenis = (window as { __LENIS__?: { scrollTo: (y: number, opts?: { duration?: number }) => void } })
        .__LENIS__ || null
      if (lenis) lenis.scrollTo(targetY, { duration: 1.1 })
      else window.scrollTo({ top: targetY, behavior: 'smooth' })
      setActiveTrack(idx)
      return
    }
    const el = scrollRef.current
    if (!el) return
    const cards = el.querySelectorAll<HTMLElement>('[data-card]')
    if (cards[idx]) {
      cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
      setActive(idx)
      setActiveTrack(idx)
    }
  }

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const card = el.firstElementChild as HTMLElement | null
    const gap = 24
    const w = card ? card.offsetWidth + gap : 1
    const idx = Math.round(scrollLeft / w)
    setActive(Math.min(Math.max(idx, 0), experiences.length - 1))
    setActiveTrack(Math.min(Math.max(idx, 0), experiences.length - 1))
  }

  const trackActive = trackRef ? activeTrack : activeLocal

  if (trackRef) {
    return (
      <div className="relative max-w-[1440px] mx-auto overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-6 will-change-transform pl-6 md:pl-10 lg:pl-12 pr-6 md:pr-10 lg:pr-12 pb-4 md:pb-8"
          style={{ width: 'max-content' }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              data-card
              className="group min-w-[86vw] max-w-[86vw] sm:min-w-[560px] sm:max-w-none md:min-w-[820px] md:max-w-none lg:min-w-[1080px] lg:max-w-none xl:min-w-[1120px] xl:max-w-none shrink-0 bg-[#F5F3EE] border border-white/10 flex flex-col md:flex-row h-[68svh] md:h-[clamp(490px,64vh,640px)] overflow-hidden relative"
            >
              <div className="w-full md:w-[52%] xl:w-[56%] bg-[#F5F3EE] p-5 md:p-10 lg:p-12 flex flex-col flex-1 min-h-0 min-w-0">
                <div className="flex items-center gap-2 mono text-[9px] md:text-[9.5px] tracking-[0.18em] uppercase text-black/40">
                  <span>Professional Experience</span>
                  <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white text-[8px] md:text-[8.5px] tracking-[0.14em] font-medium">
                    {(exp.tag || 'Work').toUpperCase()}
                  </span>
                </div>
                <h3 className="mt-4 md:mt-7 flex flex-wrap font-black tracking-[-0.045em] leading-[0.9] text-black text-[22px] sm:text-[32px] md:text-[42px] lg:text-[48px] break-words">
                  {exp.role.split(' ').map((w, i) => (
                    <span key={i} className="inline-block mr-[0.2em]">
                      {w}
                    </span>
                  ))}
                </h3>
                <p className="mono text-[10px] md:text-[12px] font-semibold tracking-[0.08em] uppercase text-black mt-2 md:mt-3">
                  {exp.company}
                </p>
                <p className="mt-4 md:mt-10 text-[12px] md:text-[14px] leading-[1.6] md:leading-[1.75] text-black/55 max-w-[440px] line-clamp-3 md:line-clamp-none">
                  {exp.desc}
                </p>
                <div className="mt-auto pt-4 md:pt-8">
                  <p className="mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-black/35 mb-2 md:mb-3">
                    Highlights
                  </p>
                  <div className="border-t border-black/10">
                    <div className="grid grid-cols-2">
                      {exp.highlights.map((h, i) => (
                        <div
                          key={i}
                          className={`flex gap-2 py-2 md:py-4 mono text-[10px] md:text-[11px] font-semibold tracking-[0.04em] uppercase text-black border-black/10 ${i < 2 ? 'border-b' : ''} ${i % 2 === 0 ? 'border-r pr-3 md:pr-4' : 'pl-3 md:pl-4'}`}
                        >
                          <span className="text-black/25 font-normal mono text-[10px]">
                            0{i + 1}
                          </span>
                          <span className="leading-tight">
                            {String(h).replace(/^\d+\s*/, '').toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[48%] xl:w-[44%] relative bg-[#0F0F0F] overflow-hidden h-44 sm:h-52 shrink-0 md:shrink md:h-full md:aspect-auto">
                <img
                  src={exp.image}
                  alt={exp.company}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top select-none grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 md:top-5 md:right-5 mono text-white text-[18px] md:text-[22px] font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {exp.id}
                </span>
                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap mono text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Navigation arrows - always visible on mobile */}
        <div className="absolute inset-y-0 flex items-center justify-between w-full px-4 sm:px-6 pointer-events-none">
          <button
            onClick={() => scrollTo(Math.max(trackActive - 1, 0))}
            className="pointer-events-auto absolute left-4 bottom-[62px] md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-75 md:opacity-0 hover:opacity-100 transition-all"
            aria-label="Experience sebelumnya"
            disabled={trackActive === 0}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scrollTo(Math.min(trackActive + 1, experiences.length - 1))}
            className="pointer-events-auto absolute right-4 bottom-[62px] md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-75 md:opacity-0 hover:opacity-100 transition-all"
            aria-label="Experience berikutnya"
            disabled={trackActive === experiences.length - 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 pb-4">
          {experiences.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${trackActive === i ? 'w-6 h-1.5 bg-white' : 'w-2 h-2 bg-white/25 hover:bg-white/40 focus:ring-2 focus:ring-white focus:ring-offset-2'}`}
              data-dot={i}
              aria-label={`Go to ${i + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
        <p className="mono text-[10px] tracking-[0.18em] uppercase text-white/25 text-center pb-2 md:hidden">
          Scroll vertikal → gerak Horizontal
        </p>
      </div>
    )
  }

  return (
    <div className="relative max-w-[1440px] mx-auto">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pl-4 sm:pl-6 md:pl-10 lg:pl-12 pr-4 sm:pr-6 md:pr-10 lg:pr-12 pb-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
        {experiences.map((exp) => (
          <div
            key={exp.id}
            data-card
            className="group min-w-[82vw] max-w-[82vw] sm:min-w-[560px] sm:max-w-none md:min-w-[820px] md:max-w-none lg:min-w-[1080px] lg:max-w-none xl:min-w-[1120px] xl:max-w-none snap-start shrink-0 bg-[#F5F3EE] border border-white/10 flex flex-col md:flex-row h-[68svh] md:h-[clamp(490px,64vh,640px)] overflow-hidden relative"
          >
            <div className="w-full md:w-[52%] xl:w-[56%] bg-[#F5F3EE] p-7 sm:p-8 md:p-10 lg:p-12 flex flex-col min-w-0">
              <div className="flex items-center gap-2 mono text-[9.5px] tracking-[0.18em] uppercase text-black/40">
                <span>Professional Experience</span>
                <span className="px-2.5 py-1 rounded-full border border-black/10 bg-white text-[8.5px] tracking-[0.14em] font-medium">
                  {(exp.tag || 'Work').toUpperCase()}
                </span>
              </div>
              <h3 className="mt-6 md:mt-7 flex flex-wrap font-black tracking-[-0.045em] leading-[0.85] text-black text-[24px] sm:text-[40px] md:text-[42px] lg:text-[48px] break-words">
                {exp.role.split(' ').map((w, i) => (
                  <span key={i} className="inline-block mr-[0.2em]">
                    {w}
                  </span>
                ))}
              </h3>
              <p className="mono text-[11px] md:text-[12px] font-semibold tracking-[0.08em] uppercase text-black mt-3">
                {exp.company}
              </p>
              <p className="mt-7 md:mt-10 text-[13px] md:text-[14px] leading-[1.75] text-black/55 max-w-[440px]">
                {exp.desc}
              </p>
              <div className="mt-auto pt-10 md:pt-8">
                <p className="mono text-[10px] tracking-[0.2em] uppercase text-black/35 mb-3">
                  Highlights
                </p>
                <div className="border-t border-black/10">
                  <div className="grid grid-cols-2">
                    {exp.highlights.map((h, i) => (
                      <div
                        key={i}
                        className={`flex gap-2 py-3.5 md:py-4 mono text-[11px] font-semibold tracking-[0.04em] uppercase text-black border-black/10 ${i < 2 ? 'border-b' : ''} ${i % 2 === 0 ? 'border-r pr-3 md:pr-4' : 'pl-3 md:pl-4'}`}
                      >
                        <span className="text-black/25 font-normal mono text-[10px]">
                          0{i + 1}
                        </span>
                        <span className="leading-tight">
                          {String(h).replace(/^\d+\s*/, '').toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[48%] xl:w-[44%] relative bg-[#0F0F0F] overflow-hidden h-44 sm:h-52 shrink-0 md:shrink md:h-full md:aspect-auto">
              <img
                src={exp.image}
                alt={exp.company}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top select-none grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 md:top-5 md:right-5 mono text-white text-[18px] md:text-[22px] font-black tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {exp.id}
              </span>
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap mono text-[9px] md:text-[10px] tracking-[0.14em] uppercase text-white/90 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {exp.period}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation arrows - always visible on mobile */}
      <div className="absolute inset-y-0 flex items-center justify-between w-full px-4 sm:px-6 pointer-events-none">
        <button
          onClick={() => scrollTo(Math.max((activeLocal ?? 0) - 1, 0))}
          className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-50 md:opacity-0 hover:opacity-100 transition-all"
          aria-label="Experience sebelumnya"
          disabled={(activeLocal ?? 0) === 0}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          onClick={() => scrollTo(Math.min((activeLocal ?? 0) + 1, experiences.length - 1))}
          className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-50 md:opacity-0 hover:opacity-100 transition-all"
          aria-label="Experience berikutnya"
          disabled={(activeLocal ?? 0) === experiences.length - 1}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 pb-6">
        {experiences.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all duration-300 rounded-full ${active === i ? 'w-6 h-1.5 bg-white' : 'w-2 h-2 bg-white/25 hover:bg-white/40 focus:ring-2 focus:ring-white focus:ring-offset-2'}`}
            aria-label={`Go to ${i + 1}`}
            tabIndex={0}
          />
        ))}
      </div>
      <p className="mono text-[10px] tracking-[0.18em] uppercase text-white/25 text-center pb-2 md:hidden">
        Swipe to explore →
      </p>
    </div>
  )
}

// --- Typewriter Effect Component ---
function TypewriterText({ texts, className }: { texts: string[]; className?: string }) {
  const [textIndex, setTextIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)

  const currentText = texts[textIndex]
  const typeSpeed = isDeleting ? 30 : 80
  const pauseTime = 2000

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (isDeleting) {
      setText(currentText.substring(0, text.length - 1))
      timeout = setTimeout(() => {}, typeSpeed)
    } else {
      setText(currentText.substring(0, text.length + 1))
      timeout = setTimeout(() => {}, typeSpeed)
    }

    if (!isDeleting && text === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
      timeout = setTimeout(() => {}, typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, textIndex, currentText, typeSpeed, pauseTime])

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((prev) => !prev), 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={className} style={{ display: 'inline-block', position: 'relative' }}>
      {text}
      <span className="inline-block ml-0.5" style={{ opacity: cursorVisible ? 1 : 0 }}>
        █
      </span>
    </span>
  )
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [firebaseProjects, setFirebaseProjects] = useState<ProjectData[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const [prefersReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const stackRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const expSectionRef = useRef<HTMLDivElement | null>(null)
  const expTrackRef = useRef<HTMLDivElement>(null)
  const horizSTRef = useRef<ScrollTrigger | null>(null)

  const scrollToCard = (idx: number) => {
    const st = horizSTRef.current
    const progress = idx / Math.max(1, experiences.length - 1)
    if (st) {
      const target = st.start + progress * (st.end - st.start)
      const lenis = (window as { __LENIS__?: { scrollTo: (y: number, opts?: { duration?: number }) => void } })
        .__LENIS__ || null
      if (lenis) lenis.scrollTo(target, { duration: 1.2 })
      else window.scrollTo({ top: target, behavior: 'smooth' })
    } else {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const aboutRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ProjectData))
      setFirebaseProjects(data)
      setLoadingProjects(false)
    }, () => setLoadingProjects(false))
    return () => unsub()
  }, [])

  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => clearTimeout(t)
  }, [firebaseProjects])

  const displayProjects = firebaseProjects.length ? firebaseProjects : []

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMedia) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const stack = stackRef.current
      const hero = heroRef.current
      const exp = expSectionRef.current
      const track = expTrackRef.current
      if (!stack || !hero || !exp || !track) return

      const mm = gsap.matchMedia()

      // 1b) Hero parallax teks/foto + hint fade
      // (Kurva pembatas hero dihapus — transisi hero → About sekarang memakai
      //  kartu About bersudut melengkung, jadi tidak perlu kurva hitam lagi.)

      const heroText = hero.querySelector('[data-hero-text]')
      if (heroText) {
        gsap.to(heroText, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom 30%',
            scrub: 1.1,
          },
        })
      }

      const heroPortrait = hero.querySelector('[data-hero-portrait]')
      if (heroPortrait) {
        gsap.to(heroPortrait, {
          yPercent: 10,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
      }

      const heroHint = hero.querySelector('[data-hero-scrollhint]')
      if (heroHint) {
        gsap.to(heroHint, {
          opacity: 0,
          y: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: '18% top',
            scrub: true,
          },
        })
      }

      // 1c) About TextReveal per kata
      const about = aboutRef.current
      if (about) {
        const words1 = about.querySelectorAll('.about-word')
        const wordsDim = about.querySelectorAll('.about-word-dim')
        const words2 = about.querySelectorAll('.about-word2')
        gsap.to(words1, {
          color: 'rgba(255,255,255,0.96)',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
        gsap.to(wordsDim, {
          color: 'rgba(255,255,255,0.55)',
          stagger: 0.06,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
        gsap.to(words2, {
          color: 'rgba(255,255,255,0.5)',
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true,
          },
        })

        // 1c) Dome divider — lengkung melurus seiring scroll lalu menutupi layar
        const domePath = about.querySelector('[data-dome-path]')
        if (domePath) {
          gsap.fromTo(
            domePath,
            { attr: { d: 'M0 150 Q720 -150 1440 150 L1440 150 L0 150 Z' } },
            {
              attr: { d: 'M0 0 Q720 0 1440 0 L1440 150 L0 150 Z' },
              ease: 'none',
              scrollTrigger: {
                trigger: about,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
              },
            },
          )
        }
      }

      // 2) Horizontal Hijack
      const getAmount = () => {
        const scrollWidth = track.scrollWidth
        const viewport = window.innerWidth
        return Math.max(0, scrollWidth - viewport)
      }

      const horizTween = gsap.to(track, {
        x: () => -getAmount(),
        ease: 'none',
      })

      const st = ScrollTrigger.create({
        trigger: exp,
        start: 'top top',
        end: () => `+=${getAmount()}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        animation: horizTween,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const idx = Math.round(progress * (experiences.length - 1))
          const dots = exp.querySelectorAll<HTMLElement>('[data-dot]')
          dots.forEach((d, i) => {
            if (i === idx) {
              d.className = 'transition-all duration-300 rounded-full w-6 h-1.5 bg-white'
            } else {
              d.className = 'transition-all duration-300 rounded-full w-1.5 h-1.5 bg-white/25 hover:bg-white/40'
            }
          })
        },
      })
      horizSTRef.current = st

      // Watermark intro: blur + scale-up -> sharp thin watermark
      const watermark = exp.querySelector('[data-watermark]')
      if (watermark) {
        gsap.fromTo(
          watermark,
          { opacity: 0, scale: 1.18, filter: 'blur(16px)' },
          {
            opacity: 0.05,
            scale: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: exp,
              start: 'top 85%',
              end: 'top 15%',
              scrub: true,
            },
          },
        )
        // Parallax during pinned horizontal scroll
        gsap.to(watermark, {
          xPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: exp,
            start: 'top top',
            end: () => `+=${getAmount()}`,
            scrub: 1,
          },
        })
      }

      // 6) Generic fade-up reveal
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        if (el.id === 'experience' || el.id === 'home' || el.id === 'about') return
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // 7) Projects: cream card rises out of the dark section
      const projectsWrap = document.getElementById('projects-wrap')
      const projectsCard = document.getElementById('projects')
      if (projectsWrap && projectsCard) {
        mm.add('(max-width: 767px)', () => {
          gsap.fromTo(
            projectsCard,
            { y: 120, transformOrigin: 'top center', force3D: true },
            {
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: projectsWrap,
                start: 'top 90%',
                end: 'top 45%',
                scrub: 0.8,
              },
            },
          )
        })

        mm.add('(min-width: 768px)', () => {
          gsap.fromTo(
            projectsCard,
            { y: 200, scale: 0.97, transformOrigin: 'top center', force3D: true },
            {
              y: 0,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: projectsWrap,
                start: 'top 90%',
                end: 'top 45%',
                scrub: 0.8,
              },
            },
          )
        })
      }

      return () => mm.revert()
    }, stackRef)

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(t)
      horizSTRef.current = null
      ctx.revert()
    }
  }, [])

  return (
    <main className="bg-surface-dark text-[#0a0a0a]">
      <div ref={stackRef} id="sticky-stack" className="relative">
        {/* HERO */}
        <section
          ref={heroRef}
          id="home"
          className="relative z-10 min-h-[100dvh] bg-[#e8e8e5] overflow-hidden flex flex-col"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(0,0,0,0.02), transparent 60%)' }}
          />

          <div className="relative flex-1 max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12 flex flex-col justify-center pt-[80px] pb-[100px] lg:pt-[104px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* Left — Text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                data-hero-text
                className="lg:col-span-7 xl:col-span-7 will-change-transform"
              >
                <div className="flex items-center gap-[14px] mb-7">
                  <a
                    href="https://github.com/arroVX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/35 hover:text-black/60 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={18} strokeWidth={1.6} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/35 hover:text-black/60 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/jingroo_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/35 hover:text-black/60 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} strokeWidth={1.6} />
                  </a>
                  <a
                    href="mailto:arroudhilanfi01@gmail.com"
                    className="text-black/35 hover:text-black/60 transition-colors"
                    aria-label="Email"
                  >
                    <Mail size={18} strokeWidth={1.6} />
                  </a>
                </div>

                <p className="mono text-[11px] tracking-[0.22em] uppercase text-black/40 mb-6">
                  Central Java · Indonesia
                </p>

                <h1 className="headline-serif leading-[0.88] tracking-[-0.045em] text-black">
                  <span className="block text-[52px] sm:text-[68px] lg:text-[84px] xl:text-[92px] font-normal">
                    Hi, I'm
                  </span>
                  <span className="block text-[52px] sm:text-[68px] lg:text-[84px] xl:text-[92px] italic font-normal -mt-1">
                    Arro.
                  </span>
                </h1>

                {/* Typewriter Effect */}
                <div className="mt-6 relative inline-block">
                  <TypewriterText
                    texts={['Full-Stack Web Developer', 'TKJ Student & Networking', 'Gold Medalist Informatics']}
                    className="text-[20px] sm:text-[24px] lg:text-[28px] font-light tracking-[-0.02em] text-[#0a0a0a]/80 leading-none"
                  />
                </div>

                <div className="mt-8">
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="inline-flex items-center justify-center mono text-[10px] tracking-[0.16em] font-bold bg-black text-white px-[22px] py-[11px] rounded-full hover:bg-black/85 transition-colors"
                  >
                    RESUME
                  </a>
                </div>
              </motion.div>

              {/* Right — Portrait Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.12, ease: 'easeOut' }}
                className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end"
              >
                <div
                  data-hero-portrait
                  className="relative w-[320px] max-w-[86vw] sm:w-[360px] md:w-[380px] lg:w-[380px] xl:w-[410px] aspect-[0.78] rounded-[28px] overflow-hidden bg-[#0B0B0F] shadow-[0_28px_80px_rgba(0,0,0,0.22),0_8px_24px_rgba(0,0,0,0.16)] border border-black/10 will-change-transform cursor-pointer"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const centerX = rect.width / 2
                    const centerY = rect.height / 2
                    const rotateX = ((y - centerY) / centerY) * -10
                    const rotateY = ((x - centerX) / centerX) * 10
                    setTilt({ x: rotateX, y: rotateY })
                  }}
                  onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                >
                  {/* Glare / Shine Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${tilt.x > 0 ? 70 : 30}% ${tilt.y > 0 ? 70 : 30}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                      transition: 'background 0.1s ease-out',
                    }}
                  />
                  <div className="absolute top-[18px] left-5 right-5 h-[1px] bg-white/[0.06] z-10" />
                  <div
                    className="absolute top-[28px] left-0 right-0 flex justify-between px-6 pointer-events-none select-none z-10 opacity-[0.07]"
                    style={{
                      transform: `translate(${-tilt.y * 0.15}px, ${-tilt.x * 0.15}px)`,
                      transition: 'transform 0.1s ease-out',
                    }}
                  >
                    <span className="mono text-[42px] font-bold text-white rotate-[-12deg]">&lt;/&gt;</span>
                    <span className="mono text-[42px] font-bold text-white rotate-[12deg]">&lt;/&gt;</span>
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(ellipse at 50% 22%, #2A2A32 0%, #14151A 45%, #0B0B0F 100%)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 45%)' }} />

                  <img
                    src="/profile.webp"
                    alt="Arroudhil Anfi"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top select-none"
                    style={{
                      filter: 'contrast(1.05) brightness(1.0) drop-shadow(2px 0 0 rgba(255,255,255,0.92)) drop-shadow(-2px 0 0 rgba(255,255,255,0.92)) drop-shadow(0 2px 0 rgba(255,255,255,0.92)) drop-shadow(0 -1px 0 rgba(255,255,255,0.92))',
                    }}
                  />
                  <div className="absolute bottom-[14px] left-[12px] right-[12px] bg-[#1C1D22]/95 backdrop-blur-xl rounded-[14px] border border-white/[0.07] px-3.5 py-[10px] flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.4)] z-20">
                    <div>
                      <div className="mono text-[12.5px] font-semibold tracking-tight text-white leading-none">
                        @arroVX
                      </div>
                      <div className="mono text-[11px] text-white/45 leading-none mt-[5px]">
                        Available for work!
                      </div>
                    </div>
                    <span className="w-[8px] h-[8px] bg-[#1BFF6B] rounded-full shadow-[0_0_10px_rgba(27,255,107,0.85)] animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll down indicator */}
          <div
            data-hero-scrollhint
            className="absolute bottom-[128px] left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 pointer-events-none"
          >
            <div className="w-[20px] h-[30px] rounded-full border border-black/15 flex justify-center pt-1.5">
              <span className="w-[3px] h-[6px] bg-black/30 rounded-full block animate-bounce" />
            </div>
            <span className="mono text-[8.5px] tracking-[0.24em] uppercase text-black/30">
              Scroll Down
            </span>
            <span className="text-black/20 text-[10px] leading-none">↓</span>
          </div>
        </section>

        {/* ABOUT — first section after the landing page */}
        <section
          ref={aboutRef}
          id="about"
          data-reveal
          className="relative z-20 bg-surface-dark text-white min-h-[100svh] flex flex-col"
        >
          {/* Dome: abu-abu naik melengkung penuh di atas hero cream */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 -top-[80px] md:-top-[150px] w-full h-[80px] md:h-[150px]"
            viewBox="0 0 1440 150"
            preserveAspectRatio="none"
          >
            <path
              data-dome-path
              d="M0 150 Q720 -150 1440 150 L1440 150 L0 150 Z"
              fill="var(--color-surface-dark)"
            />
          </svg>
          <div className="flex-1 grid grid-rows-[1fr_auto_1fr] max-w-5xl mx-auto w-full px-6 pt-24 md:pt-28 pb-24 md:pb-28 text-center">
            <p className="mono text-[10px] tracking-[0.28em] uppercase text-white/30 self-end">
              About
            </p>
            <p className="reveal-text tracking-[-0.02em] leading-[1.18] text-[clamp(26px,4.6vw,54px)] flex flex-wrap justify-center gap-x-[0.24em] gap-y-1">
              {"I build fullstack web systems with clean user interfaces, reliable backend architecture, and database-driven workflows helping turn complex processes into efficient digital products.".split(' ').map((w, i) => {
                const isBold = ['fullstack', 'web', 'systems', 'reliable', 'backend', 'architecture,', 'efficient', 'digital', 'products.'].includes(w)
                return (
                  <span key={i} className={`${isBold ? 'about-word font-bold' : 'about-word-dim font-normal'} inline-block will-change-[opacity,color]`} style={{ color: 'rgba(255,255,255,0.32)' }}>
                    {w}
                  </span>
                )
              })}
            </p>
            <p className="reveal-text2 mt-10 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-[0.2em] gap-y-1 text-[13px] md:text-sm leading-relaxed self-start">
              {"Siswa TKJ SMKN 3 Jepara & Gold Medalist Informatika (FSBN & ONSP 2025). Fokus di React, Tailwind, Firebase, dan Network Infrastructure.".split(' ').map((w, i) => (
                <span key={i} className="about-word2 inline-block will-change-[opacity,color]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {w}
                </span>
              ))}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 shrink-0">
            <Marquee items={marqueeItems} dark />
          </div>
        </section>

        {/* EXPERIENCES */}
        <section
          ref={expSectionRef}
          id="experience"
          className="bg-surface-dark text-white relative z-20 overflow-hidden w-full min-h-[100svh] flex flex-col justify-center"
        >
          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12 pt-6 md:pt-8 pb-3 md:pb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/30 mb-3">
                  Career Archive
                </p>
                <h2 className="text-[28px] md:text-[40px] font-black tracking-[-0.03em] leading-none">
                  EXPERIENCES
                </h2>
              </div>
              <p className="mono text-[12px] md:text-[13px] text-white/40">
                Roles, systems, and the work behind them.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              data-watermark
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none whitespace-nowrap font-black leading-none tracking-[-0.04em] text-white will-change-transform"
              style={{ fontSize: 'clamp(48px, 14.2vw, 320px)', opacity: 0.05 }}
            >
              EXPERIENCES
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)`, backgroundSize: `24px 24px` }} />

            <HomeExperienceSlider
              experiences={experiences}
              trackRef={prefersReduced ? null : expTrackRef}
              onDotClick={scrollToCard}
            />
          </div>

          <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-12">
            <div className="h-[1px] bg-white/5 w-full" />
            <div className="py-3 flex items-center justify-between mono text-[10px] tracking-[0.18em] uppercase text-white/25">
              <span>0{experiences.length} Experiences</span>
              <Link to="/experience" className="hidden md:inline-flex items-center gap-1.5 hover:text-white/60 transition-colors">
                View all — Experience page <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        </section>
      </div>{/* /sticky-stack */}

      {/* Dark runway for the projects card overlap */}
      <div aria-hidden className="h-10 md:h-14 bg-surface-dark" />

      {/* SELECTED PROJECTS */}
      <div id="projects-wrap" className="relative z-30 -mt-8 md:-mt-12 bg-surface-dark">
        <section
          id="projects"
          className="relative rounded-t-[2rem] md:rounded-t-[3.5rem] bg-[#e8e8e5] pt-20 md:pt-28 pb-16 md:pb-24 shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.45)] will-change-transform"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="mono text-xs tracking-[0.2em] uppercase text-black/40">
                  Projects
                </p>
                <h2 className="headline-serif text-4xl md:text-5xl mt-2">
                  Selected projects
                </h2>
                <p className="mono text-xs tracking-widest uppercase text-black/30 mt-2">
                  Portfolio showcase
                </p>
              </div>
              <Link to="/projects" className="hidden md:inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-black/50 hover:text-black">
                View all projects <ArrowUpRight size={14} />
              </Link>
            </div>

            {loadingProjects ? (
              <div className="py-12 mono text-sm text-black/40">
                Loading projects...
              </div>
            ) : displayProjects.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-black/10 rounded-2xl bg-[#FCFCF9]">
                <p className="text-black/60">
                  Belum ada project di database. Tambah via{' '}
                  <Link to="/admin" className="underline">
                    Admin
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {displayProjects.slice(0, 4).map((p, idx) => {
                  const images = [
                    ...(Array.isArray(p.images) ? p.images : []),
                    p.image,
                  ].filter((src, i, arr): src is string => Boolean(src) && arr.indexOf(src) === i)
                  const techs = Array.isArray(p.tech)
                    ? p.tech
                    : typeof p.tech === 'string'
                      ? p.tech.split(',').map((s) => s.trim())
                      : []
                  const isEven = idx % 2 === 0
                  return (
                    <motion.div
                      key={p.id || p.title}
                      data-project-card
                      initial={{ opacity: 0, y: 36, filter: 'blur(12px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true, amount: 0.2 }}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start will-change-[opacity,transform,filter] ${!isEven ? 'lg:[&>div:first-child]:order-2' : ''}`}
                    >
                      <div className="lg:col-span-7">
                        <SwiperGallery images={images} title={p.title || ''} />
                        <div className="flex items-center justify-between mt-3 mono text-xs tracking-widest text-black/30">
                          <span>0{idx + 1} / 0{displayProjects.slice(0, 4).length}</span>
                        </div>
                      </div>
                      <div className="lg:col-span-5">
                        <div className="mono text-xs tracking-widest uppercase text-black/40 mb-2">
                          {String(idx + 1).padStart(2, '0')} · {p.category || 'Portfolio'}
                        </div>
                        <h3 className="headline-serif text-3xl leading-none mb-3">
                          {p.title}
                        </h3>
                        <p className="text-black/60 leading-relaxed text-sm mb-4 line-clamp-3">
                          {p.longDesc || p.desc}
                        </p>
                        <div className="space-y-1 mb-4 border-l border-black/5 pl-4">
                          {(p.features || []).slice(0, 3).map((f, i) => (
                            <div key={i} className="mono text-xs text-black/50 flex gap-2">
                              <span className="text-black/20">0{i + 1}</span>{' '}
                              <span className="line-clamp-1">
                                {typeof f === 'string' ? f : ''}
                              </span>
                            </div>
                          ))}
                          {(!p.features || p.features.length === 0) && (
                            <div className="mono text-xs text-black/40">
                              Highlights coming soon
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {techs.slice(0, 6).map((t) => (
                            <span key={t} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-[11px]">
                              {t}
                            </span>
                          ))}
                        </div>
                        <button onClick={() => setSelectedProject(p)} className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black/80">
                          View project <ArrowUpRight size={16} />
                        </button>
                        {idx < displayProjects.slice(0, 4).length - 1 && (
                          <div className="mono text-xs tracking-widest uppercase text-black/20 mt-8 hidden lg:block">
                            Next project / 0{idx + 2} / 0{displayProjects.slice(0, 4).length}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
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
      </div>

      {/* CONTACT */}
      <section data-reveal className="bg-[#e8e8e5] py-16 md:py-24">
        <div id="contact" data-reveal className="max-w-7xl mx-auto px-6">
          <div className="rounded-[20px] border border-black/5 bg-white px-6 py-7 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div>
              <p className="mono text-[11px] tracking-[0.22em] uppercase text-black/40">
                Contact
              </p>
              <h3 className="headline-serif text-[22px] md:text-2xl mt-1.5 text-black">
                Let's build something useful.
              </h3>
            </div>
            <a
              href="mailto:arroudhilanfi01@gmail.com"
              className="shrink-0 px-7 py-3.5 bg-black text-white rounded-full text-[15px] font-medium inline-flex items-center gap-2 hover:bg-black/85 transition-colors"
            >
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
