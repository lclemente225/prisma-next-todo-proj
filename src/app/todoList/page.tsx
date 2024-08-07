
import Link from 'next/link'
import  prismadb  from '@/db'
import  TodoItem  from '@/app/ui/TodoItem'
import { revalidatePath } from 'next/cache'
import Header from '../ui/dashboard/Header'
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

async function deleteItem(id: string){
  'use server'
  if(!prismadb){
    throw new Error("Prisma client not initialized")
  }

  try {
  //delete todo item
  await prismadb?.todo.delete({where: {id}})
  revalidatePath('/')

  }catch(err){
    console.error("Failed to delete todo item", err);
    throw err
  }
  
}

export default async function Home(){
  'use client'
  
  try {
    let todos = await prismadb.todo.findMany();

    return (
      <>
         <Header/>
        <ul className='pl-4'>
          {
          todos.map((todo: any) => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} deleteItem={deleteItem}/>
          ))
          }
        </ul>
      </>
    );
  } catch (error) {
    console.error('Error fetching todos:', error);

    return (
      <>
      <header className=' flex justify-between items-center mb-4 py-4'>
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
        An error occurred while fetching todos. Please try again later.
      </div>
      </>
    );
  }
}