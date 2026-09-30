import { useNavigate } from 'react-router-dom'

function Homepage() {
  const navigate = useNavigate()

  return (
    <main className="mx-auto flex min-h-screen w-[calc(100%-2rem)] max-w-5xl flex-col justify-center py-10 font-serif text-[#162322] sm:w-[calc(100%-3rem)] sm:py-18">
      <p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">Backend Integration</p>
      <p className="mb-8 max-w-lg text-lg leading-relaxed text-[#64706d] sm:text-xl">Sign in to see your account details, or explore the dashboard route.</p>
      <div className="flex flex-wrap gap-3">
        <button className="rounded-[3px] bg-[#e26743] px-5 py-3 font-sans text-sm font-bold text-[#fffaf2] transition hover:-translate-y-0.5 hover:bg-[#b5492e]" type="button" onClick={() => navigate('/login')}>Log in</button>
        <button className="rounded-[3px] border border-[#d7ddd3] bg-transparent px-5 py-3 font-sans text-sm font-bold text-[#162322] transition hover:-translate-y-0.5 hover:bg-[#fffef9] hover:text-[#b5492e]" type="button" onClick={() => navigate('/create-user')}>Create user</button>
        <button className="rounded-[3px] border border-[#d7ddd3] bg-transparent px-5 py-3 font-sans text-sm font-bold text-[#162322] transition hover:-translate-y-0.5 hover:bg-[#fffef9] hover:text-[#b5492e]" type="button" onClick={() => navigate('/dashboard')}>Open dashboard</button>
      </div>
    </main>
  )
}

export default Homepage
