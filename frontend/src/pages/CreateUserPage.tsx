import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateUserPage() {
  const navigate = useNavigate()
  //states to handle data for our api
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
//state to handle states of promise
  const [error, setError] = useState('') //for error .catch()
  const [isSubmitting, setIsSubmitting] = useState(false) // for pending state
  const [isCreated, setIsCreated] = useState(false) //for the sucess state .then()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/create/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, age: age ? Number(age) : undefined, password }),
      })
      const result = await response.json()

      if (!response.ok) throw new Error(result.error || 'Unable to create user')
      setIsCreated(true)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create user')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto min-h-screen w-[calc(100%-2rem)] max-w-xl py-10 font-serif text-[#162322] sm:w-[calc(100%-3rem)] sm:py-18">
      <button className="mb-14 bg-transparent p-0 font-serif text-[#64706d] transition hover:text-[#b5492e] sm:mb-19" type="button" onClick={() => navigate('/')}>← Home</button>
      <div className="mb-9">
        <p className="mb-3.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-[#b5492e]">New account</p>
        <h1 className="text-[42px] font-normal leading-[0.98] tracking-[-0.06em] sm:text-[64px]">Create a user.</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#64706d] sm:text-xl">Add your details to create an account.</p>
      </div>
      {isCreated ? (
        <div className="border border-[#d7ddd3] bg-[#fffef9] p-5 sm:p-7">
          <p className="mb-5 font-sans text-sm text-[#2f6b4f]" role="status">Your account was created successfully.</p>
          <button className="rounded-[3px] bg-[#e26743] px-5 py-3 font-sans text-sm font-bold text-[#fffaf2] transition hover:-translate-y-0.5 hover:bg-[#b5492e]" type="button" onClick={() => navigate('/login')}>Go to login</button>
        </div>
      ) : (
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <label>name <input value={name} onChange={(event) => setName(event.target.value)} className='border border-red-700' type='text'/></label>
           <label>email <input value={email} onChange={(event) => setEmail(event.target.value)} className='border border-red-700' type='text'/></label>
            <label>password <input value={password} onChange={(event) => setPassword(event.target.value)} className='border border-red-700' type='text'/></label>
             <label>age <input value={age} onChange={(event) => setAge(event.target.value)} className='border border-red-700' type='number'/></label>
          <button type='submit' className='border border-red-500'>create user</button>
        </form>
        // <form className="grid gap-5 border border-[#d7ddd3] bg-[#fffef9] p-5 sm:p-7" onSubmit={handleSubmit}>
        //   <label className="grid gap-2 font-sans text-[13px] font-bold">Name<input className="w-full rounded-sm border border-[#d7ddd3] bg-[#f5f6ef] p-3.5 font-serif text-base font-normal outline-none focus:border-[#e26743] focus:ring-2 focus:ring-[#e26743]" type="text" value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>
        //   <label className="grid gap-2 font-sans text-[13px] font-bold">Email<input className="w-full rounded-sm border border-[#d7ddd3] bg-[#f5f6ef] p-3.5 font-serif text-base font-normal outline-none focus:border-[#e26743] focus:ring-2 focus:ring-[#e26743]" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
        //   <label className="grid gap-2 font-sans text-[13px] font-bold">Age<input className="w-full rounded-sm border border-[#d7ddd3] bg-[#f5f6ef] p-3.5 font-serif text-base font-normal outline-none focus:border-[#e26743] focus:ring-2 focus:ring-[#e26743]" type="number" min="0" value={age} onChange={(event) => setAge(event.target.value)} /></label>
        //   <label className="grid gap-2 font-sans text-[13px] font-bold">Password<input className="w-full rounded-sm border border-[#d7ddd3] bg-[#f5f6ef] p-3.5 font-serif text-base font-normal outline-none focus:border-[#e26743] focus:ring-2 focus:ring-[#e26743]" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="new-password" /></label>
        //   {error && <p className="-mt-1 font-sans text-sm text-[#a33224]" role="alert">{error}</p>}
        //   <button className="rounded-[3px] bg-[#e26743] px-5 py-3 font-sans text-sm font-bold text-[#fffaf2] transition hover:-translate-y-0.5 hover:bg-[#b5492e] disabled:cursor-wait disabled:opacity-65" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating user...' : 'Create user'}</button>
        // </form>
      )}
    </main>
  )
}

export default CreateUserPage