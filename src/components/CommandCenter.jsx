import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Zap, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = {
    'help': 'Available commands: help, about, projects, school, achievements, awards, admin, experience, contact, ping, clear, whoami, skills, social, github, instagram, version',
    'about': 'Navigating to About section...',
    'projects': 'Navigating to Projects...',
    'school': 'Navigating to School Projects...',
    'achievements': 'Navigating to Achievements & Certificates page...',
    'admin': 'Authenticating & Navigating to Admin Dashboard...',
    'experience': 'Navigating to Experience section...',
    'contact': 'Navigating to Contact...',
    'ping': 'Pong! (64 bytes from arrovx.github.io: icmp_seq=1 ttl=64 time=0.042 ms)',
    'whoami': 'Arroudhil Anfi - Full-Stack Developer / TKJ Student / Gold Medalist Informatics.',
    'skills': 'Primary: React, Tailwind, Firebase, Laravel, Networking (TKJ), Networking & Design.',
    'awards': '2025: Medali Emas FSBN & ONSP (Informatika). 2022: Medali Perak POSN & Excellent Robotic.',
    'social': 'GitHub: github.com/arroVX | Instagram: @jingroo_ | Email: arroudhilanfi01@gmail.com',
    'github': 'Opening GitHub profile in new tab...',
    'instagram': 'Opening Instagram profile in new tab...',
    'version': 'ArroOS version 3.0.0 — light editorial (iqmal.dev inspired)',
    'clear': 'CLEARED'
};

export default function CommandCenter({ isOpen, onClose }) {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'system', content: 'ArroOS v3.0.0 — light terminal [Authorized Access]' },
        { type: 'system', content: 'Type "help" for available commands. Press ESC to close.' }
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
                    { type: 'system', content: 'ArroOS v3.0.0 — light terminal [Authorized Access]' },
                    { type: 'system', content: 'Type "help" for available commands.' }
                ]);
            } else if (COMMANDS[cmd]) {
                const response = COMMANDS[cmd];
                setHistory(prev => [...prev, { type: 'response', content: response }]);

                const actions = {
                    'about': () => { navigate('/#about'); onClose(); },
                    'projects': () => { navigate('/projects'); onClose(); },
                    'school': () => { navigate('/school-projects'); onClose(); },
                    'achievements': () => { navigate('/achievements'); onClose(); },
                    'admin': () => { navigate('/admin'); onClose(); },
                    'experience': () => { navigate('/#experience'); onClose(); },
                    'contact': () => { navigate('/#contact'); onClose(); },
                    'github': () => { window.open('https://github.com/arroVX', '_blank'); },
                    'instagram': () => { window.open('https://www.instagram.com/jingroo_', '_blank'); }
                };

                if (actions[cmd]) {
                    setTimeout(actions[cmd], 600);
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
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-[#0a0a0a]/30 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.98, opacity: 0, y: 12 }}
                        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                        className="w-full max-w-2xl h-[68vh] md:h-[520px] flex flex-col overflow-hidden bg-white border border-black/10 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.18)]"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-black/5 bg-zinc-50/80">
                            <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                                    <Terminal size={14} />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[11px] font-bold tracking-widest uppercase text-black">Arro Terminal</span>
                                    <span className="mono text-[10px] tracking-widest text-black/40">v3.0 — light</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-black/40 hover:text-black transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-5 mono text-[13px] leading-relaxed overflow-y-auto space-y-2.5 bg-white"
                        >
                            {history.map((line, i) => (
                                <div key={i} className={`flex gap-2.5 ${line.type === 'error' ? 'text-red-500' :
                                    line.type === 'response' ? 'text-black font-medium' :
                                        line.type === 'input' ? 'text-black' : 'text-black/40'
                                    }`}>
                                    {line.type === 'input' && <span className="text-black/30 font-bold">❯</span>}
                                    <p className="flex-1 whitespace-pre-wrap break-words">{line.content}</p>
                                </div>
                            ))}
                            <div className="flex items-center gap-2.5 pt-1">
                                <span className="text-black font-bold">❯</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="flex-1 bg-transparent border-none outline-none text-black placeholder:text-black/20 p-0 mono text-[13px]"
                                    placeholder="type a command..."
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2.5 border-t border-black/5 bg-zinc-50 flex items-center justify-between mono text-[10px] tracking-widest uppercase text-black/30">
                            <span className="flex items-center gap-1.5"><Zap size={10} className="text-black/40" /> Latency 4ms</span>
                            <span className="flex items-center gap-1.5 bg-white border border-black/5 px-2 py-1 rounded-md"><Command size={10} /> ESC to close</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
