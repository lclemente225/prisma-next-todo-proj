import {cookies} from 'next/headers';

export async function POST(req: Request) {
    console.log("logging out", cookies().getAll())

      cookies().delete('userInfo')
      console.log(cookies().getAll())
      
      return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200
      })
}
