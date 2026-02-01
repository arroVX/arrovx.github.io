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

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
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
                {/* Counter big bg */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                >
                    <span className="text-[20rem] md:text-[30rem] font-black text-white/2 tracking-tighter">
                        {Math.floor(counter)}
                    </span>
                </motion.div>

                {/* Main Logo Container */}
                <div className="flex flex-col items-center gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                            Digital Experience
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-white flex items-center"
                    >
                        ARRO<span className="text-blue-500">.</span>
                    </motion.h1>

                    <div className="h-6 overflow-hidden mt-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-100%" }}
                                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 block"
                            >
                                {words[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Luxury Loading Line */}
                <div className="mt-24 flex items-center gap-6">
                    <span className="text-[10px] font-mono text-white/20 italic">Initializing Systems</span>
                    <div className="w-40 h-px bg-white/5 relative overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${counter}%` }}
                            className="absolute inset-y-0 left-0 bg-blue-500"
                        />
                    </div>
                    <span className="text-[10px] font-mono text-blue-500 w-8">{Math.floor(counter)}%</span>
                </div>
            </div>

            {/* Background luxury elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/2 blur-[150px] rounded-full" />

                {/* Decorative Grid or lines */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>
        </motion.div>
    );
}
