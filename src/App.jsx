import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import SchoolProjects from './pages/SchoolProjects';
import Achievements from './pages/Achievements';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import CommandCenter from './components/CommandCenter';
import { Terminal as TerminalIcon } from 'lucide-react';
import Preloader from './components/Preloader';
import useLenis from './hooks/useLenis';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function Navbar({ setIsCommandOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const menuLinks = [
    { label: 'Home', href: '/', anchor: false },
    { label: 'About', href: '/#about', anchor: true },
    { label: 'Experience', href: '/#experience', anchor: true },
    { label: 'Projects', href: '/projects', anchor: false },
    { label: 'All Projects', href: '/school-projects', anchor: false },
    { label: 'Contact', href: '/#contact', anchor: true },
  ];

  // Kunci scroll saat menu overlay terbuka
  useEffect(() => {
    const lenis = (typeof window !== 'undefined') ? window.__LENIS__ : null;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [mobileMenuOpen]);

  const isDark = location.pathname === '/experience';

  return (
    <>
      <nav className="absolute inset-x-0 top-0 z-[100] border-b border-transparent bg-transparent" style={{ transform: 'none', willChange: 'auto' }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between h-[72px]">
          {/* Left - exact replica of image: black circle A + pill */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className={`w-[34px] h-[34px] rounded-full flex items-center justify-center font-serif italic text-[16px] leading-none ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`} style={{ fontFamily: "'Instrument Serif', serif" }}>A</span>
            <span className={`mono hidden sm:inline-flex items-center text-[10px] tracking-[0.16em] font-medium border px-3.5 py-[6px] rounded-full ${isDark ? 'text-white/60 border-white/10 bg-white/[0.06]' : 'text-black/60 border-black/10 bg-white'}`}>
              ARRO / PORTFOLIO
            </span>
          </Link>

          {/* Right - MENU pill exact as image */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCommandOpen(true)}
              className={`hidden md:inline-flex w-8 h-8 rounded-full border items-center justify-center transition-colors ${isDark ? 'bg-white/[0.06] border-white/10 text-white/50 hover:text-white hover:border-white/20' : 'bg-white border-black/10 text-black/50 hover:text-black hover:border-black/20'}`}
              aria-label="Open terminal"
              title="Terminal (Ctrl+K)"
            >
              <TerminalIcon size={14} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`inline-flex items-center gap-1.5 mono text-[10px] tracking-[0.14em] font-medium border px-4 py-[9px] rounded-full transition-colors ${isDark ? 'bg-white text-black border-white shadow-[0_2px_10px_rgba(255,255,255,0.08)] hover:bg-white/90' : 'bg-white border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:border-black/15'}`}
            >
              <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
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
            className="fixed inset-0 z-[200] bg-[#0E0E0F] text-white flex flex-col px-6 md:px-10 lg:px-12 pt-5 pb-8 overflow-y-auto"
          >
            <div className="max-w-[1440px] w-full mx-auto flex flex-col flex-1 min-h-full">
              <div className="flex items-center justify-end h-[52px] shrink-0">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 mono text-[10px] tracking-[0.14em] font-medium bg-[#F5F3EE] text-black px-4 py-[9px] rounded-full hover:bg-white transition-colors"
                  aria-label="Close menu"
                >
                  <span>CLOSE</span>
                  <X size={12} />
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
                        className="group flex items-center justify-between gap-4 py-1 md:py-1.5"
                      >
                        <span className="font-black uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(38px,10vw,96px)] text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{item.label}</span>
                        <span className="mono text-[10px] tracking-widest text-white/30 shrink-0">0{i + 1}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center justify-between gap-4 py-1 md:py-1.5"
                      >
                        <span className="font-black uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(38px,10vw,96px)] text-white/90 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">{item.label}</span>
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
                <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/30 mb-4">Socials</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mono text-xs tracking-[0.12em] uppercase text-white/55">
                  <Link to="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="hover:text-white transition-colors">Resume</Link>
                  <a href="https://github.com/arroVX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
                  <a href="https://www.instagram.com/jingroo_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                  <a href="mailto:arroudhilanfi01@gmail.com" className="hover:text-white transition-colors">Email</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const update = () => {
      try {
        const fmt = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTime(fmt.format(new Date()));
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative bg-[#0B0B0C] text-white overflow-hidden">
      {/* Watermark CONTACT raksasa */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none font-black leading-none tracking-[-0.05em] text-white/[0.045] whitespace-nowrap"
        style={{ fontSize: 'clamp(140px, 26vw, 460px)' }}
      >
        CONTACT
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex flex-col min-h-[100svh] py-10 md:py-12">
        {/* Top */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="mono text-[10px] tracking-[0.28em] uppercase text-white/40">Get in touch</p>
          <p className="mono text-[10px] tracking-[0.22em] uppercase text-white/40">Jepara, ID / {time} WIB</p>
        </div>

        {/* Middle */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
          <h2 className="font-black leading-[0.92] tracking-[-0.03em] text-white text-[clamp(52px,10vw,148px)]">
            LET'S WORK<br />TOGETHER
          </h2>
          <a
            href="mailto:arroudhilanfi01@gmail.com"
            className="mt-10 text-white/75 hover:text-white transition-colors text-[15px] md:text-[22px] font-light tracking-tight inline-flex items-center gap-2 break-all"
          >
            arroudhilanfi01@gmail.com <ArrowUpRight size={18} className="shrink-0" />
          </a>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mono text-[10px] tracking-[0.2em] uppercase text-white/45">
            <Link to="/#about" className="hover:text-white transition-colors">Resume</Link>
            <a href="https://github.com/arroVX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github</a>
            <a href="https://www.instagram.com/jingroo_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="mailto:arroudhilanfi01@gmail.com" className="hover:text-white transition-colors">Email</a>
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
  );
}

export default function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useLenis(!isLoading);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    const handleOpenCommand = () => setIsCommandOpen(true);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-center', handleOpenCommand);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-center', handleOpenCommand);
    };
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && <Navbar setIsCommandOpen={setIsCommandOpen} />}

      <motion.main
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full overflow-x-hidden bg-[#e8e8e5] text-[#0a0a0a]"
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/school-projects" element={<SchoolProjects />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </motion.main>

      <AnimatePresence>
        {isCommandOpen && <CommandCenter isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}
      </AnimatePresence>
    </Router>
  );
}
