import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Code2, Terminal, Layers, ExternalLink, Download, Copy, Check, X, FileText, HardDrive, Video, Play } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Toast from '../components/Toast';

const schoolProjectsData = [
    {
        id: "lkpd-01",
        title: "LKPD 01: Konfigurasi VLAN & Inter-VLAN Routing Cisco",
        subject: "Administrasi Infrastruktur Jaringan (AIJ)",
        category: "LKPD & Jaringan",
        classLevel: "Kelas XI",
        date: "Februari 2025",
        desc: "Konfigurasi VLAN 10: Lab TKJ, VLAN 20: Ruang Guru menggunakan Router Cisco 2911 & Switch Catalyst 2960.",
        tools: ["Cisco Packet Tracer", "Switch Catalyst 2960"],
        snippet: `interface FastEthernet0/1\n switchport mode trunk`,
        image: ""
    },
    {
        id: "lkpd-02",
        title: "LKPD 02: Algoritma Pencarian & Struktur Data C++",
        subject: "Pemrograman Dasar",
        category: "Coding & Web",
        classLevel: "Kelas X",
        date: "Januari 2025",
        desc: "Program C++ manajemen data siswa berbasis Struct dan Array 2D dengan Binary Search & Bubble Sort.",
        tools: ["C++", "VS Code"],
        snippet: `#include <iostream>\nstruct Siswa { string nis; };`,
        image: ""
    },
    {
        id: "lkpd-03",
        title: "LKPD 03: Deployment & Hardening Linux Server Debian 12",
        subject: "Administrasi Sistem Jaringan (ASJ)",
        category: "LKPD & Jaringan",
        classLevel: "Kelas XII",
        date: "Maret 2025",
        desc: "Instalasi dan konfigurasi server Linux Debian 12 mencakup DHCP, DNS Bind9, dan SSH Hardening.",
        tools: ["Debian 12", "Bind9"],
        snippet: `zone "tkj.smkn3jepara.sch.id" { type master; };`,
        image: ""
    },
];

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
        const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        if (m && m[2].length === 11) return `https://www.youtube.com/embed/${m[2]}`;
    } catch {}
    return null;
};

export default function SchoolProjects() {
    const [activeProject, setActiveProject] = useState(null);
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });
    const [copied, setCopied] = useState(false);
    const [firebaseSchoolProjects, setFirebaseSchoolProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState("All");
    const [selectedMapel, setSelectedMapel] = useState("All");

    const classOptions = ["All", "Kelas X", "Kelas XI", "Kelas XII"];
    const mapelOptions = ["All", "ASJ", "TJKN", "KJ", "English", "Bahasa Jepang"];

    const getClassGroup = (classLevel = '', title = '', desc = '') => {
        const raw = String(classLevel || '').toUpperCase();
        if (raw.includes('XII') || raw.includes('12')) return 'Kelas XII';
        if (raw.includes('XI') || raw.includes('11')) return 'Kelas XI';
        if (raw.includes('X') || raw.includes('10')) return 'Kelas X';
        const combined = `${title} ${desc}`.toUpperCase();
        if (combined.includes('XII')) return 'Kelas XII';
        if (combined.includes('XI')) return 'Kelas XI';
        return 'Kelas X';
    };
    const getMapelGroup = (subject = '', title = '', desc = '') => {
        const t = `${subject} ${title} ${desc}`.toLowerCase();
        if (t.includes('asj') || t.includes('administrasi sistem jaringan')) return 'ASJ';
        if (t.includes('tjkn') || t.includes('teknik jaringan')) return 'TJKN';
        if (t.includes('kj') || t.includes('keamanan')) return 'KJ';
        if (t.includes('english') || t.includes('inggris')) return 'English';
        if (t.includes('jepang')) return 'Bahasa Jepang';
        return 'Lainnya';
    };

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "school_projects"), (snap) => {
            setFirebaseSchoolProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
            setLoading(false);
        }, () => setLoading(false));
        return () => unsub();
    }, []);

    useEffect(() => {
        if (activeProject) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [activeProject]);

    const source = firebaseSchoolProjects.length ? firebaseSchoolProjects : schoolProjectsData;
    const filtered = source.filter(item => {
        if (selectedClass !== "All" && getClassGroup(item.classLevel, item.title, item.desc) !== selectedClass) return false;
        if (selectedMapel !== "All" && getMapelGroup(item.subject, item.title, item.desc) !== selectedMapel) return false;
        return true;
    });

    const handleCopy = (snippet) => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setToast({ isOpen: true, message: "Snippet disalin!", type: "success" });
        setTimeout(() => setCopied(false), 1800);
    };

    return (
        <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-10">
                    <div className="mono text-xs tracking-[0.2em] uppercase text-black/40">SMKN 3 JEPARA — TKJ</div>
                    <h1 className="headline-serif text-5xl md:text-6xl mt-2">School Projects.</h1>
                    <p className="text-black/60 leading-relaxed max-w-2xl mt-4">
                        Kumpulan LKPD, praktikum jaringan, dan tugas pembelajaran. <span className="text-black font-medium">{source.length} dokumen</span> — filter by kelas & mapel ala <span className="mono text-xs">iqmal.dev</span>.
                    </p>
                </div>

                {/* Filters */}
                <div className="border-y border-black/5 py-4 mb-6 space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <span className="mono text-xs tracking-widest uppercase text-black/40">Filter by class</span>
                        <div className="flex flex-wrap gap-2">
                            {classOptions.map(cls => (
                                <button key={cls} onClick={() => setSelectedClass(cls)} className={`px-4 py-1.5 rounded-full mono text-xs tracking-wide border ${selectedClass===cls ? 'bg-black text-white border-black' : 'bg-white border-black/10 text-black/60 hover:text-black'}`}>{cls}</button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <span className="mono text-xs tracking-widest uppercase text-black/40">Filter by subject</span>
                        <div className="flex flex-wrap gap-2">
                            {mapelOptions.map(m => (
                                <button key={m} onClick={() => setSelectedMapel(m)} className={`px-4 py-1.5 rounded-full mono text-xs tracking-wide border ${selectedMapel===m ? 'bg-black text-white border-black' : 'bg-white border-black/10 text-black/60 hover:text-black'}`}>{m}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mono text-xs tracking-widest uppercase text-black/30 mb-6">Showing {String(filtered.length).padStart(2,'0')} projects · {selectedClass} · {selectedMapel}</div>

                {loading ? (
                    <div className="py-16 text-center mono text-sm text-black/40">Loading LKPD from Firebase…</div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-black/10 rounded-2xl bg-white">
                        <FileText size={32} className="mx-auto text-black/20 mb-2" />
                        <p className="text-black/60 text-sm">Tidak ada LKPD untuk filter ini.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((item, idx) => (
                            <div key={item.id || idx} className="rounded-2xl border border-black/5 bg-white overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow flex flex-col">
                                <div className="h-36 bg-zinc-100 border-b border-black/5 flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Code2 size={28} className="text-black/20" />
                                            <span className="mono text-xs tracking-widest uppercase text-black/30 mt-1">{getMapelGroup(item.subject, item.title, item.desc)}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-xs">{getClassGroup(item.classLevel, item.title, item.desc)}</span>
                                        <span className="px-2 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-xs">{getMapelGroup(item.subject, item.title, item.desc)}</span>
                                    </div>
                                    <h3 className="font-bold leading-snug line-clamp-2">{item.title}</h3>
                                    <p className="mono text-xs text-black/40 mt-1 flex items-center gap-1"><BookOpen size={12} /> {item.subject || 'TKJ'}</p>
                                    <p className="text-sm text-black/60 leading-relaxed mt-2 line-clamp-2">{item.desc}</p>
                                </div>
                                <div className="p-4 border-t border-black/5 flex items-center justify-between">
                                    <button onClick={() => setActiveProject(item)} className="text-xs font-medium hover:underline">Lihat Detail →</button>
                                    <div className="flex gap-1">
                                        {item.driveUrl && <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center"><HardDrive size={12} /></span>}
                                        {item.videoUrl && <span className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center"><Video size={12} /></span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {activeProject && createPortal(
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={()=>setActiveProject(null)}>
                        <motion.div initial={{ scale: 0.98, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 12 }} onClick={e=>e.stopPropagation()} className="w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl border border-black/10 shadow-2xl p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex gap-2 mb-2">
                                        <span className="px-2 py-1 rounded-full bg-black text-white mono text-xs">{getClassGroup(activeProject.classLevel, activeProject.title, activeProject.desc)}</span>
                                        <span className="px-2 py-1 rounded-full border border-black/10 mono text-xs">{getMapelGroup(activeProject.subject, activeProject.title, activeProject.desc)}</span>
                                    </div>
                                    <h2 className="headline-serif text-2xl md:text-3xl">{activeProject.title}</h2>
                                    <p className="mono text-xs text-black/40 mt-1"><BookOpen size={12} className="inline" /> {activeProject.subject} {activeProject.date ? `· ${activeProject.date}` : ''}</p>
                                </div>
                                <button onClick={()=>setActiveProject(null)} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0"><X size={16} /></button>
                            </div>
                            <p className="text-sm text-black/70 leading-relaxed bg-zinc-50 border border-black/5 rounded-xl p-4">{activeProject.desc}</p>
                            {activeProject.snippet && (
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="mono text-xs tracking-widest uppercase text-black/30 flex items-center gap-1"><Terminal size={12} /> Snippet</span>
                                        <button onClick={()=>handleCopy(activeProject.snippet)} className="px-3 py-1 rounded-full border border-black/10 mono text-xs flex items-center gap-1 hover:bg-black hover:text-white">
                                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />} {copied ? "Tersalin" : "Salin"}
                                        </button>
                                    </div>
                                    <pre className="bg-[#0a0a0a] text-zinc-100 p-4 rounded-xl overflow-x-auto mono text-xs leading-relaxed"><code>{activeProject.snippet}</code></pre>
                                </div>
                            )}
                            {activeProject.fileUrl && (
                                <div className="mt-6 rounded-xl border border-black/10 bg-zinc-50 p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <FileText size={18} />
                                        <div>
                                            <div className="text-sm font-medium">Lampiran PDF</div>
                                            <div className="mono text-xs text-black/40 truncate max-w-[180px]">{activeProject.fileName || 'Download'}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={activeProject.fileUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-black/10 rounded-full mono text-xs flex items-center gap-1"><ExternalLink size={12} /> Buka</a>
                                        <a href={activeProject.fileUrl} download className="px-3 py-1.5 bg-black text-white rounded-full mono text-xs flex items-center gap-1"><Download size={12} /> Download</a>
                                    </div>
                                </div>
                            )}
                            {activeProject.driveUrl && (
                                <div className="mt-4 rounded-xl border border-black/10 bg-white p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 mono text-xs"><HardDrive size={14} /> {activeProject.driveUrl.slice(0,36)}…</div>
                                    <a href={activeProject.driveUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-black text-white rounded-full mono text-xs flex items-center gap-1"><ExternalLink size={12} /> Drive</a>
                                </div>
                            )}
                            {activeProject.videoUrl && getYouTubeEmbedUrl(activeProject.videoUrl) && (
                                <div className="mt-4 rounded-xl overflow-hidden border border-black/10 bg-black aspect-video">
                                    <iframe src={getYouTubeEmbedUrl(activeProject.videoUrl)} title="Video" className="w-full h-full border-none" allowFullScreen />
                                </div>
                            )}
                            <div className="flex flex-wrap gap-1.5 mt-6">
                                {(activeProject.tools || activeProject.tech || []).map((t,i)=> (
                                    <span key={i} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-xs">{typeof t==='string'?t.trim():t}</span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
            <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={()=>setToast({...toast,isOpen:false})} />
        </main>
    );
}
