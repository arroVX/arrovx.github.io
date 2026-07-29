import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Toast from '../components/Toast';
import TerminalLoading from '../components/TerminalLoading';
import ImageZoomModal from '../components/ImageZoomModal';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import {
    ArrowLeft, ExternalLink, X, Image as ImageIcon,
    Search, Loader2, Github, Terminal, Layers,
    Link as LinkIcon, Star, CheckCircle2, Globe,
    FileText, Download, ChevronRight, ZoomIn
} from 'lucide-react';

const allProjects = [
    {
        title: "Liga Korupsi Indonesia",
        category: "Poster Design",
        image: "project-assets/images/0001_0.png",
        desc: "A bold social commentary poster detailing major corruption cases in Indonesia (2024-2025).",
        longDesc: "Program visual ini dirancang untuk mempermudah masyarakat dalam memahami skala kasus korupsi di Indonesia. Proyek ini menggabungkan jurnalisme data dengan desain poster investigatif untuk menonjolkan transparansi hukum.",
        tech: ["Photoshop", "Typography", "Data Journalism"],
        stats: { tech: "3", features: "5" },
        features: [
            "Visualisasi data kasus korupsi besar",
            "Tipografi bergaya investigatif",
            "Layout infografis yang padat informasi",
            "Palet warna peringatan (High Warning)",
            "Kompilasi data hukum 2024-2025"
        ],
        links: { live: "#", github: "#" }
    },
    {
        title: "Visual Flow 02",
        category: "Experimental",
        image: "project-assets/images/0001_0(1).png",
        desc: "An experimental exploration of depth and texture, part of the 'Visual Flow' series.",
        tech: ["Photoshop"]
    },
    {
        title: "Visual Flow 03",
        category: "Experimental",
        image: "project-assets/images/0001_0(1)_1.png",
        desc: "Continuing the abstract series with a focus on vibrant color contrasts and organic digital rendering.",
        tech: ["Photoshop"]
    },
    {
        title: "Visual Flow 04",
        category: "Experimental",
        image: "project-assets/images/0001_0(2).png",
        desc: "A darker, more atmospheric entry in the Visual Flow series, exploring negative space and mood.",
        tech: ["Photoshop"]
    },
    {
        title: "Modern Event Flyer",
        category: "Graphic Design",
        image: "project-assets/images/0002_40.png",
        desc: "A sleek, modern flyer designed for high-end events, emphasizing clean layout and readability.",
        tech: ["Illustrator"]
    },
    {
        title: "Abstract Composition",
        category: "Digital Art",
        image: "project-assets/images/0003_20.png",
        desc: "A fusion of geometric shapes and fluid gradients, creating a sense of 3D depth on a 2D canvas.",
        tech: ["Digital Art"]
    },
    {
        title: "Geometric Study 05",
        category: "Graphic Design",
        image: "project-assets/images/0005_20.png",
        desc: "Part of a minimalist series exploring the balance between bold shapes and subtle textures.",
        tech: ["Graphic Design"]
    },
    {
        title: "Branding Concept 01",
        category: "Branding",
        image: "project-assets/images/0006_20.png",
        desc: "Investigating modern brand marks through strict geometric construction and minimalist visual language.",
        tech: ["Branding"]
    },
    {
        title: "Cinematic Mood Poster",
        category: "Poster Design",
        image: "project-assets/images/0007_20.png",
        desc: "Capturing the essence of cinematic storytelling through dramatic lighting and photo manipulation techniques.",
        tech: ["Photo Manipulation"]
    },
    {
        title: "Moment Capture 01",
        category: "Photography",
        image: "project-assets/images/20250619_180706.png",
        desc: "Street photography focusing on the quiet, often overlooked moments of daily life in Indonesia.",
        tech: ["Photography"]
    },
    {
        title: "Mobile Interface Study",
        category: "UI Design",
        image: "project-assets/images/IMG_20251101_085224.png",
        desc: "A practical study on mobile user experience, focusing on high-contrast accessibility and modern glassmorphism UI.",
        tech: ["Figma"]
    },
].map(p => ({
    ...p,
    desc: p.desc || `An exploration in ${p.category.toLowerCase()} that pushes the boundaries of visual hierarchy and color theory.`,
    tech: p.tech || ["Graphic Design"]
}));

function ImageCard({ p, project, i = 0, onClick }) {
    const item = p || project || {};
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group cursor-pointer text-left"
            onClick={onClick}
        >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-3 relative glass-card p-2 border-white/5 group-hover:border-blue-500/40 transition-all shadow-xl">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
                            <Loader2 className="animate-spin text-white/20" size={24} />
                        </div>
                    )}
                    <img
                        src={item.image}
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        alt={item.title || 'Project'}
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
                            setIsLoaded(true);
                        }}
                    />
                </div>
                <div className="absolute inset-x-2 bottom-2 p-5 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl flex flex-col justify-end">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-1">{item.category || 'Portfolio'}</p>
                    <h3 className="text-sm font-bold text-white truncate mb-3">{item.title}</h3>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-300 bg-blue-500/20 px-3 py-1.5 rounded-xl border border-blue-500/30 w-fit backdrop-blur-md">
                        Lihat Detail Desain <ChevronRight size={13} />
                    </div>
                </div>
            </div>
            <div className="px-2">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{item.category || 'Design'}</span>
                <h3 className="text-sm font-bold text-white/90 truncate group-hover:text-blue-400 transition-colors">{item.title}</h3>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [firebaseProjects, setFirebaseProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firebaseError, setFirebaseError] = useState('');
    const [searchQuery, setSearchQuery] = useState("");
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    const handlePreview = (e, fileUrl, title) => {
        e.preventDefault();
        const win = window.open();
        if (win) {
            win.document.write(`
                <html>
                    <head>
                        <title>${title}</title>
                        <style>body{margin:0;overflow:hidden;}</style>
                    </head>
                    <body>
                        <iframe src="${fileUrl}" width="100%" height="100%" style="border:none;"></iframe>
                    </body>
                </html>
            `);
            win.document.close();
        }
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFirebaseProjects(list);
            setFirebaseError('');
            setLoading(false);
        }, (error) => {
            console.error("Firestore Projects Error:", error);
            setFirebaseError(error.message || 'Permission denied');
            setLoading(false);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    // Display projects from Firebase, or fallback to default allProjects if Firebase has no items yet
    const displayProjects = firebaseProjects.length > 0 ? firebaseProjects : allProjects;

    const categories = ["All", ...new Set(displayProjects.map(p => p.category))];
    const filteredProjects = selectedCategory === "All"
        ? displayProjects
        : displayProjects.filter(p => p.category === selectedCategory);

    return (
        <main className="relative z-10 pt-32 pb-20 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-left mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-4"
                    >
                        Portfolio Archive
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Visual <span className="text-linear">Archive.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-white/50 leading-relaxed"
                    >
                        Full collection featuring {displayProjects.length} my projecrs works.
                    </motion.p>
                </div>

                {/* Category Filter */}
                {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border-none cursor-pointer ${selectedCategory === cat
                                    ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Loading State */}
            {loading && (
                <TerminalLoading message="Memuat proyek dari database Firebase..." />
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {filteredProjects.map((project, idx) => (
                    <motion.div
                        key={project.id || project.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="glass-card overflow-hidden group border-white/5 cursor-pointer relative"
                        onClick={() => setSelectedProject(project)}
                    >
                        <ImageCard project={project} />
                    </motion.div>
                ))}
            </div>

            {/* Project Modal: Poster Style Detail View */}
            {selectedProject && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-6 text-left overflow-hidden"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 40, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full h-full md:h-[90vh] md:max-w-7xl md:rounded-[40px] overflow-y-auto bg-[#070a14] border border-white/10 opacity-100 shadow-[0_0_100px_rgba(0,0,0,0.9)] relative custom-scrollbar flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Sticky Top Header Bar */}
                            <div className="sticky top-0 z-40 bg-[#070a14]/95 backdrop-blur-md px-6 md:px-12 py-4 border-b border-white/10 flex items-center justify-between shadow-lg">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl text-xs font-bold text-white transition-all border border-white/10 cursor-pointer shadow-md"
                                    >
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 truncate max-w-[180px] sm:max-w-xs">
                                        <span>Projects</span>
                                        <div className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
                                        <span className="text-blue-400 truncate">{selectedProject.title}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer shrink-0"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 md:p-12 lg:p-16 flex-1">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                                    {/* Left Content Column */}
                                    <div className="lg:col-span-7 space-y-12">
                                        <div>
                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4"
                                            >
                                                {selectedProject.title}
                                            </motion.h2>
                                            <div className="w-24 h-1.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full mb-8 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                                            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                                                {selectedProject.longDesc || selectedProject.desc}
                                            </p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="glass-card p-6 bg-white/2 border-white/5 group hover:bg-white/5 transition-all text-left">
                                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                                                    <Terminal size={20} />
                                                </div>
                                                <h4 className="text-2xl font-black text-white mb-1">
                                                    {(Array.isArray(selectedProject.tech) ? selectedProject.tech.length : (typeof selectedProject.tech === 'string' ? selectedProject.tech.split(',').length : 0))}
                                                </h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Teknologi</p>
                                            </div>
                                            <div className="glass-card p-6 bg-white/2 border-white/5 group hover:bg-white/5 transition-all text-left">
                                                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                                                    <Layers size={20} />
                                                </div>
                                                <h4 className="text-sm md:text-base font-black text-white mb-1 truncate">
                                                    {selectedProject.category || 'General'}
                                                </h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Kategori Proyek</p>
                                            </div>
                                        </div>

                                        {/* Primary Buttons — conditionally render only if valid URLs exist */}
                                        {(((selectedProject.liveUrl && selectedProject.liveUrl !== '#') || (selectedProject.links?.live && selectedProject.links?.live !== '#')) ||
                                          ((selectedProject.githubUrl && selectedProject.githubUrl !== '#') || (selectedProject.links?.github && selectedProject.links?.github !== '#'))) && (
                                            <div className="flex flex-wrap gap-4">
                                                {((selectedProject.liveUrl && selectedProject.liveUrl !== '#') || (selectedProject.links?.live && selectedProject.links?.live !== '#')) && (
                                                    <a
                                                        href={selectedProject.liveUrl || selectedProject.links?.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] group"
                                                    >
                                                        <Globe size={18} className="group-hover:rotate-12 transition-transform" /> Live Demo
                                                    </a>
                                                )}
                                                {((selectedProject.githubUrl && selectedProject.githubUrl !== '#') || (selectedProject.links?.github && selectedProject.links?.github !== '#')) && (
                                                    <a
                                                        href={selectedProject.githubUrl || selectedProject.links?.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-xs tracking-widest uppercase transition-all border border-white/10"
                                                    >
                                                        <Github size={18} /> Github
                                                    </a>
                                                )}
                                            </div>
                                        )}

                                        {/* File Attachment / PDF Download */}
                                        {selectedProject.fileUrl && (
                                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2 text-left">
                                                <div className="flex items-center gap-3">
                                                    <FileText size={20} className="text-emerald-400 shrink-0" />
                                                    <div>
                                                        <div className="text-xs font-bold text-white">Lampiran Dokumen / PDF</div>
                                                        <div className="text-[10px] font-mono text-white/50 break-all">{selectedProject.fileName || 'Download File'}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <button
                                                        onClick={(e) => handlePreview(e, selectedProject.fileUrl, selectedProject.fileName || selectedProject.title)}
                                                        className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all border-none cursor-pointer"
                                                    >
                                                        Buka
                                                    </button>
                                                    <a
                                                        href={selectedProject.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download={selectedProject.fileName || 'Lampiran'}
                                                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 border-none"
                                                    >
                                                        <Download size={14} /> Download
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tech Stack List */}
                                        <div className="space-y-4 text-left">
                                            <div className="flex items-center gap-2 text-white/40">
                                                <Terminal size={14} className="text-blue-500" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Technologies Used</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {(Array.isArray(selectedProject.tech) ? selectedProject.tech : (typeof selectedProject.tech === 'string' ? selectedProject.tech.split(',') : [])).map(t => (
                                                    <div key={t} className="px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-xl text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:bg-blue-500/10 transition-colors">
                                                        # {typeof t === 'string' ? t.trim() : t}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Visual/Mockup Column */}
                                    <div className="lg:col-span-5 space-y-8">
                                        <div className="relative group cursor-zoom-in" onClick={() => setIsImageZoomed(true)}>
                                            {/* Decorative Background for Mockup */}
                                            <div className="absolute -inset-4 bg-blue-500/15 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="relative aspect-[3/4] min-h-[450px] max-h-[650px] w-full rounded-[36px] overflow-hidden bg-[#070913] border border-blue-500/20 p-2 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                                                <div className="w-full h-full rounded-[28px] overflow-hidden bg-black flex items-center justify-center relative">
                                                    <img
                                                        src={selectedProject.image}
                                                        alt={selectedProject.title}
                                                        className="w-full h-full object-contain opacity-95 transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                                                        <span className="bg-blue-600/90 text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-blue-500/30 border border-blue-400/40 flex items-center gap-2">
                                                            <ZoomIn size={16} /> Perbesar Fullscreen
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Interactive Fullscreen Image Zoom Lightbox */}
                        {isImageZoomed && selectedProject && (
                            <ImageZoomModal
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                onClose={() => setIsImageZoomed(false)}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </main>
    );
}
