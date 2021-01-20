FROM node:14-alpine

# Github Actions recommend to not use the WORKDIR.
# See details here: https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/dockerfile-support-for-github-actions#workdir
# WORKDIR /app

# ENV
#   DB_USER_NAME
#   DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
#   DB_DATABASE: travelhelp
#   DB_HOST: ${{ secrets.DB_HOST }}
#   DB_PORT: ${{ secrets.DB_PORT }}
#   DB_DIALECT: mysql
#   SESSION_SECRET: ${{ secrets.SESSION_SECRET }}
#   NODEMAILER_USER: ${{ secrets.NODEMAILER_USER }}
#   NODEMAILER_PASS:

COPY package*.json ./

# install only dependencies, and not devDependencies, regardless of the value of the NODE_ENV environment variable.
RUN npm ci --slient --only=production \
    && npm install pm2 -g

COPY . .
CMD ["pm2-runtime", "app.js"]