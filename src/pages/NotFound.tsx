import React from 'react'
import TransitionLink from '../components/TransitionLink'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="bg-[#e8e8e5] text-[#0a0a0a] pt-28 pb-20 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <TransitionLink to="/" className="inline-flex items-center gap-2 mono text-xs tracking-widest uppercase text-black/40 hover:text-black mb-10">
          <ArrowLeft size={14} /> Kembali ke Beranda
        </TransitionLink>

        <div className="mb-12">
          <p className="mono text-[10px] tracking-[0.28em] uppercase text-black/40 mb-6">
            Halaman Tidak Ditemukan
          </p>
          <h1 className="font-black tracking-[-0.04em] leading-[0.95] text-[clamp(56px,12vw,140px)] text-black mb-6">
            404
          </h1>
          <p className="text-black/50 leading-relaxed text-lg max-w-xl mx-auto">
            Halaman yang kamu cari tidak tersedia. Mungkin telah dipindahkan atau tidak pernah ada.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <TransitionLink
            to="/"
            className="px-7 py-3.5 bg-black text-white rounded-full text-[15px] font-medium inline-flex items-center gap-2 hover:bg-black/85 transition-colors"
          >
            Kembali ke Beranda <ArrowLeft size={16} />
          </TransitionLink>
          <TransitionLink
            to="/projects"
            className="px-7 py-3.5 border border-black/10 rounded-full text-[15px] font-medium inline-flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
          >
            Lihat Proyek
          </TransitionLink>
        </div>
      </div>
    </main>
  )
}
