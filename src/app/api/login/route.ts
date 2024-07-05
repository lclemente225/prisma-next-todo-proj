import { NextRequest } from 'next/dist/server/web/spec-extension/request';
import prismadb from '@/db';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { authConfig } from '../../../../auth.config';
import Credentials from 'next-auth/providers/credentials';

/* export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({loginHandler})],
}); */

export default async function loginHandler(req: NextRequest) {
  if (req.method === 'POST') {
    const { email, password } = await req.json();
    let salt = bcrypt. genSaltSync(15);
    let hashPw = bcrypt.hashSync(password, salt);
    //req.cookies.get('key name of cookie')

    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await bcrypt.compare(hashPw, user.password))) {
      return new Response(JSON.stringify({ message: 'Invalid username or password' }), {
        status: 401
      })
    }

    // Here you should handle creating a session or JWT for the user
    // For now, let's just return a success message
    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200
    })
  }

  // Handle any other HTTP method
  /* res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`); */
}
