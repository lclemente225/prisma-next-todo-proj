import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/db';
import bcrypt from 'bcryptjs'

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email, password } = req.body;

    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Here you should handle creating a session or JWT for the user
    // For now, let's just return a success message
    return res.status(200).json({ message: 'Login successful' });
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}