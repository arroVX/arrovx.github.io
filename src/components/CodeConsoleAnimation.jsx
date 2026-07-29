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
                <div className="px-5 py-4 bg-[#0c101c] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-blue-400 font-bold text-sm select-none">&gt;_</span>
                        <div>
                            <div className="text-xs font-bold tracking-wider text-white/90 flex items-center gap-2">
                                ARROOS COMMAND LINE
                            </div>
                            <div className="text-[9px] font-semibold text-blue-400/80 tracking-widest uppercase">
                                KERNEL 2.0.26-BUILD
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/30 hover:text-white transition-all border-none"
                        title="Close Console"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Console Body Area */}
                <div className="p-6 text-left min-h-[260px] max-h-[340px] overflow-y-auto space-y-4 custom-scrollbar text-xs md:text-sm leading-relaxed">
                    {/* Welcome Banners */}
                    <div className="space-y-1">
                        <div className="text-white/60 font-semibold">
                            ArroOS v2.0.26 [Authorized Access Only]
                        </div>
                        <div className="text-white/40">
                            Type "help" for a list of available commands.
                        </div>
                    </div>

                    {/* Historical Command Logs */}
                    {history.map((item, idx) => (
                        <div key={idx} className="space-y-1.5">
                            <div className="flex items-center gap-2 text-white/90 font-semibold">
                                <span className="text-blue-400 font-bold">&gt;</span>
                                <span>{item.cmd}</span>
                            </div>
                            <div className="pl-4 text-blue-300/80 whitespace-pre-wrap">
                                {item.output}
                            </div>
                        </div>
                    ))}

                    {/* Current Typing Command Prompt */}
                    <div className="flex items-center gap-2 pt-1">
                        <span className="text-blue-400 font-bold">&gt;</span>
                        <span className="text-white font-medium">{currentInput}</span>
                        <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ repeat: Infinity, duration: 0.6 }}
                            className="inline-block w-2 h-4 bg-blue-400 ml-0.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                        />
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="px-5 py-3 bg-[#0c101c]/90 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 font-bold text-blue-400/90">
                            <Zap size={12} className="text-blue-400" /> LATENCY: 4MS
                        </span>
                        <span className="font-semibold tracking-wider text-white/30 hidden sm:inline">
                            USER@ARRO-PC:~$
                        </span>
                    </div>

                    <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/40 tracking-wider flex items-center gap-1.5">
                        <Command size={10} /> INTERACTIVE TERMINAL
                    </div>
                </div>

            </div>
        </div>
    );
}
