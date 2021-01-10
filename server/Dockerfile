FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

# install only dependencies, and not devDependencies, regardless of the value of the NODE_ENV environment variable.
RUN npm ci --slient --only=production

COPY . .
CMD ["npm", "start"]