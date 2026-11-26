import { Link } from 'react-router-dom';

export function AccountPage() {
  return (
    <main className="flex-1 bg-[#fcfbf9] px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#82796b]">AVENZO Account</p>
        <h1 className="mt-3 text-3xl font-light sm:text-4xl">Welcome to AVENZO</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6b6b6b]">Sign in to your account or create one for a faster, more personal shopping experience.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Link to="/sign-in" className="border border-[#dedbd5] bg-white p-10 transition-colors hover:border-[#0a0a0a]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#82796b]">Returning client</p>
            <h2 className="mt-3 text-2xl font-light">Sign in</h2>
            <p className="mt-3 text-sm text-[#6b6b6b]">Access your orders, saved pieces and details.</p>
            <span className="mt-7 inline-block bg-[#0a0a0a] px-8 py-3 text-xs tracking-[0.22em] uppercase text-white">Sign in</span>
          </Link>
          <Link to="/register" className="border border-[#dedbd5] bg-[#f5f0e8] p-10 transition-colors hover:border-[#0a0a0a]">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#82796b]">New to AVENZO</p>
            <h2 className="mt-3 text-2xl font-light">Create an account</h2>
            <p className="mt-3 text-sm text-[#6b6b6b]">Save your details for a considered checkout.</p>
            <span className="mt-7 inline-block border border-[#0a0a0a] px-8 py-3 text-xs tracking-[0.22em] uppercase">Create account</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
