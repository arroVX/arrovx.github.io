import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Instagram, Mail } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Guestbook from './pages/Guestbook';
import NotFound from './pages/NotFound';
import CommandCenter from './components/CommandCenter';
import { Terminal as TerminalIcon, Search } from 'lucide-react';
import { useMagnetic } from './utils/animations';
import { useRef } from 'react';
import Preloader from './components/Preloader';
import LogoAnimation from './components/LogoAnimation';

function BackgroundSystem() {
  return (
    <>
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-30" />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob w-[600px] h-[600px] bg-indigo-600/30 top-[-20%] left-[-10%]" />
        <div className="blob w-[500px] h-[500px] bg-purple-600/20 top-[40%] right-[-10%]" />
        <div className="blob w-[600px] h-[600px] bg-blue-600/20 bottom-[-20%] left-[-5%]" />
      </div>
    </>
  );
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-blue-500/50 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-500 pointer-events-none z-[9999]"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.2 }}
      />
    </div>
  );
};

function LiveTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const jeparaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
      setTime(jeparaTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-2 px-3 py-1 glass-card border-none bg-white/5 text-[10px] font-black tracking-widest uppercase text-white/40">
      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
      Jepara {time}
    </div>
  );
}

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const { style, onMouseMove, onMouseLeave } = useMagnetic(ref);
  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-block"
    >
      {React.cloneElement(children, { className: `${children.props.className || ''} ${className || ''}` })}
    </div>
  );
};

function Navbar({ setIsCommandOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = ['Services', 'Work', 'Experience', 'Guestbook', 'Contact'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card py-3 px-6 flex items-center justify-between border-white/5">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap- group border-none">
                <LogoAnimation />
              </Link>
              <LiveTime />
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => {
                const linkMap = {
                  'Work': '/projects',
                  'Services': '/services',
                  'Experience': '/experience',
                  'Guestbook': '/guestbook',
                  'Contact': '/contact'
                };
                const to = linkMap[item] || '/';

                return (
                  <Link key={item} to={to} className="text-sm font-medium text-white/50 hover:text-white transition-colors relative group border-none">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </Link>
                );
              })}
              <Link to="/about" className={`text-sm font-medium transition-colors relative group border-none ${location.pathname === '/about' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                About
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
              <MagneticButton>
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white bg-white/5 rounded-xl border-none transition-all"
                  title="Terminal (Ctrl+K)"
                  style={{ pointerEvents: 'auto' }}
                >
                  <TerminalIcon size={18} />
                </button>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="glass-button py-1.5! px-5! rounded-xl! text-xs font-bold! border-none hover:bg-white hover:text-black transition-all inline-block text-center">Let's Chat</Link>
              </MagneticButton>
            </div>

            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setIsCommandOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white bg-white/5 rounded-xl border-none active:scale-90 transition-all"
                title="Terminal"
              >
                <TerminalIcon size={18} />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white bg-white/5 rounded-xl border-none active:scale-90 transition-all relative overflow-hidden"
              >
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-white rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[49] bg-[#030303]/95 backdrop-blur-2xl md:hidden flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col gap-6">
              {['Services', 'Work', 'Experience', 'Guestbook', 'About', 'Contact'].map((item, i) => {
                const linkMap = {
                  'Work': '/projects',
                  'Services': '/services',
                  'Experience': '/experience',
                  'Guestbook': '/guestbook',
                  'About': '/about',
                  'Contact': '/contact'
                };
                const to = linkMap[item] || '/';

                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-5xl font-bold tracking-tighter transition-all border-none flex items-center gap-4 ${location.pathname === to ? 'text-white' : 'text-white/20 hover:text-white'
                        }`}
                    >
                      <span className="text-sm font-black text-blue-500/50 mt-2">0{i + 1}</span>
                      {item}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10 mt-10 border-t border-white/5 space-y-4"
              >
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsCommandOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 bg-white/5 text-white/50 py-5 rounded-2xl font-bold text-xs border border-white/5 flex items-center justify-center gap-3 active:scale-95 transition-all"
                  >
                    <TerminalIcon size={16} /> TERMINAL
                  </button>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <button className="w-full bg-white text-black py-5 rounded-2xl font-black text-xs border-none active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                      LET'S CHAT
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-auto pb-12 flex items-center justify-between"
            >
              <div className="flex gap-6">
                <a href="https://www.instagram.com/jingroo_" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all border-none">
                  <Instagram size={20} />
                </a>
                <a href="https://github.com/arroVX" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all border-none">
                  <Github size={20} />
                </a>
                <a href="mailto:arroudhilanfi01@gmail.com" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/10 transition-all border-none">
                  <Mail size={20} />
                </a>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/10">
                Menu v2.0
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 relative z-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div>
          <div className="text-xl font-bold mb-4 tracking-tighter">ARRO<span className="text-blue-500">.</span></div>
          <p className="text-white/30 text-sm max-w-xs leading-relaxed">
            Arroudhil Anfi — TKJ Student & Visionary Designer. Bringing harmony between technology and creative soul.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
          <div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-6">Explore</p>
            <ul className="space-y-4 text-sm font-medium text-white/50">
              <li><Link to="/services" className="hover:text-white transition-colors border-none">Services</Link></li>
              <li><Link to="/experience" className="hover:text-white transition-colors border-none">Experience</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors border-none">Work</Link></li>
              <li><Link to="/guestbook" className="hover:text-white transition-colors border-none">Guestbook</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-6">Socials</p>
            <ul className="space-y-4 text-sm font-medium text-white/50">
              <li><a href="https://www.instagram.com/jingroo_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-none">Instagram</a></li>
              <li><a href="https://github.com/arroVX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-none">GitHub</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-6">Status</p>
            <div className="flex items-center gap-2 text-sm font-medium text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Available for Projects
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest gap-4">
        <div>© {new Date().getFullYear()} ARROUDHIL ANFI — ALL RIGHTS RESERVED</div>
        <div>BUILT WITH PRECISION BY YOURS TRULY</div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <BackgroundSystem />
      <CustomCursor />
      <Navbar setIsCommandOpen={setIsCommandOpen} />

      <motion.div
        initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        animate={!isLoading ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.8
        }}
        className="w-full relative z-10"
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guestbook" element={<Guestbook />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </motion.div>

      <AnimatePresence>
        {isCommandOpen && <CommandCenter isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}
      </AnimatePresence>
    </Router>
  );
}
