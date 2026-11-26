import type { BannerResponse } from '../../types/api';

interface Props {
  banners: BannerResponse[];
}

export function PromoBanner({ banners }: Props) {
  if (banners.length === 0) return null;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8e8e8]">
      {banners.slice(0, 2).map(banner => {
        const imgSrc = banner.imageUrl ?? banner.media?.url;
        return (
          <a
            key={banner.id}
            href={banner.targetUrl ?? '#'}
            className="relative overflow-hidden aspect-[4/3] bg-[#f5f5f5] group block"
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt={banner.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 flex items-end p-6 md:p-10 bg-gradient-to-t from-black/40 via-transparent to-transparent">
              <div>
                <p className="text-white text-xs tracking-[0.2em] uppercase mb-1 opacity-80">
                  {banner.title}
                </p>
                <span className="text-white text-xs tracking-widest uppercase border-b border-white/60 pb-0.5">
                  Explore
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </section>
  );
}
