export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#ebebeb] rounded ${className}`} />
  );
}

export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin"
      aria-label="Loading"
    >
      <circle cx="12" cy="12" r="10" stroke="#e8e8e8" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="text-4xl">⚠️</span>
      <p className="text-sm text-[#6b6b6b] max-w-xs">{message}</p>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="text-4xl opacity-30">∅</span>
      <p className="text-sm text-[#6b6b6b]">{message}</p>
    </div>
  );
}
