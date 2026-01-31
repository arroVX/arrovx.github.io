import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Code, Guitar, Camera, Video, Edit,
    Award, Trophy, Mail, Github, Instagram,
    ChevronRight, Menu, X, Terminal, Cpu,
    Globe, Database, Layers, PlayCircle, ExternalLink,
    Sparkles, Zap, Monitor, Smartphone, Music, Disc
} from 'lucide-react';

const achievements = [
    {
        title: "Medali Emas FSBN 2025",
        desc: "Bidang Informatika - Tingkat Nasional",
        year: "2025",
        icon: <Trophy className="text-yellow-400" />,
        color: "bg-yellow-500/10",
        cert: "/certificates/FSBN_2025.pdf"
    },
    {
        title: "Medali Emas ONSP 2025",
        desc: "Bidang Informatika - Prestasi Akademik",
        year: "2025",
        icon: <Sparkles className="text-blue-400" />,
        color: "bg-blue-500/10",
        cert: "/certificates/ONSP_2025.pdf"
    },
    {
        title: "Excellent Award Robotic",
        desc: "Maze Solving Competition - Creative Coding",
        year: "2022",
        icon: <Terminal className="text-green-400" />,
        color: "bg-green-500/10"
    },
    {
        title: "Medali Perak POSN 2022",
        desc: "Informatika - Olimpiade Sains Nasional",
        year: "2022",
        icon: <Award className="text-slate-300" />,
        color: "bg-slate-500/10"
    }
];

const projects = [
    {
        title: "Cinematic Reel 2024",
        category: "Videography",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800",
        desc: "A collection of high-energy cinematic shots and edits crafted for local clients. Focuses on storytelling and color grading excellence.",
        tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"]
    },
    {
        title: "Network Infrastructure Mod",
        category: "TKJ / Networking",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
        desc: "Designing and configuring a scalable Linux-based server infrastructure with multi-layer security and automated monitoring.",
        tech: ["Cisco", "Linux", "Nginx", "MikroTik"]
    },
    {
        title: "React Glass Portfolio",
        category: "Web Dev",
        image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800",
        desc: "A futuristic portfolio design featuring high-end glassmorphism, fluid animations, and a focus on visual impact.",
        tech: ["React", "Framer Motion", "Tailwind CSS"]
    }
];

const gear = [
    { name: "Production Rig", detail: "Ryzen 9 · 64GB RAM · RTX 4070", icon: <Cpu className="text-blue-400" /> },
    { name: "Camera Kit", detail: "Sony Alpha Series · Prime Lenses", icon: <Camera className="text-purple-400" /> },
    { name: "Sound Station", detail: "Custom Electric · Ibanez Acoustic", icon: <Guitar className="text-orange-400" /> },
    { name: "Network Lab", detail: "Cisco Catalyst · EdgeRouter", icon: <Globe className="text-emerald-400" /> }
];

function MusicModal({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 40 }}
                className="glass-card max-w-md w-full p-10 text-center relative border-none overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse" />

                <div className="w-40 h-40 mx-auto bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden group">
                    <Disc className="text-white w-20 h-20 animate-[spin_10s_linear_infinite]" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle className="text-white w-12 h-12" />
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <p className="text-blue-400 text-xs font-black uppercase tracking-[0.4em]">Listening To</p>
                    <h3 className="text-3xl font-black tracking-tighter">Autumn</h3>
                    <p className="text-white/40 font-bold">Murphy Radio</p>
                </div>

                <div className="flex justify-center gap-1.5 h-12 items-end mb-10">
                    {[0.6, 0.4, 0.9, 0.3, 0.7, 0.5, 0.8, 0.4, 0.6, 0.3].map((h, i) => (
                        <motion.div
                            key={i}
                            className="w-1.5 bg-blue-500/40 rounded-full"
                            animate={{ height: [`${h * 100}%`, `${(1 - h) * 100}%`, `${h * 100}%`] }}
                            transition={{ repeat: Infinity, duration: 1 + h, ease: "easeInOut" }}
                        />
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20 px-2">
                        <span>Math Rock</span>
                        <span>02:45 / 04:12</span>
                        <span>2018</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-white text-black rounded-2xl font-black tracking-widest uppercase text-sm hover:scale-105 active:scale-95 transition-all border-none"
                    >
                        Close Player
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

const partners = [
    { name: "Cisco", icon: <Globe size={24} /> },
    { name: "Adobe", icon: <Layers size={24} /> },
    { name: "GitHub", icon: <Github size={24} /> },
    { name: "Framer", icon: <Zap size={24} /> },
    { name: "React", icon: <Code size={24} /> }
];

const TechStack = ({ icon, name }) => (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5 text-sm font-medium hover:border-white/20 transition-all cursor-default group">
        <div className="text-blue-400 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <span>{name}</span>
    </div>
);

function ProjectModal({ project, onClose }) {
    if (!project) return null;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card max-w-2xl w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="aspect-video relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all border-none">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-black uppercase tracking-widest text-blue-500 py-1 px-3 bg-blue-500/10 rounded-lg">{project.category}</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-white/50 mb-8 leading-relaxed italic border-l-2 border-white/10 pl-6">
                        {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {project.tech.map(t => (
                            <span key={t} className="text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 bg-white/5 rounded-lg border border-white/5">{t}</span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Home() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showMusicModal, setShowMusicModal] = useState(false);

    return (
        <main className="relative z-10">
            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
                {showMusicModal && <MusicModal onClose={() => setShowMusicModal(false)} />}
            </AnimatePresence>

            {/* Hero Section v2 */}
            <section className="min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-6 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center relative"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 glass-card rounded-full! text-[10px] md:text-xs font-bold text-blue-400 mb-6 md:mb-8 tracking-widest uppercase border-white/5">
                        <Zap size={14} className="animate-pulse" /> Portofolio Website 2026
                    </div>

                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 leading-[0.9] tracking-tighter">
                        Bridging Tech <br />
                        <span className="text-linear text-glow">& Creative Arts</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-base md:text-xl text-white/50 mb-10 md:mb-12 leading-relaxed px-4">
                        Based in Indonesia, Arro is a <span className="text-white font-bold">SMKN 3 Jepara</span> student specializing in TKJ, crafting digital experiences through code, music, and cinematic visuals.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <a href="#work" className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] border-none">
                            Explore Work
                        </a>
                        <Link to="/about" className="w-full sm:w-auto glass-button border-white/10 group flex items-center justify-center gap-2 border-none">
                            About Me <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    {/* Music Now Playing (Simulated) */}
                    <div className="mt-12 md:mt-16 flex items-center justify-center">
                        <div
                            onClick={() => setShowMusicModal(true)}
                            className="glass-card p-4 py-2! rounded-2xl! flex items-center gap-4 bg-white/5 group border-none cursor-pointer hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
                        >
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center animate-[spin_8s_linear_infinite]">
                                <Disc className="text-white" size={16} />
                            </div>
                            <div className="text-left">
                                <p className="text-[9px] uppercase tracking-widest font-black text-blue-500 mb-0.5">Now Playing</p>
                                <p className="text-xs md:text-sm font-bold truncate max-w-[120px] md:max-w-[150px]">Murphy Radio — Autumn</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Trusted/Tools Cloud */}
                <div className="mt-24 w-full max-w-5xl">
                    <p className="text-center text-xs font-bold text-white/30 uppercase tracking-[0.3em] mb-10">Built with Industrial Standards</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {partners.map((p) => (
                            <div key={p.name} className="flex items-center gap-2 text-xl font-bold">
                                {p.icon} <span>{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento Grid: Expertise & Areas */}
            <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">My Expertise</p>
                        <h2 className="text-5xl font-bold tracking-tighter">Crafting in multi <br /> <span className="text-white/40">dimensions.</span></h2>
                    </div>
                    <p className="max-w-sm text-white/50 text-sm leading-relaxed">
                        From configuring robust network infrastructures to composing cinematic melodies, my work is a blend of logic and soul.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                    {/* TKJ Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-8 glass-card glass-card-hover p-10 flex flex-col justify-between overflow-hidden relative group"
                    >
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 font-bold">01</div>
                            <h3 className="text-3xl font-bold mb-4">Network Engineering</h3>
                            <p className="text-white/50 max-w-md">Specializing in TKJ (Network & Computer Engineering). Expert in building secure, scalable infrastructures and server management.</p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                            <TechStack icon={<Globe size={16} />} name="Routing & Switching" />
                            <TechStack icon={<Database size={16} />} name="Server Management" />
                            <TechStack icon={<Terminal size={16} />} name="Linux System" />
                        </div>
                        <Monitor className="absolute -bottom-10 -right-10 w-64 h-64 text-white/2 group-hover:text-blue-500/5 transition-colors duration-700" />
                    </motion.div>

                    {/* Creative Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-4 glass-card glass-card-hover p-10 flex flex-col justify-between bg-linear-to-br from-indigo-500/10 to-transparent"
                    >
                        <div>
                            <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 font-bold">02</div>
                            <h3 className="text-3xl font-bold mb-4 font-['Outfit']">Creative Media</h3>
                            <p className="text-white/50">Photography & Videography with professional-grade editing.</p>
                        </div>
                        <div className="space-y-4 mt-8">
                            <div className="flex items-center gap-4">
                                <PlayCircle className="text-indigo-400" /> <span className="font-bold">Adobe Premiere</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Camera className="text-indigo-400" /> <span className="font-bold">Color Grading</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Guitar Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-4 glass-card glass-card-hover p-10 flex flex-col justify-center items-center text-center relative overflow-hidden"
                    >
                        <Guitar className="w-16 h-16 text-orange-400 mb-6" />
                        <h3 className="text-2xl font-bold">Composer & Guitarist</h3>
                        <p className="text-sm text-white/40 mt-2 italic">"Expressing emotions through six strings."</p>
                        <div className="absolute inset-0 bg-linear-to-t from-orange-500/5 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Code Card */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-8 glass-card glass-card-hover p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="flex-1">
                            <h3 className="text-3xl font-bold mb-4">Programming Mastery</h3>
                            <div className="flex gap-4 mb-4">
                                <TechStack icon={<Code size={16} />} name="React" />
                                <TechStack icon={<Cpu size={16} />} name="C++ (Competitive)" />
                            </div>
                            <p className="text-white/50 text-sm">Two-time Gold medalist in Informatics. Bringing algorithmic efficiency to modern UI development.</p>
                        </div>
                        <div className="flex-none p-6 bg-white/5 rounded-3xl border border-white/5 font-mono text-xs text-blue-400">
                            <pre><code>{`function inspire() {
  const code = 'Passion';
  const art = 'Vision';
  return code + art;
}`}</code></pre>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Selected Projects */}
            <section id="work" className="py-24 px-6 bg-white/1">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <h2 className="text-5xl font-bold tracking-tighter">Selected <br /> <span className="text-linear">Works</span></h2>
                        <button className="text-sm font-bold flex items-center gap-2 group border-none">
                            View All <span className="px-2 py-1 glass-card group-hover:bg-white/10 transition-all">24</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {projects.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProject(p)}
                            >
                                <div className="aspect-video rounded-3xl overflow-hidden mb-6 relative">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center">
                                            <ExternalLink size={20} />
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">{p.category}</p>
                                <h3 className="text-2xl font-bold hover:text-blue-400 transition-colors">{p.title}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gear Section */}
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Behind the scenes</p>
                        <h2 className="text-5xl font-bold tracking-tighter">My Desktop Hub</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gear.map((g, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-card p-8 group border-none hover:bg-white/5 transition-all"
                            >
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
                                    {React.cloneElement(g.icon, { size: 28 })}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{g.name}</h3>
                                <p className="text-sm text-white/30 font-medium">{g.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dynamic Achievements */}
            <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Milestones & Awards</h2>
                    <p className="text-white/40">Proof of dedication and technical excellence.</p>
                </div>

                <div className="space-y-6">
                    {achievements.map((a, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative group transition-all duration-500 hover:bg-white/5 overflow-hidden border-none"
                        >
                            {/* Icon Container */}
                            <div className={`w-16 h-16 ${a.color} rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                {React.cloneElement(a.icon, { size: 32 })}
                            </div>

                            {/* Content Container */}
                            <div className="flex-1 text-center md:text-left space-y-1 relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight">{a.title}</h3>
                                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/10" />
                                    <span className="text-sm font-mono text-blue-400/80 uppercase tracking-widest font-bold">{a.year}</span>
                                </div>
                                <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-xl">{a.desc}</p>
                            </div>

                            {/* Action Container */}
                            <div className="shrink-0 pt-2 md:pt-0 relative z-10">
                                {a.cert ? (
                                    <a
                                        href={a.cert}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass-button py-2! px-5! rounded-xl! text-[10px] tracking-[0.2em] uppercase font-black flex items-center gap-2 group/btn border-blue-500/20! hover:border-blue-500/50! hover:bg-blue-500/10 transition-all active:scale-95 border-solid border"
                                    >
                                        <ExternalLink size={14} className="text-blue-400" />
                                        View Certificate
                                    </a>
                                ) : (
                                    <div className="text-xs font-bold text-white/10 uppercase tracking-widest py-2 px-4 border border-dashed border-white/5 rounded-xl!">
                                        In Review
                                    </div>
                                )}
                            </div>

                            {/* Decorative Background Year */}
                            <div className="absolute top-1/2 -translate-y-1/2 right-12 text-8xl font-black text-white/2 pointer-events-none select-none group-hover:text-white/5 transition-colors hidden lg:block uppercase italic">
                                {a.year}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section id="contact" className="py-32 px-6">
                <div className="max-w-5xl mx-auto glass-card p-12 md:p-24 text-center relative overflow-hidden border-none shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to start a <br /> <span className="text-linear">project?</span></h2>
                        <p className="text-white/50 text-lg mb-12 max-w-md mx-auto">Let's collaborate on something extraordinary. Available for remote work and collaborations.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="mailto:hello@arroudhil.com" className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all border-none">
                                Get in Touch
                            </a>
                            <div className="flex gap-4">
                                <button className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white/10 transition-all border-white/5 border-none">
                                    <Github />
                                </button>
                                <a href="https://www.instagram.com/jingroo_" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white/10 transition-all border-white/5 border-none">
                                    <Instagram />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* CTA Background blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] pointer-events-none" />
                </div>
            </section>
        </main>
    );
}
