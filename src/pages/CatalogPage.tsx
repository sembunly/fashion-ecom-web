import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../lib/api';
import { ProductCard } from '../components/ui/ProductCard';

type Mode = 'all' | 'search' | 'category' | 'collection';

export function CatalogPage({ mode = 'all' }: { mode?: Mode }) {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') ?? undefined;
  const title = mode === 'search' ? `Search: ${keyword ?? ''}` : mode === 'category' || mode === 'collection'
    ? (slug ?? '').replaceAll('-', ' ') : 'All Products';
  const params = {
    keyword: mode === 'search' ? keyword : undefined,
    category: mode === 'category' ? slug : undefined,
    collection: mode === 'collection' ? slug : undefined,
    page: Number(searchParams.get('page') ?? 0),
    sizePerPage: 12,
    sort: searchParams.get('sort') ?? 'newest',
  };
  const { data, isLoading, isError } = useQuery({ queryKey: ['products', params], queryFn: () => fetchProducts(params) });

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-3">AVENZO Collection</p>
      <h1 className="text-3xl font-light tracking-wide capitalize">{title}</h1>
      <p className="mt-3 text-sm text-[#6b6b6b]">{data ? `${data.totalElements} products` : 'Loading products…'}</p>
      {isError && <p className="mt-10 text-sm">Unable to load products. Please try again.</p>}
      <section className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {isLoading ? Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[3/4] bg-[#f3f3f3] animate-pulse" />)
          : data?.items.map(product => <Link key={product.id} to={`/products/${product.slug}`}><ProductCard product={product} /></Link>)}
      </section>
      {data && data.totalPages > 1 && <div className="mt-12 flex justify-center gap-4 text-sm">
        {data.hasPrevious && <Link to={`?page=${data.page - 1}`}>Previous</Link>}
        {data.hasNext && <Link to={`?page=${data.page + 1}`}>Next</Link>}
      </div>}
    </main>
  );
}
