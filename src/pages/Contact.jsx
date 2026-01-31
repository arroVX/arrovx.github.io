import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Instagram, Send, MapPin, Globe, MessageSquare } from 'lucide-react';
import { useScrambleText, useTilt, useMagnetic } from '../utils/animations';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Toast from '../components/Toast';

const ContactInfo = ({ icon, label, value, href }) => {
    return (
        <motion.a
            href={href}
            target={href?.startsWith('http') ? "_blank" : undefined}
            rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
            whileHover={{ x: 10 }}
            className="flex items-center gap-6 p-6 glass-card border-white/5 hover:bg-white/5 transition-all group"
        >
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-1">{label}</p>
                <p className="text-sm md:text-base font-bold text-white/80">{value}</p>
            </div>
        </motion.a>
    );
};

const MagneticButton = ({ children }) => {
    const ref = useRef(null);
    const { style, onMouseMove, onMouseLeave } = useMagnetic(ref);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    return (
        <div
            ref={ref}
            style={isTouch ? {} : style}
            onMouseMove={isTouch ? null : onMouseMove}
            onMouseLeave={isTouch ? null : onMouseLeave}
            className="inline-block w-full"
        >
            {React.cloneElement(children, { className: `${children.props.className} w-full` })}
        </div>
    );
};

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ isOpen: false, message: '', type: 'success' });
    const titleScramble = useScrambleText("Get in Touch", 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addDoc(collection(db, 'contacts'), {
                ...formState,
                timestamp: serverTimestamp()
            });
            setToast({ isOpen: true, message: "Pesan terkirim! Makasih ya ro, nanti bakal segera aku cek.", type: 'success' });
            setFormState({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Error sending message:", error);
            setToast({ isOpen: true, message: "Waduh, gagal ngirim pesan. Coba cek koneksi kamu ro!", type: 'error' });
        }
        setIsSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-20 px-6 relative z-10 overflow-x-hidden"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-xs font-bold text-blue-400 mb-6 tracking-widest uppercase border-white/5"
                    >
                        <MessageSquare size={14} /> Available for projects
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter italic mb-6">
                        {titleScramble}
                    </h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-lg">
                        Have a project in mind? Or just want to say hi? <br />
                        Feel free to reach out through any of these channels.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Side: Contact Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <ContactInfo
                            icon={<Mail size={24} />}
                            label="Email"
                            value="arroudhilanfi01@gmail.com"
                            href="mailto:arroudhilanfi01@gmail.com"
                        />
                        <ContactInfo
                            icon={<Instagram size={24} />}
                            label="Instagram"
                            value="@jingroo_"
                            href="https://www.instagram.com/jingroo_"
                        />
                        <ContactInfo
                            icon={<Github size={24} />}
                            label="GitHub"
                            value="arroVX"
                            href="https://github.com/arroVX"
                        />
                        <ContactInfo
                            icon={<MapPin size={24} />}
                            label="Location"
                            value="Jepara, Central Java, ID"
                            href="https://maps.google.com/?q=Jepara"
                        />
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="glass-card p-8 md:p-12 border-white/5 space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-medium"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Subject</label>
                                <input
                                    type="text"
                                    required
                                    value={formState.subject}
                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-medium"
                                    placeholder="What's this about?"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Your Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-medium resize-none"
                                    placeholder="Tell me more about your project..."
                                ></textarea>
                            </div>

                            <MagneticButton>
                                <button
                                    disabled={isSubmitting}
                                    className="bg-white text-black py-4 rounded-2xl font-black tracking-widest uppercase text-xs hover:scale-[1.02] active:scale-[0.98] transition-all border-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                                >
                                    {isSubmitting ? (
                                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                            <Globe size={18} />
                                        </motion.div>
                                    ) : (
                                        <>
                                            <Send size={18} /> Send Message
                                        </>
                                    )}
                                </button>
                            </MagneticButton>
                        </motion.form>
                    </div>
                </div>
            </div>
            <Toast
                isOpen={toast.isOpen}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, isOpen: false })}
            />
        </motion.div>
    );
}
