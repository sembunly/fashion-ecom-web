import { useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export function SearchOverlay({ onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = inputRef.current?.value.trim();
    if (q) {
      window.location.href = `/products/search?keyword=${encodeURIComponent(q)}`;
    }
  }

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col">
      <div className="flex items-center justify-end px-6 lg:px-12 h-16 border-b border-[#e8e8e8]">
        <button onClick={onClose} aria-label="Close search">
          <X size={22} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex flex-1 items-start justify-center pt-24 px-6">
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="relative">
            <Search size={18} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#6b6b6b]" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search for products…"
              className="w-full pl-8 pr-4 py-4 border-b border-[#0a0a0a] text-xl tracking-wide bg-transparent outline-none placeholder:text-[#c0c0c0]"
            />
          </form>
          <p className="mt-6 text-xs tracking-[0.15em] uppercase text-[#6b6b6b]">
            Popular searches: Heels, Loafers, Bags, New Arrivals
          </p>
        </div>
      </div>
    </div>
  );
}
