import type { ProductSummaryResponse } from '../../types/api';
import { useStore } from '../../store/useStore';
import { Heart } from 'lucide-react';

interface Props {
  product: ProductSummaryResponse;
}

function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}

export function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  const displayImg = product.imageUrl ?? product.image?.url;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      imageUrl: displayImg ?? null,
    });
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist({ productId: product.id, slug: product.slug, name: product.name });
  }

  return (
    <article className="group relative flex flex-col cursor-pointer select-none">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f5] aspect-[3/4]">
        {displayImg ? (
          <img
            src={displayImg}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#ebebeb] flex items-center justify-center">
            <span className="text-[#c0c0c0] text-xs tracking-widest uppercase">No Image</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.onSale && (
            <span className="bg-[#0a0a0a] text-white text-[10px] font-medium tracking-widest uppercase px-2 py-0.5">
              Sale
            </span>
          )}
          {product.featured && !product.onSale && (
            <span className="bg-[#cbbba0] text-white text-[10px] font-medium tracking-widest uppercase px-2 py-0.5">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Heart
            size={18}
            className={wishlisted ? 'fill-[#0a0a0a] text-[#0a0a0a]' : 'text-[#0a0a0a]'}
            strokeWidth={1.5}
          />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#0a0a0a] text-white text-xs tracking-widest uppercase py-3 hover:bg-[#cbbba0] transition-colors duration-200"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-1 px-0.5">
        <p className="text-[11px] text-[#6b6b6b] tracking-widest uppercase">
          {product.gender ?? 'UNISEX'}
        </p>
        <h3 className="text-sm font-normal tracking-wide leading-snug line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-0.5">
          {product.onSale && product.salePrice != null ? (
            <>
              <span className="text-sm text-[#cbbba0]">{formatPrice(product.salePrice)}</span>
              <span className="text-sm text-[#9b9b9b] line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-sm">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
