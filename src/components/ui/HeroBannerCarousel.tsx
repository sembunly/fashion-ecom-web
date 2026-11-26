import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { BannerResponse } from '../../types/api';
import { Skeleton } from './Feedback';

interface Props {
  banners: BannerResponse[];
  loading?: boolean;
}

export function HeroBannerCarousel({ banners, loading = false }: Props) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % Math.max(1, banners.length)), [banners.length]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + banners.length) % Math.max(1, banners.length)), [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [banners.length, next]);

  if (loading) {
    return <Skeleton className="w-full aspect-[16/7] lg:aspect-[16/6]" />;
  }

  if (banners.length === 0) {
    // Fallback placeholder banner
    return (
      <div className="relative w-full aspect-[16/7] lg:aspect-[16/6] bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
        <div className="text-center px-6">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-4">New Collection</p>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light tracking-wider leading-tight">
            Redefine<br />Your Style
          </h1>
          <p className="text-white/60 text-sm tracking-widest uppercase mt-6">Shop Now</p>
        </div>
      </div>
    );
  }

  const banner = banners[current];
  const imgSrc = banner.imageUrl ?? banner.media?.url;

  return (
    <div className="relative w-full overflow-hidden bg-[#f5f5f5] group">
      {/* Slide */}
      <a
        href={banner.targetUrl ?? '#'}
        className="block relative aspect-[16/7] lg:aspect-[16/6]"
        tabIndex={-1}
        aria-label={banner.title}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a]" />
        )}
        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-8 md:p-14 bg-gradient-to-t from-black/50 via-transparent to-transparent">
          <h1 className="text-white text-2xl md:text-5xl lg:text-6xl font-light tracking-widest leading-tight max-w-xl">
            {banner.title}
          </h1>
          {banner.targetUrl && (
            <span className="mt-4 md:mt-6 text-white text-xs tracking-[0.2em] uppercase border-b border-white/60 pb-0.5 hover:border-white transition-colors">
              Shop Now
            </span>
          )}
        </div>
      </a>

      {/* Prev / Next */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous banner"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next banner"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-6 h-0.5 transition-all duration-300 ${i === current ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
