import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, X, Github, Globe, FileText, Download, Layers, Terminal, ChevronRight, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import SwiperGallery from '../components/SwiperGallery';

const allProjects = [
    {
        title: "Liga Korupsi Indonesia",
        category: "Poster Design",
        image: "project-assets/images/0001_0.png",
        desc: "A bold social commentary poster detailing major corruption cases in Indonesia (2024-2025).",
        longDesc: "Program visual ini dirancang untuk mempermudah masyarakat dalam memahami skala kasus korupsi di Indonesia. Menggabungkan jurnalisme data dengan desain poster investigatif.",
        tech: ["Photoshop", "Typography", "Data Journalism"],
        features: ["Visualisasi data kasus korupsi", "Tipografi investigatif", "Layout infografis padat"],
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
        desc: "Continuing the abstract series with a focus on vibrant color contrasts.",
        tech: ["Photoshop"]
    },
    {
        title: "Visual Flow 04",
        category: "Experimental",
        image: "project-assets/images/0001_0(2).png",
        desc: "A darker, more atmospheric entry in the Visual Flow series.",
        tech: ["Photoshop"]
    },
    {
        title: "Modern Event Flyer",
        category: "Graphic Design",
        image: "project-assets/images/0002_40.png",
        desc: "A sleek, modern flyer designed for high-end events.",
        tech: ["Illustrator"]
    },
    {
        title: "Abstract Composition",
        category: "Digital Art",
        image: "project-assets/images/0003_20.png",
        desc: "A fusion of geometric shapes and fluid gradients.",
        tech: ["Digital Art"]
    },
    {
        title: "Geometric Study 05",
        category: "Graphic Design",
        image: "project-assets/images/0005_20.png",
        desc: "Part of a minimalist series exploring bold shapes.",
        tech: ["Graphic Design"]
    },
    {
        title: "Branding Concept 01",
        category: "Branding",
        image: "project-assets/images/0006_20.png",
        desc: "Investigating modern brand marks through geometric construction.",
        tech: ["Branding"]
    },
    {
        title: "Cinematic Mood Poster",
        category: "Poster Design",
        image: "project-assets/images/0007_20.png",
        desc: "Capturing the essence of cinematic storytelling.",
        tech: ["Photo Manipulation"]
    },
    {
        title: "Moment Capture 01",
        category: "Photography",
        image: "project-assets/images/20250619_180706.png",
        desc: "Street photography focusing on quiet moments.",
        tech: ["Photography"]
    },
    {
        title: "Mobile Interface Study",
        category: "UI Design",
        image: "project-assets/images/IMG_20251101_085224.png",
        desc: "A practical study on mobile user experience.",
        tech: ["Figma"]
    },
].map(p => ({
    ...p,
    desc: p.desc || `An exploration in ${p.category.toLowerCase()}.`,
    tech: p.tech || ["Graphic Design"]
}));

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const techs = Array.isArray(project.tech) ? project.tech : (typeof project.tech === 'string' ? project.tech.split(',').map(s => s.trim()) : []);
  return createPortal(
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 md:p-6 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.98, y: 12, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.98, y: 12, opacity: 0 }} className="w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl border border-black/10 shadow-2xl overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-black/5 flex items-center justify-between bg-white/80 backdrop-blur sticky top-0">
          <div className="flex items-center gap-3 mono text-xs tracking-widest uppercase text-black/40">
            <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium">
              <ArrowLeft size={14} /> Back
            </button>
            <span className="hidden md:inline">Projects</span>
            <span className="w-1 h-1 bg-black/20 rounded-full hidden md:inline" />
            <span className="text-black truncate max-w-[160px]">{project.title}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><X size={16} /></button>
        </div>
        <div className="overflow-y-auto p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="mono text-xs tracking-widest uppercase text-black/40">{project.category}</p>
                <h2 className="headline-serif text-4xl mt-2">{project.title}</h2>
                <p className="text-black/60 leading-relaxed mt-3">{project.longDesc || project.desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-black/5 p-4 bg-zinc-50">
                  <Layers size={18} className="text-black/40 mb-2" />
                  <div className="text-xl font-bold">{techs.length}</div>
                  <div className="mono text-xs tracking-widest uppercase text-black/40">Technologies</div>
                </div>
                <div className="rounded-2xl border border-black/5 p-4 bg-zinc-50">
                  <Terminal size={18} className="text-black/40 mb-2" />
                  <div className="text-sm font-bold truncate">{project.category}</div>
                  <div className="mono text-xs tracking-widest uppercase text-black/40">Category</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techs.map(t=> <span key={t} className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-xs">{t}</span>)}
              </div>
              {project.fileUrl && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-emerald-600" />
                    <div>
                      <div className="text-sm font-medium">Lampiran</div>
                      <div className="mono text-xs text-black/40 truncate max-w-[180px]">{project.fileName || 'Download'}</div>
                    </div>
                  </div>
                  <a href={project.fileUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-medium flex items-center gap-1"><Download size={14} /> Download</a>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-black/5 bg-zinc-100 aspect-[4/3]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <SwiperGallery images={[project.image, project.image, project.image]} title={project.title} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Projects() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedProject, setSelectedProject] = useState(null);
    const [firebaseProjects, setFirebaseProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
            setFirebaseProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, () => setLoading(false));
        return () => unsub();
    }, []);

    useEffect(() => {
        if (selectedProject) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [selectedProject]);

    const displayProjects = firebaseProjects.length > 0 ? firebaseProjects : allProjects;
    const categories = ["All", ...new Set(displayProjects.map(p => p.category))];
    const filtered = selectedCategory === "All" ? displayProjects : displayProjects.filter(p => p.category === selectedCategory);

    return (
        <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header like iqmal.dev/projects */}
                <div className="mb-12">
                    <div className="mono text-xs tracking-[0.2em] uppercase text-black/40 mb-2">WORK</div>
                    <div className="flex items-baseline gap-3">
                        <h1 className="headline-serif text-5xl md:text-6xl">All projects.</h1>
                        <span className="mono text-sm tracking-widest text-black/30 hidden md:inline">Project index / {String(displayProjects.length).padStart(2,'0')}</span>
                    </div>
                    <p className="text-black/60 leading-relaxed max-w-2xl mt-4">
                        A growing archive of digital products, visual works, and web experiences — from interface craft to fullstack delivery. <span className="text-black font-medium">{displayProjects.length} karya</span> terkurasi.
                    </p>
                </div>

                {/* Filter like iqmal.dev */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-black/5 py-4 mb-8">
                    <div className="mono text-xs tracking-widest uppercase text-black/40">Filter by discipline</div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => {
                            const count = cat === 'All' ? displayProjects.length : displayProjects.filter(p=>p.category===cat).length;
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-medium mono tracking-wide border transition-colors ${isActive ? 'bg-black text-white border-black' : 'bg-white border-black/10 hover:border-black/20 text-black/60 hover:text-black'}`}
                                >
                                    {cat} <span className="text-black/30">· {String(count).padStart(2,'0')}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mono text-xs tracking-widest uppercase text-black/30 mb-6">Showing {String(filtered.length).padStart(2,'0')} projects · {selectedCategory}</div>

                {loading ? (
                    <div className="py-16 text-center mono text-sm text-black/40">Loading from Firebase…</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {filtered.map((project, idx) => {
                            const techs = Array.isArray(project.tech) ? project.tech : (typeof project.tech==='string'? project.tech.split(',').map(s=>s.trim()):[]);
                            return (
                                <motion.div
                                    key={project.id || project.title || idx}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedProject(project)}
                                >
                                    <div className="rounded-2xl overflow-hidden border border-black/5 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-all">
                                        <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy"
                                                onError={(e)=> e.target.src='https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800'} />
                                        </div>
                                        <div className="p-5">
                                            <div className="flex items-center justify-between">
                                                <span className="mono text-xs tracking-widest uppercase text-black/40">{String(idx+1).padStart(2,'0')} / {project.category}</span>
                                                <span className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                                    <ArrowLeft className="rotate-180" size={14} />
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight mt-2 group-hover:underline decoration-black/20 underline-offset-4">{project.title}</h3>
                                            <p className="text-sm text-black/60 leading-relaxed mt-1 line-clamp-2">{project.desc}</p>
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {techs.slice(0,3).map(t=> <span key={t} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-[11px]">{t}</span>)}
                                                {techs.length>3 && <span className="mono text-[11px] text-black/30">+{techs.length-3}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-16 rounded-2xl border border-black/5 bg-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="headline-serif text-2xl">Have a project in mind?</h3>
                        <p className="text-black/50 mt-1">Let's build something useful.</p>
                    </div>
                    <Link to="/#contact" className="px-6 py-3 bg-black text-white rounded-full font-medium inline-flex items-center gap-2">
                        Start a conversation <ChevronRight size={16} />
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={()=>setSelectedProject(null)} />}
            </AnimatePresence>
        </main>
    );
}
