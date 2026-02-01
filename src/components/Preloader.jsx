import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [counter, setCounter] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });

        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    const diff = Math.random() * 10;
                    return Math.min(prev + diff, 100);
                }
                clearInterval(interval);
                // Call onComplete after the counter finishes
                // This triggers the exit animation and the content reveal
                setTimeout(onComplete, 1200);
                return 100;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    const words = ["DESIGN", "DEVELOP", "INNOVATE", "ARRO"];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }

    const particles = Array.from({ length: 20 });

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-10000 flex items-center justify-center pointer-events-none"
        >
            <svg className="absolute top-0 w-full h-[calc(100%+300px)] fill-[#030303] pointer-events-none">
                <motion.path
                    variants={curve}
                    initial="initial"
                    exit="exit"
                ></motion.path>
            </svg>

            <div className="relative z-10 flex flex-col items-center pointer-events-auto">
                {/* Decorative particles */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {particles.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                                opacity: 0
                            }}
                            animate={{
                                y: [null, Math.random() * -100],
                                opacity: [0, 0.4, 0]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 4,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute w-1 h-1 bg-blue-500 rounded-full blur-[2px]"
                        />
                    ))}
                </div>

                {/* Counter big bg */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                >
                    <span className="text-[20rem] md:text-[35rem] font-black text-white/5 tracking-tighter leading-none">
                        {Math.floor(counter)}
                    </span>
                </motion.div>

                {/* Main Logo Container */}
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                        <span className="text-xs font-black uppercase tracking-[0.8em] text-white/60">
                            ARRO ENTERPRISE
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                        className="relative"
                    >
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white flex items-center relative z-10">
                            ARRO<span className="text-blue-500">.</span>
                        </h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                            className="absolute -bottom-2 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent origin-center"
                        />
                    </motion.div>

                    <div className="h-8 overflow-hidden mt-4">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                className="text-sm md:text-base font-bold uppercase tracking-[0.4em] text-blue-400 block"
                            >
                                {words[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Luxury Loading Line */}
                <div className="mt-32 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">System Booting</span>
                        <div className="w-48 h-px bg-white/5 relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${counter}%` }}
                                className="absolute inset-y-0 left-0 bg-blue-500"
                            />
                        </div>
                        <span className="text-[10px] font-mono text-blue-500 w-10 text-right">{Math.floor(counter)}%</span>
                    </div>
                </div>
            </div>

            {/* Background luxury elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/5 blur-[150px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>
        </motion.div>
    );
}
