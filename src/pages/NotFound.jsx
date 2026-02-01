import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-blue-400 glass-card border-white/10">
                        <Ghost size={48} />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl md:text-9xl font-black mb-4 tracking-tighter italic"
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4 mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold">Lost in the void?</h2>
                    <p className="text-white/40 max-w-sm mx-auto">
                        The page you're looking for was either deleted, moved, or never existed in this dimension.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/">
                        <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border-none shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                            <Home size={16} /> Take Me Home
                        </button>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="glass-button px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-all border-none"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </motion.div>
            </div>

            {/* Floating particles/circles */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-blue-500/20 blur-sm"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-purple-500/20 blur-sm"
            />
        </div>
    );
}
