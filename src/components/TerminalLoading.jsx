import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function TerminalLoading({ message = "Memuat data..." }) {
    return (
        <div className="py-12 flex justify-center w-full">
            <div className="w-full max-w-lg rounded-2xl border border-black/5 bg-white p-6 flex items-center gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.04)]">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Loader2 size={16} className="animate-spin" />
                </div>
                <div>
                    <div className="mono text-xs tracking-widest uppercase text-black/40">Loading</div>
                    <div className="text-sm font-medium text-black/70">{message}</div>
                </div>
            </div>
        </div>
    );
}
