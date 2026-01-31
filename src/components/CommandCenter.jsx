import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Zap, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = {
    'help': 'Available commands: help, about, projects, services, ping, clear, whoami, skills',
    'about': 'Navigating to About page...',
    'projects': 'Navigating to Projects page...',
    'services': 'Navigating to Services page...',
    'ping': 'Pong! (64 bytes from arrovx.github.io: icmp_seq=1 ttl=64 time=0.042 ms)',
    'whoami': 'Arroudhil Anfi - TKJ Student / Visionary Designer / Gold Medalist in Informatics.',
    'skills': 'Primary: Networking, Photoshop, Premiere Pro, React, C++. Hobbies: Math Rock Guitar, Photography.',
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

                // Navigation commands
                if (cmd === 'about') setTimeout(() => { navigate('/about'); onClose(); }, 500);
                if (cmd === 'projects') setTimeout(() => { navigate('/projects'); onClose(); }, 500);
                if (cmd === 'services') setTimeout(() => { navigate('/services'); onClose(); }, 500);
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
                        className="glass-card w-full max-w-2xl h-[70vh] md:h-[450px] flex flex-col overflow-hidden border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-zinc-950/80"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-3">
                                <Terminal size={18} className="text-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Terminal Command Center</span>
                            </div>
                            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Terminal Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-2 selection:bg-blue-500/30"
                        >
                            {history.map((line, i) => (
                                <div key={i} className={`flex gap-2 ${line.type === 'error' ? 'text-red-400' :
                                    line.type === 'response' ? 'text-blue-300' :
                                        line.type === 'input' ? 'text-white' : 'text-white/40'
                                    }`}>
                                    {line.type === 'input' && <span className="text-blue-500 font-bold">❯</span>}
                                    <p className="leading-relaxed whitespace-pre-wrap">{line.content}</p>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <span className="text-blue-500 font-bold italic group-hover:animate-pulse">❯</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                                    placeholder="Enter command..."
                                />
                            </div>
                        </div>

                        {/* Terminal Footer */}
                        <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex items-center justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                            <div className="flex gap-4">
                                <span>Status: Online</span>
                                <span>Encoding: UTF-8</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-50">
                                <Command size={10} /> <span className="hidden md:inline">Press ESC to exit</span>
                                <span className="md:hidden text-[8px]">Tap outside to exit</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
