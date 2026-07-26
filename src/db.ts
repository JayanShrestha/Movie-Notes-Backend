import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client.js'
import { PrismaNeon } from '@prisma/adapter-neon';

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("Missing required env var: DATABASE_URL")
}

const adapter = new PrismaNeon({
  connectionString,
})

export const prisma = new PrismaClient({ adapter })