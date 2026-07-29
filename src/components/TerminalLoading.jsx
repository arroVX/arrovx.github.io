import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2 } from 'lucide-react';

export default function TerminalLoading({ message = "Memuat data dari Firebase..." }) {
    return (
        <div className="py-12 flex justify-center w-full">
            <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="w-full max-w-lg"
            >
                <div className="bg-[#070a12]/95 border border-blue-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.15)] backdrop-blur-2xl font-mono text-left">
                    {/* Header Bar */}
                    <div className="px-5 py-3.5 bg-[#0c101c] border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-blue-400 font-bold text-sm select-none">&gt;_</span>
                            <div>
                                <div className="text-xs font-bold tracking-wider text-white/90">
                                    ARROOS COMMAND LINE
                                </div>
                                <div className="text-[9px] font-semibold text-blue-400/80 tracking-widest uppercase">
                                    KERNEL 2.0.26-BUILD
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Loader2 size={14} className="animate-spin text-blue-400" />
                        </div>
                    </div>

                    {/* Console Body */}
                    <div className="p-6 space-y-3 text-xs leading-relaxed">
                        <div className="space-y-1">
                            <div className="text-white/60 font-semibold">ArroOS v2.0.26 [Authorized Access Only]</div>
                            <div className="text-white/40">Initializing secure Firestore realtime stream...</div>
                        </div>

                        <div className="border-t border-white/5 pt-2" />

                        <div className="flex items-center gap-2 pt-1">
                            <span className="text-blue-400 font-bold">&gt;</span>
                            <span className="text-white/80 font-medium">{message}</span>
                            <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.6 }}
                                className="inline-block w-2 h-4 bg-blue-400 ml-1 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                            />
                        </div>
                    </div>

                    {/* Footer Bar */}
                    <div className="px-5 py-3 bg-[#0c101c]/90 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 font-bold text-blue-400/90">
                                <Zap size={12} className="text-blue-400" /> LATENCY: 4MS
                            </span>
                            <span className="font-semibold tracking-wider text-white/30 hidden sm:inline">
                                USER@ARRO-PC:~$
                            </span>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400 tracking-wider flex items-center gap-1.5">
                            SYNCING DATABASE
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
