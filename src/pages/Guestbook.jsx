import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { MessageSquare, Send, User, Calendar, Loader2 } from 'lucide-react';
import { useScrambleText, useMagnetic } from '../utils/animations';

const MessageCard = ({ msg }) => {
    const date = msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) : 'Just now';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border-white/5 hover:bg-white/5 transition-all group relative overflow-hidden"
        >
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 shrink-0">
                    <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-white truncate">{msg.name}</h4>
                        <span className="text-[10px] font-medium text-white/20 whitespace-nowrap">{date}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed wrap-break-word">
                        {msg.message}
                    </p>
                </div>
            </div>
            {/* Subtle highlight */}
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 group-hover:bg-blue-500/50 transition-all" />
        </motion.div>
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
            className="inline-block"
        >
            {React.cloneElement(children, { className: `${children.props.className}` })}
        </div>
    );
};

export default function Guestbook() {
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const titleText = useScrambleText("Guestbook", 0);

    useEffect(() => {
        const q = query(collection(db, 'guestbook'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching guestbook:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        setSubmitting(true);
        try {
            await addDoc(collection(db, 'guestbook'), {
                name: name.trim(),
                message: message.trim(),
                timestamp: serverTimestamp()
            });
            setName('');
            setMessage('');
        } catch (error) {
            console.error("Error adding message:", error);
            alert("Gagal mengirim pesan. Pastikan config Firebase sudah benar!");
        }
        setSubmitting(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-32 pb-20 px-6 relative z-10 overflow-x-hidden"
        >
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 glass-card rounded-full text-xs font-bold text-blue-400 mb-6 tracking-widest uppercase border-white/5"
                    >
                        <MessageSquare size={14} /> Leave a message
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic mb-6">
                        {titleText}
                    </h1>
                    <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
                        Say hi, leave a testimonial, or just drop a cool message.
                        Messages are stored permanently in the digital void.
                    </p>
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 md:p-10 mb-16 border-white/5 bg-white/2"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="md:col-span-1 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Username</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jingroo"
                                    required
                                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-medium text-sm"
                                />
                            </div>
                            <div className="md:col-span-3 space-y-2 relative">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Message</label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Web kamu keren banget ro! 🔥"
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-5 py-4 pr-16 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all text-white font-medium text-sm"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 border-none"
                                        >
                                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* Messages List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-white/20">
                            <Loader2 size={40} className="animate-spin mb-4" />
                            <p className="font-bold tracking-widest uppercase text-xs">Synchronizing with Firebase...</p>
                        </div>
                    ) : messages.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg) => (
                                    <MessageCard key={msg.id} msg={msg} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="py-20 text-center glass-card border-dashed border-white/5">
                            <p className="text-white/20 font-bold tracking-widest uppercase text-sm">No messages yet. Be the first!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
    );
}
