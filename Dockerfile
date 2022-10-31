FROM node:16.18.0-alpine

RUN mkdir -p /home/jsbot
WORKDIR /home/jsbot

COPY package.json .

RUN npm install --omit=dev

ENV NODE_ENV=production

COPY ./ ./

CMD ["node", "bot.js"]