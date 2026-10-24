import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TransitionLink from '../components/TransitionLink'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, FileText, ArrowUpRight } from 'lucide-react'
import { db } from '../firebase'
import { collection, onSnapshot, DocumentData } from 'firebase/firestore'

type SchoolProject = DocumentData & {
  id?: string
  title?: string
  subject?: string
  category?: string
  classLevel?: string
  date?: string
  desc?: string
  tools?: string[]
  snippet?: string
  image?: string
}

export const schoolProjectsData: SchoolProject[] = [
  {
    id: 'lkpd-01',
    title: 'LKPD 01: Konfigurasi VLAN & Inter-VLAN Routing Cisco',
    subject: 'Administrasi Infrastruktur Jaringan (AIJ)',
    category: 'LKPD & Jaringan',
    classLevel: 'Kelas XI',
    date: 'Februari 2025',
    desc: 'Konfigurasi VLAN 10: Lab TKJ, VLAN 20: Ruang Guru menggunakan Router Cisco 2911 & Switch Catalyst 2960.',
    tools: ['Cisco Packet Tracer', 'Switch Catalyst 2960'],
    snippet: `interface FastEthernet0/1\n switchport mode trunk`,
    image: '',
  },
  {
    id: 'lkpd-02',
    title: 'LKPD 02: Algoritma Pencarian & Struktur Data C++',
    subject: 'Pemrograman Dasar',
    category: 'Coding & Web',
    classLevel: 'Kelas X',
    date: 'Januari 2025',
    desc: 'Program C++ manajemen data siswa berbasis Struct dan Array 2D dengan Binary Search & Bubble Sort.',
    tools: ['C++', 'VS Code'],
    snippet: `#include <iostream>\nstruct Siswa { string nis; };`,
    image: '',
  },
  {
    id: 'lkpd-03',
    title: 'LKPD 03: Deployment & Hardening Linux Server Debian 12',
    subject: 'Administrasi Sistem Jaringan (ASJ)',
    category: 'LKPD & Jaringan',
    classLevel: 'Kelas XII',
    date: 'Maret 2025',
    desc: 'Instalasi dan konfigurasi server Linux Debian 12 mencakup DHCP, DNS Bind9, dan SSH Hardening.',
    tools: ['Debian 12', 'Bind9'],
    snippet: `zone "tkj.smkn3jepara.sch.id" { type master; };`,
    image: '',
  },
]

export const pad2 = (n: number) => String(n).padStart(2, '0')

export const getYouTubeEmbedUrl = (url: string | null | undefined): string | null => {
  if (!url) return null
  try {
    const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)
    if (m && m[2].length === 11) return `https://www.youtube.com/embed/${m[2]}`
  } catch {}
  return null
}

export const getClassGroup = (classLevel = '', title = '', desc = '') => {
  const raw = String(classLevel || '').toUpperCase()
  if (raw.includes('XII') || raw.includes('12')) return 'Kelas XII'
  if (raw.includes('XI') || raw.includes('11')) return 'Kelas XI'
  if (raw.includes('X') || raw.includes('10')) return 'Kelas X'
  const combined = `${title} ${desc}`.toUpperCase()
  if (combined.includes('XII')) return 'Kelas XII'
  if (combined.includes('XI')) return 'Kelas XI'
  return 'Kelas X'
}

export const getMapelGroup = (subject = '', title = '', desc = '') => {
  const t = `${subject} ${title} ${desc}`.toLowerCase()
  if (t.includes('asj') || t.includes('administrasi sistem jaringan')) return 'ASJ'
  if (t.includes('tjkn') || t.includes('teknik jaringan')) return 'TJKN'
  if (t.includes('kj') || t.includes('keamanan')) return 'KJ'
  if (t.includes('english') || t.includes('inggris')) return 'English'
  if (t.includes('jepang')) return 'Bahasa Jepang'
  return 'Lainnya'
}

export default function SchoolProjects() {
  const [firebaseSchoolProjects, setFirebaseSchoolProjects] = useState<SchoolProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedMapel, setSelectedMapel] = useState<string | null>(null)

  const classOptions = ['Kelas X', 'Kelas XI', 'Kelas XII']
  const mapelMaster = ['ASJ', 'TJKN', 'KJ', 'English', 'Bahasa Jepang', 'Lainnya']

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'school_projects'), (snap) => {
      setFirebaseSchoolProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as SchoolProject)))
      setLoading(false)
    }, () => setLoading(false))
    return () => unsub()
  }, [])

  const source = firebaseSchoolProjects.length ? firebaseSchoolProjects : schoolProjectsData

  const countInClass = (cls: string) =>
    source.filter(
      (item) => getClassGroup(item.classLevel || '', item.title || '', item.desc || '') === cls,
    ).length

  const mapelsInClass = (cls: string) =>
    mapelMaster.filter(
      (m) =>
        source.some(
          (item) =>
            getClassGroup(item.classLevel || '', item.title || '', item.desc || '') === cls &&
            getMapelGroup(item.subject || '', item.title || '', item.desc || '') === m,
        ),
    )

  const countInMapel = (cls: string, mapel: string) =>
    source.filter(
      (item) =>
        getClassGroup(item.classLevel || '', item.title || '', item.desc || '') === cls &&
        getMapelGroup(item.subject || '', item.title || '', item.desc || '') === mapel,
    ).length

  const step = !selectedClass ? 1 : !selectedMapel ? 2 : 3

  const filtered =
    step === 3
      ? source.filter((item) => {
          if (getClassGroup(item.classLevel || '', item.title || '', item.desc || '') !== selectedClass) return false
          if (getMapelGroup(item.subject || '', item.title || '', item.desc || '') !== selectedMapel) return false
          return true
        })
      : []

  const pickClass = (cls: string) => {
    setSelectedClass(cls)
    setSelectedMapel(null)
  }

  const resetAll = () => {
    setSelectedClass(null)
    setSelectedMapel(null)
  }

  return (
    <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 md:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">
            SMKN 3 Jepara — TKJ
          </div>
          <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-[clamp(44px,7vw,88px)] mt-4">
            School<br /> Projects.
          </h1>
          <p className="text-black/50 leading-relaxed max-w-xl mt-5 text-[15px]">
            Kumpulan LKPD, praktikum jaringan, dan tugas pembelajaran.{' '}
            <span className="text-black font-semibold">{source.length} dokumen</span> — pilih kelas, lalu mapel
            untuk melihat school projects.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mono text-[10px] tracking-[0.2em] uppercase text-black/30 mb-10">
          <span className={step >= 1 ? 'text-black font-medium' : ''}>01 Kelas</span>
          <span className={`flex-1 h-px ${step >= 2 ? 'bg-black/40' : 'bg-black/10'}`} />
          <span className={step >= 2 ? 'text-black font-medium' : ''}>02 Mapel</span>
          <span className={`flex-1 h-px ${step >= 3 ? 'bg-black/40' : 'bg-black/10'}`} />
          <span className={step >= 3 ? 'text-black font-medium' : ''}>03 School Projects</span>
        </div>

        {loading ? (
          <div className="py-16 text-center mono text-sm text-black/40">
            Loading LKPD from Firebase…
          </div>
        ) : (
          <>
            {/* Step 1 — pilih kelas */}
            <div className="border-t border-black/10 pt-8">
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">
                  01 — Pilih kelas
                </span>
                {selectedClass && (
                  <button
                    onClick={resetAll}
                    className="mono text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black underline underline-offset-4"
                  >
                    Ulangi
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {classOptions.map((cls, i) => {
                  const isActive = selectedClass === cls
                  const count = countInClass(cls)
                  return (
                    <button
                      key={cls}
                      onClick={() => pickClass(cls)}
                      className={`group rounded-2xl border p-6 text-left transition-all duration-300 ${isActive
                        ? 'bg-black text-white border-black shadow-[0_20px_48px_rgba(0,0,0,0.22)]'
                        : 'bg-white border-black/10 hover:border-black/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5'}`}
                    >
                      <div className="flex items-start justify-between">
                        <span className={`mono text-[10px] tracking-[0.2em] ${isActive ? 'text-white/40' : 'text-black/30'}`}>
                          0{i + 1}
                        </span>
                        <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-white text-black' : 'bg-black/[0.04] text-black/30 group-hover:bg-black group-hover:text-white'}`}>
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                      <div className="text-2xl font-bold tracking-[-0.02em] mt-4">{cls}</div>
                      <div className={`mono text-[10px] tracking-[0.18em] uppercase mt-1.5 ${isActive ? 'text-white/50' : 'text-black/40'}`}>
                        {pad2(count)} school project{count === 1 ? '' : 's'}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2 — pilih mapel */}
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="py-8"
                >
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="mono text-[10px] tracking-[0.24em] uppercase text-black/40">
                      02 — Pilih mapel <span className="text-black/25">· {selectedClass}</span>
                    </span>
                    <button
                      onClick={() => pickClass(selectedClass!)}
                      className="mono text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black underline underline-offset-4"
                    >
                      ← Ganti kelas
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {mapelsInClass(selectedClass!).map((m) => {
                      const isActive = selectedMapel === m
                      return (
                        <button
                          key={m}
                          onClick={() => setSelectedMapel(m)}
                          className={`px-5 py-2.5 rounded-full mono text-[10px] tracking-[0.14em] uppercase font-medium border transition-colors ${isActive
                            ? 'bg-black text-white border-black'
                            : 'bg-white border-black/10 text-black/60 hover:text-black hover:border-black/25'}`}
                        >
                          {m} <span className={isActive ? 'text-white/50' : 'text-black/30'}>{pad2(countInMapel(selectedClass!, m))}</span>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3 — grid school projects */}
            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="border-t border-black/10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 mb-8">
                    <div className="mono text-[10px] tracking-[0.2em] uppercase text-black/35">
                      Showing {String(filtered.length).padStart(2, '0')} school projects · {selectedClass} · {selectedMapel}
                    </div>
                    <button
                      onClick={resetAll}
                      className="mono text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black underline underline-offset-4 text-left sm:text-right"
                    >
                      Ubah pilihan →
                    </button>
                  </div>
                  {filtered.length === 0 ? (
                    <div className="py-16 text-center border border-dashed border-black/10 rounded-2xl bg-white mb-6">
                      <FileText size={32} className="mx-auto text-black/20 mb-2" />
                      <p className="text-black/60 text-sm">Tidak ada school project untuk pilihan ini.</p>
                    </div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {loading ? null : step === 3 && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {filtered.map((item, idx) => {
              const mapel = getMapelGroup(item.subject || '', item.title || '', item.desc || '')
              return (
                <TransitionLink key={item.id || idx} to={`/school-projects/${item.id || idx}`} className="group block">
                  <div className="relative rounded-2xl overflow-hidden bg-zinc-200 aspect-[16/10]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title || ''}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100">
                        <Code2 size={32} className="text-black/20" />
                        <span className="mono text-xs tracking-widest uppercase text-black/30 mt-2">
                          {mapel}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white mono text-[10px] tracking-[0.14em] uppercase font-medium">
                      {mapel}
                    </span>
                    <span className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                  <div className="border-t border-black/10 mt-6 pt-5">
                    <p className="mono text-[10px] tracking-[0.2em] uppercase text-black/40">
                      {String(idx + 1).padStart(2, '0')} / {mapel}
                    </p>
                    <h3 className="text-[24px] md:text-[26px] font-bold tracking-[-0.02em] leading-tight mt-2 group-hover:underline decoration-black/20 underline-offset-4">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-black/50 leading-relaxed mt-2 line-clamp-3">
                      {item.desc}
                    </p>
                  </div>
                </TransitionLink>
              )
            })}
          </div>
        ) : step < 3 ? (
          <div className="mt-8 py-16 text-center border border-dashed border-black/10 rounded-2xl bg-white/60">
            <p className="mono text-[10px] tracking-[0.24em] uppercase text-black/35">
              {step === 1 ? 'Pilih kelas dulu untuk lanjut' : 'Pilih mapel untuk memunculkan school projects'}
            </p>
          </div>
        ) : null}
      </div>
    </main>
  )
}
