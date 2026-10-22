import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard } from 'swiper/modules'
import 'swiper/css'

const PLACEHOLDER = `${import.meta.env.BASE_URL}og-image.png`

type SwiperGalleryProps = {
  images?: string[]
  title?: string
}

function dedupeImages(images: string[] | undefined) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const src of images || []) {
    if (!src || typeof src !== 'string') continue
    const key = src.trim()
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(key)
  }
  return out
}

export default function SwiperGallery({ images = [], title }: SwiperGalleryProps) {
  const [current, setCurrent] = useState(1)
  const swiperRef = useRef<any>(null)

  const unique = dedupeImages(images)
  const safeImages = unique.length ? unique : [PLACEHOLDER]
  const hasMultiple = safeImages.length > 1
  // Reset is handled by remount: parents pass key={project.id}, and Swiper
  // itself is keyed by image signature so Prev/Next never keeps stale "02/01".
  const gallerySig = safeImages.join('|')

  return (
    <div className="w-full group">
      <div className="relative rounded-2xl overflow-hidden border border-black/5 bg-white">
        <Swiper
          key={gallerySig}
          modules={[Keyboard]}
          slidesPerView={1}
          spaceBetween={16}
          speed={650}
          loop={hasMultiple}
          keyboard={hasMultiple ? { enabled: true } : false}
          allowTouchMove={hasMultiple}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex + 1)}
          className="project-swiper"
        >
          {safeImages.map((src, i) => (
            <SwiperSlide key={`${src}-${i}`}>
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                <img
                  src={src}
                  alt={`${title || 'Project'} ${i + 1}`}
                  className="w-full h-full object-cover will-change-transform transition-[filter,opacity,transform] duration-[650ms] swiper-blur-img group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-black/10 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity text-black/70 hover:text-black hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-black"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 border border-black/10 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity text-black/70 hover:text-black hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-black"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-between mt-3 px-1">
        <span className="mono text-xs tracking-widest text-black/40">
          {String(current).padStart(2, '0')} / {String(safeImages.length).padStart(2, '0')}
        </span>
        {hasMultiple && (
          <div className="flex items-center gap-1">
            {safeImages.slice(0, 8).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i + 1 === current ? 'true' : undefined}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className="group/indicator flex h-5 items-center px-0.5"
              >
                <span
                  className={`block h-[2px] rounded-full transition-all duration-300 ${
                    i + 1 === current
                      ? 'w-8 bg-black'
                      : 'w-4 bg-black/20 group-hover/indicator:bg-black/40'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
        <span className="mono text-[11px] tracking-widest uppercase text-black/40 block sm:hidden">
          Geser →
        </span>
        <span className="mono text-[10px] tracking-widest uppercase text-black/30 hidden sm:inline">
          {hasMultiple ? 'Swipe to explore' : 'Project cover'}
        </span>
      </div>
    </div>
  )
}
