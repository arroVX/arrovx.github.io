import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ghost, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6 bg-[#e8e8e5] text-[#0a0a0a]">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 rounded-2xl border border-black/10 bg-white flex items-center justify-center mx-auto mb-6">
                    <Ghost size={28} className="text-black/40" />
                </div>
                <h1 className="headline-serif text-7xl leading-none">404</h1>
                <h2 className="text-xl font-bold tracking-tight mt-4">Lost in the void?</h2>
                <p className="text-black/50 mt-2 leading-relaxed">Halaman tidak ditemukan — mungkin dipindahkan atau belum dibuat.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                    <Link to="/" className="px-6 py-3 bg-black text-white rounded-full font-medium inline-flex items-center justify-center gap-2">
                        <Home size={16} /> Take Me Home
                    </Link>
                    <button onClick={() => window.history.back()} className="px-6 py-3 rounded-full border border-black/10 font-medium inline-flex items-center justify-center gap-2 bg-white hover:bg-black hover:text-white">
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
