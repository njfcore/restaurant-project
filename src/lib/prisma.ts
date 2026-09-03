import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Determine SQLite database path
const prismaDbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');
const rootDbPath = path.resolve(process.cwd(), 'dev.db');
const resolvedDbPath = fs.existsSync(prismaDbPath) ? prismaDbPath : (fs.existsSync(rootDbPath) ? rootDbPath : prismaDbPath);

let dbUrl = process.env.DATABASE_URL || `file:${resolvedDbPath}`;
if (dbUrl.startsWith('file:.') || dbUrl === 'file:./dev.db' || dbUrl === 'file:./prisma/dev.db') {
  dbUrl = `file:${resolvedDbPath}`;
}
process.env.DATABASE_URL = dbUrl;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: dbUrl,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
