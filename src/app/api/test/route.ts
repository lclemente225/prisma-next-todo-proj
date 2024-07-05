import prismadb from '@/db';

export default function handler(req: Request) {
  async function handleClick(){
      await prismadb.todo.insert({
        data:{
          title: "Secondth",
          complete: false,
        }
      })
  }

 const todos = prismadb.todo.findMany();

  return  new Response(JSON.stringify({ message: 'Hello from Next.js!' }), {
    status: 200
  })
}

