FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent
# RUN npm ci --only=production

COPY . .

ENV PATH=/app/node_modules/.bin:$PATH
CMD ["npm", "run", "dev"]