import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Instagram, Mail } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';

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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = ['Services', 'Work', 'Experience', 'Contact'];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass-card py-3 px-6 flex items-center justify-between border-white/5">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap- group border-none">
                <span className="text-xl font-bold tracking-tighter hover:text-blue-400 transition-colors">ARRO<span className="text-blue-500 group-hover:text-white transition-colors">.</span></span>
              </Link>
              <LiveTime />
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((item) => (
                isHome ? (
                  <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/50 hover:text-white transition-colors relative group border-none">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </a>
                ) : (
                  <Link key={item} to={`/#${item.toLowerCase()}`} className="text-sm font-medium text-white/50 hover:text-white transition-colors relative group border-none">
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full opacity-0 group-hover:opacity-100" />
                  </Link>
                )
              ))}
              <Link to="/about" className={`text-sm font-medium transition-colors relative group border-none ${location.pathname === '/about' ? 'text-white' : 'text-white/50 hover:text-white'}`}>
                About
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
              <button className="glass-button py-1.5! px-5! rounded-xl! text-xs font-bold! border-none hover:bg-white hover:text-black transition-all">Let's Chat</button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl border-none active:scale-90 transition-transform"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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
            <div className="flex flex-col gap-8">
              {navLinks.map((item) => (
                isHome ? (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-bold tracking-tighter text-white/40 hover:text-white transition-colors border-none"
                  >
                    {item}
                  </a>
                ) : (
                  <Link
                    key={item}
                    to={`/#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-bold tracking-tighter text-white/40 hover:text-white transition-colors border-none"
                  >
                    {item}
                  </Link>
                )
              ))}
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-4xl font-bold tracking-tighter transition-colors border-none ${location.pathname === '/about' ? 'text-white' : 'text-white/40'}`}
              >
                About
              </Link>
              <div className="pt-10 border-t border-white/5">
                <button className="w-full bg-white text-black py-5 rounded-2xl font-black text-xl border-none">
                  LET'S CHAT
                </button>
              </div>
            </div>

            <div className="mt-auto pb-12 flex gap-6">
              <Instagram className="text-white/20 hover:text-white transition-colors" />
              <Github className="text-white/20 hover:text-white transition-colors" />
              <Mail className="text-white/20 hover:text-white transition-colors" />
            </div>
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
              <li><Link to="/" className="hover:text-white transition-colors border-none">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors border-none">About</Link></li>
              <li><a href="/#work" className="hover:text-white transition-colors border-none">Work</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-6">Socials</p>
            <ul className="space-y-4 text-sm font-medium text-white/50">
              <li><a href="#" className="hover:text-white transition-colors border-none">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors border-none">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors border-none">GitHub</a></li>
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
        <div>© 2025 ARROUDHIL ANFI — ALL RIGHTS RESERVED</div>
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
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 font-['Outfit']">
        <CustomCursor />
        <BackgroundSystem />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </Router>
  );
}
