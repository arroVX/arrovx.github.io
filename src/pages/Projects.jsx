import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, X, Image as ImageIcon, Search } from 'lucide-react';

const allProjects = [
    {
        title: "Experimental Poster 01",
        category: "Graphic Design",
        image: "project-assets/images/0001_0.png",
        desc: "A bold experimental layout exploring typography and negative space.",
        tech: ["Photoshop", "Typography"]
    },
    {
        title: "Modern Event Flyer",
        category: "Graphic Design",
        image: "project-assets/images/0002_40.png",
        desc: "Clean and vibrant event promotion material designed for maximum impact.",
        tech: ["Illustrator", "Layout Design"]
    },
    {
        title: "Digital Art Composition",
        category: "Digital Art",
        image: "project-assets/images/0003_20.png",
        desc: "A fusion of organic textures and sharp digital elements.",
        tech: ["Photoshop", "Digital Painting"]
    },
    {
        title: "Concept Poster 05",
        category: "Poster Design",
        image: "project-assets/images/0005_20.png",
        desc: "Minimalist concept poster focusing on color harmony and symbolic imagery.",
        tech: ["Graphic Design", "Minimalism"]
    },
    {
        title: "Visual Identity Study",
        category: "Branding",
        image: "project-assets/images/0006_20.png",
        desc: "Exploring brand marks and visual language through geometric construction.",
        tech: ["Branding", "Vector"]
    },
    {
        title: "Cinematic Scene Poster",
        category: "Graphic Design",
        image: "project-assets/images/0007_20.png",
        desc: "Capturing the mood of a film through dramatic lighting and composition.",
        tech: ["Photo Manipulation"]
    },
    {
        title: "Abstract Flow",
        category: "Design",
        image: "project-assets/images/0009_20.png",
        desc: "Dynamic abstract shapes creating a sense of movement and energy.",
        tech: ["Abstract", "Art"]
    },
    {
        title: "Poster Design - Alpha",
        category: "Design",
        image: "project-assets/images/New Project 11 [ABF5BDB].png",
        desc: "Part of a personal series focused on futuristic aesthetics.",
        tech: ["Future", "Design"]
    }
];

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
                            A curated exhibition of my graphic design works, posters, and visual experiments. Every piece is a journey through color, space, and emotion.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((p, i) => (
                            <motion.div
                                layout
                                key={p.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProject(p)}
                            >
                                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-6 relative glass-card p-2">
                                    <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                                        <img
                                            src={p.image}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            alt={p.title}
                                            onError={(e) => {
                                                e.target.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
                                            }}
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-sm p-6 text-center">
                                        <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <Search size={20} />
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2">{p.category}</p>
                                        <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
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

            {/* Project Modal (Reuse Logic) */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-xl bg-black/80"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-card max-w-lg w-full overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="aspect-[3/4] relative">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=800";
                                    }}
                                />
                                <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all border-none">
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="p-8">
                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 py-1 px-3 bg-blue-500/10 rounded-lg mb-4 inline-block">{selectedProject.category}</span>
                                <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
                                <p className="text-white/50 mb-8 leading-relaxed italic border-l-2 border-white/10 pl-6">
                                    {selectedProject.desc}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProject.tech.map(t => (
                                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 bg-white/5 rounded-lg border border-white/5">{t}</span>
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
