import { useQuery } from '@tanstack/react-query';
import { fetchHome } from '../lib/api';
import { HeroBannerCarousel } from '../components/ui/HeroBannerCarousel';
import { PromoBanner } from '../components/ui/PromoBanner';
import { FeaturedCollections } from '../components/sections/FeaturedCollections';
import { ProductSection } from '../components/sections/ProductSection';
import { CategoryStrip } from '../components/sections/CategoryStrip';
import { ValueProps } from '../components/sections/ValueProps';
import type { ProductSectionResponse } from '../types/api';

export function HomePage() {
  const { data: home, isLoading, isError } = useQuery({
    queryKey: ['home'],
    queryFn: fetchHome,
    staleTime: 2 * 60 * 1000,
  });

  // Placeholder section responses while loading
  const placeholderSections: ProductSectionResponse[] = [
    { key: 'new-arrivals', title: 'New Arrivals',  viewAllUrl: '/api/v1/products/new-arrivals', products: [] },
    { key: 'featured',     title: 'Featured',       viewAllUrl: '/api/v1/products/featured',     products: [] },
    { key: 'best-sellers', title: 'Best Sellers',   viewAllUrl: '/api/v1/products/best-sellers', products: [] },
    { key: 'sale',         title: 'Sale',           viewAllUrl: '/api/v1/products/sale',         products: [] },
  ];

  const sections = home?.sections ?? placeholderSections;

  return (
    <main className="flex flex-col flex-1">
      {/* Hero carousel */}
      <HeroBannerCarousel
        banners={home?.heroBanners ?? []}
        loading={isLoading}
      />

      {/* Value props strip */}
      <ValueProps />

      {/* Featured Collections */}
      <FeaturedCollections
        collections={home?.featuredCollections ?? []}
        loading={isLoading}
      />

      {/* Product sections — New Arrivals, Featured, Best Sellers, Sale */}
      {sections.map((section, idx) => (
        <ProductSection
          key={section.key}
          section={section}
          loading={isLoading}
          error={isError && idx === 0}
        />
      ))}

      {/* Promotional banners */}
      {!isLoading && (home?.promotionalBanners?.length ?? 0) > 0 && (
        <PromoBanner banners={home!.promotionalBanners} />
      )}

      {/* Category strip */}
      <CategoryStrip
        categories={home?.categories ?? []}
        loading={isLoading}
      />
    </main>
  );
}
