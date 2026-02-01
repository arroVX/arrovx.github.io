import React, { useState, useEffect, useCallback } from 'react';

const variants = [
    "ARRO",
    "ARROUDHIL ANFI",
    "ꦄꦫꦺꦴ"
];

const chars = '!<>-_\\/[]{}—=+*^?#________';

export default function LogoAnimation() {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState(variants[0]);
    const [isScrambling, setIsScrambling] = useState(false);

    const scramble = useCallback((targetText) => {
        setIsScrambling(true);
        let iteration = 0;
        const maxIterations = targetText.length * 3;

        const interval = setInterval(() => {
            setDisplayText(
                targetText.split("")
                    .map((char, idx) => {
                        if (idx < iteration / 3) return targetText[idx];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= maxIterations) {
                clearInterval(interval);
                setIsScrambling(false);
                setDisplayText(targetText);
            }
            iteration += 1;
        }, 30);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (index + 1) % variants.length;
            setIndex(nextIndex);
            scramble(variants[nextIndex]);
        }, 4000);
        return () => clearInterval(interval);
    }, [index, scramble]);

    return (
        <div className="flex items-center h-8">
            <span
                className={`text-xl font-bold tracking-tighter transition-colors whitespace-nowrap inline-flex items-center ${isScrambling ? 'text-blue-400' : 'hover:text-blue-400'
                    }`}
            >
                {displayText}
                <span className="text-blue-500 group-hover:text-white transition-colors ml-px">.</span>
            </span>
        </div>
    );
}
