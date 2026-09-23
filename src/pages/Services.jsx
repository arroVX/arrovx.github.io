import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenTool, Server, Smartphone, Code } from 'lucide-react';

const services = [
    { icon: <PenTool size={20} />, title: "Graphic Design", desc: "Poster high-impact, branding, dan aset visual sesuai kebutuhan." },
    { icon: <Server size={20} />, title: "Network Infrastructure", desc: "Desain dan konfigurasi arsitektur server & jaringan korporat yang aman." },
    { icon: <Smartphone size={20} />, title: "UI/UX Design", desc: "Antarmuka digital intuitif dan modern dengan fokus user experience." },
    { icon: <Code size={20} />, title: "Web Development", desc: "Website responsif dan performant dengan React, Tailwind, Firebase." },
];

export default function Services() {
    return (
        <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-black/40 hover:text-black mb-10">
                    <ArrowLeft size={14} /> Back to Home
                </Link>
                <div className="mb-12">
                    <p className="mono text-xs tracking-[0.2em] uppercase text-black/40">Services</p>
                    <h1 className="headline-serif text-5xl md:text-6xl mt-2">Expertise &<br />Services.</h1>
                    <p className="text-black/50 leading-relaxed mt-4 max-w-2xl">Menggabungkan skill networking dengan desain kreatif untuk solusi digital menyeluruh.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    {services.map(s => (
                        <div key={s.title} className="rounded-2xl border border-black/5 bg-white p-8 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow group">
                            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">{s.icon}</div>
                            <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                            <p className="text-sm text-black/50 leading-relaxed mt-2">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
