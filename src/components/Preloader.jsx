import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    const diff = Math.random() * 10 + 6;
                    return Math.min(prev + diff, 100);
                }
                clearInterval(interval);
                setTimeout(onComplete, 600);
                return 100;
            });
        }, 80);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#e8e8e5] text-[#0a0a0a] select-none"
        >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/5">
                <motion.div
                    className="h-full bg-[#0a0a0a]"
                    style={{ width: `${counter}%` }}
                    transition={{ ease: "linear" }}
                />
            </div>

            <div className="text-center px-6 max-w-lg w-full">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mono text-[10px] tracking-[0.3em] text-black/40 uppercase mb-8"
                >
                    Arroudhil Anfi — Portfolio 2026
                </motion.div>

                <div className="flex items-end justify-center gap-3 mb-6">
                    <span className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
                        {Math.floor(counter)}
                    </span>
                    <span className="text-2xl font-light tracking-tighter mb-2">%</span>
                </div>

                <div className="mono text-xs text-black/50 tracking-wide">
                    Loading experience — please wait
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex items-center justify-center gap-2 mono text-[10px] tracking-widest text-black/30 uppercase"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    Initializing
                </motion.div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 mono text-[10px] tracking-widest text-black/20 uppercase">
                © 2026
            </div>
        </motion.div>
    );
}
