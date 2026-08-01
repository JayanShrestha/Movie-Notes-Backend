import 'dotenv/config'
import { PrismaClient } from './generated/prisma/client.js'
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

//Required for Docker + CLoud Run
neonConfig.webSocketConstructor = ws;
//Use pooled Neon connection strings
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing required env var: DATABASE_URL")
}

const prisma = new PrismaClient({ adapter: new PrismaNeon({connectionString}),
});

export { prisma };