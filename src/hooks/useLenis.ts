import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

let globalLenis: Lenis | null = null
export function getLenis() {
  return globalLenis
}

export default function useLenis(enabled = true) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return

    // Respect reduced motion: disable smooth
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.45,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    } as unknown as ConstructorParameters<typeof Lenis>[0])
    globalLenis = lenis
    lenisRef.current = lenis
    if (typeof window !== 'undefined') {
      ;(window as { __LENIS__?: Lenis | null }).__LENIS__ = lenis
    }

    // Sync with GSAP ScrollTrigger — lamban dramatis
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf as unknown as (time: number) => void)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf as unknown as (time: number) => void)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      globalLenis = null
      if (typeof window !== 'undefined') {
        ;(window as { __LENIS__?: Lenis | null }).__LENIS__ = null
      }
    }
  }, [enabled])

  return lenisRef
}
