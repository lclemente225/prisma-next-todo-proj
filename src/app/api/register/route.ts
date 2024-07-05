import prismadb from '@/db';
import bcrypt from 'bcryptjs'

export async function POST (req: Request) {
    const { username, email, password } = await req.json();
    let salt = bcrypt.genSaltSync(15);
    let hashedPass = bcrypt.hashSync(password, salt)

    console.log("register api")
    const user = await prismadb.user.findUnique({
      where: {
        email: email
      },
    });

    if (user) {
      return new Response(JSON.stringify({ message: 'That account exists' }), {
        status: 401
      })
    }
    
    await prismadb.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPass
      },
    });

    
    // For now, let's just return a success message
    return new Response(JSON.stringify({ message: 'Registration successful' }), {
      status: 200
    })
  
}
