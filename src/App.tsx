import React, { useState, useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  NavigateFunction,
  Location,
} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Terminal as TerminalIcon } from 'lucide-react'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import SchoolProjects from './pages/SchoolProjects'
import SchoolProjectDetail from './pages/SchoolProjectDetail'
import ProjectDetail from './pages/ProjectDetail'
import Achievements from './pages/Achievements'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import CommandCenter from './components/CommandCenter'
import useLenis from './hooks/useLenis'

type MenuLink = {
  label: string
  href: string
  anchor: boolean
}

type NavbarProps = {
  setIsCommandOpen: (open: boolean) => void
}

function scrollTopImmediate() {
  try {
    const lenis = (typeof window !== 'undefined' ? window.__LENIS__ : null) as
      | { scrollTo: (y: number, opts?: { immediate?: boolean }) => void }
      | undefined
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { immediate: true })
      return
    }
  } catch {
    /* fall through to native */
  }
  try {
    window.scrollTo(0, 0)
  } catch {
    /* noop */
  }
  try {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  } catch {
    /* noop */
  }
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash && !hash.startsWith('#/')) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          try {
            const lenis = (window as { __LENIS__?: { scrollTo: (el: Element, opts?: { offset?: number; immediate?: boolean }) => void } })
              .__LENIS__
            if (lenis && typeof lenis.scrollTo === 'function') {
              lenis.scrollTo(el, { offset: 0, immediate: false })
              return
            }
          } catch {
            /* noop */
          }
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    } else {
      scrollTopImmediate()
      const t = setTimeout(scrollTopImmediate, 80)
      return () => clearTimeout(t)
    }
  }, [pathname, hash])

  return null
}

// Handles legacy 404.html hash redirects (/#//projects/...) from GitHub Pages
// and converts them to real BrowserRouter paths.
function HashRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const h = window.location.hash
    if (h && h.startsWith('#/')) {
      const target = h.slice(1)
      window.history.replaceState(null, '', target)
      navigate(target, { replace: true })
    }
  }, [navigate, location])

  return null
}

function Navbar({ setIsCommandOpen }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navVisible, setNavVisible] = useState(true)
  const lastY = useRef(0)
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
  ) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.replace('/#', '')
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
      setMobileMenuOpen(false)
    } else {
      setMobileMenuOpen(false)
    }
  }

  const menuLinks: MenuLink[] = [
    { label: 'Home', href: '/', anchor: false },
    { label: 'About', href: '/#about', anchor: true },
    { label: 'Experience', href: '/#experience', anchor: true },
    { label: 'Projects', href: '/projects', anchor: false },
    { label: 'School Project', href: '/school-projects', anchor: false },
    { label: 'Contact', href: '/#contact', anchor: true },
  ]

  // Kunci scroll saat menu overlay terbuka
  useEffect(() => {
    const lenis = (typeof window !== 'undefined'
      ? window.__LENIS__
      : null) as { stop: () => void; start: () => void } | null
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      if (lenis) lenis.stop()
    } else {
      document.body.style.overflow = ''
      if (lenis) lenis.start()
    }
    return () => {
      document.body.style.overflow = ''
      if (lenis) lenis.start()
    }
  }, [mobileMenuOpen])

  // Navbar: sembunyi saat scroll ke bawah, muncul lagi dari atas saat scroll ke atas.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      if (Math.abs(delta) < 4) return
      lastY.current = y
      setNavVisible(y < 96 ? true : delta < 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = location.pathname === '/experience'

  const logoCircleClass = isDark
    ? 'bg-white text-black'
    : 'bg-black text-white'
  const logoPillClass = isDark
    ? 'text-white/60 border-white/10 bg-white/[0.06]'
    : 'text-black/60 border-black/10 bg-white'
  const terminalBtnClass = isDark
    ? 'bg-white/[0.06] border-white/10 text-white/50 hover:text-white hover:border-white/20'
    : 'bg-white border-black/10 text-black/50 hover:text-black hover:border-black/20'
  const menuBtnClass = isDark
    ? 'bg-white text-black border-white shadow-[0_2px_10px_rgba(255,255,255,0.08)] hover:bg-white/90'
    : 'bg-white border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:border-black/15'

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] border-b border-transparent bg-transparent transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          navVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between h-[72px]">
          {/* Left */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-serif italic text-[16px] leading-none ${logoCircleClass}`} style={{ fontFamily: "'Instrument Serif', serif" }}>
              A
            </span>
            <span className={`mono hidden sm:inline-flex items-center text-[10px] tracking-[0.16em] font-medium border px-3.5 py-[6px] rounded-full ${logoPillClass}`}>
              ARRO / PORTFOLIO
            </span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCommandOpen(true)}
              className={`hidden md:inline-flex w-8 h-8 rounded-full border items-center justify-center transition-colors ${terminalBtnClass}`}
              aria-label="Buka terminal perintah (Ctrl+K)"
              title="Terminal (Ctrl+K)"
            >
              <TerminalIcon size={14} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center gap-1.5 mono text-[10px] tracking-[0.14em] font-bold border px-5 py-[10px] rounded-full min-w-[100px] transition-colors ${menuBtnClass}`}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span>{mobileMenuOpen ? 'TUTUP' : 'MENU'}</span>
              <span className="text-[14px] leading-none font-light -mt-[1px]">{mobileMenuOpen ? <X size={12} /> : '+'}</span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            id="mobile-menu"
            className="fixed inset-0 z-[200] bg-[#0E0E0F] text-white flex flex-col px-6 md:px-10 lg:px-12 pt-5 pb-8 overflow-y-auto"
          >
            <div className="max-w-[1440px] w-full mx-auto flex flex-col flex-1 min-h-full">
              <div className="flex items-center justify-end h-[52px] shrink-0">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-2 mono text-[10px] tracking-[0.14em] font-bold bg-[#F5F3EE] text-black px-5 py-[10px] rounded-full hover:bg-white transition-colors min-w-[100px] justify-center"
                  aria-label="Tutup menu navigasi"
                >
                  <span>TUTUP</span>
                  <X size={14} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center py-8">
                {menuLinks.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: 'easeOut' }}
                  >
                    {item.anchor ? (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="group flex items-center justify-between gap-4 py-2 md:py-3 min-h-[52px]"
                      >
                        <span className="font-black uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(38px,10vw,96px)] text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                          {item.label}
                        </span>
                        <span className="mono text-[10px] tracking-widest text-white/30 shrink-0">0{i + 1}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center justify-between gap-4 py-2 md:py-3 min-h-[52px]"
                      >
                        <span className="font-black uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(38px,10vw,96px)] text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                          {item.label}
                        </span>
                        <span className="mono text-[10px] tracking-widest text-white/30 shrink-0">0{i + 1}</span>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="shrink-0"
              >
                <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/30 mb-4">
                  Socials
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 mono text-[11px] tracking-[0.12em] uppercase text-white/60">
                  <Link
                    to="/#about"
                    onClick={(e) => handleNavClick(e, '/#about')}
                    className="hover:text-white transition-colors"
                  >
                    Resume
                  </Link>
                  <a
                    href="https://github.com/arroVX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Github
                  </a>
                  <a
                    href="https://www.instagram.com/jingroo_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="mailto:arroudhilanfi01@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    Email
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() {
  const [time, setTime] = useState<string>('--:--:--')

  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
        setTime(fmt.format(new Date()))
      } catch {
        setTime(new Date().toLocaleTimeString())
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className="relative bg-[#0B0B0C] text-white overflow-hidden">
      {/* Watermark CONTACT raksasa */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-black leading-none tracking-[-0.05em] text-white/[0.045] whitespace-nowrap"
        style={{ fontSize: 'clamp(100px, 20vw, 320px)' }}
      >
        CONTACT
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col min-h-[100svh] py-10 md:py-12">
        {/* Top */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="mono text-[10px] tracking-[0.28em] uppercase text-white/40">
            Get in touch
          </p>
          <p className="mono text-[10px] tracking-[0.22em] uppercase text-white/40">
            Jepara, ID / {time} WIB
          </p>
        </div>

        {/* Middle */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <h2 className="font-black leading-[0.92] tracking-[-0.03em] text-white text-[clamp(52px,10vw,148px)]">
            LET'S WORK<br /> TOGETHER
          </h2>
          <a
            href="mailto:arroudhilanfi01@gmail.com"
            className="mt-10 text-white/75 hover:text-white transition-colors text-[15px] md:text-[22px] font-light tracking-tight inline-flex items-center gap-2 break-all"
          >
            arroudhilanfi01@gmail.com <X size={18} className="shrink-0" />
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mono text-[10px] tracking-[0.2em] uppercase text-white/45">
            <Link to="/#about" className="hover:text-white transition-colors">
              Resume
            </Link>
            <a
              href="https://github.com/arroVX"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Github
            </a>
            <a
              href="https://www.instagram.com/jingroo_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:arroudhilanfi01@gmail.com"
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-4">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden className="opacity-70">
            <rect x="8" y="7" width="14" height="12" fill="#C9C9C9" />
            <rect x="5" y="4" width="3" height="3" fill="#C9C9C9" />
            <rect x="22" y="4" width="3" height="3" fill="#C9C9C9" />
            <rect x="11" y="11" width="3" height="4" fill="#0B0B0C" />
            <rect x="16" y="11" width="3" height="4" fill="#0B0B0C" />
            <rect x="8" y="21" width="4" height="5" fill="#C9C9C9" />
            <rect x="18" y="21" width="4" height="5" fill="#C9C9C9" />
          </svg>
          <p className="mono text-[9px] tracking-[0.24em] uppercase text-white/30">
            © {new Date().getFullYear()} Arroudhil Anfi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false)

  // Smooth scroll hanya untuk pointer (desktop). Di HP biarkan browser scroll native — jauh lebih mulus.
  const [isCoarsePointer] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
  )

  useLenis(!isCoarsePointer)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandOpen((prev) => !prev)
      }
    }
    const handleOpenCommand = () => setIsCommandOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-command-center', handleOpenCommand)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-command-center', handleOpenCommand)
    }
  }, [])

  return (
    <Router>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Lewati ke konten utama
      </a>
      <ScrollToTop />
      <HashRedirect />

      <Navbar setIsCommandOpen={setIsCommandOpen} />

      <motion.main
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full overflow-x-clip bg-[#e8e8e5] text-[#0a0a0a]"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/school-projects" element={<SchoolProjects />} />
          <Route path="/school-projects/:id" element={<SchoolProjectDetail />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </motion.main>

      <AnimatePresence>
        {isCommandOpen && (
          <CommandCenter
            isOpen={isCommandOpen}
            onClose={() => setIsCommandOpen(false)}
          />
        )}
      </AnimatePresence>
    </Router>
  )
}
