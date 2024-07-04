import Link from 'next/link'
import GenHeader from './ui/dashboard/GenHeader';
import Image from 'next/image';

export default async function Home(){
  'use client'
  
  try {

    return (
      <>
      <GenHeader/>
      <span className='flex text-3xl justify-center items-center mb-4'>
        Welcome to Lawrence's Task List App.
      </span>
      <div className='flex flex-col h-full w-100 justify-center items-center gap-2 '>
      <Image src="/Notebook graphic.png"
        alt="notebook logo"
        width={600}
        height={500}/>
        
        <div className='flex justify-center align-center gap-2'>
          <Link href="login" 
          className='border border-slate-300 bg-slate-900 px-4 py-2 rounded hover:bg-slate-700'>
            Login
          </Link>
          <Link href="register" 
          className='border border-slate-300 bg-slate-900 px-4 py-2 rounded hover:bg-slate-700'>
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
        An error occurred. Please Refresh.
      </div>
      </>
    );
  }
}