import { Plus } from 'phosphor-react'

import logoImg from '../assets/Logo.svg'

export default function Header() {
  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logoImg} alt='Habits logo' />
      <button
        type='button'
        className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex gap-3 items-center hover:border-violet-300'
      >
        <Plus size={20} className='text-violet-500' />
        Novo hábito
      </button>
    </div>
  )
}
