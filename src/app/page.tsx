import Link from 'next/link'
import  prismadb  from '@/db'
import  TodoItem  from '@/components/TodoItem'
//THIS IS THE MAIN PAGE

//change or update a value in database
//this is passed down as props to the ./new/page.tsx
async function toggleTodo(id: string, complete: Boolean){
  'use server'
  //console.log("toggle todo",id, complete);
  await prismadb?.todo.update({
    where: { id },
    data: {
      complete
    }
  })
}

export default async function Home(){

  let todos = await prismadb.todo.findMany();

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
      <ul className='pl-4'>
        {
          todos.map((todo: any) => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))
        }
      </ul>
    </>
  )
}