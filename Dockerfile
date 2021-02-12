FROM node:lts-alpine

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node

COPY . .

USER node

EXPOSE 3333

CMD ["npm", "run", "start:dev"]
