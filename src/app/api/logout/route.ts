import {cookies} from 'next/headers';

export async function POST(req: Request) {

      cookies().delete('userInfo')
      
      return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200
      })
}
