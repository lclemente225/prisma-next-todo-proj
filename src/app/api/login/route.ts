import prismadb from '@/db';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

/* export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({loginHandler})],
}); */

export async function POST(req: NextRequest) {
  console.log("logging in")
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
      let oneDay = 24*60*60*1000;
      cookies().set('userInfo', JSON.stringify({
        username: user.username, id: user.id, email: user.email, key 
      }),{
        expires: Date.now() + oneDay
      })
      console.log("log in check cookie", cookies().get('userInfo'))
      return new Response(JSON.stringify({ message: 'Login successful' }), {
        status: 200
      })
    }
    

  // Handle any other HTTP method
  /* res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`); */
}
