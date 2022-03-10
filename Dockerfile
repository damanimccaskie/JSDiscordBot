FROM node:14.18.1-alpine

RUN mkdir -p /home/jsbot
WORKDIR /home/jsbot

COPY package.json .

RUN apk add --no-cache --virtual .gyp python make g++

RUN npm install --production && apk del .gyp

ENV NODE_ENV=production

COPY ./ ./

CMD ["node", "bot.js"]