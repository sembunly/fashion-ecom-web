import { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import type { NavigationItemResponse } from '../../types/api';

interface Props {
  items: NavigationItemResponse[];
  onClose: () => void;
}

export function MobileMenu({ items, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden
      />
      {/* Drawer */}
      <aside className="fixed inset-y-0 left-0 z-50 w-80 bg-white flex flex-col overflow-y-auto lg:hidden">
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#e8e8e8]">
          <span className="font-light text-lg tracking-[0.3em] uppercase">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 py-4">
          {items.map(item => {
            const isExpanded = expanded === item.slug;
            const href = item.url ?? (item.categorySlug ? `/categories/${item.categorySlug}` : item.collectionSlug ? `/collections/${item.collectionSlug}` : '#');
            const hasChildren = item.children.length > 0;

            return (
              <div key={item.id} className="border-b border-[#f0f0f0]">
                <div className="flex items-center justify-between px-6 py-4">
                  <a
                    href={href}
                    onClick={onClose}
                    className="text-xs tracking-[0.15em] uppercase flex-1"
                  >
                    {item.name}
                  </a>
                  {hasChildren && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : item.slug)}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      className="p-1 -mr-1"
                    >
                      {isExpanded ? <ChevronDown size={16} strokeWidth={1.5} /> : <ChevronRight size={16} strokeWidth={1.5} />}
                    </button>
                  )}
                </div>
                {hasChildren && isExpanded && (
                  <div className="pb-2">
                    {item.children.map(child => {
                      const childHref = child.url ?? (child.categorySlug ? `/categories/${child.categorySlug}` : child.collectionSlug ? `/collections/${child.collectionSlug}` : '#');
                      return (
                        <a
                          key={child.id}
                          href={childHref}
                          onClick={onClose}
                          className="block px-10 py-2.5 text-sm text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
                        >
                          {child.name}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer links */}
        <div className="border-t border-[#e8e8e8] py-6 px-6 flex flex-col gap-3">
          <a href="/account" className="text-xs tracking-[0.15em] uppercase text-[#6b6b6b]">My Account</a>
          <a href="/wishlist" className="text-xs tracking-[0.15em] uppercase text-[#6b6b6b]">Wishlist</a>
        </div>
      </aside>
    </>
  );
}
