'use client'
//@ts-nocheck
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function logout(){
    fetch('/api/logout', {
        method: 'POST'
    })
    return
}

export default function Header() {
    const router = useRouter();
    const [menuStatus, setMenuStatus] = useState(false);
    return (
        <header className='flex justify-between items-center mb-4 py-4'>
          <div onClick={() => setMenuStatus(x => !x)}>
            Menu
          </div>
          {
            /* menuStatus &&  */
            <ul className='absolute top-20 left-30 bg-slate-900 border p-10'>
                <li onClick={() => {
                    logout()
                    router.push('/')
                    }} className='bg-slate-500 py-2 px-4 rounded hover:bg-slate-300 hover:cursor-pointer'>Logout</li>
            </ul>
          }
          <h1 className="text-2xl">
            <Link href='/todoList'>Todos</Link>
          </h1>
          <Link href="/new" className='border border-slate-300 text-slate-300 px-2 py-1
          rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            New
          </Link>
          
        </header>
    )
}
