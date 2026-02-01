import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [counter, setCounter] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) return prev + 1;
                clearInterval(interval);
                setTimeout(() => {
                    setIsExiting(true);
                    setTimeout(onComplete, 1000);
                }, 500);
                return 100;
            });
        }, 20);
        return () => clearInterval(interval);
    }, [onComplete]);

    const words = ["CREATIVITY", "TECHNOLOGY", "INNOVATION", "ARRO"];
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-10000 bg-[#030303] flex flex-col items-center justify-center pointer-events-auto"
        >
            <div className="relative flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <span className="text-8xl md:text-[12rem] font-black tracking-tighter text-white/5 absolute -top-[50%] left-1/2 -translate-x-1/2 select-none">
                        {counter}%
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter relative z-10 flex items-center gap-2">
                        ARRO<span className="text-blue-500">.</span>
                    </h1>
                </motion.div>

                <div className="h-6 overflow-hidden flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={wordIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-400"
                        >
                            {words[wordIndex]}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <div className="absolute bottom-[-100px] flex items-center gap-4">
                    <div className="w-48 h-px bg-white/5 relative overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${counter}%` }}
                            className="absolute inset-0 bg-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
        </motion.div>
    );
}
