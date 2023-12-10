import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/db';
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  async function handleClick(){
      await prismadb.todo.insert({
        data:{
          title: "Secondth",
          complete: false,
        }
      })
  }
 const todos = prismadb.todo.findMany();

  res.status(200).json({ message: 'Hello from Next.js!' })
}