'use client'

import { useCallback } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { usePageTransition } from './PageTransition'

/** Wrapper <Link> yang memicu circular page transition saat navigasi antar halaman.
 *
 * - Klik kiri normal -> circle hitam tumbuh dari tengah-bawah, nutup layar,
 *   baru pindah halaman, lalu reveal.
 * - Ctrl/Cmd / middle-click / target="_blank" -> biarkan perilaku bawaan browser (tab baru).
 * - Link ber-hash (/#about, /#contact) -> lompat section, animasi diabaikan (instan).
 * - `onClick` (opsional) -> dipanggil sebelum transisi; kalau memanggil
 *   event.preventDefault(), transisi dibatalkan.
 */
export default function TransitionLink(props: LinkProps & { className?: string }) {
  const { go } = usePageTransition()
  const { onClick: externalOnClick, ...rest } = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      externalOnClick?.(event)
      if (event.defaultPrevented) return

      const { target } = props as LinkProps & { target?: string }

      // Buka tab baru (Ctrl/Cmd + klik, middle-click, target _blank) -> biarkan bawaan
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || target === '_blank') return
      // Hash link -> lompat section, nggak ada pindah halaman -> instan
      if (typeof props.to === 'string' && props.to.startsWith('#')) return

      event.preventDefault()
      go(props.to as string)
    },
    [go, props],
  )

  return <Link {...rest} onClick={handleClick} />
}
