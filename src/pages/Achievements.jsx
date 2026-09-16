import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import TerminalLoading from '../components/TerminalLoading';
import ImageZoomModal from '../components/ImageZoomModal';
import {
    ArrowLeft, Trophy, Award, Sparkles, Medal,
    Search, ExternalLink, X, FileText, Download,
    ChevronRight, ZoomIn, Building2, CalendarDays
} from 'lucide-react';

const defaultAchievements = [
    {
        title: "Medali Emas FSBN 2025",
        category: "Nasional",
        year: "2025",
        organizer: "Festival Sains & Budaya Nasional",
        rank: "Juara 1 / Gold Medal",
        desc: "Bidang Informatika - Tingkat Nasional. Meraih peringkat pertama pada kompetisi informatika nasional FSBN 2025.",
        fileUrl: "/certificates/FSBN_2025.pdf",
        fileName: "FSBN_2025.pdf",
        image: "",
        icon: "trophy",
        color: "bg-yellow-500/10"
    },
    {
        title: "Medali Emas ONSP 2025",
        category: "Akademik",
        year: "2025",
        organizer: "Olimpiade Nasional Sains Prestasi",
        rank: "Gold Medal",
        desc: "Bidang Informatika - Prestasi Akademik tingkat nasional pada ajang ONSP 2025.",
        fileUrl: "/certificates/ONSP_2025.pdf",
        fileName: "ONSP_2025.pdf",
        image: "",
        icon: "sparkles",
        color: "bg-blue-500/10"
    },
    {
        title: "Excellent Award Robotic",
        category: "Robotik",
        year: "2022",
        organizer: "Maze Solving Competition",
        rank: "Excellent Award",
        desc: "Penghargaan Creative Coding pada kompetisi Maze Solving Competition tahun 2022.",
        fileUrl: "",
        fileName: "",
        image: "",
        icon: "terminal",
        color: "bg-green-500/10"
    },
    {
        title: "Medali Perak POSN 2022",
        category: "Olimpiade",
        year: "2022",
        organizer: "Olimpiade Sains Nasional",
        rank: "Silver Medal",
        desc: "Bidang Informatika - Olimpiade Sains Nasional tahun 2022.",
        fileUrl: "",
        fileName: "",
        image: "",
        icon: "award",
        color: "bg-slate-500/10"
    }
];

const iconMap = {
    trophy: (cls) => <Trophy className={cls} />,
    sparkles: (cls) => <Sparkles className={cls} />,
    award: (cls) => <Award className={cls} />,
    medal: (cls) => <Medal className={cls} />
};

function getIcon(item, size = 32) {
    const cls = item.icon === 'trophy' ? 'text-yellow-400'
        : item.icon === 'sparkles' ? 'text-blue-400'
            : item.icon === 'award' ? 'text-slate-300'
                : 'text-green-400';
    const render = iconMap[item.icon] || iconMap.trophy;
    return React.cloneElement(render(cls), { size });
}

function PlaceholderThumb({ item, large = false }) {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600/20 via-indigo-900/40 to-black ${large ? 'min-h-[320px] p-10' : ''}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className={`${large ? 'w-24 h-24' : 'w-16 h-16'} rounded-2xl ${item.color || 'bg-blue-500/10'} border border-white/10 flex items-center justify-center mb-4 relative z-10`}>
                {getIcon(item, large ? 48 : 32)}
            </div>
            <p className={`${large ? 'text-sm' : 'text-[10px]'} font-black uppercase tracking-[0.3em] text-blue-400/80 relative z-10 text-center px-4`}>
                {item.rank || item.category}
            </p>
            <p className={`${large ? 'text-6xl' : 'text-5xl'} font-black text-white/5 absolute bottom-2 right-4 italic select-none`}>
                {item.year}
            </p>
        </div>
    );
}

function AchievementCard({ item, index, onClick }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const hasImage = Boolean(item.image);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="glass-card rounded-[24px] overflow-hidden group border border-white/10 hover:border-yellow-500/40 transition-all shadow-2xl bg-[#080c16]/90 flex flex-col cursor-pointer text-left h-full"
            onClick={onClick}
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative border-b border-white/5">
                {hasImage ? (
                    <>
                        {!isLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/5 animate-pulse">
                                <Trophy className="animate-pulse text-white/20" size={24} />
                            </div>
                        )}
                        <img
                            src={item.image}
                            loading="lazy"
                            onLoad={() => setIsLoaded(true)}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            alt={item.title}
                            onError={(e) => { e.target.style.display = 'none'; setIsLoaded(true); }}
                        />
                        {!isLoaded && <PlaceholderThumb item={item} />}
                    </>
                ) : (
                    <PlaceholderThumb item={item} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                    <span className="text-[11px] font-bold text-yellow-300 bg-yellow-600/30 px-3.5 py-1.5 rounded-xl border border-yellow-400/30 backdrop-blur-md flex items-center gap-1">
                        Lihat Detail <ChevronRight size={13} />
                    </span>
                </div>
                {item.rank?.toLowerCase().includes('gold') && (
                    <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest bg-yellow-500 text-black px-3 py-1 rounded-full shadow-lg">
                        Gold
                    </span>
                )}
            </div>

            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#080c16]">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-extrabold text-yellow-400 uppercase tracking-widest">
                            {item.category || 'Achievement'}
                        </span>
                        <span className="w-1 h-1 bg-white/20 rounded-full" />
                        <span className="text-[10px] font-mono font-bold text-white/40">{item.year}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors leading-snug line-clamp-2">
                        {item.title}
                    </h3>
                    <p className="text-[11px] text-white/40 mt-1 line-clamp-1">{item.organizer}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function Achievements() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [firebaseItems, setFirebaseItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isImageZoomed, setIsImageZoomed] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "achievements"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFirebaseItems(list);
            setLoading(false);
        }, () => {
            setLoading(false);
        });
        return () => unsub();
    }, []);

    useEffect(() => {
        if (selected) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [selected]);

    const display = firebaseItems.length > 0 ? firebaseItems : defaultAchievements;
    const categories = ["All", ...new Set(display.map(a => a.category).filter(Boolean))];
    const years = ["All", ...new Set(display.map(a => String(a.year)).filter(Boolean))].sort().reverse();

    const filtered = display.filter(a => {
        if (selectedCategory !== "All" && a.category !== selectedCategory) return false;
        if (selectedYear !== "All" && String(a.year) !== String(selectedYear)) return false;
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            return [a.title, a.desc, a.organizer, a.rank, a.category]
                .filter(Boolean).join(" ").toLowerCase().includes(q);
        }
        return true;
    });

    const handlePreview = (e, fileUrl) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(fileUrl, '_blank');
    };

    return (
        <main className="relative z-10 pt-32 pb-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-10 group text-sm font-medium">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <div className="text-left mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-xs font-bold text-yellow-400 mb-6 tracking-widest uppercase border border-white/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                    >
                        <Trophy size={13} className="text-yellow-400" /> ACHIEVEMENT ARCHIVE
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Sertifikat & <span className="text-linear">Kejuaraan.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg text-white/50 leading-relaxed max-w-2xl"
                    >
                        Kumpulan <span className="text-yellow-400 font-semibold">{display.length} pencapaian</span> — sertifikat, medali, dan penghargaan yang pernah diraih.
                    </motion.p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mb-8">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            placeholder="Cari judul, penyelenggara, peringkat..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 focus:border-yellow-500/50 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder-white/30 focus:outline-none transition-all"
                        />
                    </div>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white/70 focus:outline-none cursor-pointer"
                    >
                        {years.map(y => (
                            <option key={y} value={y} className="bg-[#0c101c]">{y === "All" ? "Semua Tahun" : y}</option>
                        ))}
                    </select>
                </div>

                {categories.length > 1 && (
                    <div className="flex flex-wrap gap-2.5 mb-12">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all border-none cursor-pointer ${selectedCategory === cat
                                    ? "bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {loading && <TerminalLoading message="Memuat achievements dari database Firebase..." />}

                {!loading && filtered.length === 0 && (
                    <div className="glass-card p-12 text-center border-white/10">
                        <Trophy size={40} className="mx-auto text-yellow-400/50 mb-3" />
                        <h3 className="text-lg font-bold mb-2">Tidak ada data ditemukan</h3>
                        <p className="text-xs text-white/50">Coba ubah kata kunci atau filter.</p>
                    </div>
                )}

                {!loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {filtered.map((item, idx) => (
                            <AchievementCard
                                key={item.id || item.title || idx}
                                item={item}
                                index={idx}
                                onClick={() => setSelected(item)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {selected && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000000] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-3xl text-left overflow-hidden"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 40, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="w-full max-h-[88vh] md:max-h-[90vh] md:max-w-5xl rounded-[28px] overflow-y-auto bg-[#070a14] border border-white/15 shadow-[0_0_100px_rgba(0,0,0,0.9)] relative custom-scrollbar flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="sticky top-0 z-40 bg-[#070a14]/95 backdrop-blur-md px-5 sm:px-8 py-4 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelected(null)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl text-xs font-bold text-white transition-all border border-white/10 cursor-pointer"
                                    >
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 truncate max-w-xs">
                                        <span>Achievements</span>
                                        <div className="w-1 h-1 bg-white/20 rounded-full shrink-0" />
                                        <span className="text-yellow-400 truncate">{selected.title}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer shrink-0"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                                <div>
                                    <div
                                        className={`relative aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 bg-black ${selected.image ? 'cursor-zoom-in group' : ''}`}
                                        onClick={() => selected.image && setIsImageZoomed(true)}
                                    >
                                        {selected.image ? (
                                            <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <PlaceholderThumb item={selected} large />
                                        )}
                                        {selected.image && (
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                <span className="bg-yellow-600/90 text-black px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2">
                                                    <ZoomIn size={16} /> Perbesar
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {selected.fileUrl && (
                                        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <FileText size={20} className="text-emerald-400 shrink-0" />
                                                <div>
                                                    <div className="text-xs font-bold text-white">Sertifikat / Piagam (PDF)</div>
                                                    <div className="text-[10px] font-mono text-white/50 break-all">{selected.fileName || 'Download File'}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <button
                                                    onClick={(e) => handlePreview(e, selected.fileUrl)}
                                                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all border-none cursor-pointer"
                                                >
                                                    <ExternalLink size={14} /> Buka
                                                </button>
                                                <a
                                                    href={selected.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download={selected.fileName || 'Sertifikat'}
                                                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all"
                                                >
                                                    <Download size={14} /> Download
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-yellow-400">
                                                {selected.category}
                                            </span>
                                            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white/60 flex items-center gap-1">
                                                <CalendarDays size={12} /> {selected.year}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-3">
                                            {selected.title}
                                        </h2>
                                        <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-4" />
                                        {selected.rank && (
                                            <p className="text-yellow-300 font-bold text-sm mb-2 flex items-center gap-2">
                                                <Medal size={16} /> {selected.rank}
                                            </p>
                                        )}
                                        {selected.organizer && (
                                            <p className="text-white/50 text-sm flex items-center gap-2 mb-4">
                                                <Building2 size={14} className="text-white/30" /> {selected.organizer}
                                            </p>
                                        )}
                                        <p className="text-white/60 leading-relaxed">
                                            {selected.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {isImageZoomed && selected.image && (
                            <ImageZoomModal
                                src={selected.image}
                                alt={selected.title}
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
