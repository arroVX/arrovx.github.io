import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = [
    { text: "ARRO" },
    { text: "ARROUDHIL ANFI" },
    { text: "ꦄꦫꦺꦴ" },
    { text: "ꦄꦫꦺꦴꦈꦝꦶꦭ꧀ ꦄꦤ꧀ꦥ꦳ꦶ" },
    { text: "A.R.R.O" },
    { text: "ΛRRΘ" },
    { text: "αяяσ" }
];

export default function LogoAnimation() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % variants.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentVariant = variants[index];

    return (
        <div className="flex items-center h-8 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1]
                    }}
                    className="text-xl font-bold tracking-tighter hover:text-blue-400 transition-colors whitespace-nowrap inline-flex items-center"
                >
                    {currentVariant.text}
                    <span className="text-blue-500 group-hover:text-white transition-colors ml-px">.</span>
                </motion.span>
            </AnimatePresence>
        </div>
    );
}
