import Link from 'next/link'
import { prisma } from '@/db'
import {testData} from '../dummy-data/data'

export default async function Home(){
  await prisma.todo.insert({
      data:{
        title: "Secondth",
        complete: false,
        createdAt: "Now",
        updatedAt: "Now"
      }
    })
  const todoss = await prisma.todo.findMany();
  const todos = testData;

  return (
    <>
      <header className=' flex justify-between items-center mb-4'>
          <h1 className="text-2xl">Todos</h1>
          <Link href="/dude" className='border border-slate-300 text-slate-300 px-2 py-1
          rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            New
          </Link>
      </header>
      <h1>{todoss.title}</h1>
      <ul className='pl-4'>
        {todos.map(todo => (
          <li key={todo.id}>
            <h1>{todo.title}</h1>
            <p>{todo.content}</p>
          </li>
        ))}
      </ul>
    </>
  )
}