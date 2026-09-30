import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type User = { name?: string; email: string; age?: number }

function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isCurrent = true
    fetch('/api/me', { credentials: 'include' })
      .then(async (response) => { if (!response.ok) throw new Error('Not authenticated'); return response.json() })
      .then((result) => { if (isCurrent) setUser(result.user) })
      .catch(() => { if (isCurrent) navigate('/login') })
      .finally(() => { if (isCurrent) setIsLoading(false) })
    return () => { isCurrent = false }
  }, [navigate])

  if (isLoading) return <main className="mx-auto flex min-h-screen w-[calc(100%-2rem)] max-w-5xl flex-col justify-center py-10 font-serif text-[#162322] sm:w-[calc(100%-3rem)] sm:py-18"><p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">Checking your session</p><h1 className="text-5xl font-normal tracking-[-0.08em] sm:text-[52px]">Loading dashboard...</h1></main>
  if (!user) return null

  return <main className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-5xl py-10 font-serif text-[#162322] sm:w-[calc(100%-3rem)] sm:py-18"><div className="mb-11 flex items-start justify-between gap-6 sm:mb-16"><div><p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">Your dashboard</p><h1 className="max-w-3xl text-[42px] font-normal leading-[0.98] tracking-[-0.06em] sm:text-[68px]">Hello, {user.name || user.email}.</h1></div><button className="rounded-[3px] border border-[#d7ddd3] bg-transparent px-5 py-3 font-sans text-sm font-bold text-[#162322] transition hover:-translate-y-0.5 hover:bg-[#fffef9] hover:text-[#b5492e]" type="button" onClick={() => navigate('/')}>Home</button></div><section className="max-w-2xl border-t border-[#d7ddd3] pt-7" aria-labelledby="details-title"><p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">Account details</p><h2 className="mb-7 text-[32px] font-normal tracking-tighter" id="details-title">Profile</h2><dl className="m-0"><div className="flex justify-between gap-5 border-t border-[#d7ddd3] py-4"><dt className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[#64706d]">Name</dt><dd className="m-0 text-right">{user.name || 'Not provided'}</dd></div><div className="flex justify-between gap-5 border-t border-[#d7ddd3] py-4"><dt className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[#64706d]">Email</dt><dd className="m-0 text-right">{user.email}</dd></div><div className="flex justify-between gap-5 border-t border-[#d7ddd3] py-4"><dt className="font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-[#64706d]">Age</dt><dd className="m-0 text-right">{user.age ?? 'Not provided'}</dd></div></dl></section></main>
}

export default DashboardPage
