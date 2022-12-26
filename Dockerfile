FROM node:16.18.0-alpine

RUN mkdir -p /home/jsbot
WORKDIR /home/jsbot

COPY package.json .

# install node packages
RUN npm install --omit=dev

# install ffmpeg for discord voice and then clear the cache
RUN apk upgrade -U && apk add ca-certificates ffmpeg && rm -rf /var/cache/*

ENV NODE_ENV=production

COPY ./ ./

CMD ["node", "bot.js"]