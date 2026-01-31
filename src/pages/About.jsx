import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    User, Heart, Coffee, Music, Camera,
    MapPin, Rocket, Star, ArrowLeft,
    Mail, Instagram, Github
} from 'lucide-react';

export default function About() {
    return (
        <main className="relative z-10 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden glass-card p-2 relative group"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center">
                            <img
                                src="/profile.webp"
                                alt="Arroudhil Anfi"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    <div className="flex-1 text-center md:text-left">
                        <motion.h1
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
                        >
                            The Mind Behind <br /> <span className="text-linear">Arro.</span>
                        </motion.h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-white/40 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-500" /> Indonesia</span>
                            <span className="flex items-center gap-2"><Rocket size={14} className="text-purple-500" /> Student @ SMKN 3 Jepara</span>
                            <span className="flex items-center gap-2"><Heart size={14} className="text-pink-500" /> Creative Soul</span>
                        </div>
                    </div>
                </div>

                {/* Narrative */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                    <div className="md:col-span-2 space-y-6 text-lg text-white/70 leading-relaxed">
                        Hi, I'm <span className="text-white font-bold">Arroudhil Anfi</span>, but you can call me <span className="text-blue-400 font-bold">Arro</span>. I'm a student at <span className="text-white font-bold">SMK Negeri 3 Jepara</span> specializing in Computer and Network Engineering (TKJ) who doesn't believe in boundaries between technology and creativity.
                        <p>
                            My journey started with a curiosity for how computers talk to each other, but it quickly evolved into how humans express themselves through digital media. Whether it's the logic of a maze-solving robot or the emotion in a cinematic edit, I'm always looking for that "perfect harmony".
                        </p>
                        <p>
                            When I'm not configuring servers or writing algorthims, you'll probably find me with my guitar, lost in a melody, or behind a camera lens capturing the hidden beauty of the world.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/30">Personal Stats</h3>
                        <div className="space-y-4">
                            <StatItem label="Code Satisfaction" value="100%" />
                            <StatItem label="Music Playtime" value="Infinity" />
                            <StatItem label="Caffeine Level" value="Midnight" />
                            <StatItem label="Success Rate" value="99.9%" />
                        </div>
                    </div>
                </div>

                {/* Hobbies / Interests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    <InterestCard
                        icon={<Music className="text-orange-400" />}
                        title="Math Rock & Guitar"
                        desc="Deeply inspired by Murphy Radio. I love exploring complex math rock melodies, twinkly guitar riffs, and composing own tracks."
                    />
                    <InterestCard
                        icon={<Camera className="text-blue-400" />}
                        title="Visual Storytelling"
                        desc="Photography and videography aren't just hobbies; they're how I document my perspective."
                    />
                    <InterestCard
                        icon={<Coffee className="text-yellow-600" />}
                        title="Minimalist Design"
                        desc="I'm obsessed with clean interfaces, glassmorphism, and smooth animations."
                    />
                    <div className="md:col-span-2">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">Crafting Digital <span className="text-blue-500">Excellence.</span></h2>
                        <p className="text-white/60 mb-8 leading-relaxed">
                            As a TKJ student, I've always been fascinated by how technology can be a canvas for creativity. My journey is a blend of technical precision in networking and visual storytelling through <span className="text-white font-bold">Graphic Design</span>.
                        </p>
                        <p className="text-white/60 mb-12 leading-relaxed">
                            Whether I'm configuring a server or designing a high-impact poster, I focus on the harmony between functionality and aesthetics. Minimalism and bold visual language are the core of my design philosophy.
                        </p>
                    </div>
                    <InterestCard
                        icon={<Star className="text-purple-400" />}
                        title="Competitive Programming"
                        desc="Solving complex problems with efficient logic is my kind of sport."
                    />
                </div>

                {/* Quote */}
                <div className="glass-card p-12 text-center relative overflow-hidden mb-20">
                    <div className="text-4xl md:text-5xl font-bold tracking-tight mb-4 italic opacity-80">
                        "Technology is the инструмент, <br /> Creativity is the soul."
                    </div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 blur-[80px]" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[80px]" />
                </div>
            </div>
        </main>
    );
}

function StatItem({ label, value }) {
    return (
        <div className="flex items-center justify-between p-4 glass-card border-white/5">
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-black text-blue-400">{value}</span>
        </div>
    );
}

function InterestCard({ icon, title, desc }) {
    return (
        <div className="glass-card p-8 group hover:bg-white/[0.05] transition-all duration-500 border-white/5">
            <div className="mb-6 p-3 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
                {React.cloneElement(icon, { size: 28 })}
            </div>
            <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
            <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
