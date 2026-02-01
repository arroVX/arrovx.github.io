import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Code, Guitar, Camera, Video, Edit,
    Award, Trophy, Mail, Github, Instagram,
    ChevronRight, Menu, X, Terminal, Cpu,
    Globe, Database, Layers, PlayCircle, ExternalLink,
    Sparkles, Zap, Monitor, Smartphone, Music, Disc, ArrowUpRight,
    Volume2, BarChart3, Star, ArrowLeft
} from 'lucide-react';
import { useScrambleText, useTilt, useMagnetic } from '../utils/animations';

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
        title: "Liga Korupsi Indonesia",
        category: "Poster Design",
        image: "project-assets/images/0001_0.png",
        desc: "A bold social commentary poster detailing major corruption cases in Indonesia.",
        longDesc: "Program visual ini dirancang untuk mempermudah masyarakat dalam memahami skala kasus korupsi di Indonesia melalui desain poster investigatif yang futuristik.",
        tech: ["Photoshop", "Typography", "Infographics"],
        stats: { tech: "3", features: "5" },
        features: [
            "Visualisasi data korupsi nasional 2024-2025",
            "Tipografi bergaya investigatif",
            "Informasi hukum yang terintegrasi visual",
            "Desain High-Impact untuk kesadaran sosial"
        ],
        links: { live: "#", github: "#" }
    },
    {
        title: "React Glass Portfolio",
        category: "Web Dev",
        image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=800",
        desc: "A futuristic portfolio design featuring high-end glassmorphism and fluid animations.",
        longDesc: "Proyek pengembangan portofolio modern menggunakan React dan Framer Motion. Fokus pada performa tinggi dan estetika premium dengan efek transparansi tingkat lanjut.",
        tech: ["React", "Framer Motion", "Tailwind CSS"],
        stats: { tech: "3", features: "6" },
        features: [
            "Animasi transisi halaman yang smooth",
            "Komponen kustom glassmorphism",
            "Responsivitas total di semua perangkat",
            "Navigasi dinamis dan command center"
        ],
        links: { live: "#", github: "#" }
    }
];

const gear = [
    { name: "Production Rig", detail: "Ryzen 9 · 64GB RAM · RTX 4070", icon: <Cpu className="text-blue-400" /> },
    { name: "Camera Kit", detail: "Sony Alpha Series · Prime Lenses", icon: <Camera className="text-purple-400" /> },
    { name: "Sound Station", detail: "Custom Electric · Ibanez Acoustic", icon: <Guitar className="text-orange-400" /> },
    { name: "Network Lab", detail: "Cisco Catalyst · EdgeRouter", icon: <Globe className="text-emerald-400" /> }
];

function MusicModal({ onClose }) {
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000001 flex items-center justify-center p-6 backdrop-blur-3xl bg-black/90"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 40 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 40 }}
                className="glass-card max-w-4xl w-full flex flex-col md:flex-row border-white/10 overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.2)]"
                onClick={e => e.stopPropagation()}
            >
                {/* Visual Side */}
                <div className="hidden md:flex flex-1 bg-linear-to-br from-blue-600/20 to-indigo-900/40 p-12 flex-col items-center justify-center relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 rounded-full border-4 border-white/5 p-4 flex items-center justify-center relative z-10"
                    >
                        <div className="w-full h-full rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                            <Disc className="text-white w-32 h-32 opacity-20" />
                        </div>
                    </motion.div>
                </div>

                {/* Info Side */}
                <div className="p-6 md:p-12 md:max-w-md flex flex-col justify-center bg-[#0a0a0a] md:border-l border-white/5">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500">
                            <Music size={32} className="animate-pulse" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-1">Now Playing</p>
                            <h3 className="text-xl font-bold tracking-tight text-white">Autumn</h3>
                        </div>
                    </div>

                    <p className="text-white/40 text-sm leading-relaxed mb-8 italic">
                        "Autumn" by <span className="text-white">Murphy Radio</span>. A beautiful math-rock piece that inspires my creative coding sessions.
                    </p>

                    <div className="flex items-end gap-1 h-12 mb-8 px-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [10, 40, 15, 35, 20][i % 5] }}
                                transition={{ repeat: Infinity, duration: 0.6 + (i * 0.1), ease: "easeInOut" }}
                                className="flex-1 bg-blue-500/40 rounded-full"
                            />
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-10">
                        <span className="text-[9px] font-bold uppercase tracking-widest py-2 px-4 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                            <Volume2 size={12} className="text-blue-500" /> Math Rock
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest py-2 px-4 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                            <BarChart3 size={12} className="text-blue-500" /> Instrumental
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-white text-black rounded-2xl font-black tracking-widest uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all border-none"
                    >
                        Minimize Player
                    </button>
                </div>
            </motion.div>
        </motion.div>,
        document.body
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

const ScrambleTitle = ({ text, className, delay = 0 }) => {
    const scrambled = useScrambleText(text, delay);
    return <span className={className}>{scrambled}</span>;
};

const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const { style, onMouseMove, onMouseLeave } = useTilt(ref);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    return (
        <div
            ref={ref}
            style={isTouch ? {} : style}
            onMouseMove={isTouch ? null : onMouseMove}
            onMouseLeave={isTouch ? null : onMouseLeave}
            className={className}
        >
            {children}
        </div>
    );
};

const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const { style, onMouseMove, onMouseLeave } = useMagnetic(ref);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    return (
        <div
            ref={ref}
            style={isTouch ? {} : style}
            onMouseMove={isTouch ? null : onMouseMove}
            onMouseLeave={isTouch ? null : onMouseLeave}
            className="inline-block"
        >
            {React.cloneElement(children, { className: `${children.props.className} ${className}` })}
        </div>
    );
};

function ProjectModal({ project, onClose }) {
    if (!project) return null;
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000000 flex items-center justify-center backdrop-blur-3xl bg-[#030303]/95"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full h-full md:h-[90vh] md:max-w-7xl md:rounded-[40px] overflow-y-auto bg-[#080808] border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative custom-scrollbar"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border-none"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-16 lg:p-20">
                    {/* Navigation Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white/50 hover:text-white transition-all border-none"
                        >
                            <ArrowLeft size={16} /> Kembali
                        </button>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20">
                            <span>Karya</span>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <span className="text-blue-500">{project.title}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Left Content Column */}
                        <div className="lg:col-span-7 space-y-12">
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4"
                                >
                                    {project.title}
                                </motion.h2>
                                <div className="w-24 h-1.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full mb-8 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                                    {project.longDesc || project.desc}
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass-card p-6 bg-white/2 border-white/5 group hover:bg-white/5 transition-all">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                                        <Terminal size={20} />
                                    </div>
                                    <h4 className="text-2xl font-black text-white mb-1">{project.stats?.tech || project.tech.length}</h4>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Teknologi</p>
                                </div>
                                <div className="glass-card p-6 bg-white/2 border-white/5 group hover:bg-white/5 transition-all">
                                    <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                                        <Layers size={20} />
                                    </div>
                                    <h4 className="text-2xl font-black text-white mb-1">{project.stats?.features || (project.features?.length || "0")}</h4>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Fitur Utama</p>
                                </div>
                            </div>

                            {/* Primary Buttons */}
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={project.links?.live || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] group"
                                >
                                    <Globe size={18} className="group-hover:rotate-12 transition-transform" /> Live Demo
                                </a>
                                <a
                                    href={project.links?.github || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs tracking-widest uppercase transition-all border border-white/10"
                                >
                                    <Github size={18} /> Github
                                </a>
                            </div>

                            {/* Tech Stack List */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-white/40">
                                    <Terminal size={14} className="text-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Technologies Used</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map(t => (
                                        <div key={t} className="px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:bg-blue-500/10 transition-colors">
                                            # {t}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Visual/Mockup Column */}
                        <div className="lg:col-span-5 space-y-8">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-blue-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative aspect-4/3 w-full rounded-[40px] overflow-hidden bg-zinc-900 border border-white/10 p-4 shadow-2xl">
                                    <div className="w-full h-full rounded-[30px] overflow-hidden bg-black flex items-center justify-center">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Key Features Card */}
                            <div className="glass-card p-8 md:p-10 bg-white/2 border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Star size={80} className="text-blue-500" />
                                </div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                                        <Star size={18} fill="currentColor" />
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight text-white">Key Features</h3>
                                </div>
                                <div className="space-y-5">
                                    {(project.features || [
                                        "Interactive UI components with smooth animations",
                                        "Fully responsive design for all device sizes",
                                        "Optimized performance and SEO practices",
                                        "Integrated dynamic data management"
                                    ]).map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-4 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 mt-2 group-hover:scale-150 group-hover:bg-blue-500 transition-all" />
                                            <p className="text-sm md:text-base text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

export default function Home() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [showMusicModal, setShowMusicModal] = useState(false);

    return (
        <main className="relative z-10">
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

                    <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold mb-6 md:mb-8 leading-[0.9] tracking-tighter italic">
                        <ScrambleTitle text="Bridging" className="text-white" /> <span className="text-blue-500">Tech</span> <br />
                        <ScrambleTitle text="& Design Arts" className="text-linear" delay={500} />
                    </h1>

                    <p className="max-w-2xl mx-auto text-base md:text-xl text-white/50 mb-10 md:mb-12 leading-relaxed px-4">
                        Based in Indonesia, <span className="text-white font-bold">Arro</span> is a SMKN 3 Jepara student specializing in TKJ, crafting digital experiences through code, <span className="text-white font-bold text-blue-400">graphic design</span>, and cinematic visuals.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                        <MagneticButton>
                            <Link to="/projects" className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] border-none text-center">
                                Explore Work
                            </Link>
                        </MagneticButton>
                        <MagneticButton>
                            <Link to="/about" className="w-full sm:w-auto glass-button border-white/10 group flex items-center justify-center gap-2 border-none">
                                About Me <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </MagneticButton>
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
                <div id="services" className="mt-24 w-full max-w-5xl scroll-mt-32">
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
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div>
                        <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">My Expertise</p>
                        <h2 className="text-5xl font-bold tracking-tighter">Crafting in multi <br /> <span className="text-white/40">dimensions.</span></h2>
                    </div>
                    <p className="max-w-sm text-white/50 text-sm leading-relaxed">
                        From configuring robust network infrastructures to composing cinematic melodies, my work is a blend of logic and soul.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
                    {/* TKJ Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -5 }}
                        className="md:col-span-8 h-full"
                    >
                        <TiltCard className="h-full glass-card glass-card-hover p-10 flex flex-col justify-between overflow-hidden relative group border-white/5">
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 font-bold">01</div>
                                <h3 className="text-3xl font-bold mb-4 tracking-tighter">Network Engineering</h3>
                                <p className="text-white/50 max-w-md">Specializing in TKJ (Network & Computer Engineering). Expert in building secure, scalable infrastructures and server management.</p>
                            </div>
                            <div className="mt-8 flex flex-wrap gap-2 relative z-10">
                                <TechStack icon={<Globe size={16} />} name="Routing & Switching" />
                                <TechStack icon={<Database size={16} />} name="Server Management" />
                                <TechStack icon={<Terminal size={16} />} name="Linux System" />
                            </div>
                            <Monitor className="absolute -bottom-10 -right-10 w-64 h-64 text-white/2 group-hover:text-blue-500/10 transition-colors duration-700" />
                        </TiltCard>
                    </motion.div>

                    {/* Creative Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="md:col-span-4 h-full"
                    >
                        <TiltCard className="h-full glass-card glass-card-hover p-10 flex flex-col justify-between bg-linear-to-br from-indigo-500/10 to-transparent border-white/5">
                            <div>
                                <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 font-bold">02</div>
                                <h3 className="text-3xl font-bold mb-4 font-['Outfit'] tracking-tighter">Creative Media</h3>
                                <p className="text-white/50">Photography & Videography with professional-grade editing.</p>
                            </div>
                            <div className="space-y-4 mt-8">
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-500/20 transition-colors">
                                        <PlayCircle className="text-indigo-400" size={20} />
                                    </div>
                                    <span className="font-bold">Adobe Premiere</span>
                                </div>
                                <div className="flex items-center gap-4 group/item">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-500/20 transition-colors">
                                        <Camera className="text-indigo-400" size={20} />
                                    </div>
                                    <span className="font-bold">Color Grading</span>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Guitar Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        whileHover={{ y: -5 }}
                        className="md:col-span-4 h-full"
                    >
                        <TiltCard className="h-full glass-card glass-card-hover p-10 flex flex-col justify-center items-center text-center relative overflow-hidden border-white/5">
                            <Guitar className="w-16 h-16 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold tracking-tighter">Composer & Guitarist</h3>
                            <p className="text-sm text-white/40 mt-2 italic">"Expressing emotions through six strings."</p>
                            <div className="absolute inset-0 bg-linear-to-t from-orange-500/5 to-transparent pointer-events-none" />
                        </TiltCard>
                    </motion.div>

                    {/* Code Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -5 }}
                        className="md:col-span-8 h-full"
                    >
                        <TiltCard className="h-full glass-card glass-card-hover p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border-white/5">
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-4 tracking-tighter">Programming Mastery</h3>
                                <div className="flex gap-4 mb-4">
                                    <TechStack icon={<Code size={16} />} name="React" />
                                    <TechStack icon={<Cpu size={16} />} name="C++ (Competitive)" />
                                </div>
                                <p className="text-white/50 text-sm">Two-time Gold medalist in Informatics. Bringing algorithmic efficiency to modern UI development.</p>
                            </div>
                            <div className="flex-none p-6 bg-black/40 rounded-3xl border border-white/5 font-mono text-xs text-blue-400 shadow-inner">
                                <pre><code>{`function inspire() {
  const code = 'Passion';
  const art = 'Vision';
  return code + art;
}`}</code></pre>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </section>



            {/* Projects Section */}
            <section id="work" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
                >
                    <div>
                        <p className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4">Portofolio</p>
                        <h2 className="text-5xl font-bold tracking-tighter">Selected <span className="text-white/40">Work.</span></h2>
                    </div>
                    <Link to="/projects" className="group flex items-center gap-2 text-white/50 hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                        View Archive <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={p.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(p)}
                        >
                            <div className="aspect-video rounded-3xl overflow-hidden mb-6 relative glass-card p-2 border-white/5">
                                <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={p.title} />
                                    <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">{p.category}</p>
                                        <h3 className="text-xl font-bold text-white truncate">{p.title}</h3>
                                    </div>
                                    <div className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Gear Section */}
            <section className="py-24 px-6 bg-[#050505]">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-4">Behind the scenes</p>
                        <h2 className="text-5xl font-bold tracking-tighter">My Desktop Hub</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gear.map((g, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
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
                            <Link to="/contact" className="bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all border-none text-center">
                                Get in Touch
                            </Link>
                            <div className="mt-12 md:hidden">
                                <Link to="/projects" className="w-full py-5 glass-card flex items-center justify-center gap-3 font-bold border-none">
                                    View Archive <ArrowUpRight size={18} />
                                </Link>
                            </div>
                            <div className="flex gap-4">
                                <a href="https://github.com/arroVX" target="_blank" rel="noopener noreferrer" className="w-14 h-14 glass-card flex items-center justify-center hover:bg-white/10 transition-all border-white/5 border-none">
                                    <Github />
                                </a>
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

            {/* Terminal/Command Promo */}
            <section className="pb-32 px-6">
                <div className="max-w-5xl mx-auto flex flex-col items-center">
                    <div className="w-px h-24 bg-linear-to-b from-transparent via-white/10 to-transparent mb-12" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6">Power User Shortcut</p>
                        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white/40">
                            Want a faster way to <span className="text-white">navigate?</span>
                        </h3>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-2xl border border-white/5 text-white/60">
                                <kbd className="px-2 py-1 bg-white/10 rounded-lg text-white font-mono text-sm leading-none">CTRL</kbd>
                                <span className="text-xs font-bold">+</span>
                                <kbd className="px-2 py-1 bg-white/10 rounded-lg text-white font-mono text-sm leading-none">K</kbd>
                            </div>
                            <span className="text-white/10 font-bold uppercase tracking-widest text-xs">or</span>
                            <button
                                onClick={() => {
                                    // Triggering custom event for App.jsx to listen
                                    window.dispatchEvent(new CustomEvent('open-command-center'));
                                }}
                                className="flex items-center gap-3 px-8 py-4 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-2xl font-bold text-xs tracking-widest uppercase transition-all border border-blue-500/20 group border-none"
                            >
                                <Terminal size={18} className="group-hover:rotate-12 transition-transform" /> Open Command Center
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Modals moved to bottom for better stacking context */}
            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
                {showMusicModal && (
                    <div className="fixed inset-0 z-99999">
                        <MusicModal onClose={() => setShowMusicModal(false)} />
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
