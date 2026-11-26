import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { login, register } from '../lib/api';

type Notice = { type: 'success' | 'error'; message: string } | null;

function errorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.response?.data?.error || 'Please check your details and try again.';
  }
  return 'Something went wrong. Please try again.';
}

export function AccountPage() {
  const [notice, setNotice] = useState<Notice>(null);
  const [loading, setLoading] = useState<'login' | 'register' | null>(null);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading('login');
    setNotice(null);
    try {
      const response = await login(String(data.get('username')), String(data.get('password')));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setNotice({ type: 'success', message: `Welcome back, ${response.user.firstName || response.user.username}.` });
    } catch (error) {
      setNotice({ type: 'error', message: errorMessage(error) });
    } finally {
      setLoading(null);
    }
  }

  async function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get('password'));
    if (password !== String(data.get('confirmPassword'))) {
      setNotice({ type: 'error', message: 'Passwords do not match.' });
      return;
    }
    setLoading('register');
    setNotice(null);
    try {
      const response = await register({
        firstName: String(data.get('firstName')),
        lastName: String(data.get('lastName')),
        username: String(data.get('username')),
        email: String(data.get('email')),
        phone: String(data.get('phone')),
        password,
      });
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setNotice({ type: 'success', message: 'Your AVENZO account has been created.' });
      event.currentTarget.reset();
    } catch (error) {
      setNotice({ type: 'error', message: errorMessage(error) });
    } finally {
      setLoading(null);
    }
  }

  const input = 'w-full border border-[#dcd8d1] bg-white px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-[#9b978f] focus:border-[#0a0a0a]';
  const label = 'mb-2 block text-[10px] font-medium tracking-[0.22em] uppercase';

  return (
    <main className="flex-1 bg-[#fcfbf9] px-5 py-14 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-[10px] tracking-[0.28em] uppercase text-[#82796b]">AVENZO Account</p>
        <h1 className="text-center text-3xl font-light tracking-tight sm:text-4xl">Sign in or create an account</h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-[#6b6b6b]">
          Enjoy a more considered shopping experience, from saved favourites to a faster checkout.
        </p>

        {notice && (
          <div className={`mx-auto mt-8 max-w-2xl border px-5 py-3 text-center text-sm ${notice.type === 'success' ? 'border-[#b7c8b2] bg-[#f2f7ef] text-[#355330]' : 'border-[#e2b8b2] bg-[#fdf3f1] text-[#8b3025]'}`}>
            {notice.message}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <section className="border border-[#dedbd5] bg-white p-7 sm:p-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#82796b]">Returning client</p>
            <h2 className="mt-3 text-2xl font-light">Sign in</h2>
            <p className="mt-3 text-sm leading-6 text-[#6b6b6b]">Access your orders, saved pieces and account details.</p>
            <form className="mt-8 space-y-5" onSubmit={submitLogin}>
              <label className={label}>Username or email
                <input className={input} name="username" autoComplete="username" required placeholder="Your username" />
              </label>
              <label className={label}>Password
                <input className={input} name="password" type="password" autoComplete="current-password" required placeholder="Your password" />
              </label>
              <button disabled={loading !== null} className="w-full bg-[#0a0a0a] px-5 py-4 text-xs font-medium tracking-[0.26em] uppercase text-white transition-opacity hover:opacity-80 disabled:opacity-50">
                {loading === 'login' ? 'Signing in…' : 'Sign in'}
              </button>
              <button type="button" className="w-full text-xs tracking-[0.12em] underline underline-offset-4">Forgot your password?</button>
            </form>
          </section>

          <section className="border border-[#dedbd5] bg-[#f5f0e8] p-7 sm:p-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#82796b]">New to AVENZO</p>
            <h2 className="mt-3 text-2xl font-light">Create an account</h2>
            <p className="mt-3 text-sm leading-6 text-[#6b6b6b]">Save your information for a faster, more personal checkout.</p>
            <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={submitRegister}>
              <label className={label}>First name<input className={input} name="firstName" autoComplete="given-name" /></label>
              <label className={label}>Last name<input className={input} name="lastName" autoComplete="family-name" /></label>
              <label className={`${label} sm:col-span-2`}>Username<input className={input} name="username" autoComplete="username" required minLength={3} /></label>
              <label className={`${label} sm:col-span-2`}>Email<input className={input} name="email" type="email" autoComplete="email" required /></label>
              <label className={`${label} sm:col-span-2`}>Phone <span className="normal-case tracking-normal text-[#888]">(optional)</span><input className={input} name="phone" type="tel" autoComplete="tel" /></label>
              <label className={label}>Password<input className={input} name="password" type="password" autoComplete="new-password" required minLength={8} /></label>
              <label className={label}>Confirm password<input className={input} name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} /></label>
              <button disabled={loading !== null} className="sm:col-span-2 w-full border border-[#0a0a0a] bg-transparent px-5 py-4 text-xs font-medium tracking-[0.26em] uppercase transition-colors hover:bg-[#0a0a0a] hover:text-white disabled:opacity-50">
                {loading === 'register' ? 'Creating account…' : 'Create an account'}
              </button>
            </form>
          </section>
        </div>
        <p className="mt-8 text-center text-xs text-[#6b6b6b]">By continuing, you agree to the AVENZO terms and privacy policy. <Link className="underline underline-offset-4" to="/">Continue shopping</Link></p>
      </div>
    </main>
  );
}
