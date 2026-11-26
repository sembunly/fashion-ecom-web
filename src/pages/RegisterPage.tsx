import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { register } from '../lib/api';
import { AuthShell, Field } from './SignInPage';

export function RegisterPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    if (form.get('password') !== form.get('confirmPassword')) { setMessage('Passwords do not match.'); return; }
    setLoading(true); setMessage('');
    try {
      const response = await register({ username: String(form.get('username')), email: String(form.get('email')), password: String(form.get('password')), firstName: String(form.get('firstName')), lastName: String(form.get('lastName')), phone: String(form.get('phone')) });
      localStorage.setItem('accessToken', response.accessToken); localStorage.setItem('refreshToken', response.refreshToken);
      setMessage('Your AVENZO account has been created.'); event.currentTarget.reset();
    } catch (error) { setMessage(axios.isAxiosError(error) ? error.response?.data?.message || 'Unable to create your account.' : 'Unable to create your account.'); }
    finally { setLoading(false); }
  }
  return <AuthShell eyebrow="New to AVENZO" title="Create an account" description="Save your details for a faster, more personal checkout.">
    <form className="grid gap-5 sm:grid-cols-2" onSubmit={submit}>
      <Field label="First name" name="firstName" autoComplete="given-name" />
      <Field label="Last name" name="lastName" autoComplete="family-name" />
      <div className="sm:col-span-2"><Field label="Username" name="username" autoComplete="username" /></div>
      <div className="sm:col-span-2"><Field label="Email" name="email" type="email" autoComplete="email" /></div>
      <div className="sm:col-span-2"><Field label="Phone" name="phone" type="tel" autoComplete="tel" /></div>
      <Field label="Password" name="password" type="password" autoComplete="new-password" />
      <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" />
      {message && <p className="sm:col-span-2 text-center text-sm text-[#6b6b6b]">{message}</p>}
      <button disabled={loading} className="sm:col-span-2 w-full border border-[#0a0a0a] py-4 text-xs tracking-[0.25em] uppercase hover:bg-[#0a0a0a] hover:text-white disabled:opacity-50">{loading ? 'Creating account…' : 'Create an account'}</button>
    </form>
    <p className="mt-7 text-center text-sm text-[#6b6b6b]">Already have an account? <Link className="underline underline-offset-4" to="/sign-in">Sign in</Link></p>
  </AuthShell>;
}
