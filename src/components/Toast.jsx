import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', isOpen, onClose }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => onClose(), 4000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[1000000] w-[90%] max-w-sm"
                >
                    <div className="bg-white border border-black/10 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-4 pr-10 flex items-center gap-3 relative overflow-hidden">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${type === 'success' ? 'bg-black text-white' : 'bg-red-500 text-white'}`}>
                            {type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        </div>
                        <div>
                            <div className="mono text-[10px] tracking-widest uppercase text-black/40">{type === 'success' ? 'Success' : 'Error'}</div>
                            <div className="text-sm font-medium leading-tight text-black">{message}</div>
                        </div>
                        <button onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-black/30">
                            <X size={14} />
                        </button>
                        <motion.div initial={{ width: '100%' }} animate={{ width: '0%' }} transition={{ duration: 4, ease: 'linear' }} className={`absolute bottom-0 left-0 h-0.5 ${type === 'success' ? 'bg-black' : 'bg-red-500'}`} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
