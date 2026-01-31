import { useState, useEffect, useCallback } from 'react';

// --- Text Scramble Effect ---
const chars = '!<>-_\\/[]{}—=+*^?#________';

export const useScrambleText = (text, delay = 0) => {
    const [scrambled, setScrambled] = useState('');

    const scramble = useCallback(async () => {
        if (delay) await new Promise(resolve => setTimeout(resolve, delay));

        let iteration = 0;
        const interval = setInterval(() => {
            setScrambled(
                text.split("")
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
    }, [text, delay]);

    useEffect(() => {
        scramble();
    }, [scramble]);

    return scrambled;
};

// --- Tilt Effect Logic ---
export const useTilt = (ref, settings = { max: 15, perspective: 1000 }) => {
    const [style, setStyle] = useState({});

    const onMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const card = ref.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -settings.max;
        const rotateY = ((x - centerX) / centerX) * settings.max;

        setStyle({
            transform: `perspective(${settings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'none'
        });
    }, [ref, settings.max, settings.perspective]);

    const onMouseLeave = useCallback(() => {
        setStyle({
            transform: `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg)`,
            transition: 'transform 0.5s ease'
        });
    }, [settings.perspective]);

    return { style, onMouseMove, onMouseLeave };
};

// --- Magnetic Effect ---
export const useMagnetic = (ref) => {
    const [style, setStyle] = useState({});

    const onMouseMove = useCallback((e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        setStyle({
            transform: `translate(${distanceX * 0.3}px, ${distanceY * 0.3}px)`,
            transition: 'transform 0.1s ease-out'
        });
    }, [ref]);

    const onMouseLeave = useCallback(() => {
        setStyle({
            transform: `translate(0px, 0px)`,
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
        });
    }, []);

    return { style, onMouseMove, onMouseLeave };
};
