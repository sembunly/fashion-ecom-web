import type { CategoryResponse } from '../../types/api';
import { Skeleton } from '../ui/Feedback';

interface Props {
  categories: CategoryResponse[];
  loading?: boolean;
}

/** AVENZO category strip — shows top-level categories as image tiles */
export function CategoryStrip({ categories, loading = false }: Props) {
  const topLevel = categories.filter(c => c.parentId === null).slice(0, 6);

  return (
    <section className="px-6 lg:px-12 py-12 lg:py-16 border-t border-[#e8e8e8]">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#6b6b6b] mb-2">Shop</p>
          <h2 className="text-2xl lg:text-3xl font-light tracking-wide">Browse Categories</h2>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex-shrink-0 w-40">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="h-3 w-20 mt-3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {topLevel.map(cat => {
            const imgSrc = cat.image?.url;
            return (
              <a
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="relative overflow-hidden bg-[#f5f5f5] aspect-[3/4]">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#ebebeb] flex items-center justify-center">
                      <span className="text-[#c0c0c0] text-[10px] tracking-widest uppercase">{cat.name[0]}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs tracking-[0.15em] uppercase text-center group-hover:text-[#cbbba0] transition-colors">
                  {cat.name}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
