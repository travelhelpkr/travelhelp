FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --slient --only=production

COPY . .
CMD ["npm", "run", "dev"]