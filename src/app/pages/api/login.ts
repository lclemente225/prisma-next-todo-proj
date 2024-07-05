import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/db';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import { authConfig } from '../../../auth.config';
import Credentials from 'next-auth/providers/credentials';

/* export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Credentials({loginHandler})],
}); */

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    let salt = bcrypt. genSaltSync(15);
    let hashPw = bcrypt.hashSync(password, salt);

    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await bcrypt.compare(hashPw, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Here you should handle creating a session or JWT for the user
    // For now, let's just return a success message
    return res.status(200).json({ message: 'Login successful' });
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
