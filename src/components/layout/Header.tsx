import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchNavigation } from '../../lib/api';
import type { NavigationItemResponse } from '../../types/api';
import { useStore } from '../../store/useStore';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const { cartCount, cartOpen, searchOpen, mobileMenuOpen, setCartOpen, setSearchOpen, setMobileMenuOpen } = useStore();
  const count = cartCount();

  const { data: navItems = [] } = useQuery({
    queryKey: ['navigation'],
    queryFn: fetchNavigation,
    staleTime: 5 * 60 * 1000,
  });

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openMenu(slug: string) {
    clearTimeout(closeTimer.current);
    setActiveNav(slug);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setActiveNav(null), 180);
  }

  function cancelClose() {
    clearTimeout(closeTimer.current);
  }

  const topLevel = navItems.filter(n => !n.children || n.children.length === 0
    ? true : true); // show all top-level items

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}
      >
        {/* Announcement bar */}
        <div className="bg-[#0a0a0a] text-white text-center text-[10px] tracking-[0.2em] uppercase py-2 px-4">
          Free shipping on orders over $150 · New Collection Now Available
        </div>

        {/* Main header row */}
        <div className="flex items-center justify-between px-6 lg:px-12 h-16">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 -ml-1.5"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 font-light text-xl tracking-[0.35em] uppercase">
            AVENZO
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 ml-12" aria-label="Main navigation">
            {topLevel.map(item => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeNav === item.slug}
                onMouseEnter={() => openMenu(item.slug)}
                onMouseLeave={scheduleClose}
              />
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 ml-auto lg:ml-0">
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="hidden lg:block p-1 hover:opacity-60 transition-opacity">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <a href="/account" aria-label="Account" className="hidden lg:block p-1 hover:opacity-60 transition-opacity">
              <User size={18} strokeWidth={1.5} />
            </a>
            <a href="/wishlist" aria-label="Wishlist" className="p-1 hover:opacity-60 transition-opacity">
              <Heart size={18} strokeWidth={1.5} />
            </a>
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Cart (${count} items)`}
              className="relative p-1 hover:opacity-60 transition-opacity"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0a0a0a] text-white text-[9px] font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {activeNav && (
          <MegaMenu
            items={navItems}
            activeSlug={activeNav}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          />
        )}
      </header>

      {/* Overlays */}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
      {mobileMenuOpen && <MobileMenu items={navItems} onClose={() => setMobileMenuOpen(false)} />}
    </>
  );
}

// ── Nav Item ──────────────────────────────────────────────

interface NavItemProps {
  item: NavigationItemResponse;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function NavItem({ item, isActive, onMouseEnter, onMouseLeave }: NavItemProps) {
  const hasChildren = item.children.length > 0;
  const href = item.url ?? (item.categorySlug ? `/categories/${item.categorySlug}` : item.collectionSlug ? `/collections/${item.collectionSlug}` : '#');

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <a
        href={href}
        className={`flex items-center gap-1 text-xs tracking-[0.15em] uppercase pb-5 pt-5 border-b-2 transition-colors duration-200 ${
          isActive ? 'border-[#0a0a0a] text-[#0a0a0a]' : 'border-transparent text-[#0a0a0a] hover:text-[#6b6b6b]'
        }`}
      >
        {item.name}
        {hasChildren && <ChevronDown size={12} className={`transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />}
      </a>
    </div>
  );
}

// ── Mega Menu Panel ───────────────────────────────────────

interface MegaMenuProps {
  items: NavigationItemResponse[];
  activeSlug: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function MegaMenu({ items, activeSlug, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const active = items.find(i => i.slug === activeSlug);
  if (!active || active.children.length === 0) return null;

  const coverImg = active.image?.url ?? active.children.find(c => c.image)?.image?.url;

  return (
    <div
      className="absolute left-0 right-0 bg-white border-t border-[#e8e8e8] shadow-lg z-40 animate-in fade-in-0 slide-in-from-top-1 duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-12 py-10 flex gap-16">
        {/* Links */}
        <div className="flex gap-14">
          {/* Group children into sub-groups or list flat */}
          <div className="min-w-[140px]">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#6b6b6b] mb-4">{active.name}</p>
            <ul className="flex flex-col gap-2.5">
              {active.children.map(child => {
                const childHref = child.url
                  ?? (child.categorySlug ? `/categories/${child.categorySlug}` : child.collectionSlug ? `/collections/${child.collectionSlug}` : '#');
                return (
                  <li key={child.id}>
                    <a
                      href={childHref}
                      className="text-sm tracking-wide hover:text-[#cbbba0] transition-colors duration-150"
                    >
                      {child.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Featured image */}
        {coverImg && (
          <div className="ml-auto hidden xl:flex gap-4">
            <div className="relative overflow-hidden w-56 aspect-[3/4] bg-[#f5f5f5] group">
              <img
                src={coverImg}
                alt={active.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
                <p className="text-white text-xs tracking-widest uppercase">{active.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
