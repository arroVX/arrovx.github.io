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

                    {/* Header Bar */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-3">
                            <Terminal size={18} className="text-blue-500 animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 leading-tight">ArroOS Command Line</span>
                                <span className="text-[8px] text-blue-500/50 uppercase tracking-widest font-mono">Kernel 2.0.26-build</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={12} className="text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-400">{Math.floor(counter)}%</span>
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="flex-1 p-6 md:p-8 font-mono text-sm overflow-y-auto space-y-3 custom-scrollbar min-h-[250px]">
                        <div className="flex gap-3 text-white/40 mb-6">
                            <div className="flex-1 space-y-2">
                                <p className="leading-relaxed whitespace-pre-wrap font-bold text-white/80">ArroOS v2.0.26 [Authorized Access Only]</p>
                                <p className="leading-relaxed whitespace-pre-wrap">Initializing system components...</p>
                            </div>
                        </div>
                        
                        {logs.map((log, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, x: -4 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex gap-3 text-blue-400/80 font-medium"
                            >
                                <span className="text-blue-500 font-bold opacity-80">❯</span>
                                <div className="flex-1">
                                    <p className="leading-relaxed whitespace-pre-wrap">{log}</p>
                                </div>
                            </motion.div>
                        ))}
                        
                        {counter < 100 && (
                            <div className="flex gap-3 text-white pt-2">
                                <span className="text-blue-500 font-bold italic animate-pulse">❯</span>
                                <div className="flex-1 flex items-center">
                                    <p className="leading-relaxed whitespace-pre-wrap">Executing boot sequence</p>
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.6 }}
                                        className="inline-block w-2 h-4 bg-blue-400 ml-1.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Terminal Footer */}
                    <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex items-center justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1.5"><Zap size={10} className="text-blue-500" /> Latency: 4ms</span>
                            <span className="hidden sm:inline">User@Arro-PC:~$</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                            <Cpu size={10} className="animate-spin text-blue-500" style={{ animationDuration: '3s' }} /> 
                            <span className="text-blue-400">System Initializing</span>
                        </div>
                    </div></div>

        </motion.div>
    );
}
