import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    let isCurrent = true
    fetch('/api/me', { credentials: 'include' })
      .then((response) => { if (response.ok) navigate('/dashboard') })
      .catch(() => undefined)
      .finally(() => { if (isCurrent) setIsCheckingAuth(false) })
    return () => { isCurrent = false }
  }, [navigate])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ email, password }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Unable to log in')
      navigate('/dashboard')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to log in')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isCheckingAuth) return <main className="mx-auto flex min-h-screen w-[calc(100%-2rem)] max-w-5xl flex-col justify-center py-10 font-serif text-[#162322] sm:w-[calc(100%-3rem)] sm:py-18"><p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">Checking your session</p><h1 className="text-5xl font-normal tracking-[-0.08em] sm:text-[52px]">Loading login...</h1></main>

  return (
    <main className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-xl py-10 font-serif text-[#162322] sm:w-[calc(100%-3rem)] sm:py-18">
      <button className="mb-14 bg-transparent p-0 font-serif text-[#64706d] transition hover:text-[#b5492e] sm:mb-19" type="button" onClick={() => navigate('/')}>← Home</button>
      <div className="mb-9"><p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">Welcome back</p><h1 className="text-[42px] font-normal leading-[0.98] tracking-[-0.06em] sm:text-[64px]">Log in to your account.</h1><p className="mt-6 max-w-lg text-lg leading-relaxed text-[#64706d] sm:text-xl">Use your account details to continue to the dashboard.</p></div>
      <form className="grid gap-5 border border-[#d7ddd3] bg-[#fffef9] p-5 sm:p-7" onSubmit={handleSubmit}>
        <label className="grid gap-2 font-sans text-[13px] font-bold">Email<input className="w-full rounded-sm border border-[#d7ddd3] bg-[#f5f6ef] p-3.5 font-serif text-base font-normal outline-none focus:border-[#e26743] focus:ring-2 focus:ring-[#e26743]" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
        <label className="grid gap-2 font-sans text-[13px] font-bold">Password<input className="w-full rounded-sm border border-[#d7ddd3] bg-[#f5f6ef] p-3.5 font-serif text-base font-normal outline-none focus:border-[#e26743] focus:ring-2 focus:ring-[#e26743]" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
        {error && <p className="-mt-1 font-sans text-sm text-[#a33224]" role="alert">{error}</p>}
        <button className="rounded-[3px] bg-[#e26743] px-5 py-3 font-sans text-sm font-bold text-[#fffaf2] transition hover:-translate-y-0.5 hover:bg-[#b5492e] disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Log in'}</button>
      </form>
    </main>
  )
}

export default LoginPage
