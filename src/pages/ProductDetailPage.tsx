import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../lib/api';

const money = (value: number) => `$${value.toFixed(2)}`;

export function ProductDetailPage() {
  const { slug = '' } = useParams();
  const { data: product, isLoading, isError } = useQuery({ queryKey: ['product', slug], queryFn: () => fetchProduct(slug), enabled: Boolean(slug) });
  if (isLoading) return <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12"><div className="h-96 bg-[#f3f3f3] animate-pulse" /></main>;
  if (isError || !product) return <main className="flex-1 px-6 py-24 text-center">Product not found.</main>;
  const primaryImage = product.images[0]?.media.url;
  const lowest = Math.min(...product.variants.map(variant => variant.salePrice ?? variant.price), product.basePrice);
  return <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 grid md:grid-cols-2 gap-10 lg:gap-16">
    <div className="bg-[#f5f5f5] aspect-[3/4] overflow-hidden">{primaryImage && <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />}</div>
    <section className="py-2">
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b]">{product.gender ?? 'Unisex'}</p>
      <h1 className="mt-3 text-3xl font-light tracking-wide">{product.name}</h1>
      <p className="mt-4 text-lg">From {money(lowest)}</p>
      {product.material && <p className="mt-5 text-sm text-[#6b6b6b]">{product.material}</p>}
      {product.description && <p className="mt-6 text-sm leading-7 text-[#404040]">{product.description}</p>}
      <div className="mt-8 border-t border-[#e8e8e8] pt-6"><p className="text-xs tracking-widest uppercase">Available variants</p>
        <div className="mt-4 flex flex-wrap gap-2">{product.variants.map(variant => <span key={variant.id} className="border border-[#d6d6d6] px-3 py-2 text-xs">{variant.colorName}{variant.sizeName ? ` · ${variant.sizeName}` : ''}</span>)}</div>
      </div>
    </section>
  </main>;
}
