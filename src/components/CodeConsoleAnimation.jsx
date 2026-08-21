import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Zap, Command, Check } from 'lucide-react';

const COMMAND_SEQUENCE = [
    {
        cmd: "whoami",
        output: "Arroudhil Anfi — TKJ Student & 2x Gold Medalist Informatika."
    },
    {
        cmd: "cat skills.json",
        output: '{\n  "network": "Cisco, Mikrotik, Debian Server",\n  "web": "React 19, Tailwind CSS, Vite",\n  "design": "Photoshop, Illustrator"\n}'
    },
    {
        cmd: "arro --status",
        output: "[OK] 10Gbps Uplink Connected | [OK] Build Engine Ready 🚀"
    },
    {
        cmd: "help",
        output: "Available commands: whoami, skills, projects, achievements, contact"
    }
];

export default function CodeConsoleAnimation() {
    const [history, setHistory] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [cmdIndex, setCmdIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const currentItem = COMMAND_SEQUENCE[cmdIndex];
        let charIndex = 0;

        setIsTyping(true);
        setCurrentInput('');

        // Typing loop
        const typeInterval = setInterval(() => {
            if (!isMounted) return;
            if (charIndex < currentItem.cmd.length) {
                setCurrentInput(currentItem.cmd.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);

                // Wait 600ms then execute and push to history
                setTimeout(() => {
                    if (!isMounted) return;
                    setHistory((prev) => [
                        ...prev.slice(-3), // keep last 3 commands visible to avoid overflow
                        { cmd: currentItem.cmd, output: currentItem.output }
                    ]);
                    setCurrentInput('');

                    // Wait 2500ms before next command
                    setTimeout(() => {
                        if (!isMounted) return;
                        setCmdIndex((prev) => (prev + 1) % COMMAND_SEQUENCE.length);
                    }, 2500);
                }, 600);
            }
        }, 80);

        return () => {
            isMounted = false;
            clearInterval(typeInterval);
        };
    }, [cmdIndex]);

    return (
        <div className="relative group w-full">
            {/* Ambient Background Glow Orbs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/25 transition-all duration-700" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Main Terminal Window Frame */}
            <div className="bg-[#070a12]/95 border border-blue-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)] backdrop-blur-2xl transition-all duration-500 hover:border-blue-500/40 font-mono">

                {/* Header Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                    <div className="flex items-center gap-3">
                        <Terminal size={18} className="text-blue-500 animate-pulse" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 leading-tight">ArroOS Command Line</span>
                            <span className="text-[8px] text-blue-500/50 uppercase tracking-widest font-mono">Kernel 2.0.26-build</span>
                        </div>
                    </div>

                    <button
                        className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/30 hover:text-white transition-all"
                        title="Close Console"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Console Body Area */}
                <div className="p-6 md:p-8 text-left min-h-[260px] max-h-[340px] overflow-y-auto space-y-3 custom-scrollbar text-xs md:text-sm leading-relaxed">
                    {/* Welcome Banners */}
                    <div className="flex gap-3 text-white/40 mb-6">
                        <div className="flex-1 space-y-2">
                            <p className="leading-relaxed whitespace-pre-wrap font-bold text-white/80">ArroOS v2.0.26 [Authorized Access Only]</p>
                            <p className="leading-relaxed whitespace-pre-wrap">Type "help" for a list of available commands.</p>
                        </div>
                    </div>

                    {/* Historical Command Logs */}
                    {history.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                            <div className="flex gap-3 text-white">
                                <span className="text-blue-500 font-bold opacity-80">❯</span>
                                <div className="flex-1 font-semibold">{item.cmd}</div>
                            </div>
                            <div className="flex gap-3 text-blue-400 font-medium">
                                <span className="text-blue-500 font-bold opacity-0">❯</span>
                                <div className="flex-1 whitespace-pre-wrap">{item.output}</div>
                            </div>
                        </div>
                    ))}

                    {/* Current Typing Command Prompt */}
                    <div className="flex gap-3 text-white pt-2">
                        <span className="text-blue-500 font-bold italic animate-pulse">❯</span>
                        <div className="flex-1 flex items-center font-medium">
                            {currentInput}
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="inline-block w-2 h-4 bg-blue-400 ml-1.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex items-center justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-1.5"><Zap size={10} className="text-blue-500" /> Latency: 4ms</span>
                        <span className="hidden sm:inline">User@Arro-PC:~$</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                        <Command size={10} /> <span>Interactive Terminal</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
