import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { login } from '../lib/api';

export function SignInPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true); setMessage('');
    try {
      const response = await login(String(form.get('username')), String(form.get('password')));
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      setMessage(`Welcome back, ${response.user.firstName || response.user.username}.`);
    } catch (error) {
      setMessage(axios.isAxiosError(error) ? error.response?.data?.message || 'Invalid username or password.' : 'Unable to sign in. Please try again.');
    } finally { setLoading(false); }
  }

  return <AuthShell eyebrow="Returning client" title="Sign in" description="Access your orders, saved pieces and account details.">
    <form className="space-y-5" onSubmit={submit}>
      <Field label="Username or email" name="username" autoComplete="username" />
      <Field label="Password" name="password" type="password" autoComplete="current-password" />
      {message && <p className="text-center text-sm text-[#6b6b6b]">{message}</p>}
      <button disabled={loading} className="w-full bg-[#0a0a0a] py-4 text-xs tracking-[0.25em] uppercase text-white disabled:opacity-50">{loading ? 'Signing in…' : 'Sign in'}</button>
    </form>
    <p className="mt-7 text-center text-sm text-[#6b6b6b]">New to AVENZO? <Link className="underline underline-offset-4" to="/register">Create an account</Link></p>
  </AuthShell>;
}

export function AuthShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <main className="flex-1 bg-[#fcfbf9] px-5 py-16 sm:py-24"><section className="mx-auto max-w-md border border-[#dedbd5] bg-white p-7 sm:p-10"><p className="text-center text-[10px] tracking-[0.25em] uppercase text-[#82796b]">{eyebrow}</p><h1 className="mt-3 text-center text-3xl font-light">{title}</h1><p className="mt-4 text-center text-sm leading-6 text-[#6b6b6b]">{description}</p><div className="mt-8">{children}</div></section></main>;
}

export function Field({ label, name, type = 'text', autoComplete }: { label: string; name: string; type?: string; autoComplete?: string }) {
  return <label className="block text-[10px] font-medium tracking-[0.2em] uppercase">{label}<input className="mt-2 w-full border border-[#dcd8d1] px-4 py-3.5 text-sm outline-none focus:border-[#0a0a0a]" name={name} type={type} autoComplete={autoComplete} required /></label>;
}
