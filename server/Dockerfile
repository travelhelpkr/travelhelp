FROM node:14-alpine

# Github Actions recommend to not use the WORKDIR.
# See details here: https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/dockerfile-support-for-github-actions#workdir
# WORKDIR /app

# Set node environment to production
ENV NODE_ENV production

# Update the system
RUN apk --no-cache -U upgrade

# Install pm2
RUN npm install pm2@latest -g

COPY package*.json ./

# By adding `only production` option, install only production dependencies, regardless of the value of the NODE_ENV environment variable.
# npm ci will remove the existing npm_modules.
RUN npm ci --slient --only=production

COPY . .

EXPOSE 8080

CMD ["pm2-runtime", "ecosystem.config.yml"]