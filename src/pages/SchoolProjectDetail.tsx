import React, { useState, useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Download,
  HardDrive,
  FileText,
  Code2,
} from 'lucide-react'
import { db } from '../firebase'
import { collection, onSnapshot, DocumentData } from 'firebase/firestore'
import SwiperGallery from '../components/SwiperGallery'
import Toast from '../components/Toast'
import {
  schoolProjectsData,
  getClassGroup,
  getMapelGroup,
  getYouTubeEmbedUrl,
} from './SchoolProjects'

type SchoolProject = DocumentData & {
  id?: string
  title?: string
  subject?: string
  category?: string
  classLevel?: string
  date?: string
  desc?: string
  longDesc?: string
  tools?: string[]
  tech?: string[] | string
  snippet?: string
  image?: string
  images?: string[]
  fileUrl?: string
  fileName?: string
  driveUrl?: string
  videoUrl?: string
  grade?: string
  createdAt?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

function scrollToTopImmediate() {
  try {
    const lenis = typeof window !== 'undefined' ? window.__LENIS__ : null
    if (lenis && typeof (lenis as { scrollTo?: (y: number, opts?: { immediate?: boolean }) => void }).scrollTo === 'function') {
      ;(lenis as { scrollTo: (y: number, opts?: { immediate?: boolean }) => void }).scrollTo(0, { immediate: true })
      return
    }
  } catch {
    /* fall through */
  }
  try {
    window.scrollTo(0, 0)
  } catch {
    /* noop */
  }
  try {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  } catch {
    /* noop */
  }
}

function sortStable(list: SchoolProject[]) {
  return [...list].sort((a, b) => {
    const ca = a?.createdAt || ''
    const cb = b?.createdAt || ''
    if (ca && cb && ca !== cb) return String(ca).localeCompare(String(cb))
    if (ca && !cb) return -1
    if (!ca && cb) return 1
    return String(a?.title || '').localeCompare(String(b?.title || ''))
  })
}

export default function SchoolProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [firebaseItems, setFirebaseItems] = useState<SchoolProject[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' }>({
    isOpen: false,
    message: '',
    type: 'success',
  })

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'school_projects'), (snap) => {
      setFirebaseItems(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SchoolProject)))
      setLoading(false)
    }, () => setLoading(false))
    return () => unsub()
  }, [])

  useEffect(() => {
    scrollToTopImmediate()
    const t = setTimeout(scrollToTopImmediate, 60)
    return () => clearTimeout(t)
  }, [id])

  const all = useMemo(() => {
    const raw = firebaseItems.length ? firebaseItems : schoolProjectsData
    return sortStable(raw)
  }, [firebaseItems])

  const index = all.findIndex((p) => String(p.id) === String(id))
  const item = index >= 0 ? all[index] : null
  const prev = index > 0 ? all[index - 1] : null
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null

  const classGroup = item ? getClassGroup(item.classLevel || '', item.title || '', item.desc || '') : ''
  const mapel = item ? getMapelGroup(item.subject || '', item.title || '', item.desc || '') : ''
  const tools = useMemo(() => {
    if (!item) return []
    const raw = item.tools || item.tech || []
    const arr = Array.isArray(raw) ? raw : String(raw).split(',')
    return arr.map((t) => String(t).trim()).filter(Boolean)
  }, [item])
  const galleryImages = useMemo(() => {
    if (!item) return []
    const collect: string[] = []
    if (Array.isArray(item.images)) collect.push(...item.images)
    if (item.image) collect.push(item.image)
    const seen = new Set<string>()
    return collect.filter((src) => {
      if (!src || typeof src !== 'string') return false
      const key = src.trim()
      if (!key || seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [item])
  const embedUrl = item?.videoUrl ? getYouTubeEmbedUrl(item.videoUrl) : null

  const handleCopy = (snippet: string) => {
    try {
      navigator.clipboard.writeText(snippet)
    } catch {
      /* clipboard may be unavailable */
    }
    setCopied(true)
    setToast({ isOpen: true, message: 'Snippet disalin!', type: 'success' })
    setTimeout(() => setCopied(false), 1800)
  }

  if (loading) {
    return (
      <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-32 pb-20 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-6 mono text-sm text-black/40">
          Loading school project…
        </div>
      </main>
    )
  }

  if (!item) {
    return (
      <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-32 pb-20 min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-6 text-center py-16">
          <p className="mono text-xs tracking-[0.2em] uppercase text-black/40">
            School project not found
          </p>
          <h1 className="text-4xl font-bold tracking-tight mt-3">Tidak ketemu.</h1>
          <Link to="/school-projects" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium">
            <ArrowLeft size={16} /> Back to school projects
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">
          School Project {pad(index + 1)} / {classGroup} · {mapel}
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            key={`title-${item.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-black text-white mono text-[11px]">
                {classGroup}
              </span>
              <span className="px-3 py-1 rounded-full border border-black/10 mono text-[11px]">
                {mapel}
              </span>
            </div>
            <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-[clamp(36px,6vw,72px)]">
              {item.title}
            </h1>
            <p className="mono text-xs text-black/40 mt-4 flex items-center gap-1.5">
              <BookOpen size={12} /> {item.subject || 'TKJ SMKN 3 Jepara'}{item.date ? ` · ${item.date}` : ''}
            </p>
            <p className="text-[15px] md:text-base text-black/50 leading-relaxed mt-5 max-w-2xl">
              {item.longDesc || item.desc}
            </p>
            <Link
              to="/school-projects"
              className="mono text-[10px] tracking-[0.2em] uppercase font-medium inline-flex items-center gap-1.5 mt-6 border-b border-black/70 pb-1 hover:text-black/60 hover:border-black/30 transition-colors"
            >
              View school archive <ArrowUpRight size={13} />
            </Link>
          </motion.div>

          <motion.aside
            key={`meta-${item.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <div className="border-l border-black/10 pl-6 space-y-7 lg:pt-2">
              <div>
                <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">
                  Kelas
                </p>
                <p className="text-[15px] font-semibold tracking-tight mt-1.5">
                  {item.classLevel || classGroup}
                </p>
              </div>
              <div>
                <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">
                  Mapel
                </p>
                <p className="text-[15px] font-semibold tracking-tight mt-1.5">
                  {item.subject || mapel}
                </p>
              </div>
              {item.grade && (
                <div>
                  <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">
                    Nilai
                  </p>
                  <p className="text-[15px] font-semibold tracking-tight mt-1.5">
                    {item.grade}
                  </p>
                </div>
              )}
              {tools.length > 0 && (
                <div>
                  <p className="mono text-[10px] tracking-[0.22em] uppercase text-black/35">
                    Tools
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {tools.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/5 mono text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </div>

        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12 md:mt-16"
        >
          {galleryImages.length > 0 ? (
            <SwiperGallery key={item.id} images={galleryImages} title={item.title || ''} />
          ) : (
            <div className="rounded-2xl border border-black/5 bg-zinc-100 aspect-[16/10] flex flex-col items-center justify-center">
              <Code2 size={32} className="text-black/20" />
              <span className="mono text-xs tracking-widest uppercase text-black/30 mt-2">
                {mapel}
              </span>
            </div>
          )}
        </motion.div>

        {/* Project story — ala halaman project */}
        <div className="mt-16 md:mt-24">
          <p className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">
            Project story
          </p>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em]">
              Langkah &amp; lampiran
            </h2>
            <p className="text-sm text-black/45 max-w-sm md:text-right leading-relaxed">
              Dokumentasi pengerjaan dan file pendukung tugas ini.
            </p>
          </div>
          <div className="border-b border-black/10 mt-6" />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Kiri — bernomor */}
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold tracking-tight">Materi &amp; File</h3>
                <span className="mono text-[9px] tracking-[0.2em] uppercase text-black/30">
                  {classGroup} · {mapel}
                </span>
              </div>
              <div className="mt-4 border-t border-black/10">
                {item.snippet && (
                  <div className="grid grid-cols-[32px_1fr] gap-3 py-5 border-b border-black/10">
                    <span className="mono text-[10px] text-black/30 pt-1">
                      01
                    </span>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="mono text-xs tracking-widest uppercase text-black/40 flex items-center gap-1.5">
                          <Terminal size={12} /> Snippet
                        </span>
                        <button
                          onClick={() => handleCopy(item.snippet || '')}
                          className="px-3 py-1.5 rounded-full border border-black/10 mono text-xs flex items-center gap-1.5 hover:bg-black hover:text-white transition-colors"
                        >
                          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}{' '}
                          {copied ? 'Tersalin' : 'Salin'}
                        </button>
                      </div>
                      <pre className="bg-[#0a0a0a] text-zinc-100 p-4 rounded-xl overflow-x-auto mono text-xs leading-relaxed">
                        <code>{item.snippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
                {item.fileUrl && (
                  <div className="grid grid-cols-[32px_1fr] gap-3 py-5 border-b border-black/10">
                    <span className="mono text-[10px] text-black/30 pt-1">
                      {pad(item.snippet ? 2 : 1)}
                    </span>
                    <div className="rounded-2xl border border-black/10 bg-zinc-50 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FileText size={18} />
                        <div>
                          <div className="text-sm font-medium">Lampiran PDF</div>
                          <div className="mono text-xs text-black/40 truncate max-w-[180px]">
                            {item.fileName || 'Download'}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-white border border-black/10 rounded-full mono text-xs flex items-center gap-1"
                        >
                          <ExternalLink size={12} /> Buka
                        </a>
                        <a
                          href={item.fileUrl}
                          download
                          className="px-3 py-1.5 bg-black text-white rounded-full mono text-xs flex items-center gap-1"
                        >
                          <Download size={12} /> Download
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {item.driveUrl && (
                  <div className="grid grid-cols-[32px_1fr] gap-3 py-5 border-b border-black/10">
                    <span className="mono text-[10px] text-black/30 pt-1">
                      {pad([item.snippet, item.fileUrl].filter(Boolean).length + 1)}
                    </span>
                    <div className="rounded-2xl border border-black/10 bg-white p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 mono text-xs">
                        <HardDrive size={14} /> {String(item.driveUrl).slice(0, 36)}…
                      </div>
                      <a
                        href={item.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-black text-white rounded-full mono text-xs flex items-center gap-1"
                      >
                        <ExternalLink size={12} /> Drive
                      </a>
                    </div>
                  </div>
                )}
                {embedUrl && (
                  <div className="grid grid-cols-[32px_1fr] gap-3 py-5 border-b border-black/10">
                    <span className="mono text-[10px] text-black/30 pt-1">
                      {pad([item.snippet, item.fileUrl, item.driveUrl].filter(Boolean).length + 1)}
                    </span>
                    <div className="rounded-2xl overflow-hidden border border-black/10 bg-black aspect-video">
                      <iframe src={embedUrl} title="Video" className="w-full h-full border-none" allowFullScreen />
                    </div>
                  </div>
                )}
                {!item.fileUrl && !item.driveUrl && !embedUrl && !item.snippet && (
                  <p className="mono text-xs tracking-widest uppercase text-black/30 mt-6">
                    Lampiran menyusul
                  </p>
                )}
              </div>
            </div>

            {/* Kanan — kartu hitam ringkasan */}
            <div className="bg-[#0B0B0C] text-white rounded-[28px] p-7 md:p-10">
              <p className="mono text-[10px] tracking-[0.24em] uppercase text-white/35">
                Ringkasan
              </p>
              <p className="text-xl md:text-2xl leading-snug font-medium tracking-tight mt-4">
                {item.longDesc || item.desc || 'Dokumentasi tugas pembelajaran.'}
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-4xl md:text-5xl font-black tracking-tight">{pad(tools.length)}</div>
                  <div className="mono text-[9px] tracking-[0.22em] uppercase text-white/40 mt-1.5">
                    Tools
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black tracking-tight">
                    {pad([item.fileUrl, item.driveUrl, embedUrl, item.snippet].filter(Boolean).length)}
                  </div>
                  <div className="mono text-[9px] tracking-[0.22em] uppercase text-white/40 mt-1.5">
                    Lampiran
                  </div>
                </div>
              </div>
              {tools.length > 0 && (
                <ul className="mt-8 pt-8 border-t border-white/10 space-y-3">
                  {tools.map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-white/65 leading-relaxed">
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-2 gap-4 border-t border-black/10 pt-8">
          <div>
            {prev ? (
              <Link to={`/school-projects/${prev.id}`} className="group inline-flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline text-black/40 font-normal">Prev — </span>
                <span className="line-clamp-1">{prev.title}</span>
              </Link>
            ) : <span />}
          </div>
          <div className="text-right">
            {next && (
              <Link to={`/school-projects/${next.id}`} className="group inline-flex items-center gap-2 text-sm font-medium">
                <span className="hidden sm:inline text-black/40 font-normal">Next — </span>
                <span className="line-clamp-1">{next.title}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </main>
  )
}
