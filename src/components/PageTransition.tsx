'use client'

import { useContext, useEffect, useRef, useState, createContext, useCallback } from 'react'
import { motion } from 'framer-motion'
import { createPath, useLocation, useNavigate } from 'react-router-dom'

/** Circular page transition overlay.
 *
 * Fase:
 *   cover   : circle scale 0 -> 1 dari tengah-bawah layar (nutup 100%)
 *   hold    : layar penuh tertutup sambil halaman baru mount
 *   reveal  : circle fade out + sedikit membesar, halaman baru muncul
 * Semua animasi murni transform/opacity (GPU, aman 60fps).
 *
 * Klik link via TransitionLink -> panggil go() -> animasi berjalan ->
 * navigate() dilakukan saat layar sudah tertutup penuh (nggak ada flash
 * halaman lama/baru).
 */

const DURATION_COVER = 550   // ms: 0 -> 1 (cover)
const DURATION_HOLD = 260    // ms: menunggu halaman baru siap
const DURATION_REVEAL = 420  // ms: reveal halaman baru
const TRANSITION_TOTAL = DURATION_COVER + DURATION_HOLD + DURATION_REVEAL

type TransitionState = 'idle' | 'cover' | 'hold' | 'reveal' | 'done'

type PageTransitionContextValue = {
  go: (to: string) => void
  state: TransitionState
}

const PageTransitionContext =
  createContext<PageTransitionContextValue | undefined>(undefined)

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) throw new Error('usePageTransition harus dalam PageTransitionProvider')
  return ctx
}

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [state, setState] = useState<TransitionState>('idle')
  const circleRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<string | null>(null)
  const lockRef = useRef(false)

  // Diamkan scroll selama transisi
  const lockScroll = useCallback(() => {
    try {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } catch {}
    const lenis = (typeof window !== 'undefined'
      ? (window as { __LENIS__?: { stop?: () => void; start?: () => void } })
        .__LENIS__
      : null)
    lenis?.stop?.()
  }, [])

  const unlockScroll = useCallback(() => {
    try {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    } catch {}
    const lenis = (typeof window !== 'undefined'
      ? (window as { __LENIS__?: { stop?: () => void; start?: () => void } })
        .__LENIS__
      : null)
    lenis?.start?.()
  }, [])

  // Set ukuran circle supaya di scale 1 dijamin nutup semua sudut layar.
  const setCircleSize = useCallback(() => {
    const el = circleRef.current
    if (!el) return
    const w = window.innerWidth
    const h = window.innerHeight
    // diameter = diagonal layar (pusat di tengah-bawah, jadi perlu cukup jauh ke atas & samping)
    const diameter = Math.hypot(w / 2, h) * 2
    el.style.width = `${diameter}px`
    el.style.height = `${diameter}px`
  }, [])

  useEffect(() => {
    setCircleSize()
    window.addEventListener('resize', setCircleSize)
    return () => window.removeEventListener('resize', setCircleSize)
  }, [setCircleSize])

  const go = useCallback(
    (to: string) => {
      if (lockRef.current) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        navigate(to)
        return
      }
      lockRef.current = true
      targetRef.current = to
      lockScroll()
      setState('cover')

      // navigate saat circle sudah full cover layar
      const coverTimer = setTimeout(() => {
        targetRef.current = null
        navigate(to, { replace: createPath(location) === createPath({ pathname: to }) })
        setState('hold')
      }, DURATION_COVER)

      // reveal setelah hold
      const revealTimer = setTimeout(() => {
        setState('reveal')
      }, DURATION_COVER + DURATION_HOLD)

      // safety: pastikan selesai walaupun ada gangguan
      const safetyTimer = setTimeout(() => {
        setState('done')
        lockRef.current = false
        unlockScroll()
      }, TRANSITION_TOTAL + 300)

      return () => {
        clearTimeout(coverTimer)
        clearTimeout(revealTimer)
        clearTimeout(safetyTimer)
      }
    },
    [navigate, location, lockScroll, unlockScroll],
  )

  // Kembali ke idle setelah reveal selesai; reset untuk transisi berikutnya.
  useEffect(() => {
    if (state !== 'reveal') return
    const t = setTimeout(() => {
      setState('done')
      lockRef.current = false
      unlockScroll()
    }, DURATION_REVEAL)
    return () => clearTimeout(t)
  }, [state, unlockScroll])

  // Setelah 'done', tunggu 1 frame lalu kembali ke idle agar animasi reveal selesai render.
  useEffect(() => {
    if (state !== 'done') return
    const raf = requestAnimationFrame(() => {
      setState('idle')
    })
    return () => cancelAnimationFrame(raf)
  }, [state])

  const value: PageTransitionContextValue = { go, state }

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      {/* Overlay circle — rendered di luar <motion.main> biar fixed benar-benar relatif viewport */}
      <motion.div
        ref={circleRef}
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: state === 'cover' || state === 'hold' ? 1 : 0,
          opacity: state === 'reveal' ? 0 : 1,
        }}
        transition={{
          scale: { duration: DURATION_COVER / 1000, ease: [0.76, 0, 0.24, 1] },
          opacity: { duration: DURATION_REVEAL / 1000, ease: 'easeOut' },
        }}
        style={{
          transformOrigin: 'center bottom',
          position: 'fixed',
          left: '50vw',
          top: '100vh',
          zIndex: 300,
          borderRadius: '50%',
          backgroundColor: '#0b0b0c',
          pointerEvents: state === 'idle' ? 'none' : 'auto',
          userSelect: 'none',
          touchAction: 'none',
          willChange: 'transform, opacity',
        }}
        aria-hidden
      />
    </PageTransitionContext.Provider>
  )
}
