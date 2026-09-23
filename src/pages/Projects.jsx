import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { getDiscipline } from '../utils/discipline';

export const fallbackProjects = [
    {
        id: 'liga-korupsi-indonesia',
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
        id: 'visual-flow-02',
        title: "Visual Flow 02",
        category: "Experimental",
        image: "project-assets/images/0001_0(1).png",
        desc: "An experimental exploration of depth and texture, part of the 'Visual Flow' series.",
        tech: ["Photoshop"]
    },
    {
        id: 'visual-flow-03',
        title: "Visual Flow 03",
        category: "Experimental",
        image: "project-assets/images/0001_0(1)_1.png",
        desc: "Continuing the abstract series with a focus on vibrant color contrasts.",
        tech: ["Photoshop"]
    },
    {
        id: 'visual-flow-04',
        title: "Visual Flow 04",
        category: "Experimental",
        image: "project-assets/images/0001_0(2).png",
        desc: "A darker, more atmospheric entry in the Visual Flow series.",
        tech: ["Photoshop"]
    },
    {
        id: 'modern-event-flyer',
        title: "Modern Event Flyer",
        category: "Graphic Design",
        image: "project-assets/images/0002_40.png",
        desc: "A sleek, modern flyer designed for high-end events.",
        tech: ["Illustrator"]
    },
    {
        id: 'abstract-composition',
        title: "Abstract Composition",
        category: "Digital Art",
        image: "project-assets/images/0003_20.png",
        desc: "A fusion of geometric shapes and fluid gradients.",
        tech: ["Digital Art"]
    },
    {
        id: 'geometric-study-05',
        title: "Geometric Study 05",
        category: "Graphic Design",
        image: "project-assets/images/0005_20.png",
        desc: "Part of a minimalist series exploring bold shapes.",
        tech: ["Graphic Design"]
    },
    {
        id: 'branding-concept-01',
        title: "Branding Concept 01",
        category: "Branding",
        image: "project-assets/images/0006_20.png",
        desc: "Investigating modern brand marks through geometric construction.",
        tech: ["Branding"]
    },
    {
        id: 'cinematic-mood-poster',
        title: "Cinematic Mood Poster",
        category: "Poster Design",
        image: "project-assets/images/0007_20.png",
        desc: "Capturing the essence of cinematic storytelling.",
        tech: ["Photo Manipulation"]
    },
    {
        id: 'moment-capture-01',
        title: "Moment Capture 01",
        category: "Photography",
        image: "project-assets/images/20250619_180706.png",
        desc: "Street photography focusing on quiet moments.",
        tech: ["Photography"]
    },
    {
        id: 'mobile-interface-study',
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

const DISCIPLINES = ["ALL", "FRONTEND", "BACKEND", "FULLSTACK"];

const pad = (n) => String(n).padStart(2, '0');

export default function Projects() {
    const [selectedDiscipline, setSelectedDiscipline] = useState("ALL");
    const [firebaseProjects, setFirebaseProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
            setFirebaseProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        }, () => setLoading(false));
        return () => unsub();
    }, []);

    const displayProjects = useMemo(
        () => (firebaseProjects.length > 0 ? firebaseProjects : fallbackProjects),
        [firebaseProjects]
    );

    const withDiscipline = useMemo(
        () => displayProjects.map((p) => ({ ...p, discipline: getDiscipline(p) })),
        [displayProjects]
    );

    const countFor = (d) => d === "ALL"
        ? withDiscipline.length
        : withDiscipline.filter((p) => p.discipline === d).length;

    const filtered = selectedDiscipline === "ALL"
        ? withDiscipline
        : withDiscipline.filter((p) => p.discipline === selectedDiscipline);

    return (
        <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 md:pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Filter by discipline */}
                <div className="border-t border-black/10 pt-8">
                    <p className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">Filter by discipline</p>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                        {DISCIPLINES.map((d) => {
                            const isActive = selectedDiscipline === d;
                            const label = d === "ALL" ? "All Projects" : d.charAt(0) + d.slice(1).toLowerCase();
                            return (
                                <button
                                    key={d}
                                    onClick={() => setSelectedDiscipline(d)}
                                    className={`px-5 py-2.5 rounded-full mono text-[10px] tracking-[0.14em] uppercase font-medium border transition-colors ${isActive
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-black/60 border-black/10 hover:border-black/25 hover:text-black'}`}
                                >
                                    {label} <span className={isActive ? 'text-white/50' : 'text-black/30'}>{pad(countFor(d))}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-6 flex items-center justify-end">
                        <span className="mono text-[10px] tracking-[0.2em] uppercase text-black/35">
                            Showing {pad(filtered.length)} projects
                        </span>
                    </div>
                </div>
                <div className="border-b border-black/10 mb-12 md:mb-16" />

                {loading ? (
                    <div className="py-16 text-center mono text-sm text-black/40">Loading from Firebase…</div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-black/10 rounded-2xl bg-white/50">
                        <p className="text-black/60">Belum ada project pada disiplin ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
                        {filtered.map((project, idx) => (
                            <motion.div
                                key={project.id || project.title || idx}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.min(idx, 5) * 0.05 }}
                            >
                                <Link to={`/projects/${project.id || idx}`} className="group block">
                                    <div className="relative rounded-2xl overflow-hidden bg-zinc-200 aspect-[16/10]">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                                            loading="lazy"
                                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800'; }}
                                        />
                                        <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white mono text-[10px] tracking-[0.14em] uppercase font-medium">
                                            {project.discipline}
                                        </span>
                                        <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                                            <ArrowUpRight size={16} />
                                        </span>
                                    </div>
                                    <div className="border-t border-black/10 mt-6 pt-5">
                                        <p className="mono text-[10px] tracking-[0.2em] uppercase text-black/40">
                                            {pad(idx + 1)} / {project.role || `${project.discipline.charAt(0) + project.discipline.slice(1).toLowerCase()} Developer`}
                                        </p>
                                        <h3 className="text-[26px] md:text-[28px] font-bold tracking-[-0.02em] leading-tight mt-2 group-hover:underline decoration-black/20 underline-offset-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-[15px] text-black/50 leading-relaxed mt-2 line-clamp-3">
                                            {project.longDesc || project.desc}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-16 md:mt-20 rounded-2xl border border-black/5 bg-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="headline-serif text-2xl">Have a project in mind?</h3>
                        <p className="text-black/50 mt-1">Let's build something useful.</p>
                    </div>
                    <Link to="/#contact" className="px-6 py-3 bg-black text-white rounded-full font-medium inline-flex items-center gap-2">
                        Start a conversation <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
