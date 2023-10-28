//@ts-nocheck
import { PrismaClient } from '@prisma/client';

//export const prisma = new PrismaClient();

let prisma: PrismaClient;
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

export {prisma};
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