import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/db';
import bcrypt from 'bcryptjs'

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    let salt = bcrypt.genSaltSync(15);
    let hashedPass = bcrypt.hashSync(password, salt)

    const user = await prismadb.user.findUnique({
      where: {
        email: email
      },
    });

    if (user) {
      return res.status(401).json({ message: 'That account exists' });
    }

    await prismadb.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPass
      },
    });
    
    // For now, let's just return a success message
    return res.status(200).json({ message: 'Login successful' });
  }

  // Handle any other HTTP method
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
