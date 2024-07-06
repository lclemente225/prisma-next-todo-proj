import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import prismadb from '@/db';
import bcrypt from 'bcryptjs';
import {cookies} from 'next/headers';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

/* export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({loginHandler})],
}); */

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();
    let key = process.env.JWT;

    const user = await prismadb.user.findUnique({
      where: {
        email: email
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
        status: 401
      })
    }else{
      cookies().set('userInfo', JSON.stringify({
        username: user.username, id: user.id, email: user.email, key 
      }))
      
      return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200
      })
    }
    

  // Handle any other HTTP method
  /* res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`); */
}
