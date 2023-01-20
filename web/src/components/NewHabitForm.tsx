import { Check } from 'phosphor-react'

export default function NewHabitForm() {
  return (
    <form className='w-full flex flex-col mt-6'>
      <label htmlFor='title' className='font-semibold leading-tight'>
        Qual o seu comprometimento?
      </label>

      <input
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        type={'text'}
        id='title'
        placeholder='ex.: Exercícios, dormir 8hrs, etc...'
        autoFocus
      />

      <label htmlFor="" className='font-semibold leading-tight mt-4'>
        Qual a recorrência?
      </label>

      <button type="submit" className='mt-6 rounded-lg p-4 flex items-center font-semibold justify-center bg-green-600 gap-3 hover:bg-green-400'>
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}
