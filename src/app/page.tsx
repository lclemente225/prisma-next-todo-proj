import Link from 'next/link'

export default async function Home(){
  'use client'
  
  try {

    return (
      <>
      <header className=' flex justify-center items-center mb-4'>
        <h1 className="text-2xl">
          Todos
        </h1>
      </header>
      <div className='flex border h-full w-100 justify-center align-center gap-2 '>
        <div className='flex border h-50 w-50 justify-center align-center gap-2'>
          <Link href="login" 
          className='border border-slate-500 px-4 py-2 rounded hover:bg-slate-700'>
            Login
          </Link>
          <Link href="register" 
          className='border border-slate-500 px-4 py-2 rounded hover:bg-slate-700'>
            Register
          </Link>
        </div>
      </div>
        
      </>
    );
  } catch (error) {
    console.error('Error fetching todos:', error);

    return (
      <>
      <header className=' flex justify-between items-center mb-4'>
          <h1 className="text-2xl">
            Todos
          </h1>
          <Link href="/new" className='border border-slate-300 text-slate-300 px-2 py-1
          rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            New
          </Link>
        </header>
      <div className="text-red-500">
        An error occurred. Please Refresh
      </div>
      </>
    );
  }
}