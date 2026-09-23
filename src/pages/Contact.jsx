import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, Instagram, MapPin, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Toast from '../components/Toast';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'contacts'), { ...formState, timestamp: serverTimestamp() });
            setToast({ isOpen: true, message: "Pesan terkirim! Bakal segera aku cek.", type: 'success' });
            setFormState({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setToast({ isOpen: true, message: "Gagal mengirim. Cek koneksi.", type: 'error' });
        }
        setIsSubmitting(false);
    };

    return (
        <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-black/40 hover:text-black mb-10">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <div className="text-center max-w-3xl mx-auto mb-14">
                    <p className="mono text-xs tracking-[0.2em] uppercase text-black/40">Contact</p>
                    <h1 className="headline-serif text-5xl md:text-7xl mt-2 leading-none">Get in<br />Touch</h1>
                    <p className="text-black/50 leading-relaxed mt-4">Punya project? Atau cuma mau say hi? Hubungi lewat channel mana saja.</p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
                    <div className="lg:col-span-5 space-y-3">
                        {[
                            { icon: <Mail size={18} />, label: "Email", value: "arroudhilanfi01@gmail.com", href: "mailto:arroudhilanfi01@gmail.com" },
                            { icon: <Instagram size={18} />, label: "Instagram", value: "@jingroo_", href: "https://www.instagram.com/jingroo_" },
                            { icon: <Github size={18} />, label: "GitHub", value: "arroVX", href: "https://github.com/arroVX" },
                            { icon: <MapPin size={18} />, label: "Location", value: "Jepara, Central Java, ID", href: "https://maps.google.com/?q=Jepara" }
                        ].map(info => (
                            <a key={info.label} href={info.href} target={info.href.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 bg-white hover:border-black/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform">{info.icon}</div>
                                <div>
                                    <div className="mono text-xs tracking-widest uppercase text-black/40">{info.label}</div>
                                    <div className="font-medium">{info.value}</div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="lg:col-span-7 rounded-2xl border border-black/5 bg-white p-6 md:p-8 space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="mono text-xs tracking-widest uppercase text-black/40 ml-1">Your Name</label>
                                <input required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:border-black bg-white" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="mono text-xs tracking-widest uppercase text-black/40 ml-1">Email</label>
                                <input required type="email" value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:border-black bg-white" placeholder="john@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="mono text-xs tracking-widest uppercase text-black/40 ml-1">Subject</label>
                            <input required value={formState.subject} onChange={e => setFormState({ ...formState, subject: e.target.value })} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:border-black bg-white" placeholder="What's this about?" />
                        </div>
                        <div>
                            <label className="mono text-xs tracking-widest uppercase text-black/40 ml-1">Message</label>
                            <textarea required rows="5" value={formState.message} onChange={e => setFormState({ ...formState, message: e.target.value })} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:border-black bg-white resize-none" placeholder="Tell me more about your project..." />
                        </div>
                        <button disabled={isSubmitting} className="w-full bg-black text-white py-3.5 rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-black/80 disabled:opacity-50">
                            <Send size={16} /> {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
            <Toast isOpen={toast.isOpen} message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, isOpen: false })} />
        </main>
    );
}
