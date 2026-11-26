import axios from 'axios';
import type {
  HomeResponse,
  NavigationItemResponse,
  CategoryResponse,
  CollectionResponse,
  BannerResponse,
  ProductPageResponse,
  ProductDetailResponse,
} from '../types/api';

// In dev, Vite proxies /api → Spring Boot; in prod Nginx handles it.
const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

// ── Navigation ────────────────────────────────────────────
export const fetchNavigation = (): Promise<NavigationItemResponse[]> =>
  api.get<NavigationItemResponse[]>('/navigation').then(r => r.data);

export const fetchNavigationBySlug = (slug: string): Promise<NavigationItemResponse> =>
  api.get<NavigationItemResponse>(`/navigation/${slug}`).then(r => r.data);

// ── Categories ────────────────────────────────────────────
export const fetchCategories = (): Promise<CategoryResponse[]> =>
  api.get<CategoryResponse[]>('/categories').then(r => r.data);

export const fetchCategoryBySlug = (slug: string): Promise<CategoryResponse> =>
  api.get<CategoryResponse>(`/categories/${slug}`).then(r => r.data);

export const fetchCategoryChildren = (slug: string): Promise<CategoryResponse[]> =>
  api.get<CategoryResponse[]>(`/categories/${slug}/children`).then(r => r.data);

// ── Collections ───────────────────────────────────────────
export const fetchCollections = (): Promise<CollectionResponse[]> =>
  api.get<CollectionResponse[]>('/collections').then(r => r.data);

export const fetchCollectionBySlug = (slug: string): Promise<CollectionResponse> =>
  api.get<CollectionResponse>(`/collections/${slug}`).then(r => r.data);

// ── Banners ───────────────────────────────────────────────
export const fetchBanners = (): Promise<BannerResponse[]> =>
  api.get<BannerResponse[]>('/banners').then(r => r.data);

// ── Homepage ──────────────────────────────────────────────
export const fetchHome = (): Promise<HomeResponse> =>
  api.get<HomeResponse>('/home').then(r => r.data);

// ── Product Sections ──────────────────────────────────────
export const fetchNewArrivals = (page = 0, size = 12): Promise<ProductPageResponse> =>
  api.get<ProductPageResponse>('/products/new-arrivals', { params: { page, size } }).then(r => r.data);

export const fetchFeatured = (page = 0, size = 12): Promise<ProductPageResponse> =>
  api.get<ProductPageResponse>('/products/featured', { params: { page, size } }).then(r => r.data);

export const fetchBestSellers = (page = 0, size = 12): Promise<ProductPageResponse> =>
  api.get<ProductPageResponse>('/products/best-sellers', { params: { page, size } }).then(r => r.data);

export const fetchSale = (page = 0, size = 12): Promise<ProductPageResponse> =>
  api.get<ProductPageResponse>('/products/sale', { params: { page, size } }).then(r => r.data);

export type CatalogParams = Record<string, string | number | boolean | undefined | null>;

export const fetchProducts = (params: CatalogParams = {}): Promise<ProductPageResponse> =>
  api.get<ProductPageResponse>('/products', { params }).then(r => r.data);

export const fetchProduct = (slug: string): Promise<ProductDetailResponse> =>
  api.get<ProductDetailResponse>(`/products/${slug}`).then(r => r.data);
