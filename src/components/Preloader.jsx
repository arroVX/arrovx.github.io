import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ShieldCheck, Zap, Activity, Code2, Lock } from 'lucide-react';

export default function Preloader({ onComplete }) {
    const [counter, setCounter] = useState(0);
    const [logs, setLogs] = useState([]);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const systemLogs = [
        "INITIALIZING ARRO_OS KERNEL v2.0.26...",
        "AUTHENTICATING SECURE HANDSHAKE...",
        "MOUNTING MODULES: [NETWORKING, DESIGN, REACT_CORE]...",
        "FETCHING SYSTEM ASSETS & CREATIVE SOUL...",
        "ENABLING HARDWARE ACCELERATION...",
        "OPTIMIZING RENDERING PIPELINE...",
        "ALL SYSTEMS NOMINAL. LAUNCHING PORTFOLIO..."
    ];

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });

        const logInterval = setInterval(() => {
            setLogs((prev) => {
                if (prev.length < systemLogs.length) {
                    return [...prev, systemLogs[prev.length]];
                }
                return prev;
            });
        }, 220);

        const counterInterval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    const diff = Math.random() * 12 + 4;
                    return Math.min(prev + diff, 100);
                }
                clearInterval(counterInterval);
                clearInterval(logInterval);
                setTimeout(onComplete, 900);
                return 100;
            });
        }, 100);

        return () => {
            clearInterval(counterInterval);
            clearInterval(logInterval);
        };
    }, [onComplete]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#030712] font-mono text-blue-400 overflow-hidden select-none"
        >
            {/* SVG Curtain Exit */}
            {dimension.width > 0 && (
                <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-[#030712] pointer-events-none z-[1]">
                    <motion.path
                        variants={curve}
                        initial="initial"
                        exit="exit"
                    />
                </svg>
            )}

            {/* Blue Cyber Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.15) 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.85)_100%)]" />
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-40 z-10" />

            {/* Background Glow Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Main Terminal Window */}
            <div className="relative z-20 w-full max-w-2xl mx-4 bg-[#070a12]/95 border border-blue-500/20 rounded-3xl shadow-[0_0_60px_rgba(37,99,235,0.18)] backdrop-blur-2xl overflow-hidden text-left font-mono">

                {/* Terminal Header */}
                <div className="px-6 py-4 bg-[#0c101c] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-blue-400 font-bold text-sm select-none">&gt;_</span>
                        <div>
                            <div className="text-xs font-bold tracking-wider text-white/90">
                                ARROOS COMMAND LINE
                            </div>
                            <div className="text-[9px] font-semibold text-blue-400/80 tracking-widest uppercase">
                                KERNEL 2.0.26-BUILD
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-white/40 font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1.5 text-blue-400">
                            <Lock size={12} /> SECURE BOOT
                        </span>
                        <span className="flex items-center gap-1">
                            <Activity size={12} /> {Math.floor(counter)}%
                        </span>
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {/* Welcome System Text */}
                    <div className="space-y-1 text-xs">
                        <div className="text-white/80 font-bold">ArroOS v2.0.26 [Authorized Access Only]</div>
                        <div className="text-white/40">Type "help" for a list of available commands.</div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-blue-400/90 font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                                <Cpu size={12} className="animate-spin text-blue-400" style={{ animationDuration: '3s' }} /> 
                                KERNEL INITIALIZATION
                            </span>
                            <span className="font-mono text-blue-400">{Math.floor(counter)}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-[#04070e] border border-blue-500/25 rounded-lg p-0.5 relative overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 rounded-md shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                                style={{ width: `${counter}%` }}
                            />
                        </div>
                    </div>

                    {/* Streaming System Logs Console */}
                    <div className="h-32 bg-[#04070e] border border-blue-500/20 rounded-2xl p-4 text-[11px] text-blue-300/80 overflow-y-auto space-y-1.5 custom-scrollbar shadow-inner">
                        {logs.map((log, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2 font-mono"
                            >
                                <span className="text-blue-400 font-bold">&gt;</span>
                                <span className="text-blue-400/40 text-[9px] font-mono">[00:0{index + 1}]</span>
                                <span className="text-blue-200">{log}</span>
                            </motion.div>
                        ))}
                        {counter < 100 && (
                            <div className="flex items-center gap-2 text-blue-400 pt-1">
                                <span className="font-bold">&gt;</span>
                                <span className="text-white/60">Executing boot sequence...</span>
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.6 }}
                                    className="inline-block w-2 h-4 bg-blue-400 ml-1 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="px-6 py-3.5 bg-[#0c101c]/90 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 font-bold text-blue-400">
                            <Zap size={12} className="text-blue-400" /> LATENCY: 4MS
                        </span>
                        <span className="font-semibold tracking-wider text-white/30 hidden sm:inline">
                            USER@ARRO-PC:~$
                        </span>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400 tracking-wider flex items-center gap-1.5 uppercase">
                        SYSTEM INITIALIZING
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
