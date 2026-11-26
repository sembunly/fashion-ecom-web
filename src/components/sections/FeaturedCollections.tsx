import type { CollectionResponse } from '../../types/api';
import { Skeleton } from '../ui/Feedback';

interface Props {
  collections: CollectionResponse[];
  loading?: boolean;
}

export function FeaturedCollections({ collections, loading = false }: Props) {
  return (
    <section className="px-6 lg:px-12 py-16 lg:py-20">
      {/* Section header */}
      <div className="flex items-end justify-between mb-8 lg:mb-10">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#6b6b6b] mb-2">Collections</p>
          <h2 className="text-2xl lg:text-3xl font-light tracking-wide">Shop by Collection</h2>
        </div>
        <a
          href="/collections"
          className="text-xs tracking-[0.15em] uppercase underline underline-offset-4 hover:text-[#cbbba0] transition-colors hidden sm:block"
        >
          View All
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="aspect-[3/4] w-full" />)}
        </div>
      ) : collections.length === 0 ? (
        <p className="text-sm text-[#6b6b6b] py-8">No collections available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col, idx) => {
            const imgSrc = col.imageUrl ?? col.image?.url;
            const isLarge = idx === 0;
            return (
              <a
                key={col.id}
                href={`/collections/${col.slug}`}
                className={`relative overflow-hidden bg-[#f5f5f5] group ${isLarge ? 'md:row-span-1' : ''}`}
              >
                <div className="aspect-[3/4]">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={col.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#ebebeb] flex items-center justify-center">
                      <span className="text-[#c0c0c0] text-xs tracking-widest uppercase">{col.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-white text-lg font-light tracking-widest uppercase">{col.name}</h3>
                      {col.description && (
                        <p className="text-white/70 text-xs tracking-wide mt-1 line-clamp-2">{col.description}</p>
                      )}
                      <span className="inline-block mt-3 text-white text-[10px] tracking-[0.2em] uppercase border-b border-white/60 pb-0.5 group-hover:border-white transition-colors">
                        Shop Collection
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
