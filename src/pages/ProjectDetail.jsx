import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, Github, Globe, ExternalLink } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import SwiperGallery from '../components/SwiperGallery';
import { getDiscipline, disciplineLabel, roleLabel } from '../utils/discipline';
import { fallbackProjects } from './Projects';

const pad = (n) => String(n).padStart(2, '0');

function techList(project) {
  const tech = project?.tech;
  return Array.isArray(tech)
    ? tech
    : (typeof tech === 'string' ? tech.split(',').map((s) => s.trim()).filter(Boolean) : []);
}

export default function ProjectDetail() {
  const { id } = useParams();
  const [firebaseProjects, setFirebaseProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snapshot) => {
      setFirebaseProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, []);

  const all = firebaseProjects.length > 0 ? firebaseProjects : fallbackProjects;
  const index = all.findIndex((p) => String(p.id) === String(id));
  const project = index >= 0 ? all[index] : null;

  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const discipline = useMemo(() => (project ? getDiscipline(project) : 'FRONTEND'), [project]);
  const techs = useMemo(() => (project ? techList(project) : []), [project]);
  const features = project?.features || [];
  const galleryImages = useMemo(() => {
    if (!project) return [];
    if (Array.isArray(project.images) && project.images.length) return project.images;
    return [project.image].filter(Boolean);
  }, [project]);

  const stats = project?.stats?.length === 2 ? project.stats : [
    { value: String(techs.length).padStart(2, '0'), label: 'Technologies' },
    { value: String(features.length).padStart(2, '0'), label: 'Highlights' },
  ];
  const impactPoints = project?.impactPoints?.length ? project.impactPoints : features;
  const impactStatement = project?.impact
    || project?.longDesc
    || project?.desc
    || 'Delivered end-to-end — from requirements to production.';

  if (loading) {
    return (
      <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-32 pb-20 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-6 mono text-sm text-black/40">Loading project…</div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-32 pb-20 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-6 text-center py-16">
          <p className="mono text-xs tracking-[0.2em] uppercase text-black/40">Project not found</p>
          <h1 className="text-4xl font-bold tracking-tight mt-3">Tidak ketemu.</h1>
          <Link to="/projects" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium">
            <ArrowLeft size={16} /> Back to projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <p className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">
          Project {pad(index + 1)} / {discipline}
        </p>

        {/* Title + meta */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-[clamp(44px,7vw,92px)]">
              {project.title}
            </h1>
            <p className="text-[15px] md:text-base text-black/50 leading-relaxed mt-6 max-w-2xl">
              {project.longDesc || project.desc}
            </p>
            <Link
              to="/projects"
              className="mono text-[10px] tracking-[0.2em] uppercase font-medium inline-flex items-center gap-1.5 mt-6 border-b border-black/70 pb-1 hover:text-black/60 hover:border-black/30 transition-colors"
            >
              View project archive <ArrowUpRight size={13} />
            </Link>
            {(project.liveUrl || project.githubUrl || project.fileUrl) && project.liveUrl !== '#' && (
              <div className="flex flex-wrap gap-2.5 mt-6">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black/80">
                    <Globe size={15} /> Live Demo
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white border border-black/10 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
                    <Github size={15} /> GitHub
                  </a>
                )}
                {project.fileUrl && (
                  <a href={project.fileUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white border border-black/10 rounded-full text-sm font-medium inline-flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
                    <ExternalLink size={15} /> File
                  </a>
                )}
              </div>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="border-l border-black/10 pl-6 space-y-7 lg:pt-2">
              <div>
                <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">Role</p>
                <p className="text-[15px] font-semibold tracking-tight mt-1.5">{project.role || roleLabel(project)}</p>
              </div>
              <div>
                <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">Discipline</p>
                <p className="text-[15px] font-semibold tracking-tight mt-1.5">{disciplineLabel(discipline)} Development</p>
              </div>
              <div>
                <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">Related experience</p>
                <Link to="/experience" className="text-[15px] font-semibold tracking-tight mt-1.5 inline-flex items-center gap-1.5 underline decoration-black/20 underline-offset-4 hover:decoration-black">
                  {project.company || project.relatedExperience || 'Experience Archive'} <ArrowUpRight size={14} />
                </Link>
              </div>
              {techs.length > 0 && (
                <div>
                  <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">Stack</p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {techs.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-[11px]">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 md:mt-16"
        >
          <SwiperGallery images={galleryImages} title={project.title} />
        </motion.div>

        {/* Project story */}
        <div className="mt-16 md:mt-24">
          <p className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">Project story</p>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">Contribution &amp; impact</h2>
            <p className="text-sm text-black/45 max-w-sm md:text-right leading-relaxed">
              What I owned throughout delivery and what changed after the platform was introduced.
            </p>
          </div>
          <div className="border-b border-black/10 mt-6" />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* My Contribution */}
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold tracking-tight">My Contribution</h3>
                <span className="mono text-[9px] tracking-[0.2em] uppercase text-black/30">End-to-end ownership</span>
              </div>
              {features.length > 0 ? (
                <div className="mt-4 border-t border-black/10">
                  {features.map((f, i) => (
                    <div key={i} className="grid grid-cols-[32px_1fr] gap-3 py-5 border-b border-black/10">
                      <span className="mono text-[10px] text-black/30 pt-1">{pad(i + 1)}</span>
                      <p className="text-[15px] text-black/60 leading-relaxed">{typeof f === 'string' ? f : JSON.stringify(f)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mono text-xs tracking-widest uppercase text-black/30 mt-6">Highlights coming soon</p>
              )}
            </div>

            {/* Impact card */}
            <div className="bg-[#0B0B0C] text-white rounded-[28px] p-7 md:p-10">
              <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/35">Impact</p>
              <p className="text-xl md:text-2xl leading-snug font-medium tracking-tight mt-4">
                {impactStatement}
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-4xl md:text-5xl font-black tracking-tight">{s.value}</div>
                    <div className="mono text-[9px] tracking-[0.22em] uppercase text-white/40 mt-1.5">{s.label}</div>
                  </div>
                ))}
              </div>
              {impactPoints.length > 0 && (
                <ul className="mt-8 pt-8 border-t border-white/10 space-y-4">
                  {impactPoints.map((pt, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/65 leading-relaxed">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      <span>{typeof pt === 'string' ? pt : JSON.stringify(pt)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Prev / Next */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 gap-4 border-t border-black/10 pt-8">
          <div>
            {prev ? (
              <Link to={`/projects/${prev.id}`} className="group inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline text-black/40 font-normal">Prev — </span>{prev.title}
              </Link>
            ) : <span />}
          </div>
          <div className="text-right">
            {next && (
              <Link to={`/projects/${next.id}`} className="group inline-flex items-center gap-2 text-sm font-medium">
                <span className="hidden sm:inline text-black/40 font-normal">Next — </span>{next.title}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
