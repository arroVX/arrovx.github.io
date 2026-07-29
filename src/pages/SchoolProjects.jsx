import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Code2, Network, Cpu, FileText, CheckCircle2,
    Search, Award, ExternalLink, Download, Copy, Check, ChevronRight,
    Terminal, Layers, Monitor, Sparkles, Filter, X, AlertCircle, Paperclip
} from 'lucide-react';
import { useScrambleText } from '../utils/animations';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Toast from '../components/Toast';
import TerminalLoading from '../components/TerminalLoading';
import ImageZoomModal from '../components/ImageZoomModal';

const schoolProjectsData = [
    {
        id: "lkpd-01",
        title: "LKPD 01: Konfigurasi VLAN & Inter-VLAN Routing Cisco",
        subject: "Administrasi Infrastruktur Jaringan (AIJ)",
        category: "LKPD & Jaringan",
        date: "Februari 2025",
        grade: "100 / A+",
        status: "Selesai",
        desc: "Konfigurasi Virtual Local Area Network (VLAN 10: Lab TKJ, VLAN 20: Ruang Guru) menggunakan Router Cisco 2911 & Switch Catalyst 2960 dengan metode Router-on-a-Stick.",
        objectives: [
            "Memahami konsep dasar segmentasi jaringan dengan VLAN",
            "Mengonfigurasi Trunking (IEEE 802.1Q) pada Switch Cisco Catalyst",
            "Mengimplementasikan Sub-Interface Router untuk Inter-VLAN Routing"
        ],
        tools: ["Cisco Packet Tracer", "Switch Catalyst 2960", "Router Cisco 2911"],
        snippet: `! Konfigurasi Switch Trunking
interface FastEthernet0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20
!
! Router Sub-Interface Routing
interface GigabitEthernet0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0
interface GigabitEthernet0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0`
    },
    {
        id: "lkpd-02",
        title: "LKPD 02: Algoritma Pencarian & Struktur Data C++",
        subject: "Pemrograman Dasar & Algoritma",
        category: "Coding & Web",
        date: "Januari 2025",
        grade: "98 / A+",
        status: "Selesai",
        desc: "Program C++ untuk manajemen dan pengolahan data siswa SMKN 3 Jepara berbasis Struct dan Array 2D dengan implementasi algoritma Binary Search & Bubble Sort.",
        objectives: [
            "Memahami pengorganisasian data menggunakan Struct & Pointer di C++",
            "Menerapkan algoritma pengurutan (Sorting) & pencarian (Searching) efisien",
            "Menganalisis kompleksitas waktu O(log n) pada Binary Search"
        ],
        tools: ["C++", "GCC Compiler", "VS Code", "GDB Debugger"],
        snippet: `#include <iostream>
#include <algorithm>
using namespace std;

struct Siswa {
    string nama;
    string nis;
    float nilai;
};

int binarySearch(Siswa arr[], int l, int r, string targetNIS) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m].nis == targetNIS) return m;
        if (arr[m].nis < targetNIS) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
    },
    {
        id: "lkpd-03",
        title: "LKPD 03: Deployment & Hardening Linux Server Debian 12",
        subject: "Administrasi Sistem Jaringan (ASJ)",
        category: "LKPD & Jaringan",
        date: "Maret 2025",
        grade: "95 / A",
        status: "Selesai",
        desc: "Instalasi dan konfigurasi server Linux Debian 12 mandiri mencakup DHCP Server (isc-dhcp-server), DNS Server (Bind9), dan SSH Hardening pelindung serangan Brute Force.",
        objectives: [
            "Melakukan konfigurasi IP Static & Interface di Debian 12",
            "Membangun DNS Server Forwarder & Reverse Zone dengan Bind9",
            "Mengonfigurasi UFW Firewall & Mengubah Default SSH Port"
        ],
        tools: ["Debian 12", "Bind9", "Proxmox VE", "OpenSSH"],
        snippet: `// /etc/bind/named.conf.local
zone "tkj.smkn3jepara.sch.id" {
    type master;
    file "/etc/bind/db.tkj";
};

zone "56.168.192.in-addr.arpa" {
    type master;
    file "/etc/bind/db.192";
};`
    },
    {
        id: "lkpd-04",
        title: "LKPD 04: Web Portal Interaktif TKJ React & Vite",
        subject: "Pemrograman Web & Perangkat Bergerak (PWB)",
        category: "Coding & Web",
        date: "April 2025",
        grade: "100 / A+",
        status: "Selesai",
        desc: "Pengembangan portal informasi interaktif jurusan TKJ SMKN 3 Jepara berbasis React 19, Tailwind CSS, dan antarmuka futuristik Glassmorphism.",
        objectives: [
            "Membuat arsitektur komponen React yang modular dan dapat digunakan kembali",
            "Mengimplementasikan React Router v7 untuk navigasi Single Page Application",
            "Mendesain tampilan responsif untuk berbagai ukuran layar"
        ],
        tools: ["React 19", "Tailwind CSS", "Vite", "Lucide React"],
        snippet: `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/school-projects" element={<SchoolProjects />} />
      </Routes>
    </Router>
  );
}`
    },
    {
        id: "lkpd-05",
        title: "LKPD 05: Desain Identitas & Poster Cyber Security Awareness",
        subject: "Desain Grafis Komunikasi Visual (DKV)",
        category: "Tugas Multimedia & Desain",
        date: "November 2024",
        grade: "96 / A+",
        status: "Selesai",
        desc: "Perancangan karya visual poster edukasi bahaya Phishing dan keamanan siber untuk mading digital SMKN 3 Jepara dengan teknik High-Impact Vector.",
        objectives: [
            "Menerapkan prinsip hirarki visual dan tata letak tipografi",
            "Mengkombinasikan elemen grafis vektor dengan perpaduan warna neon kontras",
            "Menyampaikan pesan teknis keamanan siber dalam format visual intuitif"
        ],
        tools: ["Adobe Photoshop", "Adobe Illustrator", "Typography"],
        snippet: `Specs: Vector Poster Design
Dimensions: 3508 x 4960 px (A3 300 DPI)
Color Mode: RGB Digital / CMYK Print Ready
Export Formats: PDF, PNG-24 High Res`
    }
];

export default function SchoolProjects() {
    const [activeProject, setActiveProject] = useState(null);
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });
    const [copied, setCopied] = useState(false);
    const [firebaseSchoolProjects, setFirebaseSchoolProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firebaseError, setFirebaseError] = useState('');
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
        const unsubSchool = onSnapshot(collection(db, "school_projects"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, source: 'school', ...doc.data() }));
            setFirebaseSchoolProjects(list);
            setFirebaseError('');
            setLoading(false);
        }, (error) => {
            console.error("Firestore school_projects Error:", error);
            setFirebaseError(error.message || 'Permission denied');
            setLoading(false);
        });

        return () => unsubSchool();
    }, []);

    const titleScramble = useScrambleText("School Project", 0);

    const handleCopySnippet = (snippet) => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setToast({ isOpen: true, message: "Snippet berhasil disalin ke clipboard!", type: "success" });
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-24 px-4 md:px-6 relative z-10 overflow-x-hidden text-white"
        >
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 glass-card rounded-full text-xs font-bold text-blue-400 mb-6 tracking-widest uppercase border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    >
                        SMKN 3 JEPARA — JURUSAN TKJ
                    </motion.div>

                    <h1 className="text-4xl md:text-7xl font-bold tracking-tighter italic mb-6">
                        {titleScramble}
                    </h1>

                    <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Kumpulan Lembar Kerja Peserta Didik (LKPD), tugas praktikum jaringan, dan project dari hasil pembelajaran di <span className="text-blue-400 font-semibold">SMKN 3 Jepara</span>.
                    </p>
                </div>

                {/* Firestore Error State */}
                {!loading && firebaseError && (
                    <div className="text-center py-16">
                        <div className="glass-card border-red-500/20 max-w-xl mx-auto p-8 rounded-2xl">
                            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
                            <p className="text-red-400 text-sm font-bold mb-2">Gagal mengambil data dari Firebase!</p>
                            <p className="text-white/40 text-xs mb-6 font-mono bg-white/5 p-2 rounded">{firebaseError}</p>
                            <div className="text-left bg-white/5 rounded-xl p-4 border border-white/10">
                                <p className="text-blue-400 text-xs font-bold mb-2">⚡ Cara Fix — Update Firestore Rules:</p>
                                <ol className="text-white/50 text-xs space-y-1 list-decimal list-inside">
                                    <li>Buka <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">Firebase Console</a></li>
                                    <li>Pilih project <span className="text-white/70 font-bold">rojing-54fcd</span></li>
                                    <li>Klik menu <span className="text-white/70 font-bold">Firestore Database → Rules</span></li>
                                    <li>Ganti rules dengan:</li>
                                </ol>
                                <pre className="mt-2 bg-black/50 text-green-400 text-[11px] p-3 rounded-lg overflow-x-auto">{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}</pre>
                                <p className="text-white/30 text-[10px] mt-2">5. Klik <strong>Publish</strong>, lalu refresh halaman ini.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Empty State (no error, just empty) */}
                {!loading && !firebaseError && firebaseSchoolProjects.length === 0 && (
                    <div className="text-center py-20">
                        <FileText size={48} className="mx-auto text-white/20 mb-4" />
                        <p className="text-white/40 text-sm font-medium mb-2">Belum ada data LKPD di Firebase.</p>
                        <p className="text-white/30 text-xs">Tambahkan proyek LKPD melalui halaman <a href="#/admin" className="text-blue-400 underline">Admin Panel</a>.</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <TerminalLoading message="Memuat data LKPD & Praktikum dari Firebase..." />
                )}

                {/* LKPD & Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {firebaseSchoolProjects.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="glass-card border-white/5 flex flex-col justify-between group hover:border-blue-500/30 hover:bg-white/5 transition-all relative overflow-hidden text-left"
                        >
                            {/* Card Image Banner if exists */}
                            {item.image && !item.image.includes('0001_0.png') && (
                                <div className="h-44 w-full overflow-hidden relative bg-black/40 border-b border-white/5">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent opacity-80" />
                                </div>
                            )}

                            <div className="p-6">
                                {/* Header Badges */}
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                            {item.category || 'School Project'}
                                        </span>
                                        {item.classLevel && (
                                            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                                {item.classLevel}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Title & Subject */}
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] font-semibold text-white/40 mb-3 flex items-center gap-1.5">
                                    <FileText size={12} className="text-blue-400" /> {item.subject || 'TKJ SMKN 3 Jepara'}
                                </p>

                                {/* Description */}
                                <p className="text-xs text-white/60 leading-relaxed mb-4 line-clamp-3">
                                    {item.desc}
                                </p>

                                {/* PDF / File Attachment Badge */}
                                {item.fileUrl && (
                                    <div className="mb-4 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                                        <span className="flex items-center gap-1.5 truncate text-[11px]">
                                            <Paperclip size={13} className="shrink-0 text-emerald-400" />
                                            <span className="truncate">{item.fileName || 'Lampiran Berkas PDF'}</span>
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-400 shrink-0">PDF</span>
                                    </div>
                                )}
                            </div>

                            <div className="px-6 pb-6">
                                {/* Tools / Tech Badges */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {(Array.isArray(item.tools) ? item.tools : (Array.isArray(item.tech) ? item.tech : (typeof item.tech === 'string' ? item.tech.split(',') : []))).map((t, index) => (
                                        <span key={index} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] font-mono text-white/50 border border-white/5">
                                            {typeof t === 'string' ? t.trim() : t}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => setActiveProject(item)}
                                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-white text-xs font-bold transition-all border-none flex items-center justify-center gap-2 group/btn cursor-pointer"
                                >
                                    Lihat Detail & Berkas <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Detail & Snippet Drawer */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-xl"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-8 border-white/10 bg-[#090d16]/95 relative shadow-2xl custom-scrollbar"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all border-none"
                            >
                                <X size={18} />
                            </button>

                            {/* Modal Header */}
                            <div className="mb-6 pr-8">
                                <div className="flex items-center gap-3 mb-3 flex-wrap">
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20">
                                        {activeProject.category || 'School Project'}
                                    </span>
                                    {activeProject.classLevel && (
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20">
                                            {activeProject.classLevel}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                                    {activeProject.title}
                                </h2>
                                <p className="text-xs font-semibold text-white/40 flex items-center gap-2">
                                    <BookOpen size={14} className="text-blue-400" /> {activeProject.subject || 'TKJ SMKN 3 Jepara'} {activeProject.date ? `• ${activeProject.date}` : ''}
                                </p>
                            </div>

                            {/* Image Preview in Modal if exists */}
                            {activeProject.image && !activeProject.image.includes('0001_0.png') && (
                                <>
                                    <div 
                                        className="mb-6 rounded-2xl overflow-hidden border border-white/10 max-h-80 bg-black/60 cursor-zoom-in group relative"
                                        onClick={() => setIsImageZoomed(true)}
                                    >
                                        <img
                                            src={activeProject.image}
                                            alt={activeProject.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <span className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border border-white/10">
                                                Klik untuk Zoom
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Zoomed Image Overlay */}
                                    {isImageZoomed && activeProject && (
                                        <ImageZoomModal
                                            src={activeProject.image}
                                            alt={activeProject.title}
                                            onClose={() => setIsImageZoomed(false)}
                                        />
                                    )}
                                </>
                            )}

                            {/* Description */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Deskripsi LKPD</h4>
                                <p className="text-sm text-white/70 leading-relaxed bg-white/2 p-4 rounded-xl border border-white/5">
                                    {activeProject.desc}
                                </p>
                            </div>

                            {/* Learning Objectives */}
                            {activeProject.objectives && activeProject.objectives.length > 0 && (
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-3">Tujuan Pembelajaran</h4>
                                <ul className="space-y-2">
                                    {activeProject.objectives.map((obj, i) => (
                                        <li key={i} className="flex items-start gap-3 text-xs text-white/80">
                                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            )}

                            {/* Long Description (from Firebase) */}
                            {activeProject.longDesc && activeProject.longDesc !== activeProject.desc && (
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-2">Detail Lengkap</h4>
                                <p className="text-sm text-white/70 leading-relaxed bg-white/2 p-4 rounded-xl border border-white/5">
                                    {activeProject.longDesc}
                                </p>
                            </div>
                            )}

                            {/* Code / Config Snippet */}
                            {activeProject.snippet && (
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                                            <Terminal size={14} className="text-blue-400" /> Konfigurasi / Kode Snippet
                                        </h4>
                                        <button
                                            onClick={() => handleCopySnippet(activeProject.snippet)}
                                            className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs rounded-lg flex items-center gap-1.5 transition-all border-none"
                                        >
                                            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                            {copied ? "Tersalin!" : "Salin Kode"}
                                        </button>
                                    </div>
                                    <div className="bg-[#050811] p-4 rounded-xl border border-white/10 font-mono text-xs text-blue-300 overflow-x-auto">
                                        <pre><code>{activeProject.snippet}</code></pre>
                                    </div>
                                </div>
                            )}

                            {/* File Attachment / PDF Download */}
                            {activeProject.fileUrl && (
                                <div className="mb-6 p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <FileText size={20} className="text-blue-400 shrink-0" />
                                        <div>
                                            <div className="text-xs font-bold text-white">Lampiran File / Dokumen PDF</div>
                                            <div className="text-[10px] font-mono text-white/50 break-all">{activeProject.fileName || 'Download berkas LKPD'}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button
                                            onClick={(e) => handlePreview(e, activeProject.fileUrl, activeProject.fileName || activeProject.title)}
                                            className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all border-none cursor-pointer"
                                        >
                                            <ExternalLink size={14} /> Buka / Preview
                                        </button>
                                        <a
                                            href={activeProject.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={activeProject.fileName || 'LKPD'}
                                            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 border-none"
                                        >
                                            <Download size={14} /> Download
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Modal Footer Tools */}
                            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex flex-wrap gap-2">
                                    {(Array.isArray(activeProject.tools) ? activeProject.tools : (Array.isArray(activeProject.tech) ? activeProject.tech : (typeof activeProject.tech === 'string' ? activeProject.tech.split(',') : []))).map((t, idx) => (
                                        <span key={idx} className="px-2.5 py-1 bg-white/5 rounded-lg text-xs font-mono text-white/60 border border-white/5">
                                            {typeof t === 'string' ? t.trim() : t}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setActiveProject(null)}
                                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all border-none cursor-pointer"
                                >
                                    Tutup Detail
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isOpen: false })}
            />
        </motion.div>
    );
}
