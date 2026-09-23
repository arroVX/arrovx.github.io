import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Music, Camera, Coffee, Star } from 'lucide-react';

export default function About() {
    return (
        <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-black/40 hover:text-black mb-10">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
                    <div className="w-56 h-56 rounded-2xl overflow-hidden border border-black/5 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-1.5 shrink-0">
                        <img src="/profile.webp" alt="Arroudhil Anfi" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div>
                        <p className="mono text-xs tracking-[0.2em] uppercase text-black/40 mb-3">About</p>
                        <h1 className="headline-serif text-5xl md:text-6xl leading-none">The Mind Behind<br /><span className="italic font-light">Arro.</span></h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-10 mb-16">
                    <div className="md:col-span-2 space-y-4 text-black/70 leading-relaxed">
                        <p>Hi, I'm <span className="font-bold text-black">Arroudhil Anfi</span> — call me <span className="font-bold text-black">Arro</span>. Siswa <span className="font-bold text-black">SMKN 3 Jepara (TKJ)</span> yang percaya batas antara teknologi dan kreativitas itu tipis.</p>
                        <p>Perjalanan dimulai dari rasa penasaran bagaimana komputer saling berkomunikasi, lalu berkembang ke bagaimana manusia mengekspresikan diri lewat media digital — dari robot maze-solving hingga edit sinematik.</p>
                        <p>Saat tidak mengutak-atik server atau nulis algoritma, aku main gitar, eksplor math rock, atau hunting foto dengan kamera.</p>
                    </div>
                    <div className="space-y-3">
                        <p className="mono text-xs tracking-widest uppercase text-black/30">Personal Stats</p>
                        {[
                            { label: "Code Satisfaction", value: "100%" },
                            { label: "Music Playtime", value: "Infinity" },
                            { label: "Caffeine Level", value: "Midnight" },
                            { label: "Success Rate", value: "99.9%" }
                        ].map(s => (
                            <div key={s.label} className="flex items-center justify-between p-3 rounded-xl border border-black/5 bg-white">
                                <span className="mono text-xs tracking-widest uppercase text-black/40">{s.label}</span>
                                <span className="text-sm font-bold">{s.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-16">
                    {[
                        { icon: <Music size={20} />, title: "Math Rock & Guitar", desc: "Terinspirasi Murphy Radio — eksplorasi riff kompleks dan composing." },
                        { icon: <Camera size={20} />, title: "Visual Storytelling", desc: "Fotografi & videografi sebagai cara dokumentasi perspektif." },
                        { icon: <Coffee size={20} />, title: "Minimalist Design", desc: "Obsesi pada interface bersih, border halus, dan animasi halus." },
                        { icon: <Star size={20} />, title: "Competitive Programming", desc: "Memecahkan masalah kompleks dengan logic efisien adalah olahraga." },
                    ].map((c, i) => (
                        <div key={i} className="rounded-2xl border border-black/5 bg-white p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow">
                            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center mb-3">{c.icon}</div>
                            <h3 className="font-bold tracking-tight">{c.title}</h3>
                            <p className="text-sm text-black/50 leading-relaxed mt-1">{c.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-black/5 bg-white p-8 md:p-12 text-center">
                    <div className="headline-serif text-3xl md:text-4xl italic">“Technology is the instrument,<br />Creativity is the soul.”</div>
                </div>
            </div>
        </main>
    );
}
