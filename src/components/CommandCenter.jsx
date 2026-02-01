import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Zap, Command, Github, Instagram, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = {
    'help': 'Available commands: help, about, projects, services, experience, guestbook, ping, clear, whoami, skills, achievements, social, contact, music, version',
    'about': 'Navigating to About page...',
    'projects': 'Navigating to Projects page...',
    'services': 'Navigating to Services page...',
    'experience': 'Navigating to Experience section...',
    'guestbook': 'Navigating to Guestbook page...',
    'contact': 'Navigating to Contact page...',
    'ping': 'Pong! (64 bytes from arrovx.github.io: icmp_seq=1 ttl=64 time=0.042 ms)',
    'whoami': 'Arroudhil Anfi - TKJ Student / Visionary Designer / Gold Medalist in Informatics.',
    'skills': 'Primary: Networking (TKJ), Photoshop, Premiere Pro, React, Tailwind CSS, C++. Hobbies: Math Rock Guitar, Photography.',
    'achievements': '2025: Medali Emas FSBN & ONSP (Informatika). 2022: Medali Perak POSN (Informatika) & Excellent Award Robotic.',
    'social': 'GitHub: github.com/arroVX | Instagram: @jingroo_ | Discord: arro.nx',
    'github': 'Opening GitHub profile in new tab...',
    'instagram': 'Opening Instagram profile in new tab...',
    'music': 'Currently vibing to: Murphy Radio - Autumn (Math Rock)',
    'version': 'ArroOS version 2.0.26-build.stable.2026',
    'clear': 'CLEARED'
};

export default function CommandCenter({ isOpen, onClose }) {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'ArroOS v2.0.26 [Authorized Access Only]' },
        { type: 'system', content: 'Type "help" for a list of available commands.' }
    ]);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, onClose]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.toLowerCase().trim();
            if (!cmd) return;

            setHistory(prev => [...prev, { type: 'input', content: cmd }]);

            if (cmd === 'clear') {
                setHistory([
                    { type: 'system', content: 'ArroOS v2.0.26 [Authorized Access Only]' },
                    { type: 'system', content: 'Type "help" for a list of available commands.' }
                ]);
            } else if (COMMANDS[cmd]) {
                const response = COMMANDS[cmd];
                setHistory(prev => [...prev, { type: 'response', content: response }]);

                // Action Mapping
                const actions = {
                    'about': () => { navigate('/about'); onClose(); },
                    'projects': () => { navigate('/projects'); onClose(); },
                    'services': () => { navigate('/#services'); onClose(); }, // scroll indicator
                    'experience': () => { navigate('/#experience'); onClose(); },
                    'guestbook': () => { navigate('/guestbook'); onClose(); },
                    'contact': () => { navigate('/contact'); onClose(); },
                    'github': () => { window.open('https://github.com/arroVX', '_blank'); },
                    'instagram': () => { window.open('https://www.instagram.com/jingroo_', '_blank'); }
                };

                if (actions[cmd]) {
                    setTimeout(actions[cmd], 800);
                }
            } else {
                setHistory(prev => [...prev, { type: 'error', content: `Command not found: ${cmd}. Type "help" for assistance.` }]);
            }

            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 backdrop-blur-2xl bg-black/40"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="glass-card w-full max-w-2xl h-[70vh] md:h-[500px] flex flex-col overflow-hidden border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-[#030303]/90 relative"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <Terminal size={18} className="text-blue-500 animate-pulse" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 leading-tight">ArroOS Command Line</span>
                                    <span className="text-[8px] text-blue-500/50 uppercase tracking-widest font-mono">Kernel 2.0.26-build</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-3 selection:bg-blue-500/30 custom-scrollbar"
                        >
                            {history.map((line, i) => (
                                <div key={i} className={`flex gap-3 ${line.type === 'error' ? 'text-red-400' :
                                    line.type === 'response' ? 'text-blue-400 font-medium' :
                                        line.type === 'input' ? 'text-white' : 'text-white/40'
                                    }`}>
                                    {line.type === 'input' && <span className="text-blue-500 font-bold opacity-80">❯</span>}
                                    <div className="flex-1">
                                        <p className="leading-relaxed whitespace-pre-wrap">{line.content}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center gap-3 group">
                                <span className="text-blue-500 font-bold italic animate-pulse">❯</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 placeholder:text-white/5"
                                    placeholder="Enter system command..."
                                />
                            </div>
                        </div>

                        {/* Terminal Footer */}
                        <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex items-center justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5"><Zap size={10} className="text-blue-500" /> Latency: 4ms</span>
                                <span className="hidden sm:inline">User@Arro-PC:~$</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                <Command size={10} /> <span>ESC to exit</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
