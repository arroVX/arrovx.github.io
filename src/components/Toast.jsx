import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    className="fixed bottom-8 right-8 z-10002 pointer-events-none"
                >
                    <div className="glass-card p-1 pr-12 pl-5 py-4 border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex items-center gap-4 pointer-events-auto min-w-[300px] relative overflow-hidden group">
                        {/* Progress Bar */}
                        <motion.div
                            initial={{ width: '100%' }}
                            animate={{ width: '0%' }}
                            transition={{ duration: 5, ease: 'linear' }}
                            className={`absolute bottom-0 left-0 h-0.5 ${type === 'success' ? 'bg-blue-500' : 'bg-red-500'}`}
                        />

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                            {type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-0.5">
                                {type === 'success' ? 'System Notification' : 'System Error'}
                            </p>
                            <p className="text-sm font-bold text-white/90 leading-tight">
                                {message}
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 rounded-lg transition-all border-none"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
