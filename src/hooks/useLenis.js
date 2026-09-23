import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

let globalLenis = null
export function getLenis() { return globalLenis }

export default function useLenis(enabled = true) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    // Respect reduced motion: disable smooth
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    })
    globalLenis = lenis
    lenisRef.current = lenis
    if (typeof window !== 'undefined') window.__LENIS__ = lenis

    // Sync with GSAP ScrollTrigger — lamban dramatis
    // (Jangan set ScrollTrigger.defaults scroller: merusak kalkulasi posisi pin)
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)
    const raf = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.off('scroll', onScroll)
      lenis.destroy()
      globalLenis = null
      if (typeof window !== 'undefined') window.__LENIS__ = null
    }
  }, [enabled])

  return lenisRef
}
