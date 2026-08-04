import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock, ShieldCheck, Plus, Edit2, Trash2, Save, X,
    FolderKanban, BookOpen, Layers, Check, ExternalLink,
    AlertCircle, Sparkles, RefreshCw, LogOut, Code2, UploadCloud, Loader2,
    Upload, FileText, Image as ImageIcon, File, Paperclip, CheckCircle,
    HardDrive, Video, Play, Link as LinkIcon, MessageSquare, Mail, User, Clock, Inbox, Send, Eye
} from 'lucide-react';
import { db } from '../firebase';
import {
    collection, onSnapshot, addDoc, updateDoc, deleteDoc,
    doc
} from 'firebase/firestore';
import Toast from '../components/Toast';
import TerminalLoading from '../components/TerminalLoading';

// Default initial projects seed if Firestore is empty
const defaultProjectsSeed = [
    {
        title: "Liga Korupsi Indonesia",
        category: "Poster Design",
        image: "project-assets/images/0001_0.png",
        desc: "Poster investigatif komparatif korupsi Indonesia 2024-2025.",
        longDesc: "Program visual ini dirancang untuk mempermudah masyarakat dalam memahami skala kasus korupsi di Indonesia melalui desain poster investigatif yang futuristik.",
        tech: ["Photoshop", "Typography", "Infographics"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        title: "Visual Flow Series",
        category: "Abstract Art",
        image: "project-assets/images/0001_0(1).png",
        desc: "Eksplorasi eksperimental bentuk dan tekstur seni abstrak digital.",
        longDesc: "Serial eksplorasi visual yang menggabungkan elemen organik dan digital dengan kontras warna yang dinamis.",
        tech: ["Photoshop", "Digital Art"],
        liveUrl: "#",
        githubUrl: "#"
    },
    {
        title: "Modern Event Flyer",
        category: "Graphic Design",
        image: "project-assets/images/0002_40.png",
        desc: "Desain flyer modern & futuristik untuk acara teknologi & musik.",
        longDesc: "Flyer visual berakurasi tinggi dengan prinsip tata letak tipografi bersih dan modern.",
        tech: ["Illustrator", "Photoshop"],
        liveUrl: "#",
        githubUrl: "#"
    }
];

export default function Admin() {
    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('arro_admin_auth') === 'true';
    });
    const [passcode, setPasscode] = useState('');
    const [passError, setPassError] = useState(false);

    // Data States from Firebase
    const [projects, setProjects] = useState([]);
    const [schoolProjects, setSchoolProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('projects');
    const [loading, setLoading] = useState(true);
    const [firebaseErrorMsg, setFirebaseErrorMsg] = useState('');

    // Form Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalError, setModalError] = useState('');

    // File Upload Progress States
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingPdf, setUploadingPdf] = useState(false);
    const [imgProgress, setImgProgress] = useState(0);
    const [pdfProgress, setPdfProgress] = useState(0);

    // Form Fields
    const [formData, setFormData] = useState({
        title: '',
        category: 'Graphic Design',
        classLevel: '',
        image: 'project-assets/images/0001_0.png',
        desc: '',
        longDesc: '',
        tech: '',
        liveUrl: '',
        githubUrl: '',
        subject: '',
        grade: '100 / A+',
        snippet: '',
        fileUrl: '', // Attachment PDF / File URL
        fileName: '',
        driveUrl: '',
        videoUrl: ''
    });

    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });
    const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' });

    useEffect(() => {
        if (isModalOpen || deleteConfirm?.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen, deleteConfirm?.isOpen]);

    // Handle Auth Login
    const handleLogin = (e) => {
        e.preventDefault();
        if (passcode === 'arro2025' || passcode === '1234' || passcode === 'admin123') {
            setIsAuthenticated(true);
            sessionStorage.setItem('arro_admin_auth', 'true');
            setPassError(false);
            setToast({ isOpen: true, message: "Akses Admin Berhasil!", type: 'success' });
        } else {
            setPassError(true);
            setToast({ isOpen: true, message: "PIN Admin Salah!", type: 'error' });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('arro_admin_auth');
        setToast({ isOpen: true, message: "Logout dari Admin Mode.", type: 'info' });
    };

    // Firebase Realtime Listeners
    useEffect(() => {
        if (!isAuthenticated) return;

        setLoading(true);
        setFirebaseErrorMsg('');

        // Listen for main projects
        const unsubProjects = onSnapshot(collection(db, "projects"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(list);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching projects:", error);
            setFirebaseErrorMsg(error.message);
            setLoading(false);
        });

        // Listen for school projects
        const unsubSchool = onSnapshot(collection(db, "school_projects"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSchoolProjects(list);
        }, (error) => {
            console.error("Error fetching school_projects:", error);
            setFirebaseErrorMsg(error.message);
        });

        // Listen for incoming contact messages
        const unsubContacts = onSnapshot(collection(db, "contacts"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            list.sort((a, b) => {
                const getTime = (item) => {
                    if (item.timestamp?.seconds) return item.timestamp.seconds * 1000;
                    if (item.createdAt) return new Date(item.createdAt).getTime();
                    return 0;
                };
                return getTime(b) - getTime(a);
            });
            setMessages(list);
        }, (error) => {
            console.error("Error fetching contacts:", error);
        });

        return () => {
            unsubProjects();
            unsubSchool();
            unsubContacts();
        };
    }, [isAuthenticated]);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Baru Saja';
        if (timestamp.seconds) {
            return new Date(timestamp.seconds * 1000).toLocaleString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        const d = new Date(timestamp);
        if (!isNaN(d.getTime())) {
            return d.toLocaleString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return 'Baru Saja';
    };

    // Handle File Upload — Direct FileReader (always works, no Firebase Storage needed)
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        const isImage = type === 'image';
        const maxSizeMB = 1; // Max 1MB for Firestore document field

        if (isImage) {
            setUploadingImage(true);
            setImgProgress(20);

            // For images: compress via canvas if too large, then store as data URL
            if (file.size > maxSizeMB * 1024 * 1024) {
                // Compress large image
                const img = new Image();
                const url = URL.createObjectURL(file);
                img.onload = () => {
                    setImgProgress(50);
                    const canvas = document.createElement('canvas');
                    const maxDim = 800;
                    let w = img.width, h = img.height;
                    if (w > maxDim || h > maxDim) {
                        if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
                        else { w = Math.round(w * maxDim / h); h = maxDim; }
                    }
                    canvas.width = w;
                    canvas.height = h;
                    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                    const compressed = canvas.toDataURL('image/jpeg', 0.7);
                    setImgProgress(100);
                    setFormData(prev => ({ ...prev, image: compressed }));
                    setUploadingImage(false);
                    URL.revokeObjectURL(url);
                    setToast({ isOpen: true, message: `Gambar "${file.name}" berhasil diunggah & dikompres!`, type: 'success' });
                };
                img.onerror = () => {
                    setUploadingImage(false);
                    URL.revokeObjectURL(url);
                    setToast({ isOpen: true, message: "Gagal membaca file gambar.", type: 'error' });
                };
                img.src = url;
            } else {
                // Small image — read directly
                const reader = new FileReader();
                reader.onprogress = (evt) => {
                    if (evt.lengthComputable) setImgProgress(Math.round((evt.loaded / evt.total) * 100));
                };
                reader.onloadend = () => {
                    setImgProgress(100);
                    setFormData(prev => ({ ...prev, image: reader.result }));
                    setUploadingImage(false);
                    setToast({ isOpen: true, message: `Gambar "${file.name}" berhasil diunggah!`, type: 'success' });
                };
                reader.onerror = () => {
                    setUploadingImage(false);
                    setToast({ isOpen: true, message: "Gagal membaca file gambar.", type: 'error' });
                };
                reader.readAsDataURL(file);
            }
        } else {
            // PDF / Document
            setUploadingPdf(true);
            setPdfProgress(20);

            const reader = new FileReader();
            reader.onprogress = (evt) => {
                if (evt.lengthComputable) setPdfProgress(Math.round((evt.loaded / evt.total) * 100));
            };
            reader.onloadend = () => {
                setPdfProgress(100);
                setFormData(prev => ({ ...prev, fileUrl: reader.result, fileName: file.name }));
                setUploadingPdf(false);
                setToast({ isOpen: true, message: `File "${file.name}" berhasil diunggah!`, type: 'success' });
            };
            reader.onerror = () => {
                setUploadingPdf(false);
                setToast({ isOpen: true, message: "Gagal membaca file dokumen.", type: 'error' });
            };
            reader.readAsDataURL(file);
        }
    };

    // Open Modal for Create or Edit
    const handleOpenModal = (item = null) => {
        setModalError('');
        setImgProgress(0);
        setPdfProgress(0);

        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title || '',
                category: item.category || (activeTab === 'projects' ? 'Graphic Design' : 'LKPD & Jaringan'),
                classLevel: item.classLevel || '',
                image: item.image || 'project-assets/images/0001_0.png',
                desc: item.desc || '',
                longDesc: item.longDesc || '',
                tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech || '',
                liveUrl: item.liveUrl || item.links?.live || '',
                githubUrl: item.githubUrl || item.links?.github || '',
                subject: item.subject || '',
                grade: item.grade || '100 / A+',
                snippet: item.snippet || '',
                fileUrl: item.fileUrl || '',
                fileName: item.fileName || '',
                driveUrl: item.driveUrl || '',
                videoUrl: item.videoUrl || ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                category: activeTab === 'projects' ? 'Graphic Design' : 'LKPD & Jaringan',
                classLevel: '',
                image: 'project-assets/images/0001_0.png',
                desc: '',
                longDesc: '',
                tech: 'Photoshop, React, Tailwind',
                liveUrl: '',
                githubUrl: '',
                subject: '',
                grade: '100 / A+',
                snippet: '',
                fileUrl: '',
                fileName: '',
                driveUrl: '',
                videoUrl: ''
            });
        }
        setIsModalOpen(true);
    };

    // Submit Create or Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalError('');

        if (!formData.title.trim()) {
            setModalError('Judul proyek tidak boleh kosong.');
            return;
        }

        setIsSubmitting(true);

        try {
            const collectionName = activeTab === 'projects' ? 'projects' : 'school_projects';

            const payload = {
                title: formData.title,
                category: formData.category,
                classLevel: formData.classLevel || '',
                desc: formData.desc,
                longDesc: formData.longDesc || formData.desc,
                image: formData.image || 'project-assets/images/0001_0.png',
                tech: formData.tech.split(',').map(t => t.trim()).filter(Boolean),
                fileUrl: formData.fileUrl || '',
                fileName: formData.fileName || '',
                driveUrl: formData.driveUrl || '',
                videoUrl: formData.videoUrl || '',
                updatedAt: new Date().toISOString()
            };

            if (activeTab === 'projects') {
                payload.liveUrl = formData.liveUrl || '#';
                payload.githubUrl = formData.githubUrl || '#';
            } else {
                payload.subject = formData.subject || 'TKJ SMKN 3 Jepara';
                payload.grade = formData.grade || '100 / A+';
                payload.snippet = formData.snippet || '';
            }

            if (editingItem) {
                await updateDoc(doc(db, collectionName, editingItem.id), payload);
                setToast({ isOpen: true, message: "Proyek berhasil diperbarui di Firebase!", type: 'success' });
            } else {
                payload.createdAt = new Date().toISOString();
                await addDoc(collection(db, collectionName), payload);
                setToast({ isOpen: true, message: "Proyek baru berhasil ditambahkan ke Firebase!", type: 'success' });
            }

            setIsSubmitting(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Firestore Save Error:", error);
            setIsSubmitting(false);
            setModalError("Firebase Error: " + error.message);
            setToast({ isOpen: true, message: "Gagal menyimpan: " + error.message, type: 'error' });
        }
    };

    // Open delete confirmation modal
    const handleDelete = (id, title) => {
        setDeleteConfirm({ isOpen: true, id, title });
    };

    // Execute Delete
    const handleExecuteDelete = async () => {
        if (!deleteConfirm.id) return;
        const { id, title } = deleteConfirm;
        setDeleteConfirm({ isOpen: false, id: null, title: '' });

        try {
            const collectionName = activeTab === 'projects' ? 'projects' : (activeTab === 'school' ? 'school_projects' : 'contacts');
            await deleteDoc(doc(db, collectionName, id));
            setToast({ isOpen: true, message: `"${title || 'Pesan'}" berhasil dihapus.`, type: 'success' });
        } catch (error) {
            console.error("Delete Error:", error);
            setToast({ isOpen: true, message: "Gagal menghapus data: " + error.message, type: 'error' });
        }
    };

    // Seed Initial Data to Firebase
    const handleSeedInitialData = async () => {
        setIsSubmitting(true);
        try {
            for (const proj of defaultProjectsSeed) {
                await addDoc(collection(db, 'projects'), {
                    ...proj,
                    createdAt: new Date().toISOString()
                });
            }
            setIsSubmitting(false);
            setToast({ isOpen: true, message: "Proyek bawaan berhasil di-seed ke Firebase!", type: 'success' });
        } catch (err) {
            setIsSubmitting(false);
            setToast({ isOpen: true, message: "Gagal me-seed: " + err.message, type: 'error' });
        }
    };

    // LOGIN SCREEN
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-36 pb-24 px-6 flex items-center justify-center relative z-10 text-white">
                {/* Ambient glows */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-lg"
                >
                    {/* Terminal Window */}
                    <div className="bg-[#070a12]/95 border border-blue-500/20 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(37,99,235,0.18)] backdrop-blur-2xl font-mono">

                        {/* Header Bar */}
                        <div className="px-5 py-4 bg-[#0c101c] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-blue-400 font-bold text-sm select-none">&gt;_</span>
                                <div>
                                    <div className="text-xs font-bold tracking-wider text-white/90">
                                        ARROOS COMMAND LINE
                                    </div>
                                    <div className="text-[9px] font-semibold text-blue-400/80 tracking-widest uppercase">
                                        ADMIN ACCESS — AUTHORIZED ONLY
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Console Body */}
                        <div className="p-6 space-y-4 text-xs leading-relaxed min-h-[260px]">
                            {/* Boot messages */}
                            <div className="space-y-1">
                                <div className="text-white/60 font-semibold">ArroOS v2.0.26 [Authorized Access Only]</div>
                                <div className="text-white/40">Secure shell session started. Authentication required.</div>
                                <div className="text-white/40">Type your admin PIN to continue.</div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-white/5" />

                            {/* Command history — login attempt feedback */}
                            {passError && (
                                <motion.div
                                    initial={{ opacity: 0, x: -4 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-1"
                                >
                                    <div className="flex items-center gap-2 text-white/70">
                                        <span className="text-blue-400 font-bold">&gt;</span>
                                        <span>auth --pin ••••••••</span>
                                    </div>
                                    <div className="pl-4 text-red-400/90 flex items-center gap-2">
                                        <span className="text-red-500 font-bold">[DENIED]</span> Incorrect PIN. Access refused. Try again.
                                    </div>
                                </motion.div>
                            )}

                            {/* Password Input styled as terminal prompt */}
                            <form onSubmit={handleLogin} className="space-y-3">
                                <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 transition-all ${passError ? 'border-red-500/50 bg-red-500/5' : 'border-blue-500/30 bg-white/3 focus-within:border-blue-400/60'}`}>
                                    <span className="text-blue-400 font-bold shrink-0">&gt;</span>
                                    <span className="text-white/40 shrink-0">auth --pin</span>
                                    <input
                                        type="password"
                                        value={passcode}
                                        onChange={(e) => setPasscode(e.target.value)}
                                        placeholder="enter passcode..."
                                        className="flex-1 bg-transparent text-white placeholder-white/20 focus:outline-none text-xs font-mono tracking-widest min-w-0"
                                        autoFocus
                                    />
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 0.7 }}
                                        className="inline-block w-1.5 h-3.5 bg-blue-400 shrink-0 shadow-[0_0_6px_rgba(59,130,246,0.9)]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-400/60 text-blue-400 font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span className="text-blue-400">&gt;_</span> Execute Auth Command
                                </button>
                            </form>
                        </div>

                        {/* Footer Bar */}
                        <div className="px-5 py-3 bg-[#0c101c]/90 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5 font-bold text-blue-400/90">
                                    <ShieldCheck size={11} className="text-blue-400" /> ENCRYPTED SESSION
                                </span>
                                <span className="font-semibold tracking-wider text-white/30 hidden sm:inline">
                                    USER@ARRO-PC:~$
                                </span>
                            </div>
                            <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-bold text-white/40 tracking-wider flex items-center gap-1.5">
                                <Lock size={10} /> ADMIN PORTAL
                            </div>
                        </div>

                    </div>

                    {/* Hint below */}
                    <div className="mt-4 text-center text-[11px] text-white/20 font-mono">
                        Default PIN: <span className="text-blue-400/60">arro2025</span>
                    </div>
                </motion.div>

                <Toast
                    isOpen={toast.isOpen}
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, isOpen: false })}
                />
            </div>
        );
    }


    const currentList = activeTab === 'projects' ? projects : schoolProjects;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-32 pb-24 px-4 md:px-8 relative z-10 text-white max-w-7xl mx-auto"
        >
            {/* Header Dashboard */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs font-mono font-bold text-blue-400 mb-3">
                        <ShieldCheck size={14} /> FIREBASE ADMIN DASHBOARD — PROJECT: rojing-54fcd
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Manajemen Proyek & LKPD
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {activeTab !== 'messages' && (
                        <button
                            onClick={() => handleOpenModal()}
                            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 border-none cursor-pointer flex-1 md:flex-initial"
                        >
                            <Plus size={16} /> Tambah {activeTab === 'projects' ? 'Proyek' : 'LKPD'}
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/60 hover:text-red-400 font-semibold text-xs transition-all border border-white/10 cursor-pointer flex items-center gap-1.5"
                        title="Logout"
                    >
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </div>

            {/* Error Notification Alert for Firestore Rules */}
            {firebaseErrorMsg && (
                <div className="p-4 mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl text-left text-xs text-red-300 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-red-400">
                        <AlertCircle size={18} /> Error Izin Firestore (Permission Denied)
                    </div>
                    <p>
                        Database Firestore kamu di Firebase Console memblokir akses baca/tulis.
                    </p>
                    <div className="bg-black/40 p-3 rounded-xl font-mono text-[11px] text-white/80">
                        1. Buka <b>https://console.firebase.google.com/</b> ➔ Pilih Project <b>rojing-54fcd</b><br />
                        2. Pilih <b>Firestore Database</b> ➔ Tab <b>Rules</b><br />
                        3. Ubah aturan menjadi: <code className="text-emerald-400">allow read, write: if true;</code><br />
                        4. Klik tombol <b>Publish</b>.
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-none flex items-center gap-2 cursor-pointer ${activeTab === 'projects'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-white/5 text-white/40 hover:text-white'
                        }`}
                >
                    <FolderKanban size={16} /> Proyek Utama ({projects.length})
                </button>
                <button
                    onClick={() => setActiveTab('school')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-none flex items-center gap-2 cursor-pointer ${activeTab === 'school'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-white/5 text-white/40 hover:text-white'
                        }`}
                >
                    <BookOpen size={16} /> School Project ({schoolProjects.length})
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border-none flex items-center gap-2 cursor-pointer ${activeTab === 'messages'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-white/5 text-white/40 hover:text-white'
                        }`}
                >
                    <MessageSquare size={16} /> Pesan Masuk / Get In Touch ({messages.length})
                </button>
            </div>

            {/* Empty State Banner with Seed Button */}
            {activeTab === 'projects' && projects.length === 0 && !loading && (
                <div className="glass-card p-8 text-center border-white/10 mb-8 max-w-xl mx-auto">
                    <UploadCloud size={40} className="mx-auto text-blue-400 mb-3" />
                    <h3 className="text-lg font-bold mb-2">Koleksi Firebase Masih Kosong</h3>
                    <p className="text-xs text-white/50 mb-6 leading-relaxed">
                        Klik tombol di bawah ini untuk memasukkan proyek bawaan secara otomatis ke Firebase Firestore kamu.
                    </p>
                    <button
                        onClick={handleSeedInitialData}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all border-none cursor-pointer inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                        Seed Proyek Bawaan ke Firebase
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <TerminalLoading message="Menghubungkan ke ArroOS Firestore kernel..." />
            )}

            {/* List Table / Cards Grid for Projects & School Projects */}
            {activeTab !== 'messages' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentList.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 border-white/10 bg-[#070b16]/90 flex flex-col justify-between group hover:border-blue-500/40 transition-all relative text-left"
                        >
                            <div>
                                {/* Badges */}
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                                        {item.category || 'General'}
                                    </span>
                                </div>

                                {/* Title & Description */}
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors leading-snug">
                                    {item.title}
                                </h3>

                                {item.subject && (
                                    <p className="text-xs text-white/40 mb-3 font-medium flex items-center gap-1.5">
                                        <BookOpen size={12} className="text-blue-400" /> {item.subject}
                                    </p>
                                )}

                                <p className="text-xs text-white/60 leading-relaxed mb-4 line-clamp-3">
                                    {item.desc}
                                </p>

                                {/* File Attachment indicator if exists */}
                                {item.fileUrl && (
                                    <div className="mb-4 px-3 py-2 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-between text-xs text-blue-300">
                                        <span className="flex items-center gap-1.5 truncate">
                                            <Paperclip size={14} className="shrink-0" />
                                            <span className="truncate">{item.fileName || 'Lampiran File/PDF'}</span>
                                        </span>
                                        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white font-bold text-[10px] underline ml-2 shrink-0">
                                            Buka
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Tech tags & Actions */}
                            <div>
                                {item.tech && (
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {(Array.isArray(item.tech) ? item.tech : String(item.tech).split(',')).map((t, idx) => (
                                            <span key={idx} className="px-2 py-0.5 bg-white/5 rounded-md text-[10px] font-mono text-white/50 border border-white/5">
                                                {t.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="flex-1 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition-all border border-blue-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                                    >
                                        <Edit2 size={13} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, item.title)}
                                        className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold transition-all border border-red-500/20 flex items-center justify-center cursor-pointer"
                                        title="Hapus"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* PESAN MASUK / CONTACT MESSAGES TAB */}
            {activeTab === 'messages' && (
                <div>
                    {messages.length === 0 && !loading ? (
                        <div className="glass-card p-12 text-center border-white/10 max-w-lg mx-auto rounded-3xl">
                            <Mail size={44} className="mx-auto text-blue-400/60 mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">Belum Ada Pesan Masuk</h3>
                            <p className="text-xs text-white/40 leading-relaxed">
                                Pesan yang dikirim pengunjung melalui formulir <b>Get In Touch</b> di halaman Contact/Home akan otomatis muncul secara realtime di sini.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {messages.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-card p-6 border-white/10 bg-[#070b16]/90 flex flex-col justify-between group hover:border-blue-500/40 transition-all relative text-left"
                                >
                                    <div>
                                        {/* Header info */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-1">
                                                <Mail size={12} /> Pesan Masuk
                                            </span>
                                            <span className="text-[10px] font-mono text-white/40 flex items-center gap-1">
                                                <Clock size={11} /> {formatDate(item.timestamp || item.createdAt)}
                                            </span>
                                        </div>

                                        {/* Sender Name & Email */}
                                        <div className="mb-3">
                                            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                                <User size={15} className="text-blue-400 shrink-0" />
                                                <span className="truncate">{item.name || 'Pengunjung Anonim'}</span>
                                            </h3>
                                            {item.email && (
                                                <a
                                                    href={`mailto:${item.email}`}
                                                    className="text-xs text-blue-400/80 hover:text-blue-300 font-mono underline block mt-0.5 truncate"
                                                >
                                                    {item.email}
                                                </a>
                                            )}
                                        </div>

                                        {/* Subject if exists */}
                                        {item.subject && (
                                            <div className="mb-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 text-xs text-white/80 font-semibold truncate">
                                                Subjek: <span className="text-blue-300">{item.subject}</span>
                                            </div>
                                        )}

                                        {/* Message Body */}
                                        <p className="text-xs text-white/70 leading-relaxed mb-4 line-clamp-4 bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                                            "{item.message}"
                                        </p>
                                    </div>

                                    {/* Card Actions */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                        <button
                                            onClick={() => setSelectedMessage(item)}
                                            className="flex-1 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs font-bold transition-all border border-blue-500/30 flex items-center justify-center gap-1.5 cursor-pointer"
                                        >
                                            <Eye size={13} /> Baca Detail
                                        </button>
                                        {item.email && (
                                            <a
                                                href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject || 'Pesan Portofolio')}`}
                                                className="py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white text-xs font-bold transition-all border border-emerald-500/20 flex items-center justify-center gap-1 cursor-pointer no-underline"
                                                title="Balas via Email"
                                            >
                                                <Send size={13} /> Balas
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleDelete(item.id, item.name ? `Pesan dari ${item.name}` : 'Pesan')}
                                            className="py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold transition-all border border-red-500/20 flex items-center justify-center cursor-pointer"
                                            title="Hapus Pesan"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* DETAIL MESSAGE MODAL */}
            {selectedMessage && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl text-left"
                        onClick={() => setSelectedMessage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card max-w-2xl w-full p-6 md:p-8 rounded-3xl border-white/15 bg-[#070a14] opacity-100 relative shadow-2xl space-y-6"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10 cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <div className="pr-8">
                                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                                    <Mail size={14} /> PESAN MASUK — GET IN TOUCH
                                </div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <User size={22} className="text-blue-400" /> {selectedMessage.name || 'Pengunjung Anonim'}
                                </h2>
                                <p className="text-xs text-white/40 mt-1 flex items-center gap-3">
                                    <span>Email: <a href={`mailto:${selectedMessage.email}`} className="text-blue-400 underline">{selectedMessage.email}</a></span>
                                    <span>•</span>
                                    <span>{formatDate(selectedMessage.timestamp || selectedMessage.createdAt)}</span>
                                </p>
                            </div>

                            {selectedMessage.subject && (
                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs text-blue-300 font-semibold">
                                    Subjek: {selectedMessage.subject}
                                </div>
                            )}

                            <div>
                                <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Isi Pesan</h4>
                                <div className="bg-[#040711] p-5 rounded-2xl border border-white/10 text-sm text-white/90 leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto custom-scrollbar">
                                    {selectedMessage.message}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                                <button
                                    onClick={() => handleDelete(selectedMessage.id, selectedMessage.name ? `Pesan dari ${selectedMessage.name}` : 'Pesan')}
                                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold rounded-xl transition-all border border-red-500/20 flex items-center gap-1.5 cursor-pointer"
                                >
                                    <Trash2 size={14} /> Hapus Pesan Ini
                                </button>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedMessage(null)}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-bold rounded-xl transition-all border-none cursor-pointer"
                                    >
                                        Tutup
                                    </button>
                                    {selectedMessage.email && (
                                        <a
                                            href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Pesan Portofolio')}`}
                                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 border-none cursor-pointer no-underline"
                                        >
                                            <Send size={14} /> Balas via Email
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}

            {/* FORM MODAL FOR CREATE & EDIT */}
            {isModalOpen && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-3xl overflow-hidden"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl max-h-[80vh] md:max-h-[85vh] overflow-y-auto p-6 md:p-10 border border-white/10 bg-[#070a14] opacity-100 relative rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.9)] custom-scrollbar text-left"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all border border-white/10 cursor-pointer shadow-md"
                            >
                                <X size={18} />
                            </button>

                            <h2 className="text-2xl font-bold mb-1">
                                {editingItem ? 'Edit Data Proyek' : 'Tambah Proyek Baru'} ({activeTab === 'projects' ? 'Proyek Utama' : 'LKPD Sekolah'})
                            </h2>
                            <p className="text-xs text-white/40 mb-6">
                                Data & lampiran file akan tersimpan ke Firebase Firestore & Storage secara realtime.
                            </p>

                            {modalError && (
                                <div className="p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                                    <AlertCircle size={16} className="text-red-400 shrink-0" />
                                    <span>{modalError}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                        Judul Proyek / LKPD *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Contoh: Liga Korupsi Indonesia / LKPD 01 Konfigurasi VLAN"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                            Kategori
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            placeholder="Poster Design / LKPD & Jaringan"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                            Kelas
                                        </label>
                                        <select
                                            value={formData.classLevel}
                                            onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-[#0a0f1e]">-- Pilih Kelas --</option>
                                            <option value="Kelas X" className="bg-[#0a0f1e]">Kelas X</option>
                                            <option value="Kelas XI" className="bg-[#0a0f1e]">Kelas XI</option>
                                            <option value="Kelas XII" className="bg-[#0a0f1e]">Kelas XII</option>
                                        </select>
                                    </div>
                                </div>

                                {/* UPLOAD GAMBAR SAN FILE SECTION */}
                                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-2xl space-y-4">
                                    <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
                                        <Upload size={16} /> FITUR UPLOAD GAMBAR & FILE PDF
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Upload Gambar */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-white/70 mb-1.5 flex items-center gap-1.5">
                                                <ImageIcon size={13} className="text-blue-400" /> Upload Gambar (PNG/JPG/WEBP)
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'image')}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white/70 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                                            />
                                            {uploadingImage && (
                                                <div className="mt-2 text-[10px] text-blue-400 flex items-center gap-2">
                                                    <Loader2 size={12} className="animate-spin" /> Uploading Gambar... {imgProgress}%
                                                </div>
                                            )}
                                        </div>

                                        {/* Upload Dokumen/PDF */}
                                        <div>
                                            <label className="block text-[11px] font-bold text-white/70 mb-1.5 flex items-center gap-1.5">
                                                <FileText size={13} className="text-emerald-400" /> Upload Lampiran (PDF / File)
                                            </label>
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx,.zip"
                                                onChange={(e) => handleFileUpload(e, 'pdf')}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-2 text-xs text-white/70 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
                                            />
                                            {uploadingPdf && (
                                                <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-2">
                                                    <Loader2 size={12} className="animate-spin" /> Uploading PDF... {pdfProgress}%
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Preview Result Status */}
                                    {(formData.image && formData.image !== 'project-assets/images/0001_0.png') || formData.fileUrl ? (
                                        <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs">
                                            {formData.image && !formData.image.startsWith('project-assets') && (
                                                <div className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                                    <CheckCircle size={14} /> Gambar Terpasang
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setFormData({...formData, image: 'project-assets/images/0001_0.png'})}
                                                        className="ml-2 p-1 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-md transition-all border border-transparent hover:border-red-400"
                                                        title="Hapus Gambar"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            )}
                                            {formData.fileUrl && (
                                                <div className="flex items-center gap-2 text-emerald-400 font-medium max-w-xs bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                                    <Paperclip size={14} className="shrink-0" /> 
                                                    <span className="truncate">{formData.fileName || 'PDF Terpasang'}</span>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => setFormData({...formData, fileUrl: '', fileName: ''})}
                                                        className="ml-2 p-1 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-md transition-all shrink-0 border border-transparent hover:border-red-400"
                                                        title="Hapus Lampiran"
                                                    >
                                                        <Trash2 size={13} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ) : null}
                                </div>

                                {/* LINK DRIVE & LINK VIDEO SECTION */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/3 border border-white/10 rounded-2xl">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1 flex items-center gap-1.5">
                                            <HardDrive size={14} className="text-blue-400" /> Link Google Drive (Opsional)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.driveUrl}
                                            onChange={(e) => setFormData({ ...formData, driveUrl: e.target.value })}
                                            placeholder="https://drive.google.com/..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                        />
                                        <p className="text-[10px] text-white/30 mt-1">Paste link Google Drive file/folder proyek</p>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-1 flex items-center gap-1.5">
                                            <Video size={14} className="text-red-400" /> Link Video / Demo (Opsional)
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.videoUrl}
                                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                            placeholder="https://youtube.com/watch?v=... atau link video"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                        />
                                        <p className="text-[10px] text-white/30 mt-1">Paste link YouTube atau video praktikum</p>
                                    </div>
                                </div>

                                {activeTab === 'school' && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                            Mata Pelajaran (Subject)
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            placeholder="Administrasi Infrastruktur Jaringan (AIJ)"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                        Deskripsi Singkat Proyek
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={formData.desc}
                                        onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                        placeholder="Ringkasan penjelasan proyek..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                        Tech Stack (Pisahkan dengan Koma)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tech}
                                        onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                                        placeholder="Photoshop, React, Tailwind CSS, Cisco"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>

                                {activeTab === 'school' && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                                            Kode / Konfigurasi Snippet (Opsional)
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={formData.snippet}
                                            onChange={(e) => setFormData({ ...formData, snippet: e.target.value })}
                                            placeholder="! Konfigurasi Switch Cisco..."
                                            className="w-full bg-[#050811] border border-white/10 rounded-xl p-3 font-mono text-xs text-blue-300 focus:outline-none focus:border-blue-500"
                                        />
                                    </div>
                                )}

                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 rounded-xl bg-white/5 text-white/60 text-xs font-bold hover:bg-white/10 transition-all border-none cursor-pointer"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || uploadingImage || uploadingPdf}
                                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 border-none cursor-pointer flex items-center gap-2"
                                    >
                                        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                                        Simpan ke Firebase
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}

            {/* CUSTOM DELETE CONFIRMATION MODAL */}
            {deleteConfirm.isOpen && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
                        onClick={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card max-w-md w-full p-6 md:p-8 rounded-3xl border-red-500/20 bg-[#070a14] opacity-100 relative shadow-2xl text-center"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
                                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all border-none cursor-pointer"
                            >
                                <X size={16} />
                            </button>

                            {/* Warning Icon Container */}
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                <Trash2 size={28} />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                Hapus Proyek Ini?
                            </h3>
                            <p className="text-xs text-white/60 leading-relaxed mb-6">
                                Apakah Anda yakin ingin menghapus <span className="text-red-400 font-semibold font-mono bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">"{deleteConfirm.title}"</span>? Data yang dihapus dari Firebase tidak dapat dikembalikan.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
                                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs transition-all border border-white/10 cursor-pointer"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleExecuteDelete}
                                    className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all shadow-lg shadow-red-600/30 border-none cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={14} /> Ya, Hapus Data
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
