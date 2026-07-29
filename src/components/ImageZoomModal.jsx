import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCw, RefreshCw, X } from 'lucide-react';

export default function ImageZoomModal({ src, alt, onClose }) {
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = (e) => {
        e?.stopPropagation();
        setScale(prev => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = (e) => {
        e?.stopPropagation();
        setScale(prev => Math.max(prev - 0.5, 1));
    };

    const handleRotate = (e) => {
        e?.stopPropagation();
        setRotation(prev => (prev + 90) % 360);
    };

    const handleReset = (e) => {
        e?.stopPropagation();
        setScale(1);
        setRotation(0);
    };

    const handleWheel = (e) => {
        if (e.deltaY < 0) {
            setScale(prev => Math.min(prev + 0.25, 4));
        } else {
            setScale(prev => Math.max(prev - 0.25, 1));
        }
    };

    const handleImageClick = (e) => {
        e.stopPropagation();
        setScale(prev => (prev >= 3 ? 1 : prev + 1));
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[3000000] flex flex-col items-center justify-between p-4 md:p-8 bg-black/95 backdrop-blur-3xl select-none"
                onClick={onClose}
                onWheel={handleWheel}
            >
                {/* Floating Top Bar Control Panel */}
                <div className="w-full flex items-center justify-between z-10" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs font-mono font-bold text-white shadow-2xl">
                        <span className="text-blue-400">ZOOM:</span> {Math.round(scale * 100)}%
                        {rotation > 0 && <span className="text-purple-400 ml-2">ROT: {rotation}°</span>}
                    </div>

                    {/* Toolbar Action Buttons */}
                    <div className="flex items-center gap-2 bg-[#0a0f1d]/90 p-2 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-xl">
                        <button
                            onClick={handleZoomIn}
                            title="Zoom In (+)"
                            disabled={scale >= 4}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 text-white flex items-center justify-center transition-colors border-none cursor-pointer"
                        >
                            <ZoomIn size={18} />
                        </button>
                        <button
                            onClick={handleZoomOut}
                            title="Zoom Out (-)"
                            disabled={scale <= 1}
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 text-white flex items-center justify-center transition-colors border-none cursor-pointer"
                        >
                            <ZoomOut size={18} />
                        </button>
                        <button
                            onClick={handleRotate}
                            title="Rotate 90°"
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-purple-600 text-white flex items-center justify-center transition-colors border-none cursor-pointer"
                        >
                            <RotateCw size={18} />
                        </button>
                        <button
                            onClick={handleReset}
                            title="Reset Zoom"
                            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors border-none cursor-pointer"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        title="Tutup (ESC)"
                        className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-red-600/80 text-white flex items-center justify-center border border-white/20 cursor-pointer shadow-2xl backdrop-blur-md transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Main Interactive Zoomable Canvas */}
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing">
                    <motion.div
                        drag={scale > 1}
                        dragConstraints={{ left: -500 * scale, right: 500 * scale, top: -400 * scale, bottom: 400 * scale }}
                        animate={{ scale, rotate: rotation }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        onClick={handleImageClick}
                        className="max-w-[92vw] max-h-[85vh] flex items-center justify-center"
                    >
                        <img
                            src={src}
                            alt={alt}
                            className="max-w-[90vw] max-h-[80vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(37,99,235,0.4)] border border-white/10 pointer-events-auto"
                            draggable={false}
                        />
                    </motion.div>
                </div>

                {/* Bottom Instructions Tip */}
                <div className="z-10 text-[11px] font-mono text-white/50 bg-black/60 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md pointer-events-none">
                    💡 Scroll mouse / Klik gambar untuk zoom | Geser mouse untuk geser posisi
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
