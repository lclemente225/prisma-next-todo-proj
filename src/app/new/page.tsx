import React from 'react'
import Link from 'next/link'
import prismadb from '@/db';
import { redirect } from 'next/navigation';

//form action fn
async function createTodo(data:FormData){  
    "use server"
    const title = data.get("title")?.valueOf();
    let duration = data.get("duration")?.valueOf();
    //@ts-ignore
    duration = parseInt(duration);
    if(typeof title !== 'string' || title.length === 0){
        throw new Error("invalid title")
    }

    if(typeof duration !== 'number' || !duration){
      throw new Error("invalid duration")
    }

    await prismadb.todo.create({
        data:{
            title,
            duration, 
            complete: false
        }
    })
    redirect("/todoList")
}


const Page = () => {
  return (
    <>
      <header className=' flex justify-between items-center mb-4'>
            <h1 className="text-2xl">
                New Todos
            </h1>
      </header>

      <form
        action={createTodo}
        className='flex gap-2 flex-col align-center w-900'>
          <label htmlFor='todo-title'>What do?</label>
        <input type="text" name="title" id="todo-title"
            className='border border-slate-300 bg-transparent rounded mx-3 px-2 py-1
            outline-none focus-within:border-slate-100'/>
          
          <label htmlFor='todo-dur'>How long will it take to do the first step? (minutes)</label>
        <input type="text" name="duration" id="todo-dur" inputMode="numeric" pattern='[0-9]+'
            className='border border-slate-300 bg-transparent rounded mx-3 px-2 py-1
            outline-none focus-within:border-slate-100'/>
          
        <div className='flex gap-1 justify-center my-3'>
            <Link href=".." 
                className='border border-slate-300 text-slate-300 px-2 py-1
                rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>
                Cancel
            </Link>
            <button type="submit" 
                className='border border-slate-300 text-slate-300 px-2 py-1
                rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'>
                Create
          </button>
        </div>
      </form>
    </>
  )
} 

export default Page
