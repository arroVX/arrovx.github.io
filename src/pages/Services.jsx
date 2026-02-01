import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, Shield, Smartphone, Globe, Code, PenTool } from 'lucide-react';

const services = [
    {
        icon: <PenTool className="text-blue-400" />,
        title: "Graphic Design",
        desc: "High-impact poster designs, branding materials, and visual assets tailored for your needs."
    },
    {
        icon: <Server className="text-purple-400" />,
        title: "Network Infrastructure",
        desc: "Designing and configuring secure server architectures and corporate network systems."
    },
    {
        icon: <Smartphone className="text-pink-400" />,
        title: "UI/UX Design",
        desc: "Creating intuitive and modern digital interfaces with focus on user experience."
    },
    {
        icon: <Code className="text-emerald-400" />,
        title: "Web Development",
        desc: "Building responsive and performant websites using modern technologies like React."
    }
];

export default function Services() {
    return (
        <main className="relative z-10 pt-32 pb-20 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Expertise <span className="text-linear">& Services.</span></h1>
                    <p className="text-xl text-white/50 leading-relaxed">
                        Combining technical networking skills with creative design to provide comprehensive digital solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="glass-card p-10 group hover:bg-white/5 transition-colors border-white/5"
                        >
                            <div className="mb-6 w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {s.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                            <p className="text-white/40 leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
