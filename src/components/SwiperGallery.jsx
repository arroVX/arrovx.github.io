import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function SwiperGallery({ images = [], title }) {
  const [current, setCurrent] = useState(1);
  const safeImages = images.length ? images : ["/og-image.png"];
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full group">
      <div className="relative rounded-2xl overflow-hidden border border-black/5 bg-white">
        <Swiper
          modules={[Navigation, EffectFade]}
          slidesPerView={1}
          spaceBetween={16}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={650}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex + 1)}
          className="project-swiper"
        >
          {safeImages.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                <img
                  src={src}
                  alt={`${title || 'Project'} ${i + 1}`}
                  className="w-full h-full object-cover will-change-[filter,opacity] transition-[filter,opacity] duration-[650ms] swiper-blur-img"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200' }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button ref={prevRef} aria-label="Prev" className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-black/70 hover:text-black hover:bg-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button ref={nextRef} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-black/70 hover:text-black hover:bg-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
      <div className="flex items-center justify-between mt-3 px-1">
        <span className="mono text-xs tracking-widest text-black/40">
          {String(current).padStart(2, '0')} / {String(safeImages.length).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-1.5">
          {safeImages.slice(0, 5).map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all duration-300 ${i + 1 === current ? 'w-5 bg-black' : 'w-1.5 bg-black/20'}`} />
          ))}
        </div>
        <span className="mono text-[10px] tracking-widest uppercase text-black/30 hidden sm:inline">
          Swipe to explore
        </span>
      </div>
    </div>
  );
}
