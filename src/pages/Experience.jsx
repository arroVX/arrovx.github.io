import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, Award, GraduationCap } from 'lucide-react';

const experiences = [
    {
        year: "2023 - Present",
        title: "SMKN 3 Jepara Student",
        company: "Voctational High School",
        desc: "Specializing in Computer and Network Engineering (TKJ). Actively participating in national-level informatics competitions.",
        icon: <GraduationCap className="text-blue-400" />
    },
    {
        year: "2024",
        title: "Freelance Graphic Designer",
        company: "Remote / Individual Projects",
        desc: "Designing posters, branding kits, and social media assets for various local and international clients.",
        icon: <Briefcase className="text-purple-400" />
    },
    {
        year: "2025",
        title: "Gold Medalist @ FSBN",
        company: "National Informatics Competition",
        desc: "Ranked 1st in the Informatics category at the Festival Sains & Budaya Nasional (FSBN).",
        icon: <Award className="text-yellow-400" />
    }
];

export default function Experience() {
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
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Career <span className="text-linear">& Journey.</span></h1>
                    <p className="text-xl text-white/50 leading-relaxed">
                        A track record of technical growth, creative exploration, and competitive achievements.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 md:p-12 relative overflow-hidden group border-white/5"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-8">
                                <div className="p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                                    {exp.icon}
                                </div>
                                <div>
                                    <span className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2 block">{exp.year}</span>
                                    <h3 className="text-3xl font-bold mb-2">{exp.title}</h3>
                                    <p className="text-lg font-bold text-white/60 mb-6">{exp.company}</p>
                                    <p className="text-white/40 leading-relaxed max-w-2xl">{exp.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
