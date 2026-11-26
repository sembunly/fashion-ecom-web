import type { ProductSectionResponse } from '../../types/api';
import { ProductCard } from '../ui/ProductCard';
import { ProductGridSkeleton } from '../ui/ProductCardSkeleton';
import { ErrorMessage, EmptyState } from '../ui/Feedback';

interface Props {
  section: ProductSectionResponse;
  loading?: boolean;
  error?: boolean;
}

export function ProductSection({ section, loading = false, error = false }: Props) {
  return (
    <section className="px-6 lg:px-12 py-14 lg:py-20 border-t border-[#e8e8e8]">
      {/* Header */}
      <div className="flex items-end justify-between mb-8 lg:mb-10">
        <div>
          <h2 className="text-2xl lg:text-3xl font-light tracking-wide">{section.title}</h2>
        </div>
        <a
          href={section.viewAllUrl}
          className="text-xs tracking-[0.15em] uppercase underline underline-offset-4 hover:text-[#cbbba0] transition-colors hidden sm:block"
        >
          View All
        </a>
      </div>

      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : error ? (
        <ErrorMessage message={`Failed to load ${section.title}. Please try again.`} />
      ) : section.products.length === 0 ? (
        <EmptyState message={`No products in ${section.title} yet.`} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7">
          {section.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Mobile View All */}
      <div className="mt-8 flex justify-center sm:hidden">
        <a
          href={section.viewAllUrl}
          className="text-xs tracking-[0.15em] uppercase underline underline-offset-4"
        >
          View All {section.title}
        </a>
      </div>
    </section>
  );
}
