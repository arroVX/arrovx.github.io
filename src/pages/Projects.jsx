import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X, Image as ImageIcon, Search, Loader2 } from 'lucide-react';

const allProjects = [
    {
        title: "Liga Korupsi Indonesia",
        category: "Poster Design",
        image: "project-assets/images/0001_0.png",
        desc: "A bold social commentary poster detailing major corruption cases in Indonesia (2024-2025). Designed with an investigative 'warning' aesthetic to highlight legal transparency.",
        tech: ["Photoshop", "Typography"]
    },
    {
        title: "Visual Flow 02",
        category: "Experimental",
        image: "project-assets/images/0001_0(1).png",
        desc: "An experimental exploration of depth and texture, part of the 'Visual Flow' series focusing on abstract digital art.",
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

function ImageCard({ p, i, onClick }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group cursor-pointer"
            onClick={onClick}
        >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative glass-card p-2 border-white/5">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
                            <Loader2 className="animate-spin text-white/20" size={24} />
                        </div>
                    )}
                    <img
                        src={p.image}
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        alt={p.title}
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
                            setIsLoaded(true);
                        }}
                    />
                </div>
                <div className="absolute inset-x-2 bottom-2 p-6 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-b-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-1">{p.category}</p>
                    <h3 className="text-sm font-bold text-white truncate">{p.title}</h3>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);

    const categories = ["All", ...new Set(allProjects.map(p => p.category))];
    const filteredProjects = selectedCategory === "All"
        ? allProjects
        : allProjects.filter(p => p.category === selectedCategory);

    return (
        <main className="relative z-10 pt-32 pb-20 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group">
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                        >
                            Visual <span className="text-linear">Archive.</span>
                        </motion.h1>
                        <p className="text-lg text-white/50 leading-relaxed">
                            Full collection featuring {allProjects.length} design works. From technical networking diagrams to experimental posters.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border-none ${selectedCategory === cat
                                    ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p, i) => (
                            <ImageCard
                                key={p.image}
                                p={p}
                                i={i}
                                onClick={() => setSelectedProject(p)}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="py-40 text-center">
                        <ImageIcon size={48} className="mx-auto text-white/10 mb-6" />
                        <h3 className="text-2xl font-bold text-white/20">No projects found in this category.</h3>
                    </div>
                )}
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 backdrop-blur-xl bg-black/90"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh] border-white/10"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative flex-1 overflow-hidden min-h-[300px] bg-zinc-950">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-contain bg-zinc-950"
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all border-none"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6 md:p-8 bg-zinc-900 border-t border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 py-1 px-3 bg-blue-500/10 rounded-lg mb-4 inline-block">{selectedProject.category}</span>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tighter">{selectedProject.title}</h3>
                                <p className="text-white/50 text-sm mb-6 leading-relaxed italic border-l-2 border-white/10 pl-4">
                                    {selectedProject.desc}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 bg-white/5 rounded-lg border border-white/5">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
