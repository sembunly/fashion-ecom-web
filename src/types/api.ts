// ─────────────────────────────────────────────────────────────────────────────
// API Types — mirrors the Spring Boot storefront DTOs exactly
// ─────────────────────────────────────────────────────────────────────────────

export interface MediaResponse {
  id: number;
  bucket: string;
  objectKey: string;
  contentType: string;
  sizeBytes: number;
  /** Pre-built MinIO public URL */
  url: string;
}

export interface NavigationItemResponse {
  id: number;
  name: string;
  slug: string;
  categoryId: number | null;
  categorySlug: string | null;
  collectionId: number | null;
  collectionSlug: string | null;
  url: string | null;
  sortOrder: number;
  image: MediaResponse | null;
  children: NavigationItemResponse[];
}

export interface CategoryResponse {
  id: number;
  parentId: number | null;
  name: string;
  slug: string;
  description: string | null;
  image: MediaResponse | null;
  sortOrder: number;
  children: CategoryResponse[];
}

export interface CollectionResponse {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: MediaResponse | null;
  imageUrl: string | null;
}

export interface BannerResponse {
  id: number;
  title: string;
  media: MediaResponse;
  imageUrl: string | null;
  targetUrl: string | null;
  sortOrder: number;
  startsAt: string | null;
  endsAt: string | null;
}

export interface ProductSummaryResponse {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  /** Lowest variant price */
  price: number;
  /** Lowest variant sale_price — null when not on sale */
  salePrice: number | null;
  onSale: boolean;
  gender: string | null;
  material: string | null;
  featured: boolean;
  image: MediaResponse | null;
  imageUrl: string | null;
  createdAt: string;
}

export interface ProductSectionResponse {
  key: string;
  title: string;
  viewAllUrl: string;
  products: ProductSummaryResponse[];
}

export interface ProductPageResponse {
  items: ProductSummaryResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface HomeResponse {
  navigation: NavigationItemResponse[];
  heroBanners: BannerResponse[];
  promotionalBanners: BannerResponse[];
  categories: CategoryResponse[];
  featuredCollections: CollectionResponse[];
  sections: ProductSectionResponse[];
}

export interface VariantResponse {
  id: number;
  sku: string;
  price: number;
  salePrice: number | null;
  stockQuantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  sizeId: number | null;
  sizeName: string | null;
  colorId: number;
  colorName: string;
  colorHexCode: string;
}

export interface ProductImageResponse {
  id: number;
  media: MediaResponse;
  colorId: number | null;
  altText: string | null;
  sortOrder: number;
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  gender: string | null;
  material: string | null;
  featured: boolean;
  categories: CategoryResponse[];
  collections: CollectionResponse[];
  images: ProductImageResponse[];
  variants: VariantResponse[];
  createdAt: string;
}
