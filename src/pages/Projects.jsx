import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, ExternalLink, X, Image as ImageIcon,
    Search, Loader2, Github, Terminal, Layers,
    Link as LinkIcon, Star, CheckCircle2, Globe
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
        title: "Aritmatika Solver",
        category: "Programming",
        image: "https://eki.my.id/storage/project/image/AritmatikaSolver-1707211111.png", // Using a fallback or user might update
        desc: "Program dirancang untuk mempermudah pengguna menyelesaikan soal Aritmatika otomatis.",
        longDesc: "Program ini dirancang untuk mempermudah pengguna dalam menyelesaikan soal-soal Aritmatika secara otomatis dengan menggunakan bahasa pemrograman Python. Tujuan utama dari program ini adalah untuk membantu pengguna, terutama pelajar, dalam menyelesaikan soal-soal Aritmatika dengan lebih cepat dan mudah.",
        tech: ["Python", "CLI", "Math API"],
        stats: { tech: "3", features: "4" },
        features: [
            "Menghitung suku tertentu dari barisan aritmatika dengan menggunakan rumus suku ke-n.",
            "Menentukan suku pertama atau beda jika hanya dua suku diketahui dalam barisan aritmatika.",
            "Menghitung jumlah n suku pertama dari deret aritmatika dengan langkah perhitungan yang jelas."
        ],
        links: { live: "https://replit.com/@arroudhilanfi/Aritmatika-Solver", github: "https://github.com/arroVX/aritmatika-solver" }
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
                            Full collection featuring {allProjects.length} design works. From technical networking diagrams to experimental posters.
                        </motion.p>
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

            {/* Project Modal: Poster Style Detail View */}
            <AnimatePresence>
                {selectedProject && createPortal(
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-1000000 flex items-center justify-center backdrop-blur-3xl bg-[#030303]/95"
                        onClick={() => setSelectedProject(null)}
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
                                onClick={() => setSelectedProject(null)}
                                className="md:hidden fixed top-6 right-6 z-50 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border-none"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-16 lg:p-20">
                                {/* Navigation Header */}
                                <div className="flex items-center gap-4 mb-12">
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white/50 hover:text-white transition-all border-none"
                                    >
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20">
                                        <span>Projects</span>
                                        <div className="w-1 h-1 bg-white/20 rounded-full" />
                                        <span className="text-blue-500">{selectedProject.title}</span>
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
                                                {selectedProject.title}
                                            </motion.h2>
                                            <div className="w-24 h-1.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full mb-8 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
                                            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                                                {selectedProject.longDesc || selectedProject.desc}
                                            </p>
                                        </div>

                                        {/* Stats Grid */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="glass-card p-6 bg-white/2 border-white/5 group hover:bg-white/5 transition-all">
                                                <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                                                    <Terminal size={20} />
                                                </div>
                                                <h4 className="text-2xl font-black text-white mb-1">{selectedProject.stats?.tech || selectedProject.tech.length}</h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Total Teknologi</p>
                                            </div>
                                            <div className="glass-card p-6 bg-white/2 border-white/5 group hover:bg-white/5 transition-all">
                                                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
                                                    <Layers size={20} />
                                                </div>
                                                <h4 className="text-2xl font-black text-white mb-1">{selectedProject.stats?.features || (selectedProject.features?.length || "0")}</h4>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Fitur Utama</p>
                                            </div>
                                        </div>

                                        {/* Primary Buttons */}
                                        <div className="flex flex-wrap gap-4">
                                            <a
                                                href={selectedProject.links?.live || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs tracking-widest uppercase transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] group"
                                            >
                                                <Globe size={18} className="group-hover:rotate-12 transition-transform" /> Live Demo
                                            </a>
                                            <a
                                                href={selectedProject.links?.github || "#"}
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
                                                {selectedProject.tech.map(t => (
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
                                            {/* Decorative Background for Mockup */}
                                            <div className="absolute -inset-4 bg-blue-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="relative aspect-4/3 w-full rounded-[40px] overflow-hidden bg-zinc-900 border border-white/10 p-4 shadow-2xl">
                                                <div className="w-full h-full rounded-[30px] overflow-hidden bg-black flex items-center justify-center">
                                                    <img
                                                        src={selectedProject.image}
                                                        alt={selectedProject.title}
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
                                                {(selectedProject.features || [
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
                )}
            </AnimatePresence>
        </main>
    );
}
