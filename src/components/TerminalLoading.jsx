import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Loader2, Terminal, Activity, Cpu } from 'lucide-react';

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
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-3">
                            <Terminal size={18} className="text-blue-500 animate-pulse" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 leading-tight">ArroOS Command Line</span>
                                <span className="text-[8px] text-blue-500/50 uppercase tracking-widest font-mono">Kernel 2.0.26-build</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity size={12} className="text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-400"><Loader2 size={10} className="animate-spin inline mr-1"/>Syncing</span>
                        </div>
                    </div>

                    {/* Console Body */}
                    <div className="p-6 md:p-8 space-y-3 text-xs leading-relaxed min-h-[180px]">
                        <div className="flex gap-3 text-white/40 mb-6">
                            <div className="flex-1 space-y-2">
                                <p className="leading-relaxed whitespace-pre-wrap font-bold text-white/80">ArroOS v2.0.26 [Authorized Access Only]</p>
                                <p className="leading-relaxed whitespace-pre-wrap">Initializing secure Firestore realtime stream...</p>
                            </div>
                        </div>

                        <div className="flex gap-3 text-white pt-2">
                            <span className="text-blue-500 font-bold italic animate-pulse">❯</span>
                            <div className="flex-1 flex items-center">
                                <p className="leading-relaxed whitespace-pre-wrap text-blue-300">{message}</p>
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.6 }}
                                    className="inline-block w-2 h-4 bg-blue-400 ml-1.5 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Bar */}
                    <div className="px-6 py-3 border-t border-white/5 bg-black/60 flex items-center justify-between text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1.5"><Zap size={10} className="text-blue-500" /> Latency: 4ms</span>
                            <span className="hidden sm:inline">User@Arro-PC:~$</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                            <Cpu size={10} className="animate-spin text-blue-500" style={{ animationDuration: '3s' }} /> 
                            <span className="text-blue-400">Syncing Database</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
