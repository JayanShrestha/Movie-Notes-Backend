#Build the TypeScript application
FROM node:20-alpine AS builder
WORKDIR /app
#Copy dependency manifests and install all dependency
COPY package*.json ./
RUN npm install 
#Copy source code and build the application
COPY . .
RUN npm run build
#Create the runner container
FROM node:20-alpine
WORKDIR /app
#Copy dependency manifests and install only production dependency
COPY package*.json ./
RUN npm install --omit=dev
#Copy compiled javascript code from the build
COPY --from=builder /app/dist ./dist
#Configure runtime environment
ENV PORT=8080
EXPOSE 8080
#Start the application
CMD ["npm", "start"]