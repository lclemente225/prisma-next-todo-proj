//@ts-nocheck
import { PrismaClient } from '@prisma/client';

//export const prisma = new PrismaClient();
declare global {
    var prismadb: PrismaClient | undefined;
  }
  // to avoid multiple active prisma instances
  const prismadb = globalThis.prisma || new PrismaClient();
  
  if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
  
  export default prismadb;
/* 
npx prisma generate + npx prisma db push -> everytime you edit the schema.prisma
npx prisma studio -> start server gui
*/

/* let prisma: PrismaClient;
declare global {
    namespace NodeJS {
        interface Global {
            prisma: PrismaClient;
        }
    }
}

if (process.env.NODE.ENV === "production"){
    prisma = new PrismaClient();
}else{
    prisma = global.prisma;
}
 */

/* const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = 
    globalForPrisma.prisma ??
    new PrismaClient({
        log:['query']
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.
prisma = prisma */