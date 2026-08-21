import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Code2, Network, Cpu, FileText, CheckCircle2,
    Search, Award, ExternalLink, Download, Copy, Check, ChevronRight,
    Terminal, Layers, Monitor, Sparkles, Filter, X, AlertCircle, Paperclip,
    HardDrive, Video, Play
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
        driveUrl: "https://drive.google.com",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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

const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    try {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
    } catch (e) {
        return null;
    }
    return null;
};

export default function SchoolProjects() {
    const [activeProject, setActiveProject] = useState(null);
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });
    const [copied, setCopied] = useState(false);
    const [firebaseSchoolProjects, setFirebaseSchoolProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [firebaseError, setFirebaseError] = useState('');
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [selectionStep, setSelectionStep] = useState(1);
    const [selectedMapel, setSelectedMapel] = useState("");
    const [selectedClass, setSelectedClass] = useState("");

    const classOptions = ["Kelas X", "Kelas XI", "Kelas XII"];
    const classOrder = { 'KELAS X': 1, 'KELAS XI': 2, 'KELAS XII': 3 };

    const getClassGroup = (classLevel = '', title = '', desc = '') => {
        const rawClass = String(classLevel || '').trim().toUpperCase();
        if (rawClass.includes('XII') || rawClass.includes('12')) return 'KELAS XII';
        if (rawClass.includes('XI') || rawClass.includes('11')) return 'KELAS XI';
        if (rawClass.includes('X') || rawClass.includes('10')) return 'KELAS X';

        const combined = `${title} ${desc}`.toUpperCase();
        if (combined.includes('XII') || combined.includes('KELAS 12')) return 'KELAS XII';
        if (combined.includes('XI') || combined.includes('KELAS 11')) return 'KELAS XI';
        if (combined.includes('KELAS X') || combined.includes('KELAS 10')) return 'KELAS X';
        return 'KELAS X';
    };

    const mapelOptions = [
        "ASJ", 
        "TJKN", 
        "KJ"
    ];

    const getMapelGroup = (subject = '', title = '', desc = '') => {
        const text = `${subject} ${title} ${desc}`.toLowerCase();
        if (text.includes('administrasi sistem jaringan') || text.includes('asj')) return 'ASJ';
        if (text.includes('teknik jaringan kabel') || text.includes('nirkabel') || text.includes('tjkn')) return 'TJKN';
        if (text.includes('keamanan jaringan') || text.includes('kj')) return 'KJ';
        return 'Lainnya';
    };

    const filteredSchoolProjects = firebaseSchoolProjects
        .filter(item => {
            if (selectedMapel) {
                const groupMapel = getMapelGroup(item.subject, item.title, item.desc);
                if (groupMapel !== selectedMapel) return false;
            }
            if (selectedClass) {
                const groupClass = getClassGroup(item.classLevel, item.title, item.desc);
                if (groupClass !== selectedClass.toUpperCase()) return false;
            }
            return true;
        })
        .sort((a, b) => {
            const groupA = getClassGroup(a.classLevel, a.title, a.desc);
            const groupB = getClassGroup(b.classLevel, b.title, b.desc);
            return (classOrder[groupA] || 99) - (classOrder[groupB] || 99);
        });

    const handlePreview = (e, fileUrl, title) => {
        e.preventDefault();
        window.open(fileUrl, '_blank');
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

    useEffect(() => {
        if (activeProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeProject]);

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
            className="min-h-screen pt-32 pb-24 relative z-10 overflow-x-hidden text-white"
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6">
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

                {/* Step Navigation */}
                {!loading && firebaseSchoolProjects.length > 0 && selectionStep === 1 && (
                    <div className="py-12">
                        <h2 className="text-2xl font-bold text-center mb-8">Pilih Kelas</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {classOptions.map(cls => (
                                <button key={cls} onClick={() => { setSelectedClass(cls); setSelectionStep(2); }} className="w-full glass-card border-white/5 hover:border-blue-500/30 hover:bg-white/5 rounded-2xl p-6 transition-all group cursor-pointer text-left flex items-center justify-between shadow-lg relative overflow-hidden min-h-[120px]">
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all border border-blue-500/20">
                                            <Layers size={24} className="text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{cls}</h3>
                                            <p className="text-xs text-white/50 mt-1">Pilih kelas untuk melihat mapel</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all relative z-10" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && firebaseSchoolProjects.length > 0 && selectionStep === 2 && (
                    <div className="py-12">
                        <div className="max-w-4xl mx-auto">
                            <button onClick={() => setSelectionStep(1)} className="mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-bold bg-transparent border-none cursor-pointer px-4 py-2 hover:bg-white/5 rounded-xl transition-colors">
                                <ChevronRight size={16} className="rotate-180" /> Kembali ke Pilih Kelas
                            </button>
                            <h2 className="text-2xl font-bold text-center mb-8">Pilih Mata Pelajaran ({selectedClass})</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {mapelOptions.map(mapel => (
                                    <button key={mapel} onClick={() => { setSelectedMapel(mapel); setSelectionStep(3); }} className="w-full glass-card border-white/5 hover:border-blue-500/30 hover:bg-white/5 rounded-2xl p-6 transition-all group cursor-pointer text-left flex items-center justify-between shadow-lg relative overflow-hidden min-h-[120px]">
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all border border-blue-500/20">
                                                <BookOpen size={24} className="text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{mapel}</h3>
                                                <p className="text-xs text-white/50 mt-1">Lihat proyek mapel ini</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all relative z-10" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!loading && firebaseSchoolProjects.length > 0 && selectionStep === 3 && (
                    <div className="mb-10 flex flex-col sm:flex-row items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 gap-4">
                        <button onClick={() => setSelectionStep(2)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-bold rounded-xl transition-all border-none cursor-pointer flex items-center gap-2">
                            <ChevronRight size={16} className="rotate-180" /> Kembali
                        </button>
                        <div className="flex items-center gap-3 text-right sm:text-left">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Filter size={18} />
                            </div>
                            <div className="text-left">
                                <h3 className="text-sm font-bold text-white">Menampilkan Proyek</h3>
                                <p className="text-xs text-white/50">{selectedClass} — {selectedMapel}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Firestore Error State */}
                {!loading && firebaseError && (
                    <div className="text-center py-16">
                        <div className="glass-card border-red-500/20 max-w-xl mx-auto p-8 rounded-2xl">
                            <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
                            <p className="text-red-400 text-sm font-bold mb-2">Gagal mengambil data dari Firebase!</p>
                            <p className="text-white/40 text-xs mb-4">{firebaseError}</p>
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

                {/* Filter Empty State */}
                {!loading && !firebaseError && selectionStep === 3 && filteredSchoolProjects.length === 0 && firebaseSchoolProjects.length > 0 && (
                    <div className="text-center py-16 glass-card border-white/5 max-w-md mx-auto rounded-3xl p-8 mb-12">
                        <FileText size={40} className="mx-auto text-white/20 mb-3" />
                        <p className="text-white/60 text-sm font-medium mb-1">Belum ada LKPD untuk {selectedMapel} - {selectedClass}.</p>
                        <p className="text-white/30 text-xs">Pilih filter mapel lain atau tambahkan data melalui Admin Panel.</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <TerminalLoading message="Memuat data LKPD & Praktikum dari Firebase..." />
                )}

                {/* LKPD & Projects Grid */}
                {!loading && selectionStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSchoolProjects.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="glass-card border-white/5 flex flex-col justify-between group hover:border-blue-500/30 hover:bg-white/5 transition-all relative overflow-hidden text-left"
                        >
                            {/* Card Image Banner */}
                            <div className="h-44 w-full overflow-hidden relative bg-[#070b16] border-b border-white/5 flex items-center justify-center">
                                {item.image && !item.image.includes('0001_0.png') ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800";
                                        }}
                                    />
                                ) : item.fileUrl ? (
                                    <iframe 
                                        src={`${item.fileUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                                        className="w-full h-full border-none pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                                        title={item.title}
                                        scrolling="no"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors">
                                        <Code2 size={40} className="text-blue-500/30 mb-2" />
                                        <span className="text-[10px] font-bold text-blue-400/50 uppercase tracking-widest">No Preview</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-transparent opacity-90" />
                            </div>

                            <div className="p-6">
                                {/* Header Badges */}
                                <div className="flex items-center justify-between gap-2 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                            {item.category || 'School Project'}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                            {getMapelGroup(item.subject, item.title, item.desc)}
                                        </span>
                                    </div>
                                </div>

                                {/* Title & Subject */}
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                                    {item.title}
                                </h3>
                                <p className="text-[11px] font-semibold text-white/40 mb-3 flex items-center gap-1.5">
                                    <BookOpen size={13} className="text-blue-400" /> {item.subject || 'TKJ SMKN 3 Jepara'}
                                </p>
                                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Actions Bar */}
                            <div className="p-4 bg-white/2 border-t border-white/5 flex items-center justify-between gap-2">
                                <button
                                    onClick={() => setActiveProject(item)}
                                    className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors bg-transparent border-none cursor-pointer"
                                >
                                    Lihat Detail & File <ChevronRight size={14} />
                                </button>
                                <div className="flex items-center gap-1.5">
                                    {item.driveUrl && (
                                        <a
                                            href={item.driveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20 flex items-center gap-1 text-[10px] font-bold"
                                            title="Buka Google Drive"
                                        >
                                            <HardDrive size={13} />
                                            <span className="hidden sm:inline">Drive</span>
                                        </a>
                                    )}
                                    {item.videoUrl && (
                                        <a
                                            href={item.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20 flex items-center gap-1 text-[10px] font-bold"
                                            title="Tonton Video Demo"
                                        >
                                            <Video size={13} />
                                            <span className="hidden sm:inline">Video</span>
                                        </a>
                                    )}
                                    {item.fileUrl && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handlePreview(e, item.fileUrl, item.fileName || item.title);
                                            }}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border-none cursor-pointer"
                                            title="Preview PDF"
                                        >
                                            <ExternalLink size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                )}
            </div>

            {/* Modal Detail & Snippet Drawer */}
            {activeProject && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000000] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-3xl overflow-hidden text-left"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 md:p-10 border border-white/15 bg-[#070a14] opacity-100 relative rounded-[28px] sm:rounded-[36px] shadow-[0_0_80px_rgba(0,0,0,0.9)] custom-scrollbar text-left"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveProject(null)}
                                className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10 cursor-pointer shadow-md"
                            >
                                <X size={18} />
                            </button>

                            {/* Modal Header */}
                            <div className="mb-6 pr-8">
                                <div className="flex items-center gap-3 mb-3 flex-wrap">
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20">
                                        {activeProject.category || 'School Project'}
                                    </span>
                                    {getMapelGroup(activeProject.subject, activeProject.title, activeProject.desc) && (
                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/20">
                                            {getMapelGroup(activeProject.subject, activeProject.title, activeProject.desc)}
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

                            {/* Google Drive Link Section */}
                            {activeProject.driveUrl && (
                                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 border border-blue-400/30">
                                            <HardDrive size={20} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs font-bold text-white flex items-center gap-2">
                                                Link Google Drive / Berkas Proyek
                                            </div>
                                            <div className="text-[10px] text-white/50 truncate font-mono mt-0.5">
                                                {activeProject.driveUrl}
                                            </div>
                                        </div>
                                    </div>
                                    <a
                                        href={activeProject.driveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 border-none shrink-0"
                                    >
                                        <ExternalLink size={14} /> Akses Google Drive
                                    </a>
                                </div>
                            )}

                            {/* Video Link & Embed Section */}
                            {activeProject.videoUrl && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 shrink-0 border border-red-400/30">
                                                <Video size={20} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-bold text-white flex items-center gap-2">
                                                    Link Video Demo / Praktikum
                                                </div>
                                                <div className="text-[10px] text-white/50 truncate font-mono mt-0.5">
                                                    {activeProject.videoUrl}
                                                </div>
                                            </div>
                                        </div>
                                        <a
                                            href={activeProject.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30 border-none shrink-0"
                                        >
                                            <Play size={14} /> Tonton / Akses Video
                                        </a>
                                    </div>

                                    {/* Responsive YouTube Embed Preview */}
                                    {getYouTubeEmbedUrl(activeProject.videoUrl) && (
                                        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl mt-3">
                                            <iframe
                                                src={getYouTubeEmbedUrl(activeProject.videoUrl)}
                                                title="Video Demo Proyek"
                                                className="w-full h-full border-none"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}
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
                </AnimatePresence>,
                document.body
            )}

            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isOpen: false })}
            />
        </motion.div>
    );
}
