#Build the TypeScript application
FROM node:20-alpine AS builder
WORKDIR /app
#Copy dependency manifests and install all dependency
COPY package*.json ./
RUN npm install 
#Copy source code and build the application
COPY . .
#Generate Prisma client INSIDE the container
RUN npx prisma generate
#Build TypeScript
RUN npm run build
#Create the runner container
FROM node:20-alpine
WORKDIR /app
#Copy dependency manifests and install only production dependency
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
#Configure runtime environment
ENV PORT=8080
EXPOSE 8080
#Start the application
CMD ["node", "dist/server.js"]