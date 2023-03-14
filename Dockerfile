FROM node:alpine

RUN mkdir -p /usr/src/micro-service && chown -R node:node /usr/src/micro-service

WORKDIR /usr/src/micro-service

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
